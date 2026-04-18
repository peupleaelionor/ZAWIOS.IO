/**
 * ZAWIOS — Editorial Calendar & Strategic Cycles
 *
 * 60-day editorial calendar with 4 mini-series.
 * 7-day cycle: Projection / Afrique / Tech / Société / Personnel / Surprise / Synthèse
 *
 * Series:
 * 1. "Projection 2035" — Long-term structural signals
 * 2. "Afrique 2040" — African strategic signals
 * 3. "Votre futur personnel" — Personal projection signals
 * 4. "Technologie & Pouvoir" — Tech governance signals
 *
 * Strategic Cycles:
 * - Court terme (1–3 ans)
 * - Moyen terme (5–10 ans)
 * - Long terme (15–30 ans)
 */

export type StrategicCycle = 'court' | 'moyen' | 'long'
export type ImpactLevel = 'faible' | 'structurel' | 'civilisationnel'
export type ConvictionLevel = 'faible' | 'moyenne' | 'forte'

export const SERIES = [
  {
    id: 'projection-2035',
    name: 'Projection 2035',
    description: 'Signaux structurels à horizon 10 ans.',
    color: '#1C39BB',
  },
  {
    id: 'afrique-2040',
    name: 'Afrique 2040',
    description: 'Signaux stratégiques africains à long terme.',
    color: '#14C8BE',
  },
  {
    id: 'futur-personnel',
    name: 'Votre futur personnel',
    description: 'Impact sur votre vie, vos choix, votre trajectoire.',
    color: '#6B6EF8',
  },
  {
    id: 'tech-pouvoir',
    name: 'Technologie & Pouvoir',
    description: 'Gouvernance, souveraineté, contrôle numérique.',
    color: '#F0B429',
  },
  {
    id: 'societe-quotidien',
    name: 'Société & Quotidien',
    description: 'Questions sociétales qui touchent le quotidien de tous, de 18 à 60 ans.',
    color: '#E5484D',
  },
] as const

export type SeriesId = (typeof SERIES)[number]['id']

/**
 * 7-day editorial cycle pattern.
 * Repeats 8 times for 56 days + 4 bonus days = 60 days.
 */
export const DAILY_THEMES = [
  { dayOfWeek: 1, theme: 'Projection 2035', seriesId: 'projection-2035' as SeriesId },
  { dayOfWeek: 2, theme: 'Afrique stratégique', seriesId: 'afrique-2040' as SeriesId },
  { dayOfWeek: 3, theme: 'Technologie', seriesId: 'tech-pouvoir' as SeriesId },
  { dayOfWeek: 4, theme: 'Société', seriesId: 'projection-2035' as SeriesId },
  { dayOfWeek: 5, theme: 'Personnel', seriesId: 'futur-personnel' as SeriesId },
  { dayOfWeek: 6, theme: 'Signal stratégique', seriesId: 'projection-2035' as SeriesId },
  { dayOfWeek: 7, theme: 'Synthèse hebdomadaire', seriesId: 'projection-2035' as SeriesId },
] as const

/**
 * Generate a 60-day editorial calendar starting from a given date.
 */
export function generateEditorialCalendar(
  startDate: Date = new Date(),
): Array<{
  day: number
  date: string
  theme: string
  seriesId: SeriesId
  signalId: number | null
}> {
  const calendar = []
  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    const dayTheme = DAILY_THEMES[i % 7]
    calendar.push({
      day: i + 1,
      date: date.toISOString().split('T')[0],
      theme: dayTheme.theme,
      seriesId: dayTheme.seriesId,
      signalId: i < 62 ? i + 1 : null, // Map to question ID (50 original + 12 Société & Quotidien)
    })
  }
  return calendar
}

/**
 * Impact level metadata.
 */
export const IMPACT_LEVELS: Record<
  ImpactLevel,
  { label: string; labelEn: string; color: string; weight: number }
> = {
  faible: {
    label: 'Impact faible',
    labelEn: 'Low impact',
    color: 'var(--text3)',
    weight: 1,
  },
  structurel: {
    label: 'Impact structurel',
    labelEn: 'Structural impact',
    color: '#1C39BB',
    weight: 2,
  },
  civilisationnel: {
    label: 'Impact civilisationnel',
    labelEn: 'Civilizational impact',
    color: 'var(--accent)',
    weight: 3,
  },
}

/**
 * Strategic cycle metadata.
 */
export const STRATEGIC_CYCLES: Record<
  StrategicCycle,
  { label: string; labelEn: string; range: string }
> = {
  court: { label: 'Cycle court terme', labelEn: 'Short-term cycle', range: '1–3 ans' },
  moyen: { label: 'Cycle moyen terme', labelEn: 'Medium-term cycle', range: '5–10 ans' },
  long: { label: 'Cycle long terme', labelEn: 'Long-term cycle', range: '15–30 ans' },
}

/**
 * Anti-chaos social validation rules.
 *
 * Every signal MUST pass all checks before publication.
 */
export const ANTI_CHAOS_RULES = [
  'No named persons',
  'No political parties',
  'No personal attacks',
  'No emotional formulations',
  'No accusatory questions',
  'No sensationalism',
  'Must be time-projected',
  'Must be measurable',
  'Must be neutral in tone',
] as const

/**
 * Validate a signal title against anti-chaos rules.
 * Returns list of violated rules (empty = valid).
 */
export function validateAntiChaos(title: string): string[] {
  const violations: string[] = []
  const lower = title.toLowerCase()

  // Check for named persons (common patterns)
  if (/\b(macron|trump|biden|poutine|putin|xi jinping|modi)\b/i.test(title)) {
    violations.push('No named persons')
  }

  // Check for political parties
  if (/\b(parti|lrem|rn|ps |lr |afd|gop|democrat|republican)\b/i.test(title)) {
    violations.push('No political parties')
  }

  // Check for emotional/accusatory language
  const emotionalWords = [
    'scandale', 'catastrophe', 'désastre', 'honte', 'outrage',
    'mensonge', 'trahison', 'complot', 'arnaque', 'escroquerie',
    'scandal', 'disaster', 'shame', 'outrage', 'lie', 'betrayal',
  ]
  for (const word of emotionalWords) {
    if (lower.includes(word)) {
      violations.push('No emotional formulations')
      break
    }
  }

  // Must contain a temporal projection
  const temporalPatterns = /\b(20\d\d|d'ici|avant|dans \d+|en \d+ ans|horizon|terme)\b/i
  if (!temporalPatterns.test(title)) {
    violations.push('Must be time-projected')
  }

  return violations
}
