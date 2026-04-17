'use client'

import { useUserContext } from '@/components/providers/user-context-provider'

/**
 * Shows a thin banner when the user is offline.
 * Automatically hides when connection is restored.
 */
export function NetworkStatus() {
  const { isOnline, networkQuality, ready } = useUserContext()

  if (!ready || isOnline) return null

  return (
    <div className="network-offline-banner" role="alert" aria-live="assertive">
      {networkQuality === 'offline'
        ? 'You are offline — some features may be unavailable'
        : 'Slow connection detected — loading optimized content'}
    </div>
  )
}
