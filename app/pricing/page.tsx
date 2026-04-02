'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GridBackground, Orb } from '@/components/ui/effects'
import { IconCheck, IconArrows, IconZap, IconTrophy, IconShield, IconChart } from '@/components/ui/icons'
import Link from 'next/link'
import { useState } from 'react'
import { PLANS, ADD_ONS, getAnnualSavings } from '@/lib/plans'
import { trackUpgradeClick, trackPricingToggle, trackAddOnClick } from '@/lib/analytics'
import type { PlanTier, BillingCycle } from '@/types'

const planIcons: Record<PlanTier, React.ReactNode> = {
  free: <IconZap className="w-5 h-5" size={20} />,
  premium: <IconChart className="w-5 h-5" size={20} />,
  creator: <IconTrophy className="w-5 h-5" size={20} />,
  business: <IconShield className="w-5 h-5" size={20} />,
}

const planAccents: Record<PlanTier, string> = {
  free: 'var(--text3)',
  premium: 'var(--accent)',
  creator: 'var(--teal)',
  business: 'var(--amber)',
}

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')

  function handleToggle(newCycle: BillingCycle) {
    setCycle(newCycle)
    trackPricingToggle(newCycle)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-20 pb-12 overflow-hidden">
          <GridBackground />
          <Orb color="var(--accent)" size={400} top="-15%" right="10%" />
          <div className="container text-center relative">
            <p className="section-label">Pricing</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              Go deeper. See more.
            </h1>
            <p className="text-[var(--text2)] max-w-xl mx-auto text-lg leading-relaxed">
              ZAWIOS is free to use. Upgrade when you want deeper insights,
              more powerful tools, and a stronger reputation.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handleToggle('monthly')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  cycle === 'monthly'
                    ? 'bg-[var(--accent)] text-white shadow-sm shadow-[var(--accent)]/20'
                    : 'text-[var(--text3)] hover:text-[var(--text2)]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleToggle('annual')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  cycle === 'annual'
                    ? 'bg-[var(--accent)] text-white shadow-sm shadow-[var(--accent)]/20'
                    : 'text-[var(--text3)] hover:text-[var(--text2)]'
                }`}
              >
                Annual
                <span className="text-xs bg-[var(--teal)]/15 text-[var(--teal)] px-2 py-0.5 rounded-full font-medium">
                  Save up to 25%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 bg-[var(--bg)]">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {PLANS.map((plan) => {
                const accent = planAccents[plan.tier]
                const isPremium = plan.featured
                const price = cycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
                const savings = getAnnualSavings(plan)

                return (
                  <div
                    key={plan.tier}
                    className={`rounded-2xl p-7 relative transition-all duration-200 card-hover ${
                      isPremium
                        ? 'border-2 shadow-lg scale-[1.02] lg:scale-105'
                        : 'border'
                    }`}
                    style={{
                      background: 'var(--surface)',
                      borderColor: isPremium ? accent : 'var(--border2)',
                      boxShadow: isPremium ? `0 0 40px ${accent}20` : undefined,
                    }}
                  >
                    {isPremium && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="badge-mono text-[var(--accent)]" style={{ background: 'var(--accent)', color: '#fff', padding: '2px 12px', borderRadius: '999px', fontSize: '11px' }}>
                          Most popular
                        </span>
                      </div>
                    )}

                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `color-mix(in srgb, ${accent} 15%, transparent)`, color: accent }}
                    >
                      {planIcons[plan.tier]}
                    </div>

                    <h2 className="text-lg font-bold mb-1 text-[var(--text)]">
                      {plan.name}
                    </h2>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
                        {price === 0 ? '$0' : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-sm text-[var(--text3)]">
                          /{cycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      )}
                    </div>

                    {cycle === 'annual' && savings > 0 && (
                      <p className="text-xs mb-3 font-medium text-[var(--teal)]">
                        Save {savings}% vs monthly
                      </p>
                    )}

                    <p className="text-sm mb-6 leading-relaxed text-[var(--text2)]">
                      {plan.tagline}
                    </p>

                    <Link
                      href={plan.href}
                      onClick={() => trackUpgradeClick('pricing_page', plan.tier)}
                    >
                      <Button
                        variant={isPremium ? 'primary' : 'outline'}
                        className="w-full mb-6"
                      >
                        {plan.cta}
                        {plan.tier !== 'free' && <IconArrows className="w-3.5 h-3.5 ml-1" size={14} />}
                      </Button>
                    </Link>

                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature.label} className="flex items-start gap-2 text-sm">
                          {feature.included ? (
                            <IconCheck
                              className="w-4 h-4 flex-shrink-0 mt-0.5"
                              size={16}
                              style={{ color: feature.highlight ? accent : 'var(--teal)' }}
                            />
                          ) : (
                            <span className="w-4 h-4 flex-shrink-0 mt-0.5 flex items-center justify-center text-[var(--text3)]" style={{ opacity: 0.4 }}>—</span>
                          )}
                          <span className={
                            feature.included
                              ? feature.highlight
                                ? 'text-[var(--text)] font-medium'
                                : 'text-[var(--text2)]'
                              : 'text-[var(--text3)]'
                          } style={{ opacity: feature.included ? 1 : 0.5 }}>
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
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-3">
                Compare all features
              </h2>
              <p className="text-[var(--text2)]">
                Every plan includes the essentials. Higher tiers unlock deeper tools.
              </p>
            </div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border2)' }}>
                    <th className="text-left py-4 px-4 font-medium text-[var(--text3)]">Feature</th>
                    {PLANS.map((plan) => (
                      <th key={plan.tier} className="text-center py-4 px-4">
                        <span className={`font-semibold ${plan.featured ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
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
                    <tr key={row.feature} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-3 px-4 text-[var(--text2)]">{row.feature}</td>
                      {row.tiers.map((val, i) => (
                        <td key={i} className="text-center py-3 px-4">
                          {val === true ? (
                            <IconCheck className="w-4 h-4 mx-auto" size={16} style={{ color: 'var(--teal)' }} />
                          ) : val === false ? (
                            <span className="text-[var(--text3)]" style={{ opacity: 0.4 }}>—</span>
                          ) : (
                            <span className="text-[var(--text2)] text-xs font-medium" style={{ fontFamily: 'var(--mono)' }}>{val}</span>
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
        <section className="py-16 bg-[var(--bg)]">
          <div className="container">
            <div className="text-center mb-10">
              <p className="section-label">Add-ons</p>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-3">
                Go even further
              </h2>
              <p className="text-[var(--text2)] max-w-lg mx-auto">
                Enhance your experience with targeted packs. Each one adds depth, comfort, or visibility — no pressure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {ADD_ONS.map((addon) => (
                <div
                  key={addon.slug}
                  className="surface rounded-xl p-5 card-hover"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[var(--text)]">
                      {addon.name}
                    </h3>
                    <div className="text-right flex-shrink-0 ml-3">
                      <span className="text-sm font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>{addon.price}</span>
                      <span className="text-xs text-[var(--text3)]">{addon.frequency}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text3)] leading-relaxed mb-3">
                    {addon.description}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {addon.availableFor.map((tier) => (
                      <span key={tier} className="badge-mono capitalize">
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
        <section className="py-16 bg-[var(--bg2)]">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-8 text-center">
                Common questions
              </h2>
              <div className="space-y-4">
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
                  <div key={faq.q} className="surface rounded-xl p-6">
                    <h3 className="font-semibold text-[var(--text)] mb-2">{faq.q}</h3>
                    <p className="text-sm text-[var(--text2)] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)' }}>
          <div className="container text-center relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to see the full picture?
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Start free. Upgrade when the depth matters. Your reputation grows either way.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-white text-[var(--accent)] hover:bg-white/90 border-0 shadow-none">
                  Create free account <IconArrows className="w-4 h-4" size={16} />
                </Button>
              </Link>
              <Link href="/premium">
                <Button size="lg" className="w-full sm:w-auto border border-white/30 bg-white/10 text-white hover:bg-white/20 shadow-none">
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
