import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Modération — ZAWIOS',
  description: 'Règles de modération du contenu sur ZAWIOS : critères d\'acceptation des signaux, processus de résolution, principes de neutralité.',
}

const sections = [
  {
    id: 'signals',
    title: 'Critères d\'acceptation des signaux',
    items: [
      {
        label: 'Résolvabilité',
        text: 'Un signal doit pouvoir être résolu objectivement — OUI ou NON — dans un délai défini. Les questions philosophiques ou subjectives sont refusées.',
      },
      {
        label: 'Formulation neutre',
        text: 'L\'énoncé ne doit pas suggérer une réponse préférable. Les formulations orientées ("L\'IA va-t-elle détruire l\'emploi ?" vs "L\'IA va-t-elle réduire le chômage de 5% d\'ici 2027 ?") sont corrigées ou refusées.',
      },
      {
        label: 'Pertinence temporelle',
        text: 'Les signaux sans horizon de résolution ou portant sur des événements révolus sont refusés. La date de résolution attendue doit être précisée.',
      },
      {
        label: 'Non-redondance',
        text: 'Un signal quasi-identique à un signal actif existant est fusionné ou refusé. Le système de détection automatique (Content Integrity Agent) identifie les doublons à 85%+ de similarité sémantique.',
      },
      {
        label: 'Absence de contenu nuisible',
        text: 'Sont exclus : signaux incitant à la haine, impliquant des mineurs, promouvant la violence, ou constituant de la désinformation factuelle.',
      },
    ],
  },
  {
    id: 'resolution',
    title: 'Processus de résolution',
    items: [
      {
        label: 'Source primaire',
        text: 'La résolution s\'appuie sur une source primaire vérifiable (communiqué officiel, journal de référence, décision institutionnelle). Les réseaux sociaux seuls ne constituent pas une source de résolution.',
      },
      {
        label: 'Délai de résolution',
        text: 'Un signal est résolu dans les 72h suivant l\'événement de référence. En cas de litige sur l\'interprétation, la résolution est suspendue jusqu\'à consensus de l\'équipe éditoriale.',
      },
      {
        label: 'Résolution ambiguë',
        text: 'Si un événement ne permet pas de trancher clairement OUI/NON (résultat partiel, contradictoire ou annulé), le signal est marqué "Indéterminé" — ni OUI ni NON ne sont crédités.',
      },
      {
        label: 'Impact réputationnel',
        text: 'Seule une résolution franche (OUI ou NON) affecte les scores de réputation. Les votes NEUTRE ne sont jamais pénalisés quelle que soit la résolution.',
      },
    ],
  },
  {
    id: 'votes',
    title: 'Intégrité des votes',
    items: [
      {
        label: 'Un vote par compte',
        text: 'Un compte peut modifier son vote jusqu\'à la résolution. Les comptes créés en masse (détection par empreinte comportementale) sont suspendus.',
      },
      {
        label: 'Manipulation coordinée',
        text: 'Les mouvements de votes coordonnés détectés par l\'Engagement Stabilizer Agent déclenchent une analyse manuelle. Le signal concerné peut être mis en pause.',
      },
      {
        label: 'Vote neutre légitime',
        text: 'Le vote NEUTRE est une position analytique valide, pas un refus de vote. Il ne constitue pas une abstention punissable et n\'est jamais masqué dans les statistiques.',
      },
    ],
  },
  {
    id: 'appeals',
    title: 'Contestations et recours',
    items: [
      {
        label: 'Signalement d\'erreur',
        text: 'Tout utilisateur peut contester une résolution via le formulaire dédié. Les contestations sont examinées dans les 5 jours ouvrés.',
      },
      {
        label: 'Révision de résolution',
        text: 'Une résolution peut être révisée si une source primaire plus fiable invalide la première. La révision est documentée publiquement dans le log du signal.',
      },
      {
        label: 'Suppression de signal',
        text: 'Un signal supprimé après publication est archivé (jamais effacé). Les utilisateurs ayant voté sont notifiés. Les points réputationnels liés sont annulés.',
      },
    ],
  },
  {
    id: 'moderation-team',
    title: 'Équipe de modération',
    items: [
      {
        label: 'Décision finale humaine',
        text: 'Les agents automatiques (Content Integrity, Polarization Guard) signalent — ils ne suppriment pas. Toute action définitive est prise par un modérateur humain.',
      },
      {
        label: 'Absence de biais éditorial',
        text: 'Les modérateurs n\'éditorialisent pas le contenu des signaux au-delà des critères ci-dessus. La formulation neutre est un standard technique, pas une opinion.',
      },
      {
        label: 'Transparence des décisions',
        text: 'Les décisions de modération significatives (refus, révision, suspension) sont loggées dans un registre interne accessible à l\'équipe. Un résumé mensuel est publié.',
      },
    ],
  },
]

export default function ModerationGuidelinesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main className="container py-16 max-w-3xl">
      <header className="mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
          Contenu
        </p>
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font)', color: 'var(--text)' }}>
          Règles de modération
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
          Ces règles définissent comment les signaux sont acceptés, résolus et contestés sur ZAWIOS.
          Elles s'appliquent uniformément à tous les contenus, indépendamment du plan de l'auteur.
        </p>
      </header>

      <div className="flex flex-col gap-14">
        {sections.map((section) => (
          <section key={section.id}>
            <h2 className="text-base font-semibold uppercase tracking-wide mb-6" style={{ color: 'var(--text)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>
              {section.title}
            </h2>
            <div className="flex flex-col gap-5">
              {section.items.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-1 flex-shrink-0 rounded-full mt-1" style={{ background: 'var(--teal)', opacity: 0.3, alignSelf: 'stretch', minHeight: '16px' }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.label}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 pt-8 flex flex-col gap-3 text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--text3)' }}>
        <p>Dernière révision : avril 2026. Ces règles évoluent avec la plateforme.</p>
        <div className="flex gap-4">
          <Link href="/principles" className="hover:text-[var(--text)] transition-colors">Principes →</Link>
          <Link href="/methodology" className="hover:text-[var(--text)] transition-colors">Méthodologie →</Link>
        </div>
      </footer>
    </main>
    <Footer />
    </div>
  )
}
