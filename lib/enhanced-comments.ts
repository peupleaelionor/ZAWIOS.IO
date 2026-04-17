/**
 * ZAWIOS Enhanced Mock Comments — Rich threaded conversations with GIFs, reactions, badges.
 * Pre-filled conversations that showcase the full feature set.
 */

import type { ReactionType, ReactionCount } from '@/components/comments/reaction-bar'

export interface EnhancedComment {
  id: string
  prediction_id: string
  author_name: string
  author_username: string
  author_avatar?: string
  content: string
  gif_url?: string
  gif_title?: string
  upvotes: number
  reactions: ReactionCount[]
  created_at: string
  is_local?: boolean
  is_verified?: boolean
  is_top_predictor?: boolean
  parent_id?: string // for threaded replies
  reply_count?: number
}

// ── Helper to create reaction arrays ─────────────────────────────────────
function r(...items: [ReactionType, number][]): ReactionCount[] {
  return items.map(([type, count]) => ({ type, count }))
}

// ── Rich conversation data ───────────────────────────────────────────────
const ENHANCED_COMMENTS: EnhancedComment[] = [
  // ═══ Prediction P1 — AI Benchmarks ═══════════════════════════════════
  {
    id: 'ec-p1-1',
    prediction_id: 'p1',
    author_name: 'Raj Patel',
    author_username: 'rajpatel',
    author_avatar: '/avatars/patel.svg',
    content:
      '"All standard benchmarks" is doing a lot of work in that sentence. MMLU, HumanEval, GSM8K — sure. Abstract visual reasoning, causal inference, multi-step tool use? Still messy. I think we\'re looking at 2027 at earliest for a genuine breakthrough.',
    upvotes: 51,
    reactions: r(['brain', 23], ['bullseye', 14], ['fire', 8]),
    created_at: '2025-12-01T08:30:00Z',
    is_verified: true,
    is_top_predictor: true,
    reply_count: 3,
  },
  {
    id: 'ec-p1-1-r1',
    prediction_id: 'p1',
    parent_id: 'ec-p1-1',
    author_name: 'Lina Soares',
    author_username: 'linasoares',
    author_avatar: '/avatars/soares.svg',
    content:
      'Agree with the nuance. But GPT-5 internal benchmarks reportedly crush causal reasoning. The bar keeps moving. By 2026 the only remaining frontier will be embodied cognition.',
    upvotes: 18,
    reactions: r(['brain', 9], ['eyes', 5]),
    created_at: '2025-12-01T10:15:00Z',
  },
  {
    id: 'ec-p1-1-r2',
    prediction_id: 'p1',
    parent_id: 'ec-p1-1',
    author_name: 'Alex Chen',
    author_username: 'alexchen',
    author_avatar: '/avatars/chen.svg',
    content:
      'The real question is who defines "surpass" — the labs who designed the benchmarks or independent evaluators? The goalposts will move.',
    gif_url: 'https://media.giphy.com/media/a5viI92PAF89q/giphy.gif',
    gif_title: 'Thinking',
    upvotes: 12,
    reactions: r(['bullseye', 7], ['brain', 4]),
    created_at: '2025-12-01T11:00:00Z',
    is_verified: true,
  },
  {
    id: 'ec-p1-1-r3',
    prediction_id: 'p1',
    parent_id: 'ec-p1-1',
    author_name: 'Marcus Webb',
    author_username: 'marcuswebb',
    content:
      'Counter-point: ARC-AGI 2 was supposed to be AI-proof and already showing cracks. The timeline is accelerating, not decelerating.',
    upvotes: 8,
    reactions: r(['fire', 5]),
    created_at: '2025-12-02T09:00:00Z',
  },
  {
    id: 'ec-p1-2',
    prediction_id: 'p1',
    author_name: 'Alex Chen',
    author_username: 'alexchen',
    author_avatar: '/avatars/chen.svg',
    content:
      'Latest reasoning benchmarks are already broken by frontier models. The real question is whether "surpassing" includes tasks like long-horizon planning and embodied reasoning — that last one still has years of runway.',
    upvotes: 38,
    reactions: r(['fire', 15], ['brain', 11], ['clap', 7]),
    created_at: '2025-11-15T10:00:00Z',
    is_verified: true,
    reply_count: 1,
  },
  {
    id: 'ec-p1-2-r1',
    prediction_id: 'p1',
    parent_id: 'ec-p1-2',
    author_name: 'Sophie Meunier',
    author_username: 'sophiemeunier',
    author_avatar: '/avatars/meunier.svg',
    content:
      'Exactly this. The compute scaling hypothesis keeps proving right. But there\'s a qualitative gap between "matching benchmark performance" and "reliable, verifiable reasoning." We need new evaluation frameworks.',
    upvotes: 14,
    reactions: r(['brain', 8], ['diamond', 3]),
    created_at: '2025-11-15T14:30:00Z',
    is_top_predictor: true,
  },
  {
    id: 'ec-p1-3',
    prediction_id: 'p1',
    author_name: 'Maria Wong',
    author_username: 'mariawong',
    author_avatar: '/avatars/wong.svg',
    content:
      'Benchmark performance ≠ production reliability. We still see compounding errors on complex real-world tasks. Voting No — the timing is off even if the direction is correct.',
    gif_url: 'https://media.giphy.com/media/d10dMmzqCYqQ0/giphy.gif',
    gif_title: 'No Way',
    upvotes: 24,
    reactions: r(['bullseye', 12], ['eyes', 6]),
    created_at: '2025-11-16T12:30:00Z',
    reply_count: 2,
  },
  {
    id: 'ec-p1-3-r1',
    prediction_id: 'p1',
    parent_id: 'ec-p1-3',
    author_name: 'Yuki Tanaka',
    author_username: 'yukitanaka',
    content:
      'Strong agree. My team deploys LLMs in healthcare and the gap between demos and real-world performance is still massive. Safety requirements add another 2-3 years minimum.',
    upvotes: 9,
    reactions: r(['bullseye', 6]),
    created_at: '2025-11-16T15:00:00Z',
  },
  {
    id: 'ec-p1-3-r2',
    prediction_id: 'p1',
    parent_id: 'ec-p1-3',
    author_name: 'Omar Diallo',
    author_username: 'omardiallo',
    content: 'This is why prediction markets > expert panels. The crowd factors in all these nuances that individual forecasts miss.',
    upvotes: 5,
    reactions: r(['clap', 3]),
    created_at: '2025-11-17T09:30:00Z',
  },

  // ═══ Prediction P2 — Federal Reserve / Finance ═══════════════════════
  {
    id: 'ec-p2-1',
    prediction_id: 'p2',
    author_name: 'Sophie Meunier',
    author_username: 'sophiemeunier',
    author_avatar: '/avatars/meunier.svg',
    content:
      'Sticky core PCE inflation keeps the Fed boxed in. My base case is 3.75% at year-end — two cuts priced in but the data might push them to pause after one. The labor market is the wildcard.',
    upvotes: 42,
    reactions: r(['brain', 19], ['bullseye', 11], ['diamond', 5]),
    created_at: '2025-10-20T14:00:00Z',
    is_top_predictor: true,
    reply_count: 2,
  },
  {
    id: 'ec-p2-1-r1',
    prediction_id: 'p2',
    parent_id: 'ec-p2-1',
    author_name: 'James Okafor',
    author_username: 'jamesokafor',
    author_avatar: '/avatars/okafor.svg',
    content:
      'Labor market cooling but not crashing. The "soft landing" narrative is holding. I agree with 3.75% but wouldn\'t rule out 4.0% if services inflation reaccelerates.',
    gif_url: 'https://media.giphy.com/media/JtBZm3Getg3dqxK60a/giphy.gif',
    gif_title: 'Charts Going Up',
    upvotes: 15,
    reactions: r(['brain', 7], ['bullseye', 4]),
    created_at: '2025-10-21T09:00:00Z',
  },
  {
    id: 'ec-p2-1-r2',
    prediction_id: 'p2',
    parent_id: 'ec-p2-1',
    author_name: 'Aisha Mbeki',
    author_username: 'aishambeki',
    content:
      'From an EM perspective, the real story is dollar strength. Every 25bp cut matters for emerging market flows. Africa watching closely.',
    upvotes: 11,
    reactions: r(['eyes', 8], ['brain', 3]),
    created_at: '2025-10-22T11:30:00Z',
    is_verified: true,
  },
  {
    id: 'ec-p2-2',
    prediction_id: 'p2',
    author_name: 'James Okafor',
    author_username: 'jamesokafor',
    author_avatar: '/avatars/okafor.svg',
    content:
      'Credit markets are already pricing in 4.25% as a floor. The terminal rate projection drift keeps surprising to the upside. Staying at >4% camp.',
    upvotes: 29,
    reactions: r(['fire', 9], ['brain', 7]),
    created_at: '2025-11-02T09:15:00Z',
    reply_count: 1,
  },
  {
    id: 'ec-p2-2-r1',
    prediction_id: 'p2',
    parent_id: 'ec-p2-2',
    author_name: 'Elena Petrov',
    author_username: 'elenap',
    content: 'Bond market is rarely wrong this far in advance. The yield curve says 4.25% minimum. Trust the signal.',
    upvotes: 7,
    reactions: r(['bullseye', 4]),
    created_at: '2025-11-03T10:00:00Z',
  },

  // ═══ World View 1 — Global Signal ════════════════════════════════════
  {
    id: 'ec-wv1-1',
    prediction_id: 'wv1',
    author_name: 'Alex Chen',
    author_username: 'alexchen',
    author_avatar: '/avatars/chen.svg',
    content:
      'The regional divergence here is fascinating — Africa vs. USA gap of almost 30 points. Could be access to AI tools, media framing, or genuine differences in economic experience.',
    upvotes: 67,
    reactions: r(['brain', 28], ['bullseye', 15], ['fire', 12], ['diamond', 8]),
    created_at: '2025-09-12T16:00:00Z',
    is_verified: true,
    is_top_predictor: true,
    reply_count: 3,
  },
  {
    id: 'ec-wv1-1-r1',
    prediction_id: 'wv1',
    parent_id: 'ec-wv1-1',
    author_name: 'Kwame Asante',
    author_username: 'kwameasante',
    content:
      'As someone in Accra, the optimism is real. Mobile-first AI adoption, leapfrog infrastructure, young demographics. The West doesn\'t see what\'s happening on the ground.',
    gif_url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    gif_title: 'Party',
    upvotes: 34,
    reactions: r(['fire', 18], ['clap', 12], ['diamond', 5]),
    created_at: '2025-09-13T08:00:00Z',
  },
  {
    id: 'ec-wv1-1-r2',
    prediction_id: 'wv1',
    parent_id: 'ec-wv1-1',
    author_name: 'Sophie Meunier',
    author_username: 'sophiemeunier',
    author_avatar: '/avatars/meunier.svg',
    content:
      'France\'s lower optimism is probably structural — strong labor protections, union culture. The US number feels frothy given ongoing layoff cycles in tech.',
    upvotes: 33,
    reactions: r(['brain', 14], ['bullseye', 9]),
    created_at: '2025-10-01T10:45:00Z',
    is_top_predictor: true,
  },
  {
    id: 'ec-wv1-1-r3',
    prediction_id: 'wv1',
    parent_id: 'ec-wv1-1',
    author_name: 'David Kim',
    author_username: 'davidkim',
    content: 'ZAWIOS should weight these signals by sample size per region. 500 votes from the US vs 80 from Africa tells a different story.',
    upvotes: 15,
    reactions: r(['brain', 7], ['eyes', 4]),
    created_at: '2025-10-02T14:00:00Z',
  },

  // ═══ Prediction P3/P4/P5 — general content ═══════════════════════════
  {
    id: 'ec-p3-1',
    prediction_id: 'p3',
    author_name: 'Priya Sharma',
    author_username: 'priyasharma',
    content:
      'Crypto winter taught me one thing: prediction markets are the one real use case. This platform proves it. My accuracy on BTC predictions is 73% over 18 months.',
    upvotes: 31,
    reactions: r(['fire', 14], ['diamond', 8], ['bullseye', 6]),
    created_at: '2025-11-01T12:00:00Z',
    is_verified: true,
    reply_count: 1,
  },
  {
    id: 'ec-p3-1-r1',
    prediction_id: 'p3',
    parent_id: 'ec-p3-1',
    author_name: 'Max Hoffman',
    author_username: 'maxhoffman',
    content: '73% is elite tier. What\'s your methodology? Pure technical or fundamentals-weighted?',
    gif_url: 'https://media.giphy.com/media/APqEbxBsVlkWSuFpth/giphy.gif',
    gif_title: 'Calculating',
    upvotes: 8,
    reactions: r(['eyes', 5]),
    created_at: '2025-11-01T15:00:00Z',
  },
  {
    id: 'ec-p4-1',
    prediction_id: 'p4',
    author_name: 'Carlos Rivera',
    author_username: 'carlosrivera',
    content:
      'Sports predictions on ZAWIOS consistently outperform Vegas lines in accuracy. Crowd wisdom is underrated when you have the right community composition.',
    upvotes: 22,
    reactions: r(['bullseye', 10], ['clap', 7]),
    created_at: '2025-10-28T18:00:00Z',
    reply_count: 1,
  },
  {
    id: 'ec-p4-1-r1',
    prediction_id: 'p4',
    parent_id: 'ec-p4-1',
    author_name: 'Fátima Alves',
    author_username: 'fatimaalves',
    content: 'The sample here is self-selecting though. ZAWIOS users tend to be more analytical than average sports bettors. Selection bias is a feature, not a bug.',
    upvotes: 13,
    reactions: r(['brain', 9]),
    created_at: '2025-10-29T08:00:00Z',
  },
  {
    id: 'ec-p5-1',
    prediction_id: 'p5',
    author_name: 'Nina Johansson',
    author_username: 'ninajohansson',
    content:
      'Climate predictions are the hardest category to score because the timelines are so long. Kudos to ZAWIOS for including them anyway — accountability matters even at decade scale.',
    gif_url: 'https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif',
    gif_title: 'Shook',
    upvotes: 19,
    reactions: r(['diamond', 7], ['brain', 6], ['clap', 4]),
    created_at: '2025-11-05T11:00:00Z',
  },

  // ═══ World View generic signals ═══════════════════════════════════════
  {
    id: 'ec-wv11-1',
    prediction_id: 'wv11',
    author_name: 'Raj Patel',
    author_username: 'rajpatel',
    author_avatar: '/avatars/patel.svg',
    content:
      'The crowd accuracy on this category has been excellent — over 78% on resolved signals. High confidence in current distribution.',
    upvotes: 19,
    reactions: r(['bullseye', 9], ['brain', 5]),
    created_at: '2025-11-20T11:00:00Z',
    is_verified: true,
  },
  {
    id: 'ec-wv21-1',
    prediction_id: 'wv21',
    author_name: 'Maria Wong',
    author_username: 'mariawong',
    author_avatar: '/avatars/wong.svg',
    content:
      'Worth noting the massive vote differential between regions. Global consensus and US consensus are almost inverse here — unusual pattern.',
    upvotes: 28,
    reactions: r(['brain', 13], ['eyes', 8], ['fire', 4]),
    created_at: '2025-10-15T09:30:00Z',
    reply_count: 1,
  },
  {
    id: 'ec-wv21-1-r1',
    prediction_id: 'wv21',
    parent_id: 'ec-wv21-1',
    author_name: 'Tomás García',
    author_username: 'tomasgarcia',
    content: 'This inverse pattern shows up in geopolitics signals too. Cultural framing matters more than data when it comes to predictions about other regions.',
    upvotes: 11,
    reactions: r(['brain', 6]),
    created_at: '2025-10-16T14:00:00Z',
  },
]

/** Get enhanced seed comments for a prediction, sorted by upvotes desc (top-level first) */
export function getEnhancedComments(predictionId: string): EnhancedComment[] {
  return ENHANCED_COMMENTS.filter(
    (c) => c.prediction_id === predictionId && !c.parent_id,
  ).sort((a, b) => b.upvotes - a.upvotes)
}

/** Get replies to a specific comment */
export function getCommentReplies(commentId: string, predictionId: string): EnhancedComment[] {
  return ENHANCED_COMMENTS.filter(
    (c) => c.prediction_id === predictionId && c.parent_id === commentId,
  ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
}

/** Get total comment count including replies */
export function getTotalCommentCount(predictionId: string): number {
  return ENHANCED_COMMENTS.filter((c) => c.prediction_id === predictionId).length
}
