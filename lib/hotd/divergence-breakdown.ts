/**
 * ZAWIOS — Multi-Dimensional Divergence Breakdown
 *
 * Provides structured divergence analysis across regions, age groups,
 * and categories. Safe-by-default: aggregate data only.
 */

import type { DivergenceBreakdown } from './types'

// ═══════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════

interface RegionVoteData {
  region: string
  yesPercent: number
  totalVotes: number
}

interface AgeGroupVoteData {
  ageGroup: string
  yesPercent: number
  totalVotes: number
}

interface CategoryVoteData {
  category: string
  yesPercent: number
  totalVotes: number
}

// ═══════════════════════════════════════════════════════
// DIVERGENCE COMPUTATION
// ═══════════════════════════════════════════════════════

/**
 * Compute divergence from yes-percentage.
 *
 * A 50/50 split means maximum divergence (opinions are divided = 100).
 * A 0% or 100% result means full consensus (everyone agrees = 0).
 *
 * Formula: (1 - |yesPercent - 50| / 50) × 100
 */
function computeDivergence(yesPercent: number): number {
  const distance = Math.abs(yesPercent - 50)
  return Math.round((1 - distance / 50) * 100)
}

/**
 * Compute a multi-dimensional divergence breakdown.
 *
 * Provides divergence scores across:
 * - Global (aggregate of all votes)
 * - By region (geographic distribution)
 * - By age group (generational distribution)
 * - By category (thematic distribution)
 */
export function computeDivergenceBreakdown(
  globalYesPercent: number,
  regions: RegionVoteData[],
  ageGroups: AgeGroupVoteData[],
  categories: CategoryVoteData[],
): DivergenceBreakdown {
  const byRegion: Record<string, number> = {}
  for (const r of regions) {
    byRegion[r.region] = computeDivergence(r.yesPercent)
  }

  const byAge: Record<string, number> = {}
  for (const a of ageGroups) {
    byAge[a.ageGroup] = computeDivergence(a.yesPercent)
  }

  const byCategory: Record<string, number> = {}
  for (const c of categories) {
    byCategory[c.category] = computeDivergence(c.yesPercent)
  }

  return {
    global: computeDivergence(globalYesPercent),
    byRegion,
    byAge,
    byCategory,
  }
}

/**
 * Identify the dimension with the highest divergence.
 */
export function findMaxDivergenceDimension(
  breakdown: DivergenceBreakdown,
): { dimension: string; key: string; value: number } {
  let max = { dimension: 'global', key: 'global', value: breakdown.global }

  for (const [key, value] of Object.entries(breakdown.byRegion)) {
    if (value > max.value) {
      max = { dimension: 'region', key, value }
    }
  }

  for (const [key, value] of Object.entries(breakdown.byAge)) {
    if (value > max.value) {
      max = { dimension: 'age', key, value }
    }
  }

  for (const [key, value] of Object.entries(breakdown.byCategory)) {
    if (value > max.value) {
      max = { dimension: 'category', key, value }
    }
  }

  return max
}

/**
 * Get a neutral summary label for the divergence breakdown.
 */
export function getDivergenceSummary(
  breakdown: DivergenceBreakdown,
): { fr: string; en: string } {
  const maxDim = findMaxDivergenceDimension(breakdown)

  if (maxDim.value < 40) {
    return {
      fr: 'Consensus relatif observé sur l\'ensemble des dimensions.',
      en: 'Relative consensus observed across all dimensions.',
    }
  }

  if (maxDim.dimension === 'region') {
    return {
      fr: `Écart régional significatif détecté (${maxDim.key} : ${maxDim.value}%).`,
      en: `Significant regional gap detected (${maxDim.key}: ${maxDim.value}%).`,
    }
  }

  if (maxDim.dimension === 'age') {
    return {
      fr: `Écart générationnel significatif détecté (${maxDim.key} : ${maxDim.value}%).`,
      en: `Significant generational gap detected (${maxDim.key}: ${maxDim.value}%).`,
    }
  }

  return {
    fr: `Divergence structurelle élevée détectée (${maxDim.value}%).`,
    en: `High structural divergence detected (${maxDim.value}%).`,
  }
}
