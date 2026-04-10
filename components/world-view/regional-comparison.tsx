'use client'

import { formatNumber } from '@/lib/utils'
import type { RegionalBreakdown } from '@/types'

interface Props {
  data: RegionalBreakdown[]
}

const REGION_LABELS: Record<string, string> = {
  Global: 'Mondial',
  Africa: 'Afrique',
  France: 'France',
  Europe: 'Europe',
  USA: 'États-Unis',
}

export function RegionalComparison({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.yes_percent - a.yes_percent)
  const max = sorted[0]?.yes_percent ?? 100

  return (
    <div>
      <p
        className="text-xs font-bold tracking-widest mb-5"
        style={{ color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}
      >
        COMPARAISON RÉGIONALE
      </p>

      <div className="space-y-4">
        {sorted.map((item) => {
          const isLeader = item.yes_percent === max
          return (
            <div key={item.region}>
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-xs font-medium"
                  style={{
                    color: isLeader ? 'var(--text)' : 'var(--text3)',
                    fontFamily: 'var(--mono)',
                  }}
                >
                  {REGION_LABELS[item.region] ?? item.region}
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                  >
                    {formatNumber(item.vote_count)} votes
                  </span>
                  <span
                    className="text-xs font-bold w-8 text-right"
                    style={{
                      color: isLeader ? 'var(--teal)' : 'var(--text)',
                      fontFamily: 'var(--mono)',
                    }}
                  >
                    {item.yes_percent}%
                  </span>
                </div>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--surface2)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.yes_percent}%`,
                    background: isLeader ? 'var(--teal)' : 'rgba(124,110,240,0.45)',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs mt-5" style={{ color: 'var(--text3)' }}>
        Résultats basés sur les votes de la communauté ZAWIOS par zone géographique.
      </p>
    </div>
  )
}
