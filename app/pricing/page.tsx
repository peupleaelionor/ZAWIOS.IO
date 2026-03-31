'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, X, ArrowRight, Sparkles, Zap, Crown, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { PLANS, ADD_ONS, getAnnualSavings } from '@/lib/plans'
import { trackUpgradeClick, trackPricingToggle, trackAddOnClick } from '@/lib/analytics'
import type { PlanTier, BillingCycle } from '@/types'

const planIcons: Record<PlanTier, React.ReactNode> = {
  free: <Zap className="w-5 h-5" />,
  premium: <Sparkles className="w-5 h-5" />,
  creator: <Crown className="w-5 h-5" />,
  business: <Building2 className="w-5 h-5" />,
}

const planColors: Record<PlanTier, { bg: string; text: string; border: string; icon: string }> = {
  free: {
    bg: 'bg-white dark:bg-zinc-900',
    text: 'text-zinc-900 dark:text-zinc-100',
    border: 'border-zinc-200 dark:border-zinc-800',
    icon: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
  },
  premium: {
    bg: 'bg-indigo-600',
    text: 'text-white',
    border: 'border-indigo-600',
    icon: 'bg-white/20 text-white',
  },
  creator: {
    bg: 'bg-white dark:bg-zinc-900',
    text: 'text-zinc-900 dark:text-zinc-100',
    border: 'border-purple-300 dark:border-purple-800',
    icon: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  },
  business: {
    bg: 'bg-white dark:bg-zinc-900',
    text: 'text-zinc-900 dark:text-zinc-100',
    border: 'border-zinc-200 dark:border-zinc-800',
    icon: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  },
}

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')

  function handleToggle(newCycle: BillingCycle) {
    setCycle(newCycle)
    trackPricingToggle(newCycle)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-20 pb-12 bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950/20">
          <div className="container text-center">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Go deeper. See more.
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
              ZAWIOS is free to use. Upgrade when you want deeper insights,
              more powerful tools, and a stronger reputation.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => handleToggle('monthly')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  cycle === 'monthly'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleToggle('annual')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  cycle === 'annual'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                Annual
                <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                  Save up to 25%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {PLANS.map((plan) => {
                const colors = planColors[plan.tier]
                const isPremium = plan.featured
                const price = cycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
                const savings = getAnnualSavings(plan)

                return (
                  <div
                    key={plan.tier}
                    className={`rounded-2xl p-7 border relative transition-all duration-200 ${colors.bg} ${colors.border} ${
                      isPremium ? 'shadow-xl shadow-indigo-500/20 scale-[1.02] lg:scale-105' : 'card-hover'
                    }`}
                  >
                    {isPremium && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-amber-400 text-amber-900 border-0 shadow-sm">
                          Most popular
                        </Badge>
                      </div>
                    )}

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}>
                      {planIcons[plan.tier]}
                    </div>

                    <h2 className={`text-lg font-bold mb-1 ${isPremium ? 'text-white' : colors.text}`}>
                      {plan.name}
                    </h2>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`text-3xl font-bold ${isPremium ? 'text-white' : colors.text}`}>
                        {price === 0 ? '$0' : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className={`text-sm ${isPremium ? 'text-indigo-200' : 'text-zinc-500'}`}>
                          /{cycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      )}
                    </div>

                    {cycle === 'annual' && savings > 0 && (
                      <p className={`text-xs mb-3 font-medium ${isPremium ? 'text-indigo-200' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        Save {savings}% vs monthly
                      </p>
                    )}

                    <p className={`text-sm mb-6 leading-relaxed ${isPremium ? 'text-indigo-200' : 'text-zinc-500 dark:text-zinc-400'}`}>
                      {plan.tagline}
                    </p>

                    <Link
                      href={plan.href}
                      onClick={() => trackUpgradeClick('pricing_page', plan.tier)}
                    >
                      <Button
                        variant={isPremium ? 'secondary' : plan.tier === 'business' ? 'outline' : 'primary'}
                        className={`w-full mb-6 ${isPremium ? 'bg-white text-indigo-600 hover:bg-indigo-50' : ''}`}
                      >
                        {plan.cta}
                        {plan.tier !== 'free' && <ArrowRight className="w-3.5 h-3.5 ml-1" />}
                      </Button>
                    </Link>

                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature.label} className="flex items-start gap-2 text-sm">
                          {feature.included ? (
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isPremium ? 'text-indigo-200' : feature.highlight ? 'text-indigo-500' : 'text-emerald-500'
                            }`} />
                          ) : (
                            <X className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isPremium ? 'text-indigo-300/40' : 'text-zinc-300 dark:text-zinc-600'
                            }`} />
                          )}
                          <span className={`${
                            isPremium
                              ? feature.included ? 'text-indigo-100' : 'text-indigo-300/50'
                              : feature.included
                                ? feature.highlight
                                  ? 'text-zinc-900 dark:text-zinc-100 font-medium'
                                  : 'text-zinc-600 dark:text-zinc-400'
                                : 'text-zinc-400 dark:text-zinc-600'
                          }`}>
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                Compare all features
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Every plan includes the essentials. Higher tiers unlock deeper tools.
              </p>
            </div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-4 px-4 font-medium text-zinc-500">Feature</th>
                    {PLANS.map((plan) => (
                      <th key={plan.tier} className="text-center py-4 px-4">
                        <span className={`font-semibold ${plan.featured ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Vote on predictions', tiers: [true, true, true, true] },
                    { feature: 'Public profile', tiers: [true, true, true, true] },
                    { feature: 'Leaderboard', tiers: [true, true, true, true] },
                    { feature: 'Community access', tiers: [true, true, true, true] },
                    { feature: 'Prediction history', tiers: ['30 days', 'Full', 'Full', 'Full'] },
                    { feature: 'Advanced analytics', tiers: [false, true, true, true] },
                    { feature: 'Category filters', tiers: [false, true, true, true] },
                    { feature: 'Custom alerts', tiers: [false, true, true, true] },
                    { feature: 'Crowd trends', tiers: [false, true, true, true] },
                    { feature: 'Compare predictors', tiers: [false, true, true, true] },
                    { feature: 'CSV export', tiers: [false, 'Limited', 'Full', 'Full'] },
                    { feature: 'Premium badge', tiers: [false, true, true, true] },
                    { feature: 'Enriched profile', tiers: [false, false, true, true] },
                    { feature: 'Creator badge', tiers: [false, false, true, true] },
                    { feature: 'Publish analyses', tiers: [false, false, true, true] },
                    { feature: 'Personal dashboard', tiers: [false, false, true, true] },
                    { feature: 'Featured in rankings', tiers: [false, false, true, true] },
                    { feature: 'Private dashboard', tiers: [false, false, false, true] },
                    { feature: 'Reports & insights', tiers: [false, false, false, true] },
                    { feature: 'API access', tiers: [false, false, false, true] },
                    { feature: 'Multi-user workspace', tiers: [false, false, false, true] },
                    { feature: 'Dedicated support', tiers: [false, false, false, true] },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">{row.feature}</td>
                      {row.tiers.map((val, i) => (
                        <td key={i} className="text-center py-3 px-4">
                          {val === true ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : val === false ? (
                            <span className="text-zinc-300 dark:text-zinc-600">—</span>
                          ) : (
                            <span className="text-zinc-600 dark:text-zinc-400 text-xs font-medium">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-16 bg-white dark:bg-zinc-950">
          <div className="container">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-3">Add-ons</Badge>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                Go even further
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
                Enhance your experience with targeted packs. Each one adds depth, comfort, or visibility — no pressure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {ADD_ONS.map((addon) => (
                <div
                  key={addon.slug}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 card-hover"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {addon.name}
                    </h3>
                    <div className="text-right flex-shrink-0 ml-3">
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{addon.price}</span>
                      <span className="text-xs text-zinc-500">{addon.frequency}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                    {addon.description}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {addon.availableFor.map((tier) => (
                      <span key={tier} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 capitalize">
                        {tier}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
                Common questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Is ZAWIOS really free?',
                    a: 'Yes. You can vote, predict, build your profile, and compete on the leaderboard entirely for free. Premium features add depth and convenience, but the core experience is always free.',
                  },
                  {
                    q: 'Can I upgrade or downgrade anytime?',
                    a: 'Absolutely. You can change your plan at any time. If you downgrade, you keep access until the end of your billing period. No lock-in, no penalties.',
                  },
                  {
                    q: 'Is this gambling?',
                    a: 'No. ZAWIOS is a reputation and intelligence platform. There is no real money wagering, no tokens, no wallets, and no speculative mechanisms. Your predictions build your reputation — not your balance.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit cards and debit cards. Annual plans offer significant savings. Enterprise billing is available for Business accounts.',
                  },
                  {
                    q: 'What happens to my data if I downgrade?',
                    a: 'Your data is never deleted. If you downgrade, you simply lose access to premium features — but your history, predictions, and reputation score remain intact.',
                  },
                ].map((faq) => (
                  <div key={faq.q} className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{faq.q}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to see the full picture?
            </h2>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto">
              Start free. Upgrade when the depth matters. Your reputation grows either way.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                  Create free account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/premium">
                <Button size="lg" className="w-full sm:w-auto border border-white/30 bg-white/10 text-white hover:bg-white/20">
                  Explore Premium
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
