'use client'

import { useState, useOptimistic, useTransition } from 'react'
import { toast } from 'sonner'
import { Avatar } from '@/components/ui/avatar'
import { IconComment, IconSend, IconReply, IconMoreHoriz } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface CommentAuthor {
  username:   string | null
  full_name:  string | null
  avatar_url: string | null
  is_premium: boolean | null
}

export interface SignalComment {
  id:         string
  parent_id:  string | null
  body:       string
  edited:     boolean
  created_at: string
  user_id:    string
  username:   string | null
  full_name:  string | null
  avatar_url: string | null
  is_premium: boolean | null
}

interface SignalCommentsProps {
  signalId:        string
  initialComments: SignalComment[]
  commentCount:    number
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'à l\'instant'
  if (m < 60) return `il y a ${m}min`
  const h = Math.floor(m / 60)
  if (h < 24) return `il y a ${h}h`
  const d = Math.floor(h / 24)
  if (d < 7)  return `il y a ${d}j`
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function authorName(c: Pick<CommentAuthor, 'full_name' | 'username'>): string {
  return c.full_name || c.username || 'Anonyme'
}

// ── Single comment row ────────────────────────────────────────────────────────
function CommentRow({
  comment,
  onReply,
  onDelete,
  currentUserId,
}: {
  comment:       SignalComment
  onReply:       (id: string, name: string) => void
  onDelete:      (id: string) => void
  currentUserId: string | null
}) {
  const [showMenu, setShowMenu] = useState(false)
  const isOwn = currentUserId === comment.user_id

  return (
    <div className="flex gap-3 group">
      <Avatar
        src={comment.avatar_url ?? undefined}
        name={authorName(comment)}
        size="xs"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="text-[13px] font-semibold"
            style={{ color: 'var(--text)' }}
          >
            {authorName(comment)}
          </span>
          {comment.is_premium && (
            <span
              className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(29,228,222,0.12)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}
            >
              PRO
            </span>
          )}
          <span
            className="text-[11px]"
            style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
          >
            {timeAgo(comment.created_at)}
          </span>
          {comment.edited && (
            <span className="text-[10px]" style={{ color: 'var(--text3)' }}>modifié</span>
          )}
        </div>

        <p
          className="text-[13px] leading-relaxed break-words"
          style={{ color: 'var(--text2)' }}
        >
          {comment.body}
        </p>

        <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onReply(comment.id, authorName(comment))}
            className="flex items-center gap-1 text-[11px] transition-colors"
            style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
          >
            <IconReply size={12} />
            Répondre
          </button>
          {isOwn && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-[11px]"
                style={{ color: 'var(--text3)' }}
              >
                <IconMoreHoriz size={14} />
              </button>
              {showMenu && (
                <div
                  className="absolute bottom-6 left-0 rounded-lg py-1 z-10 min-w-[100px]"
                  style={{ background: 'var(--surface3)', border: '1px solid var(--border2)' }}
                >
                  <button
                    onClick={() => { onDelete(comment.id); setShowMenu(false) }}
                    className="w-full text-left px-3 py-1.5 text-[12px] transition-colors hover:bg-[rgba(255,77,117,0.1)]"
                    style={{ color: 'var(--zred)', fontFamily: 'var(--mono)' }}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function SignalComments({ signalId, initialComments, commentCount }: SignalCommentsProps) {
  const [expanded, setExpanded] = useState(false)
  const [text, setText] = useState('')
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [comments, setComments] = useState<SignalComment[]>(initialComments)
  const [localCount, setLocalCount] = useState(commentCount)
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state: SignalComment[], newComment: SignalComment) => [newComment, ...state],
  )
  // We need current user id for delete
  const [currentUserId] = useState<string | null>(null)  // populated lazily by the server

  const handleSubmit = async () => {
    const body = text.trim()
    if (!body) return

    const tempComment: SignalComment = {
      id:         crypto.randomUUID(),
      parent_id:  replyTo?.id ?? null,
      body,
      edited:     false,
      created_at: new Date().toISOString(),
      user_id:    'optimistic',
      username:   null,
      full_name:  'Vous',
      avatar_url: null,
      is_premium: null,
    }

    setText('')
    setReplyTo(null)
    setLocalCount((n) => n + 1)

    startTransition(async () => {
      addOptimisticComment(tempComment)

      try {
        const res = await fetch(`/api/signals/${signalId}/comments`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ body, parent_id: replyTo?.id }),
        })

        if (!res.ok) {
          const data = await res.json()
          toast.error(data.error ?? 'Erreur lors de la publication')
          setLocalCount((n) => n - 1)
          return
        }

        const { comment } = await res.json()
        setComments((prev) => [comment, ...prev])
      } catch {
        toast.error('Erreur réseau')
        setLocalCount((n) => n - 1)
      }
    })
  }

  const handleDelete = async (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId))
    setLocalCount((n) => Math.max(0, n - 1))

    try {
      const res = await fetch(
        `/api/signals/${signalId}/comments?commentId=${commentId}`,
        { method: 'DELETE' },
      )
      if (!res.ok) {
        toast.error('Impossible de supprimer ce commentaire')
        // Reload from server on failure
        const reloaded = await fetch(`/api/signals/${signalId}/comments`)
        if (reloaded.ok) {
          const { comments: fresh } = await reloaded.json()
          setComments(fresh)
        }
      }
    } catch {
      toast.error('Erreur réseau')
    }
  }

  const displayedComments = expanded ? optimisticComments : optimisticComments.slice(0, 3)
  const hasMore = optimisticComments.length > 3

  return (
    <div className="mt-4" style={{ borderTop: '1px solid var(--border)' }}>
      {/* Toggle header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 py-3 w-full text-left transition-colors hover:text-[var(--text)]"
        style={{ color: 'var(--text3)' }}
      >
        <IconComment size={14} />
        <span className="text-[12px] font-semibold" style={{ fontFamily: 'var(--mono)' }}>
          {localCount > 0 ? `${localCount} commentaire${localCount > 1 ? 's' : ''}` : 'Commenter'}
        </span>
        <span className="text-[11px]" style={{ color: 'var(--text3)' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {expanded && (
        <div className="pb-4 space-y-4">
          {/* Comment input */}
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              {replyTo && (
                <div
                  className="flex items-center gap-2 text-[11px] mb-1 px-2 py-1 rounded"
                  style={{ background: 'var(--surface3)', color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                >
                  <IconReply size={10} />
                  <span>Répondre à <strong style={{ color: 'var(--text2)' }}>{replyTo.name}</strong></span>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="ml-auto"
                    style={{ color: 'var(--text3)' }}
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
                  }}
                  placeholder={replyTo ? `Répondre à ${replyTo.name}…` : 'Ajouter un commentaire…'}
                  rows={2}
                  maxLength={1000}
                  className="comment-input flex-1"
                  style={{ resize: 'none' }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!text.trim() || isPending}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 self-end',
                    text.trim() && !isPending
                      ? 'text-[var(--bg)]'
                      : 'opacity-30 cursor-not-allowed',
                  )}
                  style={{
                    background:  text.trim() && !isPending ? 'var(--teal)' : 'var(--surface3)',
                    border:      '1px solid var(--border2)',
                    flexShrink:  0,
                  }}
                >
                  <IconSend size={15} />
                </button>
              </div>
              <p className="text-[10px] mt-1" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                {text.length}/1000 · Ctrl+Enter pour envoyer
              </p>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            {displayedComments.length === 0 ? (
              <p
                className="text-[12px] text-center py-4"
                style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
              >
                Soyez le premier à commenter.
              </p>
            ) : (
              displayedComments.map((c) => (
                <CommentRow
                  key={c.id}
                  comment={c}
                  onReply={(id, name) => setReplyTo({ id, name })}
                  onDelete={handleDelete}
                  currentUserId={currentUserId}
                />
              ))
            )}
          </div>

          {hasMore && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="text-[12px] font-semibold hover:underline w-full text-center"
              style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}
            >
              Voir {optimisticComments.length - 3} commentaires de plus
            </button>
          )}
        </div>
      )}
    </div>
  )
}
