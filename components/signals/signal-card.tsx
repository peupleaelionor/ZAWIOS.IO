'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'
import { ReactionBar, type ReactionType, type ReactionCount } from '@/components/comments/reaction-bar'
import { CommentSection } from '@/components/comments/comment-section'
import {
  CATEGORY_COLORS,
  SIGNAL_CATEGORIES,
  SIGNAL_REGIONS,
  type Signal,
} from '@/lib/signals-data'
import { Avatar } from '@/components/ui/avatar'
import { IconTrending, IconCheck } from '@/components/ui/icons'
import { WorldViewComparison } from '@/components/signals/world-view-comparison'
import {
  StrategicContextInput,
  StrategicAnalyses,
  NuanceIndex,
  StrategicSynthesis,
} from '@/components/signals/strategic-context'
import {
  DivergenceGauge,
  ImpactBadge,
  ConvictionSelector,
  ReasonSelector,
  PersonalProjectionPrompt,
  OfficialDoubtBadge,
  AccelerationBadge,
} from '@/components/signals/signal-intelligence-ui'
import { useSignalContexts } from '@/hooks/use-signal-contexts'
import { useLanguage } from '@/components/providers/language-provider'
import { getDefaultReasons } from '@/lib/signal-intelligence'
import type { ConvictionLevel } from '@/lib/editorial-calendar'
import type { PersonalImpact } from '@/lib/signal-intelligence'

import type { Lang } from '@/lib/i18n'

export type TriVote = 'yes' | 'neutral' | 'no'

interface SignalCardProps {
  signal: Signal
  compact?: boolean
  onVote?: (signalId: string, vote: TriVote) => void
  onNext?: () => void
}

const getCategoryLabel = (id: string, lang: Lang) => {
  const cat = SIGNAL_CATEGORIES.find((c) => c.id === id)
  return lang === 'fr' ? (cat?.labelFr ?? id) : (cat?.label ?? id)
}

const getRegionLabel = (id: string, lang: Lang) => {
  const region = SIGNAL_REGIONS.find((r) => r.id === id)
  return lang === 'fr' ? (region?.labelFr ?? id) : (region?.label ?? id)
}

// Deterministic mock reactions seeded from signal id+votes
function seedReactions(signalId: string, totalVotes: number): ReactionCount[] {
  const hash = signalId.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0)
  const base = Math.max(3, Math.floor(totalVotes * 0.008))
  const types: ReactionType[] = ['fire', 'brain', 'bullseye', 'clap', 'diamond', 'eyes']
  return types
    .map((type, i) => ({ type, count: Math.max(0, Math.floor(base * ((Math.abs(hash >> (i * 4)) % 8) / 10)) ) }))
    .filter((r) => r.count > 0)
    .slice(0, 4)
}

export function SignalCard({ signal, compact = false, onVote, onNext }: SignalCardProps) {
  const [voted, setVoted] = useState<TriVote | null>(null)
  const [yesPercent, setYesPercent] = useState(signal.yesPercent)
  const [noPercent, setNoPercent] = useState(signal.noPercent)
  const [neutralPercent] = useState(Math.round(signal.totalVotes * 0.08 / (signal.totalVotes || 1) * 100) || 8)
  const [showComments, setShowComments] = useState(false)
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null)
  const [reactions, setReactions] = useState<ReactionCount[]>(() => seedReactions(signal.id, signal.totalVotes))
  const commentCount = useMemo(() => Math.max(2, Math.floor(signal.totalVotes * 0.012)), [signal.totalVotes])
  const isResolved = signal.status === 'resolved'
  const catStyle = CATEGORY_COLORS[signal.category]
  const { t, lang } = useLanguage()

  const handleReact = (type: ReactionType) => {
    setUserReaction((prev) => {
      const removing = prev === type
      setReactions((rs) => rs.map((r) =>
        r.type === type ? { ...r, count: removing ? Math.max(0, r.count - 1) : r.count + 1 } : r
      ).filter((r) => r.count > 0))
      return removing ? null : type
    })
  }

  // Structured context hook
  const {
    topContexts,
    hasSubmitted,
    submitContext,
    toggleLike,
    likedIds,
    nuanceIndex,
    synthesis,
  } = useSignalContexts(signal.id, signal.totalVotes)

  // Signal intelligence state
  const [conviction, setConviction] = useState<ConvictionLevel | null>(null)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [personalImpact, setPersonalImpact] = useState<PersonalImpact | null>(null)
  const defaultReasons = getDefaultReasons()

  const handleVote = (choice: TriVote) => {
    if (voted || isResolved) return
    setVoted(choice)
    if (choice === 'yes') {
      setYesPercent((p) => Math.min(99, p + 1))
      setNoPercent((p) => Math.max(1, p - 1))
    } else if (choice === 'no') {
      setNoPercent((p) => Math.min(99, p + 1))
      setYesPercent((p) => Math.max(1, p - 1))
    }
    onVote?.(signal.id, choice)

    const feedbackKey = choice === 'neutral'
      ? 'neutral'
      : choice === 'yes'
        ? (yesPercent > 50 ? 'yes-majority' : 'yes-minority')
        : (noPercent > 50 ? 'no-majority' : 'no-minority')

    const feedbackMap: Record<string, string> = {
      'yes-majority': t.vote.alignedMajority,
      'yes-minority': t.vote.againstMajority,
      'no-majority': t.vote.alignedMajority,
      'no-minority': t.vote.againstMajority,
      'neutral': t.vote.abstentionCounted,
    }

    toast.success(
      choice === 'yes' ? t.vote.toastYes
      : choice === 'neutral' ? t.vote.toastNeutral
      : t.vote.toastNo,
      { description: feedbackMap[feedbackKey] },
    )
  }

  return (
    <div
      className="card-hover relative overflow-hidden flex flex-col h-full min-w-0"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 0,
      }}
    >
      {/* ── COVER IMAGE (if present) ── */}
      {!compact && signal.coverImage && (
        <Link href={`/signals/${signal.id}`} className="block">
          <Image
            src={signal.coverImage}
            alt=""
            width={400}
            height={225}
            className="signal-card-cover"
          />
        </Link>
      )}

      <div style={{ padding: compact ? '16px' : '20px' }}>
        {/* ── HEADER: Minimal metadata ── */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category pill — minimal */}
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wide"
              style={{ 
                background: 'var(--surface-alt)', 
                color: 'var(--text-muted)',
                fontFamily: 'var(--mono)' 
              }}
            >
              {getCategoryLabel(signal.category, lang)}
            </span>
            
            {/* Horizon badge if present */}
              {signal.horizon && (
              <span
                className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-lg"
                style={{
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  fontFamily: 'var(--mono)',
                }}
              >
                {signal.horizon === 'court' ? t.signal.horizonShort : signal.horizon === 'moyen' ? t.signal.horizonMedium : t.signal.horizonLong}
              </span>
            )}
          </div>
          
          {/* Time — subtle */}
          <span
            className="text-[10px] whitespace-nowrap shrink-0"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}
          >
            {signal.timeAgo}
          </span>
        </div>

        {/* ── TITLE: Clear hierarchy, links to detail ── */}
        <Link href={`/signals/${signal.id}`} className="block">
          <h3
            className={cn(
              'font-bold leading-snug mb-2 hover:text-[var(--primary)] transition-colors',
              compact ? 'text-[15px]' : 'text-[17px]',
            )}
            style={{ letterSpacing: '-0.01em', color: 'var(--text-strong)' }}
          >
            {signal.title}
          </h3>
        </Link>

        {/* ── DESCRIPTION: Subtle ── */}
        {!compact && signal.description && (
          <p className="text-[14px] leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
            {signal.description}
          </p>
        )}

      {/* ── IMPACT + DOUBT (minimal badges) ── */}
      {!compact && (signal.impactLevel || signal.officialDoubt) && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {signal.impactLevel && <ImpactBadge level={signal.impactLevel} />}
          {signal.officialDoubt && <OfficialDoubtBadge doubt={signal.officialDoubt} />}
        </div>
      )}

      {/* ── RESOLVED RESULT ── */}
      {isResolved && signal.resolvedResult !== undefined && (
        <div className="mt-4 mb-4 flex items-center gap-4">
          <div>
            <span
              className="text-[9px] text-[var(--text3)] uppercase tracking-wider block mb-0.5"
              style={{ fontFamily: 'var(--mono)' }}
            >
              {t.signal.crowdSignal}
            </span>
            <span
              className="text-sm font-bold"
              style={{ 
                fontFamily: 'var(--mono)',
                color: signal.yesPercent > 50 ? 'var(--positive)' : 'var(--negative)'
              }}
            >
              {signal.yesPercent > 50 ? t.vote.yes.toUpperCase() : t.vote.no.toUpperCase()}{' '}
              <span className="text-xs font-normal text-[var(--text3)]">
                {Math.max(signal.yesPercent, signal.noPercent)}%
              </span>
            </span>
          </div>
          <div>
            <span
              className="text-[9px] text-[var(--text3)] uppercase tracking-wider block mb-0.5"
              style={{ fontFamily: 'var(--mono)' }}
            >
              {t.signal.actualResult}
            </span>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
              style={{
                background: signal.resolvedResult ? 'rgba(30, 200, 138, 0.1)' : 'rgba(229, 72, 77, 0.1)',
                color: signal.resolvedResult ? 'var(--positive)' : 'var(--negative)',
                fontFamily: 'var(--mono)',
              }}
            >
              {signal.resolvedResult ? t.signal.true : t.signal.false}
            </span>
          </div>
        </div>
      )}

      {/* ── ACTIVE SIGNAL: VOTE SECTION ── */}
      {!isResolved && (
        <div className="mt-auto pt-4">
          {/* Vote stats — clean layout */}
          <div className="flex items-baseline gap-3 mb-4">
            <div className="flex items-baseline gap-1">
              <span
                className="text-[20px] font-bold"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1, color: 'var(--positive)' }}
              >
                {yesPercent}%
              </span>
              <span className="text-[10px] font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--positive)', opacity: 0.7 }}>
                {t.vote.yes.toUpperCase()}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[12px] font-medium" style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)', lineHeight: 1 }}>
                {neutralPercent}%
              </span>
              <span className="text-[10px]" style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}>
                —
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-[20px] font-bold"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1, color: 'var(--negative)' }}
              >
                {noPercent}%
              </span>
              <span className="text-[10px] font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--negative)', opacity: 0.7 }}>
                {t.vote.no.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Progress bar — clean */}
          <div
            className="w-full h-2 rounded-full overflow-hidden mb-4 flex"
            style={{ background: 'var(--surface-alt)' }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${yesPercent}%`,
                background: 'var(--positive)',
                opacity: voted === 'yes' ? 1 : 0.6,
                borderRadius: '9999px 0 0 9999px',
              }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${noPercent}%`,
                background: 'var(--negative)',
                opacity: voted === 'no' ? 1 : 0.6,
                borderRadius: '0 9999px 9999px 0',
              }}
            />
          </div>

          {/* Vote buttons — mobile-first, always visible */}
          <div className="flex gap-2 w-full" style={{ flexWrap: 'nowrap' }}>
            <button
              onClick={() => handleVote('yes')}
              disabled={voted !== null || isResolved}
              className="flex-1 py-2.5 px-2 rounded-lg font-semibold text-sm transition-all min-w-0"
              style={{
                background: voted === 'yes' ? 'var(--positive)' : 'rgba(30, 200, 138, 0.08)',
                color: voted === 'yes' ? 'white' : 'var(--positive)',
                border: `1.5px solid ${voted === 'yes' ? 'var(--positive)' : 'rgba(30, 200, 138, 0.3)'}`,
                opacity: voted !== null && voted !== 'yes' ? 0.4 : 1,
              }}
            >
              {t.vote.yes}
            </button>
            <button
              onClick={() => handleVote('neutral')}
              disabled={voted !== null || isResolved}
              className="py-2.5 px-2 rounded-lg font-semibold text-sm transition-all shrink-0"
              style={{
                background: voted === 'neutral' ? 'var(--surface-alt)' : 'transparent',
                color: 'var(--text-muted)',
                border: `1.5px solid ${voted === 'neutral' ? 'var(--border2)' : 'var(--border)'}`,
                opacity: voted !== null && voted !== 'neutral' ? 0.4 : 1,
                minWidth: '40px',
              }}
            >
              —
            </button>
            <button
              onClick={() => handleVote('no')}
              disabled={voted !== null || isResolved}
              className="flex-1 py-2.5 px-2 rounded-lg font-semibold text-sm transition-all min-w-0"
              style={{
                background: voted === 'no' ? 'var(--negative)' : 'rgba(229, 72, 77, 0.08)',
                color: voted === 'no' ? 'white' : 'var(--negative)',
                border: `1.5px solid ${voted === 'no' ? 'var(--negative)' : 'rgba(229, 72, 77, 0.3)'}`,
                opacity: voted !== null && voted !== 'no' ? 0.4 : 1,
              }}
            >
              {t.vote.no}
            </button>
          </div>

          {/* Divergence gauge — optional */}
          {signal.divergenceIndex !== undefined && (
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <DivergenceGauge yesPercent={yesPercent} noPercent={noPercent} />
            </div>
          )}
        </div>
      )}
      </div>

      {/* ── SOCIAL FOOTER: reactions + comments toggle ── */}
      <div
        className="px-5 py-3 flex items-center gap-3 min-w-0"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <ReactionBar
          reactions={reactions}
          userReaction={userReaction}
          onReact={handleReact}
          compact
        />
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 transition-colors"
          style={{
            fontSize: 12,
            fontFamily: 'var(--mono)',
            color: showComments ? 'var(--primary)' : 'var(--text-subtle)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 0',
          }}
        >
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          {formatNumber(commentCount)}
        </button>
      </div>

      {/* ── INLINE COMMENT SECTION ── */}
      {showComments && (
        <div
          className="px-5 pb-5"
          style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}
        >
          <CommentSection predictionId={signal.id} commentCount={commentCount} />
        </div>
      )}
    </div>
  )
}
