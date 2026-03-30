import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for ZAWIOS. Free forever, with optional Premium features.',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Everything you need to start predicting and building your reputation.',
    cta: 'Get started free',
    href: '/auth/signup',
    featured: false,
    features: [
      'Unlimited predictions',
      'Vote on all questions',
      'Public reputation profile',
      'Global leaderboard',
      'Basic statistics',
      '30-day prediction history',
      'Community access',
    ],
  },
  {
    name: 'Premium',
    price: '$9',
    period: '/month',
    description: 'Advanced tools for serious predictors who want full insights and analytics.',
    cta: 'Start Premium',
    href: '/auth/signup?plan=premium',
    featured: true,
    features: [
      'Everything in Free',
      'Full prediction history',
      'Advanced accuracy analytics',
      'Category performance breakdown',
      'Export data as CSV',
      'Custom prediction alerts',
      'Priority moderation',
      'Early access to new features',
      'Premium badge on profile',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
          <div className="container text-center">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Simple, honest pricing</h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              ZAWIOS is free to use. Premium unlocks advanced tools for people who want to go deeper.
              No tricks, no aggressive upsells.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 border ${
                    plan.featured
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {plan.featured && (
                    <Badge className="mb-4 bg-white/20 text-white border-white/30">Most popular</Badge>
                  )}
                  <h2 className={`text-xl font-bold mb-1 ${plan.featured ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={plan.featured ? 'text-indigo-200' : 'text-zinc-500'}>{plan.period}</span>
                    )}
                  </div>
                  <p className={`text-sm mb-6 leading-relaxed ${plan.featured ? 'text-indigo-200' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {plan.description}
                  </p>
                  <Link href={plan.href}>
                    <Button
                      variant={plan.featured ? 'secondary' : 'primary'}
                      className={`w-full mb-6 ${plan.featured ? 'bg-white text-indigo-600 hover:bg-indigo-50' : ''}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.featured ? 'text-indigo-200' : 'text-emerald-500'}`} />
                        <span className={plan.featured ? 'text-indigo-100' : 'text-zinc-600 dark:text-zinc-400'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
