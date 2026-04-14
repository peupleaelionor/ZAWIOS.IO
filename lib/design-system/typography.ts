/**
 * ZAWIOS Design System — Typography Tokens
 *
 * Font families: Sora (UI) + IBM Plex Mono (data/labels)
 */

export const fontFamily = {
  sans: "'Sora', system-ui, -apple-system, sans-serif",
  mono: "'IBM Plex Mono', monospace",
} as const

export const fontSize = {
  xs: '10.5px',
  sm: '12px',
  base: '14px',
  md: '16px',
  lg: '18px',
  xl: '22px',
  '2xl': '28px',
  '3xl': '36px',
} as const

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const

export const lineHeight = {
  tight: 1.2,
  normal: 1.6,
  relaxed: 1.8,
} as const

/** Pre-composed text styles */
export const textStyles = {
  sectionLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.14em',
    fontFamily: fontFamily.mono,
  },
  heading: {
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    fontFamily: fontFamily.sans,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    fontFamily: fontFamily.sans,
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
  },
} as const
