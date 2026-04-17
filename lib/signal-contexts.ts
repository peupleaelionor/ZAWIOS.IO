/**
 * ZAWIOS — Signal Context (Structured Analysis) module
 *
 * Types, mock data, and aggregation logic for structured mini-analyses
 * attached to signal votes. Each context is a brief (180 char) analytical
 * note tied to a YES/NO/NEUTRAL vote.
 */

export type VoteType = 'yes' | 'no' | 'neutral'

export interface SignalContext {
  id: string
  signalId: string
  userId: string
  authorName: string
  voteType: VoteType
  contextText: string
  createdAt: string
  likesCount: number
  isFeatured: boolean
}

// ── Mock data ──
const MOCK_CONTEXTS: Record<string, SignalContext[]> = {
  default: [
    {
      id: 'ctx-1',
      signalId: 'default',
      userId: 'u1',
      authorName: 'C. Laurent',
      voteType: 'yes',
      contextText: 'Oui à long terme, incertitude court terme. Les indicateurs Q2 restent positifs.',
      createdAt: '2h',
      likesCount: 14,
      isFeatured: true,
    },
    {
      id: 'ctx-2',
      signalId: 'default',
      userId: 'u2',
      authorName: 'L. Faye',
      voteType: 'no',
      contextText: 'Non sauf si réforme budgétaire adoptée. Risque réglementaire élevé.',
      createdAt: '3h',
      likesCount: 9,
      isFeatured: false,
    },
    {
      id: 'ctx-3',
      signalId: 'default',
      userId: 'u3',
      authorName: 'T. Diop',
      voteType: 'neutral',
      contextText: "Neutre en l'absence de données Q3. Attente de confirmation.",
      createdAt: '5h',
      likesCount: 6,
      isFeatured: false,
    },
    {
      id: 'ctx-4',
      signalId: 'default',
      userId: 'u4',
      authorName: 'M. Bah',
      voteType: 'yes',
      contextText: 'Signal aligné avec les tendances historiques de ce secteur.',
      createdAt: '7h',
      likesCount: 3,
      isFeatured: false,
    },
  ],
}

/**
 * Get top 3 contexts for a signal, sorted by likes (desc) then recency.
 */
export function getTopContexts(signalId: string, limit = 3): SignalContext[] {
  const contexts = MOCK_CONTEXTS[signalId] ?? MOCK_CONTEXTS.default
  return [...contexts]
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, limit)
}

/**
 * Get all contexts for a signal.
 */
export function getAllContexts(signalId: string): SignalContext[] {
  return MOCK_CONTEXTS[signalId] ?? MOCK_CONTEXTS.default
}

/**
 * Compute the nuance/contextualization index.
 * Returns a percentage (0–100) of votes that include an analysis.
 */
export function computeNuanceIndex(
  totalVotes: number,
  signalId: string,
): number {
  const contexts = MOCK_CONTEXTS[signalId] ?? MOCK_CONTEXTS.default
  if (totalVotes === 0) return 0
  // Mock: contexts represent a fraction of total votes
  return Math.min(100, Math.round((contexts.length / totalVotes) * 100))
}

// ── Aggregation keywords (simple term frequency) ──
const KEYWORD_MAP_FR: Record<string, string[]> = {
  'horizon long terme': ['long terme', 'à terme', 'horizon'],
  'risque réglementaire': ['réglementaire', 'régulation', 'réforme'],
  'données insuffisantes': ['données', 'absence de données', 'attente'],
  'tendance confirmée': ['tendance', 'confirmé', 'indicateurs'],
  'incertitude': ['incertitude', 'incertain', 'volatilité'],
}

interface AggregateResult {
  voteType: VoteType
  summary: string
}

/**
 * aggregateContext — Extract recurring trends from structured contexts.
 *
 * Scans context texts for keyword matches per vote type and produces
 * a synthetic summary per dominant vote category.
 */
export function aggregateContext(signalId: string): AggregateResult[] {
  const contexts = MOCK_CONTEXTS[signalId] ?? MOCK_CONTEXTS.default
  const results: AggregateResult[] = []

  const voteTypes: VoteType[] = ['yes', 'no', 'neutral']

  for (const vt of voteTypes) {
    const vtContexts = contexts.filter((c) => c.voteType === vt)
    if (vtContexts.length === 0) continue

    // Count keyword theme occurrences
    const themeCounts: Record<string, number> = {}
    for (const ctx of vtContexts) {
      const lower = ctx.contextText.toLowerCase()
      for (const [theme, keywords] of Object.entries(KEYWORD_MAP_FR)) {
        for (const kw of keywords) {
          if (lower.includes(kw)) {
            themeCounts[theme] = (themeCounts[theme] ?? 0) + 1
            break
          }
        }
      }
    }

    // Pick top theme
    const topTheme = Object.entries(themeCounts).sort(
      (a, b) => b[1] - a[1],
    )[0]

    if (topTheme) {
      const label =
        vt === 'yes' ? 'OUI' : vt === 'no' ? 'NON' : 'NEUTRE'
      results.push({
        voteType: vt,
        summary: `Votes ${label} évoquent principalement : ${topTheme[0]}.`,
      })
    }
  }

  return results
}
