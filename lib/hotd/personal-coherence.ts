/**
 * ZAWIOS — Personal Coherence Index (Indice de Cohérence Personnelle)
 *
 * Private-only metric. Never displayed publicly.
 * Measures intellectual consistency and evidence-based evolution.
 */

import type { PersonalCoherence } from './types'

// ═══════════════════════════════════════════════════════
// VOTE HISTORY ANALYSIS
// ═══════════════════════════════════════════════════════

interface VoteRecord {
  hotdId: string
  category: string
  vote: 'yes' | 'no' | 'neutral'
  timestamp: Date
}

/**
 * Compute the Personal Coherence Index from vote history.
 *
 * Logic:
 * - stabilityScore: measures consistency of positions within same categories over time
 * - evolutionScore: measures ability to change position when signals shift
 * - earlyDetectionScore: measures how often user detected era signals early
 * - consistencyIndex: weighted average of above
 *
 * Penalizes erratic voting (random flips without signal change).
 * Rewards evidence-based evolution.
 */
export function computePersonalCoherence(
  votes: VoteRecord[],
  eraSignalIds: Set<string>,
): PersonalCoherence {
  if (votes.length < 5) {
    return {
      stabilityScore: 50,
      evolutionScore: 50,
      earlyDetectionScore: 50,
      consistencyIndex: 50,
    }
  }

  /* Group votes by category */
  const byCategory = new Map<string, VoteRecord[]>()
  for (const vote of votes) {
    const existing = byCategory.get(vote.category) ?? []
    existing.push(vote)
    byCategory.set(vote.category, existing)
  }

  /* Stability: measure how often votes within a category stay consistent */
  let stableCount = 0
  let totalPairs = 0

  for (const [, categoryVotes] of byCategory) {
    const sorted = [...categoryVotes].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    )
    for (let i = 1; i < sorted.length; i++) {
      totalPairs++
      if (sorted[i].vote === sorted[i - 1].vote) {
        stableCount++
      }
    }
  }

  const stabilityScore = totalPairs > 0
    ? Math.round((stableCount / totalPairs) * 100)
    : 50

  /* Evolution: measure meaningful position changes (not erratic) */
  const changes = totalPairs - stableCount
  const changeRate = totalPairs > 0 ? changes / totalPairs : 0
  /* Optimal evolution rate is 10-30% — too low = rigid, too high = erratic */
  let evolutionScore: number
  if (changeRate <= 0.1) {
    evolutionScore = Math.round(changeRate * 500) // 0-50 range
  } else if (changeRate <= 0.3) {
    evolutionScore = Math.round(50 + ((changeRate - 0.1) / 0.2) * 50) // 50-100 range
  } else {
    evolutionScore = Math.round(Math.max(20, 100 - (changeRate - 0.3) * 200)) // Penalize erratic
  }

  /* Early detection: how often user voted on signals that became era signals */
  const eraVotes = votes.filter((v) => eraSignalIds.has(v.hotdId))
  const earlyDetectionScore = votes.length > 0
    ? Math.min(100, Math.round((eraVotes.length / votes.length) * 500))
    : 50

  /* Consistency index: weighted average */
  const consistencyIndex = Math.round(
    stabilityScore * 0.4 +
    evolutionScore * 0.35 +
    earlyDetectionScore * 0.25,
  )

  return {
    stabilityScore: Math.min(100, Math.max(0, stabilityScore)),
    evolutionScore: Math.min(100, Math.max(0, evolutionScore)),
    earlyDetectionScore: Math.min(100, Math.max(0, earlyDetectionScore)),
    consistencyIndex: Math.min(100, Math.max(0, consistencyIndex)),
  }
}

/**
 * Get display messages for the coherence index (private-only).
 */
export function getCoherenceDisplay(coherence: PersonalCoherence): {
  title: string
  titleEn: string
  subtitle: string
  subtitleEn: string
} {
  const index = coherence.consistencyIndex

  if (index >= 80) {
    return {
      title: `Indice de cohérence personnelle : ${index}%`,
      titleEn: `Personal coherence index: ${index}%`,
      subtitle: 'Vos positions sont stables et évoluent avec les données.',
      subtitleEn: 'Your positions are stable and evolve with the data.',
    }
  }
  if (index >= 60) {
    return {
      title: `Indice de cohérence personnelle : ${index}%`,
      titleEn: `Personal coherence index: ${index}%`,
      subtitle: 'Vos positions montrent une cohérence solide sur 6 mois.',
      subtitleEn: 'Your positions show solid coherence over 6 months.',
    }
  }
  if (index >= 40) {
    return {
      title: `Indice de cohérence personnelle : ${index}%`,
      titleEn: `Personal coherence index: ${index}%`,
      subtitle: 'Vos positions varient — certaines évolutions manquent de fondement.',
      subtitleEn: 'Your positions vary — some changes lack supporting evidence.',
    }
  }

  return {
    title: `Indice de cohérence personnelle : ${index}%`,
    titleEn: `Personal coherence index: ${index}%`,
    subtitle: 'Vos positions sont instables. Prenez le temps d\'analyser les signaux.',
    subtitleEn: 'Your positions are unstable. Take time to analyze the signals.',
  }
}
