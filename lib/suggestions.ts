/**
 * ZAWIOS — Suggested Signals module
 *
 * Types, mock data, adaptive threshold, reputation weighting,
 * anti-spam logic for the community subject suggestion system.
 *
 * The platform retains editorial control.
 * Users propose; the community validates; editors publish.
 */

export type TimeHorizon = 'short' | 'medium' | 'long'

export type SuggestionStatus =
  | 'pending'
  | 'community_validated'
  | 'editorial_review'
  | 'approved'
  | 'rejected'

export interface SuggestedSignal {
  id: string
  userId: string
  authorName: string
  title: string
  description: string
  category: string
  timeHorizon: TimeHorizon
  validationScore: number
  validationVotes: number
  rejectionVotes: number
  status: SuggestionStatus
  createdAt: string
  updatedAt: string
}

// ── Mock data ──
export const MOCK_SUGGESTIONS: SuggestedSignal[] = [
  {
    id: 'sug-1',
    userId: 'u1',
    authorName: 'C. Laurent',
    title: "L'IA générative va-t-elle remplacer 30% des emplois créatifs d'ici 2028 ?",
    description:
      'Analyse basée sur les tendances actuelles du marché et les projections sectorielles.',
    category: 'tech',
    timeHorizon: 'medium',
    validationScore: 0.78,
    validationVotes: 94,
    rejectionVotes: 26,
    status: 'community_validated',
    createdAt: '2026-04-15T10:00:00Z',
    updatedAt: '2026-04-16T14:30:00Z',
  },
  {
    id: 'sug-2',
    userId: 'u2',
    authorName: 'L. Faye',
    title: "Le Bitcoin dépassera-t-il 200 000 $ avant fin 2027 ?",
    description:
      'Suite au halving 2024 et aux flux ETF institutionnels.',
    category: 'crypto',
    timeHorizon: 'long',
    validationScore: 0.62,
    validationVotes: 67,
    rejectionVotes: 41,
    status: 'pending',
    createdAt: '2026-04-14T08:15:00Z',
    updatedAt: '2026-04-14T08:15:00Z',
  },
  {
    id: 'sug-3',
    userId: 'u3',
    authorName: 'T. Diop',
    title: "La RDC deviendra-t-elle le premier producteur mondial de cobalt raffiné ?",
    description:
      'Question stratégique liée aux investissements chinois et à la transition énergétique.',
    category: 'geopolitics',
    timeHorizon: 'long',
    validationScore: 0.71,
    validationVotes: 53,
    rejectionVotes: 22,
    status: 'editorial_review',
    createdAt: '2026-04-12T16:45:00Z',
    updatedAt: '2026-04-16T09:00:00Z',
  },
  {
    id: 'sug-4',
    userId: 'u4',
    authorName: 'M. Bah',
    title: 'Le taux de chômage en France passera-t-il sous 6% avant 2027 ?',
    description:
      'Indicateurs macro-économiques et réformes du marché du travail.',
    category: 'finance',
    timeHorizon: 'medium',
    validationScore: 0.55,
    validationVotes: 38,
    rejectionVotes: 31,
    status: 'pending',
    createdAt: '2026-04-13T11:20:00Z',
    updatedAt: '2026-04-13T11:20:00Z',
  },
  {
    id: 'sug-5',
    userId: 'u5',
    authorName: 'A. Ndiaye',
    title: "L'Union Africaine obtiendra-t-elle un siège permanent au Conseil de sécurité ?",
    description:
      'Discussions diplomatiques en cours aux Nations Unies.',
    category: 'geopolitics',
    timeHorizon: 'long',
    validationScore: 0.84,
    validationVotes: 112,
    rejectionVotes: 21,
    status: 'approved',
    createdAt: '2026-04-10T09:30:00Z',
    updatedAt: '2026-04-17T08:00:00Z',
  },
]

// ═══════════════════════════════════════════════════════
// Adaptive Threshold Logic
// ═══════════════════════════════════════════════════════

/**
 * Compute the minimum votes required for community validation.
 *
 * Formula: max(50, 5% of active users over 7 days)
 *
 * @param activeUsersLast7Days - number of active users in the last 7 days
 */
export function computeMinimumVotes(activeUsersLast7Days: number): number {
  return Math.max(50, Math.ceil(activeUsersLast7Days * 0.05))
}

/**
 * Check if a suggestion has reached community validation threshold.
 *
 * Requires:
 * - validation_score >= 0.65
 * - validation_votes >= minimum votes
 */
export function isCommunityValidated(
  suggestion: SuggestedSignal,
  activeUsersLast7Days: number,
): boolean {
  const minVotes = computeMinimumVotes(activeUsersLast7Days)
  return (
    suggestion.validationScore >= 0.65 &&
    suggestion.validationVotes >= minVotes
  )
}

// ═══════════════════════════════════════════════════════
// Reputation-Weighted Voting
// ═══════════════════════════════════════════════════════

/**
 * Compute vote weight based on user reputation.
 *
 * weight = 1 + (reputation_score / 1000)
 * Capped at 3.0
 *
 * @param reputationScore - user's reputation score (0-2000+)
 */
export function computeVoteWeight(reputationScore: number): number {
  return Math.min(3.0, 1 + reputationScore / 1000)
}

/**
 * Recalculate validation_score after a new vote.
 *
 * validation_score = sum of positive weighted votes / total weighted votes
 */
export function recalculateValidationScore(
  currentPositiveWeighted: number,
  currentTotalWeighted: number,
  newVoteWeight: number,
  isPositive: boolean,
): number {
  const newPositive = isPositive
    ? currentPositiveWeighted + newVoteWeight
    : currentPositiveWeighted
  const newTotal = currentTotalWeighted + newVoteWeight
  if (newTotal === 0) return 0
  return newPositive / newTotal
}

// ═══════════════════════════════════════════════════════
// Anti-Spam Logic
// ═══════════════════════════════════════════════════════

const COOLDOWN_DAYS = 14

/**
 * Check if user can submit a new suggestion.
 *
 * Rules:
 * - Max 2 suggestions per week
 * - If 3 consecutive rejections: 14-day cooldown
 * - Title must be >= 40 characters
 */
export function canUserSubmit(
  submissionsThisWeek: number,
  consecutiveRejections: number,
  lastRejectionDate: Date | null,
): { allowed: boolean; reason?: string } {
  // Weekly limit
  if (submissionsThisWeek >= 2) {
    return { allowed: false, reason: 'antiSpamLimit' }
  }

  // Cooldown after 3 consecutive rejections
  if (consecutiveRejections >= 3 && lastRejectionDate) {
    const cooldownEnd = new Date(
      lastRejectionDate.getTime() + COOLDOWN_DAYS * 24 * 60 * 60 * 1000,
    )
    if (new Date() < cooldownEnd) {
      return { allowed: false, reason: 'antiSpamCooldown' }
    }
  }

  return { allowed: true }
}

/**
 * Check title minimum length (anti-spam).
 */
export function isTitleValid(title: string): boolean {
  return title.trim().length >= 40
}

/**
 * Simple similarity check between two strings.
 * Returns a value between 0 and 1.
 */
export function computeSimilarity(a: string, b: string): number {
  const aLower = a.toLowerCase().trim()
  const bLower = b.toLowerCase().trim()
  if (aLower === bLower) return 1

  const aWords = new Set(aLower.split(/\s+/))
  const bWords = new Set(bLower.split(/\s+/))
  const intersection = [...aWords].filter((w) => bWords.has(w))
  const union = new Set([...aWords, ...bWords])
  if (union.size === 0) return 0
  return intersection.length / union.size
}

/**
 * Check if a new suggestion is too similar to existing ones.
 * Threshold: 80% similarity = reject.
 */
export function isDuplicate(
  newTitle: string,
  existingTitles: string[],
): boolean {
  return existingTitles.some(
    (t) => computeSimilarity(newTitle, t) > 0.8,
  )
}

// ═══════════════════════════════════════════════════════
// Status helpers
// ═══════════════════════════════════════════════════════

export function getStatusColor(status: SuggestionStatus): string {
  switch (status) {
    case 'pending':
      return 'var(--text3)'
    case 'community_validated':
      return '#1C39BB'
    case 'editorial_review':
      return 'var(--warn)'
    case 'approved':
      return 'var(--win)'
    case 'rejected':
      return 'var(--text3)'
  }
}

// ═══════════════════════════════════════════════════════
// Admin analytics
// ═══════════════════════════════════════════════════════

export interface SuggestionAnalytics {
  communityValidationRate: number
  rejectionRate: number
  avgTimeToValidationDays: number
  editorialAcceptanceRate: number
}

/**
 * Compute analytics from suggestions list.
 */
export function computeAnalytics(
  suggestions: SuggestedSignal[],
): SuggestionAnalytics {
  const total = suggestions.length
  if (total === 0) {
    return {
      communityValidationRate: 0,
      rejectionRate: 0,
      avgTimeToValidationDays: 0,
      editorialAcceptanceRate: 0,
    }
  }

  const validated = suggestions.filter(
    (s) =>
      s.status === 'community_validated' ||
      s.status === 'editorial_review' ||
      s.status === 'approved',
  ).length

  const rejected = suggestions.filter((s) => s.status === 'rejected').length
  const approved = suggestions.filter((s) => s.status === 'approved').length
  const editorialReviewed = suggestions.filter(
    (s) => s.status === 'approved' || s.status === 'rejected',
  ).length

  // Average time from creation to validation (mock: use update - create delta)
  const validatedItems = suggestions.filter(
    (s) =>
      s.status !== 'pending' && s.status !== 'rejected',
  )
  const avgTimeDays =
    validatedItems.length > 0
      ? validatedItems.reduce((sum, s) => {
          const delta =
            new Date(s.updatedAt).getTime() - new Date(s.createdAt).getTime()
          return sum + delta / (1000 * 60 * 60 * 24)
        }, 0) / validatedItems.length
      : 0

  return {
    communityValidationRate: Math.round((validated / total) * 100),
    rejectionRate: Math.round((rejected / total) * 100),
    avgTimeToValidationDays: Math.round(avgTimeDays * 10) / 10,
    editorialAcceptanceRate:
      editorialReviewed > 0
        ? Math.round((approved / editorialReviewed) * 100)
        : 0,
  }
}
