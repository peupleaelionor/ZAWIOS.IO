'use client'

import { useState, useMemo } from 'react'
import { FeedFilters } from './feed-filters'
import { SignalCard } from './signal-card'
import { mockSignals, type SignalRegion } from '@/lib/signals-data'

export function SignalFeed() {
  const [activeTab, setActiveTab] = useState('trending')
  const [activeRegion, setActiveRegion] = useState<SignalRegion | 'all'>('global')

  const filteredSignals = useMemo(() => {
    let signals = [...mockSignals].filter((s) => s.status === 'active')

    // Region filter
    if (activeRegion !== 'all') {
      signals = signals.filter((s) => s.region === activeRegion)
    }

    // Tab sorting
    switch (activeTab) {
      case 'trending':
        signals = signals
          .filter((s) => s.trending || s.hot)
          .sort((a, b) => b.totalVotes - a.totalVotes)
        break
      case 'latest':
        // Already sorted by most recent (mock order)
        break
      case 'popular':
        signals.sort((a, b) => b.totalVotes - a.totalVotes)
        break
      case 'following':
        // Show user-created for now
        signals = signals.filter((s) => s.createdBy !== null)
        break
    }

    return signals.slice(0, 12)
  }, [activeTab, activeRegion])

  return (
    <div>
      <FeedFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeRegion={activeRegion}
        onRegionChange={setActiveRegion}
      />

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSignals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>

      {filteredSignals.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-[var(--text3)]">Aucun signal pour ces filtres.</p>
        </div>
      )}
    </div>
  )
}
