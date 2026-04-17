/**
 * ZAWIOS — Signal Analytics Engine
 * Pure math. No UI logic, no React, no side effects.
 * All functions are pure and testable.
 */

export interface VoteDistribution {
  yes: number       // 0–100
  no: number        // 0–100
  neutral: number   // 0–100
  total: number     // raw vote count
}

export interface RegionalDivergenceInput {
  [region: string]: number  // YES% per region
}

// ── Polarization Index ─────────────────────────────────────────────────────

/**
 * Polarization Index = committed votes / total votes
 * Range: 0–1. Higher = more polarized (few neutrals).
 * A fully polarized signal = 1.0 (no neutral votes).
 */
export function polarizationIndex(dist: VoteDistribution): number {
  if (dist.total === 0) return 0
  const committed = dist.yes + dist.no
  return Math.min(1, Math.max(0, committed / 100))
}

// ── Decisiveness Rate ──────────────────────────────────────────────────────

/**
 * Decisiveness Rate for a user = committed votes / total votes cast
 * Range: 0–1. Higher = more decisive (fewer neutral positions).
 */
export function decisivenessRate(committedVotes: number, totalVotes: number): number {
  if (totalVotes === 0) return 0
  return Math.min(1, Math.max(0, committedVotes / totalVotes))
}

// ── Regional Divergence Score ──────────────────────────────────────────────

/**
 * Regional Divergence Score = max(YES%) - min(YES%) across regions.
 * Range: 0–100. Higher = more divergent opinions across regions.
 */
export function regionalDivergenceScore(regions: RegionalDivergenceInput): number {
  const values = Object.values(regions)
  if (values.length < 2) return 0
  return Math.max(...values) - Math.min(...values)
}

/**
 * Returns the most and least aligned regions.
 */
export function regionalDivergenceDetail(regions: RegionalDivergenceInput): {
  score: number
  mostYes: string
  leastYes: string
} {
  const entries = Object.entries(regions)
  if (entries.length < 2) return { score: 0, mostYes: '', leastYes: '' }

  const sorted = entries.sort((a, b) => b[1] - a[1])
  return {
    score: sorted[0][1] - sorted[sorted.length - 1][1],
    mostYes: sorted[0][0],
    leastYes: sorted[sorted.length - 1][0],
  }
}

// ── Signal Momentum ────────────────────────────────────────────────────────

/**
 * Signal Momentum = delta votes / delta time (votes per hour).
 * A simple velocity metric. Positive = accelerating.
 */
export function signalMomentum(votesNow: number, votesBefore: number, hoursElapsed: number): number {
  if (hoursElapsed <= 0) return 0
  return (votesNow - votesBefore) / hoursElapsed
}

// ── Consensus Score ────────────────────────────────────────────────────────

/**
 * Consensus Score = 1 - |YES% - 50| / 50
 * Range: 0–1. Higher = more consensus (one side dominates).
 * A perfectly split signal scores 0. An 80/20 signal scores 0.6.
 */
export function consensusScore(yesPercent: number): number {
  return 1 - Math.abs(yesPercent - 50) / 50
}

// ── Accuracy Score ─────────────────────────────────────────────────────────

/**
 * User precision rate = correct committed votes / total committed votes
 */
export function precisionRate(correct: number, committed: number): number {
  if (committed === 0) return 0
  return Math.min(1, Math.max(0, correct / committed))
}

// ── Reputation Weight ─────────────────────────────────────────────────────

/**
 * Signal reputation weight based on total votes.
 * More votes = higher weight (crowd-validated signal).
 * Returns a multiplier between 0.5 and 2.0.
 */
export function signalReputationWeight(totalVotes: number): number {
  if (totalVotes < 1000) return 0.5
  if (totalVotes < 5000) return 0.75
  if (totalVotes < 20000) return 1.0
  if (totalVotes < 50000) return 1.5
  return 2.0
}

// ── Format helpers ─────────────────────────────────────────────────────────

export function formatPercent(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatIndex(value: number): string {
  return value.toFixed(2)
}
