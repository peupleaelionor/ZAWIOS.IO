'use client'

import { useState, useRef } from 'react'
import { useEnhancedComments, type SortMode } from '@/hooks/use-enhanced-comments'
import { ReactionBar, type ReactionType } from '@/components/comments/reaction-bar'
import { GifPicker } from '@/components/comments/gif-picker'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import type { EnhancedComment } from '@/lib/enhanced-comments'
import type { GifItem } from '@/lib/gif-library'

// ── Props ────────────────────────────────────────────────────────────────
interface CommentSectionProps {
  predictionId: string
  commentCount: number
}

// ── GIF Image with error fallback ────────────────────────────────────────
function GifImage({ src, alt, maxWidth = 280, minHeight = 80 }: { src: string; alt: string; maxWidth?: number; minHeight?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        style={{
          maxWidth,
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 8,
          border: '1px solid var(--border)',
          background: 'var(--surface2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          minHeight: 60,
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>GIF unavailable</span>
      </div>
    )
  }
  return (
    <div
      style={{
        maxWidth,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 8,
        border: '1px solid var(--border)',
        background: 'var(--surface2)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          display: 'block',
          minHeight,
          objectFit: 'contain',
          backgroundColor: 'var(--surface2)',
        }}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

// ── Avatar ───────────────────────────────────────────────────────────────
function CommentAvatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const colors = [
    'linear-gradient(135deg,#6B6EF8,#14C8BE)',
    'linear-gradient(135deg,#8486F9,#F0B429)',
    'linear-gradient(135deg,#14C8BE,#4EE49A)',
    'linear-gradient(135deg,#60a5fa,#6B6EF8)',
    'linear-gradient(135deg,#F0404E,#F0B429)',
    'linear-gradient(135deg,#A5A7FB,#14C8BE)',
  ]
  const idx = (name.charCodeAt(0) + name.length) % colors.length
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: colors[idx],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.32,
        fontWeight: 700,
        color: '#fff',
        fontFamily: 'var(--mono)',
        flexShrink: 0,
        letterSpacing: '0.03em',
      }}
    >
      {initials}
    </div>
  )
}

// ── Time ago ─────────────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d`
  if (days < 30) return `${Math.floor(days / 7)}w`
  return formatDate(iso)
}

// ── Verified / Top Predictor badges ──────────────────────────────────────
function AuthorBadges({ verified, topPredictor }: { verified?: boolean; topPredictor?: boolean }) {
  return (
    <>
      {verified && (
        <span
          title="Verified analyst"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginLeft: 3,
          }}
        >
          <svg width={13} height={13} viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </span>
      )}
      {topPredictor && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            marginLeft: 4,
            padding: '1px 6px',
            borderRadius: 6,
            fontSize: 9,
            fontWeight: 700,
            fontFamily: 'var(--mono)',
            background: 'rgba(20,200,190,0.1)',
            color: 'var(--yes)',
            letterSpacing: '0.04em',
          }}
        >
          <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          TOP
        </span>
      )}
    </>
  )
}

// ── Sort selector ────────────────────────────────────────────────────────
function SortSelector({
  mode,
  onChange,
}: {
  mode: SortMode
  onChange: (m: SortMode) => void
}) {
  const options: { value: SortMode; label: string }[] = [
    { value: 'popular', label: 'Top' },
    { value: 'recent', label: 'Recent' },
    { value: 'oldest', label: 'Oldest' },
  ]
  return (
    <div style={{ display: 'flex', gap: 2, background: 'var(--surface2)', borderRadius: 8, padding: 2 }}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{
            padding: '4px 10px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: mode === o.value ? 600 : 400,
            fontFamily: 'var(--mono)',
            color: mode === o.value ? 'var(--text)' : 'var(--text3)',
            background: mode === o.value ? 'var(--surface3)' : 'transparent',
            transition: 'all 150ms',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// ── Compose box (shared for new comment + reply) ─────────────────────────
function ComposeBox({
  onSubmit,
  isPosting,
  placeholder,
  compact,
  autoFocus,
}: {
  onSubmit: (content: string, authorName: string, gifUrl?: string, gifTitle?: string) => void
  isPosting: boolean
  placeholder?: string
  compact?: boolean
  autoFocus?: boolean
}) {
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [gifOpen, setGifOpen] = useState(false)
  const [selectedGif, setSelectedGif] = useState<GifItem | null>(null)
  const [gifPreviewFailed, setGifPreviewFailed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if ((!content.trim() && !selectedGif) || !authorName.trim()) return
    onSubmit(content, authorName, selectedGif?.url, selectedGif?.title)
    setContent('')
    setSelectedGif(null)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleGifSelect = (gif: GifItem) => {
    setSelectedGif(gif)
    setGifPreviewFailed(false)
    textareaRef.current?.focus()
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl py-3 text-center"
        style={{
          animation: 'revealUp 300ms ease',
        }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--yes)' }}>
          Comment posted
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>
          <Link href="/auth/signup" className="underline">
            Create an account
          </Link>{' '}
          to build your reputation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      {/* Selected GIF preview */}
      {selectedGif && (
        <div
          style={{
            position: 'relative',
            marginBottom: 8,
            borderRadius: 12,
            overflow: 'hidden',
            maxWidth: 240,
            border: '1px solid var(--border2)',
            background: 'var(--surface2)',
          }}
        >
          {gifPreviewFailed ? (
            <div style={{ padding: 12, textAlign: 'center', fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
              GIF: {selectedGif.title}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selectedGif.preview}
              alt={selectedGif.title}
              style={{ width: '100%', display: 'block', minHeight: 60, objectFit: 'contain', backgroundColor: 'var(--surface2)' }}
              onError={() => setGifPreviewFailed(true)}
            />
          )}
          <button
            type="button"
            onClick={() => { setSelectedGif(null); setGifPreviewFailed(false) }}
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder ?? 'Share your analysis or insight…'}
        rows={compact ? 2 : 3}
        maxLength={800}
        autoFocus={autoFocus}
        className="w-full text-sm resize-none rounded-xl px-4 py-3 outline-none transition-colors"
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          fontFamily: 'var(--font)',
          lineHeight: 1.6,
          fontSize: compact ? 13 : 14,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(107,110,248,0.3)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border)'
        }}
      />

      {/* Action bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 8,
        }}
      >
        {/* GIF button */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setGifOpen((v) => !v)}
            title="Add GIF"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${gifOpen ? 'var(--accent)' : 'var(--border)'}`,
              background: gifOpen ? 'rgba(107,110,248,0.08)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 150ms',
              color: gifOpen ? 'var(--accent)' : 'var(--text3)',
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                fontFamily: 'var(--mono)',
                letterSpacing: '-0.03em',
              }}
            >
              GIF
            </span>
          </button>
          <GifPicker
            open={gifOpen}
            onClose={() => setGifOpen(false)}
            onSelect={handleGifSelect}
          />
        </div>

        {/* Character count */}
        {content.length > 400 && (
          <span
            style={{
              fontSize: 10,
              fontFamily: 'var(--mono)',
              color: content.length > 750 ? 'var(--no)' : 'var(--text3)',
            }}
          >
            {content.length}/800
          </span>
        )}

        <div style={{ flex: 1 }} />

        {/* Name input */}
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Name"
          maxLength={30}
          style={{
            width: compact ? 100 : 120,
            padding: '8px 12px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--surface2)',
            color: 'var(--text)',
            fontSize: 13,
            fontFamily: 'var(--font)',
            outline: 'none',
            minHeight: 36,
            transition: 'border-color 150ms',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(107,110,248,0.3)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border)'
          }}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={(!content.trim() && !selectedGif) || !authorName.trim() || isPosting}
          style={{
            padding: compact ? '8px 14px' : '8px 18px',
            borderRadius: 10,
            border: 'none',
            background: 'var(--accent)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'var(--font)',
            cursor: 'pointer',
            transition: 'all 150ms',
            opacity:
              (!content.trim() && !selectedGif) || !authorName.trim() ? 0.35 : 1,
            minHeight: 36,
          }}
        >
          Post
        </button>
      </div>

      {/* Guest hint */}
      {!compact && (
        <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>
          Posting as guest.{' '}
          <Link
            href="/auth/login"
            className="underline hover:text-[var(--text2)] transition-colors"
          >
            Sign in
          </Link>{' '}
          to link to your profile.
        </p>
      )}
    </form>
  )
}

// ── Single Comment ───────────────────────────────────────────────────────
function CommentItem({
  comment,
  replies,
  isExpanded,
  onToggleReplies,
  onReply,
  onReact,
  userReaction,
  userReactions,
  depth = 0,
}: {
  comment: EnhancedComment
  replies: EnhancedComment[]
  isExpanded: boolean
  onToggleReplies: () => void
  onReply: (content: string, authorName: string, gifUrl?: string, gifTitle?: string) => void
  onReact: (type: ReactionType) => void
  userReaction?: ReactionType | null
  userReactions?: Record<string, ReactionType>
  depth?: number
}) {
  const [showReplyBox, setShowReplyBox] = useState(false)
  const replyCount = (comment.reply_count ?? 0) + replies.filter((r) => r.is_local).length

  return (
    <div
      style={{
        animation: comment.is_local ? 'commentSlideIn 350ms cubic-bezier(0.16,1,0.3,1)' : undefined,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: depth > 0 ? 10 : 12,
          paddingLeft: depth > 0 ? 0 : 0,
        }}
      >
        <CommentAvatar name={comment.author_name} size={depth > 0 ? 26 : 32} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Author line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexWrap: 'wrap',
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: depth > 0 ? 13 : 14,
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              {comment.author_name}
            </span>
            <AuthorBadges
              verified={comment.is_verified}
              topPredictor={comment.is_top_predictor}
            />
            <span
              style={{
                fontSize: 12,
                color: 'var(--text3)',
                fontFamily: 'var(--mono)',
              }}
            >
              {timeAgo(comment.created_at)}
            </span>
            {comment.is_local && (
              <span
                style={{
                  fontSize: 9,
                  padding: '1px 5px',
                  borderRadius: 4,
                  background: 'rgba(107,110,248,0.1)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--mono)',
                  fontWeight: 600,
                }}
              >
                you
              </span>
            )}
          </div>

          {/* Content */}
          {comment.content && (
            <p
              style={{
                fontSize: depth > 0 ? 14 : 15,
                lineHeight: 1.65,
                color: 'var(--text2)',
                marginBottom: comment.gif_url ? 8 : 6,
                wordBreak: 'break-word',
              }}
            >
              {comment.content}
            </p>
          )}

          {/* GIF */}
          {comment.gif_url && (
            <GifImage src={comment.gif_url} alt={comment.gif_title ?? 'GIF'} />
          )}

          {/* Reactions + actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 2,
            }}
          >
            <ReactionBar
              reactions={comment.reactions}
              userReaction={userReaction}
              onReact={onReact}
              compact={depth > 0}
            />

            {/* Reply button */}
            {depth === 0 && (
              <button
                onClick={() => setShowReplyBox((v) => !v)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontFamily: 'var(--mono)',
                  color: showReplyBox ? 'var(--accent)' : 'var(--text3)',
                  padding: 0,
                  transition: 'color 150ms',
                }}
              >
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Reply
              </button>
            )}
          </div>

          {/* Reply compose */}
          {showReplyBox && depth === 0 && (
            <div style={{ marginTop: 10 }}>
              <ComposeBox
                onSubmit={(content, name, gifUrl, gifTitle) => {
                  onReply(content, name, gifUrl, gifTitle)
                  setShowReplyBox(false)
                }}
                isPosting={false}
                placeholder="Write a reply…"
                compact
                autoFocus
              />
            </div>
          )}

          {/* Thread toggle */}
          {replyCount > 0 && depth === 0 && (
            <button
              onClick={onToggleReplies}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 10,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: 'var(--mono)',
                fontWeight: 500,
                color: 'var(--accent)',
                padding: 0,
                transition: 'all 150ms',
              }}
            >
              <svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {isExpanded ? 'Hide' : 'View'} {replyCount}{' '}
              {replyCount === 1 ? 'reply' : 'replies'}
            </button>
          )}

          {/* Replies thread */}
          {isExpanded && replies.length > 0 && depth === 0 && (
            <div
              style={{
                marginTop: 10,
                paddingLeft: 12,
                borderLeft: '2px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                animation: 'commentSlideIn 250ms ease',
              }}
            >
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  replies={[]}
                  isExpanded={false}
                  onToggleReplies={() => {}}
                  onReply={() => {}}
                  onReact={(type) => onReact(type)}
                  userReaction={userReactions?.[reply.id] ?? null}
                  userReactions={userReactions}
                  depth={1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══ Main Comment Section ════════════════════════════════════════════════
export function CommentSection({ predictionId, commentCount }: CommentSectionProps) {
  const {
    comments,
    getReplies,
    totalCount,
    sortMode,
    setSortMode,
    isPosting,
    addComment,
    toggleReaction,
    userReactions,
    expandedReplies,
    toggleReplies,
  } = useEnhancedComments(predictionId)

  const displayCount = Math.max(commentCount, totalCount)

  return (
    <section>
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Discussion
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: 'var(--text3)',
              fontFamily: 'var(--mono)',
            }}
          >
            · {displayCount}
          </span>
        </h2>
        <SortSelector mode={sortMode} onChange={setSortMode} />
      </div>

      {/* ── Compose ── */}
      <div
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <ComposeBox
          onSubmit={(content, name, gifUrl, gifTitle) =>
            addComment(content, name, gifUrl, gifTitle)
          }
          isPosting={isPosting}
        />
      </div>

      {/* ── Thread ── */}
      {comments.length === 0 ? (
        <div
          style={{
            padding: '40px 16px',
            textAlign: 'center',
            color: 'var(--text3)',
          }}
        >
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: '0 auto 10px', opacity: 0.5 }}
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <p style={{ fontSize: 13 }}>Be the first to share your analysis.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {comments.map((comment) => {
            const replies = getReplies(comment.id)
            const isExpanded = expandedReplies.has(comment.id)
            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={replies}
                isExpanded={isExpanded}
                onToggleReplies={() => toggleReplies(comment.id)}
                onReply={(content, name, gifUrl, gifTitle) =>
                  addComment(content, name, gifUrl, gifTitle, comment.id)
                }
                onReact={(type) => toggleReaction(comment.id, type)}
                userReaction={userReactions[comment.id] ?? null}
                userReactions={userReactions}
              />
            )
          })}
        </div>
      )}

      {/* ── Sign-up CTA ── */}
      {comments.length > 0 && (
        <div
          style={{
            marginTop: 28,
            padding: '14px 16px',
            borderRadius: 12,
            background: 'rgba(107,110,248,0.04)',
            border: '1px solid rgba(107,110,248,0.1)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text3)' }}>
            <Link
              href="/auth/signup"
              className="font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              Join ZAWIOS
            </Link>{' '}
            — link comments to your reputation and track signal accuracy.
          </p>
        </div>
      )}
    </section>
  )
}
