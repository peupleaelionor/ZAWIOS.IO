/**
 * Signal Curator — Feed scoring micro-agent
 *
 * Pure function. No UI. No side effects. No external requests.
 * Takes signals and user context, returns a scored + sorted array.
 */

import { signalMomentum, regionalDivergenceScore } from '@/lib/signal-analytics'

export interface CuratorInput {
  id: string
  category: string
  region: string
  totalVotes: number
  votesLastHour?: number
  createdAt: string           // ISO string
  trending?: boolean
  hot?: boolean
  yesPercent: number
  noPercent: number
  neutralPercent: number
  regionalBreakdown?: Record<string, number>
}

export interface CuratorContext {
  dominantCategory?: string   // user's most-voted category
  regionAffinity?: string     // user's most-active region
  seenIds?: Set<string>       // already-shown signal IDs (skip in feed)
}

export interface CuratorOutput extends CuratorInput {
  score: number
  scoreBreakdown: {
    momentumScore: number
    divergenceBoost: number
    affinityBoost: number
    recencyScore: number
  }
}

const CATEGORY_AFFINITY_BOOST = 8
const REGION_AFFINITY_BOOST = 6
const HOT_BOOST = 15
const TRENDING_BOOST = 8

export function curateSignals(
  signals: CuratorInput[],
  context: CuratorContext = {},
): CuratorOutput[] {
  const now = Date.now()

  const scored: CuratorOutput[] = signals
    .filter((s) => !context.seenIds?.has(s.id))
    .map((s) => {
      const hoursElapsed = (now - new Date(s.createdAt).getTime()) / 3_600_000
      const momentumScore = s.votesLastHour != null
        ? signalMomentum(s.totalVotes, s.totalVotes - s.votesLastHour, Math.max(hoursElapsed, 0.1))
        : 0

      const divergenceBoost = s.regionalBreakdown
        ? regionalDivergenceScore(s.regionalBreakdown as Record<string, number>) * 0.3
        : 0

      const affinityBoost =
        (context.dominantCategory === s.category ? CATEGORY_AFFINITY_BOOST : 0) +
        (context.regionAffinity === s.region ? REGION_AFFINITY_BOOST : 0)

      // Recency: full weight in first 6h, decays over 72h
      const recencyScore = Math.max(0, 1 - hoursElapsed / 72) * 10

      const hotBoost = s.hot ? HOT_BOOST : 0
      const trendingBoost = s.trending ? TRENDING_BOOST : 0

      const score =
        momentumScore + divergenceBoost + affinityBoost + recencyScore + hotBoost + trendingBoost

      return {
        ...s,
        score,
        scoreBreakdown: { momentumScore, divergenceBoost, affinityBoost, recencyScore },
      }
    })

  return scored.sort((a, b) => b.score - a.score)
}
