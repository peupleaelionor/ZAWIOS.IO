'use client'

import { Suspense } from 'react'
import { CrispProvider } from './crisp-provider'
import { ContentsquareProvider } from './contentsquare-provider'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CrispProvider />
      <Suspense fallback={null}>
        <ContentsquareProvider />
      </Suspense>
    </>
  )
}
