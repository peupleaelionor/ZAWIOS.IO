'use client'

import { Suspense } from 'react'
import { ContentsquareProvider } from './contentsquare-provider'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <ContentsquareProvider />
      </Suspense>
    </>
  )
}
