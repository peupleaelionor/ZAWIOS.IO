'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'
import {
  CATEGORY_COLORS,
  SIGNAL_CATEGORIES,
  SIGNAL_REGIONS,
  type Signal,
} from '@/lib/signals-data'
import { Avatar } from '@/components/ui/avatar'
import { IconTrending, IconCheck, IconShare, IconBookmark, IconComment, IconFire } from '@/components/ui/icons'
import { WorldViewComparison } from '@/components/signals/world-view-comparison'
import { MiniAvis } from '@/components/signals/mini-avis'
import { SignalComments } from '@/components/signals/signal-comments'

export type TriVote = 'yes' | 'neutral' | 'no'

interface SignalCardProps {
  signal:   Signal
  compact?: boolean
  onVote?:  (signalId: string, vote: TriVote) => void
  onNext?:  () => void
}

const getCategoryLabel = (id: string) =>
  SIGNAL_CATEGORIES.find((c) => c.id === id)?.labelFr ?? id

const getRegionLabel = (id: string) =>
  SIGNAL_REGIONS.find((r) => r.id === id)?.labelFr ?? id

const SWIPE_THRESHOLD    = 50
const SWIPE_UP_THRESHOLD = -60

const REACTIONS = [
  { key: 'fire',    emoji: '🔥', label: 'Hot' },
  { key: 'wow',     emoji: '😮', label: 'Wow' },
  { key: 'think',   emoji: '🤔', label: 'Hmm' },
  { key: 'skeptic', emoji: '🧐', label: 'Sceptique' },
  { key: 'clap',    emoji: '👏', label: 'Bravo' },
] as const
type ReactionKey = typeof REACTIONS[number]['key']

export function SignalCard({ signal, compact = false, onVote, onNext }: SignalCardProps) {
  const [voted, setVoted]               = useState<TriVote | null>(null)
  const [yes, setYes]                   = useState(signal.yesPercent)
  const [no, setNo]                     = useState(signal.noPercent)
  const [neutral, setNeutral]           = useState(signal.neutralPercent ?? 0)
  const [swipeHint, setSwipeHint]       = useState<TriVote | null>(null)
  const [bookmarked, setBookmarked]     = useState(false)
  const [activeReaction, setActiveReaction] = useState<ReactionKey | null>(null)
  const [reactionCounts, setReactionCounts] = useState<Record<ReactionKey, number>>({
    fire: 0, wow: 0, think: 0, skeptic: 0, clap: 0,
  })
  const [showComments, setShowComments] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const isResolved = signal.status === 'resolved'
  const catStyle   = CATEGORY_COLORS[signal.category]

  // ── Vote ─────────────────────────────────────────────────────────────────────
  const handleVote = (choice: TriVote) => {
    if (voted || isResolved) return
    setVoted(choice)
    if (choice === 'yes') {
      setYes((p) => Math.min(97, p + 1))
      setNo((p)  => Math.max(1, p - 1))
    } else if (choice === 'no') {
      setNo((p)  => Math.min(97, p + 1))
      setYes((p) => Math.max(1, p - 1))
    } else {
      setNeutral((p) => Math.min(30, p + 1))
      setYes((p)    => Math.max(1, p - 1))
    }
    setSwipeHint(null)
    onVote?.(signal.id, choice)

    const majority =
      choice === 'neutral' ? null :
      (choice === 'yes' && yes > 50) || (choice === 'no' && no > 50)

    toast.success(
      choice === 'yes'     ? 'Signal YES enregistré'
      : choice === 'no'    ? 'Signal NO enregistré'
      : 'Position neutre enregistrée',
      {
        description:
          choice === 'neutral'
            ? 'Abstention comptabilisée séparément.'
            : majority
              ? 'Aligné avec la majorité.'
              : 'Contre la majorité.',
      },
    )
  }

  // ── Swipe ────────────────────────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    if (voted || isResolved) return
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current || voted || isResolved) return
    const dx = e.touches[0].clientX - touchStart.current.x
    const dy = e.touches[0].clientY - touchStart.current.y
    if (Math.abs(dy) > SWIPE_UP_THRESHOLD * -1 && Math.abs(dy) > Math.abs(dx)) {
      setSwipeHint('neutral')
    } else if (dx > SWIPE_THRESHOLD) {
      setSwipeHint('yes')
    } else if (dx < -SWIPE_THRESHOLD) {
      setSwipeHint('no')
    } else {
      setSwipeHint(null)
    }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || voted || isResolved) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null
    setSwipeHint(null)
    if (Math.abs(dy) > Math.abs(dx) && dy < SWIPE_UP_THRESHOLD) {
      handleVote('neutral')
    } else if (dx > SWIPE_THRESHOLD) {
      handleVote('yes')
    } else if (dx < -SWIPE_THRESHOLD) {
      handleVote('no')
    }
  }

  // ── Reaction ─────────────────────────────────────────────────────────────────
  const handleReaction = (key: ReactionKey) => {
    if (activeReaction === key) {
      setActiveReaction(null)
      setReactionCounts((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }))
    } else {
      if (activeReaction) {
        setReactionCounts((prev) => ({ ...prev, [activeReaction]: Math.max(0, prev[activeReaction] - 1) }))
      }
      setActiveReaction(key)
      setReactionCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }))
    }
  }

  // ── Share ────────────────────────────────────────────────────────────────────
  const handleShare = async () => {
    const url  = `${typeof window !== 'undefined' ? window.location.origin : ''}/signals/${signal.id}`
    const text = `"${signal.title}" — Vote YES ou NO sur ZAWIOS`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share({ title: signal.title, text, url }) } catch { /* cancelled */ }
    } else {
      await navigator.clipboard?.writeText(url)
      toast.success('Lien copié', { description: url })
    }
  }

  // ── Bookmark ─────────────────────────────────────────────────────────────────
  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Retiré des favoris' : 'Ajouté aux favoris')
  }

  const swipeOverlayBg =
    swipeHint === 'yes'     ? 'rgba(29,228,222,0.07)' :
    swipeHint === 'no'      ? 'rgba(255,107,157,0.07)' :
    swipeHint === 'neutral' ? 'rgba(168,168,192,0.05)' :
    'transparent'

  const cardBorder =
    voted === 'yes'     ? '1px solid rgba(29,228,222,0.30)' :
    voted === 'no'      ? '1px solid rgba(255,107,157,0.30)' :
    voted === 'neutral' ? '1px solid rgba(168,168,192,0.22)' :
    swipeHint === 'yes' ? '1px solid rgba(29,228,222,0.28)' :
    swipeHint === 'no'  ? '1px solid rgba(255,107,157,0.28)' :
    '1px solid var(--border2)'

  return (
    <div
      className="social-card relative overflow-hidden flex flex-col"
      style={{
        background:   swipeHint ? swipeOverlayBg : 'var(--surface)',
        border:       cardBorder,
        borderRadius: 'var(--radius)',
        padding:      compact ? '14px' : '16px 18px 14px',
        transition:   'background 0.15s, border-color 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe hint overlay */}
      {swipeHint && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span
            className="px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest pop-in"
            style={{
              fontFamily: 'var(--mono)',
              background:
                swipeHint === 'yes'     ? 'var(--teal)' :
                swipeHint === 'no'      ? 'var(--pink)' :
                'rgba(168,168,192,0.35)',
              color: swipeHint === 'neutral' ? 'var(--text)' : 'var(--bg)',
              boxShadow:
                swipeHint === 'yes' ? '0 0 20px rgba(29,228,222,0.4)' :
                swipeHint === 'no'  ? '0 0 20px rgba(255,107,157,0.4)' : 'none',
            }}
          >
            {swipeHint === 'yes' ? 'YES' : swipeHint === 'no' ? 'NO' : 'NEUTRE'}
          </span>
        </div>
      )}

      {/* HOT accent line */}
      {signal.hot && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--teal), var(--accent2), var(--pink))' }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'var(--mono)' }}
          >
            {getCategoryLabel(signal.category)}
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ fontFamily: 'var(--mono)', background: 'var(--surface3)', color: 'var(--text3)' }}
          >
            {getRegionLabel(signal.region)}
          </span>
          {signal.hot && (
            <span
              className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ fontFamily: 'var(--mono)', background: 'rgba(255,112,67,0.12)', color: 'var(--fire-color)' }}
            >
              <IconFire size={9} />HOT
            </span>
          )}
          {isResolved && (
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ fontFamily: 'var(--mono)', background: 'rgba(29,228,222,0.10)', color: 'var(--teal)' }}
            >
              Résolu
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
            {signal.timeAgo}
          </span>
          <button
            onClick={handleBookmark}
            aria-label={bookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className="p-1 rounded-lg transition-colors"
            style={{
              color:      bookmarked ? 'var(--teal)' : 'var(--text3)',
              background: bookmarked ? 'rgba(29,228,222,0.08)' : 'transparent',
            }}
          >
            <IconBookmark size={13} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3
        className={cn('font-bold leading-snug', compact ? 'text-sm' : 'text-[15px]')}
        style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
      >
        {signal.title}
      </h3>
      {!compact && signal.description && (
        <p className="mt-1.5 text-[12px] leading-relaxed line-clamp-2" style={{ color: 'var(--text2)' }}>
          {signal.description}
        </p>
      )}

      {/* Resolved result */}
      {isResolved && signal.resolvedResult !== undefined && (
        <div className="mt-4 flex items-center gap-4">
          <div>
            <span className="text-[9px] uppercase tracking-wider block mb-0.5" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
              Prédiction foule
            </span>
            <span
              className={cn('text-sm font-bold', signal.yesPercent > 50 ? 'text-[var(--teal)]' : 'text-[var(--pink)]')}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {signal.yesPercent > 50 ? 'YES' : 'NO'}{' '}
              <span className="text-xs font-normal" style={{ color: 'var(--text3)' }}>
                {Math.max(signal.yesPercent, signal.noPercent)}%
              </span>
            </span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider block mb-0.5" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
              Résultat réel
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold',
                signal.resolvedResult
                  ? 'bg-[rgba(29,228,222,0.12)] text-[var(--teal)]'
                  : 'bg-[rgba(255,77,117,0.12)] text-[var(--zred)]',
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {signal.resolvedResult ? 'VRAI' : 'FAUX'}
            </span>
          </div>
        </div>
      )}

      {/* Active signal: vote section */}
      {!isResolved && (
        <div className="mt-auto pt-4">
          {/* Stats */}
          <div className="flex items-baseline gap-3 mb-2">
            <div className="flex items-baseline gap-1">
              <span
                className="text-[22px] font-bold"
                style={{ color: voted === 'yes' ? 'var(--teal)' : 'var(--text)', fontFamily: 'var(--mono)', lineHeight: 1 }}
              >
                {yes}%
              </span>
              <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>YES</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-[16px] font-semibold"
                style={{ color: voted === 'no' ? 'var(--pink)' : 'var(--text2)', fontFamily: 'var(--mono)', lineHeight: 1 }}
              >
                {no}%
              </span>
              <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--mono)', color: 'var(--pink)' }}>NO</span>
            </div>
            {neutral > 0 && (
              <div className="flex items-baseline gap-1">
                <span className="text-[13px] font-medium" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', lineHeight: 1 }}>
                  {neutral}%
                </span>
                <span className="text-[10px]" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>—</span>
              </div>
            )}
          </div>

          {/* Tri-segment bar */}
          <div className="w-full h-2 rounded-full overflow-hidden flex mb-4" style={{ background: 'var(--surface3)' }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width:        `${yes}%`,
                background:   voted === 'yes' ? 'var(--teal)' : 'rgba(29,228,222,0.55)',
                borderRadius: '9999px 0 0 9999px',
              }}
            />
            {neutral > 0 && (
              <div
                className="h-full transition-all duration-500"
                style={{
                  width:      `${neutral}%`,
                  background: voted === 'neutral' ? 'var(--text3)' : 'rgba(168,168,192,0.3)',
                  margin:     '0 1px',
                }}
              />
            )}
            <div
              className="h-full transition-all duration-500"
              style={{
                width:        `${no}%`,
                background:   voted === 'no' ? 'var(--pink)' : 'rgba(255,107,157,0.4)',
                borderRadius: '0 9999px 9999px 0',
              }}
            />
          </div>

          {/* Vote count */}
          <div
            className="flex items-center gap-1.5 text-[10px] mb-3"
            style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
          >
            <IconTrending size={10} />
            {formatNumber(signal.totalVotes)} signaux
          </div>

          {/* YES / NEUTRAL / NO buttons */}
          {!voted ? (
            <div className="grid grid-cols-3 gap-2">
              <VoteButton label="YES" onClick={() => handleVote('yes')} variant="yes" />
              <VoteButton label="—" sublabel="NEUTRE" onClick={() => handleVote('neutral')} variant="neutral" />
              <VoteButton label="NO" onClick={() => handleVote('no')} variant="no" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <VoteButton label="YES" onClick={() => {}} variant="yes"     state={voted === 'yes'     ? 'active' : 'dim'} disabled />
              <VoteButton label="—" sublabel="NEUTRE" onClick={() => {}} variant="neutral" state={voted === 'neutral' ? 'active' : 'dim'} disabled />
              <VoteButton label="NO"  onClick={() => {}} variant="no"      state={voted === 'no'      ? 'active' : 'dim'} disabled />
            </div>
          )}

          {/* Post-vote feedback */}
          {voted && (
            <div className="mt-3 space-y-3">
              <div
                className="p-3 rounded-xl text-xs"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}
              >
                <span style={{ color: 'var(--text2)' }}>Signal enregistré : </span>
                <span
                  className="font-bold"
                  style={{ color: voted === 'yes' ? 'var(--teal)' : voted === 'neutral' ? 'var(--text2)' : 'var(--pink)' }}
                >
                  {voted === 'yes' ? 'YES' : voted === 'no' ? 'NO' : 'NEUTRE'}
                </span>
                {voted !== 'neutral' && (
                  <span style={{ color: 'var(--text3)' }}>
                    {' — '}
                    {(voted === 'yes' && yes > 50) || (voted === 'no' && no > 50)
                      ? 'Aligné avec la majorité.'
                      : 'Contre la majorité.'}
                  </span>
                )}
                {voted === 'neutral' && (
                  <span style={{ color: 'var(--text3)' }}> — Abstention comptabilisée.</span>
                )}
              </div>
              {signal.regionalBreakdown && (
                <WorldViewComparison breakdown={signal.regionalBreakdown} neutralGlobal={neutral} />
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                  style={{ fontFamily: 'var(--font)', background: 'var(--teal)', color: '#fff' }}
                >
                  Suivant →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mini-avis (optional, post-vote only) */}
      {voted && !isResolved && (
        <div className="mt-3">
          <MiniAvis signalId={signal.id} />
        </div>
      )}

      {/* Reactions */}
      <div
        className="mt-4 pt-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {REACTIONS.map((r) => {
          const count  = reactionCounts[r.key]
          const active = activeReaction === r.key
          return (
            <button
              key={r.key}
              onClick={() => handleReaction(r.key)}
              className={cn('reaction-btn flex-shrink-0', active && 'active')}
              aria-label={r.label}
              title={r.label}
            >
              <span style={{ fontSize: 13 }}>{r.emoji}</span>
              {count > 0 && (
                <span className="text-[11px] font-bold" style={{ color: active ? 'var(--text)' : 'var(--text3)' }}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
        <div className="flex-1" />
        <button onClick={handleShare} className="reaction-btn flex-shrink-0" aria-label="Partager">
          <IconShare size={12} />
          <span className="text-[11px]">Partager</span>
        </button>
      </div>

      {/* Footer: creator + comment toggle */}
      <div
        className="mt-3 flex items-center justify-between gap-2"
        style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}
      >
        <div className="flex items-center gap-2">
          {signal.createdBy && signal.creatorName ? (
            <>
              <Avatar src={signal.creatorAvatar} name={signal.creatorName} size="xs" />
              <span className="text-[11px] font-medium flex items-center gap-0.5" style={{ color: 'var(--text3)' }}>
                {signal.creatorName}
                {signal.verified && <IconCheck size={10} className="inline-block text-[var(--teal)]" />}
              </span>
            </>
          ) : (
            <div />
          )}
        </div>
        <div className="flex items-center gap-2">
          {signal.trending && !isResolved && (
            <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--accent2)' }}>
              <IconTrending size={10} />trending
            </span>
          )}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-[11px] font-semibold reaction-btn"
            aria-label="Voir les commentaires"
            style={{ color: showComments ? 'var(--teal)' : 'var(--text3)' }}
          >
            <IconComment size={12} />
            <span style={{ fontFamily: 'var(--mono)' }}>
              {(signal as unknown as { comment_count?: number }).comment_count ?? 0}
            </span>
          </button>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <SignalComments
          signalId={signal.id}
          initialComments={[]}
          commentCount={(signal as unknown as { comment_count?: number }).comment_count ?? 0}
        />
      )}
    </div>
  )
}

// ── VoteButton ─────────────────────────────────────────────────────────────────
type VoteVariant = 'yes' | 'no' | 'neutral'
type VoteState   = 'idle' | 'active' | 'dim'

interface VoteButtonProps {
  label:     string
  sublabel?: string
  onClick:   () => void
  variant:   VoteVariant
  state?:    VoteState
  disabled?: boolean
}

function VoteButton({ label, sublabel, onClick, variant, state = 'idle', disabled = false }: VoteButtonProps) {
  const isActive = state === 'active'
  const isDim    = state === 'dim'

  const styleMap = {
    yes: {
      idle:   { bg: 'rgba(29,228,222,0.10)',  border: 'rgba(29,228,222,0.25)',  color: 'var(--teal)' },
      active: { bg: 'var(--teal)',             border: 'var(--teal)',             color: 'var(--bg)'   },
    },
    no: {
      idle:   { bg: 'rgba(255,107,157,0.10)', border: 'rgba(255,107,157,0.25)', color: 'var(--pink)' },
      active: { bg: 'var(--pink)',             border: 'var(--pink)',             color: '#fff'        },
    },
    neutral: {
      idle:   { bg: 'rgba(168,168,192,0.08)', border: 'rgba(168,168,192,0.18)', color: 'var(--text3)' },
      active: { bg: 'var(--surface3)',         border: 'var(--border3)',          color: 'var(--text2)' },
    },
  }

  const s = isActive ? styleMap[variant].active : styleMap[variant].idle

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'vote-btn flex flex-col items-center justify-center gap-0.5 min-h-[52px] py-2',
        !disabled && 'hover:brightness-110',
        isDim && 'opacity-20',
      )}
      style={{ background: s.bg, border: `1px solid ${s.border}`, fontFamily: 'var(--mono)', borderRadius: '12px' }}
    >
      <span className="text-[14px] font-bold leading-none" style={{ color: s.color }}>{label}</span>
      {sublabel && (
        <span
          className="text-[8px] font-semibold uppercase tracking-wider"
          style={{ color: isActive ? (variant === 'neutral' ? 'var(--text2)' : 'rgba(255,255,255,0.7)') : 'var(--text3)' }}
        >
          {sublabel}
        </span>
      )}
    </button>
  )
}
