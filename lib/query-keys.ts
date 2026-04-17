/**
 * ZAWIOS — Centralized React Query key factory.
 * Every key is typed and constructed here.
 * Never inline queryKeys in components or hooks.
 */

export type SignalFeedParams = {
  category?: string
  region?: string
  sort?: 'trending' | 'latest' | 'popular'
  limit?: number
  offset?: number
}

export type LeaderboardParams = {
  category?: string
  limit?: number
  offset?: number
}

export const queryKeys = {
  signals: {
    all:    ['signals'] as const,
    feed:   (p: SignalFeedParams) => ['signals', 'feed', p] as const,
    detail: (id: string)          => ['signals', id] as const,
    vote:   (id: string)          => ['signals', id, 'vote'] as const,
  },

  leaderboard: {
    all:  ['leaderboard'] as const,
    list: (p: LeaderboardParams) => ['leaderboard', 'list', p] as const,
  },

  profile: {
    all:  ['profile'] as const,
    me:   ['profile', 'me'] as const,
    user: (username: string) => ['profile', 'user', username] as const,
  },
} as const
