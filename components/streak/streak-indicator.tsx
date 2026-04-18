'use client'

import { useStreak } from '@/hooks/useStreak'
import { cn } from '@/lib/utils'

interface StreakIndicatorProps {
  className?: string
  /** compact = icon + number only; default = icon + label */
  compact?: boolean
}

export function StreakIndicator({ className, compact = false }: StreakIndicatorProps) {
  const { currentStreak, isStreakActive, streakAtRisk } = useStreak()

  if (currentStreak === 0) return null

  const color = streakAtRisk
    ? 'var(--amber)'
    : isStreakActive
    ? 'var(--teal)'
    : 'var(--text3)'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-md',
        compact ? 'gap-0.5 px-1.5' : 'gap-1.5',
        className,
      )}
      style={{
        background:  `color-mix(in srgb, ${color} 10%, transparent)`,
        border:      `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        fontFamily:  'var(--mono)',
      }}
      title={
        streakAtRisk
          ? 'Vote aujourd\'hui pour maintenir ta série'
          : isStreakActive
          ? `Série active — ${currentStreak} jours`
          : `${currentStreak} jours consécutifs`
      }
    >
      {/* Flame icon — inline SVG, no external dep */}
      <svg
        width={compact ? 11 : 13}
        height={compact ? 11 : 13}
        viewBox="0 0 24 24"
        fill={isStreakActive ? color : 'none'}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.545.416-2.99 1.5-4.5z" />
      </svg>
      <span
        className={cn('font-bold leading-none', compact ? 'text-[10px]' : 'text-[11px]')}
        style={{ color }}
      >
        {currentStreak}
      </span>
      {!compact && (
        <span
          className="text-[9px] leading-none hidden sm:inline"
          style={{ color: 'var(--text3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
        >
          {currentStreak === 1 ? 'jour' : 'jours'}
        </span>
      )}
    </div>
  )
}
