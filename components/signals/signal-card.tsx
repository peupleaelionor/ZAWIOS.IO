'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'
import { CATEGORY_COLORS, type Signal } from '@/lib/signals-data'
import { Avatar } from '@/components/ui/avatar'
import { IconTrending, IconCheck, IconComment } from '@/components/ui/icons'

interface SignalCardProps {
  signal: Signal
  compact?: boolean
  onVote?: (signalId: string, vote: 'yes' | 'no') => void
}

export function SignalCard({ signal, compact = false, onVote }: SignalCardProps) {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null)
  const [yesPercent, setYesPercent] = useState(signal.yesPercent)
  const [noPercent, setNoPercent] = useState(signal.noPercent)
  const isResolved = signal.status === 'resolved'
  const catStyle = CATEGORY_COLORS[signal.category]

  const handleVote = (choice: 'yes' | 'no') => {
    if (voted || isResolved) return
    setVoted(choice)
    // Simulate slight shift
    if (choice === 'yes') {
      setYesPercent((p) => Math.min(99, p + 1))
      setNoPercent((p) => Math.max(1, p - 1))
    } else {
      setNoPercent((p) => Math.min(99, p + 1))
      setYesPercent((p) => Math.max(1, p - 1))
    }
    onVote?.(signal.id, choice)
    toast.success(choice === 'yes' ? 'YES' : 'NO', {
      description: 'Signal enregistre. Compare avec la foule.',
    })
  }

  return (
    <div className="surface rounded-2xl p-5 card-hover relative overflow-hidden">
      {/* Top accent line */}
      {signal.hot && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--teal), var(--accent), var(--teal))' }}
        />
      )}

      {/* Header: category + region + time */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'var(--mono)' }}
          >
            {signal.category}
          </span>
          <span className="text-[10px] font-medium text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
            {signal.region}
          </span>
          {isResolved && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-[var(--teal)]/15 text-[var(--teal)]" style={{ fontFamily: 'var(--mono)' }}>
              Result
            </span>
          )}
        </div>
        <span className="text-[10px] text-[var(--text3)] whitespace-nowrap" style={{ fontFamily: 'var(--mono)' }}>
          {signal.timeAgo}
        </span>
      </div>

      {/* Title */}
      {isResolved && signal.resolvedResult !== undefined ? (
        <h3 className={cn('font-semibold text-[var(--text)] leading-snug', compact ? 'text-sm' : 'text-[15px]')}>
          {signal.title}
        </h3>
      ) : (
        <h3 className={cn('font-semibold text-[var(--text)] leading-snug', compact ? 'text-sm' : 'text-[15px]')}>
          <span className="text-[var(--text3)] font-bold mr-1.5">SIGNAL:</span>
          {signal.title}
        </h3>
      )}

      {!compact && signal.description && (
        <p className="mt-1.5 text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
          {signal.description}
        </p>
      )}

      {/* Resolved result */}
      {isResolved && signal.resolvedResult !== undefined && (
        <div className="mt-4 flex items-center gap-4">
          <div>
            <span className="text-[10px] text-[var(--text3)] uppercase block" style={{ fontFamily: 'var(--mono)' }}>Prediction</span>
            <span className={cn('text-sm font-bold', signal.yesPercent > 50 ? 'text-[var(--teal)]' : 'text-[var(--zred)]')} style={{ fontFamily: 'var(--mono)' }}>
              {signal.yesPercent > 50 ? 'YES' : 'NO'} ({Math.max(signal.yesPercent, signal.noPercent)}%)
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[var(--text3)] uppercase block" style={{ fontFamily: 'var(--mono)' }}>Actual</span>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold',
                signal.resolvedResult ? 'bg-[var(--teal)]/20 text-[var(--teal)]' : 'bg-[var(--zred)]/20 text-[var(--zred)]'
              )}
              style={{ fontFamily: 'var(--mono)' }}
            >
              {signal.resolvedResult ? 'TRUE' : 'FALSE'}
            </span>
          </div>
        </div>
      )}

      {/* Active signal: vote section */}
      {!isResolved && (
        <div className="mt-4">
          {/* Percentage display + vote buttons */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)', lineHeight: 1 }}>
                  {yesPercent}%
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  {yesPercent}% · {noPercent}%
                </span>
              </div>
            </div>

            {/* YES / NO buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('yes')}
                disabled={voted !== null}
                className={cn(
                  'w-16 h-16 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center',
                  voted === 'yes'
                    ? 'bg-[var(--teal)] text-[var(--bg)] scale-105'
                    : voted === null
                      ? 'text-[var(--teal)] hover:bg-[var(--teal)] hover:text-[var(--bg)]'
                      : 'text-[var(--text3)] opacity-40 cursor-not-allowed',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  border: voted === 'yes' ? '2px solid var(--teal)' : '2px solid color-mix(in srgb, var(--teal) 30%, transparent)',
                }}
              >
                YES
              </button>
              <button
                onClick={() => handleVote('no')}
                disabled={voted !== null}
                className={cn(
                  'w-16 h-16 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center',
                  voted === 'no'
                    ? 'bg-[var(--text)] text-[var(--bg)] scale-105'
                    : voted === null
                      ? 'text-[var(--text2)] hover:bg-[var(--text)] hover:text-[var(--bg)]'
                      : 'text-[var(--text3)] opacity-40 cursor-not-allowed',
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

          {/* Vote count */}
          <div className="mt-3 flex items-center gap-1 text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
            <IconTrending size={10} className="w-2.5 h-2.5" />
            Voted by {formatNumber(signal.totalVotes)} users
          </div>

          {/* Voted feedback */}
          {voted && (
            <div className="mt-3 p-2.5 rounded-lg bg-[var(--surface2)] border border-[var(--border2)]">
              <p className="text-xs text-[var(--text2)]">
                Tu as vote <span className="font-bold text-[var(--text)]">{voted === 'yes' ? 'YES' : 'NO'}</span>.{' '}
                <span className="text-[var(--text3)]">
                  {voted === 'yes' && yesPercent > 50 ? 'Tu es avec la majorite.' : ''}
                  {voted === 'yes' && yesPercent <= 50 ? 'Tu es contre la majorite.' : ''}
                  {voted === 'no' && noPercent > 50 ? 'Tu es avec la majorite.' : ''}
                  {voted === 'no' && noPercent <= 50 ? 'Tu es contre la majorite.' : ''}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer: creator + actions */}
      <div className="mt-4 flex items-center justify-between">
        {signal.createdBy && signal.creatorName ? (
          <div className="flex items-center gap-2">
            <Avatar
              src={signal.creatorAvatar}
              name={signal.creatorName}
              size="xs"
            />
            <span className="text-xs text-[var(--text3)]">
              {signal.creatorName}
              {signal.verified && (
                <IconCheck size={10} className="inline-block ml-0.5 w-2.5 h-2.5 text-[var(--teal)]" />
              )}
            </span>
          </div>
        ) : (
          <div />
        )}
        {signal.trending && !isResolved && (
          <span className="flex items-center gap-1 text-[10px] text-[var(--accent2)]" style={{ fontFamily: 'var(--mono)' }}>
            <IconTrending size={10} className="w-2.5 h-2.5" />
            trending
          </span>
        )}
      </div>
    </div>
  )
}
