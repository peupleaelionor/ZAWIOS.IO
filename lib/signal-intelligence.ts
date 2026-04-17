/**
 * ZAWIOS — Signal Intelligence Module
 *
 * Core differentiators that make ZAWIOS a civilizational measurement instrument,
 * not a prediction market or social platform.
 *
 * Features:
 * - Divergence Index (tension intellectuelle)
 * - Signal Score (clarity + impact + divergence + participation)
 * - Conviction levels (before vote)
 * - Structured reasons (after vote)
 * - Personal projection (impact on your life)
 * - Acceleration (replaces "trending")
 * - Official doubts (fragile hypothesis / insufficient data)
 * - Grey zone ("too early to conclude")
 */

import type { ImpactLevel, ConvictionLevel } from '@/lib/editorial-calendar'

// ═══════════════════════════════════════════════════════
// DIVERGENCE INDEX
// ═══════════════════════════════════════════════════════

/**
 * Compute the Divergence Index (0–100).
 *
 * The more evenly split opinions are, the higher the divergence.
 * Perfect consensus (100% one side) = 0 divergence.
 * Perfect split (50/50) = 100 divergence.
 *
 * Formula: 1 - |yesPercent - 50| / 50 → scaled to 100
 */
export function computeDivergenceIndex(
  yesPercent: number,
  noPercent: number,
): number {
  const total = yesPercent + noPercent
  if (total === 0) return 0
  const yesFraction = yesPercent / total
  // Distance from perfect split (0.5)
  const distance = Math.abs(yesFraction - 0.5)
  // Invert and scale: 0 distance = 100 divergence, 0.5 distance = 0 divergence
  return Math.round((1 - distance / 0.5) * 100)
}

/**
 * Get a human-readable label for divergence level.
 */
export function getDivergenceLabel(
  index: number,
): { label: string; labelEn: string; color: string } {
  if (index >= 80) {
    return { label: 'Tension forte', labelEn: 'High tension', color: 'var(--no)' }
  }
  if (index >= 60) {
    return { label: 'Divergence élevée', labelEn: 'High divergence', color: 'var(--warn)' }
  }
  if (index >= 40) {
    return { label: 'Divergence modérée', labelEn: 'Moderate divergence', color: '#1C39BB' }
  }
  return { label: 'Consensus relatif', labelEn: 'Relative consensus', color: 'var(--yes)' }
}

// ═══════════════════════════════════════════════════════
// SIGNAL SCORE
// ═══════════════════════════════════════════════════════

export interface SignalScore {
  clarity: number       // 0–100
  impact: number        // 0–100
  divergence: number    // 0–100 (from divergence index)
  participation: number // 0–100
  total: number         // 0–400 composite
}

/**
 * Compute the Signal Score — composite quality index.
 *
 * - Clarity: based on title/description structure
 * - Impact: from impact level (faible=33, structurel=66, civilisationnel=100)
 * - Divergence: from divergence index
 * - Participation: % of target audience that voted
 */
export function computeSignalScore(
  impactLevel: ImpactLevel,
  divergenceIndex: number,
  totalVotes: number,
  targetAudience: number = 1000,
): SignalScore {
  const impactMap: Record<ImpactLevel, number> = {
    faible: 33,
    structurel: 66,
    civilisationnel: 100,
  }

  const clarity = 75 // Default: structured signals have consistent clarity
  const impact = impactMap[impactLevel]
  const divergence = divergenceIndex
  const participation = Math.min(100, Math.round((totalVotes / targetAudience) * 100))

  return {
    clarity,
    impact,
    divergence,
    participation,
    total: clarity + impact + divergence + participation,
  }
}

// ═══════════════════════════════════════════════════════
// CONVICTION LEVELS
// ═══════════════════════════════════════════════════════

export const CONVICTION_LEVELS: {
  value: ConvictionLevel
  label: string
  labelEn: string
  weight: number
}[] = [
  { value: 'faible', label: 'Faible', labelEn: 'Low', weight: 0.5 },
  { value: 'moyenne', label: 'Moyenne', labelEn: 'Medium', weight: 1.0 },
  { value: 'forte', label: 'Forte', labelEn: 'Strong', weight: 1.5 },
]

// ═══════════════════════════════════════════════════════
// STRUCTURED REASONS (post-vote "why")
// ═══════════════════════════════════════════════════════

export interface SignalReasons {
  yes: string[]
  no: string[]
}

/**
 * Get the default reasons for a signal.
 * In production, these come from the JSON data.
 */
export function getDefaultReasons(): SignalReasons {
  return {
    yes: ['Évolution technologique', 'Pression économique', 'Volonté politique'],
    no: ['Résistance culturelle', 'Données insuffisantes', 'Complexité structurelle'],
  }
}

// ═══════════════════════════════════════════════════════
// PERSONAL PROJECTION
// ═══════════════════════════════════════════════════════

export type PersonalImpact = 'yes' | 'no' | 'uncertain'

export const PERSONAL_IMPACT_OPTIONS: {
  value: PersonalImpact
  label: string
  labelEn: string
}[] = [
  { value: 'yes', label: 'Oui', labelEn: 'Yes' },
  { value: 'no', label: 'Non', labelEn: 'No' },
  { value: 'uncertain', label: 'Incertain', labelEn: 'Uncertain' },
]

// ═══════════════════════════════════════════════════════
// ACCELERATION (replaces "trending")
// ═══════════════════════════════════════════════════════

/**
 * Compute acceleration metric.
 *
 * Measures the rate of change in vote velocity.
 * If votes in the last hour > 2x hourly average → accelerating.
 */
export function computeAcceleration(
  recentVotesPerHour: number,
  averageVotesPerHour: number,
): { accelerating: boolean; ratio: number } {
  if (averageVotesPerHour === 0) {
    return { accelerating: recentVotesPerHour > 0, ratio: recentVotesPerHour }
  }
  const ratio = recentVotesPerHour / averageVotesPerHour
  return { accelerating: ratio > 2, ratio: Math.round(ratio * 10) / 10 }
}

// ═══════════════════════════════════════════════════════
// OFFICIAL DOUBTS
// ═══════════════════════════════════════════════════════

export type OfficialDoubt = 'fragile' | 'insufficient_data' | null

export const DOUBT_LABELS: Record<
  string,
  { label: string; labelEn: string; color: string }
> = {
  fragile: {
    label: 'Hypothèse fragile',
    labelEn: 'Fragile hypothesis',
    color: 'var(--warn)',
  },
  insufficient_data: {
    label: 'Données insuffisantes',
    labelEn: 'Insufficient data',
    color: 'var(--text3)',
  },
}

// ═══════════════════════════════════════════════════════
// GREY ZONE
// ═══════════════════════════════════════════════════════

/**
 * Extended tri-state vote that includes "too early to conclude".
 */
export type ExtendedVote = 'yes' | 'no' | 'neutral' | 'too_early'

export const EXTENDED_VOTE_LABELS = {
  yes: { label: 'Oui', labelEn: 'Yes', color: 'var(--yes)' },
  no: { label: 'Non', labelEn: 'No', color: 'var(--no)' },
  neutral: { label: 'Neutre', labelEn: 'Neutral', color: 'var(--text3)' },
  too_early: {
    label: 'Trop tôt',
    labelEn: 'Too early',
    color: 'var(--warn)',
  },
} as const

// ═══════════════════════════════════════════════════════
// ZAWIOS GLOBAL INDEX (monthly synthesis)
// ═══════════════════════════════════════════════════════

export interface ZawiosGlobalIndex {
  collectiveOptimism: number   // 0–100
  economicTension: number      // 0–100
  techConfidence: number       // 0–100
  africanProjection: number    // 0–100
  period: string               // e.g. "2026-04"
}

/**
 * Compute ZAWIOS Global Index from aggregated signal data.
 * In production, this aggregates all active signals.
 */
export function computeGlobalIndex(
  signals: Array<{
    category: string
    yesPercent: number
    divergenceIndex: number
  }>,
): Omit<ZawiosGlobalIndex, 'period'> {
  const byCategory = (cats: string[]) =>
    signals.filter((s) => cats.includes(s.category))

  const avgYes = (items: typeof signals) =>
    items.length > 0
      ? Math.round(items.reduce((sum, s) => sum + s.yesPercent, 0) / items.length)
      : 50

  const avgDivergence = (items: typeof signals) =>
    items.length > 0
      ? Math.round(
          items.reduce((sum, s) => sum + s.divergenceIndex, 0) / items.length,
        )
      : 50

  const economicSignals = byCategory(['finance', 'business', 'crypto', 'work'])
  const techSignals = byCategory(['tech'])
  const africanSignals = byCategory(['geopolitics'])
  const allSignals = signals

  return {
    collectiveOptimism: avgYes(allSignals),
    economicTension: avgDivergence(economicSignals),
    techConfidence: avgYes(techSignals),
    africanProjection: avgYes(africanSignals),
  }
}
