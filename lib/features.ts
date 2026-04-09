/**
 * ZAWIOS Feature Flags — Plan-based access control
 * Monetize depth, analytics, and infrastructure. Not participation.
 */

import type { PlanTier } from '@/types'

/** Canonical plan type — use PlanTier from @/types everywhere */
export type Plan = PlanTier

// Feature → which plans have access
export const FEATURES = {
  // Analytics (Pro+)
  deepRegionalDivergence:   ['pro', 'creator', 'business'] as Plan[],
  historicalTrends:         ['pro', 'creator', 'business'] as Plan[],
  voteEvolution:            ['pro', 'creator', 'business'] as Plan[],
  polarizationIndex:        ['pro', 'creator', 'business'] as Plan[],
  neutralTrendChart:        ['pro', 'creator', 'business'] as Plan[],
  accuracyDashboard:        ['pro', 'creator', 'business'] as Plan[],
  regionalHeatmap:          ['pro', 'creator', 'business'] as Plan[],
  advancedReputation:       ['pro', 'creator', 'business'] as Plan[],

  // Creator (Creator+)
  publishSignals:           ['creator', 'business'] as Plan[],
  creatorDashboard:         ['creator', 'business'] as Plan[],
  featuredInRankings:       ['creator', 'business'] as Plan[],

  // Intelligence (Business only)
  apiAccess:                ['business'] as Plan[],
  dataExport:               ['business'] as Plan[],
  regionalSentimentDataset: ['business'] as Plan[],
  customReports:            ['business'] as Plan[],
  globalSignalIndex:        ['business'] as Plan[],
} as const

export type Feature = keyof typeof FEATURES

/** Check if a user's plan has access to a feature */
export function hasAccess(plan: Plan | null | undefined, feature: Feature): boolean {
  if (!plan) return false
  return (FEATURES[feature] as readonly string[]).includes(plan)
}

/** Get upgrade prompt text — never "Upgrade now", always analytical */
export function getAccessPrompt(feature: Feature): { label: string; href: string } {
  const businessFeatures: Feature[] = ['apiAccess', 'dataExport', 'regionalSentimentDataset', 'customReports', 'globalSignalIndex']
  if (businessFeatures.includes(feature)) {
    return { label: 'Contacter pour accès', href: '/intelligence' }
  }
  return { label: 'Accéder à l\'analyse complète', href: '/pro' }
}

export const PLAN_LABELS: Record<Plan, string> = {
  free:     'Gratuit',
  pro:      'Pro',
  creator:  'Créateur',
  premium:  'Premium',
  business: 'Intelligence',
}
