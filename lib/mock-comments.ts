/**
 * Seed comments — shown immediately before any user posts.
 * TODO: Replace with Supabase query:
 *   supabase.from('comments').select('*, author:profiles(*)').eq('prediction_id', id).order('upvotes', { ascending: false })
 */

export interface LocalComment {
  id: string
  prediction_id: string
  author_name: string
  author_username: string
  content: string
  upvotes: number
  created_at: string
  /** Whether this comment came from localStorage (user-generated) */
  is_local?: boolean
}

const MOCK_COMMENTS: LocalComment[] = [
  // ── Technology / AI ──────────────────────────────────────────────────
  {
    id: 'mc-p1-1',
    prediction_id: 'p1',
    author_name: 'Alex Chen',
    author_username: 'alexchen',
    content:
      'Latest reasoning benchmarks are already broken by frontier models. The real question is whether "surpassing" includes tasks like long-horizon planning and embodied reasoning — that last one still has years of runway.',
    upvotes: 38,
    created_at: '2025-11-15T10:00:00Z',
  },
  {
    id: 'mc-p1-2',
    prediction_id: 'p1',
    author_name: 'Maria Wong',
    author_username: 'mariawong',
    content:
      'Benchmark performance ≠ production reliability. We still see compounding errors on complex real-world tasks. Voting No — the timing is off even if the direction is correct.',
    upvotes: 24,
    created_at: '2025-11-16T12:30:00Z',
  },
  {
    id: 'mc-p1-3',
    prediction_id: 'p1',
    author_name: 'Raj Patel',
    author_username: 'rajpatel',
    content:
      '"All standard benchmarks" is doing a lot of work in that sentence. MMLU, HumanEval, GSM8K — sure. Abstract visual reasoning, causal inference, multi-step tool use? Still messy.',
    upvotes: 51,
    created_at: '2025-12-01T08:30:00Z',
  },
  // ── Finance ──────────────────────────────────────────────────────────
  {
    id: 'mc-p2-1',
    prediction_id: 'p2',
    author_name: 'Sophie Meunier',
    author_username: 'sophiemeunier',
    content:
      'Sticky core PCE inflation keeps the Fed boxed in. My base case is 3.75% at year-end — two cuts priced in but the data might push them to pause after one.',
    upvotes: 42,
    created_at: '2025-10-20T14:00:00Z',
  },
  {
    id: 'mc-p2-2',
    prediction_id: 'p2',
    author_name: 'James Okafor',
    author_username: 'jamesokafor',
    content:
      'Credit markets are already pricing in 4.25% as a floor. The terminal rate projection drift keeps surprising to the upside. Staying at >4% camp.',
    upvotes: 29,
    created_at: '2025-11-02T09:15:00Z',
  },
  // ── World View signals ───────────────────────────────────────────────
  {
    id: 'mc-wv1-1',
    prediction_id: 'wv1',
    author_name: 'Alex Chen',
    author_username: 'alexchen',
    content:
      'The regional divergence here is fascinating — Africa vs. USA gap of almost 30 points. Could be access to AI tools, media framing, or genuine differences in economic experience.',
    upvotes: 67,
    created_at: '2025-09-12T16:00:00Z',
  },
  {
    id: 'mc-wv1-2',
    prediction_id: 'wv1',
    author_name: 'Sophie Meunier',
    author_username: 'sophiemeunier',
    content:
      "France's lower optimism is probably structural — strong labor protections, union culture. The US number feels frothy given ongoing layoff cycles in tech.",
    upvotes: 33,
    created_at: '2025-10-01T10:45:00Z',
  },
  // ── Generic high-quality fallback (for wv signals without specific comments) ──
  {
    id: 'mc-generic-1',
    prediction_id: 'wv11',
    author_name: 'Raj Patel',
    author_username: 'rajpatel',
    content:
      'The crowd accuracy on this category has been excellent — over 78% on resolved signals. High confidence in current distribution.',
    upvotes: 19,
    created_at: '2025-11-20T11:00:00Z',
  },
  {
    id: 'mc-generic-2',
    prediction_id: 'wv21',
    author_name: 'Maria Wong',
    author_username: 'mariawong',
    content:
      'Worth noting the massive vote differential between regions. Global consensus and US consensus are almost inverse here — unusual pattern.',
    upvotes: 28,
    created_at: '2025-10-15T09:30:00Z',
  },
]

/** Get seed comments for a prediction, sorted by upvotes desc */
export function getSeedComments(predictionId: string): LocalComment[] {
  return MOCK_COMMENTS.filter((c) => c.prediction_id === predictionId).sort(
    (a, b) => b.upvotes - a.upvotes,
  )
}
