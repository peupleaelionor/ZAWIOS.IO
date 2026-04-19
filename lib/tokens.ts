/**
 * ZAWIOS — Design Tokens (TypeScript mirror)
 *
 * Source of truth for all design tokens.
 * CSS custom properties in app/globals.css MUST match these values.
 * Run `npm run tokens:check` to verify synchronization.
 */

export const tokens = {
  colors: {
    /* Backgrounds */
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FAFC',
    surfaceAlt2: '#F1F5F9',

    /* Borders */
    border: '#E2E8F0',
    border2: '#CBD5E1',
    border3: '#94A3B8',

    /* Royal Signal Blue — propriétaire */
    primary: '#1C39BB',
    primaryHover: '#142C8E',
    primaryDeep: '#0E1F6B',
    primarySoft: '#E6EBFF',

    /* Accent */
    accent: '#3A86FF',
    accent2: '#5B9DFF',
    accent3: '#DDEEFF',

    /* Text (jamais noir pur #000000) */
    textStrong: '#0F172A',
    textMuted: '#64748B',
    textSubtle: '#94A3B8',

    /* Semantic */
    positive: '#1EC88A',
    negative: '#E5484D',
    win: '#4EE49A',
    warn: '#D97706',
  },

  /* Dark mode overrides */
  dark: {
    background: '#05050A',
    surface: '#0C0D14',
    surfaceAlt: '#08090F',
    primary: '#6B8EF8',
    primaryHover: '#8BA5F9',
    textStrong: '#F4F4FF',
    textMuted: '#B8BAD0',
    textSubtle: '#7C7E96',
    positive: '#14C8BE',
    negative: '#F0404E',
  },

  fonts: {
    sans: "'Sora', system-ui, -apple-system, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    display: "'Sora', system-ui, -apple-system, sans-serif",
  },

  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    '2xl': '64px',
  },

  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },

  /** Minimum touch target size (WCAG 2.5.8) */
  minTouchTarget: '44px',

  /** Maximum content width */
  maxContentWidth: '1280px',
  maxAdminWidth: '1440px',
} as const

export type TokenColors = keyof typeof tokens.colors
export type TokenDarkColors = keyof typeof tokens.dark
