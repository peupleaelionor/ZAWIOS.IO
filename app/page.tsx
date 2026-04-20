import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { CategoriesSection } from '@/components/landing/categories-section'
import { WorldViewSection } from '@/components/landing/world-view-section'
import { CTASection } from '@/components/landing/cta-section'
import { SocialProofSection } from '@/components/landing/social-proof-section'
import { StepsSection } from '@/components/landing/steps-section'
import { SignalFeed } from '@/components/signals/signal-feed'
import { SignalCard } from '@/components/signals/signal-card'
import { getResolvedSignals, getTrendingSignals } from '@/lib/signals-data'

export default function HomePage() {
  const resolvedSignals = getResolvedSignals(3)
  const trendingSidebar = getTrendingSignals(4)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />

      {/* Hero — app-style header with live signal */}
      <HeroSection />

      {/* Stats band */}
      <SocialProofSection />

      {/* How it works */}
      <StepsSection />

      {/* ── Live Feed ─────────────────────────────────────────────────────── */}
      <section id="feed" className="py-12 md:py-20" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="mb-5 md:mb-6">
            <p className="section-label">Live</p>
            <h2
              className="text-xl md:text-3xl font-bold mt-1"
              style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Signaux en direct
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text2)' }}>
              Vote YES, NO ou reste neutre. Compare avec 47K+ utilisateurs.
            </p>
          </div>

          {/* Desktop: 2-col layout — feed + sidebar */}
          <div className="feed-layout">
            <SignalFeed />

            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block space-y-5">
              {/* Trending sidebar widget */}
              <div
                className="rounded-2xl p-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}
                >
                  Trending maintenant
                </p>
                <div className="space-y-3">
                  {trendingSidebar.map((sig, i) => (
                    <div
                      key={sig.id}
                      className="flex gap-3 items-start py-2"
                      style={{ borderBottom: i < trendingSidebar.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                      <span
                        className="text-[13px] font-bold w-5 shrink-0 mt-0.5"
                        style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold leading-snug line-clamp-2" style={{ color: 'var(--text)' }}>
                          {sig.title}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                          {sig.totalVotes.toLocaleString('fr-FR')} votes · {sig.yesPercent}% YES
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats widget */}
              <div
                className="rounded-2xl p-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--accent2)', fontFamily: 'var(--mono)' }}
                >
                  Statistiques globales
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'Signaux actifs',     value: '184' },
                    { label: "Votes aujourd'hui",  value: '12 847' },
                    { label: 'Précision moyenne',  value: '64%' },
                    { label: 'Pays représentés',   value: '94' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-baseline">
                      <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{item.label}</span>
                      <span className="text-[12px] font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join CTA widget */}
              <div
                className="rounded-2xl p-4 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(29,228,222,0.08) 0%, rgba(108,92,231,0.08) 100%)',
                  border:     '1px solid rgba(29,228,222,0.2)',
                }}
              >
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
                  Construis ta réputation
                </p>
                <p className="text-[12px] mb-3" style={{ color: 'var(--text2)' }}>
                  Rejoins 47K+ analystes et gagne ta place dans le classement mondial.
                </p>
                <a
                  href="/auth/signup"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 rounded-xl transition-all"
                  style={{ background: 'var(--teal)', color: 'var(--bg)' }}
                >
                  Rejoindre gratuitement
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* World View — safe-by-default */}
      <WorldViewSection />

      {/* Resolved signals */}
      <section className="py-8 md:py-14" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="mb-5 md:mb-6">
            <p className="section-label">Résultats</p>
            <h2 className="text-xl md:text-3xl font-bold mt-1" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Signaux résolus
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text2)' }}>
              La foule avait-elle raison ?
            </p>
          </div>

          <div className="grid gap-4 feed-grid">
            {resolvedSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories editorial rows */}
      <CategoriesSection />

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  )
}
