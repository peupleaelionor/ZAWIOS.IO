'use client'
import { useState } from 'react'
import { useComments } from '@/hooks/use-comments'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface CommentSectionProps {
  predictionId: string
  commentCount: number
}

function CommentAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  // Pick a color based on name
  const colors = [
    'linear-gradient(135deg,#17D5CF,#050508)',
    'linear-gradient(135deg,#7c6ef0,#050508)',
    'linear-gradient(135deg,#f0c050,#050508)',
    'linear-gradient(135deg,#60a8f0,#050508)',
    'linear-gradient(135deg,#f06070,#050508)',
  ]
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: colors[idx],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 700,
        color: '#eaeaf0',
        fontFamily: 'var(--mono)',
        flexShrink: 0,
        letterSpacing: '0.03em',
      }}
    >
      {initials}
    </div>
  )
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return formatDate(iso)
}

export function CommentSection({ predictionId, commentCount }: CommentSectionProps) {
  const { comments, likedIds, isPosting, addComment, toggleLike } = useComments(predictionId)
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !authorName.trim()) return
    addComment(content, authorName)
    setContent('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const total = Math.max(commentCount, comments.length)

  return (
    <section>
      {/* Header */}
      <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text)' }}>
        Discussion
        <span
          className="ml-2 text-sm font-normal"
          style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
        >
          · {total} comments
        </span>
      </h2>

      {/* Add comment form */}
      <div
        className="rounded-2xl p-5 mb-8"
        style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
      >
        {submitted ? (
          <div className="py-2 text-center">
            <p className="text-sm font-semibold" style={{ color: 'var(--teal)' }}>
              Comment posted ✓
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>
              <Link href="/auth/signup" className="underline">Create an account</Link> to build your reputation from your comments.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your analysis or prediction rationale…"
              rows={3}
              maxLength={600}
              className="w-full text-sm resize-none rounded-xl px-4 py-3 outline-none transition-colors"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border2)',
                color: 'var(--text)',
                fontFamily: 'var(--font)',
                lineHeight: 1.6,
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(23,213,207,0.4)' }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border2)' }}
            />
            <div className="flex items-center gap-3">
              <input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name"
                maxLength={40}
                className="flex-1 text-sm rounded-xl px-4 py-2.5 outline-none transition-colors"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border2)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font)',
                  minHeight: 44,
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(23,213,207,0.4)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border2)' }}
              />
              <button
                type="submit"
                disabled={!content.trim() || !authorName.trim() || isPosting}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  minHeight: 44,
                  fontFamily: 'var(--font)',
                }}
              >
                Post
              </button>
            </div>
            <p className="text-xs" style={{ color: 'var(--text3)' }}>
              Posting as guest.{' '}
              <Link href="/auth/login" className="underline hover:text-[var(--text2)] transition-colors">
                Sign in
              </Link>{' '}
              to link your comment to your profile.
            </p>
          </form>
        )}
      </div>

      {/* Comment thread */}
      {comments.length === 0 ? (
        <div className="py-12 text-center" style={{ color: 'var(--text3)' }}>
          <p className="text-sm">Be the first to share your analysis.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => {
            const liked = likedIds.has(comment.id)
            return (
              <div
                key={comment.id}
                className="flex gap-3"
                style={comment.is_local ? { opacity: 0.95 } : {}}
              >
                <CommentAvatar name={comment.author_name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                      {comment.author_name}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                    >
                      @{comment.author_username}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text3)' }}>
                      {timeAgo(comment.created_at)}
                    </span>
                    {comment.is_local && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(23,213,207,0.08)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}
                      >
                        you
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-2"
                    style={{ color: 'var(--text2)' }}
                  >
                    {comment.content}
                  </p>
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className="inline-flex items-center gap-1.5 text-xs transition-colors"
                    style={{
                      color: liked ? 'var(--teal)' : 'var(--text3)',
                      fontFamily: 'var(--mono)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <svg
                      width={13}
                      height={13}
                      viewBox="0 0 24 24"
                      fill={liked ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    {comment.upvotes + (liked ? 0 : 0)}
                    {comment.upvotes > 0 && ` · ${comment.upvotes}`}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Sign-in upsell */}
      {comments.length > 0 && (
        <div
          className="mt-8 p-4 rounded-xl text-center"
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text3)' }}>
            <Link href="/auth/signup" className="font-semibold text-[var(--accent)] hover:text-[var(--accent2)] transition-colors">
              Create an account
            </Link>{' '}
            to link comments to your reputation and see your prediction accuracy over time.
          </p>
        </div>
      )}
    </section>
  )
}
