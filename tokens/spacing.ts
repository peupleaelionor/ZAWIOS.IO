/**
 * ZAWIOS Design Tokens — Spacing
 * 8px base grid. All spacing values in px.
 */

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const

/** Minimum touch target size (mobile accessibility) */
export const MIN_TOUCH_TARGET = 48 // px

export type SpacingToken = keyof typeof spacing
