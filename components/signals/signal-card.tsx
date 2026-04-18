'use client'

import { useState } from 'react'
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
  GreyZoneOption,
} from '@/components/signals/signal-intelligence-ui'
import { useSignalContexts } from '@/hooks/use-signal-contexts'
import { useLanguage } from '@/components/providers/language-provider'
import { getDefaultReasons } from '@/lib/signal-intelligence'
import type { ConvictionLevel } from '@/lib/editorial-calendar'
import type { PersonalImpact } from '@/lib/signal-intelligence'

export type TriVote = 'yes' | 'neutral' | 'no'

interface SignalCardProps {
  signal: Signal
  compact?: boolean
  onVote?: (signalId: string, vote: TriVote) => void
  onNext?: () => void
}

const getCategoryLabel = (id: string) =>
  SIGNAL_CATEGORIES.find((c) => c.id === id)?.labelFr ?? id

const getRegionLabel = (id: string) =>
  SIGNAL_REGIONS.find((r) => r.id === id)?.labelFr ?? id

export function SignalCard({ signal, compact = false, onVote, onNext }: SignalCardProps) {
  const [voted, setVoted] = useState<TriVote | null>(null)
  const [yesPercent, setYesPercent] = useState(signal.yesPercent)
  const [noPercent, setNoPercent] = useState(signal.noPercent)
  const [neutralPercent] = useState(Math.round(signal.totalVotes * 0.08 / (signal.totalVotes || 1) * 100) || 8)
  const isResolved = signal.status === 'resolved'
  const catStyle = CATEGORY_COLORS[signal.category]
  const { t } = useLanguage()

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
  const [tooEarly, setTooEarly] = useState(false)
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
      className="card-hover relative overflow-hidden flex flex-col"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: 'var(--radius)',
        padding: compact ? '14px' : '16px 18px 14px',
      }}
    >
      {/* HOT accent line */}
      {signal.hot && (
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent) 50%, transparent)' }}
        />
      )}

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Category pill */}
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
            style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'var(--mono)' }}
          >
            {getCategoryLabel(signal.category)}
          </span>
          {/* Region pill */}
          <span
            className="text-[11px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              fontFamily: 'var(--mono)',
              background: 'var(--surface3)',
              color: 'var(--text3)',
            }}
          >
            {getRegionLabel(signal.region)}
          </span>
          {/* HOT → Acceleration badge */}
          {signal.hot && (
            <AccelerationBadge accelerating={true} />
          )}
          {isResolved && (
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                fontFamily: 'var(--mono)',
                background: 'rgba(78,228,154,0.10)',
                color: 'var(--win)',
              }}
            >
              {t.signal.resolved}
            </span>
          )}
        </div>
        <span
          className="text-[11px] text-[var(--text3)] whitespace-nowrap shrink-0 mt-0.5"
          style={{ fontFamily: 'var(--mono)' }}
        >
          {signal.timeAgo}
        </span>
      </div>

      {/* ── Title ── */}
      <h3
        className={cn(
          'font-bold text-[var(--text)] leading-snug',
          compact ? 'text-[15px]' : 'text-base',
        )}
        style={{ letterSpacing: '-0.01em' }}
      >
        {signal.title}
      </h3>

      {!compact && signal.description && (
        <p className="mt-1.5 text-[13px] text-[var(--text2)] line-clamp-2 leading-relaxed">
          {signal.description}
        </p>
      )}

      {/* ── Signal Intelligence: Horizon + Impact + Doubt badges ── */}
      {!compact && (
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {signal.horizon && (
            <span
              className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                fontFamily: 'var(--mono)',
                color: 'var(--info)',
                background: 'var(--info-soft)',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {signal.horizon}
            </span>
          )}
          <ImpactBadge level={signal.impact || 'structurel'} />
          <OfficialDoubtBadge doubt={null} />
        </div>
      )}

      {/* ── Resolved result ── */}
      {isResolved && signal.resolvedResult !== undefined && (
        <div className="mt-4 flex items-center gap-4">
          <div>
            <span
              className="text-[10px] text-[var(--text3)] uppercase tracking-wider block mb-0.5"
              style={{ fontFamily: 'var(--mono)' }}
            >
              {t.signal.crowdSignal}
            </span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    signal.yesPercent > 50 ? 'text-[var(--yes)]' : 'text-white',
                  )}
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {signal.yesPercent > 50 ? t.vote.yes.toUpperCase() : t.vote.no.toUpperCase()}{' '}
                  <span className="text-xs font-normal text-[var(--text3)]">
                    {Math.max(signal.yesPercent, signal.noPercent)}%
                  </span>
                </span>
          </div>
          <div>
            <span
              className="text-[10px] text-[var(--text3)] uppercase tracking-wider block mb-0.5"
              style={{ fontFamily: 'var(--mono)' }}
            >
              {t.signal.actualResult}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold',
                signal.resolvedResult
                  ? 'bg-[var(--win)]/10 text-[var(--win)]'
                  : 'bg-[var(--no)]/10 text-[var(--no)]',
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {signal.resolvedResult ? t.signal.true : t.signal.false}
            </span>
          </div>
        </div>
      )}

      {/* ── Active signal: vote section ── */}
      {!isResolved && (
        <div className="mt-auto pt-4">
          {/* Stats row — tri-state */}
          <div className="flex items-baseline gap-4 mb-3">
            <div className="flex items-baseline gap-1">
              <span
                className="text-[22px] font-bold"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1, color: 'var(--yes)' }}
              >
                {yesPercent}%
              </span>
              <span className="text-[11px] font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--yes)', opacity: 0.7 }}>{t.vote.yes.toUpperCase()}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[13px] font-medium" style={{ fontFamily: 'var(--mono)', color: 'var(--text3)', lineHeight: 1 }}>{neutralPercent}%</span>
              <span className="text-[11px]" style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}>—</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-[15px] font-semibold"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1, color: 'var(--no)', opacity: 0.75 }}
              >
                {noPercent}%
              </span>
              <span className="text-[11px] font-semibold" style={{ fontFamily: 'var(--mono)', color: 'var(--no)', opacity: 0.6 }}>{t.vote.no.toUpperCase()}</span>
            </div>
          </div>

          {/* Tri-segment progress bar: teal | gray | light */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mb-4 flex"
            style={{ background: 'var(--surface3)' }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${yesPercent}%`,
                background: 'var(--yes)',
                opacity: voted === 'yes' ? 1 : 0.5,
                borderRadius: '9999px 0 0 9999px',
              }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${neutralPercent}%`, background: 'var(--surface3)' }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${noPercent}%`,
                background: 'var(--no)',
                opacity: voted === 'no' ? 1 : 0.4,
                borderRadius: '0 9999px 9999px 0',
              }}
            />
          </div>

          {/* Vote buttons + vote count */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                <IconTrending size={10} className="w-2.5 h-2.5 shrink-0" />
                {formatNumber(signal.totalVotes)} {t.signal.votes}
              </div>
              {/* Divergence gauge */}
              <DivergenceGauge yesPercent={yesPercent} noPercent={noPercent} />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('yes')}
                disabled={voted !== null}
                className={cn(
                  'min-w-[52px] h-11 rounded-full text-[12px] font-bold transition-all duration-150 flex items-center justify-center',
                  voted === 'yes'
                    ? 'scale-105'
                    : voted === null
                      ? 'active:scale-95'
                      : 'opacity-25 cursor-not-allowed',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  background: voted === 'yes' ? 'var(--yes)' : 'transparent',
                  color: voted === 'yes' ? '#fff' : 'var(--yes)',
                  border: voted === 'yes' ? '2px solid var(--yes)' : '2px solid rgba(20,200,190,0.3)',
                  boxShadow: voted === 'yes' ? '0 0 14px rgba(20,200,190,0.25)' : 'none',
                }}
              >
                {t.vote.yes.toUpperCase()}
              </button>
              <button
                onClick={() => handleVote('neutral')}
                disabled={voted !== null}
                className={cn(
                  'min-w-[44px] h-11 rounded-full text-[14px] font-bold transition-all duration-150 flex items-center justify-center',
                  voted === 'neutral' ? 'scale-105' : voted === null ? 'active:scale-95' : 'opacity-25 cursor-not-allowed',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  background: voted === 'neutral' ? 'var(--surface3)' : 'transparent',
                  color: 'var(--text3)',
                  border: voted === 'neutral' ? '2px solid var(--border3)' : '2px solid var(--border)',
                }}
              >
                —
              </button>
              <button
                onClick={() => handleVote('no')}
                disabled={voted !== null}
                className={cn(
                  'min-w-[52px] h-11 rounded-full text-[12px] font-bold transition-all duration-150 flex items-center justify-center',
                  voted === 'no' ? 'scale-105' : voted === null ? 'active:scale-95' : 'opacity-25 cursor-not-allowed',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  background: voted === 'no' ? 'var(--no)' : 'transparent',
                  color: voted === 'no' ? '#fff' : 'var(--no)',
                  border: voted === 'no' ? '2px solid var(--no)' : '2px solid rgba(240,64,78,0.3)',
                  boxShadow: voted === 'no' ? '0 0 14px rgba(240,64,78,0.2)' : 'none',
                }}
              >
                {t.vote.no.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Grey zone: "Trop tôt pour conclure" */}
          {!voted && (
            <div className="mt-2">
              <GreyZoneOption
                selected={tooEarly}
                onSelect={() => {
                  const wasNotSelected = !tooEarly
                  setTooEarly(wasNotSelected)
                  if (wasNotSelected) {
                    handleVote('neutral')
                    toast.info('Signal enregistré : Trop tôt pour conclure', {
                      description: 'Votre réserve est comptabilisée.',
                    })
                  }
                }}
              />
            </div>
          )}
          {voted && (
            <div className="mt-3 space-y-3">
              <div
                className="p-3 rounded-lg text-xs"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border2)',
                }}
              >
                <span className="text-[var(--text2)]">{t.vote.youVoted} </span>
                <span
                  className="font-bold"
                  style={{
                    color: voted === 'yes' ? 'var(--yes)'
                         : voted === 'neutral' ? 'var(--text3)'
                         : 'var(--no)',
                  }}
                >
                  {voted === 'yes' ? t.vote.yes.toUpperCase() : voted === 'neutral' ? t.vote.neutral.toUpperCase() : t.vote.no.toUpperCase()}
                </span>
                <span className="text-[var(--text3)]">
                  {' — '}
                  {voted === 'neutral'
                    ? t.vote.abstentionCounted
                    : (voted === 'yes' && yesPercent > 50) || (voted === 'no' && noPercent > 50)
                      ? t.vote.alignedMajority
                      : t.vote.againstMajority}
                </span>
              </div>

              {/* Conviction selector */}
              <ConvictionSelector value={conviction} onChange={setConviction} />

              {/* Reason selector (only for yes/no votes) */}
              {voted !== 'neutral' && (
                <ReasonSelector
                  reasons={voted === 'yes' ? defaultReasons.yes : defaultReasons.no}
                  voteType={voted}
                  selected={selectedReason}
                  onSelect={setSelectedReason}
                />
              )}

              {/* Personal projection */}
              <PersonalProjectionPrompt
                value={personalImpact}
                onChange={setPersonalImpact}
              />

              {signal.regionalBreakdown && (
                <WorldViewComparison breakdown={signal.regionalBreakdown} />
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                  style={{
                    fontFamily: 'var(--font)',
                    background: 'var(--yes)',
                    color: '#fff',
                  }}
                >
                  {t.vote.next} →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Structured context (after vote only) ── */}
      {voted && !isResolved && (
        <div className="mt-3 space-y-3">
          {/* Post-vote analysis input */}
          <StrategicContextInput
            voteType={voted}
            onSubmit={submitContext}
            hasSubmitted={hasSubmitted}
          />

          {/* Top strategic analyses */}
          <StrategicAnalyses
            contexts={topContexts}
            likedIds={likedIds}
            onLike={toggleLike}
          />

          {/* Nuance index */}
          <NuanceIndex percentage={nuanceIndex} />

          {/* Aggregated synthesis */}
          <StrategicSynthesis synthesis={synthesis} />
        </div>
      )}

      {/* ── Footer: creator + trending ── */}
      <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
        {signal.createdBy && signal.creatorName ? (
          <div className="flex items-center gap-2">
            <Avatar src={signal.creatorAvatar} name={signal.creatorName} size="xs" />
            <span className="text-[12px] text-[var(--text3)] font-medium flex items-center gap-0.5">
              {signal.creatorName}
              {signal.verified && (
                <IconCheck size={10} className="inline-block w-2.5 h-2.5 text-[var(--yes)]" />
              )}
            </span>
          </div>
        ) : (
          <div />
        )}
        {signal.trending && !isResolved && (
          <AccelerationBadge accelerating={true} />
        )}
      </div>
    </div>
  )
}
