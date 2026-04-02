import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconTarget, IconChart, IconTrophy, IconGlobe, IconShield, IconUsers, IconCheck, IconArrows, IconTrending, IconZap } from '@/components/ui/icons'
import { mockPredictions, PLATFORM_STATS, mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

export default function HomePage() {
  const featuredPredictions = mockPredictions.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <GridBackground />
        <Orb color="var(--accent)" size={500} top="-10%" right="-5%" />
        <Orb color="var(--teal)" size={350} bottom="-10%" left="-5%" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center rv">
            <Badge variant="default" className="mb-6 inline-flex gap-2">
              <IconZap className="w-3 h-3" size={12} />
              Now in beta · {formatNumber(PLATFORM_STATS.total_users)} predictors joined
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text)] leading-tight mb-6" style={{ fontFamily: 'var(--font)' }}>
              See what the crowd thinks{' '}
              <span className="gradient-text">before it&apos;s right</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text2)] mb-8 max-w-xl mx-auto leading-relaxed">
              ZAWIOS is the collective intelligence platform where your predictions build your reputation.
              Vote, predict, compare — and see who sees the future first.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Join the beta <IconArrows className="w-4 h-4" size={16} />
                </Button>
              </Link>
              <Link href="/predictions">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore predictions
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto ri" style={{ animationDelay: '0.2s' }}>
            {[
              { label: 'Active predictors', value: formatNumber(PLATFORM_STATS.total_users) },
              { label: 'Predictions made', value: formatNumber(PLATFORM_STATS.total_predictions) },
              { label: 'Votes cast', value: formatNumber(PLATFORM_STATS.total_votes) },
              { label: 'Average accuracy', value: `${PLATFORM_STATS.avg_accuracy}%` },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 surface glass rounded-2xl">
                <p className="text-2xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>{stat.value}</p>
                <p className="text-xs text-[var(--text3)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              Three steps to collective intelligence
            </h2>
            <p className="mt-4 text-[var(--text2)] max-w-lg mx-auto">
              ZAWIOS turns your opinions into data. Build a track record. See the signal in the crowd.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                icon: <IconTrending className="w-6 h-6" size={24} />,
                title: 'Predict',
                description: 'Take a position on any future event. From AI breakthroughs to elections, markets to sports — your call.',
                color: 'var(--accent)',
              },
              {
                step: '02',
                icon: <IconChart className="w-6 h-6" size={24} />,
                title: 'Compare',
                description: 'See how your intuition stacks up against thousands of others. Real-time crowd signals, live probability shifts.',
                color: 'var(--teal)',
              },
              {
                step: '03',
                icon: <IconTrophy className="w-6 h-6" size={24} />,
                title: 'Build Reputation',
                description: 'Every correct prediction boosts your score. Build a public track record that speaks for itself.',
                color: 'var(--amber)',
              },
            ].map((item) => (
              <div key={item.step} className="text-center group rv" style={{ animationDelay: `${parseInt(item.step) * 0.15}s` }}>
                <div className="relative inline-flex mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                    style={{ background: `color-mix(in srgb, ${item.color} 15%, transparent)`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-3">{item.title}</h3>
                <p className="text-[var(--text2)] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Pillars */}
      <section className="py-20 bg-[var(--bg2)]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconUsers className="w-6 h-6" size={24} />,
                title: 'Community',
                description: 'Join 47,000+ thinkers, analysts, and researchers making sense of the future together.',
                features: ['Real-time crowd sentiment', 'Category communities', 'Public profiles', 'Social reputation'],
              },
              {
                icon: <IconChart className="w-6 h-6" size={24} />,
                title: 'Data',
                description: 'Every vote is a data point. See trends, track shifts in crowd confidence, and access historical accuracy data.',
                features: ['Live probability charts', 'Historical accuracy', 'Category trends', 'Export CSV (Premium)'],
              },
              {
                icon: <IconTrophy className="w-6 h-6" size={24} />,
                title: 'Reputation',
                description: 'Your prediction track record is your credential. Build a transparent, verifiable reputation that compounds.',
                features: ['Accuracy score', 'Global ranking', 'Category mastery', 'Credibility badges'],
              },
            ].map((feature) => (
              <div key={feature.title} className="surface rounded-2xl p-8 card-hover relative overflow-hidden">
                <div className="accent-line-top" />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(124,110,240,0.1)', color: 'var(--accent2)' }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-3">{feature.title}</h3>
                <p className="text-[var(--text2)] text-sm leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text2)]">
                      <IconCheck className="w-4 h-4 flex-shrink-0" size={16} style={{ color: 'var(--teal)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured predictions */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label">Live predictions</p>
              <h2 className="text-3xl font-bold text-[var(--text)]">Trending right now</h2>
              <p className="mt-2 text-[var(--text2)]">The predictions the community is talking about</p>
            </div>
            <Link href="/predictions" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-1">
                View all <IconArrows className="w-3.5 h-3.5" size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPredictions.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="py-20 bg-[var(--bg2)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="section-label">Leaderboard</p>
              <h2 className="text-3xl font-bold text-[var(--text)]">Top predictors</h2>
              <p className="mt-2 text-[var(--text2)]">These are the minds with the best track records on ZAWIOS</p>
            </div>

            <div className="surface rounded-2xl overflow-hidden">
              {mockLeaderboard.slice(0, 5).map((entry, index) => (
                <div
                  key={entry.user.id}
                  className={`flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors ${
                    index < 4 ? 'border-b border-[var(--border)]' : ''
                  }`}
                >
                  <span className={`text-sm font-bold w-6 text-center ${
                    index === 0 ? 'text-[var(--amber)]' : index === 1 ? 'text-[var(--text3)]' : index === 2 ? 'text-[#cd7f32]' : 'text-[var(--text3)]'
                  }`} style={{ fontFamily: 'var(--mono)' }}>
                    {index + 1}
                  </span>
                  <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text)] truncate">{entry.user.full_name}</p>
                    <p className="text-xs text-[var(--text3)]">@{entry.user.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>{formatNumber(entry.score)}</p>
                    <p className="text-xs text-[var(--text3)]">{entry.accuracy_rate}% accurate</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link href="/leaderboard">
                <Button variant="outline" size="sm" className="gap-1">
                  See full leaderboard <IconArrows className="w-3.5 h-3.5" size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global */}
      <section className="py-20 bg-[var(--bg)] relative overflow-hidden">
        <GridBackground />
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(124,110,240,0.1)', color: 'var(--accent2)' }}
            >
              <IconGlobe className="w-7 h-7" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text)] mb-4">
              Built for a global community
            </h2>
            <p className="text-[var(--text2)] leading-relaxed mb-8">
              Predictors from 94 countries are already on ZAWIOS.
              Finance, technology, politics, science — every topic, every timezone, one shared signal.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '94', label: 'Countries' },
                { value: '8', label: 'Categories' },
                { value: '24/7', label: 'Live signals' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--mono)' }}>{s.value}</p>
                  <p className="text-sm text-[var(--text3)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)' }}>
        <div className="container text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start predicting now
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Join 47,000 predictors already building their reputation on ZAWIOS. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 bg-white text-[var(--accent)] hover:bg-white/90 border-0">
                Create free account <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
            <Link href="/predictions">
              <Button size="lg" className="w-full sm:w-auto border border-white/30 bg-white/10 text-white hover:bg-white/20 shadow-none">
                Browse predictions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
