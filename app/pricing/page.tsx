import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { IconCheck } from '@/components/ui/icons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accès | ZAWIOS',
  description: 'ZAWIOS est gratuit pour participer. Des couches avancées sont disponibles pour les analystes et les organisations.',
}

const TIERS = [
  {
    id: 'free',
    name: 'Gratuit',
    price: null,
    description: 'Participer, voter, construire sa réputation.',
    href: '/auth/signup',
    cta: 'Commencer',
    accent: 'var(--text3)',
    features: [
      'Vote YES / NO / NEUTRE',
      'World View — aperçu',
      'Profil & réputation de base',
      'Classement public',
      'Créer des signaux',
      'Comparaison régionale basique',
    ],
    locked: [],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '12',
    period: '/mois',
    description: 'Analyse avancée, données historiques, précision personnelle.',
    href: '/pro',
    cta: 'Accéder à Pro',
    accent: 'var(--teal)',
    featured: true,
    features: [
      'Tout le niveau Gratuit',
      'Divergence régionale complète',
      'Données historiques — tendances',
      'Évolution des votes dans le temps',
      'Index de polarisation',
      'Taux de neutralité par signal',
      'Dashboard précision personnelle',
      'Heatmap régionale',
      'Métriques réputation avancées',
    ],
    locked: [],
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    price: null,
    description: 'Accès institutionnel, API, données régionales, rapports sur-mesure.',
    href: '/intelligence',
    cta: 'Nous contacter',
    accent: 'var(--accent2)',
    features: [
      'Tout le niveau Pro',
      'Accès API complet',
      'Export de données',
      'Datasets sentiment régional',
      'Rapports personnalisés',
      'Global Signal Index',
      'SLA dédié',
    ],
    locked: [],
  },
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.5 7l3 3 6-6" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main>

        {/* ── Header ── */}
        <section className="pt-20 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-2xl text-center">
            <p className="section-label">Accès</p>
            <h1
              className="text-3xl md:text-4xl font-bold text-[var(--text)] mt-2 mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              Gratuit pour participer.<br />Pro pour analyser.
            </h1>
            <p className="text-base text-[var(--text2)] leading-relaxed max-w-md mx-auto">
              ZAWIOS repose sur une participation ouverte.
              Les couches avancées donnent accès à la profondeur analytique
              et aux données institutionnelles.
            </p>
          </div>
        </section>

        {/* ── Tiers ── */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col rounded-xl p-6"
                  style={{
                    background: tier.featured ? 'var(--surface2)' : 'var(--surface)',
                    border: `1px solid ${tier.featured ? tier.accent : 'var(--border2)'}`,
                  }}
                >
                  {/* Header */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: tier.accent }}
                      />
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--mono)', color: tier.accent }}
                      >
                        {tier.name}
                      </span>
                    </div>

                    {tier.price ? (
                      <div className="flex items-baseline gap-1 mb-2">
                        <span
                          className="text-2xl font-bold text-[var(--text)]"
                          style={{ fontFamily: 'var(--mono)' }}
                        >
                          {tier.price}€
                        </span>
                        <span className="text-xs text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>
                          {tier.period}
                        </span>
                      </div>
                    ) : (
                      <div className="h-8 flex items-center mb-2">
                        <span
                          className="text-sm font-semibold text-[var(--text3)]"
                          style={{ fontFamily: 'var(--mono)' }}
                        >
                          {tier.id === 'free' ? 'Toujours gratuit' : 'Sur devis'}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-[var(--text2)] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckIcon />
                        <span className="text-xs text-[var(--text2)] leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={tier.href}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: tier.featured ? 'var(--teal)' : 'var(--surface3)',
                      color: tier.featured ? 'var(--bg)' : 'var(--text)',
                      border: tier.featured ? 'none' : '1px solid var(--border2)',
                      fontFamily: 'var(--font)',
                    }}
                  >
                    {tier.cta}
                    {tier.id !== 'free' && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Principles ── */}
        <section className="py-14" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-3xl">
            <p className="section-label mb-6">Principes</p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Participation ouverte',
                  body: 'Voter, comparer, construire sa réputation — ces actions restent gratuites pour toujours. La base de l\'intelligence collective est publique.',
                },
                {
                  title: 'Profondeur monétisée',
                  body: 'Nous monétisons l\'accès à l\'analyse avancée, aux données historiques et aux exports institutionnels. Pas la participation.',
                },
                {
                  title: 'Pas de publicité',
                  body: 'ZAWIOS ne vend pas d\'attention. Le modèle est SaaS — pas publicitaire. Vos données alimentent l\'intelligence collective, pas la régie.',
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h3 className="text-sm font-semibold text-[var(--text)] mb-2">{p.title}</h3>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14">
          <div className="container max-w-2xl">
            <p className="section-label mb-6">Questions</p>
            <div className="space-y-3">
              {[
                {
                  q: 'ZAWIOS est-il vraiment gratuit ?',
                  a: 'Oui. Voter, comparer les régions, construire sa réputation et consulter le classement sont entièrement gratuits. Aucun paywall sur la participation.',
                },
                {
                  q: 'Qu\'est-ce que la position NEUTRE ?',
                  a: 'NEUTRE signifie "abstention analytique" — information insuffisante ou position non tranchée. Les votes neutres sont comptabilisés séparément et ne pénalisent pas le score de précision.',
                },
                {
                  q: 'Puis-je annuler à tout moment ?',
                  a: 'Oui. L\'accès Pro est mensuel, résiliable immédiatement. Vos données et réputation restent intactes après résiliation.',
                },
                {
                  q: 'Qu\'est-ce que ZAWIOS Intelligence ?',
                  a: 'Une couche institutionnelle pour les équipes, organisations et médias. Accès API, exports de données, datasets sentiment régional, rapports personnalisés. Tarif sur devis.',
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h3 className="text-sm font-semibold text-[var(--text)] mb-2">{faq.q}</h3>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">{faq.a}</p>
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
