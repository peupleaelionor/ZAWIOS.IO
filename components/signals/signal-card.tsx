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

interface SignalCardProps {
  signal: Signal
  compact?: boolean
  onVote?: (signalId: string, vote: 'yes' | 'no') => void
}

const getCategoryLabel = (id: string) =>
  SIGNAL_CATEGORIES.find((c) => c.id === id)?.labelFr ?? id

const getRegionLabel = (id: string) =>
  SIGNAL_REGIONS.find((r) => r.id === id)?.labelFr ?? id

export function SignalCard({ signal, compact = false, onVote }: SignalCardProps) {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null)
  const [yesPercent, setYesPercent] = useState(signal.yesPercent)
  const [noPercent, setNoPercent] = useState(signal.noPercent)
  const isResolved = signal.status === 'resolved'
  const catStyle = CATEGORY_COLORS[signal.category]

  const handleVote = (choice: 'yes' | 'no') => {
    if (voted || isResolved) return
    setVoted(choice)
    if (choice === 'yes') {
      setYesPercent((p) => Math.min(99, p + 1))
      setNoPercent((p) => Math.max(1, p - 1))
    } else {
      setNoPercent((p) => Math.min(99, p + 1))
      setYesPercent((p) => Math.max(1, p - 1))
    }
    onVote?.(signal.id, choice)
    toast.success(choice === 'yes' ? 'Signal YES enregistré' : 'Signal NO enregistré', {
      description: 'Compare ton signal avec la foule mondiale.',
    })
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
                signal.yesPercent > 50 ? 'text-[var(--teal)]' : 'text-white',
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
          {/* Stats row */}
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

          {/* Split progress bar */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mb-4"
            style={{ background: 'var(--surface3)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${yesPercent}%`,
                background: voted
                  ? voted === 'yes'
                    ? 'var(--teal)'
                    : 'var(--teal)'
                  : 'linear-gradient(90deg, var(--teal), var(--accent))',
              }}
            />
          </div>

          {/* YES / NO buttons + vote count */}
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
                  'w-12 h-12 rounded-full text-[13px] font-bold transition-all duration-150 flex items-center justify-center',
                  voted === 'yes'
                    ? 'bg-[var(--teal)] text-[var(--bg)] scale-105 shadow-[0_0_12px_rgba(23,213,207,0.35)]'
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
                onClick={() => handleVote('no')}
                disabled={voted !== null}
                className={cn(
                  'w-12 h-12 rounded-full text-[13px] font-bold transition-all duration-150 flex items-center justify-center',
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

          {/* Post-vote feedback + World View breakdown */}
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
                  style={{ color: voted === 'yes' ? 'var(--teal)' : 'var(--text)' }}
                >
                  {voted === 'yes' ? 'YES' : 'NO'}
                </span>
                <span className="text-[var(--text3)]">
                  {' — '}
                  {(voted === 'yes' && yesPercent > 50) || (voted === 'no' && noPercent > 50)
                    ? 'Tu es avec la majorité.'
                    : 'Tu es contre la majorité.'}
                </span>
              </div>
              {signal.regionalBreakdown && (
                <WorldViewComparison breakdown={signal.regionalBreakdown} />
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
