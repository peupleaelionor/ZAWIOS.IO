/**
 * Polarization Guard — Signal health monitoring
 *
 * Pure function. No UI. No side effects. No external requests.
 * Returns polarization status and display recommendations for a signal.
 */

import { polarizationIndex, regionalDivergenceScore, consensusScore } from '@/lib/signal-analytics'

export interface SignalSnapshot {
  id: string
  yesPercent: number
  noPercent: number
  neutralPercent: number
  totalVotes: number
  regionalBreakdown?: Record<string, number>
}

export type PolarizationLevel = 'low' | 'moderate' | 'high' | 'extreme'

export interface PolarizationReport {
  level: PolarizationLevel
  polarization: number        // 0–1
  divergence: number          // 0–100
  consensus: number           // 0–1
  shouldHighlightDivergence: boolean
  shouldFlagExtreme: boolean
  label: string               // human-readable summary
}

const THRESHOLDS = {
  moderate:  0.50,
  high:      0.70,
  extreme:   0.85,
  divergenceDisplay: 30,      // show divergence detail when score >= 30
}

export function assessPolarization(signal: SignalSnapshot): PolarizationReport {
  const polIndex = polarizationIndex({
    yes:     signal.yesPercent,
    no:      signal.noPercent,
    neutral: signal.neutralPercent,
    total:   100,
  })

  const divergence = signal.regionalBreakdown
    ? regionalDivergenceScore(signal.regionalBreakdown)
    : 0

  const consensus = consensusScore(signal.yesPercent)

  let level: PolarizationLevel
  let label: string

  if (polIndex >= THRESHOLDS.extreme) {
    level = 'extreme'
    label = `Signal extrêmement polarisé (${Math.round(polIndex * 100)}% engagés)`
  } else if (polIndex >= THRESHOLDS.high) {
    level = 'high'
    label = `Forte polarisation — divergence régionale probable`
  } else if (polIndex >= THRESHOLDS.moderate) {
    level = 'moderate'
    label = `Signal polarisé — distribution asymétrique`
  } else {
    level = 'low'
    label = `Signal équilibré — consensus relatif`
  }

  return {
    level,
    polarization: polIndex,
    divergence,
    consensus,
    shouldHighlightDivergence: divergence >= THRESHOLDS.divergenceDisplay,
    shouldFlagExtreme: level === 'extreme',
    label,
  }
}

/**
 * Batch assessment — returns only signals that warrant attention
 */
export function getHighPolarizationSignals(
  signals: SignalSnapshot[],
  minLevel: PolarizationLevel = 'high',
): Array<SignalSnapshot & { report: PolarizationReport }> {
  const levelOrder: PolarizationLevel[] = ['low', 'moderate', 'high', 'extreme']
  const minIdx = levelOrder.indexOf(minLevel)

  return signals
    .map((s) => ({ ...s, report: assessPolarization(s) }))
    .filter((s) => levelOrder.indexOf(s.report.level) >= minIdx)
    .sort((a, b) => b.report.polarization - a.report.polarization)
}
