import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconArrows, IconShield, IconChart, IconDatabase, IconGlobe, IconUsers, IconTarget, IconTrending } from '@/components/ui/icons'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business & Pro',
  description: 'Aggregated intelligence, private dashboards, API access, and reports for teams, brands, and organizations.',
}

const businessFeatures = [
  { icon: IconTarget, title: 'Private team dashboard', description: 'A dedicated workspace for your team to track predictions, monitor trends, and collaborate on insights.', color: 'var(--teal)' },
  { icon: IconChart, title: 'Weekly & monthly reports', description: 'Automated reports with aggregated signals, accuracy trends, and category-level analysis delivered to your inbox.', color: 'var(--accent)' },
  { icon: IconTrending, title: 'Aggregated category insights', description: 'See aggregated crowd sentiment and accuracy data across any category — finance, tech, politics, and more.', color: 'var(--accent2)' },
  { icon: IconDatabase, title: 'API access', description: 'Programmatic access to ZAWIOS data for integration into your existing tools, dashboards, and workflows.', color: '#22d3ee' },
  { icon: IconShield, title: 'Anonymized cohort data', description: 'Access aggregated, anonymized data sets to identify patterns and signals without compromising privacy.', color: 'var(--amber)' },
  { icon: IconGlobe, title: 'Market & community signals', description: 'Real-time signals from the ZAWIOS community — crowd confidence shifts, emerging trends, and consensus data.', color: '#f472b6' },
  { icon: IconUsers, title: 'Multi-user workspace', description: 'Invite team members to collaborate. Share dashboards, annotate predictions, and track team accuracy.', color: '#60a5fa' },
  { icon: IconShield, title: 'Dedicated support', description: 'Priority support with a dedicated account manager for onboarding, integration, and custom needs.', color: 'var(--accent2)' },
]

const useCases = [
  { icon: IconTrending, label: 'Brands & Media', description: 'Monitor crowd sentiment on industry trends. Source data-backed narratives for editorial and marketing.' },
  { icon: IconChart, label: 'Research & Analytics', description: 'Access aggregated prediction data for academic research, market analysis, and forecasting models.' },
  { icon: IconGlobe, label: 'Investors & VCs', description: 'Track crowd confidence on emerging technologies, markets, and geopolitical events in real time.' },
  { icon: IconUsers, label: 'Teams & Organizations', description: 'Build internal prediction cultures. Track team accuracy and use collective intelligence for better decisions.' },
]

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <GridBackground />
          <Orb color="var(--amber)" size={400} top="-10%" right="20%" />

          <div className="container relative text-center">
            <Badge variant="warning" className="mb-6 inline-flex gap-2">
              <IconShield className="w-3 h-3" size={12} />
              Business & Pro
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] leading-tight mb-6">
              Collective intelligence,<br />
              <span className="gradient-text">for your organization</span>
            </h1>
            <p className="text-lg text-[var(--text2)] max-w-xl mx-auto leading-relaxed mb-8">
              Private dashboards, aggregated insights, API access, and reports —
              built for teams, brands, researchers, and investors who need crowd intelligence at scale.
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>$99</span>
              <span className="text-[var(--text3)]">/month</span>
            </div>
            <p className="text-sm text-[var(--text3)] mb-6" style={{ fontFamily: 'var(--mono)' }}>
              or $899/year (save 25%) · Custom enterprise pricing available
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact?plan=business">
                <Button size="lg" className="w-full sm:w-auto gap-2" style={{ background: 'var(--amber)', color: '#000' }}>
                  Contact sales <IconArrows className="w-4 h-4" size={16} />
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
                Enterprise-grade intelligence
              </h2>
              <p className="text-[var(--text2)] max-w-md mx-auto">
                Everything in Creator, plus the infrastructure for teams and organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {businessFeatures.map((feature) => (
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

        {/* Use cases */}
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-3">Built for</h2>
              <p className="text-[var(--text2)]">Organizations that want to tap into collective intelligence.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {useCases.map((useCase) => (
                <div key={useCase.label} className="surface rounded-xl p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(250,204,21,0.1)', color: 'var(--amber)' }}
                    >
                      <useCase.icon className="w-5 h-5" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text)] mb-1">{useCase.label}</h3>
                      <p className="text-sm text-[var(--text2)] leading-relaxed">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data highlight */}
        <section className="py-16 bg-[var(--bg)]">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="surface rounded-2xl p-10 text-center relative overflow-hidden">
                <div className="accent-line-top" />
                <h3 className="text-2xl font-bold text-[var(--text)] mb-6">
                  The data behind the crowd
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: '542K+', label: 'Votes analyzed', color: 'var(--teal)' },
                    { value: '1.3K+', label: 'Active predictions', color: 'var(--accent)' },
                    { value: '8', label: 'Categories tracked', color: 'var(--accent2)' },
                    { value: '94', label: 'Countries', color: 'var(--amber)' },
                  ].map((d) => (
                    <div key={d.label}>
                      <p className="text-3xl font-bold" style={{ color: d.color, fontFamily: 'var(--mono)' }}>{d.value}</p>
                      <p className="text-sm text-[var(--text3)] mt-1">{d.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--amber) 0%, #fb923c 100%)' }}>
          <div className="container text-center relative">
            <h2 className="text-3xl font-bold text-black mb-4">
              Let&apos;s build your intelligence layer
            </h2>
            <p className="text-black/60 mb-8 max-w-md mx-auto">
              Whether you&apos;re a research team, a media company, or an investment firm —
              ZAWIOS gives you the crowd signal you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact?plan=business">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-black text-white hover:bg-black/80 border-0 shadow-none">
                  Contact sales <IconArrows className="w-4 h-4" size={16} />
                </Button>
              </Link>
              <Link href="/auth/signup?plan=business">
                <Button size="lg" className="w-full sm:w-auto border border-black/20 bg-black/10 text-black hover:bg-black/20 shadow-none">
                  Start free trial
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
