import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { WorldViewSection } from '@/components/landing/world-view-section'
import { CTASection } from '@/components/landing/cta-section'
import { SignalFeed } from '@/components/signals/signal-feed'
import { SignalCard } from '@/components/signals/signal-card'
import { Avatar } from '@/components/ui/avatar'
import { getTrendingSignals } from '@/lib/signals-data'
import { mockLeaderboard, PLATFORM_STATS } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { copy } from '@/lib/i18n.copy'
import Link from 'next/link'

const t = copy.fr

const PILLARS = [
  { n: '01', title: t.page.pillarTitle1, desc: t.page.pillarDesc1 },
  { n: '02', title: t.page.pillarTitle2, desc: t.page.pillarDesc2 },
  { n: '03', title: t.page.pillarTitle3, desc: t.page.pillarDesc3 },
]

const STATS = [
  { value: () => formatNumber(PLATFORM_STATS.total_users), label: t.page.statsAnalysts },
  { value: () => '94',                                      label: t.page.statsCountries },
  { value: () => `${PLATFORM_STATS.avg_accuracy}%`,        label: t.page.statsAccuracy },
]

export default function HomePage() {
  const heroSignal   = getTrendingSignals(1)[0]
  const topAnalysts  = mockLeaderboard.slice(0, 3)

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--background)' }}>
      <Navbar />

      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. Credibility bar ─────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="container">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span
                  className="font-bold"
                  style={{ fontFamily: 'var(--mono)', fontSize: '1.05rem', color: 'var(--primary)', letterSpacing: '-0.02em' }}
                >
                  {s.value()}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </span>
              </div>
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

      {/* ── 4. Vision mondiale ─────────────────────────────────────── */}
      <div className="section-alt" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <WorldViewSection />
      </div>

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
