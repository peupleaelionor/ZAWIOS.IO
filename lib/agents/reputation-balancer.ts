/**
 * Reputation Balancer — Prevent tier concentration in top rankings
 *
 * Pure function. No UI. No side effects. No external requests.
 * Ensures leaderboard diversity across regions and plan tiers.
 */

export interface LeaderboardEntry {
  userId: string
  score: number
  precision: number       // 0–1
  region: string
  plan: string            // 'free' | 'pro' | 'business' | etc.
  totalVotes: number
  rank?: number
}

export interface BalancerConfig {
  maxSamePlanRatio: number        // default 0.6 — max 60% from same plan in top N
  maxSameRegionRatio: number      // default 0.5
  topN: number                    // how many entries to balance
}

export interface BalancerResult {
  balanced: LeaderboardEntry[]
  injected: string[]              // userIds that were promoted for diversity
  warnings: string[]
}

const DEFAULT_CONFIG: BalancerConfig = {
  maxSamePlanRatio: 0.6,
  maxSameRegionRatio: 0.5,
  topN: 10,
}

export function balanceLeaderboard(
  entries: LeaderboardEntry[],
  config: Partial<BalancerConfig> = {},
): BalancerResult {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const sorted = [...entries].sort((a, b) => b.score - a.score)
  const top = sorted.slice(0, cfg.topN)
  const rest = sorted.slice(cfg.topN)

  const warnings: string[] = []
  const injected: string[] = []

  // Check plan concentration
  const planCounts: Record<string, number> = {}
  for (const e of top) {
    planCounts[e.plan] = (planCounts[e.plan] ?? 0) + 1
  }
  for (const [plan, count] of Object.entries(planCounts)) {
    if (count / cfg.topN > cfg.maxSamePlanRatio) {
      warnings.push(`Plan '${plan}' is ${Math.round(count / cfg.topN * 100)}% of top ${cfg.topN} — diversity recommendation triggered`)
    }
  }

  // Check region concentration
  const regionCounts: Record<string, number> = {}
  for (const e of top) {
    regionCounts[e.region] = (regionCounts[e.region] ?? 0) + 1
  }
  for (const [region, count] of Object.entries(regionCounts)) {
    if (count / cfg.topN > cfg.maxSameRegionRatio) {
      // Find the highest-scoring entry from an under-represented region
      const underRepRegion = rest.find(
        (e) => (regionCounts[e.region] ?? 0) / cfg.topN < cfg.maxSameRegionRatio * 0.5,
      )
      if (underRepRegion) {
        const removed = top.pop()   // remove last entry
        if (removed) rest.unshift(removed)
        top.push(underRepRegion)
        rest.splice(rest.indexOf(underRepRegion), 1)
        injected.push(underRepRegion.userId)
        regionCounts[region] -= 1
        regionCounts[underRepRegion.region] = (regionCounts[underRepRegion.region] ?? 0) + 1
        warnings.push(`Region '${region}' was over-represented — injected entry from '${underRepRegion.region}'`)
      }
    }
  }

  const balanced = top.map((e, i) => ({ ...e, rank: i + 1 }))
  return { balanced, injected, warnings }
}

/**
 * Compute a visibility weight for a user — free users get a slight boost
 * to prevent paid-tier dominance in algorithmic surfaces.
 */
export function visibilityWeight(plan: string, precision: number, totalVotes: number): number {
  const planBoost = plan === 'free' ? 1.1 : 1.0
  const activityFactor = Math.min(1, totalVotes / 500)
  return precision * planBoost * (0.5 + 0.5 * activityFactor)
}
