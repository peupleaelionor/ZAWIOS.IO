import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  BarChart2,
  Bell,
  CheckCircle,
  Clock,
  Download,
  Filter,
  LineChart,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium',
  description: 'Unlock advanced analytics, full history, alerts, and deeper insights with ZAWIOS Premium.',
}

const premiumFeatures = [
  {
    icon: Clock,
    title: 'Full prediction history',
    description: 'Access your complete track record — every prediction, every outcome, every detail. No 30-day limit.',
    color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30',
  },
  {
    icon: BarChart2,
    title: 'Advanced accuracy analytics',
    description: 'Deep breakdowns of your accuracy by category, time period, prediction type, and confidence level.',
    color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30',
  },
  {
    icon: Filter,
    title: 'Category & period filters',
    description: 'Slice and filter predictions by topic, date range, accuracy threshold, and more.',
    color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30',
  },
  {
    icon: Bell,
    title: 'Smart alerts',
    description: 'Get notified when predictions you follow are trending, resolving, or shifting in crowd sentiment.',
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
  },
  {
    icon: TrendingUp,
    title: 'Crowd trend analysis',
    description: 'See how crowd opinion evolves over time. Spot shifts before they become obvious.',
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: Users,
    title: 'Compare with top predictors',
    description: 'Benchmark your performance against the leaderboard. See where you lead and where you can improve.',
    color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30',
  },
  {
    icon: Download,
    title: 'CSV export',
    description: 'Export your prediction data for personal analysis or to share with others.',
    color: 'text-sky-600 bg-sky-50 dark:bg-sky-900/30',
  },
  {
    icon: Sparkles,
    title: 'Premium badge',
    description: 'A visible mark on your profile that signals commitment to serious prediction and analysis.',
    color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/30',
  },
]

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-indigo-950/30" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl" />

          <div className="container relative text-center">
            <Badge variant="default" className="mb-6 inline-flex gap-2">
              <Sparkles className="w-3 h-3" />
              Premium
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight mb-6">
              See the signals others miss
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
              Premium unlocks the full depth of ZAWIOS — complete history, advanced analytics,
              crowd trends, and tools that let you go deeper into every prediction.
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">$9</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-sm text-zinc-500 mb-6">
              or $79/year (save 27%)
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup?plan=premium">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start Premium <ArrowRight className="w-4 h-4" />
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
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                Everything you get with Premium
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                More depth, more clarity, more signal. Every feature is designed to make you a better predictor.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {premiumFeatures.map((feature) => (
                <div key={feature.title} className="group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color} transition-transform group-hover:scale-110 duration-200`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="grid grid-cols-3 gap-8 mb-10">
                <div>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white">12K+</p>
                  <p className="text-sm text-zinc-500">Premium members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white">94%</p>
                  <p className="text-sm text-zinc-500">Retention rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white">+18%</p>
                  <p className="text-sm text-zinc-500">Avg. accuracy boost</p>
                </div>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 italic text-lg">
                &ldquo;Premium changed how I approach predictions. The analytics alone are worth it.&rdquo;
              </p>
              <p className="text-sm text-zinc-500 mt-2">— Top 50 predictor</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start seeing more today
            </h2>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto">
              No commitment. Cancel anytime. Your reputation keeps growing either way.
            </p>
            <Link href="/auth/signup?plan=premium">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Premium now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
