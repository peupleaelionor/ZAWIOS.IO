'use client'

/**
 * ZAWIOS — Virtualized Signal List (60 fps for 10,000+ items)
 *
 * Uses TanStack Virtual for efficient rendering.
 * Only renders visible items + overscan buffer.
 * Activated via feature flag `useVirtualList`.
 *
 * Usage:
 *   <VirtualSignalList signals={signals} />
 */

import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { SignalCard } from '@/components/signals/signal-card'
import type { Signal } from '@/lib/signals-data'

interface VirtualSignalListProps {
  signals: Signal[]
  onVote?: (signalId: string, vote: 'yes' | 'neutral' | 'no') => void
}

/** Estimated height per signal card (px). Virtualizer auto-measures after mount. */
const ESTIMATED_ROW_HEIGHT = 380

export function VirtualSignalList({ signals, onVote }: VirtualSignalListProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: signals.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 3,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <div
      ref={parentRef}
      className="w-full"
      style={{
        height: 'calc(100vh - 200px)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {items.map((virtualRow) => {
          const signal = signals[virtualRow.index]
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                paddingBottom: '16px',
              }}
            >
              <SignalCard
                signal={signal}
                onVote={onVote}
              />
            </div>
          )
        })}
      </div>

      {/* End-of-list indicator */}
      {signals.length > 0 && (
        <div
          className="text-center py-8 text-sm"
          style={{ color: 'var(--text-subtle)', fontFamily: 'var(--mono)' }}
        >
          {signals.length} signal{signals.length !== 1 ? 's' : ''} chargé{signals.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
