/**
 * ZAWIOS Design Tokens — Typography
 * Sora (UI) + IBM Plex Mono (data/code)
 */

export const typography = {
  fontUI:   "'Sora', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  radius:   12, // px, max border-radius

  sizes: {
    xs:   10,
    sm:   12,
    base: 14,
    md:   15,
    lg:   16,
    xl:   20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  weights: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
  },

  lineHeights: {
    tight:   1.1,
    snug:    1.3,
    normal:  1.6,
    relaxed: 1.75,
  },

  letterSpacings: {
    tight:   '-0.03em',
    normal:  '0',
    wide:    '0.05em',
    wider:   '0.1em',
    widest:  '0.14em',
  },
} as const
