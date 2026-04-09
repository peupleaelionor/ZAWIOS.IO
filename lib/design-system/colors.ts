/**
 * ZAWIOS Design System — Color Tokens
 *
 * Single source of truth for all color values.
 * CSS custom properties are defined in app/globals.css — these TS tokens
 * mirror them for use in components that need programmatic access.
 */

export const colors = {
  /* ── Backgrounds ── */
  bg: '#0C0D10',
  bg2: '#101116',
  surface: '#13141a',
  surface2: '#191a22',
  surface3: '#1f2028',

  /* ── Borders ── */
  border: 'rgba(255,255,255,0.05)',
  border2: 'rgba(255,255,255,0.09)',
  border3: 'rgba(255,255,255,0.14)',

  /* ── Text ── */
  text: '#eaeaf0',
  text2: '#a0a0b8',
  text3: '#5c5c78',

  /* ── Brand accents ── */
  accent: '#5A4BFF',
  accent2: '#7b6fff',
  accent3: '#9d92ff',
  teal: '#17D5CF',
  teal2: '#12b8b2',

  /* ── Semantic / extra ── */
  zred: '#f06070',
  amber: '#f0c050',
  blue: '#60a8f0',
  success: '#17D5CF',
  warning: '#f0c050',
  danger: '#f06070',
  info: '#60a8f0',
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
} as const

export type ColorToken = keyof typeof colors
