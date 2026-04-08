// ZAWIOS Signal Data Engine
// 30+ realistic signals across categories and regions

export type SignalCategory =
  | 'news'
  | 'tech'
  | 'business'
  | 'crypto'
  | 'sports'
  | 'culture'
  | 'society'
  | 'entertainment'
  | 'trends'
  | 'fun'

export type SignalRegion = 'global' | 'africa' | 'france' | 'europe' | 'usa'

export type SignalStatus = 'active' | 'resolved'

export interface Signal {
  id: string
  title: string
  description: string
  category: SignalCategory
  region: SignalRegion
  status: SignalStatus
  yesPercent: number
  noPercent: number
  totalVotes: number
  createdBy: string | null // null = editorial, string = user
  creatorName?: string
  creatorAvatar?: string
  verified?: boolean
  trending?: boolean
  hot?: boolean
  resolvedResult?: boolean // true = YES was correct, false = NO was correct
  timeAgo: string
  expiresIn?: string
}

export const SIGNAL_CATEGORIES: { id: SignalCategory; label: string; labelFr: string }[] = [
  { id: 'news', label: 'News', labelFr: 'Actualite' },
  { id: 'tech', label: 'Technology', labelFr: 'Tech' },
  { id: 'business', label: 'Business', labelFr: 'Business' },
  { id: 'crypto', label: 'Crypto', labelFr: 'Crypto' },
  { id: 'sports', label: 'Sports', labelFr: 'Sport' },
  { id: 'culture', label: 'Culture', labelFr: 'Culture' },
  { id: 'society', label: 'Society', labelFr: 'Societe' },
  { id: 'entertainment', label: 'Entertainment', labelFr: 'Divertissement' },
  { id: 'trends', label: 'Trends', labelFr: 'Tendances' },
  { id: 'fun', label: 'Fun', labelFr: 'Fun' },
]

export const SIGNAL_REGIONS: { id: SignalRegion; label: string; labelFr: string }[] = [
  { id: 'global', label: 'World', labelFr: 'Monde' },
  { id: 'africa', label: 'Africa', labelFr: 'Afrique' },
  { id: 'france', label: 'France', labelFr: 'France' },
  { id: 'europe', label: 'Europe', labelFr: 'Europe' },
  { id: 'usa', label: 'USA', labelFr: 'USA' },
]

export const FEED_TABS = [
  { id: 'trending', label: 'Trending', labelFr: 'Tendances' },
  { id: 'latest', label: 'Latest', labelFr: 'Recents' },
  { id: 'following', label: 'Following', labelFr: 'Abonnements' },
  { id: 'popular', label: 'Popular', labelFr: 'Populaires' },
]

export const mockSignals: Signal[] = [
  // ─── NEWS / ACTUALITE ───
  {
    id: 's1',
    title: 'Will the next G20 summit produce a joint climate agreement?',
    description: 'With rising tensions between major economies, can they unite on climate?',
    category: 'news',
    region: 'global',
    status: 'active',
    yesPercent: 42,
    noPercent: 58,
    totalVotes: 18567,
    createdBy: null,
    trending: true,
    hot: true,
    timeAgo: '2h ago',
    expiresIn: '3 days',
  },
  {
    id: 's2',
    title: 'La France va-t-elle atteindre le plein emploi avant 2028 ?',
    description: 'Le taux de chomage est au plus bas depuis 15 ans.',
    category: 'news',
    region: 'france',
    status: 'active',
    yesPercent: 31,
    noPercent: 69,
    totalVotes: 12943,
    createdBy: null,
    trending: true,
    timeAgo: '4h ago',
    expiresIn: '2 years',
  },
  {
    id: 's3',
    title: 'Will the African Continental Free Trade Area boost GDP by 10% by 2030?',
    description: 'AfCFTA is the largest free trade area in the world by member states.',
    category: 'news',
    region: 'africa',
    status: 'active',
    yesPercent: 64,
    noPercent: 36,
    totalVotes: 8234,
    createdBy: null,
    trending: true,
    timeAgo: '6h ago',
    expiresIn: '4 years',
  },

  // ─── TECH ───
  {
    id: 's4',
    title: 'Will Apple launch a foldable iPhone this year?',
    description: 'Rumors intensify. Samsung and Huawei already dominate the foldable market.',
    category: 'tech',
    region: 'global',
    status: 'active',
    yesPercent: 38,
    noPercent: 62,
    totalVotes: 24301,
    createdBy: null,
    trending: true,
    hot: true,
    timeAgo: '1h ago',
    expiresIn: '8 months',
  },
  {
    id: 's5',
    title: 'OpenAI will reach 500M weekly active users by end of 2026',
    description: 'ChatGPT has been growing at record pace since launch.',
    category: 'tech',
    region: 'usa',
    status: 'active',
    yesPercent: 71,
    noPercent: 29,
    totalVotes: 15678,
    createdBy: 'u1',
    creatorName: 'TechSignals',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechSignals',
    verified: true,
    timeAgo: '3h ago',
    expiresIn: '8 months',
  },
  {
    id: 's6',
    title: 'Will a European startup reach $100B valuation by 2027?',
    description: 'Europe is catching up in venture capital but no $100B company yet.',
    category: 'tech',
    region: 'europe',
    status: 'active',
    yesPercent: 45,
    noPercent: 55,
    totalVotes: 9823,
    createdBy: null,
    timeAgo: '5h ago',
    expiresIn: '1 year',
  },

  // ─── BUSINESS ───
  {
    id: 's7',
    title: 'Tesla will outsell Toyota globally within 5 years',
    description: 'EV market share is growing fast. Can Tesla beat the biggest car maker?',
    category: 'business',
    region: 'global',
    status: 'active',
    yesPercent: 28,
    noPercent: 72,
    totalVotes: 21456,
    createdBy: null,
    trending: true,
    timeAgo: '2h ago',
    expiresIn: '5 years',
  },
  {
    id: 's8',
    title: 'Jumia va-t-elle devenir rentable cette annee ?',
    description: 'Le e-commerce africain est en pleine expansion mais les marges restent faibles.',
    category: 'business',
    region: 'africa',
    status: 'active',
    yesPercent: 39,
    noPercent: 61,
    totalVotes: 6789,
    createdBy: null,
    timeAgo: '8h ago',
    expiresIn: '8 months',
  },
  {
    id: 's9',
    title: 'LVMH restera la plus grande capitalisation europeenne fin 2026',
    description: 'Le luxe francais domine. Mais Novo Nordisk et ASML progressent vite.',
    category: 'business',
    region: 'france',
    status: 'active',
    yesPercent: 56,
    noPercent: 44,
    totalVotes: 11234,
    createdBy: null,
    timeAgo: '3h ago',
    expiresIn: '8 months',
  },

  // ─── CRYPTO ───
  {
    id: 's10',
    title: 'Bitcoin will reach $200K before the end of 2026',
    description: 'Post-halving cycles have historically led to new ATHs.',
    category: 'crypto',
    region: 'global',
    status: 'active',
    yesPercent: 62,
    noPercent: 38,
    totalVotes: 34521,
    createdBy: null,
    trending: true,
    hot: true,
    timeAgo: '30m ago',
    expiresIn: '8 months',
  },
  {
    id: 's11',
    title: 'Ethereum will flip Bitcoin in market cap by 2028',
    description: 'The flippening has been predicted many times. Will it finally happen?',
    category: 'crypto',
    region: 'global',
    status: 'active',
    yesPercent: 22,
    noPercent: 78,
    totalVotes: 19876,
    createdBy: 'u2',
    creatorName: 'CryptoGuru456',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoGuru',
    verified: true,
    timeAgo: '5h ago',
    expiresIn: '2 years',
  },

  // ─── SPORTS ───
  {
    id: 's12',
    title: 'Will PSG win the Champions League this season?',
    description: 'After years of near-misses, can Paris finally lift the trophy?',
    category: 'sports',
    region: 'france',
    status: 'active',
    yesPercent: 35,
    noPercent: 65,
    totalVotes: 28934,
    createdBy: null,
    trending: true,
    hot: true,
    timeAgo: '1h ago',
    expiresIn: '2 months',
  },
  {
    id: 's13',
    title: 'An African team will reach the World Cup semi-finals in 2026',
    description: 'Morocco made it to the semis in 2022. Can Africa go further?',
    category: 'sports',
    region: 'africa',
    status: 'active',
    yesPercent: 58,
    noPercent: 42,
    totalVotes: 16234,
    createdBy: null,
    trending: true,
    timeAgo: '4h ago',
    expiresIn: '3 months',
  },
  {
    id: 's14',
    title: 'LeBron James will retire before the 2026-27 NBA season',
    description: 'The King is 41. How much longer can he play at the highest level?',
    category: 'sports',
    region: 'usa',
    status: 'active',
    yesPercent: 48,
    noPercent: 52,
    totalVotes: 22567,
    createdBy: null,
    timeAgo: '6h ago',
    expiresIn: '6 months',
  },

  // ─── CULTURE ───
  {
    id: 's15',
    title: 'The next Miyazaki film will gross over $500M worldwide',
    description: 'The Boy and the Heron was a massive hit. Will the next one top it?',
    category: 'culture',
    region: 'global',
    status: 'active',
    yesPercent: 67,
    noPercent: 33,
    totalVotes: 13456,
    createdBy: null,
    timeAgo: '7h ago',
    expiresIn: '2 years',
  },
  {
    id: 's16',
    title: 'Afrobeats will become the #1 global music genre by 2028',
    description: 'Burna Boy, Wizkid, Tems — African music is taking over the world.',
    category: 'culture',
    region: 'africa',
    status: 'active',
    yesPercent: 54,
    noPercent: 46,
    totalVotes: 11234,
    createdBy: 'u3',
    creatorName: 'MusicVibes',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MusicVibes',
    timeAgo: '3h ago',
    expiresIn: '2 years',
  },

  // ─── ENTERTAINMENT ───
  {
    id: 's17',
    title: 'GTA 6 will break all first-week sales records',
    description: 'The most anticipated game ever. Over 200M views on the first trailer.',
    category: 'entertainment',
    region: 'global',
    status: 'active',
    yesPercent: 89,
    noPercent: 11,
    totalVotes: 45678,
    createdBy: null,
    trending: true,
    hot: true,
    timeAgo: '45m ago',
    expiresIn: '6 months',
  },
  {
    id: 's18',
    title: 'The next Marvel movie will gross less than $500M',
    description: 'Superhero fatigue is real. Or is it?',
    category: 'entertainment',
    region: 'usa',
    status: 'active',
    yesPercent: 55,
    noPercent: 45,
    totalVotes: 18923,
    createdBy: null,
    timeAgo: '5h ago',
    expiresIn: '4 months',
  },

  // ─── SOCIETY ───
  {
    id: 's19',
    title: 'Remote work will become the global standard by 2030',
    description: 'More companies are going fully remote. Is the office era ending?',
    category: 'society',
    region: 'global',
    status: 'active',
    yesPercent: 61,
    noPercent: 39,
    totalVotes: 14567,
    createdBy: null,
    trending: true,
    timeAgo: '2h ago',
    expiresIn: '4 years',
  },
  {
    id: 's20',
    title: 'La semaine de 4 jours sera adoptee par 50% des entreprises francaises avant 2028',
    description: 'Plusieurs pays testent deja. La France suivra-t-elle ?',
    category: 'society',
    region: 'france',
    status: 'active',
    yesPercent: 44,
    noPercent: 56,
    totalVotes: 9876,
    createdBy: null,
    timeAgo: '4h ago',
    expiresIn: '2 years',
  },

  // ─── TRENDS ───
  {
    id: 's21',
    title: 'TikTok will still be available in the US by end of 2026',
    description: 'Ban threats keep coming. Will TikTok survive in America?',
    category: 'trends',
    region: 'usa',
    status: 'active',
    yesPercent: 72,
    noPercent: 28,
    totalVotes: 31234,
    createdBy: null,
    trending: true,
    timeAgo: '1h ago',
    expiresIn: '8 months',
  },
  {
    id: 's22',
    title: 'AI-generated content will represent 50% of internet content by 2028',
    description: 'AI is creating text, images, video at scale. The internet is changing.',
    category: 'trends',
    region: 'global',
    status: 'active',
    yesPercent: 68,
    noPercent: 32,
    totalVotes: 22345,
    createdBy: 'u4',
    creatorName: 'FutureThinker',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FutureThinker',
    verified: true,
    timeAgo: '6h ago',
    expiresIn: '2 years',
  },

  // ─── FUN ───
  {
    id: 's23',
    title: 'A hot dog is a sandwich',
    description: 'The eternal debate. Where do you stand?',
    category: 'fun',
    region: 'global',
    status: 'active',
    yesPercent: 34,
    noPercent: 66,
    totalVotes: 42567,
    createdBy: 'u5',
    creatorName: 'FoodDebates',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FoodDebates',
    timeAgo: '12h ago',
  },
  {
    id: 's24',
    title: 'Pineapple belongs on pizza',
    description: 'This is the hill many choose to die on.',
    category: 'fun',
    region: 'global',
    status: 'active',
    yesPercent: 47,
    noPercent: 53,
    totalVotes: 56789,
    createdBy: null,
    hot: true,
    timeAgo: '1d ago',
  },

  // ─── USER CREATED ───
  {
    id: 's25',
    title: 'Will Senegal qualify for the 2026 World Cup?',
    description: 'After a strong AFCON showing, Senegal looks strong.',
    category: 'sports',
    region: 'africa',
    status: 'active',
    yesPercent: 76,
    noPercent: 24,
    totalVotes: 7823,
    createdBy: 'u6',
    creatorName: 'DakarFan',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DakarFan',
    timeAgo: '8h ago',
    expiresIn: '3 months',
  },
  {
    id: 's26',
    title: 'Mistral AI deviendra le leader europeen de l\'IA avant 2027',
    description: 'La startup francaise leve des milliards. Peut-elle rivaliser avec OpenAI ?',
    category: 'tech',
    region: 'france',
    status: 'active',
    yesPercent: 51,
    noPercent: 49,
    totalVotes: 8456,
    createdBy: 'u7',
    creatorName: 'ParisVC',
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ParisVC',
    verified: true,
    trending: true,
    timeAgo: '2h ago',
    expiresIn: '1 year',
  },
  {
    id: 's27',
    title: 'The EU will ban single-use plastics completely by 2030',
    description: 'Environmental regulations are tightening across Europe.',
    category: 'society',
    region: 'europe',
    status: 'active',
    yesPercent: 55,
    noPercent: 45,
    totalVotes: 11234,
    createdBy: null,
    timeAgo: '7h ago',
    expiresIn: '4 years',
  },
  {
    id: 's28',
    title: 'Nigeria will become Africa\'s first $1 trillion economy by 2030',
    description: 'The largest economy in Africa is growing fast despite challenges.',
    category: 'business',
    region: 'africa',
    status: 'active',
    yesPercent: 43,
    noPercent: 57,
    totalVotes: 9567,
    createdBy: null,
    trending: true,
    timeAgo: '3h ago',
    expiresIn: '4 years',
  },

  // ─── RESOLVED SIGNALS ───
  {
    id: 's29',
    title: 'Taylor Swift\'s Eras Tour will gross over $2 billion',
    description: 'The biggest tour in history. Did it cross the $2B mark?',
    category: 'entertainment',
    region: 'usa',
    status: 'resolved',
    yesPercent: 80,
    noPercent: 20,
    totalVotes: 67890,
    createdBy: null,
    resolvedResult: true,
    timeAgo: '1d ago',
  },
  {
    id: 's30',
    title: 'Morocco hosted the best CAN ever according to fan polls',
    description: 'After a legendary 2022 World Cup run, Morocco hosted the AFCON.',
    category: 'sports',
    region: 'africa',
    status: 'resolved',
    yesPercent: 72,
    noPercent: 28,
    totalVotes: 34567,
    createdBy: null,
    resolvedResult: true,
    timeAgo: '3d ago',
  },
  {
    id: 's31',
    title: 'France will win Euro 2024',
    description: 'Les Bleus were heavy favorites going into the tournament.',
    category: 'sports',
    region: 'france',
    status: 'resolved',
    yesPercent: 65,
    noPercent: 35,
    totalVotes: 45678,
    createdBy: null,
    resolvedResult: false,
    timeAgo: '5d ago',
  },
  {
    id: 's32',
    title: 'The iPhone 16 was the best-selling phone of Q4 2025',
    description: 'Apple versus Samsung, the eternal battle.',
    category: 'tech',
    region: 'global',
    status: 'resolved',
    yesPercent: 74,
    noPercent: 26,
    totalVotes: 23456,
    createdBy: null,
    resolvedResult: true,
    timeAgo: '1w ago',
  },
]

// Helper: get signals by filter
export function getSignals(opts?: {
  category?: SignalCategory
  region?: SignalRegion
  status?: SignalStatus
  trending?: boolean
  hot?: boolean
  limit?: number
}): Signal[] {
  let result = [...mockSignals]
  if (opts?.category) result = result.filter((s) => s.category === opts.category)
  if (opts?.region) result = result.filter((s) => s.region === opts.region)
  if (opts?.status) result = result.filter((s) => s.status === opts.status)
  if (opts?.trending) result = result.filter((s) => s.trending)
  if (opts?.hot) result = result.filter((s) => s.hot)
  if (opts?.limit) result = result.slice(0, opts.limit)
  return result
}

// Helper: get trending signals
export function getTrendingSignals(limit = 10): Signal[] {
  return mockSignals
    .filter((s) => s.status === 'active' && (s.trending || s.hot))
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, limit)
}

// Helper: get popular signals
export function getPopularSignals(limit = 10): Signal[] {
  return mockSignals
    .filter((s) => s.status === 'active')
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, limit)
}

// Helper: get resolved signals
export function getResolvedSignals(limit = 5): Signal[] {
  return mockSignals
    .filter((s) => s.status === 'resolved')
    .slice(0, limit)
}

// Category colors for UI
export const CATEGORY_COLORS: Record<SignalCategory, { bg: string; text: string }> = {
  news: { bg: 'rgba(234,234,240,0.10)', text: '#eaeaf0' },
  tech: { bg: 'rgba(96,168,240,0.12)', text: '#60a8f0' },
  business: { bg: 'rgba(240,192,80,0.12)', text: '#f0c050' },
  crypto: { bg: 'rgba(23,213,207,0.12)', text: '#17D5CF' },
  sports: { bg: 'rgba(251,146,60,0.12)', text: '#fb923c' },
  culture: { bg: 'rgba(244,114,182,0.12)', text: '#f472b6' },
  society: { bg: 'rgba(157,146,248,0.12)', text: '#9d92f8' },
  entertainment: { bg: 'rgba(34,211,238,0.12)', text: '#22d3ee' },
  trends: { bg: 'rgba(90,75,255,0.12)', text: '#5A4BFF' },
  fun: { bg: 'rgba(23,213,207,0.12)', text: '#17D5CF' },
}

// Reputation tiers
export interface ReputationTier {
  name: string
  nameFr: string
  minScore: number
  color: string
}

export const REPUTATION_TIERS: ReputationTier[] = [
  { name: 'Newcomer', nameFr: 'Debutant', minScore: 0, color: '#5c5c78' },
  { name: 'Observer', nameFr: 'Observateur', minScore: 100, color: '#a0a0b8' },
  { name: 'Analyst', nameFr: 'Analyste', minScore: 500, color: '#60a8f0' },
  { name: 'Expert', nameFr: 'Expert', minScore: 1500, color: '#17D5CF' },
  { name: 'Visionary', nameFr: 'Visionnaire', minScore: 5000, color: '#f0c050' },
  { name: 'Oracle', nameFr: 'Oracle', minScore: 15000, color: '#5A4BFF' },
]

export function getReputationTier(score: number): ReputationTier {
  for (let i = REPUTATION_TIERS.length - 1; i >= 0; i--) {
    if (score >= REPUTATION_TIERS[i].minScore) return REPUTATION_TIERS[i]
  }
  return REPUTATION_TIERS[0]
}
