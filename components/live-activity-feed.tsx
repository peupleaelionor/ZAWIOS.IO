'use client'

import { useState, useEffect, useCallback } from 'react'
import { Avatar } from '@/components/ui/avatar'
import {
  IconUpvote,
  IconTrending,
  IconTarget,
  IconUsers,
  IconMedal,
} from '@/components/ui/icons'
import { formatRelativeTime, cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ActivityType =
  | 'upvote'
  | 'prediction'
  | 'profile'
  | 'follow'
  | 'achievement'
  | 'trending'
  | 'target'

interface ActivityItem {
  id: string
  user: { name: string; avatarUrl: string }
  type: ActivityType
  description: string
  timestamp: Date
}

interface LiveActivityFeedProps {
  compact?: boolean
  className?: string
}

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                       */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<ActivityType, { icon: typeof IconUpvote; color: string }> = {
  upvote:      { icon: IconUpvote,   color: 'var(--accent)' },
  prediction:  { icon: IconTarget,   color: 'var(--teal)' },
  profile:     { icon: IconUsers,    color: 'var(--blue, #60a8f0)' },
  follow:      { icon: IconUsers,    color: 'var(--accent2, #9d92f8)' },
  achievement: { icon: IconMedal,    color: 'var(--amber, #f0c050)' },
  trending:    { icon: IconTrending, color: 'var(--teal)' },
  target:      { icon: IconTarget,   color: 'var(--accent)' },
}

/* ------------------------------------------------------------------ */
/*  Mock data — 15 diverse entries                                     */
/* ------------------------------------------------------------------ */

function minutesAgo(m: number): Date {
  return new Date(Date.now() - m * 60_000)
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: 'a1',  user: { name: 'Mira Solano',    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mira' },      type: 'upvote',      description: 'upvoted "Fed rate pause likely through Q3"',              timestamp: minutesAgo(1) },
  { id: 'a2',  user: { name: 'Kai Nakamura',   avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai' },       type: 'prediction',  description: 'created a prediction on S&P 500 closing above 5,800',    timestamp: minutesAgo(2) },
  { id: 'a3',  user: { name: 'Lena Vogt',      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lena' },      type: 'achievement', description: 'earned the "Sharp Caller" badge',                        timestamp: minutesAgo(3) },
  { id: 'a4',  user: { name: 'Omar Farid',     avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar' },      type: 'follow',      description: 'started following Mira Solano',                           timestamp: minutesAgo(4) },
  { id: 'a5',  user: { name: 'Yuna Park',      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuna' },      type: 'trending',    description: 'boosted "BTC dominance above 58% by August"',            timestamp: minutesAgo(5) },
  { id: 'a6',  user: { name: 'Dmitri Volkov',  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitri' },    type: 'upvote',      description: 'upvoted "Nvidia earnings beat consensus"',                timestamp: minutesAgo(7) },
  { id: 'a7',  user: { name: 'Anika Sharma',   avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anika' },     type: 'prediction',  description: 'created a prediction on EU AI Act enforcement timeline',  timestamp: minutesAgo(9) },
  { id: 'a8',  user: { name: 'Jules Martin',   avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jules' },     type: 'profile',     description: 'updated their bio and linked portfolio',                  timestamp: minutesAgo(11) },
  { id: 'a9',  user: { name: 'Suki Tanaka',    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suki' },      type: 'target',      description: 'set a price target on ETH at $4,200',                     timestamp: minutesAgo(14) },
  { id: 'a10', user: { name: 'Ezra Coleman',   avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ezra' },      type: 'achievement', description: 'reached a 12-week prediction streak',                    timestamp: minutesAgo(18) },
  { id: 'a11', user: { name: 'Ines Reyes',     avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ines' },      type: 'upvote',      description: 'upvoted "Oil below $70 by September"',                   timestamp: minutesAgo(22) },
  { id: 'a12', user: { name: 'Leo Brandt',     avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo' },       type: 'follow',      description: 'started following Kai Nakamura',                          timestamp: minutesAgo(28) },
  { id: 'a13', user: { name: 'Rosa Almeida',   avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rosa' },      type: 'trending',    description: 'boosted "US unemployment above 4.5% by Q4"',             timestamp: minutesAgo(35) },
  { id: 'a14', user: { name: 'Nico Petrov',    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nico' },      type: 'prediction',  description: 'created a prediction on Apple Vision Pro sales',          timestamp: minutesAgo(42) },
  { id: 'a15', user: { name: 'Hana Kimura',    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hana' },      type: 'profile',     description: 'verified their analyst credentials',                      timestamp: minutesAgo(50) },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const VISIBLE_COUNT = 5
const CYCLE_INTERVAL_MS = 4_000

export function LiveActivityFeed({ compact = false, className }: LiveActivityFeedProps) {
  const [offset, setOffset] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const cycle = useCallback(() => {
    setTransitioning(true)
    const timeout = setTimeout(() => {
      setOffset((prev) => (prev + 1) % MOCK_ACTIVITIES.length)
      setTransitioning(false)
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const id = setInterval(cycle, CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [cycle])

  const visibleItems = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    const idx = (offset + i) % MOCK_ACTIVITIES.length
    return MOCK_ACTIVITIES[idx]
  })

  const iconSize = compact ? 14 : 16

  return (
    <section
      className={cn(
        'flex flex-col rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]',
        className,
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center gap-2 border-b border-[var(--border)]',
          compact ? 'px-3 py-2' : 'px-4 py-3',
        )}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: 'var(--teal)' }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: 'var(--teal)' }}
          />
        </span>
        <h3
          className={cn(
            'font-semibold tracking-tight',
            compact ? 'text-xs' : 'text-sm',
          )}
          style={{ fontFamily: 'var(--font)', color: 'var(--text)' }}
        >
          Live activity
        </h3>
      </div>

      {/* Activity list */}
      <ul className={cn('flex flex-col', compact ? 'gap-0' : 'gap-0')}>
        {visibleItems.map((item, i) => {
          const { icon: Icon, color } = ICON_MAP[item.type]
          const isFirst = i === 0

          return (
            <li
              key={`${item.id}-${offset}`}
              className={cn(
                'flex items-start gap-3 transition-all duration-300',
                compact ? 'px-3 py-2' : 'px-4 py-3',
                i < VISIBLE_COUNT - 1 && 'border-b border-[var(--border)]',
                isFirst && transitioning
                  ? 'opacity-0 -translate-y-1'
                  : 'opacity-100 translate-y-0',
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Avatar
                src={item.user.avatarUrl}
                name={item.user.name}
                size="xs"
              />

              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'leading-snug',
                    compact ? 'text-[11px]' : 'text-xs',
                  )}
                  style={{ color: 'var(--text2)' }}
                >
                  <span
                    className="font-medium"
                    style={{ color: 'var(--text)' }}
                  >
                    {item.user.name}
                  </span>{' '}
                  {item.description}
                </p>
                <span
                  className={cn(
                    'mt-0.5 block',
                    compact ? 'text-[10px]' : 'text-[11px]',
                  )}
                  style={{
                    fontFamily: 'var(--mono)',
                    color: 'var(--text3)',
                  }}
                >
                  {formatRelativeTime(item.timestamp)}
                </span>
              </div>

              <span
                className="mt-0.5 shrink-0"
                style={{ color }}
              >
                <Icon size={iconSize} />
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
