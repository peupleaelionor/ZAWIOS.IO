/**
 * Brand tokens — source de vérité unique.
 * Toutes les couleurs/radii/shadows doivent passer par ici.
 * Les variables CSS dans globals.css référencent ces valeurs.
 */

export const brand = {
  colors: {
    // ── Fonds ──────────────────────────────────
    bg:       '#05050A',
    bg2:      '#08090F',
    surface:  '#0C0D14',
    surface2: '#10111A',
    surface3: '#161722',

    // ── Bordures ───────────────────────────────
    border:  'rgba(255,255,255,0.05)',
    border2: 'rgba(255,255,255,0.09)',
    border3: 'rgba(255,255,255,0.15)',

    // ── Texte ──────────────────────────────────
    text:  '#F4F4FF',
    text2: '#B8BAD0',
    text3: '#52546A',

    // ── Accent unique — Indigo électrique ──────
    accent:  '#6B6EF8',  // CTA, interactif, brand primaire
    accent2: '#8486F9',  // hover/active
    accent3: '#A5A7FB',  // badges légers

    // ── Sémantique (usage strict) ───────────────
    yes:  '#14C8BE',  // vote YES / confirmation
    no:   '#F0404E',  // vote NO / erreur
    win:  '#4EE49A',  // résolu / correct
    warn: '#F0B429',  // alerte / neutre chaud

    // ── Palette complète brand ──────────────────
    brandBlue:        '#6B6EF8',  // = accent (identité primaire)
    signalTeal:       '#14C8BE',  // = yes (confirmations)
    analysisPurple:   '#A78BFA',  // accent tertiaire
    neutralDark:      '#10111A',  // = surface2
    softGray:         '#B8BAD0',  // = text2
  },

  radii: {
    sm:  '8px',
    md:  '12px',   // --radius
    lg:  '16px',
    xl:  '20px',
    full: '9999px',
  },

  shadows: {
    l0: '0 1px 2px rgba(0,0,0,0.3)',
    l1: '0 4px 12px rgba(0,0,0,0.4)',
    l2: '0 8px 32px rgba(0,0,0,0.55)',
    accent: '0 0 20px rgba(107,110,248,0.25)',
    yes:    '0 0 14px rgba(20,200,190,0.25)',
    no:     '0 0 14px rgba(240,64,78,0.20)',
  },

  typography: {
    display: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.08,
    },
    headline: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    body: {
      fontFamily: "'Sora', sans-serif",
      fontWeight: 400,
      letterSpacing: '-0.005em',
      lineHeight: 1.65,
    },
    caption: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 500,
      letterSpacing: '0.08em',
      lineHeight: 1.4,
    },
    mono: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 400,
      letterSpacing: '0.04em',
      lineHeight: 1.5,
    },
  },

  copy: {
    fr: {
      tagline:   'ZAWIOS organise des signaux d\'opinion vérifiables, par sujet et par région.',
      cta:       'Commencer gratuitement',
      ctaSecond: 'Voir les signaux',
      join:      'Rejoindre la bêta',
    },
    en: {
      tagline:   'ZAWIOS structures collective opinion signals by topic and region.',
      cta:       'Get started free',
      ctaSecond: 'Browse signals',
      join:      'Join the beta',
    },
  },
} as const

export type BrandColor = keyof typeof brand.colors
export type BrandRadius = keyof typeof brand.radii
export type BrandShadow = keyof typeof brand.shadows
