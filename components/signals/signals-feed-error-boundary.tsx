'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/ui/error-fallback'
import type { ReactNode } from 'react'

/**
 * Client-side error boundary for the signals feed.
 * Wraps react-error-boundary for use in Server Components.
 */
export function SignalsFeedErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Optionally clear cache or refetch on retry
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
