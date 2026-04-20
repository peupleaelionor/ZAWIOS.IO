/**
 * ZAWIOS — HOTD Engine Barrel Export
 *
 * Single entry point for the complete HOTD system.
 */

/* ── Types ── */
export type {
  Hotd,
  HotdCategory,
  RiskLevel,
  HotdMetrics,
  PersonalCoherence,
  SignalProjection,
  DivergenceBreakdown,
  EraSignalResult,
  SafetyActions,
  HotdBadge,
  HotdBanner,
} from './types'

/* ── Scoring ── */
export { computeViralScore, getViralLabel } from './scoring'

/* ── Era Signal Detection ── */
export { detectEraSignal, evaluateEraSignal, generateEraShareSummary } from './era-signal'

/* ── Generator ── */
export { generateHotdFromTemplate, generateBalancedHotdSet } from './generator'

/* ── Safety ── */
export { evaluateSafetyActions, getNeutralNote, computeModerationDelay } from './safety'

/* ── UI Logic ── */
export { determineHotdBadge, generateHotdBanner, getBadgeDisplay } from './ui-logic'

/* ── Content Guard ── */
export { validateHotdContent, sanitizeHotdTitle } from './content-guard'

/* ── Personal Coherence ── */
export { computePersonalCoherence, getCoherenceDisplay } from './personal-coherence'

/* ── Signal Projection ── */
export { generateSignalProjection, generateFullProjection } from './signal-projection'

/* ── Divergence Breakdown ── */
export {
  computeDivergenceBreakdown,
  findMaxDivergenceDimension,
  getDivergenceSummary,
} from './divergence-breakdown'

/* ── Data ── */
export { HOTD_LIBRARY } from '@/data/hotd-library'
