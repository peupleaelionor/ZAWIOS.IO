/**
 * ZAWIOS — Centralized Query Keys
 *
 * All React Query keys in one place. Prevents key collisions,
 * enables precise invalidation, and makes the cache inspectable.
 *
 * Convention:
 *   queryKeys.signals.all()        → ['signals']
 *   queryKeys.signals.list(filter) → ['signals', 'list', filter]
 *   queryKeys.signals.detail(id)   → ['signals', 'detail', id]
 */

export const queryKeys = {
  signals: {
    all: () => ['signals'] as const,
    lists: () => [...queryKeys.signals.all(), 'list'] as const,
    list: (filter: Record<string, unknown>) => [...queryKeys.signals.lists(), filter] as const,
    details: () => [...queryKeys.signals.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.signals.details(), id] as const,
    votes: (id: string) => [...queryKeys.signals.all(), 'votes', id] as const,
  },

  hotd: {
    all: () => ['hotd'] as const,
    today: () => [...queryKeys.hotd.all(), 'today'] as const,
    archive: (page: number) => [...queryKeys.hotd.all(), 'archive', page] as const,
  },

  comments: {
    all: () => ['comments'] as const,
    bySignal: (signalId: string) => [...queryKeys.comments.all(), signalId] as const,
    thread: (commentId: string) => [...queryKeys.comments.all(), 'thread', commentId] as const,
  },

  users: {
    all: () => ['users'] as const,
    profile: (userId: string) => [...queryKeys.users.all(), 'profile', userId] as const,
    reputation: (userId: string) => [...queryKeys.users.all(), 'reputation', userId] as const,
    me: () => [...queryKeys.users.all(), 'me'] as const,
  },

  leaderboard: {
    all: () => ['leaderboard'] as const,
    page: (page: number) => [...queryKeys.leaderboard.all(), page] as const,
  },

  suggestions: {
    all: () => ['suggestions'] as const,
    list: (status?: string) => [...queryKeys.suggestions.all(), 'list', status] as const,
    detail: (id: string) => [...queryKeys.suggestions.all(), id] as const,
  },

  admin: {
    all: () => ['admin'] as const,
    signals: (filter?: Record<string, unknown>) => [...queryKeys.admin.all(), 'signals', filter] as const,
    moderation: () => [...queryKeys.admin.all(), 'moderation'] as const,
    stats: () => [...queryKeys.admin.all(), 'stats'] as const,
  },
} as const
