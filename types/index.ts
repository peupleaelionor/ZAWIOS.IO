export type Category =
  | 'finance'
  | 'technology'
  | 'politics'
  | 'sports'
  | 'culture'
  | 'business'
  | 'science'
  | 'world'
  | 'work'
  | 'education'
  | 'lifestyle'
  | 'africa'
  | 'future'

export type Region = 'Global' | 'Africa' | 'France' | 'Europe' | 'USA'

export interface RegionalBreakdown {
  region: Region
  yes_percent: number
  vote_count: number
}

export type PredictionType = 'yes_no' | 'multiple_choice' | 'probability'

export type PredictionStatus = 'open' | 'in_progress' | 'resolved' | 'archived'

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export type PlanTier = 'free' | 'premium' | 'creator' | 'business'

export type BillingCycle = 'monthly' | 'annual'

export type AddOnSlug =
  | 'insight-pack'
  | 'report-pack'
  | 'trend-alerts'
  | 'advanced-filters'
  | 'reputation-boost'
  | 'creator-badge'
  | 'verified-analyst'
  | 'team-workspace'
  | 'private-dashboard'
  | 'api-access'

export interface PlanFeature {
  label: string
  included: boolean
  highlight?: boolean
}

export interface Plan {
  tier: PlanTier
  name: string
  tagline: string
  monthlyPrice: number
  annualPrice: number
  cta: string
  href: string
  featured: boolean
  features: PlanFeature[]
}

export interface AddOn {
  slug: AddOnSlug
  name: string
  description: string
  price: string
  frequency: string
  icon: string
  availableFor: PlanTier[]
}

export interface User {
  id: string
  email: string
  username: string
  full_name: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  username: string
  full_name: string
  avatar_url?: string
  bio?: string
  location?: string
  website?: string
  is_premium: boolean
  plan: PlanTier
  created_at: string
  updated_at: string
}

export interface Category_ {
  id: string
  name: Category
  label: string
  description: string
  icon: string
  color: string
  prediction_count: number
}

export interface Prediction {
  id: string
  title: string
  description: string
  category: Category
  type: PredictionType
  status: PredictionStatus
  created_by: string
  creator?: Profile
  resolution_date: string
  resolved_at?: string
  resolution_notes?: string
  vote_count: number
  comment_count: number
  view_count: number
  featured: boolean
  tags: string[]
  options?: PredictionOption[]
  regional_data?: RegionalBreakdown[]
  created_at: string
  updated_at: string
}

export interface PredictionOption {
  id: string
  prediction_id: string
  label: string
  vote_count: number
  percentage: number
  is_correct?: boolean
}

export interface Vote {
  id: string
  user_id: string
  prediction_id: string
  option_id?: string
  probability?: number
  is_yes?: boolean
  created_at: string
  updated_at: string
}

export interface ReputationScore {
  id: string
  user_id: string
  total_score: number
  accuracy_score: number
  prediction_count: number
  correct_predictions: number
  accuracy_rate: number
  global_rank: number
  category_ranks: Record<string, number>
  updated_at: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  tier: BadgeTier
  criteria: string
  awarded_at?: string
}

export interface UserBadge {
  id: string
  user_id: string
  badge_id: string
  badge: Badge
  awarded_at: string
}

export interface Comment {
  id: string
  prediction_id: string
  user_id: string
  author?: Profile
  content: string
  upvotes: number
  created_at: string
  updated_at: string
}

export interface LeaderboardEntry {
  rank: number
  user: Profile
  score: number
  accuracy_rate: number
  prediction_count: number
  category?: Category
}

export interface InsightTrend {
  date: string
  predictions: number
  votes: number
  new_users: number
}

export interface CategoryInsight {
  category: Category
  label: string
  prediction_count: number
  vote_count: number
  avg_accuracy: number
  trending: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  has_more: boolean
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, string | number | boolean>
  timestamp?: string
}

export interface ConversionEvent {
  from: PlanTier
  to: PlanTier
  source: string
  timestamp: string
}
