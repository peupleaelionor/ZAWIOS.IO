'use client'

import { cn } from '@/lib/utils'
import { type RegionalBreakdown } from '@/lib/signals-data'
import { IconRegion } from '@/components/ui/icons'

interface WorldViewComparisonProps {
  breakdown: RegionalBreakdown
  userRegion?: keyof RegionalBreakdown
  className?: string
}

const REGIONS: { key: keyof RegionalBreakdown; label: string; flag: string }[] = [
  { key: 'global',  label: 'Monde',   flag: '🌍' },
  { key: 'africa',  label: 'Afrique', flag: '🌍' },
  { key: 'france',  label: 'France',  flag: '🇫🇷' },
  { key: 'europe',  label: 'Europe',  flag: '🇪🇺' },
  { key: 'usa',     label: 'USA',     flag: '🇺🇸' },
]

export function WorldViewComparison({
  breakdown,
  userRegion = 'global',
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
          % YES par région
        </span>
      </div>

      {/* Region rows */}
      <div className="divide-y divide-[var(--border)]">
        {REGIONS.map(({ key, label }) => {
          const yes = breakdown[key]
          const no = 100 - yes
          const isUser = key === userRegion
          return (
            <div
              key={key}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5',
                isUser && 'bg-[var(--teal)]/5',
              )}
            >
              {/* Label */}
              <div className="w-16 shrink-0">
                <span
                  className={cn(
                    'text-[11px] font-semibold',
                    isUser ? 'text-[var(--teal)]' : 'text-[var(--text2)]',
                  )}
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {label}
                  {isUser && (
                    <span className="ml-1 text-[9px] text-[var(--teal)] opacity-70">
                      ← toi
                    </span>
                  )}
                </span>
              </div>

              {/* Bar */}
              <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--surface3)]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${yes}%`,
                    background: isUser
                      ? 'var(--teal)'
                      : 'rgba(23,213,207,0.4)',
                  }}
                />
              </div>

              {/* Percentages */}
              <div className="flex items-center gap-1.5 shrink-0 w-20 justify-end">
                <span
                  className={cn(
                    'text-[11px] font-bold',
                    isUser ? 'text-[var(--teal)]' : 'text-[var(--text)]',
                  )}
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {yes}%
                </span>
                <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                  / {no}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="px-4 py-2 border-t border-[var(--border)]">
        <p className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
          Données agrégées · mis à jour en temps réel
        </p>
      </div>
    </div>
  )
}
