/**
 * ZAWIOS Design System — Spacing Tokens
 *
 * Strict 8px grid system. No cramped UI. No edge overflow.
 *
 * Scale: 8 · 16 · 24 · 32 · 48 · 64
 * Minimum spacing between cards: 24px
 * Minimum padding inside cards: 20px
 */

export const spacing = {
  0: '0px',
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  8: '64px',
  10: '80px',
  12: '96px',
} as const

/** Numeric pixel values for programmatic use */
export const spacingPx = {
  0: 0,
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
  8: 64,
  10: 80,
  12: 96,
} as const

/** Strict 8px grid scale for fine-grained control */
export const grid8 = {
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  6: '48px',
  8: '64px',
} as const

/** Layout constants */
export const layout = {
  /** Admin max width */
  maxAdminWidth: '1440px',
  maxContentWidth: '1280px',
  sidebarWidth: '256px',
  bottomNavHeight: '64px',
  mobileMaxWidth: '480px',
  borderRadius: '16px',
  cardRadius: '16px',
  /** Minimum card internal padding */
  cardPadding: '20px',
  /** Minimum gap between cards */
  cardGap: '24px',
  /** Desktop padding */
  desktopPadding: '32px',
  /** Mobile padding */
  mobilePadding: '20px',
  /** Grid: 12 columns */
  gridColumns: 12,
} as const

export type SpacingToken = keyof typeof spacing
