/**
 * ZAWIOS Design Tokens — Colors
 * Single source of truth. Mirrors app/globals.css CSS variables.
 * Use in JS contexts (canvas, SVG, dynamic styles).
 */

export const colors = {
  // Backgrounds
  bg:       '#0C0D10',
  bg2:      '#101116',
  surface:  '#13141a',
  surface2: '#191a22',
  surface3: '#1f2028',

  // Borders
  border:   'rgba(255,255,255,0.05)',
  border2:  'rgba(255,255,255,0.09)',
  border3:  'rgba(255,255,255,0.14)',

  // Text
  text:     '#eaeaf0',
  text2:    '#a0a0b8',
  text3:    '#5c5c78',

  // Accents
  teal:     '#17D5CF',
  teal2:    '#12b8b2',
  accent:   '#5A4BFF',
  accent2:  '#7b6fff',
  accent3:  '#9d92ff',

  // Signal colors
  zred:     '#f06070',
  amber:    '#f0c050',
  blue:     '#60a8f0',
} as const

/** Vote-specific semantic colors */
export const voteColors = {
  yes:     colors.teal,
  no:      'rgba(255,255,255,0.6)',
  neutral: 'rgba(160,160,184,0.4)',
} as const

export type ColorToken = keyof typeof colors
