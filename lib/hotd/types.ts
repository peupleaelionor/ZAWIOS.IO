/**
 * ZAWIOS — HOTD (Hot Topic of the Day) Data Model
 *
 * Institutional-grade signal measurement types.
 * No populism. No rage bait. No ideological bias.
 */

// ═══════════════════════════════════════════════════════
// HOTD CORE TYPES
// ═══════════════════════════════════════════════════════

export type HotdCategory =
  | 'Économie'
  | 'Travail'
  | 'Technologie'
  | 'Société'
  | 'Géopolitique'
  | 'Éducation'
  | 'Environnement'

export type RiskLevel = 'low' | 'medium' | 'high'

export interface Hotd {
  id: string
  title: string
  category: HotdCategory
  impactLevel: RiskLevel
  polarizationRisk: RiskLevel
  /** Divergence attendue : 0–100 */
  expectedDivergence: number
  /** Pertinence époquale : 0–100 */
  eraRelevanceScore: number
  description: string
  createdAt: Date
}

// ═══════════════════════════════════════════════════════
// HOTD METRICS
// ═══════════════════════════════════════════════════════

export interface HotdMetrics {
  votesTotal: number
  /** % de divergence entre positions */
  divergenceScore: number
  /** Votes par heure */
  engagementVelocity: number
  /** Taux de commentaires par rapport aux votes */
  commentRate: number
  /** Taux de partage par rapport aux votes */
  shareRate: number
}

// ═══════════════════════════════════════════════════════
// PERSONAL COHERENCE (private-only)
// ═══════════════════════════════════════════════════════

export interface PersonalCoherence {
  /** Stabilité des positions : 0–100 */
  stabilityScore: number
  /** Capacité à évoluer face aux données : 0–100 */
  evolutionScore: number
  /** Détection précoce de tendances : 0–100 */
  earlyDetectionScore: number
  /** Indice de consistance global : 0–100 */
  consistencyIndex: number
}

// ═══════════════════════════════════════════════════════
// SIGNAL PROJECTION
// ═══════════════════════════════════════════════════════

export interface SignalProjection {
  economicImpact: string
  socialImpact: string
  technologicalImpact: string
  governanceImpact: string
}

// ═══════════════════════════════════════════════════════
// DIVERGENCE MULTI-DIMENSIONNELLE
// ═══════════════════════════════════════════════════════

export interface DivergenceBreakdown {
  global: number
  byRegion: Record<string, number>
  byAge: Record<string, number>
  byCategory: Record<string, number>
}

// ═══════════════════════════════════════════════════════
// ERA SIGNAL RESULT
// ═══════════════════════════════════════════════════════

export interface EraSignalResult {
  isEraSignal: boolean
  tag: string | null
  actions: {
    elevateToHomepage: boolean
    lockComments: boolean
    generateSummary: boolean
  }
}

// ═══════════════════════════════════════════════════════
// ENGAGEMENT SAFETY
// ═══════════════════════════════════════════════════════

export interface SafetyActions {
  enableDivergenceAnalysis: boolean
  disableEmotionalLanguage: boolean
  showNeutralNote: boolean
  activateModerationReview: boolean
  slowDownComments: boolean
}

// ═══════════════════════════════════════════════════════
// UI INTEGRATION
// ═══════════════════════════════════════════════════════

export type HotdBadge = 'none' | 'hot-signal' | 'signal-epoque'

export interface HotdBanner {
  badge: HotdBadge
  divergencePercent: number
  participationCount: number
  tensionDetected: boolean
  message: string
}
