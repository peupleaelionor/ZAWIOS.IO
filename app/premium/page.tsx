import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconArrows, IconChart, IconTrending, IconUsers, IconEye, IconDatabase, IconZap, IconMedal, IconTarget, IconShield } from '@/components/ui/icons'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium',
  description: 'Unlock advanced analytics, full history, alerts, and deeper insights with ZAWIOS Premium.',
}

const premiumFeatures = [
  { icon: IconDatabase, title: 'Full signal history', description: 'Access your complete track record — every signal, every outcome, every detail. No 30-day limit.', color: 'var(--accent)' },
  { icon: IconChart, title: 'Advanced accuracy analytics', description: 'Deep breakdowns of your accuracy by category, time period, signal type, and confidence level.', color: 'var(--teal)' },
  { icon: IconTarget, title: 'Category & period filters', description: 'Slice and filter signals by topic, date range, accuracy threshold, and more.', color: 'var(--amber)' },
  { icon: IconZap, title: 'Smart alerts', description: 'Get notified when signals you follow are trending, resolving, or shifting in crowd sentiment.', color: '#fb923c' },
  { icon: IconTrending, title: 'Crowd trend analysis', description: 'See how crowd opinion evolves over time. Spot shifts before they become obvious.', color: 'var(--teal)' },
  { icon: IconUsers, title: 'Compare with top analysts', description: 'Benchmark your performance against the leaderboard. See where you lead and where you can improve.', color: '#f472b6' },
  { icon: IconEye, title: 'CSV export', description: 'Export your signal data for personal analysis or to share with others.', color: '#60a5fa' },
  { icon: IconMedal, title: 'Premium badge', description: 'A visible mark on your profile that signals commitment to serious analysis and forecasting.', color: 'var(--accent2)' },
]

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <GridBackground />
          <Orb color="var(--accent)" size={400} top="-10%" right="15%" />
          <Orb color="var(--teal)" size={250} bottom="0" left="10%" />

          <div className="container relative text-center">
            <Badge variant="default" className="mb-6 inline-flex gap-2">
              <IconZap className="w-3 h-3" size={12} />
              Premium
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] leading-tight mb-6">
              See the signals others miss
            </h1>
            <p className="text-lg text-[var(--text2)] max-w-xl mx-auto leading-relaxed mb-8">
              Premium unlocks the full depth of ZAWIOS — complete history, advanced analytics,
              crowd trends, and tools that let you go deeper into every signal.
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>$9</span>
              <span className="text-[var(--text3)]">/month</span>
            </div>
            <p className="text-sm text-[var(--text3)] mb-6" style={{ fontFamily: 'var(--mono)' }}>
              or $79/year (save 27%)
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup?plan=premium">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start Premium <IconArrows className="w-4 h-4" size={16} />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Compare all plans
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-20 bg-[var(--bg)]">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-3">
                Everything you get with Premium
              </h2>
              <p className="text-[var(--text2)] max-w-md mx-auto">
                More depth, more clarity, more signal. Every feature is designed to make you a better analyst.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {premiumFeatures.map((feature) => (
                <div key={feature.title} className="group rv">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200"
                    style={{ background: `color-mix(in srgb, ${feature.color} 15%, transparent)`, color: feature.color }}
                  >
                    <feature.icon className="w-6 h-6" size={24} />
                  </div>
                  <h3 className="font-semibold text-[var(--text)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text2)] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                {[
                  { value: '12K+', label: 'Premium members' },
                  { value: '94%', label: 'Retention rate' },
                  { value: '+18%', label: 'Avg. accuracy boost' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--mono)' }}>{s.value}</p>
                    <p className="text-sm text-[var(--text3)]">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[var(--text2)] italic text-lg">
                &ldquo;Premium changed how I approach signals. The analytics alone are worth it.&rdquo;
              </p>
              <p className="text-sm text-[var(--text3)] mt-2" style={{ fontFamily: 'var(--mono)' }}>— Top 50 analyst</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)' }}>
          <div className="container text-center relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start seeing more today
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              No commitment. Cancel anytime. Your reputation keeps growing either way.
            </p>
            <Link href="/auth/signup?plan=premium">
              <Button size="lg" className="gap-2 bg-white text-[var(--accent)] hover:bg-white/90 border-0 shadow-none">
                Get Premium now <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
