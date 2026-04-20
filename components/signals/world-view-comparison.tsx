'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { type RegionalBreakdown } from '@/lib/signals-data'
import { IconRegion } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'

interface WorldViewComparisonProps {
  breakdown: RegionalBreakdown
  userRegion?: keyof RegionalBreakdown
  /** Global neutral percentage to display (from signal data) */
  neutralGlobal?: number
  className?: string
}

// Safe-by-default regions (always visible)
const SAFE_REGIONS: { key: keyof RegionalBreakdown; label: string }[] = [
  { key: 'global', label: 'Global' },
]

// Opt-in regions (hidden by default)
const COMPARE_REGIONS: { key: keyof RegionalBreakdown; label: string }[] = [
  { key: 'africa', label: 'Afrique' },
  { key: 'france', label: 'France'  },
  { key: 'europe', label: 'Europe'  },
  { key: 'usa',    label: 'USA'     },
]

export function WorldViewComparison({
  breakdown,
  userRegion = 'global',
  neutralGlobal = 0,
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

  // Compute divergence label when all regions visible
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
          votes engagés
        </span>
      </div>

      {/* Region rows */}
      <div className="divide-y divide-[var(--border)]">
        {regions.map(({ key, label }) => {
          const yesVal = breakdown[key]
          const effectiveNeutral = key === 'global' && neutralGlobal > 0 ? neutralGlobal : 0
          const committedBase = 100 - effectiveNeutral
          const yesWidth = (yesVal / 100) * committedBase
          const noWidth  = committedBase - yesWidth
          const isUser   = key === userRegion

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
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width:        `${yesWidth}%`,
                    background:   isUser ? 'var(--teal)' : 'rgba(29,228,222,0.45)',
                    borderRadius: '9999px 0 0 9999px',
                  }}
                />
                {effectiveNeutral > 0 && (
                  <div
                    className="h-full"
                    style={{
                      width:      `${effectiveNeutral}%`,
                      background: 'rgba(160,160,184,0.2)',
                      margin:     '0 1px',
                    }}
                  />
                )}
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width:        `${noWidth}%`,
                    background:   'rgba(255,255,255,0.12)',
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
          {neutralGlobal > 0 && (
            <span className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
              · {neutralGlobal}% neutre
            </span>
          )}
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
