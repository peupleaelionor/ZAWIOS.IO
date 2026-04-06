'use client'

import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'
import { type Signal } from '@/lib/signals-data'

interface CrowdComparisonProps {
  signal: Signal
  userVote: 'yes' | 'no'
  wasCorrect: boolean
}

export function CrowdComparison({ signal, userVote, wasCorrect }: CrowdComparisonProps) {
  const majorityVote = signal.yesPercent > signal.noPercent ? 'yes' : 'no'
  const withMajority = userVote === majorityVote

  return (
    <div className="surface p-5 rounded-2xl">
      <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--mono)' }}>
        Toi vs. la foule
      </p>

      {/* Bar comparison */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-2" style={{ fontFamily: 'var(--mono)' }}>
          <span className="text-[var(--teal)] font-semibold">YES {signal.yesPercent}%</span>
          <span className="text-[var(--text3)]">NO {signal.noPercent}%</span>
        </div>
        <div className="h-3 bg-[var(--surface3)] rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full"
            style={{
              width: `${signal.yesPercent}%`,
              background: 'var(--teal)',
            }}
          />
          {/* User position indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[var(--bg)]"
            style={{
              left: userVote === 'yes' ? `${Math.min(95, signal.yesPercent / 2)}%` : `${Math.min(95, signal.yesPercent + signal.noPercent / 2)}%`,
              background: userVote === 'yes' ? 'var(--teal)' : 'var(--text)',
            }}
          />
        </div>
      </div>

      {/* User position */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface2)]">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
            wasCorrect ? 'bg-[var(--teal)]/20 text-[var(--teal)]' : 'bg-[var(--zred)]/20 text-[var(--zred)]',
          )}
          style={{ fontFamily: 'var(--mono)' }}
        >
          {userVote === 'yes' ? 'Y' : 'N'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-[var(--text)]">
            Tu as vote {userVote.toUpperCase()}
          </p>
          <p className="text-[10px] text-[var(--text3)]">
            {withMajority ? 'Avec la majorite' : 'Contre la majorite'} · {formatNumber(signal.totalVotes)} votants
          </p>
        </div>
        <span
          className={cn(
            'text-[10px] font-bold px-2 py-0.5 rounded',
            wasCorrect ? 'bg-[var(--teal)]/15 text-[var(--teal)]' : 'bg-[var(--zred)]/15 text-[var(--zred)]',
          )}
          style={{ fontFamily: 'var(--mono)' }}
        >
          {wasCorrect ? '+25 pts' : '+0 pts'}
        </span>
      </div>
    </div>
  )
}
