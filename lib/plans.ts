import type { Plan, AddOn, PlanTier } from '@/types'

export const PLANS: Plan[] = [
  {
    tier: 'free',
    name: 'Free',
    tagline: 'Start predicting and build your reputation.',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: 'Get started free',
    href: '/auth/signup',
    featured: false,
    features: [
      { label: 'Vote on all predictions', included: true },
      { label: 'Create a public profile', included: true },
      { label: 'Global leaderboard access', included: true },
      { label: 'Basic reputation score', included: true },
      { label: 'Community access', included: true },
      { label: '30-day prediction history', included: true },
      { label: 'Advanced analytics', included: false },
      { label: 'Custom alerts', included: false },
      { label: 'Data export', included: false },
      { label: 'Creator tools', included: false },
    ],
  },
  {
    tier: 'premium',
    name: 'Premium',
    tagline: 'Go deeper into signals, trends, and reputation.',
    monthlyPrice: 9,
    annualPrice: 79,
    cta: 'Start Premium',
    href: '/auth/signup?plan=premium',
    featured: true,
    features: [
      { label: 'Everything in Free', included: true },
      { label: 'Full prediction history', included: true, highlight: true },
      { label: 'Advanced accuracy analytics', included: true, highlight: true },
      { label: 'Category & period filters', included: true },
      { label: 'Alerts on followed topics', included: true },
      { label: 'Crowd trend analysis', included: true },
      { label: 'Compare with top predictors', included: true },
      { label: 'Limited CSV export', included: true },
      { label: 'No aggressive ads', included: true },
      { label: 'Premium badge', included: true },
    ],
  },
  {
    tier: 'creator',
    name: 'Creator',
    tagline: 'Publish analyses and build your public credibility.',
    monthlyPrice: 19,
    annualPrice: 159,
    cta: 'Become a Creator',
    href: '/auth/signup?plan=creator',
    featured: false,
    features: [
      { label: 'Everything in Premium', included: true },
      { label: 'Enriched public profile', included: true, highlight: true },
      { label: 'Creator badge', included: true, highlight: true },
      { label: 'Publish analyses & insights', included: true },
      { label: 'Personal dashboard page', included: true },
      { label: 'Featured in rankings', included: true },
      { label: 'Detailed credibility stats', included: true },
      { label: 'Shareable profile links', included: true },
      { label: 'Priority in search', included: true },
      { label: 'Early access to features', included: true },
    ],
  },
  {
    tier: 'business',
    name: 'Business',
    tagline: 'Aggregated intelligence for teams and organizations.',
    monthlyPrice: 99,
    annualPrice: 899,
    cta: 'Contact sales',
    href: '/contact?plan=business',
    featured: false,
    features: [
      { label: 'Everything in Creator', included: true },
      { label: 'Private team dashboard', included: true, highlight: true },
      { label: 'Weekly & monthly reports', included: true, highlight: true },
      { label: 'Aggregated category insights', included: true },
      { label: 'API access & advanced export', included: true },
      { label: 'Anonymized cohort data', included: true },
      { label: 'Market & community signals', included: true },
      { label: 'Multi-user workspace', included: true },
      { label: 'Dedicated support', included: true },
      { label: 'Custom integrations', included: true },
    ],
  },
]

export const ADD_ONS: AddOn[] = [
  {
    slug: 'insight-pack',
    name: 'Insight Pack',
    description: 'Weekly curated insights on crowd trends and prediction accuracy across all categories.',
    price: '$4.99',
    frequency: '/week',
    icon: 'Lightbulb',
    availableFor: ['premium', 'creator', 'business'],
  },
  {
    slug: 'report-pack',
    name: 'Report Pack',
    description: 'Monthly deep-dive reports with aggregated signals, accuracy trends, and category analysis.',
    price: '$14.99',
    frequency: '/month',
    icon: 'FileText',
    availableFor: ['premium', 'creator', 'business'],
  },
  {
    slug: 'trend-alerts',
    name: 'Trend Alerts',
    description: 'Real-time notifications when crowd sentiment shifts significantly on topics you follow.',
    price: '$3.99',
    frequency: '/month',
    icon: 'Bell',
    availableFor: ['premium', 'creator', 'business'],
  },
  {
    slug: 'advanced-filters',
    name: 'Advanced Filters',
    description: 'Filter predictions by accuracy range, time period, confidence level, and predictor reputation.',
    price: '$2.99',
    frequency: '/month',
    icon: 'SlidersHorizontal',
    availableFor: ['premium', 'creator', 'business'],
  },
  {
    slug: 'reputation-boost',
    name: 'Reputation Boost',
    description: 'Enhanced profile visibility with enriched stats display and priority in search results.',
    price: '$6.99',
    frequency: '/month',
    icon: 'Star',
    availableFor: ['premium', 'creator'],
  },
  {
    slug: 'creator-badge',
    name: 'Creator Badge',
    description: 'A visible badge that marks you as a recognized analyst on the platform.',
    price: '$9.99',
    frequency: 'one-time',
    icon: 'Shield',
    availableFor: ['creator'],
  },
  {
    slug: 'verified-analyst',
    name: 'Verified Analyst',
    description: 'Verified status with enhanced credibility indicators on all your predictions and profile.',
    price: '$19.99',
    frequency: 'one-time',
    icon: 'BadgeCheck',
    availableFor: ['creator', 'business'],
  },
  {
    slug: 'team-workspace',
    name: 'Team Workspace',
    description: 'Collaborative workspace for teams to share insights, predictions, and track collective accuracy.',
    price: '$49',
    frequency: '/month',
    icon: 'Users',
    availableFor: ['business'],
  },
  {
    slug: 'private-dashboard',
    name: 'Private Dashboard',
    description: 'A dedicated private dashboard with custom views, saved filters, and exportable reports.',
    price: '$29',
    frequency: '/month',
    icon: 'LayoutDashboard',
    availableFor: ['business'],
  },
  {
    slug: 'api-access',
    name: 'API Access',
    description: 'Full API access for programmatic data retrieval, integration with your tools and workflows.',
    price: '$79',
    frequency: '/month',
    icon: 'Code',
    availableFor: ['business'],
  },
]

// Feature flags - which features are available per plan
export const FEATURE_ACCESS: Record<string, PlanTier[]> = {
  'vote': ['free', 'premium', 'creator', 'business'],
  'basic-profile': ['free', 'premium', 'creator', 'business'],
  'leaderboard': ['free', 'premium', 'creator', 'business'],
  'basic-score': ['free', 'premium', 'creator', 'business'],
  'community': ['free', 'premium', 'creator', 'business'],
  'limited-history': ['free', 'premium', 'creator', 'business'],
  'full-history': ['premium', 'creator', 'business'],
  'advanced-analytics': ['premium', 'creator', 'business'],
  'category-filters': ['premium', 'creator', 'business'],
  'alerts': ['premium', 'creator', 'business'],
  'crowd-trends': ['premium', 'creator', 'business'],
  'compare-predictors': ['premium', 'creator', 'business'],
  'limited-export': ['premium', 'creator', 'business'],
  'no-ads': ['premium', 'creator', 'business'],
  'premium-badge': ['premium', 'creator', 'business'],
  'enriched-profile': ['creator', 'business'],
  'creator-badge': ['creator', 'business'],
  'publish-analyses': ['creator', 'business'],
  'personal-dashboard': ['creator', 'business'],
  'featured-rankings': ['creator', 'business'],
  'credibility-stats': ['creator', 'business'],
  'shareable-links': ['creator', 'business'],
  'private-dashboard': ['business'],
  'reports': ['business'],
  'api-access': ['business'],
  'aggregated-insights': ['business'],
  'multi-user': ['business'],
  'custom-integrations': ['business'],
}

export function hasAccess(feature: string, plan: PlanTier): boolean {
  const allowed = FEATURE_ACCESS[feature]
  if (!allowed) return false
  return allowed.includes(plan)
}

export function getPlan(tier: PlanTier): Plan | undefined {
  return PLANS.find((p) => p.tier === tier)
}

export function getUpgradePath(currentPlan: PlanTier): PlanTier | null {
  const order: PlanTier[] = ['free', 'premium', 'creator', 'business']
  const idx = order.indexOf(currentPlan)
  if (idx < order.length - 1) return order[idx + 1]
  return null
}

export function formatPrice(price: number, _cycle: 'monthly' | 'annual' = 'monthly'): string {
  if (price === 0) return '$0'
  return `$${price}`
}

export function getAnnualSavings(plan: Plan): number {
  if (plan.monthlyPrice === 0) return 0
  const annualFromMonthly = plan.monthlyPrice * 12
  return Math.round(((annualFromMonthly - plan.annualPrice) / annualFromMonthly) * 100)
}
