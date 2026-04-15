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

const VOTE_FEEDBACK: Record<string, string> = {
  'yes-majority': 'Aligné avec la majorité.',
  'yes-minority': 'Contre la majorité.',
  'no-majority': 'Aligné avec la majorité.',
  'no-minority': 'Contre la majorité.',
  'neutral': 'Abstention comptabilisée.',
}

export function SignalCard({ signal, compact = false, onVote, onNext }: SignalCardProps) {
  const [voted, setVoted] = useState<TriVote | null>(null)
  const [yesPercent, setYesPercent] = useState(signal.yesPercent)
  const [noPercent, setNoPercent] = useState(signal.noPercent)
  const [neutralPercent] = useState(Math.round(signal.totalVotes * 0.08 / (signal.totalVotes || 1) * 100) || 8)
  const isResolved = signal.status === 'resolved'
  const catStyle = CATEGORY_COLORS[signal.category]

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

    toast.success(
      choice === 'yes' ? 'Signal YES enregistré'
      : choice === 'neutral' ? 'Signal NEUTRE enregistré'
      : 'Signal NO enregistré',
      { description: VOTE_FEEDBACK[feedbackKey] },
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
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--teal), var(--accent), var(--teal))' }}
        />
      )}

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Category pill */}
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'var(--mono)' }}
          >
            {getCategoryLabel(signal.category)}
          </span>
          {/* Region pill */}
          <span
            className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              fontFamily: 'var(--mono)',
              background: 'var(--surface3)',
              color: 'var(--text3)',
            }}
          >
            {getRegionLabel(signal.region)}
          </span>
          {/* HOT badge */}
          {signal.hot && (
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                fontFamily: 'var(--mono)',
                background: 'rgba(240,96,112,0.12)',
                color: 'var(--zred)',
              }}
            >
              HOT
            </span>
          )}
          {isResolved && (
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                fontFamily: 'var(--mono)',
                background: 'rgba(23,213,207,0.1)',
                color: 'var(--teal)',
              }}
            >
              Résolu
            </span>
          )}
        </div>
        <span
          className="text-[10px] text-[var(--text3)] whitespace-nowrap shrink-0 mt-0.5"
          style={{ fontFamily: 'var(--mono)' }}
        >
          {signal.timeAgo}
        </span>
      </div>

      {/* ── Title ── */}
      <h3
        className={cn(
          'font-bold text-[var(--text)] leading-snug',
          compact ? 'text-sm' : 'text-[15px]',
        )}
        style={{ letterSpacing: '-0.01em' }}
      >
        {signal.title}
      </h3>

      {!compact && signal.description && (
        <p className="mt-1.5 text-[12px] text-[var(--text2)] line-clamp-2 leading-relaxed">
          {signal.description}
        </p>
      )}

      {/* ── Resolved result ── */}
      {isResolved && signal.resolvedResult !== undefined && (
        <div className="mt-4 flex items-center gap-4">
          <div>
            <span
              className="text-[9px] text-[var(--text3)] uppercase tracking-wider block mb-0.5"
              style={{ fontFamily: 'var(--mono)' }}
            >
              Prédiction foule
            </span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    signal.yesPercent > 50 ? 'text-[var(--accent)]' : 'text-white',
                  )}
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {signal.yesPercent > 50 ? 'YES' : 'NO'}{' '}
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
              Résultat réel
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold',
                signal.resolvedResult
                  ? 'bg-[var(--teal)]/15 text-[var(--teal)]'
                  : 'bg-[var(--zred)]/15 text-[var(--zred)]',
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {signal.resolvedResult ? 'VRAI' : 'FAUX'}
            </span>
          </div>
        </div>
      )}

      {/* ── Active signal: vote section ── */}
      {!isResolved && (
        <div className="mt-auto pt-4">
          {/* Stats row — tri-state */}
          <div className="flex items-baseline gap-3 mb-2.5">
            <div className="flex items-baseline gap-1">
              <span
                className="text-[22px] font-bold text-[var(--text)]"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}
              >
                {yesPercent}%
              </span>
              <span
                className="text-[10px] text-[var(--teal)] font-semibold"
                style={{ fontFamily: 'var(--mono)' }}
              >
                YES
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-[13px] font-semibold text-[var(--text3)]"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}
              >
                {neutralPercent}%
              </span>
              <span
                className="text-[10px] text-[var(--text3)] font-semibold"
                style={{ fontFamily: 'var(--mono)' }}
              >
                —
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-[15px] font-semibold text-[var(--text2)]"
                style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}
              >
                {noPercent}%
              </span>
              <span
                className="text-[10px] text-[var(--text3)] font-semibold"
                style={{ fontFamily: 'var(--mono)' }}
              >
                NO
              </span>
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
                background: voted === 'yes' ? 'var(--teal)' : 'linear-gradient(90deg, var(--teal), var(--teal2))',
                borderRadius: '9999px 0 0 9999px',
              }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${neutralPercent}%`,
                background: 'var(--text3)',
                opacity: 0.3,
              }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${noPercent}%`,
                background: voted === 'no' ? 'var(--text)' : 'rgba(255,255,255,0.15)',
                borderRadius: '0 9999px 9999px 0',
              }}
            />
          </div>

          {/* YES / NEUTRE / NO buttons + vote count */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
              <IconTrending size={10} className="w-2.5 h-2.5 shrink-0" />
              {formatNumber(signal.totalVotes)} votes
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('yes')}
                disabled={voted !== null}
                className={cn(
                  'min-w-[48px] h-12 rounded-full text-[13px] font-bold transition-all duration-150 flex items-center justify-center',
                  voted === 'yes'
                    ? 'bg-[var(--teal)] text-white scale-105 shadow-[0_0_12px_rgba(23,213,207,0.35)]'
                    : voted === null
                      ? 'text-[var(--teal)] hover:bg-[var(--teal)]/10 active:scale-95'
                      : 'text-[var(--text3)] opacity-30 cursor-not-allowed',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  border:
                    voted === 'yes'
                      ? '2px solid var(--teal)'
                      : '2px solid rgba(23,213,207,0.25)',
                }}
              >
                YES
              </button>
              <button
                onClick={() => handleVote('neutral')}
                disabled={voted !== null}
                className={cn(
                  'min-w-[48px] h-12 rounded-full text-[11px] font-bold transition-all duration-150 flex items-center justify-center',
                  voted === 'neutral'
                    ? 'bg-[var(--surface3)] text-[var(--text2)] scale-105'
                    : voted === null
                      ? 'text-[var(--text3)] hover:bg-[var(--surface3)] active:scale-95'
                      : 'text-[var(--text3)] opacity-30 cursor-not-allowed',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  border: voted === 'neutral' ? '2px solid var(--border3)' : '2px solid var(--border)',
                }}
              >
                —
              </button>
              <button
                onClick={() => handleVote('no')}
                disabled={voted !== null}
                className={cn(
                  'min-w-[48px] h-12 rounded-full text-[13px] font-bold transition-all duration-150 flex items-center justify-center',
                  voted === 'no'
                    ? 'bg-[var(--text)] text-[var(--bg)] scale-105'
                    : voted === null
                      ? 'text-[var(--text2)] hover:bg-[var(--text)]/10 active:scale-95'
                      : 'text-[var(--text3)] opacity-30 cursor-not-allowed',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  border: voted === 'no' ? '2px solid var(--text)' : '2px solid var(--border2)',
                }}
              >
                NO
              </button>
            </div>
          </div>

          {/* Post-vote feedback + World View breakdown + Next */}
          {voted && (
            <div className="mt-3 space-y-3">
              <div
                className="p-3 rounded-lg text-xs"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border2)',
                }}
              >
                <span className="text-[var(--text2)]">Tu as voté </span>
                <span
                  className="font-bold"
                  style={{
                    color: voted === 'yes' ? 'var(--teal)'
                         : voted === 'neutral' ? 'var(--text3)'
                         : 'var(--text)',
                  }}
                >
                  {voted === 'yes' ? 'YES' : voted === 'neutral' ? 'NEUTRE' : 'NO'}
                </span>
                <span className="text-[var(--text3)]">
                  {' — '}
                  {voted === 'neutral'
                    ? 'Abstention comptabilisée.'
                    : (voted === 'yes' && yesPercent > 50) || (voted === 'no' && noPercent > 50)
                      ? 'Aligné avec la majorité.'
                      : 'Contre la majorité.'}
                </span>
              </div>
              {signal.regionalBreakdown && (
                <WorldViewComparison breakdown={signal.regionalBreakdown} />
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                  style={{
                    fontFamily: 'var(--font)',
                    background: 'var(--teal)',
                    color: '#fff',
                  }}
                >
                  Suivant →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Footer: creator + trending ── */}
      <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
        {signal.createdBy && signal.creatorName ? (
          <div className="flex items-center gap-2">
            <Avatar src={signal.creatorAvatar} name={signal.creatorName} size="xs" />
            <span className="text-[11px] text-[var(--text3)] font-medium flex items-center gap-0.5">
              {signal.creatorName}
              {signal.verified && (
                <IconCheck size={10} className="inline-block w-2.5 h-2.5 text-[var(--teal)]" />
              )}
            </span>
          </div>
        ) : (
          <div />
        )}
        {signal.trending && !isResolved && (
          <span
            className="flex items-center gap-1 text-[10px] font-semibold"
            style={{ fontFamily: 'var(--mono)', color: 'var(--accent2)' }}
          >
            <IconTrending size={10} className="w-2.5 h-2.5" />
            trending
          </span>
        )}
      </div>
    </div>
  )
}
