/**
 * ZAWIOS Design System — Typography Tokens (Strict)
 *
 * Font: Sora (headings + body) · IBM Plex Mono (data/labels)
 * Tracking: -0.02em · Line height: 1.6 body
 *
 * Never use pure black (#000000).
 * Never use gray below contrast ratio 4.5:1.
 * Minimum body/meta text: 14px. Section labels (monospace, decorative): 11px allowed.
 */

export const fontFamily = {
  sans: "'Sora', system-ui, -apple-system, sans-serif",
  mono: "'IBM Plex Mono', monospace",
} as const

export const fontSize = {
  xs: '11px',
  sm: '14px',
  base: '16px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '28px',
  '3xl': '40px',
} as const

/** Responsive font sizes for headings */
export const fontSizeResponsive = {
  h1: { desktop: '40px', mobile: '28px' },
  h2: { desktop: '28px', mobile: '22px' },
  h3: { desktop: '20px', mobile: '18px' },
  body: { desktop: '16px', mobile: '16px' },
  meta: { desktop: '14px', mobile: '14px' },
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
  snug: 1.3,
  normal: 1.6,
  relaxed: 1.8,
} as const

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.06em',
  widest: '0.12em',
} as const

/** Pre-composed text styles */
export const textStyles = {
  h1: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.sans,
  },
  h2: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.sans,
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.sans,
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase' as const,
    letterSpacing: letterSpacing.widest,
    fontFamily: fontFamily.mono,
  },
  heading: {
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.sans,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.sans,
    color: '#0F172A',
  },
  meta: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    fontFamily: fontFamily.sans,
    color: '#64748B',
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
  },
} as const
