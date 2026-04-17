/**
 * ZAWIOS Image Generator
 * Primary:  Pollinations.ai — free AI image generation, no API key required.
 *           Images are seeded by prediction ID → same prediction = same image every time.
 *           Pollinations caches generated images on their CDN.
 * Fallback: SignalVisual SVG (in <PredictionImage> component).
 *
 * When switching to Supabase Storage or another CDN, replace getPredictionImageUrl()
 * to return your stored URL from the database.
 */

/** Deterministic hash of a string → stable integer seed */
function hashId(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
  }
  return Math.abs(hash % 9_999_983) // prime-capped for even distribution
}

const CATEGORY_CONTEXTS: Record<string, string> = {
  technology:
    'artificial intelligence, machine learning, circuit board, server room, blue neon light, dark minimal tech aesthetic',
  finance:
    'stock market trading, financial charts, Wall Street, dark professional, data visualization, economic growth',
  politics:
    'global politics, diplomacy, government building, world map, flags, dramatic dark cinematic',
  science:
    'scientific research, laboratory, microscopy, DNA, space telescope, discovery, dark background',
  africa:
    'Africa landscape, vibrant culture, savanna, city life, people, warm golden sunlight, beautiful',
  education:
    'education, university campus, books, learning, knowledge, warm library light, students',
  lifestyle:
    'modern urban lifestyle, city people, contemporary design, architecture, community',
  future:
    'futuristic city, sci-fi, innovation, space colonization, advanced technology, dark neon aesthetic',
  sports:
    'sports competition, athletic performance, stadium, crowd, energy, dynamic motion blur',
  business:
    'modern corporate office, business meeting, global trade, dark professional, minimal',
  culture:
    'music festival, contemporary art, cinema, culture, vibrant colors, creative energy',
  world:
    'earth from orbit, world map, global connectivity, international, dramatic sky, geography',
  work:
    'modern remote work, home office, technology, productivity, minimal clean design, laptop',
}

const STOP_WORDS = new Set([
  'will', 'what', 'when', 'where', 'which', 'does', 'have', 'this', 'that',
  'with', 'from', 'they', 'than', 'been', 'would', 'could', 'should', 'shall',
  'more', 'most', 'such', 'into', 'over', 'after', 'before', 'while', 'about',
  'their', 'there', 'these', 'those', 'then', 'than', 'very', 'just', 'also',
  'year', 'dans', 'pour', 'avec', 'sera', 'sont', 'être', 'avoir', 'faire',
])

function extractKeywords(title: string, maxWords = 5): string {
  return title
    .replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w.toLowerCase()))
    .slice(0, maxWords)
    .join(' ')
}

export function getPredictionImageUrl(
  predictionId: string,
  title: string,
  category: string,
  width = 800,
  height = 450,
): string {
  const seed = hashId(predictionId)
  const keywords = extractKeywords(title)
  const context = CATEGORY_CONTEXTS[category] ?? 'professional photography, cinematic, dramatic dark background'
  const prompt = encodeURIComponent(
    `${keywords}, ${context}, editorial photography, cinematic lighting, photorealistic, dark moody, high quality, 4k`,
  )
  return `https://image.pollinations.ai/prompt/${prompt}?width=${width}&height=${height}&nologo=true&seed=${seed}&model=flux`
}

/** Larger variant for hero / question-of-the-day banners */
export function getHeroImageUrl(predictionId: string, title: string, category: string): string {
  return getPredictionImageUrl(predictionId, title, category, 1200, 630)
}
