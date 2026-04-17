'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { IconComment, IconUpvote } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'

interface MiniAvisItem {
  id: string
  author: string
  authorAvatar?: string
  content: string
  likes: number
  timeAgo: string
}

interface MiniAvisProps {
  signalId: string
  className?: string
}

// Mock data for mini-avis
const MOCK_AVIS: Record<string, MiniAvisItem[]> = {
  default: [
    { id: 'a1', author: 'C. Laurent', authorAvatar: '/avatars/laurent.svg', content: "Tendance confirmée par les derniers chiffres. Pas de surprise.", likes: 12, timeAgo: '2h' },
    { id: 'a2', author: 'L. Faye', authorAvatar: '/avatars/faye.svg', content: "Intéressant — les résultats diffèrent selon les régions.", likes: 8, timeAgo: '4h' },
    { id: 'a3', author: 'T. Diop', authorAvatar: '/avatars/diop.svg', content: "Je pense que c'est plus nuancé que OUI/NON. Le contexte compte.", likes: 5, timeAgo: '6h' },
  ],
}

const MAX_CHARS = 160

/**
 * Mini-avis — compact opinion system for signal cards.
 * - After voting, user can optionally leave a short opinion (max 160 chars)
 * - Collapsed by default ("Voir avis (n)")
 * - Each avis can be liked (1 tap)
 * - Moderation: report button on each avis
 */
export function MiniAvis({ signalId, className }: MiniAvisProps) {
  const [expanded, setExpanded] = useState(false)
  const [newAvis, setNewAvis] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const { t } = useLanguage()

  const avis = MOCK_AVIS.default // In prod: fetch from API by signalId

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return
    setLikedIds((prev) => new Set(prev).add(id))
  }

  const handleSubmit = () => {
    if (!newAvis.trim() || newAvis.trim().length < 3) return
    // In prod: POST to /api/comments with signal_id
    setNewAvis('')
    setShowInput(false)
    toast.success(t.miniAvis.published)
  }

  return (
    <div className={cn('', className)}>
      {/* Toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1.5 text-[11px] font-semibold transition-colors"
        style={{
          fontFamily: 'var(--mono)',
          color: expanded ? 'var(--teal)' : 'var(--text3)',
        }}
      >
        <IconComment size={12} className="w-3 h-3" />
        {expanded ? t.miniAvis.hide : `${t.miniAvis.show} (${avis.length})`}
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          {/* Avis list */}
          {avis.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-2 p-2.5 rounded-lg"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
            >
              <Avatar src={a.authorAvatar} name={a.author} size="xs" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-[var(--text2)]">{a.author}</span>
                  <span className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{a.timeAgo}</span>
                </div>
                <p className="text-[12px] text-[var(--text2)] leading-relaxed mt-0.5">{a.content}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <button
                    onClick={() => handleLike(a.id)}
                    className={cn(
                      'flex items-center gap-0.5 text-[10px] transition-colors',
                      likedIds.has(a.id) ? 'text-[var(--teal)]' : 'text-[var(--text3)] hover:text-[var(--teal)]',
                    )}
                    style={{ fontFamily: 'var(--mono)' }}
                  >
                    <IconUpvote size={10} className="w-2.5 h-2.5" />
                    {a.likes + (likedIds.has(a.id) ? 1 : 0)}
                  </button>
                  <button
                    className="text-[9px] text-[var(--text3)] hover:text-[var(--zred)] transition-colors"
                    style={{ fontFamily: 'var(--mono)' }}
                    title={t.miniAvis.report}
                  >
                    {t.miniAvis.report.toLowerCase()}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add avis input */}
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="w-full py-2 rounded-lg text-[11px] font-semibold transition-colors"
              style={{
                fontFamily: 'var(--mono)',
                color: 'var(--text3)',
                border: '1px dashed var(--border2)',
              }}
            >
              {t.miniAvis.add}
            </button>
          ) : (
            <div
              className="rounded-lg p-3"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
            >
              <textarea
                value={newAvis}
                onChange={(e) => setNewAvis(e.target.value.slice(0, MAX_CHARS))}
                placeholder={t.miniAvis.placeholder}
                rows={2}
                className="w-full resize-none text-[12px] leading-relaxed bg-transparent outline-none placeholder:text-[var(--text3)]"
                style={{ color: 'var(--text)', fontFamily: 'var(--font)' }}
                autoFocus
              />
              <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <span className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  {newAvis.length}/{MAX_CHARS}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowInput(false); setNewAvis('') }}
                    className="text-[10px] text-[var(--text3)] hover:text-[var(--text2)]"
                    style={{ fontFamily: 'var(--mono)' }}
                  >
                    {t.miniAvis.cancel}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={newAvis.trim().length < 3}
                    className="px-3 py-1 rounded-lg text-[10px] font-semibold transition-colors disabled:opacity-30"
                    style={{
                      fontFamily: 'var(--mono)',
                      background: 'var(--teal)',
                      color: '#fff',
                    }}
                  >
                    {t.miniAvis.post}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
