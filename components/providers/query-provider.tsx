'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Don't re-fetch on window focus in production — signals don't change every second
        refetchOnWindowFocus: false,
        // 60s stale time for feed data
        staleTime: 60_000,
        // Retry once on failure
        retry: 1,
        // Show stale data while revalidating
        placeholderData: (prev: unknown) => prev,
      },
      mutations: {
        retry: 0,
      },
    },
  })
}

// Singleton for server (avoids creating multiple clients in RSC trees)
let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new client per request
    return makeQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}

export function QueryProvider({ children }: { children: ReactNode }) {
  // useState ensures we don't re-create the client on every render
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  )
}
