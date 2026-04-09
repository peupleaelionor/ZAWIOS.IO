/**
 * Content Integrity — Duplicate and bias detection
 *
 * Pure function. No UI. No side effects. No external requests.
 * Validates signal titles for bias wording and detects near-duplicates.
 */

export interface SignalDraft {
  id?: string
  title: string
  description?: string
  category: string
  region: string
}

export type IntegrityIssueType =
  | 'leading_question'        // "Isn't it true that..."
  | 'loaded_language'         // emotionally charged framing
  | 'unresolvable_question'   // can't be objectively resolved
  | 'duplicate_likely'        // > 80% similarity to existing
  | 'duplicate_possible'      // 60–80% similarity

export interface IntegrityIssue {
  type: IntegrityIssueType
  message: string
  severity: 'error' | 'warning'
}

export interface IntegrityResult {
  valid: boolean
  issues: IntegrityIssue[]
  similarSignalIds: string[]
  similarityScore?: number
}

// Bias indicators — phrases that suggest preferred answers
const LEADING_PATTERNS = [
  /^n'est-il pas vrai/i,
  /^ne pensez-vous pas/i,
  /^isn't it (true|obvious)/i,
  /^don't you think/i,
  /^obviously/i,
  /^clearly/i,
  /^évidemment/i,
  /^il est évident/i,
]

const LOADED_LANGUAGE_PATTERNS = [
  /\b(détruire?|destruction|catastrophe|désastre|effondrement)\b/i,
  /\b(révolution|boulevers)/i,
  /\b(fail(ure)?|failing|échec cuisant)\b/i,
  /\b(dangereux|dangerous|menace grave)\b/i,
]

const UNRESOLVABLE_PATTERNS = [
  /\b(devrait|should|ought to|mérite)\b/i,
  /\b(meilleur|best|worst|pire)\b(?!.{0,20}%)/i,  // "meilleur" without a measurable follow-up
  /\b(toujours|jamais|always|never)\b/i,
]

/**
 * Validate a signal draft for bias and resolvability issues
 */
export function validateSignalIntegrity(draft: SignalDraft): IntegrityResult {
  const issues: IntegrityIssue[] = []
  const text = `${draft.title} ${draft.description ?? ''}`

  for (const pattern of LEADING_PATTERNS) {
    if (pattern.test(draft.title)) {
      issues.push({
        type: 'leading_question',
        message: 'Le titre suggère une réponse préférable. Reformuler de manière neutre.',
        severity: 'error',
      })
      break
    }
  }

  for (const pattern of LOADED_LANGUAGE_PATTERNS) {
    if (pattern.test(text)) {
      issues.push({
        type: 'loaded_language',
        message: 'Langage émotionnellement chargé détecté. Utiliser des termes neutres et mesurables.',
        severity: 'warning',
      })
      break
    }
  }

  for (const pattern of UNRESOLVABLE_PATTERNS) {
    if (pattern.test(text)) {
      issues.push({
        type: 'unresolvable_question',
        message: 'La question peut ne pas être objectivement résolvable. Ajouter des critères mesurables.',
        severity: 'warning',
      })
      break
    }
  }

  return {
    valid: issues.filter((i) => i.severity === 'error').length === 0,
    issues,
    similarSignalIds: [],
  }
}

/**
 * Compute similarity score between two titles (0–1)
 * Lightweight Jaccard similarity on word tokens.
 */
export function titleSimilarity(a: string, b: string): number {
  const tokenize = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, '')
        .split(/\s+/)
        .filter((w) => w.length > 2),
    )

  const setA = tokenize(a)
  const setB = tokenize(b)

  if (setA.size === 0 || setB.size === 0) return 0

  let intersection = 0
  for (const w of setA) {
    if (setB.has(w)) intersection++
  }

  const union = new Set([...setA, ...setB]).size
  return intersection / union
}

const DUPLICATE_ERROR_THRESHOLD = 0.8
const DUPLICATE_WARN_THRESHOLD = 0.6

/**
 * Check a draft against a corpus of existing signals for near-duplicates
 */
export function detectDuplicates(
  draft: SignalDraft,
  existing: SignalDraft[],
): { similarSignalIds: string[]; issues: IntegrityIssue[]; highestScore: number } {
  const issues: IntegrityIssue[] = []
  const similarSignalIds: string[] = []
  let highestScore = 0

  for (const s of existing) {
    if (!s.id || s.id === draft.id) continue
    const score = titleSimilarity(draft.title, s.title)
    if (score > highestScore) highestScore = score

    if (score >= DUPLICATE_ERROR_THRESHOLD) {
      similarSignalIds.push(s.id)
      issues.push({
        type: 'duplicate_likely',
        message: `Signal très similaire existant (${Math.round(score * 100)}% similaire). Fusionner ou différencier.`,
        severity: 'error',
      })
    } else if (score >= DUPLICATE_WARN_THRESHOLD) {
      similarSignalIds.push(s.id)
      issues.push({
        type: 'duplicate_possible',
        message: `Signal potentiellement similaire (${Math.round(score * 100)}% similaire). Vérifier avant publication.`,
        severity: 'warning',
      })
    }
  }

  return { similarSignalIds, issues, highestScore }
}
