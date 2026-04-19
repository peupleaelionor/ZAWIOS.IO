import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconArrows, IconTrophy, IconChart, IconTarget, IconMedal, IconUsers, IconEye, IconTrending, IconGlobe } from '@/components/ui/icons'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creator',
  description: 'Build your public credibility. Publish analyses, get your Creator badge, and become a recognized voice on ZAWIOS.',
}

const creatorFeatures = [
  { icon: IconTrophy, title: 'Creator badge', description: 'A visible badge on your profile and signals that marks your commitment to quality analysis.', color: 'var(--teal)' },
  { icon: IconChart, title: 'Publish analyses', description: 'Write and publish in-depth analyses attached to your signals. Share your reasoning with the community.', color: 'var(--accent)' },
  { icon: IconTarget, title: 'Personal dashboard', description: 'A public-facing dashboard that showcases your track record, accuracy, and top signals.', color: '#22d3ee' },
  { icon: IconMedal, title: 'Enriched profile', description: 'Enhanced profile with detailed stats, category breakdowns, and visual credibility indicators.', color: 'var(--amber)' },
  { icon: IconTrending, title: 'Featured in rankings', description: 'Get priority placement in category rankings and discovery feeds. More visibility, more credibility.', color: 'var(--teal)' },
  { icon: IconEye, title: 'Detailed credibility stats', description: 'Deep analytics on your credibility: accuracy by category, confidence calibration, and trend lines.', color: '#f472b6' },
  { icon: IconGlobe, title: 'Shareable profile links', description: 'Clean, branded links to share your profile and signals on social media and other platforms.', color: '#60a5fa' },
  { icon: IconUsers, title: 'Priority in search', description: 'Your signals and profile appear higher in search results and recommendation feeds.', color: 'var(--accent2)' },
]

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <GridBackground />
          <Orb color="var(--teal)" size={400} top="-10%" left="15%" />

          <div className="container relative text-center">
            <Badge variant="success" className="mb-6 inline-flex gap-2">
              <IconTrophy className="w-3 h-3" size={12} />
              Creator
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] leading-tight mb-6">
              Your signals deserve<br />
              <span className="gradient-text">an audience</span>
            </h1>
            <p className="text-lg text-[var(--text2)] max-w-xl mx-auto leading-relaxed mb-8">
              The Creator plan is for analysts, thinkers, and domain experts who want to build
              a public track record and be recognized for their insight.
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>$19</span>
              <span className="text-[var(--text3)]">/month</span>
            </div>
            <p className="text-sm text-[var(--text3)] mb-6" style={{ fontFamily: 'var(--mono)' }}>
              or $159/year (save 30%)
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup?plan=creator">
                <Button size="lg" className="w-full sm:w-auto gap-2" style={{ background: 'var(--teal)' }}>
                  Become a Creator <IconArrows className="w-4 h-4" size={16} />
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

        {/* Features */}
        <section className="py-20 bg-[var(--bg)]">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-3">
                Built for recognized voices
              </h2>
              <p className="text-[var(--text2)] max-w-md mx-auto">
                Everything in Premium, plus the tools to build public credibility and a recognized analyst profile.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {creatorFeatures.map((feature) => (
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

        {/* Profile preview */}
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[var(--text)] mb-3">
                  Your Creator profile
                </h2>
                <p className="text-[var(--text2)]">
                  A preview of what your enriched public profile looks like.
                </p>
              </div>

              <div className="surface rounded-2xl p-8">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl" style={{ background: 'linear-gradient(135deg, var(--accent), var(--teal))' }}>
                    AJ
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[var(--text)]">Alex Johnson</h3>
                      <span className="badge-mono" style={{ color: 'var(--teal)', borderColor: 'rgba(52,208,182,0.2)', background: 'rgba(52,208,182,0.1)' }}>
                        Creator
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text3)]">@alexjohnson · San Francisco</p>
                    <p className="text-sm text-[var(--text2)] mt-2">
                      Tech analyst & early-stage investor. Focused on AI, crypto markets, and geopolitical shifts.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 rounded-xl" style={{ background: 'var(--surface2)' }}>
                  {[
                    { value: '342', label: 'Signals', color: 'var(--text)' },
                    { value: '78%', label: 'Accuracy', color: 'var(--teal)' },
                    { value: '#12', label: 'Global rank', color: 'var(--text)' },
                    { value: '4,210', label: 'Score', color: 'var(--accent)' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-lg font-bold" style={{ color: s.color, fontFamily: 'var(--mono)' }}>{s.value}</p>
                      <p className="text-xs text-[var(--text3)]">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="success" className="text-[10px]">Top 1% in Tech</Badge>
                  <Badge variant="default" className="text-[10px]">Top 5% in Finance</Badge>
                  <span className="badge-mono text-[10px]">zawios.io/alexjohnson</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--teal) 0%, var(--accent) 100%)' }}>
          <div className="container text-center relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Build your reputation publicly
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Your track record is your credential. The Creator plan gives you the tools to prove it.
            </p>
            <Link href="/auth/signup?plan=creator">
              <Button size="lg" className="gap-2 bg-white text-[var(--accent)] hover:bg-white/90 border-0 shadow-none">
                Become a Creator <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
