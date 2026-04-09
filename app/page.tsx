import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { CategoriesSection } from '@/components/landing/categories-section'
import { WorldViewSection } from '@/components/landing/world-view-section'
import { AmbassadorSection } from '@/components/landing/ambassador-section'
import { CTASection } from '@/components/landing/cta-section'
import { SignalFeed } from '@/components/signals/signal-feed'
import { SignalCard } from '@/components/signals/signal-card'
import { getResolvedSignals } from '@/lib/signals-data'

export default function HomePage() {
  const resolvedSignals = getResolvedSignals(3)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />

      {/* Hero — app-style header with live stats */}
      <HeroSection />

      {/* Live Feed — immediately after hero, app-like */}
      <section id="feed" className="py-8 md:py-14" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="mb-5 md:mb-6">
            <p className="section-label">Live</p>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.02em' }}>
              Signaux en direct
            </h2>
          </div>

          <SignalFeed />
        </div>
      </section>

      {/* World View */}
      <WorldViewSection />

      {/* Resolved signals */}
      <section className="py-8 md:py-14" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="mb-5 md:mb-6">
            <p className="section-label">Résultats</p>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.02em' }}>
              Signaux résolus
            </h2>
          </div>

          <div className="grid gap-4 feed-grid">
            {resolvedSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoriesSection />

      {/* Ambassador map */}
      <AmbassadorSection />

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  )
}
