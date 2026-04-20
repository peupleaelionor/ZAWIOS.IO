import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
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
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--background)' }}>
      <Navbar />

      {/* ── 1. Hero ────────────────────────────────────────────────── */}
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
      </div>

      {/* ── 3. Signaux en direct ────────────────────────────────────── */}
      <section id="feed" className="py-12 md:py-16" style={{ background: 'var(--background)' }}>
        <div className="container">
          <div className="flex items-end justify-between mb-6 gap-4">
            <div>
              <p className="section-label mb-2">{t.page.feedLabel}</p>
              <h2
                className="font-bold"
                style={{ fontFamily: 'var(--display-font)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}
              >
                {t.page.feedTitle}
              </h2>
            </div>
            <Link
              href="/signals"
              className="text-sm font-medium shrink-0"
              style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.02em' }}
            >
              {t.page.viewAll}
            </Link>
          </div>

          {/* Mobile: single column · Tablet: 2 col · Desktop: hero left + feed right */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {heroSignal && (
              <div className="sm:col-span-1 lg:col-span-1">
                <SignalCard signal={heroSignal} />
              </div>
            )}
            <div className={heroSignal ? 'sm:col-span-1 lg:col-span-2' : 'sm:col-span-2 lg:col-span-3'}>
              <SignalFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Categories editorial rows */}
      <CategoriesSection />

      {/* ── 5. Méthodologie ────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="max-w-[680px] mx-auto lg:mx-0">
            <p className="section-label mb-4">{t.page.methodology}</p>
            <h2
              className="font-bold mb-10"
              style={{ fontFamily: 'var(--display-font)', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}
            >
              {t.page.methodologyTitle}
            </h2>

            <div className="divide-y" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              {PILLARS.map((p) => (
                <div key={p.n} className="py-7 grid gap-5 items-start" style={{ gridTemplateColumns: '36px 1fr' }}>
                  <span
                    className="font-bold text-xs mt-0.5 shrink-0"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--primary)', opacity: 0.55 }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1.5" style={{ fontSize: '0.95rem', color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/methodology"
              className="inline-block mt-7 text-sm font-medium"
              style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.02em' }}
            >
              {t.page.methodologyReadMore}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Top analystes ───────────────────────────────────────── */}
      <section className="py-14 md:py-20 section-alt">
        <div className="container">
          <div className="max-w-[680px] mx-auto lg:mx-0">
            <div className="flex items-end justify-between mb-7 gap-4">
              <div>
                <p className="section-label mb-2">{t.page.leaderboardLabel}</p>
                <h2
                  className="font-bold"
                  style={{ fontFamily: 'var(--display-font)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}
                >
                  {t.page.leaderboardTitle}
                </h2>
              </div>
              <Link
                href="/leaderboard"
                className="text-sm font-medium shrink-0"
                style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.02em' }}
              >
                {t.page.viewAll}
              </Link>
            </div>

            <div className="space-y-2">
              {topAnalysts.map((entry, i) => (
                <Link
                  key={entry.user.id}
                  href={`/profile/${entry.user.username}`}
                  className="flex items-center gap-3 sm:gap-4 py-3 px-4 rounded-xl card-hover"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span
                    className="w-5 text-xs font-bold text-center shrink-0"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--text-subtle)' }}
                  >
                    {i + 1}
                  </span>
                  <Avatar src={entry.user.avatar_url} name={entry.user.username} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-strong)' }}>
                      {entry.user.full_name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatNumber(entry.prediction_count)} {t.page.leaderboardSignals}
                    </p>
                  </div>
                  <span
                    className="text-sm font-bold shrink-0 tabular-nums"
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
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <CTASection />

      <Footer />
    </div>
  )
}
