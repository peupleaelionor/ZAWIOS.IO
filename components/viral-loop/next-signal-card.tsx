'use client'

import Link from 'next/link'
import { formatNumber } from '@/lib/utils'
import { CATEGORY_COLORS, type Signal } from '@/lib/signals-data'
import { IconTrending } from '@/components/ui/icons'

interface NextSignalCardProps {
  signal: Signal
}

export function NextSignalCard({ signal }: NextSignalCardProps) {
  const catStyle = CATEGORY_COLORS[signal.category]

  return (
    <Link href="/" className="block">
      <div className="surface p-4 rounded-xl card-hover flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'var(--mono)' }}
            >
              {signal.category}
            </span>
            <span className="text-[9px] text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
              {signal.region}
            </span>
          </div>
          <p className="text-sm font-semibold text-[var(--text)] line-clamp-1">
            {signal.title}
          </p>
          <p className="text-[10px] text-[var(--text3)] mt-0.5 flex items-center gap-1" style={{ fontFamily: 'var(--mono)' }}>
            <IconTrending size={9} className="w-2.5 h-2.5" />
            {formatNumber(signal.totalVotes)} votes
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-lg font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
            {signal.yesPercent}%
          </span>
        </div>
      </div>
    </Link>
  )
}
