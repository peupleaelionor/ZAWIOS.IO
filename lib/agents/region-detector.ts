/**
 * region-detector — client-side region detection agent
 *
 * Uses browser signals (locale, timezone, language) to estimate the user's
 * region without making any external API calls.
 *
 * Pure function — no side effects, no UI, no external requests.
 * All detection happens synchronously using browser-standard APIs.
 */

export type DetectedRegion =
  | 'africa-west'      // RDC, Sénégal, Côte d'Ivoire, Nigeria, Ghana, Cameroun
  | 'africa-east'      // Kenya, Ethiopia, Tanzania
  | 'africa-north'     // Morocco, Algeria, Tunisia, Egypt
  | 'france'           // Metropolitan France, DOM-TOM
  | 'europe-west'      // Belgium, Switzerland, Spain, Portugal, Italy
  | 'europe-east'      // Poland, Romania, Czech, Hungary
  | 'europe-north'     // UK, Germany, Netherlands, Scandinavia
  | 'north-america'    // USA, Canada
  | 'latin-america'    // Brazil, Mexico, Colombia, Argentina
  | 'middle-east'      // UAE, Saudi Arabia, Lebanon
  | 'south-asia'       // India, Pakistan, Bangladesh
  | 'east-asia'        // Japan, South Korea, China
  | 'southeast-asia'   // Vietnam, Philippines, Indonesia, Thailand
  | 'oceania'          // Australia, New Zealand
  | 'global'           // Fallback

export interface RegionDetectionResult {
  region:        DetectedRegion
  confidence:    'high' | 'medium' | 'low'
  locale:        string
  timezone:      string
  lang:          string
  continent:     'africa' | 'europe' | 'americas' | 'asia' | 'oceania' | 'unknown'
  uiLang:        'fr' | 'en'         // Recommended interface language
  countryGuess:  string | null        // ISO alpha-2 if inferred
}

// ─── Timezone → region mapping ────────────────────────────────────────────────
const TZ_MAP: Record<string, DetectedRegion> = {
  // Africa West
  'Africa/Abidjan':      'africa-west',
  'Africa/Accra':        'africa-west',
  'Africa/Lagos':        'africa-west',
  'Africa/Dakar':        'africa-west',
  'Africa/Douala':       'africa-west',
  'Africa/Kinshasa':     'africa-west',
  'Africa/Bangui':       'africa-west',
  'Africa/Brazzaville':  'africa-west',
  'Africa/Libreville':   'africa-west',
  'Africa/Bamako':       'africa-west',
  'Africa/Conakry':      'africa-west',
  'Africa/Lome':         'africa-west',
  'Africa/Ouagadougou':  'africa-west',
  'Africa/Niamey':       'africa-west',
  'Africa/Malabo':       'africa-west',

  // Africa East
  'Africa/Nairobi':      'africa-east',
  'Africa/Addis_Ababa':  'africa-east',
  'Africa/Dar_es_Salaam':'africa-east',
  'Africa/Kampala':      'africa-east',
  'Africa/Khartoum':     'africa-east',
  'Africa/Mogadishu':    'africa-east',
  'Africa/Djibouti':     'africa-east',

  // Africa North
  'Africa/Casablanca':   'africa-north',
  'Africa/Algiers':      'africa-north',
  'Africa/Tunis':        'africa-north',
  'Africa/Cairo':        'africa-north',
  'Africa/Tripoli':      'africa-north',

  // France
  'Europe/Paris':        'france',

  // Europe West
  'Europe/Brussels':     'europe-west',
  'Europe/Zurich':       'europe-west',
  'Europe/Madrid':       'europe-west',
  'Europe/Lisbon':       'europe-west',
  'Europe/Rome':         'europe-west',
  'Europe/Amsterdam':    'europe-north',
  'Atlantic/Canary':     'europe-west',
  'Europe/Luxembourg':   'europe-west',
  'Europe/Monaco':       'france',

  // Europe North
  'Europe/London':       'europe-north',
  'Europe/Berlin':       'europe-north',
  'Europe/Copenhagen':   'europe-north',
  'Europe/Stockholm':    'europe-north',
  'Europe/Oslo':         'europe-north',
  'Europe/Helsinki':     'europe-north',

  // Europe East
  'Europe/Warsaw':       'europe-east',
  'Europe/Bucharest':    'europe-east',
  'Europe/Prague':       'europe-east',
  'Europe/Budapest':     'europe-east',
  'Europe/Kiev':         'europe-east',
  'Europe/Moscow':       'europe-east',

  // North America
  'America/New_York':    'north-america',
  'America/Chicago':     'north-america',
  'America/Denver':      'north-america',
  'America/Los_Angeles': 'north-america',
  'America/Toronto':     'north-america',
  'America/Vancouver':   'north-america',
  'America/Montreal':    'north-america',

  // Latin America
  'America/Sao_Paulo':   'latin-america',
  'America/Mexico_City': 'latin-america',
  'America/Bogota':      'latin-america',
  'America/Buenos_Aires':'latin-america',
  'America/Lima':        'latin-america',
  'America/Santiago':    'latin-america',
  'America/Caracas':     'latin-america',

  // Middle East
  'Asia/Dubai':          'middle-east',
  'Asia/Riyadh':         'middle-east',
  'Asia/Beirut':         'middle-east',
  'Asia/Jerusalem':      'middle-east',
  'Asia/Baghdad':        'middle-east',
  'Asia/Tehran':         'middle-east',

  // South Asia
  'Asia/Kolkata':        'south-asia',
  'Asia/Karachi':        'south-asia',
  'Asia/Dhaka':          'south-asia',
  'Asia/Colombo':        'south-asia',

  // East Asia
  'Asia/Tokyo':          'east-asia',
  'Asia/Seoul':          'east-asia',
  'Asia/Shanghai':       'east-asia',
  'Asia/Hong_Kong':      'east-asia',
  'Asia/Taipei':         'east-asia',

  // Southeast Asia
  'Asia/Ho_Chi_Minh':    'southeast-asia',
  'Asia/Bangkok':        'southeast-asia',
  'Asia/Jakarta':        'southeast-asia',
  'Asia/Manila':         'southeast-asia',
  'Asia/Singapore':      'southeast-asia',
  'Asia/Kuala_Lumpur':   'southeast-asia',

  // Oceania
  'Australia/Sydney':    'oceania',
  'Australia/Melbourne': 'oceania',
  'Pacific/Auckland':    'oceania',
}

// ─── Language → region hints ──────────────────────────────────────────────────
const LANG_HINTS: Partial<Record<string, DetectedRegion>> = {
  'fr-FR': 'france',
  'fr-BE': 'europe-west',
  'fr-CH': 'europe-west',
  'fr-CA': 'north-america',
  'fr-SN': 'africa-west',
  'fr-CI': 'africa-west',
  'fr-CM': 'africa-west',
  'fr-CD': 'africa-west',
  'fr-MG': 'africa-east',
  'fr-MA': 'africa-north',
  'fr-DZ': 'africa-north',
  'fr-TN': 'africa-north',
  'en-US': 'north-america',
  'en-CA': 'north-america',
  'en-GB': 'europe-north',
  'en-AU': 'oceania',
  'en-NG': 'africa-west',
  'en-GH': 'africa-west',
  'en-KE': 'africa-east',
  'pt-BR': 'latin-america',
  'es-MX': 'latin-america',
  'es-AR': 'latin-america',
  'ar-MA': 'africa-north',
  'ar-DZ': 'africa-north',
  'ar-TN': 'africa-north',
  'ar-EG': 'africa-north',
  'zh-CN': 'east-asia',
  'zh-TW': 'east-asia',
  'ja-JP': 'east-asia',
  'ko-KR': 'east-asia',
  'hi-IN': 'south-asia',
}

// ─── Region → continent mapping ───────────────────────────────────────────────
const CONTINENT_MAP: Record<DetectedRegion, RegionDetectionResult['continent']> = {
  'africa-west':   'africa',
  'africa-east':   'africa',
  'africa-north':  'africa',
  'france':        'europe',
  'europe-west':   'europe',
  'europe-east':   'europe',
  'europe-north':  'europe',
  'north-america': 'americas',
  'latin-america': 'americas',
  'middle-east':   'asia',
  'south-asia':    'asia',
  'east-asia':     'asia',
  'southeast-asia':'asia',
  'oceania':       'oceania',
  'global':        'unknown',
}

// ─── Region → UI language ─────────────────────────────────────────────────────
const UI_LANG: Record<DetectedRegion, 'fr' | 'en'> = {
  'africa-west':   'fr',
  'africa-north':  'fr',
  'africa-east':   'en',
  'france':        'fr',
  'europe-west':   'fr',
  'europe-north':  'en',
  'europe-east':   'en',
  'north-america': 'en',
  'latin-america': 'en',
  'middle-east':   'en',
  'south-asia':    'en',
  'east-asia':     'en',
  'southeast-asia':'en',
  'oceania':       'en',
  'global':        'fr',
}

// ─── Country guess from locale ────────────────────────────────────────────────
function extractCountry(locale: string): string | null {
  const parts = locale.split('-')
  if (parts.length >= 2) {
    const country = parts[parts.length - 1].toUpperCase()
    if (/^[A-Z]{2}$/.test(country)) return country
  }
  return null
}

// ─── Main detection function ──────────────────────────────────────────────────
/**
 * Detects user region using browser Intl APIs.
 * Safe to call on server — returns 'global' if window unavailable.
 */
export function detectRegion(): RegionDetectionResult {
  // Server-side fallback
  if (typeof Intl === 'undefined') {
    return {
      region:       'global',
      confidence:   'low',
      locale:       'fr-FR',
      timezone:     'UTC',
      lang:         'fr',
      continent:    'unknown',
      uiLang:       'fr',
      countryGuess: null,
    }
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC'
  const locale   = (typeof navigator !== 'undefined' && navigator.language) || 'fr-FR'
  const lang     = locale.split('-')[0].toLowerCase()

  // 1. Try exact timezone match (highest confidence)
  const tzRegion = TZ_MAP[timezone]
  if (tzRegion) {
    return {
      region:       tzRegion,
      confidence:   'high',
      locale,
      timezone,
      lang,
      continent:    CONTINENT_MAP[tzRegion],
      uiLang:       UI_LANG[tzRegion],
      countryGuess: extractCountry(locale),
    }
  }

  // 2. Try exact locale match
  const localeRegion = LANG_HINTS[locale]
  if (localeRegion) {
    return {
      region:       localeRegion,
      confidence:   'medium',
      locale,
      timezone,
      lang,
      continent:    CONTINENT_MAP[localeRegion],
      uiLang:       UI_LANG[localeRegion],
      countryGuess: extractCountry(locale),
    }
  }

  // 3. Try partial timezone match (Africa/, Europe/, etc.)
  const tzPrefix = timezone.split('/')[0]
  let partialRegion: DetectedRegion = 'global'
  if (tzPrefix === 'Africa')    partialRegion = 'africa-west'
  if (tzPrefix === 'Europe')    partialRegion = 'europe-west'
  if (tzPrefix === 'America')   partialRegion = 'north-america'
  if (tzPrefix === 'Asia')      partialRegion = 'south-asia'
  if (tzPrefix === 'Australia') partialRegion = 'oceania'
  if (tzPrefix === 'Pacific')   partialRegion = 'oceania'

  if (partialRegion !== 'global') {
    // Refine with language
    if (lang === 'fr' && partialRegion === 'africa-west') partialRegion = 'africa-west'
    if (lang === 'fr' && partialRegion === 'europe-west') partialRegion = 'france'
    return {
      region:       partialRegion,
      confidence:   'low',
      locale,
      timezone,
      lang,
      continent:    CONTINENT_MAP[partialRegion],
      uiLang:       UI_LANG[partialRegion],
      countryGuess: extractCountry(locale),
    }
  }

  // 4. Language fallback
  const langFallback: Partial<Record<string, DetectedRegion>> = {
    fr: 'france',
    en: 'north-america',
    pt: 'latin-america',
    es: 'latin-america',
    ar: 'africa-north',
    zh: 'east-asia',
    ja: 'east-asia',
    ko: 'east-asia',
    hi: 'south-asia',
    sw: 'africa-east',
    ha: 'africa-west',
    yo: 'africa-west',
    ig: 'africa-west',
  }
  const langRegion = langFallback[lang] ?? 'global'

  return {
    region:       langRegion,
    confidence:   'low',
    locale,
    timezone,
    lang,
    continent:    CONTINENT_MAP[langRegion],
    uiLang:       UI_LANG[langRegion],
    countryGuess: extractCountry(locale),
  }
}

/**
 * Get a human-readable label for a detected region (French)
 */
export function regionLabel(region: DetectedRegion): string {
  const labels: Record<DetectedRegion, string> = {
    'africa-west':   'Afrique de l\'Ouest',
    'africa-east':   'Afrique de l\'Est',
    'africa-north':  'Afrique du Nord',
    'france':        'France',
    'europe-west':   'Europe de l\'Ouest',
    'europe-north':  'Europe du Nord',
    'europe-east':   'Europe de l\'Est',
    'north-america': 'Amérique du Nord',
    'latin-america': 'Amérique Latine',
    'middle-east':   'Moyen-Orient',
    'south-asia':    'Asie du Sud',
    'east-asia':     'Asie de l\'Est',
    'southeast-asia':'Asie du Sud-Est',
    'oceania':       'Océanie',
    'global':        'Monde',
  }
  return labels[region]
}

/**
 * Map a DetectedRegion to a ZAWIOS SignalRegion (for feed filtering)
 */
export function toSignalRegion(r: DetectedRegion): string {
  const map: Partial<Record<DetectedRegion, string>> = {
    'africa-west':   'africa',
    'africa-east':   'africa',
    'africa-north':  'africa',
    'france':        'europe',
    'europe-west':   'europe',
    'europe-north':  'europe',
    'europe-east':   'europe',
    'north-america': 'us',
    'latin-america': 'latam',
    'middle-east':   'mena',
    'south-asia':    'asia',
    'east-asia':     'asia',
    'southeast-asia':'asia',
  }
  return map[r] ?? 'all'
}
