import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { WorldViewSection } from '@/components/landing/world-view-section'
import { CTASection } from '@/components/landing/cta-section'
import { SignalFeed } from '@/components/signals/signal-feed'
import { SignalCard } from '@/components/signals/signal-card'
import { Avatar } from '@/components/ui/avatar'
import { getTrendingSignals, getResolvedSignals } from '@/lib/signals-data'
import { mockLeaderboard, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { copy } from '@/lib/i18n.copy'
import Link from 'next/link'

const c = copy.fr

const PILLARS = [
  {
    n: '01',
    title: 'Signal structuré',
    desc: 'Chaque vote est accompagné d\'un contexte analytique. Les données brutes deviennent une position argumentée, traçable et comparable.',
  },
  {
    n: '02',
    title: 'Réputation pondérée',
    desc: 'La précision historique de chaque analyste pondère l\'impact de son signal. Plus tu es exact, plus ton vote compte.',
  },
  {
    n: '03',
    title: 'Corrélation comparative mondiale',
    desc: 'Les signaux sont agrégés par région, catégorie et période. La divergence entre zones géographiques est mesurée et exposée.',
  },
]

export default function HomePage() {
  const heroSignal = getTrendingSignals(1)[0]
  const resolvedSignals = getResolvedSignals(3)
  const topAnalysts = mockLeaderboard.slice(0, 3)

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--background)' }}>
      <Navbar />

      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* ── 2. Credibility bar ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-2">
            {[
              { value: formatNumber(PLATFORM_STATS.total_users), label: 'Analystes' },
              { value: '94',                                       label: 'Pays' },
              { value: `${PLATFORM_STATS.avg_accuracy}%`,         label: 'Précision moyenne' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: 'var(--mono)', color: 'var(--primary)', letterSpacing: '-0.02em' }}
                >
                  {s.value}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Signal du moment ── */}
      {heroSignal && (
        <section id="feed" className="py-12 md:py-16" style={{ background: 'var(--background)' }}>
          <div className="container">
            <div className="mb-6">
              <p className="section-label mb-2">Signal du moment</p>
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em', fontFamily: 'var(--display-font)' }}
              >
                En direct
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <SignalCard signal={heroSignal} />
              <SignalFeed />
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Vision mondiale (section-alt) ── */}
      <div className="section-alt" style={{ borderTop: '1px solid var(--border)' }}>
        <WorldViewSection />
      </div>

      {/* ── 5. Méthodologie ── */}
      <section className="py-16 md:py-24" style={{ background: 'var(--background)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="max-w-[720px] mx-auto">
            <p className="section-label mb-4">Méthodologie</p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-12"
              style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em', fontFamily: 'var(--display-font)' }}
            >
              Trois piliers.
            </h2>

            <div className="space-y-0 divide-y" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              {PILLARS.map((p) => (
                <div key={p.n} className="py-8 grid grid-cols-[48px_1fr] gap-6 items-start">
                  <span
                    className="text-sm font-bold mt-0.5"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--primary)', opacity: 0.6 }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3
                      className="font-bold mb-2"
                      style={{ fontSize: '1.05rem', color: 'var(--text-strong)', letterSpacing: '-0.015em' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/methodology"
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.02em' }}
              >
                Lire la méthodologie complète →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Classement stratégique ── */}
      <section
        className="py-14 md:py-20 section-alt"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div className="max-w-[720px] mx-auto">
            <p className="section-label mb-3">Classement</p>
            <h2
              className="text-xl md:text-2xl font-bold mb-8"
              style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em', fontFamily: 'var(--display-font)' }}
            >
              Top analystes
            </h2>

            <div className="space-y-2">
              {topAnalysts.map((entry, i) => (
                <Link
                  key={entry.user.id}
                  href={`/profile/${entry.user.username}`}
                  className="flex items-center gap-4 py-3 px-4 rounded-xl transition-all card-hover"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span
                    className="w-6 text-sm font-bold text-center shrink-0"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}
                  >
                    {i + 1}
                  </span>
                  <Avatar
                    src={entry.user.avatar_url}
                    name={entry.user.username}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold block truncate" style={{ color: 'var(--text-strong)' }}>
                      {entry.user.full_name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatNumber(entry.prediction_count)} signaux
                    </span>
                  </div>
                  <span
                    className="text-sm font-bold shrink-0"
                    style={{
                      fontFamily: 'var(--mono)',
                      color: entry.accuracy_rate >= 72 ? 'var(--positive)' : entry.accuracy_rate >= 60 ? 'var(--warn)' : 'var(--text-muted)',
                    }}
                  >
                    {entry.accuracy_rate}%
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/leaderboard"
                className="text-sm font-medium"
                style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.02em' }}
              >
                Voir le classement complet →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection />

      <Footer />
    </div>
  )
}
