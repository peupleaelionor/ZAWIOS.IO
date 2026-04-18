/**
 * ZAWIOS — HOTD UI Integration Logic
 *
 * Determines badges, banners, and display states for HOTD components.
 */

import type { Hotd, HotdMetrics, HotdBadge, HotdBanner } from './types'
import { computeViralScore } from './scoring'
import { detectEraSignal } from './era-signal'

// ═══════════════════════════════════════════════════════
// BADGE DETERMINATION
// ═══════════════════════════════════════════════════════

/**
 * Determine the badge to display for a HOTD.
 *
 * - viralScore > 70 → "Hot Signal"
 * - detectEraSignal = true → "Signal d'époque" (overrides Hot Signal)
 */
export function determineHotdBadge(hotd: Hotd, metrics: HotdMetrics): HotdBadge {
  if (detectEraSignal(hotd, metrics)) {
    return 'signal-epoque'
  }

  const viralScore = computeViralScore(metrics)
  if (viralScore > 70) {
    return 'hot-signal'
  }

  return 'none'
}

// ═══════════════════════════════════════════════════════
// BANNER GENERATION
// ═══════════════════════════════════════════════════════

/**
 * Generate a structured banner for homepage display.
 */
export function generateHotdBanner(hotd: Hotd, metrics: HotdMetrics): HotdBanner | null {
  const badge = determineHotdBadge(hotd, metrics)
  if (badge === 'none') return null

  const tensionDetected = metrics.divergenceScore > 60

  const message =
    badge === 'signal-epoque'
      ? 'Signal mondial en cours — Tension structurelle détectée'
      : 'Signal actif — Divergence significative mesurée'

  return {
    badge,
    divergencePercent: metrics.divergenceScore,
    participationCount: metrics.votesTotal,
    tensionDetected,
    message,
  }
}

/**
 * Get badge display properties for rendering.
 */
export function getBadgeDisplay(badge: HotdBadge): {
  label: string
  labelEn: string
  color: string
  bgColor: string
} | null {
  switch (badge) {
    case 'hot-signal':
      return {
        label: 'Signal actif',
        labelEn: 'Hot Signal',
        color: '#D97706',
        bgColor: 'rgba(217, 119, 6, 0.12)',
      }
    case 'signal-epoque':
      return {
        label: "Signal d'époque",
        labelEn: 'Era Signal',
        color: '#1E3A8A',
        bgColor: 'rgba(30, 58, 138, 0.10)',
      }
    default:
      return null
  }
}
