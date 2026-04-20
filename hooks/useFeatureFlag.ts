'use client'

import { FLAGS, type FeatureFlag } from '@/config/feature-flags'

/**
 * useFeatureFlag — Read feature flags in React components.
 *
 * @example
 * const isNeutralEnabled = useFeatureFlag('enableNeutralVoting')
 */
export function useFeatureFlag(flag: FeatureFlag): boolean {
  return FLAGS[flag]
}

/**
 * useFeatureFlags — Read multiple flags at once.
 */
export function useFeatureFlags<T extends FeatureFlag>(flags: T[]): Record<T, boolean> {
  return Object.fromEntries(flags.map((f) => [f, FLAGS[f]])) as unknown as Record<T, boolean>
}
