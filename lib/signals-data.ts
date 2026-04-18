// ZAWIOS Signal Data Engine — World View Module
// 100 signals across categories and regions

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
  | 'worldview'
  | 'work'
  | 'education'
  | 'health'
  | 'housing'
  | 'climate'
  | 'relationships'
  | 'youth'
  | 'spirituality'
  | 'finance'
  | 'geopolitics'

export type SignalRegion = 'global' | 'africa' | 'france' | 'europe' | 'usa' | 'rdc' | 'belgique'

export type SignalStatus = 'active' | 'resolved'

export interface RegionalBreakdown {
  global: number
  africa: number
  france: number
  europe: number
  usa: number
}

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
  createdBy: string | null
  creatorName?: string
  creatorAvatar?: string
  verified?: boolean
  trending?: boolean
  hot?: boolean
  resolvedResult?: boolean
  timeAgo: string
  expiresIn?: string
  regionalBreakdown?: RegionalBreakdown
  /* Structured Signal Fields */
  horizon?: 'court' | 'moyen' | 'long' // 1-3 ans / 5-10 ans / 15-30 ans
  impactLevel?: 'faible' | 'structurel' | 'civilisationnel'
  divergenceIndex?: number // 0-100
  conviction?: 'faible' | 'moyenne' | 'forte' | null
  officialDoubt?: 'fragile' | 'insufficient_data' | null
  allowTooEarly?: boolean // Enable "Trop tôt pour conclure" option
  coverImage?: string // Path to cover illustration for detail view
}

export const SIGNAL_CATEGORIES: { id: SignalCategory; label: string; labelFr: string }[] = [
  { id: 'worldview', label: 'World View', labelFr: 'Vision Monde' },
  { id: 'news', label: 'News', labelFr: 'Actualite' },
  { id: 'tech', label: 'Tech & AI', labelFr: 'Tech & IA' },
  { id: 'business', label: 'Business', labelFr: 'Business' },
  { id: 'crypto', label: 'Crypto', labelFr: 'Crypto' },
  { id: 'sports', label: 'Sports', labelFr: 'Sport' },
  { id: 'culture', label: 'Culture', labelFr: 'Culture' },
  { id: 'society', label: 'Society', labelFr: 'Societe' },
  { id: 'entertainment', label: 'Entertainment', labelFr: 'Divertissement' },
  { id: 'trends', label: 'Trends', labelFr: 'Tendances' },
  { id: 'fun', label: 'Fun', labelFr: 'Fun' },
  { id: 'work', label: 'Work & Employment', labelFr: 'Travail & Emploi' },
  { id: 'education', label: 'Education', labelFr: 'Éducation' },
  { id: 'health', label: 'Health', labelFr: 'Santé' },
  { id: 'housing', label: 'Housing', labelFr: 'Logement' },
  { id: 'climate', label: 'Climate', labelFr: 'Climat' },
  { id: 'relationships', label: 'Relationships', labelFr: 'Relations' },
  { id: 'youth', label: 'Youth', labelFr: 'Jeunesse' },
  { id: 'spirituality', label: 'Spirituality & Values', labelFr: 'Spiritualité' },
  { id: 'finance', label: 'Personal Finance', labelFr: 'Finances perso' },
  { id: 'geopolitics', label: 'Geopolitics', labelFr: 'Géopolitique' },
]

export const SIGNAL_REGIONS: { id: SignalRegion; label: string; labelFr: string }[] = [
  { id: 'global', label: 'Monde', labelFr: 'Monde' },
  { id: 'africa', label: 'Afrique', labelFr: 'Afrique' },
  { id: 'rdc', label: 'RD Congo', labelFr: 'RD Congo' },
  { id: 'france', label: 'France', labelFr: 'France' },
  { id: 'belgique', label: 'Belgique', labelFr: 'Belgique' },
  { id: 'europe', label: 'Europe', labelFr: 'Europe' },
  { id: 'usa', label: 'USA', labelFr: 'USA' },
]

export const FEED_TABS = [
  { id: 'trending', label: 'Trending', labelFr: 'Tendances' },
  { id: 'latest', label: 'Latest', labelFr: 'Recents' },
  { id: 'following', label: 'Following', labelFr: 'Abonnements' },
  { id: 'popular', label: 'Popular', labelFr: 'Populaires' },
  { id: 'worldview', label: 'World View', labelFr: 'Vision Monde' },
]

export const mockSignals: Signal[] = [
  // ─── WORLD VIEW ───
  {
    id: 'wv1',
    title: "L'IA va-t-elle remplacer plus de 30% des emplois d'ici 2030 ?",
    description: "L'automatisation s'accelere. Les travailleurs du monde entier craignent l'impact.",
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 61, noPercent: 39, totalVotes: 52340,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 61, africa: 48, france: 67, europe: 65, usa: 58 },
    horizon: 'court',
    impactLevel: 'faible',
    divergenceIndex: 78,
    allowTooEarly: true,
  },
  {
    id: 'wv2',
    title: 'Le rechauffement climatique est-il la principale menace pour l\'humanite ?',
    description: 'Les catastrophes naturelles se multiplient. Les opinions divergent selon les regions.',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 74, noPercent: 26, totalVotes: 67891,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '3 years',
    regionalBreakdown: { global: 74, africa: 81, france: 78, europe: 76, usa: 54 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 52,
    allowTooEarly: true,
  },
  {
    id: 'wv3',
    title: 'La democratie est-elle en recul dans le monde ?',
    description: 'Des etudes montrent une erosion des institutions democratiques sur tous les continents.',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 68, noPercent: 32, totalVotes: 43210,
    createdBy: null, trending: true, timeAgo: '3h ago', expiresIn: '1 year',
    regionalBreakdown: { global: 68, africa: 72, france: 61, europe: 64, usa: 71 },
    horizon: 'court',
    impactLevel: 'faible',
    divergenceIndex: 63,
    allowTooEarly: true,
  },
  {
    id: 'wv4',
    title: 'Les reseaux sociaux font-ils plus de mal que de bien ?',
    description: 'Desinformation, sante mentale, polarisation. Le debat est mondial.',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 58, noPercent: 42, totalVotes: 89432,
    createdBy: null, hot: true, timeAgo: '30m ago', expiresIn: '6 months',
    regionalBreakdown: { global: 58, africa: 44, france: 63, europe: 61, usa: 57 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 84,
    allowTooEarly: true,
  },
  {
    id: 'wv5',
    title: "L'Occident perd-il son influence mondiale ?",
    description: "La montee de la Chine, de l'Inde et de l'Afrique remodele l'ordre geopolitique.",
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 55, noPercent: 45, totalVotes: 38762,
    createdBy: null, trending: true, timeAgo: '4h ago', expiresIn: '2 years',
    regionalBreakdown: { global: 55, africa: 71, france: 48, europe: 51, usa: 38 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 89,
    allowTooEarly: true,
  },
  {
    id: 'wv6',
    title: 'Le travail a distance sera-t-il la norme mondiale en 2030 ?',
    description: 'Post-COVID, les entreprises mondiales adoptent de nouveaux modeles de travail.',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 52, noPercent: 48, totalVotes: 31456,
    createdBy: null, timeAgo: '5h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 52, africa: 34, france: 58, europe: 56, usa: 63 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 96,
    allowTooEarly: true,
  },
  {
    id: 'wv7',
    title: "L'energie nucleaire est-elle indispensable a la transition ecologique ?",
    description: 'France pro-nucleaire, Allemagne anti. Qui a raison pour la planete ?',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 49, noPercent: 51, totalVotes: 27890,
    createdBy: null, timeAgo: '6h ago', expiresIn: '5 years',
    regionalBreakdown: { global: 49, africa: 41, france: 72, europe: 53, usa: 46 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 98,
    allowTooEarly: true,
  },
  {
    id: 'wv8',
    title: 'Les inegalites mondiales vont-elles augmenter dans les 10 prochaines annees ?',
    description: 'Le fosse entre riches et pauvres se creuse. Les experts sont divises.',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 77, noPercent: 23, totalVotes: 44123,
    createdBy: null, trending: true, timeAgo: '7h ago', expiresIn: '10 years',
    regionalBreakdown: { global: 77, africa: 84, france: 73, europe: 75, usa: 68 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 46,
    allowTooEarly: true,
  },
  {
    id: 'wv9',
    title: 'La Chine depassera-t-elle les USA comme 1ere puissance mondiale avant 2035 ?',
    description: 'Economie, technologie, militaire. La competition est deja lancee.',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 44, noPercent: 56, totalVotes: 71234,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '9 years',
    regionalBreakdown: { global: 44, africa: 58, france: 41, europe: 39, usa: 28 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 88,
    allowTooEarly: true,
  },
  {
    id: 'wv10',
    title: "L'immigration est-elle une opportunite economique pour les pays d'accueil ?",
    description: "Un des sujets les plus clivants de notre epoque. Les donnees sont complexes.",
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 53, noPercent: 47, totalVotes: 58901,
    createdBy: null, hot: true, timeAgo: '2h ago', expiresIn: '3 years',
    regionalBreakdown: { global: 53, africa: 67, france: 42, europe: 49, usa: 55 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 94,
    allowTooEarly: true,
  },
  {
    id: 'wv11',
    title: 'La guerre en Ukraine va-t-elle durer plus de 5 ans au total ?',
    description: "Les negociations stagnent. L'Europe s'interroge sur la durabilite du conflit.",
    category: 'worldview', region: 'europe', status: 'active',
    yesPercent: 63, noPercent: 37, totalVotes: 39012,
    createdBy: null, trending: true, timeAgo: '3h ago', expiresIn: '3 years',
    regionalBreakdown: { global: 63, africa: 61, france: 66, europe: 68, usa: 57 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 74,
    allowTooEarly: true,
  },
  {
    id: 'wv12',
    title: "L'Afrique sera-t-elle la prochaine superpuissance economique mondiale ?",
    description: 'Population jeune, ressources naturelles, croissance rapide. Le siecle africain ?',
    category: 'worldview', region: 'africa', status: 'active',
    yesPercent: 59, noPercent: 41, totalVotes: 34567,
    createdBy: null, trending: true, timeAgo: '4h ago', expiresIn: '30 years',
    regionalBreakdown: { global: 59, africa: 82, france: 48, europe: 44, usa: 41 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 82,
    allowTooEarly: true,
  },
  {
    id: 'wv13',
    title: 'La monnaie numerique de banque centrale va-t-elle remplacer le cash ?',
    description: 'CBDC en test dans plus de 100 pays. La fin des billets est-elle proche ?',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 41, noPercent: 59, totalVotes: 22345,
    createdBy: null, timeAgo: '8h ago', expiresIn: '10 years',
    regionalBreakdown: { global: 41, africa: 52, france: 38, europe: 37, usa: 33 },
    horizon: 'long',
    impactLevel: 'structurel',
    divergenceIndex: 82,
    allowTooEarly: true,
  },
  {
    id: 'wv14',
    title: 'La mondialisation est-elle en train de se defaire ?',
    description: 'Reshoring, protectionnisme, tensions commerciales. Le monde se referme-t-il ?',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 46, noPercent: 54, totalVotes: 18902,
    createdBy: null, timeAgo: '6h ago', expiresIn: '5 years',
    regionalBreakdown: { global: 46, africa: 39, france: 51, europe: 49, usa: 44 },
    horizon: 'moyen',
    impactLevel: 'faible',
    divergenceIndex: 92,
    allowTooEarly: true,
  },
  {
    id: 'wv15',
    title: 'Les hommes politiques actuels sont-ils a la hauteur des defis du 21e siecle ?',
    description: 'Crise climatique, IA, inegalites. Les dirigeants ont-ils les bons outils ?',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 18, noPercent: 82, totalVotes: 76543,
    createdBy: null, hot: true, timeAgo: '1h ago', expiresIn: '5 years',
    regionalBreakdown: { global: 18, africa: 22, france: 14, europe: 17, usa: 19 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 36,
    allowTooEarly: true,
  },
  {
    id: 'wv16',
    title: "L'humanite trouvera-t-elle un vaccin contre le cancer avant 2035 ?",
    description: "ARNm, immunotherapie, IA medicale. La medecine avance a vitesse record.",
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 54, noPercent: 46, totalVotes: 41230,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '9 years',
    regionalBreakdown: { global: 54, africa: 49, france: 61, europe: 58, usa: 52 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 92,
    allowTooEarly: true,
  },
  {
    id: 'wv17',
    title: 'Le sport est-il le meilleur vecteur de paix entre les nations ?',
    description: 'JO, Coupe du Monde. Le sport peut-il vraiment rapprocher les peuples ?',
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 62, noPercent: 38, totalVotes: 29876,
    createdBy: null, timeAgo: '5h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 62, africa: 74, france: 68, europe: 65, usa: 51 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 76,
    allowTooEarly: true,
  },
  {
    id: 'wv18',
    title: "La langue anglaise dominera-t-elle encore le monde dans 50 ans ?",
    description: "Avec l'IA et le mandarin en hausse, l'anglais restera-t-il la lingua franca ?",
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 69, noPercent: 31, totalVotes: 25678,
    createdBy: null, timeAgo: '9h ago', expiresIn: '50 years',
    regionalBreakdown: { global: 69, africa: 58, france: 52, europe: 66, usa: 84 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 62,
    allowTooEarly: true,
  },
  {
    id: 'wv19',
    title: 'Les cryptomonnaies remplaceront-elles les devises nationales avant 2040 ?',
    description: "Bitcoin, stablecoins, CBDC. L'avenir de la monnaie est incertain.",
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 22, noPercent: 78, totalVotes: 54321,
    createdBy: null, timeAgo: '4h ago', expiresIn: '14 years',
    regionalBreakdown: { global: 22, africa: 34, france: 18, europe: 19, usa: 21 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 43,
    allowTooEarly: true,
  },
  {
    id: 'wv20',
    title: "L'humanite est-elle capable de cooperer face a une extinction menace ?",
    description: "Pandemies, asteroides, IA desalignee. La cooperation mondiale est-elle possible ?",
    category: 'worldview', region: 'global', status: 'active',
    yesPercent: 38, noPercent: 62, totalVotes: 17654,
    createdBy: null, timeAgo: '10h ago', expiresIn: '10 years',
    regionalBreakdown: { global: 38, africa: 45, france: 36, europe: 37, usa: 34 },
    horizon: 'long',
    impactLevel: 'structurel',
    divergenceIndex: 76,
    allowTooEarly: true,
  },

  // ─── NEWS ───
  {
    id: 's1',
    title: 'Will the next G20 summit produce a joint climate agreement?',
    description: 'With rising tensions between major economies, can they unite on climate?',
    category: 'news', region: 'global', status: 'active',
    yesPercent: 42, noPercent: 58, totalVotes: 18567,
    createdBy: null, trending: true, hot: true, timeAgo: '2h ago', expiresIn: '3 days',
  },
  {
    id: 's2',
    title: 'La France va-t-elle atteindre le plein emploi avant 2028 ?',
    description: 'Le taux de chomage est au plus bas depuis 15 ans.',
    category: 'news', region: 'france', status: 'active',
    yesPercent: 31, noPercent: 69, totalVotes: 12943,
    createdBy: null, trending: true, timeAgo: '4h ago', expiresIn: '2 years',
  },
  {
    id: 's3',
    title: 'Will the African Continental Free Trade Area boost GDP by 10% by 2030?',
    description: 'AfCFTA is the largest free trade area in the world by member states.',
    category: 'news', region: 'africa', status: 'active',
    yesPercent: 64, noPercent: 36, totalVotes: 8234,
    createdBy: null, trending: true, timeAgo: '6h ago', expiresIn: '4 years',
  },

  // ─── TECH ───
  {
    id: 's4',
    title: 'Will Apple launch a foldable iPhone this year?',
    description: 'Rumors intensify. Samsung and Huawei already dominate the foldable market.',
    category: 'tech', region: 'global', status: 'active',
    yesPercent: 38, noPercent: 62, totalVotes: 24301,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '8 months',
  },
  {
    id: 's5',
    title: 'OpenAI will reach 500M weekly active users by end of 2026',
    description: 'ChatGPT has been growing at record pace since launch.',
    category: 'tech', region: 'usa', status: 'active',
    yesPercent: 71, noPercent: 29, totalVotes: 15678,
    createdBy: 'u2', creatorName: 'M. Chen', creatorAvatar: '/avatars/chen.svg',
    verified: true, timeAgo: '3h ago', expiresIn: '8 months',
  },
  {
    id: 's6',
    title: 'Will a European startup reach $100B valuation by 2027?',
    description: 'Europe is catching up in venture capital but no $100B company yet.',
    category: 'tech', region: 'europe', status: 'active',
    yesPercent: 45, noPercent: 55, totalVotes: 9823,
    createdBy: null, timeAgo: '5h ago', expiresIn: '1 year',
  },
  {
    id: 's7',
    title: 'Mistral AI deviendra le leader europeen de l\'IA avant 2027',
    description: 'La startup francaise leve des milliards. Peut-elle rivaliser avec OpenAI ?',
    category: 'tech', region: 'france', status: 'active',
    yesPercent: 51, noPercent: 49, totalVotes: 8456,
    createdBy: 'u8', creatorName: 'C. Dubois', creatorAvatar: '/avatars/dubois.svg',
    verified: true, trending: true, timeAgo: '2h ago', expiresIn: '1 year',
  },
  {
    id: 's8',
    title: 'Will quantum computing break current encryption standards by 2030?',
    description: 'Quantum supremacy is progressing fast. Are our systems at risk?',
    category: 'tech', region: 'global', status: 'active',
    yesPercent: 34, noPercent: 66, totalVotes: 19234,
    createdBy: 'u10', creatorName: 'T. Nguyen', creatorAvatar: '/avatars/nguyen.svg',
    verified: true, timeAgo: '4h ago', expiresIn: '4 years',
  },

  // ─── BUSINESS ───
  {
    id: 's9',
    title: 'Tesla will outsell Toyota globally within 5 years',
    description: 'EV market share is growing fast. Can Tesla beat the biggest car maker?',
    category: 'business', region: 'global', status: 'active',
    yesPercent: 28, noPercent: 72, totalVotes: 21456,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '5 years',
  },
  {
    id: 's10',
    title: 'Jumia va-t-elle devenir rentable cette annee ?',
    description: 'Le e-commerce africain est en pleine expansion mais les marges restent faibles.',
    category: 'business', region: 'africa', status: 'active',
    yesPercent: 39, noPercent: 61, totalVotes: 6789,
    createdBy: null, timeAgo: '8h ago', expiresIn: '8 months',
  },
  {
    id: 's11',
    title: 'LVMH restera la plus grande capitalisation europeenne fin 2026',
    description: 'Le luxe francais domine. Mais Novo Nordisk et ASML progressent vite.',
    category: 'business', region: 'france', status: 'active',
    yesPercent: 56, noPercent: 44, totalVotes: 11234,
    createdBy: null, timeAgo: '3h ago', expiresIn: '8 months',
  },
  {
    id: 's12',
    title: 'Nigeria will become Africa\'s first $1 trillion economy by 2030',
    description: 'The largest economy in Africa is growing fast despite challenges.',
    category: 'business', region: 'africa', status: 'active',
    yesPercent: 43, noPercent: 57, totalVotes: 9567,
    createdBy: null, trending: true, timeAgo: '3h ago', expiresIn: '4 years',
  },

  // ─── CRYPTO ───
  {
    id: 's13',
    title: 'Bitcoin will reach $200K before the end of 2026',
    description: 'Post-halving cycles have historically led to new ATHs.',
    category: 'crypto', region: 'global', status: 'active',
    yesPercent: 62, noPercent: 38, totalVotes: 34521,
    createdBy: null, trending: true, hot: true, timeAgo: '30m ago', expiresIn: '8 months',
  },
  {
    id: 's14',
    title: 'Ethereum will flip Bitcoin in market cap by 2028',
    description: 'The flippening has been predicted many times. Will it finally happen?',
    category: 'crypto', region: 'global', status: 'active',
    yesPercent: 22, noPercent: 78, totalVotes: 19876,
    createdBy: 'u4', creatorName: 'S. Gupta', creatorAvatar: '/avatars/gupta.svg',
    verified: true, timeAgo: '5h ago', expiresIn: '2 years',
  },
  {
    id: 's15',
    title: 'A African country will adopt Bitcoin as legal tender by 2027',
    description: 'Following El Salvador, Africa could be next. Which country?',
    category: 'crypto', region: 'africa', status: 'active',
    yesPercent: 47, noPercent: 53, totalVotes: 14321,
    createdBy: 'u11', creatorName: 'E. Diallo', creatorAvatar: '/avatars/diallo.svg',
    timeAgo: '6h ago', expiresIn: '1 year',
  },

  // ─── SPORTS ───
  {
    id: 's16',
    title: 'Will PSG win the Champions League this season?',
    description: 'After years of near-misses, can Paris finally lift the trophy?',
    category: 'sports', region: 'france', status: 'active',
    yesPercent: 35, noPercent: 65, totalVotes: 28934,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '2 months',
  },
  {
    id: 's17',
    title: 'An African team will reach the World Cup semi-finals in 2026',
    description: 'Morocco made it to the semis in 2022. Can Africa go further?',
    category: 'sports', region: 'africa', status: 'active',
    yesPercent: 58, noPercent: 42, totalVotes: 16234,
    createdBy: null, trending: true, timeAgo: '4h ago', expiresIn: '3 months',
  },
  {
    id: 's18',
    title: 'LeBron James will retire before the 2026-27 NBA season',
    description: 'The King is 41. How much longer can he play at the highest level?',
    category: 'sports', region: 'usa', status: 'active',
    yesPercent: 48, noPercent: 52, totalVotes: 22567,
    createdBy: null, timeAgo: '6h ago', expiresIn: '6 months',
  },
  {
    id: 's19',
    title: 'Will Senegal qualify for the 2026 World Cup?',
    description: 'After a strong AFCON showing, Senegal looks strong.',
    category: 'sports', region: 'africa', status: 'active',
    yesPercent: 76, noPercent: 24, totalVotes: 7823,
    createdBy: 'u11', creatorName: 'E. Diallo', creatorAvatar: '/avatars/diallo.svg',
    timeAgo: '8h ago', expiresIn: '3 months',
  },

  // ─── CULTURE ───
  {
    id: 's20',
    title: 'The next Miyazaki film will gross over $500M worldwide',
    description: 'The Boy and the Heron was a massive hit. Will the next one top it?',
    category: 'culture', region: 'global', status: 'active',
    yesPercent: 67, noPercent: 33, totalVotes: 13456,
    createdBy: null, timeAgo: '7h ago', expiresIn: '2 years',
  },
  {
    id: 's21',
    title: 'Afrobeats will become the #1 global music genre by 2028',
    description: 'Burna Boy, Wizkid, Tems — African music is taking over the world.',
    category: 'culture', region: 'africa', status: 'active',
    yesPercent: 54, noPercent: 46, totalVotes: 11234,
    createdBy: 'u5', creatorName: 'H. Al-Fassi', creatorAvatar: '/avatars/alfassi.svg',
    timeAgo: '3h ago', expiresIn: '2 years',
  },
  {
    id: 's22',
    title: 'K-pop will surpass Western pop in global streaming by 2027',
    description: 'BTS, BLACKPINK, NewJeans — the Korean wave shows no signs of stopping.',
    category: 'culture', region: 'global', status: 'active',
    yesPercent: 43, noPercent: 57, totalVotes: 17890,
    createdBy: 'u6', creatorName: 'L. Tanaka', creatorAvatar: '/avatars/tanaka.svg',
    timeAgo: '5h ago', expiresIn: '1 year',
  },

  // ─── ENTERTAINMENT ───
  {
    id: 's23',
    title: 'GTA 6 will break all first-week sales records',
    description: 'The most anticipated game ever. Over 200M views on the first trailer.',
    category: 'entertainment', region: 'global', status: 'active',
    yesPercent: 89, noPercent: 11, totalVotes: 45678,
    createdBy: null, trending: true, hot: true, timeAgo: '45m ago', expiresIn: '6 months',
  },
  {
    id: 's24',
    title: 'The next Marvel movie will gross less than $500M',
    description: 'Superhero fatigue is real. Or is it?',
    category: 'entertainment', region: 'usa', status: 'active',
    yesPercent: 55, noPercent: 45, totalVotes: 18923,
    createdBy: null, timeAgo: '5h ago', expiresIn: '4 months',
  },
  {
    id: 's25',
    title: 'Streaming will fully replace traditional TV by 2030',
    description: 'Linear TV audiences are collapsing. Is the end near?',
    category: 'entertainment', region: 'global', status: 'active',
    yesPercent: 72, noPercent: 28, totalVotes: 23456,
    createdBy: 'u12', creatorName: "K. O'Connell", creatorAvatar: '/avatars/oconnell.svg',
    timeAgo: '4h ago', expiresIn: '4 years',
  },

  // ─── SOCIETY ───
  {
    id: 's26',
    title: 'Remote work will become the global standard by 2030',
    description: 'More companies are going fully remote. Is the office era ending?',
    category: 'society', region: 'global', status: 'active',
    yesPercent: 61, noPercent: 39, totalVotes: 14567,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '4 years',
  },
  {
    id: 's27',
    title: 'La semaine de 4 jours sera adoptee par 50% des entreprises francaises avant 2028',
    description: 'Plusieurs pays testent deja. La France suivra-t-elle ?',
    category: 'society', region: 'france', status: 'active',
    yesPercent: 44, noPercent: 56, totalVotes: 9876,
    createdBy: null, timeAgo: '4h ago', expiresIn: '2 years',
  },
  {
    id: 's28',
    title: 'The EU will ban single-use plastics completely by 2030',
    description: 'Environmental regulations are tightening across Europe.',
    category: 'society', region: 'europe', status: 'active',
    yesPercent: 55, noPercent: 45, totalVotes: 11234,
    createdBy: null, timeAgo: '7h ago', expiresIn: '4 years',
  },
  {
    id: 's29',
    title: 'Universal Basic Income will be implemented in at least 3 major economies by 2030',
    description: 'Finland, Kenya, USA — UBI pilots are spreading. Is full adoption next?',
    category: 'society', region: 'global', status: 'active',
    yesPercent: 33, noPercent: 67, totalVotes: 16789,
    createdBy: 'u3', creatorName: 'J. Schmidt', creatorAvatar: '/avatars/schmidt.svg',
    verified: true, timeAgo: '6h ago', expiresIn: '4 years',
  },

  // ─── TRENDS ───
  {
    id: 's30',
    title: 'TikTok will still be available in the US by end of 2026',
    description: 'Ban threats keep coming. Will TikTok survive in America?',
    category: 'trends', region: 'usa', status: 'active',
    yesPercent: 72, noPercent: 28, totalVotes: 31234,
    createdBy: null, trending: true, timeAgo: '1h ago', expiresIn: '8 months',
  },
  {
    id: 's31',
    title: 'AI-generated content will represent 50% of internet content by 2028',
    description: 'AI is creating text, images, video at scale. The internet is changing.',
    category: 'trends', region: 'global', status: 'active',
    yesPercent: 68, noPercent: 32, totalVotes: 22345,
    createdBy: 'u1', creatorName: 'A. Adebayo', creatorAvatar: '/avatars/adebayo.svg',
    verified: true, timeAgo: '6h ago', expiresIn: '2 years',
  },
  {
    id: 's32',
    title: 'Virtual reality will replace physical travel for 10% of people by 2030',
    description: 'Meta Quest, Apple Vision Pro — immersive travel is becoming real.',
    category: 'trends', region: 'global', status: 'active',
    yesPercent: 21, noPercent: 79, totalVotes: 18456,
    createdBy: 'u7', creatorName: 'R. Rodriguez', creatorAvatar: '/avatars/rodriguez.svg',
    timeAgo: '8h ago', expiresIn: '4 years',
  },

  // ─── FUN ───
  {
    id: 's33',
    title: 'A hot dog is a sandwich',
    description: 'The eternal debate. Where do you stand?',
    category: 'fun', region: 'global', status: 'active',
    yesPercent: 34, noPercent: 66, totalVotes: 42567,
    createdBy: 'u9', creatorName: 'W. Running Bear', creatorAvatar: '/avatars/runningbear.svg',
    timeAgo: '12h ago',
  },
  {
    id: 's34',
    title: 'Pineapple belongs on pizza',
    description: 'This is the hill many choose to die on.',
    category: 'fun', region: 'global', status: 'active',
    yesPercent: 47, noPercent: 53, totalVotes: 56789,
    createdBy: null, hot: true, timeAgo: '1d ago',
  },
  {
    id: 's35',
    title: 'Cats are better pets than dogs',
    description: 'The oldest rivalry in domestic animal history.',
    category: 'fun', region: 'global', status: 'active',
    yesPercent: 44, noPercent: 56, totalVotes: 38901,
    createdBy: null, timeAgo: '2d ago',
  },

  // ─── SOCIÉTÉ & QUOTIDIEN — Signaux sociétaux pour tous les âges ───
  {
    id: 'sq1',
    title: "L'uniforme scolaire améliorera-t-il le climat dans les écoles françaises ?",
    description: "Égalité vestimentaire, sentiment d'appartenance ou atteinte à la liberté ? Un débat qui touche toutes les familles.",
    category: 'education', region: 'france', status: 'active',
    yesPercent: 54, noPercent: 46, totalVotes: 42180,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 52, africa: 68, france: 54, europe: 49, usa: 44 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 87,
    allowTooEarly: true,
    coverImage: '/assets/signals/uniforme-scolaire.svg',
  },
  {
    id: 'sq2',
    title: 'Faut-il verser 100 000 € d\'un coup plutôt que le RSA mensuel ?',
    description: 'Capital unique pour sortir de la précarité vs. filet de sécurité mensuel. Un choix de société majeur.',
    category: 'finance', region: 'france', status: 'active',
    yesPercent: 38, noPercent: 62, totalVotes: 67450,
    createdBy: null, trending: true, hot: true, timeAgo: '30m ago', expiresIn: '4 years',
    regionalBreakdown: { global: 35, africa: 42, france: 38, europe: 33, usa: 29 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 92,
    allowTooEarly: true,
    coverImage: '/assets/signals/rsa-capital.svg',
  },
  {
    id: 'sq3',
    title: "L'uniforme professionnel généralisé réduirait-il les inégalités en entreprise ?",
    description: 'Pression vestimentaire, marques de luxe au bureau. L\'uniforme pro, solution ou régression ?',
    category: 'work', region: 'france', status: 'active',
    yesPercent: 41, noPercent: 59, totalVotes: 18920,
    createdBy: null, timeAgo: '3h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 39, africa: 55, france: 41, europe: 38, usa: 32 },
    horizon: 'moyen',
    impactLevel: 'faible',
    divergenceIndex: 74,
    allowTooEarly: true,
    coverImage: '/assets/signals/uniforme-travail.svg',
  },
  {
    id: 'sq4',
    title: 'Le Service National Universel devrait-il être obligatoire à 18 ans ?',
    description: 'Cohésion, mixité, engagement citoyen. Mais à quel prix pour la liberté individuelle ?',
    category: 'society', region: 'france', status: 'active',
    yesPercent: 47, noPercent: 53, totalVotes: 35670,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 44, africa: 58, france: 47, europe: 42, usa: 36 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 94,
    allowTooEarly: true,
    coverImage: '/assets/signals/service-national.svg',
  },
  {
    id: 'sq5',
    title: 'La France devrait-elle revenir à la retraite à 60 ans ?',
    description: 'Espérance de vie, équilibre des caisses, dignité des seniors. Le débat qui divise toutes les générations.',
    category: 'work', region: 'france', status: 'active',
    yesPercent: 61, noPercent: 39, totalVotes: 89340,
    createdBy: null, trending: true, hot: true, timeAgo: '45m ago', expiresIn: '4 years',
    regionalBreakdown: { global: 55, africa: 48, france: 61, europe: 52, usa: 41 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 78,
    allowTooEarly: true,
    coverImage: '/assets/signals/retraite-60.svg',
  },
  {
    id: 'sq6',
    title: 'Les aides sociales devraient-elles être conditionnées à une activité ?',
    description: 'Valorisation par le travail ou stigmatisation des plus fragiles ? Un équilibre délicat.',
    category: 'society', region: 'france', status: 'active',
    yesPercent: 52, noPercent: 48, totalVotes: 41230,
    createdBy: null, trending: true, timeAgo: '4h ago', expiresIn: '3 years',
    regionalBreakdown: { global: 49, africa: 44, france: 52, europe: 47, usa: 58 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 96,
    allowTooEarly: true,
    coverImage: '/assets/signals/aides-conditionnelles.svg',
  },
  {
    id: 'sq7',
    title: 'Une prime de naissance de 10 000 € réduirait-elle les inégalités ?',
    description: 'Soutien aux familles, relance démographique. Mais à quel coût pour les finances publiques ?',
    category: 'finance', region: 'france', status: 'active',
    yesPercent: 57, noPercent: 43, totalVotes: 28760,
    createdBy: null, timeAgo: '5h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 51, africa: 62, france: 57, europe: 48, usa: 39 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 68,
    allowTooEarly: true,
    coverImage: '/assets/signals/prime-naissance.svg',
  },
  {
    id: 'sq8',
    title: 'La gratuité des transports en commun devrait-elle être généralisée ?',
    description: 'Écologie, mobilité, justice sociale. Des villes l\'ont fait. La France entière devrait-elle suivre ?',
    category: 'society', region: 'france', status: 'active',
    yesPercent: 63, noPercent: 37, totalVotes: 34520,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 56, africa: 71, france: 63, europe: 58, usa: 42 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 72,
    allowTooEarly: true,
    coverImage: '/assets/signals/transport-gratuit.svg',
  },
  {
    id: 'sq9',
    title: 'La semaine de 32 heures augmenterait-elle la productivité ?',
    description: 'Bien-être, concentration, partage du travail. Ou perte de compétitivité ? Le débat est lancé.',
    category: 'work', region: 'france', status: 'active',
    yesPercent: 49, noPercent: 51, totalVotes: 31890,
    createdBy: null, timeAgo: '6h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 46, africa: 38, france: 49, europe: 52, usa: 35 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 98,
    allowTooEarly: true,
    coverImage: '/assets/signals/semaine-32h.svg',
  },
  {
    id: 'sq10',
    title: 'Un capital de 20 000 € à 18 ans serait-il plus efficace que les bourses ?',
    description: 'Études, entreprise, logement : laisser choisir les jeunes plutôt que fléchir les aides.',
    category: 'youth', region: 'france', status: 'active',
    yesPercent: 44, noPercent: 56, totalVotes: 25670,
    createdBy: null, trending: true, timeAgo: '3h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 41, africa: 53, france: 44, europe: 39, usa: 37 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 82,
    allowTooEarly: true,
    coverImage: '/assets/signals/capital-jeune.svg',
  },
  {
    id: 'sq11',
    title: 'Fusionner toutes les aides logement en une seule serait-il plus juste ?',
    description: 'APL, ALS, ALF : un mille-feuille administratif. La simplification profiterait-elle à tous ?',
    category: 'housing', region: 'france', status: 'active',
    yesPercent: 66, noPercent: 34, totalVotes: 19450,
    createdBy: null, timeAgo: '7h ago', expiresIn: '3 years',
    regionalBreakdown: { global: 58, africa: 52, france: 66, europe: 61, usa: 48 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 56,
    allowTooEarly: true,
    coverImage: '/assets/signals/allocation-logement.svg',
  },
  {
    id: 'sq12',
    title: 'Un congé parental d\'un an pour chaque parent changerait-il la société ?',
    description: 'Égalité parentale, bien-être de l\'enfant, modèle nordique. La France est-elle prête ?',
    category: 'society', region: 'france', status: 'active',
    yesPercent: 58, noPercent: 42, totalVotes: 37890,
    createdBy: null, trending: true, timeAgo: '1h ago', expiresIn: '5 years',
    regionalBreakdown: { global: 54, africa: 46, france: 58, europe: 62, usa: 43 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 76,
    allowTooEarly: true,
    coverImage: '/assets/signals/conge-parental.svg',
  },

  // ─── RESOLVED ───
  {
    id: 'r1',
    title: "Taylor Swift's Eras Tour will gross over $2 billion",
    description: 'The biggest tour in history. Did it cross the $2B mark?',
    category: 'entertainment', region: 'usa', status: 'resolved',
    yesPercent: 80, noPercent: 20, totalVotes: 67890,
    createdBy: null, resolvedResult: true, timeAgo: '1d ago',
  },
  {
    id: 'r2',
    title: 'Morocco hosted the best CAN ever according to fan polls',
    description: 'After a legendary 2022 World Cup run, Morocco hosted the AFCON.',
    category: 'sports', region: 'africa', status: 'resolved',
    yesPercent: 72, noPercent: 28, totalVotes: 34567,
    createdBy: null, resolvedResult: true, timeAgo: '3d ago',
  },
  {
    id: 'r3',
    title: 'France will win Euro 2024',
    description: 'Les Bleus were heavy favorites going into the tournament.',
    category: 'sports', region: 'france', status: 'resolved',
    yesPercent: 65, noPercent: 35, totalVotes: 45678,
    createdBy: null, resolvedResult: false, timeAgo: '5d ago',
  },
  {
    id: 'r4',
    title: 'The iPhone 16 was the best-selling phone of Q4 2025',
    description: 'Apple versus Samsung, the eternal battle.',
    category: 'tech', region: 'global', status: 'resolved',
    yesPercent: 74, noPercent: 26, totalVotes: 23456,
    createdBy: null, resolvedResult: true, timeAgo: '1w ago',
  },
  {
    id: 'r5',
    title: 'OpenAI released GPT-5 before end of 2025',
    description: 'The AI race is accelerating. Did GPT-5 ship on time?',
    category: 'tech', region: 'global', status: 'resolved',
    yesPercent: 69, noPercent: 31, totalVotes: 54321,
    createdBy: null, resolvedResult: true, timeAgo: '2w ago',
  },
]

// ─── HELPERS ───────────────────────────────────────────────────────────────

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

export function getTrendingSignals(limit = 10): Signal[] {
  return mockSignals
    .filter((s) => s.status === 'active' && (s.trending || s.hot))
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, limit)
}

export function getPopularSignals(limit = 10): Signal[] {
  return mockSignals
    .filter((s) => s.status === 'active')
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, limit)
}

export function getResolvedSignals(limit = 5): Signal[] {
  return mockSignals
    .filter((s) => s.status === 'resolved')
    .slice(0, limit)
}

export function getWorldViewSignals(limit = 20): Signal[] {
  return mockSignals
    .filter((s) => s.category === 'worldview' && s.status === 'active')
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, limit)
}

// ─── CATEGORY COLORS ───────────────────────────────────────────────────────

export const CATEGORY_COLORS: Record<SignalCategory, { bg: string; text: string }> = {
  worldview:     { bg: 'rgba(23,213,207,0.12)',  text: '#17d5cf' },
  news:          { bg: 'rgba(234,234,240,0.10)', text: '#eaeaf0' },
  tech:          { bg: 'rgba(96,168,240,0.12)',  text: '#60a8f0' },
  business:      { bg: 'rgba(240,192,80,0.12)',  text: '#f0c050' },
  crypto:        { bg: 'rgba(23,213,207,0.12)',  text: '#17d5cf' },
  sports:        { bg: 'rgba(251,146,60,0.12)',  text: '#fb923c' },
  culture:       { bg: 'rgba(244,114,182,0.12)', text: '#f472b6' },
  society:       { bg: 'rgba(157,146,248,0.12)', text: '#9d92f8' },
  entertainment: { bg: 'rgba(34,211,238,0.12)',  text: '#22d3ee' },
  trends:        { bg: 'rgba(90,75,255,0.12)',   text: '#7a6fff' },
  fun:           { bg: 'rgba(240,192,80,0.12)',  text: '#f0c050' },
  work:          { bg: 'rgba(240,168,80,0.12)',  text: '#f0a850' },
  education:     { bg: 'rgba(100,180,240,0.12)', text: '#64b4f0' },
  health:        { bg: 'rgba(80,220,140,0.12)',  text: '#50dc8c' },
  housing:       { bg: 'rgba(200,160,120,0.12)', text: '#c8a078' },
  climate:       { bg: 'rgba(60,200,180,0.12)',  text: '#3cc8b4' },
  relationships: { bg: 'rgba(240,130,170,0.12)', text: '#f082aa' },
  youth:         { bg: 'rgba(180,140,255,0.12)', text: '#b48cff' },
  spirituality:  { bg: 'rgba(200,180,220,0.12)', text: '#c8b4dc' },
  finance:       { bg: 'rgba(80,200,120,0.12)',  text: '#50c878' },
  geopolitics:   { bg: 'rgba(240,120,100,0.12)', text: '#f07864' },
}

// ─── REPUTATION TIERS ──────────────────────────────────────────────────────

export interface ReputationTier {
  name: string
  nameFr: string
  minScore: number
  color: string
}

export const REPUTATION_TIERS: ReputationTier[] = [
  { name: 'Newcomer',  nameFr: 'Debutant',    minScore: 0,     color: '#4e5060' },
  { name: 'Observer',  nameFr: 'Observateur', minScore: 100,   color: '#8f919e' },
  { name: 'Analyst',   nameFr: 'Analyste',    minScore: 500,   color: '#60a8f0' },
  { name: 'Expert',    nameFr: 'Expert',      minScore: 1500,  color: '#17d5cf' },
  { name: 'Visionary', nameFr: 'Visionnaire', minScore: 5000,  color: '#f0c050' },
  { name: 'Oracle',    nameFr: 'Oracle',      minScore: 15000, color: '#5a4bff' },
]

export function getReputationTier(score: number): ReputationTier {
  for (let i = REPUTATION_TIERS.length - 1; i >= 0; i--) {
    if (score >= REPUTATION_TIERS[i].minScore) return REPUTATION_TIERS[i]
  }
  return REPUTATION_TIERS[0]
}

// ─── SIGNAUX RDC · BELGIQUE · FRANCE · AFRIQUE ─────────────────────────────
// Ajoutés discrètement — contenus géopolitiques ciblés
export const extendedSignals: Signal[] = [
  // ── RD CONGO ──
  {
    id: 'rdc1',
    title: "La RDC va-t-elle stabiliser l'est du pays avant 2027 ?",
    description: "Les conflits armés à l'est freinent le développement. La communauté internationale presse pour une résolution.",
    category: 'news', region: 'rdc', status: 'active',
    yesPercent: 29, noPercent: 71, totalVotes: 18432,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '1 year',
    regionalBreakdown: { global: 29, africa: 34, france: 27, europe: 25, usa: 22 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 84,
    allowTooEarly: true,
  },
  {
    id: 'rdc2',
    title: "Le cobalt congolais restera-t-il dominant dans la chaîne des batteries EV ?",
    description: "La RDC contrôle 70% des réserves mondiales de cobalt. Les alternatives technologiques menacent-elles cette position ?",
    category: 'business', region: 'rdc', status: 'active',
    yesPercent: 64, noPercent: 36, totalVotes: 24501,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '5 years',
    regionalBreakdown: { global: 64, africa: 71, france: 62, europe: 60, usa: 57 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 72,
    allowTooEarly: true,
  },
  {
    id: 'rdc3',
    title: "Kinshasa deviendra-t-elle un hub technologique africain majeur d'ici 2030 ?",
    description: "Avec 15 millions d'habitants, Kinshasa est la plus grande ville francophone du monde. La tech peut-elle y exploser ?",
    category: 'tech', region: 'rdc', status: 'active',
    yesPercent: 47, noPercent: 53, totalVotes: 11234,
    createdBy: 'u11', creatorName: 'E. Diallo', creatorAvatar: '/avatars/diallo.svg',
    trending: true, timeAgo: '3h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 47, africa: 62, france: 44, europe: 41, usa: 38 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 94,
    allowTooEarly: true,
  },
  {
    id: 'rdc4',
    title: "Les prochaines élections en RDC seront-elles reconnues par l'Union Africaine ?",
    description: "Les tensions post-électorales sont récurrentes. La légitimité institutionnelle est en jeu.",
    category: 'news', region: 'rdc', status: 'active',
    yesPercent: 38, noPercent: 62, totalVotes: 9876,
    createdBy: null, timeAgo: '5h ago', expiresIn: '2 years',
  },
  {
    id: 'rdc5',
    title: "La RDC deviendra-t-elle la première puissance économique d'Afrique centrale avant 2040 ?",
    description: "Ressources naturelles colossales, population jeune. Le potentiel est là — les institutions suivront-elles ?",
    category: 'business', region: 'rdc', status: 'active',
    yesPercent: 52, noPercent: 48, totalVotes: 14321,
    createdBy: 'u1', creatorName: 'A. Adebayo', creatorAvatar: '/avatars/adebayo.svg',
    trending: true, timeAgo: '4h ago', expiresIn: '14 years',
    regionalBreakdown: { global: 52, africa: 68, france: 49, europe: 45, usa: 41 },
    horizon: 'court',
    impactLevel: 'structurel',
    divergenceIndex: 76,
    allowTooEarly: true,
  },

  // ── BELGIQUE ──
  {
    id: 'bel1',
    title: "La Belgique restera-t-elle un État fédéral unifié après 2030 ?",
    description: "Les tensions entre Flandre et Wallonie s'intensifient. Le fédéralisme belge est-il viable à long terme ?",
    category: 'society', region: 'belgique', status: 'active',
    yesPercent: 44, noPercent: 56, totalVotes: 21345,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '5 years',
    regionalBreakdown: { global: 44, africa: 48, france: 41, europe: 39, usa: 46 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 88,
    allowTooEarly: true,
  },
  {
    id: 'bel2',
    title: "Bruxelles perdra-t-elle son statut de capitale de facto de l'UE ?",
    description: "Avec l'élargissement de l'UE et les critiques de gouvernance, Bruxelles reste-t-elle incontournable ?",
    category: 'news', region: 'belgique', status: 'active',
    yesPercent: 22, noPercent: 78, totalVotes: 17890,
    createdBy: null, timeAgo: '6h ago', expiresIn: '10 years',
    regionalBreakdown: { global: 22, africa: 28, france: 24, europe: 19, usa: 21 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 43,
    allowTooEarly: true,
  },
  {
    id: 'bel3',
    title: "La Wallonie rattrapera-t-elle économiquement la Flandre avant 2040 ?",
    description: "L'écart de PIB par habitant entre les deux régions persiste depuis 40 ans.",
    category: 'business', region: 'belgique', status: 'active',
    yesPercent: 27, noPercent: 73, totalVotes: 12456,
    createdBy: null, timeAgo: '8h ago', expiresIn: '14 years',
    regionalBreakdown: { global: 27, africa: 31, france: 29, europe: 25, usa: 26 },
    horizon: 'court',
    impactLevel: 'civilisationnel',
    divergenceIndex: 54,
    allowTooEarly: true,
  },

  // ── FRANCE ──
  {
    id: 'fr_extra1',
    title: "La France sera-t-elle en récession technique en 2026 ?",
    description: "Croissance atone, dette record, consommation en berne. Les signaux macro s'accumulent.",
    category: 'business', region: 'france', status: 'active',
    yesPercent: 46, noPercent: 54, totalVotes: 28901,
    createdBy: null, hot: true, timeAgo: '1h ago', expiresIn: '6 months',
    regionalBreakdown: { global: 46, africa: 41, france: 52, europe: 44, usa: 38 },
    horizon: 'court',
    impactLevel: 'civilisationnel',
    divergenceIndex: 92,
    allowTooEarly: true,
  },
  {
    id: 'fr_extra2',
    title: "Les syndicats vont-ils bloquer la réforme des retraites de 2027 ?",
    description: "La France fait face à un nouveau projet de réforme. L'histoire se répète-t-elle ?",
    category: 'society', region: 'france', status: 'active',
    yesPercent: 61, noPercent: 39, totalVotes: 34512,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '1 year',
    regionalBreakdown: { global: 61, africa: 55, france: 68, europe: 58, usa: 47 },
    horizon: 'court',
    impactLevel: 'civilisationnel',
    divergenceIndex: 78,
    allowTooEarly: true,
  },
  {
    id: 'fr_extra3',
    title: "Paris deviendra-t-elle la première ville de startups en Europe avant 2028 ?",
    description: "Station F, la French Tech... Paris défie Londres et Berlin sur la scène tech européenne.",
    category: 'tech', region: 'france', status: 'active',
    yesPercent: 53, noPercent: 47, totalVotes: 19234,
    createdBy: 'u8', creatorName: 'C. Dubois', creatorAvatar: '/avatars/dubois.svg',
    verified: true, trending: true, timeAgo: '3h ago', expiresIn: '2 years',
    regionalBreakdown: { global: 53, africa: 48, france: 71, europe: 56, usa: 44 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 94,
    allowTooEarly: true,
  },

  // ── AFRIQUE ──
  {
    id: 'af_extra1',
    title: "L'Afrique subsaharienne va-t-elle doubler son taux d'accès à internet d'ici 2030 ?",
    description: "Starlink, fibres sous-marines, téléphonie mobile. La connectivité africaine explose.",
    category: 'tech', region: 'africa', status: 'active',
    yesPercent: 72, noPercent: 28, totalVotes: 31245,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 72, africa: 81, france: 69, europe: 68, usa: 65 },
    horizon: 'long',
    impactLevel: 'structurel',
    divergenceIndex: 56,
    allowTooEarly: true,
  },
  {
    id: 'af_extra2',
    title: "La zone de libre-échange africaine (ZLECAf) sera-t-elle pleinement opérationnelle en 2027 ?",
    description: "Le plus grand espace de libre-échange du monde en nombre de pays. L'exécution suit-elle l'ambition ?",
    category: 'business', region: 'africa', status: 'active',
    yesPercent: 41, noPercent: 59, totalVotes: 16789,
    createdBy: null, trending: true, timeAgo: '4h ago', expiresIn: '1 year',
    regionalBreakdown: { global: 41, africa: 54, france: 38, europe: 37, usa: 33 },
    horizon: 'court',
    impactLevel: 'faible',
    divergenceIndex: 82,
    allowTooEarly: true,
  },
  {
    id: 'af_extra3',
    title: "Un pays africain va-t-il accueillir les Jeux Olympiques avant 2040 ?",
    description: "Dakar 2026 YOG, Le Cap candidat. L'Afrique s'affirme sur la scène sportive mondiale.",
    category: 'sports', region: 'africa', status: 'active',
    yesPercent: 58, noPercent: 42, totalVotes: 22341,
    createdBy: null, timeAgo: '5h ago', expiresIn: '14 years',
    regionalBreakdown: { global: 58, africa: 74, france: 55, europe: 52, usa: 48 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 84,
    allowTooEarly: true,
  },

  // ── EUROPE / MONDE ──
  {
    id: 'eu_extra1',
    title: "L'UE va-t-elle adopter une armée commune avant 2030 ?",
    description: "Face aux menaces géopolitiques, l'Europe cherche une autonomie stratégique. La souveraineté militaire est-elle proche ?",
    category: 'news', region: 'europe', status: 'active',
    yesPercent: 34, noPercent: 66, totalVotes: 38901,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 34, africa: 38, france: 42, europe: 36, usa: 27 },
    horizon: 'court',
    impactLevel: 'faible',
    divergenceIndex: 68,
    allowTooEarly: true,
  },
  {
    id: 'world_extra1',
    title: "Les BRICS dépasseront-ils le G7 en PIB nominal avant 2030 ?",
    description: "Inde, Chine, Brésil, Russie, Afrique du Sud + nouveaux membres. Le basculement du pouvoir économique mondial.",
    category: 'business', region: 'global', status: 'active',
    yesPercent: 48, noPercent: 52, totalVotes: 54321,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 48, africa: 61, france: 43, europe: 41, usa: 31 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 96,
    allowTooEarly: true,
  },
]

// Merge extended signals into main mockSignals export
// (called by getSignals, getTrendingSignals, etc.)
mockSignals.push(...extendedSignals)

// ─── LIFE CATEGORY SIGNALS ──────────────────────────────────────────────────
const lifeSignals: Signal[] = [
  {
    id: 'life_work1',
    title: "Le télétravail va-t-il devenir la norme en Afrique d'ici 2028 ?",
    description: "L'essor du numérique transforme le marché du travail africain. Freelancing et remote gagnent du terrain.",
    category: 'work', region: 'africa', status: 'active',
    yesPercent: 42, noPercent: 58, totalVotes: 14230,
    createdBy: null, trending: true, timeAgo: '3h ago', expiresIn: '2 years',
    regionalBreakdown: { global: 42, africa: 48, france: 62, europe: 58, usa: 71 },
    horizon: 'moyen',
    impactLevel: 'faible',
    divergenceIndex: 84,
    allowTooEarly: true,
  },
  {
    id: 'life_edu1',
    title: "L'IA va-t-elle remplacer les professeurs dans les universités avant 2035 ?",
    description: "Cours personnalisés par IA, tuteurs virtuels. Le modèle éducatif est en pleine mutation.",
    category: 'education', region: 'global', status: 'active',
    yesPercent: 28, noPercent: 72, totalVotes: 31450,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '9 years',
    regionalBreakdown: { global: 28, africa: 22, france: 31, europe: 33, usa: 35 },
    horizon: 'moyen',
    impactLevel: 'faible',
    divergenceIndex: 56,
    allowTooEarly: true,
  },
  {
    id: 'life_health1',
    title: "La couverture santé universelle sera-t-elle effective en RDC avant 2030 ?",
    description: "L'accès aux soins reste un défi majeur. Les partenariats internationaux accélèrent la réforme.",
    category: 'health', region: 'rdc', status: 'active',
    yesPercent: 21, noPercent: 79, totalVotes: 19870,
    createdBy: null, timeAgo: '5h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 21, africa: 18, france: 24, europe: 25, usa: 22 },
    horizon: 'moyen',
    impactLevel: 'structurel',
    divergenceIndex: 41,
    allowTooEarly: true,
  },
  {
    id: 'life_housing1',
    title: "Les prix de l'immobilier en France vont-ils baisser de 20% d'ici 2027 ?",
    description: "Taux d'intérêt élevés, demande en baisse. Le marché immobilier français vacille.",
    category: 'housing', region: 'france', status: 'active',
    yesPercent: 37, noPercent: 63, totalVotes: 28900,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '1 year',
    regionalBreakdown: { global: 37, africa: 34, france: 44, europe: 40, usa: 28 },
    horizon: 'court',
    impactLevel: 'civilisationnel',
    divergenceIndex: 74,
    allowTooEarly: true,
  },
  {
    id: 'life_climate1',
    title: "L'Accord de Paris limitera-t-il le réchauffement à 1.5°C ?",
    description: "Les émissions continuent d'augmenter. Les engagements sont-ils suffisants ?",
    category: 'climate', region: 'global', status: 'active',
    yesPercent: 18, noPercent: 82, totalVotes: 45670,
    createdBy: null, hot: true, timeAgo: '1h ago', expiresIn: '5 years',
    regionalBreakdown: { global: 18, africa: 14, france: 22, europe: 24, usa: 15 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 36,
    allowTooEarly: true,
  },
  {
    id: 'life_rel1',
    title: "Les apps de rencontre vont-elles dominer la formation des couples d'ici 2030 ?",
    description: "Tinder, Bumble, Hinge — les relations amoureuses sont-elles désormais algorithmiques ?",
    category: 'relationships', region: 'global', status: 'active',
    yesPercent: 64, noPercent: 36, totalVotes: 22100,
    createdBy: null, timeAgo: '4h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 64, africa: 45, france: 68, europe: 66, usa: 72 },
    horizon: 'long',
    impactLevel: 'faible',
    divergenceIndex: 72,
    allowTooEarly: true,
  },
  {
    id: 'life_youth1',
    title: "La génération Z va-t-elle transformer la politique africaine avant 2030 ?",
    description: "Jeunes connectés, activistes numériques. La révolution politique viendra-t-elle de la jeunesse ?",
    category: 'youth', region: 'africa', status: 'active',
    yesPercent: 71, noPercent: 29, totalVotes: 26340,
    createdBy: null, trending: true, timeAgo: '2h ago', expiresIn: '4 years',
    regionalBreakdown: { global: 71, africa: 82, france: 65, europe: 63, usa: 58 },
    horizon: 'long',
    impactLevel: 'civilisationnel',
    divergenceIndex: 58,
    allowTooEarly: true,
  },
  {
    id: 'life_spirit1',
    title: "La spiritualité individuelle remplacera-t-elle les religions organisées en Europe ?",
    description: "Baisse de la fréquentation des églises, montée de la méditation et du développement personnel.",
    category: 'spirituality', region: 'europe', status: 'active',
    yesPercent: 52, noPercent: 48, totalVotes: 18760,
    createdBy: null, timeAgo: '6h ago', expiresIn: '10 years',
    regionalBreakdown: { global: 52, africa: 28, france: 61, europe: 58, usa: 42 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 96,
    allowTooEarly: true,
  },
  {
    id: 'life_fin1',
    title: "Le mobile money va-t-il remplacer les banques traditionnelles en Afrique ?",
    description: "M-Pesa, Orange Money, Wave — la fintech africaine bouleverse le secteur bancaire.",
    category: 'finance', region: 'africa', status: 'active',
    yesPercent: 68, noPercent: 32, totalVotes: 33210,
    createdBy: null, trending: true, hot: true, timeAgo: '1h ago', expiresIn: '3 years',
    regionalBreakdown: { global: 68, africa: 81, france: 55, europe: 52, usa: 44 },
    horizon: 'court',
    impactLevel: 'structurel',
    divergenceIndex: 63,
    allowTooEarly: true,
  },
  {
    id: 'life_geo1',
    title: "La Chine dépassera-t-elle les USA en influence géopolitique mondiale avant 2035 ?",
    description: "Belt and Road, BRICS+, présence en Afrique. La redistribution du pouvoir mondial accélère.",
    category: 'geopolitics', region: 'global', status: 'active',
    yesPercent: 47, noPercent: 53, totalVotes: 51890,
    createdBy: null, trending: true, hot: true, timeAgo: '30min ago', expiresIn: '9 years',
    regionalBreakdown: { global: 47, africa: 56, france: 44, europe: 42, usa: 31 },
    horizon: 'moyen',
    impactLevel: 'civilisationnel',
    divergenceIndex: 94,
    allowTooEarly: true,
  },
]
mockSignals.push(...lifeSignals)
