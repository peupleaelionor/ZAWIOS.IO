/**
 * ZAWIOS — Central application configuration
 * All runtime constants in one place. No scattered magic strings.
 */

export const APP_CONFIG = {
  name: 'ZAWIOS',
  tagline: "Intelligence Collective",
  description: "Vote YES · NO · NEUTRE sur les signaux du monde.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://zawios.netlify.app',
  locale: 'fr' as const,
  defaultRegion: 'global' as const,

  // Voting
  vote: {
    neutralWeight: 0,           // Neutral does NOT affect precision score
    maxNeutralPercent: 30,      // Cap neutral shift per local vote
    localShiftDelta: 1,         // Points shifted on local optimistic update
  },

  // Pagination
  pagination: {
    signalsPerPage: 15,
    leaderboardPerPage: 20,
  },

  // Signal lifecycle
  signals: {
    defaultExpiryDays: 30,
    hotThresholdVotes: 10000,
    trendingThresholdVotes: 5000,
  },

  // Reputation tiers
  reputation: {
    decisiveness: {
      formula: 'committed_votes / total_votes',
      committedTypes: ['yes', 'no'] as const,
    },
  },

  // Analytics
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'zawios.netlify.app',
  },

  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
} as const

export type AppConfig = typeof APP_CONFIG
