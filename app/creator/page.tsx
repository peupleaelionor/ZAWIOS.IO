import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Award,
  BarChart2,
  CheckCircle,
  Crown,
  ExternalLink,
  LayoutDashboard,
  Megaphone,
  PenTool,
  Search,
  Share2,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creator',
  description: 'Build your public credibility. Publish analyses, get your Creator badge, and become a recognized voice on ZAWIOS.',
}

const creatorFeatures = [
  {
    icon: Crown,
    title: 'Creator badge',
    description: 'A visible badge on your profile and predictions that signals your commitment to quality analysis.',
    color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30',
  },
  {
    icon: PenTool,
    title: 'Publish analyses',
    description: 'Write and publish in-depth analyses attached to your predictions. Share your reasoning with the community.',
    color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30',
  },
  {
    icon: LayoutDashboard,
    title: 'Personal dashboard',
    description: 'A public-facing dashboard that showcases your track record, accuracy, and top predictions.',
    color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30',
  },
  {
    icon: Star,
    title: 'Enriched profile',
    description: 'Enhanced profile with detailed stats, category breakdowns, and visual credibility indicators.',
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
  },
  {
    icon: Award,
    title: 'Featured in rankings',
    description: 'Get priority placement in category rankings and discovery feeds. More visibility, more credibility.',
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: BarChart2,
    title: 'Detailed credibility stats',
    description: 'Deep analytics on your credibility: accuracy by category, confidence calibration, and trend lines.',
    color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30',
  },
  {
    icon: Share2,
    title: 'Shareable profile links',
    description: 'Clean, branded links to share your profile and predictions on social media and other platforms.',
    color: 'text-sky-600 bg-sky-50 dark:bg-sky-900/30',
  },
  {
    icon: Search,
    title: 'Priority in search',
    description: 'Your predictions and profile appear higher in search results and recommendation feeds.',
    color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/30',
  },
]

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-purple-950/30" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl" />

          <div className="container relative text-center">
            <Badge className="mb-6 inline-flex gap-2 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              <Crown className="w-3 h-3" />
              Creator
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight mb-6">
              Your predictions deserve<br />
              <span className="gradient-text">an audience</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
              The Creator plan is for analysts, thinkers, and domain experts who want to build
              a public track record and be recognized for their insight.
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">$19</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-sm text-zinc-500 mb-6">
              or $159/year (save 30%)
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup?plan=creator">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-purple-600 hover:bg-purple-700">
                  Become a Creator <ArrowRight className="w-4 h-4" />
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

        {/* What's included */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                Built for recognized voices
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Everything in Premium, plus the tools to build public credibility and a recognized analyst profile.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {creatorFeatures.map((feature) => (
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

        {/* Profile preview */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                  Your Creator profile
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                  A preview of what your enriched public profile looks like.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    AJ
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Alex Johnson</h3>
                      <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-[10px]">
                        <Crown className="w-2.5 h-2.5 mr-1" /> Creator
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-500">@alexjohnson · San Francisco</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                      Tech analyst & early-stage investor. Focused on AI, crypto markets, and geopolitical shifts.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">342</p>
                    <p className="text-xs text-zinc-500">Predictions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-600">78%</p>
                    <p className="text-xs text-zinc-500">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">#12</p>
                    <p className="text-xs text-zinc-500">Global rank</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-indigo-600">4,210</p>
                    <p className="text-xs text-zinc-500">Score</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="success" className="text-[10px]">Top 1% in Tech</Badge>
                  <Badge variant="default" className="text-[10px]">Top 5% in Finance</Badge>
                  <Badge variant="outline" className="text-[10px]">
                    <ExternalLink className="w-2.5 h-2.5 mr-1" /> zawios.io/alexjohnson
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-700">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Build your reputation publicly
            </h2>
            <p className="text-purple-200 mb-8 max-w-md mx-auto">
              Your track record is your credential. The Creator plan gives you the tools to prove it.
            </p>
            <Link href="/auth/signup?plan=creator">
              <Button size="lg" variant="secondary" className="gap-2">
                Become a Creator <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
