/**
 * ZAWIOS — Content Guard (Prohibited Patterns)
 *
 * Validates HOTD content against prohibited patterns.
 * Ensures institutional neutrality at generation time.
 *
 * Never generate:
 * - Rage bait
 * - National attack framing
 * - Religious confrontation framing
 * - Ethnic targeting
 * - Direct personal group targeting
 */

// ═══════════════════════════════════════════════════════
// PROHIBITED PATTERNS
// ═══════════════════════════════════════════════════════

const PROHIBITED_PATTERNS: RegExp[] = [
  /* National attack framing */
  /\b(détruire|éliminer|envahir|coloniser|écraser)\b/i,
  /* Religious confrontation */
  /\b(infidèles?|hérétiques?|mécréants?|croisade)\b/i,
  /* Ethnic targeting */
  /\b(race\s+supérieure|purification|nettoyage\s+ethnique)\b/i,
  /* Direct personal group attacks */
  /\b(tous\s+les\s+\w+\s+sont|ces\s+gens-là)\b/i,
  /* Rage bait patterns */
  /\b(scandaleux|honteux|inadmissible|inacceptable)\b/i,
  /* Loaded emotional language */
  /[!]{2,}/,
  /\b(URGENT|ALERTE|CHOC|RÉVÉLATION)\b/,
  /* Direct group accusations */
  /\b(les\s+\w+\s+doivent\s+payer|responsables?\s+de\s+tout)\b/i,
]

const QUALITY_REQUIREMENTS = {
  minLength: 20,
  maxLength: 300,
  mustEndWithQuestionMark: true,
  mustNotStartWithExclamation: true,
} as const

// ═══════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════

export interface ContentValidation {
  isValid: boolean
  violations: string[]
}

/**
 * Validate a HOTD title against prohibited patterns and quality requirements.
 */
export function validateHotdContent(title: string): ContentValidation {
  const violations: string[] = []

  /* Check prohibited patterns */
  for (const pattern of PROHIBITED_PATTERNS) {
    if (pattern.test(title)) {
      violations.push(`Motif interdit détecté : ${pattern.source}`)
    }
  }

  /* Quality checks */
  if (title.length < QUALITY_REQUIREMENTS.minLength) {
    violations.push(`Titre trop court (minimum ${QUALITY_REQUIREMENTS.minLength} caractères)`)
  }

  if (title.length > QUALITY_REQUIREMENTS.maxLength) {
    violations.push(`Titre trop long (maximum ${QUALITY_REQUIREMENTS.maxLength} caractères)`)
  }

  if (QUALITY_REQUIREMENTS.mustEndWithQuestionMark && !title.trim().endsWith('?')) {
    violations.push('Le titre doit se terminer par un point d\'interrogation')
  }

  if (QUALITY_REQUIREMENTS.mustNotStartWithExclamation && title.trim().startsWith('!')) {
    violations.push('Le titre ne doit pas commencer par un point d\'exclamation')
  }

  return {
    isValid: violations.length === 0,
    violations,
  }
}

/**
 * Sanitize a title by removing prohibited patterns.
 * Returns null if the title is beyond repair.
 */
export function sanitizeHotdTitle(title: string): string | null {
  let sanitized = title

  /* Remove excessive punctuation */
  sanitized = sanitized.replace(/[!]{2,}/g, '')
  sanitized = sanitized.replace(/\b(URGENT|ALERTE|CHOC|RÉVÉLATION)\b/gi, '')

  /* Clean up whitespace */
  sanitized = sanitized.replace(/\s{2,}/g, ' ').trim()

  /* Re-validate */
  const validation = validateHotdContent(sanitized)
  return validation.isValid ? sanitized : null
}
