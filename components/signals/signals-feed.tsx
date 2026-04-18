'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SignalCard } from '@/components/signals/signal-card'
import { mockSignals, SIGNAL_CATEGORIES, SIGNAL_REGIONS } from '@/lib/signals-data'
import { useLanguage } from '@/components/providers/language-provider'

const SORT_OPTIONS = [
  { id: 'trending', label: 'Tendances' },
  { id: 'latest', label: 'Récents' },
  { id: 'consensus', label: 'Consensus' },
  { id: 'divergence', label: 'Divergence' },
]

export function SignalsFeed() {
  const { t } = useLanguage()
  const [sortBy, setSortBy] = useState('trending')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  // Filter and sort signals
  const filteredSignals = useMemo(() => {
    let signals = mockSignals.filter((s) => s.status === 'active')

    // Category filter
    if (selectedCategory) {
      signals = signals.filter((s) => s.category === selectedCategory)
    }

    // Region filter
    if (selectedRegion) {
      signals = signals.filter((s) => s.region === selectedRegion)
    }

    // Sort
    switch (sortBy) {
      case 'latest':
        signals.sort((a, b) => {
          const timeMap: Record<string, number> = {
            '1h ago': 1, '2h ago': 2, '3h ago': 3, '4h ago': 4,
            '5h ago': 5, '6h ago': 6, '7h ago': 7, '8h ago': 8,
            '30m ago': 0.5,
          }
          return (timeMap[a.timeAgo] || 999) - (timeMap[b.timeAgo] || 999)
        })
        break
      case 'consensus':
        signals.sort((a, b) => {
          const aDivergence = Math.abs(a.yesPercent - 50)
          const bDivergence = Math.abs(b.yesPercent - 50)
          return aDivergence - bDivergence
        })
        break
      case 'divergence':
        signals.sort((a, b) => {
          const aDivergence = Math.abs(a.yesPercent - 50)
          const bDivergence = Math.abs(b.yesPercent - 50)
          return bDivergence - aDivergence
        })
        break
      case 'trending':
      default:
        signals.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        signals.sort((a, b) => b.totalVotes - a.totalVotes)
    }

    return signals.slice(0, 30)
  }, [sortBy, selectedCategory, selectedRegion])

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Sort pills */}
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-wide mb-3"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}
          >
            Trier par
          </p>
          <div className="flex gap-2 flex-wrap">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: sortBy === option.id ? 'var(--primary)' : 'var(--surface)',
                  color: sortBy === option.id ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${sortBy === option.id ? 'var(--primary)' : 'var(--border)'}`,
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-wide mb-3"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}
          >
            Catégorie
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: selectedCategory === null ? 'var(--primary)' : 'var(--surface)',
                color: selectedCategory === null ? 'white' : 'var(--text-muted)',
                border: `1px solid ${selectedCategory === null ? 'var(--primary)' : 'var(--border)'}`,
              }}
            >
              Tous
            </button>
            {SIGNAL_CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: selectedCategory === cat.id ? 'var(--primary)' : 'var(--surface)',
                  color: selectedCategory === cat.id ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${selectedCategory === cat.id ? 'var(--primary)' : 'var(--border)'}`,
                }}
              >
                {cat.labelFr}
              </button>
            ))}
          </div>
        </div>

        {/* Region pills */}
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-wide mb-3"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}
          >
            Région
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedRegion(null)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: selectedRegion === null ? 'var(--primary)' : 'var(--surface)',
                color: selectedRegion === null ? 'white' : 'var(--text-muted)',
                border: `1px solid ${selectedRegion === null ? 'var(--primary)' : 'var(--border)'}`,
              }}
            >
              Monde
            </button>
            {SIGNAL_REGIONS.slice(1, 5).map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: selectedRegion === region.id ? 'var(--primary)' : 'var(--surface)',
                  color: selectedRegion === region.id ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${selectedRegion === region.id ? 'var(--primary)' : 'var(--border)'}`,
                }}
              >
                {region.labelFr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p
          className="text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          {filteredSignals.length} signal{filteredSignals.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Signals grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSignals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>

      {/* Empty state */}
      {filteredSignals.length === 0 && (
        <div
          className="py-16 text-center"
          style={{ background: 'var(--surface)', borderRadius: 'var(--radius)' }}
        >
          <p style={{ color: 'var(--text-muted)' }}>
            Aucun signal ne correspond à vos critères.
          </p>
        </div>
      )}
    </div>
  )
}
