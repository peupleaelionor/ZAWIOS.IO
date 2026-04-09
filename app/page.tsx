import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { SocialProofSection } from '@/components/landing/social-proof-section'
import { StepsSection } from '@/components/landing/steps-section'
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

      {/* Hero + live signal preview */}
      <HeroSection />

      {/* Stats */}
      <SocialProofSection />

      {/* How it works */}
      <StepsSection />

      {/* Live Feed */}
      <section id="feed" className="py-12 md:py-20" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="mb-6 md:mb-8">
            <p className="section-label">Live</p>
            <h2 className="text-xl md:text-3xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.02em' }}>
              Signaux en direct
            </h2>
            <p className="mt-2 text-sm text-[var(--text2)]">
              Vote sur les sujets du moment. YES ou NO.
            </p>
          </div>

          <SignalFeed />
        </div>
      </section>

      {/* World View */}
      <WorldViewSection />

      {/* Resolved signals */}
      <section className="py-10 md:py-16" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="mb-6 md:mb-8">
            <p className="section-label">Résultats</p>
            <h2 className="text-xl md:text-3xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.02em' }}>
              Signaux résolus
            </h2>
            <p className="mt-2 text-sm text-[var(--text2)]">
              La foule avait-elle raison ?
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {resolvedSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories (editorial rows) */}
      <CategoriesSection />

      {/* Ambassador map */}
      <AmbassadorSection />

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  )
}
