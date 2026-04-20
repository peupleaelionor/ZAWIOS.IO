/**
 * ZAWIOS — Engagement Safety Rules
 *
 * Institutional safety layer that prevents emotional amplification.
 * Ensures structural neutrality in high-tension scenarios.
 */

import type { Hotd, HotdMetrics, SafetyActions } from './types'

// ═══════════════════════════════════════════════════════
// THRESHOLDS
// ═══════════════════════════════════════════════════════

const SAFETY_THRESHOLDS = {
  /** Comment rate spike threshold (percent) */
  commentRateSpike: 60,
  /** Divergence threshold for enhanced analysis */
  highDivergence: 70,
} as const

// ═══════════════════════════════════════════════════════
// SAFETY ENGINE
// ═══════════════════════════════════════════════════════

/**
 * Evaluate safety actions for a given HOTD and its metrics.
 *
 * Rules:
 * - If polarizationRisk = 'high' → auto-enable divergence analysis,
 *   disable emotional language, show neutral note
 * - If commentRate spikes beyond threshold → activate moderation review,
 *   slow down comment publishing
 */
export function evaluateSafetyActions(
  hotd: Hotd,
  metrics: HotdMetrics,
): SafetyActions {
  const isHighPolarization = hotd.polarizationRisk === 'high'
  const isCommentSpike = metrics.commentRate > SAFETY_THRESHOLDS.commentRateSpike
  const isHighDivergence = metrics.divergenceScore > SAFETY_THRESHOLDS.highDivergence

  return {
    enableDivergenceAnalysis: isHighPolarization || isHighDivergence,
    disableEmotionalLanguage: isHighPolarization,
    showNeutralNote: isHighPolarization,
    activateModerationReview: isCommentSpike,
    slowDownComments: isCommentSpike,
  }
}

/**
 * Get the neutral contextual note to display when polarization is high.
 */
export function getNeutralNote(): { fr: string; en: string } {
  return {
    fr: 'Ce signal présente un niveau de divergence élevé. Les données affichées sont agrégées et anonymes. L\'objectif est la compréhension structurelle, non la confrontation.',
    en: 'This signal shows high divergence levels. Displayed data is aggregated and anonymous. The objective is structural understanding, not confrontation.',
  }
}

/**
 * Compute moderation delay (in seconds) based on comment rate.
 * Higher rates = longer delays to prevent emotional cascades.
 */
export function computeModerationDelay(commentRate: number): number {
  if (commentRate <= 30) return 0
  if (commentRate <= 50) return 5
  if (commentRate <= 70) return 15
  if (commentRate <= 90) return 30
  return 60
}
