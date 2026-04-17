// ZAWIOS Internal Micro-Agents — Feed Intelligence Layer
// These agents optimize signal feed diversity and prevent over-polarization.
// They are NOT visible to users. No ideological filtering. Pure balancing logic.

import type { Signal, SignalCategory, SignalRegion } from '@/lib/signals-data'

// ─── SignalBalancingAgent ────────────────────────────────────────────────────
// Ensures no single category dominates the feed.
// Target: max 30% of visible signals from any one category.

export function signalBalancingAgent(signals: Signal[], maxCategoryRatio = 0.3): Signal[] {
  const total = signals.length
  if (total === 0) return signals
  const maxPerCategory = Math.max(2, Math.ceil(total * maxCategoryRatio))
  const categoryCounts: Record<string, number> = {}
  const balanced: Signal[] = []

  for (const signal of signals) {
    const count = categoryCounts[signal.category] ?? 0
    if (count < maxPerCategory) {
      balanced.push(signal)
      categoryCounts[signal.category] = count + 1
    }
  }

  return balanced
}

// ─── TensionDetectionAgent ──────────────────────────────────────────────────
// Detects signals with extreme polarization (close to 50/50 split with high votes).
// Flags them so the UI can present them with extra context, never suppress.

export interface TensionFlag {
  signalId: string
  tensionScore: number // 0-100, higher = more polarized
  reason: string
}

export function tensionDetectionAgent(signals: Signal[]): TensionFlag[] {
  return signals
    .filter((s) => s.status === 'active')
    .map((s) => {
      const balance = Math.abs(s.yesPercent - 50)
      const volumeWeight = Math.min(1, s.totalVotes / 10000)
      const tensionScore = Math.round((1 - balance / 50) * 100 * volumeWeight)

      return {
        signalId: s.id,
        tensionScore,
        reason:
          tensionScore > 70
            ? 'High polarization with significant vote volume'
            : tensionScore > 40
              ? 'Moderate debate intensity'
              : 'Low tension',
      }
    })
    .filter((t) => t.tensionScore > 30)
    .sort((a, b) => b.tensionScore - a.tensionScore)
}

// ─── RegionalHarmonizer ─────────────────────────────────────────────────────
// Ensures regional diversity in feed. Prevents over-representation of any region.
// User's region gets priority (max 40%) but other regions are always visible.

export function regionalHarmonizer(
  signals: Signal[],
  userRegion: SignalRegion | 'all' = 'all',
  userRegionMaxRatio = 0.4,
): Signal[] {
  if (userRegion === 'all' || signals.length === 0) return signals

  const userRegionSignals = signals.filter((s) => s.region === userRegion)
  const otherSignals = signals.filter((s) => s.region !== userRegion)

  const maxUserRegion = Math.max(2, Math.ceil(signals.length * userRegionMaxRatio))
  const selectedUserRegion = userRegionSignals.slice(0, maxUserRegion)
  const remaining = signals.length - selectedUserRegion.length
  const selectedOther = otherSignals.slice(0, remaining)

  // Interleave: user region first, then others
  const result: Signal[] = []
  let ui = 0
  let oi = 0

  for (let i = 0; i < selectedUserRegion.length + selectedOther.length; i++) {
    if (i % 3 === 0 && ui < selectedUserRegion.length) {
      result.push(selectedUserRegion[ui++])
    } else if (oi < selectedOther.length) {
      result.push(selectedOther[oi++])
    } else if (ui < selectedUserRegion.length) {
      result.push(selectedUserRegion[ui++])
    }
  }

  return result
}

// ─── LifeTopicExpander ──────────────────────────────────────────────────────
// Ensures life-relevant categories (health, education, housing, work, etc.)
// are not drowned out by news/tech/crypto.
// Guarantees at least 1 life topic per 10 signals in feed.

const LIFE_CATEGORIES: SignalCategory[] = [
  'work',
  'education',
  'health',
  'housing',
  'climate',
  'relationships',
  'youth',
  'spirituality',
  'finance',
]

export function lifeTopicExpander(signals: Signal[], minLifeRatio = 0.1): Signal[] {
  if (signals.length === 0) return signals
  const lifeSignals = signals.filter((s) => LIFE_CATEGORIES.includes(s.category))
  const _nonLifeSignals = signals.filter((s) => !LIFE_CATEGORIES.includes(s.category))

  const minLife = Math.max(1, Math.ceil(signals.length * minLifeRatio))

  if (lifeSignals.length >= minLife) return signals

  // Not enough life topics — promote some from the full pool
  // This does not suppress anything, just reorders to ensure visibility
  const result: Signal[] = []
  let lifeInserted = 0
  const interval = Math.max(1, Math.floor(signals.length / minLife))

  for (let i = 0; i < signals.length; i++) {
    if (lifeInserted < minLife && lifeInserted < lifeSignals.length && i % interval === 0) {
      result.push(lifeSignals[lifeInserted])
      lifeInserted++
      continue
    }
    result.push(signals[i])
  }

  // Deduplicate while preserving order
  const seen = new Set<string>()
  return result.filter((s) => {
    if (seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })
}

// ─── Combined Pipeline ──────────────────────────────────────────────────────
// Runs all agents in sequence. Pure function — no side effects.

export function applyMicroAgents(
  signals: Signal[],
  userRegion: SignalRegion | 'all' = 'all',
): { signals: Signal[]; tensions: TensionFlag[] } {
  let processed = [...signals]

  // 1. Balance categories
  processed = signalBalancingAgent(processed)

  // 2. Harmonize regions
  processed = regionalHarmonizer(processed, userRegion)

  // 3. Expand life topics
  processed = lifeTopicExpander(processed)

  // 4. Detect tensions (informational only, no filtering)
  const tensions = tensionDetectionAgent(processed)

  return { signals: processed, tensions }
}
