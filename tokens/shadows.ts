/**
 * ZAWIOS Design Tokens — Shadows
 * Two levels: l0 (subtle), l1 (elevated). No glow effects.
 */

export const shadows = {
  l0: '0 1px 2px rgba(0,0,0,0.25)',
  l1: '0 2px 8px rgba(0,0,0,0.35)',
  l2: '0 4px 16px rgba(0,0,0,0.45)',
} as const

export type ShadowToken = keyof typeof shadows
