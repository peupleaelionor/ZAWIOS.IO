/**
 * Viral Trigger — Share suggestion logic
 *
 * Pure function. No UI. No side effects. No external requests.
 * Returns whether to suggest sharing and what card data to surface.
 */

export interface VoteContext {
  userId: string
  signalId: string
  signalTitle: string
  vote: 'yes' | 'no' | 'neutral'
  yesPercent: number
  noPercent: number
  neutralPercent: number
  totalVotes: number
  category: string
  region: string
  userPrecision: number       // 0–1, user's precision rate in this category
  userPercentile: number      // 0–100, user's global percentile rank
  currentStreak: number
}

export interface ShareCard {
  headline: string
  subline: string
  stat: string
  statLabel: string
  shareUrl: string
  hashtags: string[]
}

export interface ViralTriggerResult {
  shouldSuggest: boolean
  reason?: string
  shareCard?: ShareCard
}

// Thresholds — conservative to avoid over-prompting
const MIN_PERCENTILE = 75
const MIN_STREAK = 3
const MIN_PRECISION = 0.65
const MAX_SHARE_RATIO = 0.15     // Never suggest on > 15% of votes (frequency cap)
const MIN_TOTAL_VOTES = 1000     // Only on signals with meaningful sample size

export function evaluateViralTrigger(
  ctx: VoteContext,
  votesThisSession: number,
  sharesThisSession: number,
): ViralTriggerResult {
  // Frequency cap
  if (votesThisSession > 0 && sharesThisSession / votesThisSession > MAX_SHARE_RATIO) {
    return { shouldSuggest: false }
  }

  // Neutral votes are never share-prompted
  if (ctx.vote === 'neutral') {
    return { shouldSuggest: false }
  }

  // Signal too small
  if (ctx.totalVotes < MIN_TOTAL_VOTES) {
    return { shouldSuggest: false }
  }

  const qualifies =
    ctx.userPercentile >= MIN_PERCENTILE &&
    ctx.currentStreak >= MIN_STREAK &&
    ctx.userPrecision >= MIN_PRECISION

  if (!qualifies) {
    return { shouldSuggest: false }
  }

  const majority = ctx.yesPercent > ctx.noPercent ? 'YES' : 'NO'
  const aligned = ctx.vote === majority.toLowerCase()
  const beatMajority = !aligned

  const headline = beatMajority
    ? `Tu es parmi les ${100 - ctx.userPercentile}% à parier contre la majorité`
    : `Aligné avec la foule — top ${100 - ctx.userPercentile}% en précision`

  const shareCard: ShareCard = {
    headline,
    subline: ctx.signalTitle,
    stat: `${Math.round(ctx.userPrecision * 100)}%`,
    statLabel: 'précision catégorie',
    shareUrl: `/predictions/${ctx.signalId}`,
    hashtags: ['ZAWIOS', ctx.category, ctx.region],
  }

  return {
    shouldSuggest: true,
    reason: `streak=${ctx.currentStreak}, percentile=${ctx.userPercentile}, precision=${Math.round(ctx.userPrecision * 100)}%`,
    shareCard,
  }
}
