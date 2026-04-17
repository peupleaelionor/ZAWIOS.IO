/**
 * Brand tokens — source de vérité unique.
 * Système lumineux institutionnel · ZAWIOS Royal Signal Blue #1C39BB
 * Les variables CSS dans globals.css référencent ces valeurs.
 */

export const brand = {
  colors: {
    /* Fonds */
    background:  '#F8FAFD',
    surface:     '#FFFFFF',
    surfaceAlt:  '#F1F5FA',

    /* Bordures */
    border:  '#E6ECF5',
    border2: '#D4DDF2',
    border3: '#BAC8E4',

    /* ZAWIOS Royal Signal Blue — couleur propriétaire */
    primary:      '#1C39BB',
    primaryHover: '#142C8E',
    primarySoft:  '#E6EBFF',

    /* Accent secondaire */
    accent:  '#3A86FF',
    accent2: '#5B9DFF',
    accent3: '#DDEEFF',

    /* Texte */
    textStrong: '#0F172A',
    textMuted:  '#64748B',
    textSubtle: '#94A3B8',

    /* Sémantique */
    positive: '#1EC88A',
    negative: '#E5484D',
    win:      '#16A34A',
    warn:     '#D97706',

    /* Dark mode overrides */
    dark: {
      background:  '#05050A',
      surface:     '#0C0D14',
      surfaceAlt:  '#08090F',
      primary:     '#6B8EF8',
      textStrong:  '#F4F4FF',
      textMuted:   '#B8BAD0',
      positive:    '#14C8BE',
      negative:    '#F0404E',
    },
  },

  radii: {
    sm:   '8px',
    md:   '12px',
    lg:   '14px',
    xl:   '20px',
    full: '9999px',
  },

  shadows: {
    card:     '0 1px 3px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.04)',
    raised:   '0 8px 28px rgba(15,23,42,0.09)',
    primary:  '0 4px 20px rgba(28,57,187,0.20)',
    positive: '0 0 14px rgba(30,200,138,0.25)',
    negative: '0 0 14px rgba(229,72,77,0.20)',
  },

  typography: {
    display: {
      fontFamily:    "'Sora', sans-serif",
      fontWeight:    700,
      letterSpacing: '-0.02em',
      lineHeight:    1.1,
    },
    headline: {
      fontFamily:    "'Sora', sans-serif",
      fontWeight:    600,
      letterSpacing: '-0.018em',
      lineHeight:    1.25,
    },
    body: {
      fontFamily:    "'Inter', 'Sora', sans-serif",
      fontWeight:    400,
      letterSpacing: '-0.003em',
      lineHeight:    1.65,
    },
    caption: {
      fontFamily:    "'IBM Plex Mono', monospace",
      fontWeight:    500,
      letterSpacing: '0.08em',
      lineHeight:    1.4,
    },
    mono: {
      fontFamily:    "'IBM Plex Mono', monospace",
      fontWeight:    400,
      letterSpacing: '0.04em',
      lineHeight:    1.5,
    },
  },

  copy: {
    fr: {
      tagline:   'Infrastructure stratégique d\'intelligence collective mondiale.',
      cta:       'Commencer l\'analyse',
      ctaSecond: 'Explorer les signaux',
      join:      'Rejoindre la bêta',
    },
    en: {
      tagline:   'Strategic infrastructure for global collective intelligence.',
      cta:       'Start analysing',
      ctaSecond: 'Browse signals',
      join:      'Join the beta',
    },
  },
} as const

export type BrandColor  = keyof typeof brand.colors
export type BrandRadius = keyof typeof brand.radii
export type BrandShadow = keyof typeof brand.shadows
