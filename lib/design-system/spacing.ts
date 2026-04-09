/**
 * ZAWIOS Design System — Spacing Tokens
 *
 * 4px base unit rhythm. Mirrors CSS custom properties from globals.css.
 */

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
} as const

/** Numeric pixel values for programmatic use */
export const spacingPx = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const

/** Layout constants */
export const layout = {
  maxContentWidth: '1200px',
  sidebarWidth: '256px',
  bottomNavHeight: '64px',
  mobileMaxWidth: '480px',
  borderRadius: '12px',
} as const

export type SpacingToken = keyof typeof spacing
