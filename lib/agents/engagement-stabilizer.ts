/**
 * Engagement Stabilizer — Anomalous voting pattern detection
 *
 * Pure function. No UI. No side effects. No external requests.
 * Returns flags and recommendations for a user's session data.
 */

export interface VoteEvent {
  signalId: string
  vote: 'yes' | 'no' | 'neutral'
  timestampMs: number
}

export interface SessionData {
  votes: VoteEvent[]
  sessionStartMs: number
}

export interface StabilizerResult {
  flags: StabilizerFlag[]
  healthy: boolean
  recommendations: string[]
}

export type StabilizerFlag =
  | 'rapid_voting'          // > 10 votes in 60s
  | 'excessive_neutral'     // > 50% neutral votes in session
  | 'short_session'         // session < 30s with > 3 votes
  | 'repetitive_category'   // all votes in same category with > 8 votes

const RAPID_VOTING_COUNT = 10
const RAPID_VOTING_WINDOW_MS = 60_000
const EXCESSIVE_NEUTRAL_THRESHOLD = 0.5
const SHORT_SESSION_THRESHOLD_MS = 30_000
const SHORT_SESSION_MIN_VOTES = 3
const REPETITIVE_CATEGORY_MIN_VOTES = 8

export function analyzeSession(
  session: SessionData,
  categoryMap?: Record<string, string>,   // signalId → category
): StabilizerResult {
  const flags: StabilizerFlag[] = []
  const { votes, sessionStartMs } = session

  if (votes.length === 0) {
    return { flags: [], healthy: true, recommendations: [] }
  }

  // Rapid voting
  const sorted = [...votes].sort((a, b) => a.timestampMs - b.timestampMs)
  for (let i = 0; i <= sorted.length - RAPID_VOTING_COUNT; i++) {
    const window = sorted[i + RAPID_VOTING_COUNT - 1].timestampMs - sorted[i].timestampMs
    if (window <= RAPID_VOTING_WINDOW_MS) {
      flags.push('rapid_voting')
      break
    }
  }

  // Excessive neutral
  const neutralCount = votes.filter((v) => v.vote === 'neutral').length
  if (votes.length >= 4 && neutralCount / votes.length > EXCESSIVE_NEUTRAL_THRESHOLD) {
    flags.push('excessive_neutral')
  }

  // Short session with many votes
  const sessionDuration = (sorted[sorted.length - 1]?.timestampMs ?? sessionStartMs) - sessionStartMs
  if (votes.length >= SHORT_SESSION_MIN_VOTES && sessionDuration < SHORT_SESSION_THRESHOLD_MS) {
    flags.push('short_session')
  }

  // Repetitive category
  if (categoryMap && votes.length >= REPETITIVE_CATEGORY_MIN_VOTES) {
    const categories = votes.map((v) => categoryMap[v.signalId]).filter(Boolean)
    const unique = new Set(categories)
    if (unique.size === 1) {
      flags.push('repetitive_category')
    }
  }

  const recommendations: string[] = []
  if (flags.includes('rapid_voting')) {
    recommendations.push('Introduce a soft cooldown of 2s between votes for this session.')
  }
  if (flags.includes('excessive_neutral')) {
    recommendations.push('Surface fewer signals in categories the user avoids engaging with.')
  }
  if (flags.includes('short_session')) {
    recommendations.push('Flag session for manual review if pattern repeats across 3+ sessions.')
  }
  if (flags.includes('repetitive_category')) {
    recommendations.push('Inject signals from adjacent categories to broaden engagement.')
  }

  return { flags, healthy: flags.length === 0, recommendations }
}
