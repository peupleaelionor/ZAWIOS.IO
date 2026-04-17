import type { PlanTier } from '@/types'

export type Feature =
  | 'advanced-filters'
  | 'api-access'
  | 'export-data'
  | 'priority-support'
  | 'custom-reports'
  | 'team-workspace'
  | 'white-label'
  | 'regional-breakdown'
  | 'signal-history'
  | 'reputation-insights'

const FEATURE_GATES: Record<Feature, PlanTier[]> = {
  'advanced-filters':   ['premium', 'creator', 'business'],
  'api-access':         ['creator', 'business'],
  'export-data':        ['premium', 'creator', 'business'],
  'priority-support':   ['business'],
  'custom-reports':     ['business'],
  'team-workspace':     ['business'],
  'white-label':        ['business'],
  'regional-breakdown': ['premium', 'creator', 'business'],
  'signal-history':     ['premium', 'creator', 'business'],
  'reputation-insights':['creator', 'business'],
}

const FEATURE_LABELS: Record<Feature, string> = {
  'advanced-filters':    'Filtres avancés',
  'api-access':          'Accès API',
  'export-data':         'Export de données',
  'priority-support':    'Support prioritaire',
  'custom-reports':      'Rapports personnalisés',
  'team-workspace':      'Espace équipe',
  'white-label':         'White-label',
  'regional-breakdown':  'Répartition régionale',
  'signal-history':      'Historique complet',
  'reputation-insights': 'Insights réputation',
}

export function hasAccess(feature: Feature, plan: PlanTier): boolean {
  return FEATURE_GATES[feature].includes(plan)
}

export function getAccessPrompt(feature: Feature): { label: string; href: string } {
  const tiers = FEATURE_GATES[feature]
  const name = FEATURE_LABELS[feature]
  const minTier = tiers[0]
  return {
    label: `${name} — plan ${minTier}+`,
    href: '/pricing',
  }
}
