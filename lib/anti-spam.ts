/**
 * ZAWIOS Anti-Spam Engine
 *
 * Adaptive trust weights, rate limits, cluster detection, HOTD cooldown.
 * All actions are logged to anti_spam_log for admin review.
 */

/* ── Constants ─────────────────────────────────────────────────────── */

/** New accounts get reduced trust for first 24h */
const NEW_ACCOUNT_GRACE_HOURS = 24
const NEW_ACCOUNT_TRUST = 0.6

/** Sensitive categories require higher trust */
const SENSITIVE_CATEGORIES = new Set([
  'Géopolitique', 'Sécurité', 'Justice', 'Médias', 'Éthique',
])
const SENSITIVE_TRUST_THRESHOLD = 0.75

/** HOTD: cooldown if votes/min exceed this */
const HOTD_VOTE_BURST_THRESHOLD = 50
const HOTD_COOLDOWN_MINUTES = 15

/** Daily vote limits per trust tier */
const DAILY_VOTE_LIMITS: Record<string, number> = {
  new:      10,
  standard: 50,
  trusted:  200,
}

/* ── Types ─────────────────────────────────────────────────────────── */

export interface UserContext {
  userId: string
  createdAt: Date
  trustWeight: number  // 0–1
  votesToday: number
  isBanned: boolean
}

export interface VoteRequest {
  signalId: string
  category: string
  isHotd: boolean
}

export type VoteDecision =
  | { allowed: true;  weight: number }
  | { allowed: false; reason: string; retryAfterMs?: number }

/* ── Trust weight calculation ───────────────────────────────────────── */

export function computeTrustWeight(user: UserContext, signal: VoteRequest): number {
  if (user.isBanned) return 0

  let weight = user.trustWeight

  // New account penalty
  const ageHours = (Date.now() - user.createdAt.getTime()) / 3_600_000
  if (ageHours < NEW_ACCOUNT_GRACE_HOURS) {
    weight = Math.min(weight, NEW_ACCOUNT_TRUST)
  }

  // Sensitive category penalty for low-trust accounts
  if (SENSITIVE_CATEGORIES.has(signal.category) && weight < SENSITIVE_TRUST_THRESHOLD) {
    weight *= 0.7
  }

  return Math.min(1, Math.max(0, weight))
}

/* ── Vote decision ──────────────────────────────────────────────────── */

export function checkVoteAllowed(user: UserContext, signal: VoteRequest): VoteDecision {
  if (user.isBanned) {
    return { allowed: false, reason: 'Compte suspendu.' }
  }

  const tier = user.trustWeight >= 0.9 ? 'trusted' : user.trustWeight >= 0.6 ? 'standard' : 'new'
  const limit = DAILY_VOTE_LIMITS[tier]

  if (user.votesToday >= limit) {
    const tomorrow = new Date()
    tomorrow.setHours(24, 0, 0, 0)
    return {
      allowed: false,
      reason: `Limite quotidienne atteinte (${limit} votes). Réessayez demain.`,
      retryAfterMs: tomorrow.getTime() - Date.now(),
    }
  }

  const weight = computeTrustWeight(user, signal)

  return { allowed: true, weight }
}

/* ── Toxic content heuristics ───────────────────────────────────────── */

const TOXIC_PATTERNS = [
  /\b(haine|tuer|mort|terroriste|nazie?|raciste)\b/i,
  /\b(kill|hate|nazi|terrorist)\b/i,
]

const CLICKBAIT_PATTERNS = [
  /!\s*\?|choquant|incroyable|secret|révélation|urgent/i,
]

export interface ContentRisk {
  toxicityScore: number   // 0–100
  isClickbait: boolean
  flags: string[]
}

export function assessContentRisk(text: string): ContentRisk {
  const flags: string[] = []
  let toxicityScore = 0

  for (const p of TOXIC_PATTERNS) {
    if (p.test(text)) {
      toxicityScore += 40
      flags.push('toxic_language')
    }
  }

  const isClickbait = CLICKBAIT_PATTERNS.some((p) => p.test(text))
  if (isClickbait) flags.push('clickbait')

  // Excessive caps check
  const capsRatio = (text.match(/[A-ZÀÂÉÈÊËÎÏÔÙÛÜ]/g) ?? []).length / Math.max(text.length, 1)
  if (capsRatio > 0.4 && text.length > 20) {
    toxicityScore += 20
    flags.push('excessive_caps')
  }

  return { toxicityScore: Math.min(100, toxicityScore), isClickbait, flags }
}

/* ── HOTD burst cooldown check ──────────────────────────────────────── */

export function isHotdInCooldown(votesLastMinute: number): boolean {
  return votesLastMinute > HOTD_VOTE_BURST_THRESHOLD
}

export function getHotdCooldownMs(): number {
  return HOTD_COOLDOWN_MINUTES * 60_000
}
