import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, BarChart2, Award, CheckCircle, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PredictionCard } from '@/components/predictions/prediction-card'
import { mockPredictions, PLATFORM_STATS, mockLeaderboard } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

export default function HomePage() {
  const featuredPredictions = mockPredictions.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-indigo-950/30" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="default" className="mb-6 inline-flex gap-2">
              <Zap className="w-3 h-3" />
              Now in beta · {formatNumber(PLATFORM_STATS.total_users)} predictors joined
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white leading-tight mb-6">
              See what the crowd thinks{' '}
              <span className="gradient-text">before it&apos;s right</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
              ZAWIOS is the collective intelligence platform where your predictions build your reputation.
              Vote, predict, compare — and see who sees the future first.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Join the beta <ArrowRight className="w-4 h-4" />
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
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Active predictors', value: formatNumber(PLATFORM_STATS.total_users) },
              { label: 'Predictions made', value: formatNumber(PLATFORM_STATS.total_predictions) },
              { label: 'Votes cast', value: formatNumber(PLATFORM_STATS.total_votes) },
              { label: 'Average accuracy', value: `${PLATFORM_STATS.avg_accuracy}%` },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">How it works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              Three steps to collective intelligence
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              ZAWIOS turns your opinions into data. Build a track record. See the signal in the crowd.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                icon: TrendingUp,
                title: 'Predict',
                description: 'Take a position on any future event. From AI breakthroughs to elections, markets to sports — your call.',
                color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30',
              },
              {
                step: '02',
                icon: BarChart2,
                title: 'Compare',
                description: 'See how your intuition stacks up against thousands of others. Real-time crowd signals, live probability shifts.',
                color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30',
              },
              {
                step: '03',
                icon: Award,
                title: 'Build Reputation',
                description: 'Every correct prediction boosts your score. Build a public track record that speaks for itself.',
                color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative inline-flex mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} transition-transform group-hover:scale-110 duration-200`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-zinc-300 dark:text-zinc-600">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Community',
                description: 'Join 47,000+ thinkers, analysts, and researchers making sense of the future together. Compare, debate, and learn from the crowd.',
                features: ['Real-time crowd sentiment', 'Category communities', 'Public profiles', 'Social reputation'],
              },
              {
                icon: BarChart2,
                title: 'Data',
                description: 'Every vote is a data point. See trends, track shifts in crowd confidence, and access historical accuracy data across all topics.',
                features: ['Live probability charts', 'Historical accuracy', 'Category trends', 'Export CSV (Premium)'],
              },
              {
                icon: Award,
                title: 'Reputation',
                description: 'Your prediction track record is your credential. Build a transparent, verifiable reputation that compounds over time.',
                features: ['Accuracy score', 'Global ranking', 'Category mastery', 'Credibility badges'],
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
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
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="outline" className="mb-3">Live predictions</Badge>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Trending right now</h2>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">The predictions the community is talking about</p>
            </div>
            <Link href="/predictions" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
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
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-3">Leaderboard</Badge>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Top predictors</h2>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">These are the minds with the best track records on ZAWIOS</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {mockLeaderboard.slice(0, 5).map((entry, index) => (
                <div
                  key={entry.user.id}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    index < mockLeaderboard.slice(0, 5).length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
                  }`}
                >
                  <span className={`text-sm font-bold w-6 text-center ${
                    index === 0 ? 'text-amber-500' : index === 1 ? 'text-zinc-400' : index === 2 ? 'text-amber-700' : 'text-zinc-400'
                  }`}>
                    {index + 1}
                  </span>
                  <Avatar src={entry.user.avatar_url} name={entry.user.full_name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{entry.user.full_name}</p>
                    <p className="text-xs text-zinc-500">@{entry.user.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{formatNumber(entry.score)}</p>
                    <p className="text-xs text-zinc-500">{entry.accuracy_rate}% accurate</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link href="/leaderboard">
                <Button variant="outline" size="sm" className="gap-1">
                  See full leaderboard <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-7 h-7 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Built for a global community
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
              Predictors from 94 countries are already on ZAWIOS.
              Finance, technology, politics, science — every topic, every timezone, one shared signal.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">94</p>
                <p className="text-sm text-zinc-500">Countries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">8</p>
                <p className="text-sm text-zinc-500">Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">24/7</p>
                <p className="text-sm text-zinc-500">Live signals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start predicting now
          </h2>
          <p className="text-indigo-200 mb-8 max-w-md mx-auto">
            Join 47,000 predictors already building their reputation on ZAWIOS. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                Create free account <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/predictions">
              <Button size="lg" className="w-full sm:w-auto border border-white/30 bg-white/10 text-white hover:bg-white/20">
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
