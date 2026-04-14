// ZAWIOS Cognitive Intelligence Agents
// Brain-friendly content presentation and user adaptation layer
// Military-grade precision in UX adaptation, zero information overload

import type { Signal, SignalCategory } from '@/lib/signals-data'
import type { DeviceType, NetworkQuality, TimeOfDay } from '@/components/providers/user-context-provider'

// ─── CognitiveLoadAgent ─────────────────────────────────────────────────────
// Manages information density based on device, time of day, and session depth.
// Prevents cognitive overload by throttling content complexity.

interface CognitiveConfig {
  device: DeviceType
  timeOfDay: TimeOfDay
  sessionSignalsViewed: number
  networkQuality: NetworkQuality
}

interface CognitiveOutput {
  maxVisibleSignals: number
  showDescriptions: boolean
  showRegionalBreakdown: boolean
  feedColumns: 1 | 2 | 3
  animationsEnabled: boolean
  imageQuality: 'low' | 'medium' | 'high'
  /** Complexity score 0-100: lower = simpler presentation */
  complexityScore: number
}

export function cognitiveLoadAgent(config: CognitiveConfig): CognitiveOutput {
  const { device, timeOfDay, sessionSignalsViewed, networkQuality } = config

  // Base complexity by device
  let complexity = device === 'mobile' ? 40 : device === 'tablet' ? 60 : 80

  // Time of day modulation — evening/night = reduce cognitive load
  if (timeOfDay === 'night') complexity -= 20
  else if (timeOfDay === 'evening') complexity -= 10

  // Session fatigue — the more signals viewed, the simpler we present
  if (sessionSignalsViewed > 30) complexity -= 15
  else if (sessionSignalsViewed > 15) complexity -= 8

  // Network constraint — reduce media on slow connections
  if (networkQuality === 'slow') complexity -= 20
  else if (networkQuality === 'medium') complexity -= 10
  else if (networkQuality === 'offline') complexity -= 30

  complexity = Math.max(10, Math.min(100, complexity))

  return {
    maxVisibleSignals: complexity > 60 ? 30 : complexity > 40 ? 20 : 12,
    showDescriptions: complexity > 35,
    showRegionalBreakdown: complexity > 55,
    feedColumns: device === 'mobile' ? 1 : device === 'tablet' ? 2 : complexity > 50 ? 3 : 2,
    animationsEnabled: complexity > 30 && networkQuality !== 'slow',
    imageQuality: networkQuality === 'slow' ? 'low' : networkQuality === 'medium' ? 'medium' : 'high',
    complexityScore: complexity,
  }
}

// ─── ContextAdaptationAgent ─────────────────────────────────────────────────
// Adapts content selection based on user's detected location and local context.
// Ensures relevance without creating filter bubbles.

interface AdaptationInput {
  signals: Signal[]
  userCountry: string | null
  userTimezone: string
  preferredCategories: SignalCategory[]
}

interface AdaptationOutput {
  signals: Signal[]
  localBoostApplied: boolean
  diversityScore: number // 0-100, higher = more diverse feed
}

export function contextAdaptationAgent(input: AdaptationInput): AdaptationOutput {
  const { signals, userCountry, preferredCategories } = input

  if (signals.length === 0) return { signals: [], localBoostApplied: false, diversityScore: 100 }

  // Map country to signal region
  const countryToRegion: Record<string, string> = {
    France: 'france',
    Belgique: 'belgique',
    USA: 'usa',
    Canada: 'usa',
    UK: 'europe',
    Germany: 'europe',
    Spain: 'europe',
    Italy: 'europe',
    Switzerland: 'europe',
    Netherlands: 'europe',
    RDC: 'rdc',
    Nigeria: 'africa',
    Kenya: 'africa',
    'South Africa': 'africa',
    Morocco: 'africa',
    Senegal: 'africa',
    Cameroon: 'africa',
    'Côte d\'Ivoire': 'africa',
  }

  const userRegion = userCountry ? countryToRegion[userCountry] : null

  // Score each signal for relevance
  const scored = signals.map((signal) => {
    let score = 50 // baseline

    // Local relevance boost (max 30% of feed — prevents filter bubble)
    if (userRegion && signal.region === userRegion) score += 20
    if (signal.region === 'global') score += 10

    // Preferred categories mild boost (never exclude non-preferred)
    if (preferredCategories.includes(signal.category)) score += 15

    // Hot/trending boost
    if (signal.hot) score += 10
    if (signal.trending) score += 5

    // High-engagement boost
    if (signal.totalVotes > 5000) score += 5

    return { signal, score }
  })

  // Sort by score but cap local content at 40% to maintain diversity
  scored.sort((a, b) => b.score - a.score)

  const maxLocal = Math.ceil(signals.length * 0.4)
  let localCount = 0
  const result: Signal[] = []
  const deferred: Signal[] = []

  for (const { signal } of scored) {
    const isLocal = userRegion && signal.region === userRegion
    if (isLocal && localCount >= maxLocal) {
      deferred.push(signal)
    } else {
      if (isLocal) localCount++
      result.push(signal)
    }
  }
  result.push(...deferred)

  // Calculate diversity score
  const categories = new Set(result.slice(0, 20).map((s) => s.category))
  const regions = new Set(result.slice(0, 20).map((s) => s.region))
  const diversityScore = Math.min(100, (categories.size / 10 + regions.size / 5) * 50)

  return {
    signals: result,
    localBoostApplied: localCount > 0,
    diversityScore: Math.round(diversityScore),
  }
}

// ─── DeviceOptimizationAgent ────────────────────────────────────────────────
// Returns device-specific UI parameters for optimal rendering.

interface DeviceOptOutput {
  touchTargetMin: number // px
  fontSize: { base: number; heading: number; small: number }
  spacing: { section: number; card: number; element: number }
  maxContentWidth: number
  showBottomNav: boolean
  showSidebar: boolean
  cardLayout: 'stack' | 'grid-2' | 'grid-3'
}

export function deviceOptimizationAgent(device: DeviceType, screenWidth: number): DeviceOptOutput {
  switch (device) {
    case 'mobile':
      return {
        touchTargetMin: 44,
        fontSize: { base: 15, heading: 22, small: 12 },
        spacing: { section: 32, card: 14, element: 8 },
        maxContentWidth: screenWidth,
        showBottomNav: true,
        showSidebar: false,
        cardLayout: 'stack',
      }
    case 'tablet':
      return {
        touchTargetMin: 40,
        fontSize: { base: 16, heading: 26, small: 13 },
        spacing: { section: 40, card: 16, element: 10 },
        maxContentWidth: Math.min(screenWidth, 900),
        showBottomNav: true,
        showSidebar: false,
        cardLayout: 'grid-2',
      }
    default:
      return {
        touchTargetMin: 36,
        fontSize: { base: 16, heading: 32, small: 13 },
        spacing: { section: 48, card: 18, element: 12 },
        maxContentWidth: 1200,
        showBottomNav: false,
        showSidebar: true,
        cardLayout: 'grid-3',
      }
  }
}

// ─── ContentSafetyAgent ─────────────────────────────────────────────────────
// Ensures content presentation is psychologically safe.
// Progressive disclosure prevents overwhelming users.

interface SafetyRecommendation {
  showWarning: boolean
  warningText: string | null
  blurContent: boolean
  requireConfirmation: boolean
}

export function contentSafetyAgent(signal: Signal, tensionScore: number): SafetyRecommendation {
  // High tension signals get contextual framing
  if (tensionScore > 80) {
    return {
      showWarning: true,
      warningText: 'This topic is highly debated — multiple perspectives exist.',
      blurContent: false,
      requireConfirmation: false,
    }
  }

  // Extreme polarization with high volume
  if (tensionScore > 90 && signal.totalVotes > 10000) {
    return {
      showWarning: true,
      warningText: 'This signal shows extreme polarization. Take time to consider both sides.',
      blurContent: true,
      requireConfirmation: true,
    }
  }

  return {
    showWarning: false,
    warningText: null,
    blurContent: false,
    requireConfirmation: false,
  }
}
