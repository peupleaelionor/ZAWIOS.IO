'use client'

import { cn } from '@/lib/utils'
import { FEED_TABS, SIGNAL_REGIONS, type SignalRegion } from '@/lib/signals-data'

interface FeedFiltersProps {
  activeTab: string
  onTabChange: (tab: string) => void
  activeRegion: SignalRegion | 'all'
  onRegionChange: (region: SignalRegion | 'all') => void
}

export function FeedFilters({ activeTab, onTabChange, activeRegion, onRegionChange }: FeedFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Tab pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {FEED_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200',
              activeTab === tab.id
                ? 'bg-[var(--text)] text-[var(--bg)]'
                : 'text-[var(--text2)] hover:text-[var(--text)] border border-[var(--border2)] hover:bg-white/[0.04]',
            )}
            style={{ fontFamily: 'var(--font)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Region pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SIGNAL_REGIONS.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionChange(region.id)}
            className={cn(
              'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-200',
              activeRegion === region.id
                ? 'bg-[var(--surface3)] text-[var(--text)] border border-[var(--border3)]'
                : 'text-[var(--text3)] hover:text-[var(--text2)]',
            )}
            style={{ fontFamily: 'var(--mono)' }}
          >
            {region.label}
          </button>
        ))}
      </div>
    </div>
  )
}
