import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { GridBackground, Orb } from '@/components/ui/effects'
import {
  IconTarget,
  IconChart,
  IconTrophy,
  IconGlobe,
  IconUsers,
  IconCheck,
  IconArrows,
  IconTrending,
  IconShield,
} from '@/components/ui/icons'
import { allPredictions, PLATFORM_STATS, mockLeaderboard } from '@/lib/mock-data'
import { CategoriesSection } from '@/components/home/categories-section'
import { WorldViewPreview } from '@/components/home/world-view-preview'
import { HeroVisual } from '@/components/home/hero-visual'
import { QuestionOfDay } from '@/components/home/question-of-day'
import { formatNumber } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

export default function HomePage() {
  const featuredPredictions = allPredictions.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
        <GridBackground />
        <Orb color="var(--accent)" size={480} top="-18%" right="-6%" />
        <Orb color="var(--violet2)" size={340} bottom="-20%" left="-6%" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center rv">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full surface"
              style={{ border: '1px solid var(--border2)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--teal)] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--teal)]" />
              </span>
              <span className="text-xs font-medium text-[var(--text2)]" style={{ fontFamily: 'var(--mono)' }}>
                Beta · {formatNumber(PLATFORM_STATS.total_users)} predictors
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold text-[var(--text)] leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font)', letterSpacing: '-0.02em' }}
            >
              See what the world<br />
              thinks{' '}
              <span className="gradient-text">before it happens</span>
            </h1>

            <p className="text-base md:text-lg text-[var(--text2)] mb-10 max-w-lg mx-auto leading-relaxed">
              The collective intelligence platform where prediction accuracy builds reputation.
              Vote, compare, and track who calls it right.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto gap-2 px-8">
                  Join the beta <IconArrows className="w-4 h-4" size={16} />
                </Button>
              </Link>
              <Link href="/predictions">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  Explore predictions
                </Button>
              </Link>
            </div>
          </div>

          {/* ── Product visual ── */}
          <div className="mt-14 max-w-2xl mx-auto px-4">
            <HeroVisual />
          </div>

          {/* ── Unified stats bar ── */}
          <div
            className="mt-10 max-w-2xl mx-auto surface ri"
            style={{
              animationDelay: '0.25s',
              borderRadius: 'var(--radius)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          >
            {[
              { label: 'Predictors', value: formatNumber(PLATFORM_STATS.total_users) },
              { label: 'Predictions', value: formatNumber(PLATFORM_STATS.total_predictions) },
              { label: 'Votes cast', value: formatNumber(PLATFORM_STATS.total_votes) },
              { label: 'Avg accuracy', value: `${PLATFORM_STATS.avg_accuracy}%` },
            ].map((stat, i, arr) => (
              <div
                key={stat.label}
                className="py-5 px-4 text-center"
                style={i < arr.length - 1 ? { borderRight: '1px solid var(--border)' } : {}}
              >
                <p
                  className="text-xl md:text-2xl font-bold text-[var(--text)]"
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text3)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuestionOfDay />

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg2)]">
        <div className="container">
          <div className="mb-14">
            <p className="section-label">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.01em' }}>
              Three steps to collective intelligence
            </h2>
            <p className="mt-3 text-[var(--text2)] max-w-md">
              ZAWIOS converts crowd opinions into measurable forecasts. Build a track record. Find who gets it right, consistently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                icon: <IconTrending className="w-5 h-5" size={20} />,
                title: 'Predict',
                description: 'Take a position on any future event. Markets, elections, AI, science — your call, on record.',
                accent: 'var(--accent)',
              },
              {
                step: '02',
                icon: <IconChart className="w-5 h-5" size={20} />,
                title: 'Compare',
                description: 'See how your intuition stacks against thousands of others. Real-time crowd signals, live probability shifts.',
                accent: 'var(--teal)',
              },
              {
                step: '03',
                icon: <IconTrophy className="w-5 h-5" size={20} />,
                title: 'Build reputation',
                description: 'Every correct call builds your accuracy score. A public track record that speaks for itself — no followers, no engagement, just outcomes.',
                accent: 'var(--amber)',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative surface p-7 card-hover overflow-hidden rv"
                style={{ animationDelay: `${parseInt(item.step) * 0.12}s` }}
              >
                {/* Left accent border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[var(--radius)]"
                  style={{ background: item.accent }}
                />
                {/* Step number */}
                <span
                  className="text-xs font-bold text-[var(--text3)] mb-4 block"
                  style={{ fontFamily: 'var(--mono)' }}
                >
                  {item.step}
                </span>
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `color-mix(in srgb, ${item.accent} 12%, transparent)`,
                    color: item.accent,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text2)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* ── PILLARS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg)]">
        <div className="container">
          <div className="mb-14">
            <p className="section-label">Platform</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.01em' }}>
              Community. Data. Reputation.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <IconUsers className="w-5 h-5" size={20} />,
                title: 'Community',
                description: 'Join 47,000+ forecasters, analysts, and researchers already building their track record on ZAWIOS.',
                features: ['Real-time crowd sentiment', 'Category communities', 'Public profiles', 'Social reputation'],
                accent: 'var(--accent)',
              },
              {
                icon: <IconChart className="w-5 h-5" size={20} />,
                title: 'Data',
                description: 'Every vote is a data point. See trends, track probability shifts, access historical accuracy.',
                features: ['Live probability charts', 'Historical accuracy', 'Category trends', 'CSV export (Premium)'],
                accent: 'var(--teal)',
              },
              {
                icon: <IconTrophy className="w-5 h-5" size={20} />,
                title: 'Reputation',
                description: 'Your prediction track record is your credential — measurable, public, transparent. Earned through accuracy, not noise.',
                features: ['Accuracy score', 'Global ranking', 'Category mastery', 'Credibility badges'],
                accent: 'var(--amber)',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="surface rounded-2xl p-7 card-hover relative overflow-hidden group"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                    opacity: 0.5,
                  }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: `color-mix(in srgb, ${feature.accent} 12%, transparent)`,
                    color: feature.accent,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-3">{feature.title}</h3>
                <p className="text-sm text-[var(--text2)] leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-2.5">
                  {feature.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text2)]">
                      <IconCheck
                        className="w-3.5 h-3.5 flex-shrink-0"
                        size={14}
                        style={{ color: feature.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE PREDICTIONS ─────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg2)]">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Live</p>
              <h2 className="text-3xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.01em' }}>
                Trending right now
              </h2>
              <p className="mt-2 text-sm text-[var(--text2)]">The predictions the community is tracking</p>
            </div>
            <Link href="/predictions" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-1.5">
                View all <IconArrows className="w-3.5 h-3.5" size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {featuredPredictions.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>

          <div className="mt-6 md:hidden text-center">
            <Link href="/predictions">
              <Button variant="outline" size="sm" className="gap-1.5">
                View all predictions <IconArrows className="w-3.5 h-3.5" size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <WorldViewPreview />

      {/* ── LEADERBOARD ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <p className="section-label">Leaderboard</p>
              <h2 className="text-3xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.01em' }}>
                Top predictors
              </h2>
              <p className="mt-2 text-sm text-[var(--text2)]">
                The minds with the highest accuracy on ZAWIOS
              </p>
            </div>

            <div className="surface rounded-2xl overflow-hidden">
              <div className="px-5 py-3 flex items-center" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}>
                <span className="w-6 text-xs text-[var(--text3)] text-center" style={{ fontFamily: 'var(--mono)' }}>#</span>
                <span className="flex-1 ml-10 text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>PREDICTOR</span>
                <span className="text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>SCORE / ACCURACY</span>
              </div>
              {mockLeaderboard.slice(0, 5).map((entry, index) => (
                <div
                  key={entry.user.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  style={index < 4 ? { borderBottom: '1px solid var(--border)' } : {}}
                >
                  <span
                    className="text-sm font-bold w-6 text-center flex-shrink-0"
                    style={{
                      fontFamily: 'var(--mono)',
                      color: index === 0 ? 'var(--amber)' : index === 1 ? 'var(--text2)' : index === 2 ? '#cd7f32' : 'var(--text3)',
                    }}
                  >
                    {index + 1}
                  </span>
                  <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text)] truncate">{entry.user.full_name}</p>
                    <p className="text-xs text-[var(--text3)]">@{entry.user.username}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
                      {formatNumber(entry.score)}
                    </p>
                    <p className="text-xs text-[var(--teal)]">{entry.accuracy_rate}%</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link href="/leaderboard">
                <Button variant="outline" size="sm" className="gap-1.5">
                  Full leaderboard <IconArrows className="w-3.5 h-3.5" size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg2)] relative overflow-hidden">
        <GridBackground />
        <div className="container relative">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="section-label">Global</p>
                <h2 className="text-3xl font-bold text-[var(--text)] mt-1 mb-4" style={{ letterSpacing: '-0.01em' }}>
                  Built for a worldwide community
                </h2>
                <p className="text-sm text-[var(--text2)] leading-relaxed">
                  Forecasters from 94 countries use ZAWIOS daily.
                  Finance, technology, politics, science — every category, every timezone, one shared intelligence layer.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '94', label: 'Countries', icon: <IconGlobe size={16} /> },
                  { value: '8', label: 'Categories', icon: <IconTarget size={16} /> },
                  { value: '24/7', label: 'Live signals', icon: <IconTrending size={16} /> },
                ].map((s) => (
                  <div key={s.label} className="surface p-4 rounded-xl text-center">
                    <div className="text-[var(--text3)] flex justify-center mb-2">{s.icon}</div>
                    <p
                      className="text-xl font-bold text-[var(--text)]"
                      style={{ fontFamily: 'var(--mono)' }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-[var(--text3)] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <IconShield size={18} />,
                  title: 'Transparent scoring',
                  description: 'Every accuracy score is calculated from public, verifiable prediction outcomes.',
                },
                {
                  icon: <IconUsers size={18} />,
                  title: 'Open community',
                  description: 'No black boxes. All predictions and results are visible to everyone.',
                },
                {
                  icon: <IconChart size={18} />,
                  title: 'Real data',
                  description: 'Crowd signals driven by real votes, not algorithms or synthetic data.',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
                  <div className="text-[var(--accent2)] mb-3">{item.icon}</div>
                  <h4 className="text-sm font-semibold text-[var(--text)] mb-1.5">{item.title}</h4>
                  <p className="text-xs text-[var(--text3)] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg2)] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 100%, color-mix(in srgb, var(--accent) 10%, transparent), transparent)',
          }}
        />
        <div className="container relative">
          <div
            className="max-w-2xl mx-auto text-center surface py-16 px-8 rounded-2xl relative overflow-hidden"
            style={{ border: '1px solid var(--border2)' }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--teal), transparent)' }}
            />
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Start predicting now
            </h2>
            <p className="text-[var(--text2)] mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              Join {formatNumber(PLATFORM_STATS.total_users)} forecasters already building their track record. Free to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto gap-2 px-8">
                  Create free account <IconArrows className="w-4 h-4" size={16} />
                </Button>
              </Link>
              <Link href="/predictions">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                  Browse predictions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
