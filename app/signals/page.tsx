import { Suspense } from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SignalsFeed } from '@/components/signals/signals-feed'
import { copy } from '@/lib/i18n.copy'
import { SignalSkeleton } from '@/components/skeletons'
import { SignalsFeedErrorBoundary } from '@/components/signals/signals-feed-error-boundary'

export const metadata: Metadata = {
  title: copy.fr.signalPage.label,
  description: copy.fr.signalPage.subtitle,
}

export default function SignalsPage() {
  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--background)' }}>
      <Navbar />
      
      <main className="container py-8 md:py-12">
        {/* Page header */}
        <div className="mb-8">
          <p 
            className="section-label mb-3"
            style={{ fontFamily: 'var(--mono)' }}
          >
            {copy.fr.signalPage.label}
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              fontFamily: 'var(--display-font)',
              letterSpacing: '-0.02em',
              color: 'var(--text-strong)',
            }}
          >
            {copy.fr.signalPage.title}
          </h1>
          <p
            className="text-lg leading-relaxed max-w-[600px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {copy.fr.signalPage.subtitle}
          </p>
        </div>

        {/* Feed with error boundary + suspense */}
        <SignalsFeedErrorBoundary>
          <Suspense fallback={<SignalSkeleton />}>
            <SignalsFeed />
          </Suspense>
        </SignalsFeedErrorBoundary>
      </main>

      <Footer />
    </div>
  )
}
