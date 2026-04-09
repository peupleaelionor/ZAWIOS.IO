'use client'

import { cn } from '@/lib/utils'
import { type RegionalBreakdown } from '@/lib/signals-data'
import { IconRegion } from '@/components/ui/icons'

interface WorldViewComparisonProps {
  breakdown: RegionalBreakdown
  userRegion?: keyof RegionalBreakdown
  /** Global neutral percentage to display (from signal data) */
  neutralGlobal?: number
  className?: string
}

const REGIONS: { key: keyof RegionalBreakdown; label: string }[] = [
  { key: 'global',  label: 'Monde'   },
  { key: 'africa',  label: 'Afrique' },
  { key: 'france',  label: 'France'  },
  { key: 'europe',  label: 'Europe'  },
  { key: 'usa',     label: 'USA'     },
]

export function WorldViewComparison({
  breakdown,
  userRegion = 'global',
  neutralGlobal = 0,
  className,
}: WorldViewComparisonProps) {
  return (
    <div
      className={cn('rounded-xl overflow-hidden', className)}
      style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
        <IconRegion size={13} className="text-[var(--teal)]" />
        <span
          className="text-[10px] font-bold text-[var(--teal)] uppercase tracking-wider"
          style={{ fontFamily: 'var(--mono)' }}
        >
          World View
        </span>
        <span className="text-[10px] text-[var(--text3)] ml-auto" style={{ fontFamily: 'var(--mono)' }}>
          votes engagés
        </span>
      </div>

      {/* Region rows */}
      <div className="divide-y divide-[var(--border)]">
        {REGIONS.map(({ key, label }) => {
          const yesVal = breakdown[key]
          // Apply neutral adjustment for global row if neutralGlobal is provided
          const effectiveNeutral = key === 'global' && neutralGlobal > 0 ? neutralGlobal : 0
          const committedBase = 100 - effectiveNeutral
          // Scale yes/no to fit within committed voters portion
          const yesWidth = (yesVal / 100) * committedBase
          const noWidth = committedBase - yesWidth
          const isUser = key === userRegion

          return (
            <div
              key={key}
              className={cn('flex items-center gap-3 px-4 py-2.5', isUser && 'bg-[var(--teal)]/5')}
            >
              {/* Label */}
              <div className="w-16 shrink-0">
                <span
                  className={cn('text-[11px] font-semibold', isUser ? 'text-[var(--teal)]' : 'text-[var(--text2)]')}
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {label}
                  {isUser && (
                    <span className="ml-1 text-[9px] text-[var(--teal)] opacity-70">← toi</span>
                  )}
                </span>
              </div>

              {/* Tri-segment bar */}
              <div className="flex-1 h-1.5 rounded-full overflow-hidden flex" style={{ background: 'var(--surface3)' }}>
                {/* YES segment */}
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${yesWidth}%`,
                    background: isUser ? 'var(--teal)' : 'rgba(23,213,207,0.45)',
                    borderRadius: '9999px 0 0 9999px',
                  }}
                />
                {/* NEUTRAL segment (global only) */}
                {effectiveNeutral > 0 && (
                  <div
                    className="h-full"
                    style={{
                      width: `${effectiveNeutral}%`,
                      background: 'rgba(160,160,184,0.2)',
                      margin: '0 1px',
                    }}
                  />
                )}
                {/* NO segment */}
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${noWidth}%`,
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '0 9999px 9999px 0',
                  }}
                />
              </div>

              {/* Percentages */}
              <div className="flex items-center gap-1.5 shrink-0 w-20 justify-end">
                <span
                  className={cn('text-[11px] font-bold', isUser ? 'text-[var(--teal)]' : 'text-[var(--text)]')}
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {yesVal}%
                </span>
                <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  / {100 - yesVal - effectiveNeutral}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Neutral note (if applicable) */}
      <div className="px-4 py-2 border-t border-[var(--border)] flex items-center justify-between">
        {neutralGlobal > 0 && (
          <span className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
            {neutralGlobal}% neutre · non-engagé
          </span>
        )}
        <p className="text-[9px] text-[var(--text3)] ml-auto" style={{ fontFamily: 'var(--mono)' }}>
          Données agrégées · temps réel
        </p>
      </div>
    </div>
  )
}
