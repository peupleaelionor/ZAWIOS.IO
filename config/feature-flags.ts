/**
 * ZAWIOS — Runtime feature flags
 * Centralized on/off switches for progressive rollout.
 * Re-exports from lib/features.ts for plan-based access.
 */

export const FLAGS = {
  /** Tri-state voting: YES / NO / NEUTRE */
  enableNeutralVoting: true,

  /** Pro analytics features (regional heatmap, historical trends, etc.) */
  enableProFeatures: true,

  /** Event tracking via Plausible */
  enableAnalytics: process.env.NODE_ENV === 'production',

  /** Ambassador section on homepage */
  enableAmbassadorSection: true,

  /** World View expanded section */
  enableWorldView: true,

  /** Admin dashboard (internal only) */
  enableAdminDashboard: true,

  /** Polarization index display */
  enablePolarizationIndex: true,

  /** Signal momentum score */
  enableMomentumScore: false,
} as const

export type FeatureFlag = keyof typeof FLAGS
