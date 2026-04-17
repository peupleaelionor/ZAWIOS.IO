import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Principes — ZAWIOS',
  description: 'Les principes fondamentaux qui guident ZAWIOS : participation ouverte, profondeur analytique, absence de manipulation.',
}

const principles = [
  {
    number: '01',
    title: 'Participation sans barrière',
    body: `Voter est un acte fondamental sur ZAWIOS. Il n'y a aucun abonnement requis pour accéder aux signaux, soumettre un vote, ou consulter le leaderboard public. La réputation se construit librement, indépendamment du plan.`,
  },
  {
    number: '02',
    title: 'Profondeur monétisée, pas participation',
    body: `Les couches analytiques avancées — divergence régionale, historique d'évolution, indices de polarisation — sont accessibles via Pro. L'accès institutionnel (API, datasets, rapports) est réservé à Intelligence. La participation reste gratuite.`,
  },
  {
    number: '03',
    title: 'Vote tri-état : engagement ou abstention analytique',
    body: `ZAWIOS reconnaît trois positions : OUI (engagement positif), NON (engagement négatif), NEUTRE (abstention analytique). Seuls les votes engagés (OUI/NON) influencent le score de réputation et la précision. Le vote NEUTRE mesure la polarisation sans pénaliser l'abstention.`,
  },
  {
    number: '04',
    title: 'Transparence algorithmique',
    body: `Les formules de calcul (polarisation, divergence, réputation, momentum) sont documentées publiquement dans la section Méthodologie. Aucun algorithme de feed personnalisé opaque. L'ordre des signaux repose sur des critères explicites : tendance, récence, popularité.`,
  },
  {
    number: '05',
    title: 'Pas de publicité, pas de courtage de données',
    body: `ZAWIOS est financé exclusivement par les abonnements. Aucune donnée utilisateur n'est vendue à des tiers. Aucune régie publicitaire. Le modèle SaaS garantit que les intérêts de la plateforme s'alignent avec ceux des utilisateurs.`,
  },
  {
    number: '06',
    title: 'Anti-manipulation by design',
    body: `Les mécanismes gamifiés à visée addictive sont explicitement exclus du produit. Pas de streaks coercitifs, pas de notifications anxiogènes, pas de dark patterns. Les indicateurs de progression (streak, percentile, jalons) sont informatifs, non punitifs.`,
  },
  {
    number: '07',
    title: 'Intégrité du contenu',
    body: `Les signaux sont évalués sur leur pertinence analytique, leur formulation neutre et leur résolvabilité. Le Guardian de contenu détecte automatiquement les biais de formulation et les signaux redondants. La modération humaine reste la décision finale.`,
  },
  {
    number: '08',
    title: 'Représentation géographique équilibrée',
    body: `ZAWIOS ne reproduit pas les biais de concentration géographique des plateformes occidentales. Les régions Afrique, RD Congo, Belgique, France sont traitées avec la même priorité analytique que les États-Unis ou l'Europe. Le World View mesure activement la divergence régionale.`,
  },
]

export default function PrinciplesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main className="container py-16 max-w-3xl">
      <header className="mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
          Fondations
        </p>
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font)', color: 'var(--text)' }}>
          Principes
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
          Ces principes ne sont pas des aspirations marketing. Ils définissent les contraintes
          de conception que nous nous imposons — ce que ZAWIOS ne fera pas autant que ce qu'il fait.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {principles.map((p) => (
          <article key={p.number} className="flex gap-6">
            <span
              className="text-2xl font-bold tabular-nums flex-shrink-0 w-10 pt-0.5"
              style={{ color: 'var(--teal)', fontFamily: 'var(--mono)', opacity: 0.6 }}
            >
              {p.number}
            </span>
            <div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {p.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-16 pt-8 flex flex-col gap-3 text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--text3)' }}>
        <p>Ces principes sont soumis à révision publique. Toute évolution est documentée dans le changelog.</p>
        <div className="flex gap-4">
          <Link href="/methodology" className="hover:text-[var(--text)] transition-colors">Méthodologie →</Link>
          <Link href="/moderation-guidelines" className="hover:text-[var(--text)] transition-colors">Modération →</Link>
        </div>
      </footer>
    </main>
    <Footer />
    </div>
  )
}
