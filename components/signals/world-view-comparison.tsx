'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { type RegionalBreakdown } from '@/lib/signals-data'
import { IconRegion } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'

interface WorldViewComparisonProps {
  breakdown: RegionalBreakdown
  userRegion?: keyof RegionalBreakdown
  className?: string
}

// Safe-by-default regions (always visible) — labels resolved at render time
const SAFE_REGION_KEYS: { key: keyof RegionalBreakdown }[] = [
  { key: 'global' },
]

// Opt-in regions (hidden by default)
const COMPARE_REGION_KEYS: { key: keyof RegionalBreakdown }[] = [
  { key: 'africa' },
  { key: 'france' },
  { key: 'europe' },
  { key: 'usa' },
]

export function WorldViewComparison({
  breakdown,
  userRegion = 'global',
  className,
}: WorldViewComparisonProps) {
  const [showCompare, setShowCompare] = useState(false)
  const { t } = useLanguage()

  const regionLabelMap: Record<string, string> = {
    global: t.worldView.regionGlobal,
    africa: t.worldView.regionAfrica,
    france: t.worldView.regionFrance,
    europe: t.worldView.regionEurope,
    usa: t.worldView.regionUSA,
  }

  const SAFE_REGIONS = SAFE_REGION_KEYS.map((r) => ({ ...r, label: regionLabelMap[r.key] ?? r.key }))
  const COMPARE_REGIONS = COMPARE_REGION_KEYS.map((r) => ({ ...r, label: regionLabelMap[r.key] ?? r.key }))
  const regions = showCompare ? [...SAFE_REGIONS, ...COMPARE_REGIONS] : SAFE_REGIONS

  // Compute divergence label
  const vals = [breakdown.global, breakdown.africa, breakdown.france, breakdown.europe, breakdown.usa]
  const spread = Math.max(...vals) - Math.min(...vals)
  const divergenceLabel = spread < 10 ? t.worldView.consensus : spread < 20 ? t.worldView.moderateGap : t.worldView.divergence

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
          {t.worldView.title}
        </span>
        <span className="text-[10px] text-[var(--text3)] ml-auto" style={{ fontFamily: 'var(--mono)' }}>
          {t.worldView.yesPerRegion}
        </span>
      </div>

      {/* Region rows */}
      <div className="divide-y divide-[var(--border)]">
        {regions.map(({ key, label }) => {
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
                      ← {t.worldView.you}
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

      {/* Opt-in to compare regions */}
      {!showCompare && (
        <div className="px-4 py-2.5 border-t border-[var(--border)]">
          <button
            onClick={() => setShowCompare(true)}
            className="text-[10px] font-semibold text-[var(--text3)] hover:text-[var(--teal)] transition-colors"
            style={{ fontFamily: 'var(--mono)' }}
          >
            {t.worldView.ctaOptIn} →
          </button>
        </div>
      )}

      {/* Divergence label (only when comparing) */}
      {showCompare && (
        <div className="px-4 py-2 border-t border-[var(--border)] flex items-center gap-2">
          <span
            className={cn(
              'text-[9px] px-2 py-0.5 rounded-full font-semibold',
              divergenceLabel === t.worldView.consensus
                ? 'bg-[var(--teal)]/10 text-[var(--teal)]'
                : divergenceLabel === t.worldView.divergence
                  ? 'bg-[var(--amber)]/10 text-[var(--amber)]'
                  : 'bg-[var(--accent)]/10 text-[var(--accent)]',
            )}
            style={{ fontFamily: 'var(--mono)' }}
          >
            {divergenceLabel} ({spread}pts)
          </span>
        </div>
      )}

      {/* Footer note */}
      <div className="px-4 py-2 border-t border-[var(--border)]">
        <p className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
          {t.worldView.privacyNote}
        </p>
      </div>
    </div>
  )
}
