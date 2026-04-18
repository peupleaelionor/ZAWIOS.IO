/**
 * ZAWIOS — Signal d'époque Detection System
 *
 * A Signal d'époque is a HOTD that reveals a structural shift in collective
 * consciousness. It is rare, measurable, and historically significant.
 *
 * Criteria:
 * - divergenceScore > 40
 * - votesTotal > 10,000
 * - engagementVelocity sustained for 48h (approximated by velocity threshold)
 * - eraRelevanceScore > 75
 */

import type { Hotd, HotdMetrics, EraSignalResult } from './types'

// ═══════════════════════════════════════════════════════
// THRESHOLDS
// ═══════════════════════════════════════════════════════

const ERA_THRESHOLDS = {
  divergenceScore: 40,
  votesTotal: 10_000,
  /** Minimum sustained velocity (votes/hour over 48h) */
  engagementVelocity: 50,
  eraRelevanceScore: 75,
  /** Comment saturation threshold — lock comments above this */
  commentSaturation: 80,
} as const

// ═══════════════════════════════════════════════════════
// DETECTION
// ═══════════════════════════════════════════════════════

/**
 * Detect whether a HOTD qualifies as a "Signal d'époque".
 */
export function detectEraSignal(hotd: Hotd, metrics: HotdMetrics): boolean {
  return (
    metrics.divergenceScore > ERA_THRESHOLDS.divergenceScore &&
    metrics.votesTotal > ERA_THRESHOLDS.votesTotal &&
    metrics.engagementVelocity > ERA_THRESHOLDS.engagementVelocity &&
    hotd.eraRelevanceScore > ERA_THRESHOLDS.eraRelevanceScore
  )
}

/**
 * Get full era signal result with action instructions.
 */
export function evaluateEraSignal(hotd: Hotd, metrics: HotdMetrics): EraSignalResult {
  const isEraSignal = detectEraSignal(hotd, metrics)

  if (!isEraSignal) {
    return {
      isEraSignal: false,
      tag: null,
      actions: {
        elevateToHomepage: false,
        lockComments: false,
        generateSummary: false,
      },
    }
  }

  return {
    isEraSignal: true,
    tag: "Signal d'époque",
    actions: {
      elevateToHomepage: true,
      lockComments: metrics.commentRate > ERA_THRESHOLDS.commentSaturation,
      generateSummary: true,
    },
  }
}

/**
 * Generate a structured share summary block for an era signal.
 */
export function generateEraShareSummary(
  hotd: Hotd,
  metrics: HotdMetrics,
): {
  title: string
  subtitle: string
  stats: { label: string; value: string }[]
} {
  return {
    title: `Signal d'époque — ${hotd.title}`,
    subtitle: 'Un signal structurel majeur a été détecté par ZAWIOS.',
    stats: [
      { label: 'Divergence', value: `${metrics.divergenceScore}%` },
      { label: 'Participation', value: `${metrics.votesTotal.toLocaleString('fr-FR')} votes` },
      { label: 'Vélocité', value: `${metrics.engagementVelocity} votes/h` },
      { label: 'Pertinence époquale', value: `${hotd.eraRelevanceScore}/100` },
    ],
  }
}
