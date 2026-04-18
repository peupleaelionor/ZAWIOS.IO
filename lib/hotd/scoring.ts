/**
 * ZAWIOS — HOTD Viral Scoring Algorithm
 *
 * Computes a normalized viral score (0–100) based on weighted metrics.
 * No gamification. Pure signal measurement.
 */

import type { HotdMetrics } from './types'

// ═══════════════════════════════════════════════════════
// WEIGHTS
// ═══════════════════════════════════════════════════════

const WEIGHTS = {
  votesTotal: 0.2,
  divergenceScore: 0.25,
  engagementVelocity: 0.25,
  commentRate: 0.15,
  shareRate: 0.15,
} as const

// ═══════════════════════════════════════════════════════
// NORMALIZATION BOUNDS
// ═══════════════════════════════════════════════════════

/** Upper bounds for normalization — values above these are capped at 100 */
const NORMALIZATION_MAX = {
  votesTotal: 50_000,
  divergenceScore: 100,
  engagementVelocity: 500,
  commentRate: 100,
  shareRate: 100,
} as const

// ═══════════════════════════════════════════════════════
// NORMALIZE
// ═══════════════════════════════════════════════════════

function normalize(value: number, max: number): number {
  return Math.min(100, Math.max(0, (value / max) * 100))
}

// ═══════════════════════════════════════════════════════
// COMPUTE VIRAL SCORE
// ═══════════════════════════════════════════════════════

/**
 * Compute the viral score for a HOTD based on engagement metrics.
 *
 * Formula:
 *   viralScore =
 *     (normalizedVotes × 0.20) +
 *     (normalizedDivergence × 0.25) +
 *     (normalizedVelocity × 0.25) +
 *     (normalizedCommentRate × 0.15) +
 *     (normalizedShareRate × 0.15)
 *
 * @returns Score normalized to 0–100
 */
export function computeViralScore(metrics: HotdMetrics): number {
  const nVotes = normalize(metrics.votesTotal, NORMALIZATION_MAX.votesTotal)
  const nDivergence = normalize(metrics.divergenceScore, NORMALIZATION_MAX.divergenceScore)
  const nVelocity = normalize(metrics.engagementVelocity, NORMALIZATION_MAX.engagementVelocity)
  const nComment = normalize(metrics.commentRate, NORMALIZATION_MAX.commentRate)
  const nShare = normalize(metrics.shareRate, NORMALIZATION_MAX.shareRate)

  const raw =
    nVotes * WEIGHTS.votesTotal +
    nDivergence * WEIGHTS.divergenceScore +
    nVelocity * WEIGHTS.engagementVelocity +
    nComment * WEIGHTS.commentRate +
    nShare * WEIGHTS.shareRate

  return Math.round(Math.min(100, Math.max(0, raw)))
}

/**
 * Get a human-readable label for viral score level.
 */
export function getViralLabel(score: number): {
  label: string
  labelEn: string
  level: 'low' | 'moderate' | 'high' | 'critical'
} {
  if (score >= 80) {
    return { label: 'Signal critique', labelEn: 'Critical signal', level: 'critical' }
  }
  if (score >= 60) {
    return { label: 'Signal élevé', labelEn: 'High signal', level: 'high' }
  }
  if (score >= 30) {
    return { label: 'Signal modéré', labelEn: 'Moderate signal', level: 'moderate' }
  }
  return { label: 'Signal faible', labelEn: 'Low signal', level: 'low' }
}
