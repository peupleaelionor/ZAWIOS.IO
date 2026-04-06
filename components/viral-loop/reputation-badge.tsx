'use client'

import { getReputationTier, REPUTATION_TIERS } from '@/lib/signals-data'

interface ReputationBadgeProps {
  score: number
  accuracy: number
  totalVotes: number
  streak: number
}

export function ReputationBadge({ score, accuracy, totalVotes, streak }: ReputationBadgeProps) {
  const tier = getReputationTier(score)
  const currentTierIndex = REPUTATION_TIERS.findIndex((t) => t.name === tier.name)
  const nextTier = REPUTATION_TIERS[currentTierIndex + 1]
  const progress = nextTier
    ? ((score - tier.minScore) / (nextTier.minScore - tier.minScore)) * 100
    : 100

  return (
    <div className="surface p-5 rounded-2xl mt-6">
      <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--mono)' }}>
        Reputation
      </p>

      <div className="flex items-center gap-4 mb-4">
        {/* Score */}
        <div className="text-center">
          <p className="text-3xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
            {score.toLocaleString()}
          </p>
          <p className="text-[10px] text-[var(--text3)] mt-0.5" style={{ fontFamily: 'var(--mono)' }}>
            POINTS
          </p>
        </div>

        {/* Tier badge */}
        <div className="flex-1">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: `color-mix(in srgb, ${tier.color} 15%, transparent)`,
              color: tier.color,
              fontFamily: 'var(--mono)',
            }}
          >
            {tier.nameFr}
          </div>
          {nextTier && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] text-[var(--text3)] mb-1" style={{ fontFamily: 'var(--mono)' }}>
                <span>{tier.nameFr}</span>
                <span>{nextTier.nameFr}</span>
              </div>
              <div className="h-1.5 bg-[var(--surface3)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, progress)}%`, background: tier.color }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-px rounded-lg overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        {[
          { value: `${accuracy}%`, label: 'Precision' },
          { value: totalVotes.toString(), label: 'Votes' },
          { value: `${streak}`, label: 'Serie' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--surface2)] py-3 px-2 text-center">
            <p className="text-sm font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
              {stat.value}
            </p>
            <p className="text-[10px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
