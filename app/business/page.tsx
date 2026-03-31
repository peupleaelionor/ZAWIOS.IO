import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  BarChart2,
  Building2,
  CheckCircle,
  Code,
  FileText,
  Globe,
  LayoutDashboard,
  LineChart,
  Lock,
  Shield,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business & Pro',
  description: 'Aggregated intelligence, private dashboards, API access, and reports for teams, brands, and organizations.',
}

const businessFeatures = [
  {
    icon: LayoutDashboard,
    title: 'Private team dashboard',
    description: 'A dedicated workspace for your team to track predictions, monitor trends, and collaborate on insights.',
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: FileText,
    title: 'Weekly & monthly reports',
    description: 'Automated reports with aggregated signals, accuracy trends, and category-level analysis delivered to your inbox.',
    color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30',
  },
  {
    icon: BarChart2,
    title: 'Aggregated category insights',
    description: 'See aggregated crowd sentiment and accuracy data across any category — finance, tech, politics, and more.',
    color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30',
  },
  {
    icon: Code,
    title: 'API access',
    description: 'Programmatic access to ZAWIOS data for integration into your existing tools, dashboards, and workflows.',
    color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30',
  },
  {
    icon: Lock,
    title: 'Anonymized cohort data',
    description: 'Access aggregated, anonymized data sets to identify patterns and signals without compromising privacy.',
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
  },
  {
    icon: LineChart,
    title: 'Market & community signals',
    description: 'Real-time signals from the ZAWIOS community — crowd confidence shifts, emerging trends, and consensus data.',
    color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30',
  },
  {
    icon: Users,
    title: 'Multi-user workspace',
    description: 'Invite team members to collaborate. Share dashboards, annotate predictions, and track team accuracy.',
    color: 'text-sky-600 bg-sky-50 dark:bg-sky-900/30',
  },
  {
    icon: Shield,
    title: 'Dedicated support',
    description: 'Priority support with a dedicated account manager for onboarding, integration, and custom needs.',
    color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/30',
  },
]

const useCases = [
  {
    icon: Building2,
    label: 'Brands & Media',
    description: 'Monitor crowd sentiment on industry trends. Source data-backed narratives for editorial and marketing.',
  },
  {
    icon: BarChart2,
    label: 'Research & Analytics',
    description: 'Access aggregated prediction data for academic research, market analysis, and forecasting models.',
  },
  {
    icon: Globe,
    label: 'Investors & VCs',
    description: 'Track crowd confidence on emerging technologies, markets, and geopolitical events in real time.',
  },
  {
    icon: Users,
    label: 'Teams & Organizations',
    description: 'Build internal prediction cultures. Track team accuracy and use collective intelligence for better decisions.',
  },
]

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950/20" />
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-3xl" />

          <div className="container relative text-center">
            <Badge className="mb-6 inline-flex gap-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <Building2 className="w-3 h-3" />
              Business & Pro
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight mb-6">
              Collective intelligence,<br />
              <span className="gradient-text">for your organization</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
              Private dashboards, aggregated insights, API access, and reports —
              built for teams, brands, researchers, and investors who need crowd intelligence at scale.
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">$99</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <p className="text-sm text-zinc-500 mb-6">
              or $899/year (save 25%) · Custom enterprise pricing available
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact?plan=business">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700">
                  Contact sales <ArrowRight className="w-4 h-4" />
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
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                Enterprise-grade intelligence
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Everything in Creator, plus the infrastructure for teams and organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {businessFeatures.map((feature) => (
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

        {/* Use cases */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                Built for
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Organizations that want to tap into collective intelligence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {useCases.map((useCase) => (
                <div
                  key={useCase.label}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <useCase.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{useCase.label}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data highlight */}
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">
                  The data behind the crowd
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-emerald-400">542K+</p>
                    <p className="text-sm text-zinc-400 mt-1">Votes analyzed</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-indigo-400">1.3K+</p>
                    <p className="text-sm text-zinc-400 mt-1">Active predictions</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-400">8</p>
                    <p className="text-sm text-zinc-400 mt-1">Categories tracked</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-amber-400">94</p>
                    <p className="text-sm text-zinc-400 mt-1">Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Let&apos;s build your intelligence layer
            </h2>
            <p className="text-emerald-200 mb-8 max-w-md mx-auto">
              Whether you&apos;re a research team, a media company, or an investment firm —
              ZAWIOS gives you the crowd signal you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact?plan=business">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                  Contact sales <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/signup?plan=business">
                <Button size="lg" className="w-full sm:w-auto border border-white/30 bg-white/10 text-white hover:bg-white/20">
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
