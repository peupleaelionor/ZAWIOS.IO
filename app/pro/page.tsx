import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'ZAWIOS Pro — Analyse avancée',
  description: 'Divergence régionale, données historiques, dashboard précision, heatmaps. L\'accès analytique complet.',
}

const PRO_FEATURES = [
  {
    group: 'Analyse régionale',
    items: [
      { name: 'Divergence régionale complète', desc: 'Comparez Afrique, France, Europe et USA pour chaque signal. Identifiez les patterns de divergence.' },
      { name: 'Heatmap régionale', desc: 'Visualisation cartographique des distributions de vote par pays et par bloc.' },
      { name: 'Regional Sentiment Dataset', desc: 'Accès au dataset brut des distributions régionales exportable.' },
    ],
  },
  {
    group: 'Temporalité',
    items: [
      { name: 'Données historiques', desc: 'Accédez à l\'évolution des signaux sur 12 mois. Identifiez les renversements.' },
      { name: 'Vote evolution', desc: 'Graphique de l\'évolution du pourcentage YES/NO/NEUTRE dans le temps.' },
      { name: 'Tendances de neutralité', desc: 'Suivez l\'évolution du taux de vote neutre par catégorie et région.' },
    ],
  },
  {
    group: 'Intelligence analytique',
    items: [
      { name: 'Index de polarisation', desc: 'Ratio (YES+NO) vs NEUTRE. Mesure le niveau de consensus ou de division.' },
      { name: 'Taux de décisivité', desc: 'Mesure de la capacité à prendre des positions claires — métrique de réputation avancée.' },
      { name: 'Score de momentum', desc: 'Détecte les signaux en accélération ou en retournement.' },
    ],
  },
  {
    group: 'Dashboard personnel',
    items: [
      { name: 'Précision personnelle', desc: 'Analyse détaillée de vos performances par catégorie et région.' },
      { name: 'Métriques réputation avancées', desc: 'Tier progression, décisivité, streaks, comparaison avec les top analystes.' },
      { name: 'Historique de votes complet', desc: 'Accès à l\'intégralité de votre historique. Aucune limite de période.' },
    ],
  },
]

export default function ProPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-20 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--teal)' }} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--teal)]" style={{ fontFamily: 'var(--mono)' }}>
                ZAWIOS Pro
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4" style={{ letterSpacing: '-0.03em' }}>
              L&apos;analyse complète.<br />Pas juste le vote.
            </h1>
            <p className="text-base text-[var(--text2)] leading-relaxed mb-8 max-w-md">
              Pro donne accès aux données qui permettent de comprendre
              pourquoi la foule pense ce qu&apos;elle pense — par région,
              dans le temps, avec le contexte de neutralité.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110"
                style={{ background: 'var(--teal)', color: 'var(--bg)', fontFamily: 'var(--font)' }}
              >
                Essayer Pro — 12€/mois
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-[var(--text3)] hover:text-[var(--text)] transition-colors"
                style={{ fontFamily: 'var(--mono)' }}
              >
                Voir les tarifs →
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-14">
          <div className="container max-w-3xl">
            <div className="space-y-10">
              {PRO_FEATURES.map((group) => (
                <div key={group.group}>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-4"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
                  >
                    {group.group}
                  </p>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ background: 'var(--teal)' }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[var(--text)] mb-1">{item.name}</p>
                          <p className="text-xs text-[var(--text2)] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-16"
          style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
        >
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-3" style={{ letterSpacing: '-0.025em' }}>
              Accéder à l&apos;analyse complète
            </h2>
            <p className="text-sm text-[var(--text2)] mb-6">
              12€/mois. Résiliable à tout moment. Données intactes après résiliation.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:brightness-110"
              style={{ background: 'var(--teal)', color: 'var(--bg)', fontFamily: 'var(--font)' }}
            >
              Commencer avec Pro
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
