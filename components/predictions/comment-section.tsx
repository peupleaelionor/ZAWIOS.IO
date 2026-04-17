'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconUpvote, IconComment } from '@/components/ui/icons'
import type { Comment } from '@/types'

interface CommentSectionProps {
  predictionId: string
  comments: Comment[]
  className?: string
}

export function CommentSection({ predictionId, comments: initialComments, className }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('popular')
  const [votedComments, setVotedComments] = useState<Set<string>>(new Set())

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') return b.upvotes - a.upvotes
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const handleSubmit = async () => {
    if (!content.trim() || content.trim().length < 3) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prediction_id: predictionId, content: content.trim() }),
      })

      if (!res.ok) {
        const { toast } = await import('sonner')
        const data = await res.json()
        toast.error(data.error || 'Failed to post comment')
        return
      }

      const { comment } = await res.json()
      setComments((prev) => [comment, ...prev])
      setContent('')

      const { toast } = await import('sonner')
      toast.success('Comment posted')
    } catch {
      const { toast } = await import('sonner')
      toast.error('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpvote = async (commentId: string) => {
    if (votedComments.has(commentId)) return

    try {
      const res = await fetch('/api/comments/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_id: commentId }),
      })

      if (res.ok) {
        setVotedComments((prev) => new Set(prev).add(commentId))
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c)),
        )
      }
    } catch {
      /* silent fail for upvote */
    }
  }

  return (
    <div className={cn('space-y-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconComment size={18} style={{ color: 'var(--text2)' }} />
          <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
            Discussion ({comments.length})
          </h3>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setSortBy('popular')}
            className={cn(
              'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
              sortBy === 'popular'
                ? 'text-[var(--text)]'
                : 'text-[var(--text3)] hover:text-[var(--text2)]',
            )}
            style={{
              background: sortBy === 'popular' ? 'var(--surface2)' : 'transparent',
              fontFamily: 'var(--mono)',
            }}
          >
            Popular
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={cn(
              'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
              sortBy === 'recent'
                ? 'text-[var(--text)]'
                : 'text-[var(--text3)] hover:text-[var(--text2)]',
            )}
            style={{
              background: sortBy === 'recent' ? 'var(--surface2)' : 'transparent',
              fontFamily: 'var(--mono)',
            }}
          >
            Recent
          </button>
        </div>
      </div>

      {/* Compose */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, 2000))}
          placeholder="Share your analysis…"
          rows={3}
          className="w-full resize-none text-sm leading-relaxed bg-transparent outline-none placeholder:text-[var(--text3)]"
          style={{ color: 'var(--text)', fontFamily: 'var(--font)' }}
        />
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
            {content.length}/2000
          </span>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitting || content.trim().length < 3}
          >
            {submitting ? 'Posting…' : 'Post comment'}
          </Button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-1">
        {sortedComments.length === 0 && (
          <p className="text-sm text-center py-8" style={{ color: 'var(--text3)' }}>
            No comments yet. Be the first to share your analysis.
          </p>
        )}

        {sortedComments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl p-4 transition-colors"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start gap-3">
              <Avatar
                src={comment.author?.avatar_url}
                name={comment.author?.full_name ?? 'User'}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {comment.author?.full_name ?? 'Anonymous'}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text3)' }}>
                    @{comment.author?.username ?? 'user'}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text3)' }}>
                    · {formatRelativeTime(comment.created_at)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {comment.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={() => handleUpvote(comment.id)}
                    disabled={votedComments.has(comment.id)}
                    className={cn(
                      'flex items-center gap-1 text-xs transition-colors',
                      votedComments.has(comment.id)
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text3)] hover:text-[var(--accent)]',
                    )}
                    style={{ fontFamily: 'var(--mono)' }}
                  >
                    <IconUpvote size={14} />
                    {comment.upvotes}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
