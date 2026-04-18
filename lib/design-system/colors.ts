/**
 * ZAWIOS Design System — Color Tokens
 *
 * Single source of truth for all color values.
 * CSS custom properties are defined in app/globals.css — these TS tokens
 * mirror them for use in components that need programmatic access.
 *
 * Palette:
 *   Blanc profond: #FFFFFF → #F8FAFC → #F1F5F9
 *   Royal Signal Blue propriétaire: #0E1F6B → #1C39BB → #3A86FF
 *   Texte principal: #0F172A (jamais #000000)
 *   Texte secondaire: #64748B
 *   Jamais : noir pur, bleu flashy, rouge agressif
 */

export const colors = {
  /* ── Backgrounds (blanc profond) ── */
  bg: '#FFFFFF',
  bg2: '#F8FAFC',
  surface: '#FFFFFF',
  surface2: '#F8FAFC',
  surface3: '#F1F5F9',

  /* ── Borders ── */
  border: '#E2E8F0',
  border2: '#CBD5E1',
  border3: '#94A3B8',

  /* ── Text (accent léger, jamais noir pur) ── */
  text: '#0F172A',
  text2: '#64748B',
  text3: '#64748B',

  /* ── Royal Signal Blue propriétaire (source: brand.ts #1C39BB) ── */
  royalBlueDark: '#0E1F6B',
  royalBlue: '#1C39BB',
  royalBlueLight: '#3A86FF',
  royalBlueSoft: '#E6EBFF',

  /* ── Brand accents ── */
  accent: '#3A86FF',
  accent2: '#5B9DFF',
  accent3: '#DDEEFF',
  teal: '#1EC88A',
  teal2: '#17A98F',

  /* ── Semantic ── */
  zred: '#E5484D',
  amber: '#D97706',
  blue: '#1C39BB',
  success: '#1EC88A',
  warning: '#D97706',
  danger: '#E5484D',
  info: '#1C39BB',
} as const

/** CSS variable reference helpers (for inline styles) */
export const cssVar = {
  bg: 'var(--bg)',
  bg2: 'var(--bg2)',
  surface: 'var(--surface)',
  surface2: 'var(--surface2)',
  surface3: 'var(--surface3)',
  border: 'var(--border)',
  border2: 'var(--border2)',
  border3: 'var(--border3)',
  text: 'var(--text)',
  text2: 'var(--text2)',
  text3: 'var(--text3)',
  accent: 'var(--accent)',
  accent2: 'var(--accent2)',
  accent3: 'var(--accent3)',
  teal: 'var(--teal)',
  teal2: 'var(--teal2)',
  zred: 'var(--zred)',
  amber: 'var(--amber)',
  blue: 'var(--blue)',
  primary: 'var(--primary)',
  primaryHover: 'var(--primary-hover)',
} as const

export type ColorToken = keyof typeof colors
