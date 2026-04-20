import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Méthodologie | ZAWIOS',
  description: 'Comment fonctionnent les signaux ZAWIOS : système de vote, réputation, calcul du score, vote neutre.',
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-20 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-2xl">
            <p className="section-label">Méthodologie</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mt-2 mb-4" style={{ letterSpacing: '-0.03em' }}>
              Comment ZAWIOS<br />mesure l&apos;opinion.
            </h1>
            <p className="text-base text-[var(--text2)] leading-relaxed max-w-md">
              Un système de signal, de réputation et de comparaison régionale.
              Transparent, mesurable, reproductible.
            </p>
          </div>
        </section>

        <div className="container max-w-2xl py-14">
          <div className="space-y-12">

            {/* 1 - Signal */}
            <section>
              <p className="section-label">01 — Signal</p>
              <h2 className="text-xl font-bold text-[var(--text)] mt-1 mb-3" style={{ letterSpacing: '-0.02em' }}>
                Qu&apos;est-ce qu&apos;un signal ?
              </h2>
              <p className="text-sm text-[var(--text2)] leading-relaxed mb-4">
                Un signal est une question fermée sur un sujet d&apos;actualité, géopolitique, technologique ou sociétal.
                Il est associé à une catégorie, une région géographique, une date d&apos;expiration, et un statut (actif ou résolu).
              </p>
              <p className="text-sm text-[var(--text2)] leading-relaxed">
                Chaque signal a un poids dans le calcul de réputation selon sa difficulté estimée et son impact géopolitique.
              </p>
            </section>

            <div style={{ borderTop: '1px solid var(--border)' }} />

            {/* 2 - Vote tri-state */}
            <section>
              <p className="section-label">02 — Vote</p>
              <h2 className="text-xl font-bold text-[var(--text)] mt-1 mb-3" style={{ letterSpacing: '-0.02em' }}>
                Système tri-état : YES / NO / NEUTRE
              </h2>
              <p className="text-sm text-[var(--text2)] leading-relaxed mb-4">
                ZAWIOS utilise trois positions de vote :
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { label: 'YES',    color: 'var(--teal)',  desc: 'Accord avec la proposition. Vote engagé positif.' },
                  { label: 'NO',     color: 'var(--pink)',  desc: 'Désaccord avec la proposition. Vote engagé négatif.' },
                  { label: 'NEUTRE', color: 'var(--text3)', desc: "Abstention analytique — information insuffisante ou position non tranchée. Comptabilisé séparément, n'affecte pas le score de précision." },
                ].map((v) => (
                  <div
                    key={v.label}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <span
                      className="text-[11px] font-bold mt-0.5 shrink-0 w-14"
                      style={{ fontFamily: 'var(--mono)', color: v.color }}
                    >
                      {v.label}
                    </span>
                    <p className="text-xs text-[var(--text2)] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text3)] leading-relaxed" style={{ fontFamily: 'var(--mono)' }}>
                Distribution affichée : YES% · NO% · NEUTRE% — la somme est toujours 100%.
              </p>
            </section>

            <div style={{ borderTop: '1px solid var(--border)' }} />

            {/* 3 - Réputation */}
            <section>
              <p className="section-label">03 — Réputation</p>
              <h2 className="text-xl font-bold text-[var(--text)] mt-1 mb-3" style={{ letterSpacing: '-0.02em' }}>
                Calcul du score de réputation
              </h2>
              <p className="text-sm text-[var(--text2)] leading-relaxed mb-4">
                La réputation est calculée sur la base de la précision des votes engagés (YES ou NO) sur des signaux résolus.
              </p>
              <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="text-[11px] font-semibold text-[var(--text3)] mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                  Formule simplifiée
                </p>
                <p className="text-sm font-mono text-[var(--teal)]" style={{ fontFamily: 'var(--mono)' }}>
                  Score += poids_signal × (1 si correct, 0 si incorrect)
                </p>
                <p className="text-xs text-[var(--text3)] mt-2" style={{ fontFamily: 'var(--mono)' }}>
                  Les votes NEUTRE ne modifient pas le score.
                </p>
              </div>
              <p className="text-sm text-[var(--text2)] leading-relaxed">
                La <strong className="text-[var(--text)]">Précision</strong> est le ratio de bonnes prédictions sur les votes engagés.
                Le <strong className="text-[var(--text)]">Taux de décisivité</strong> mesure la proportion de votes engagés (non-neutres).
              </p>
            </section>

            <div style={{ borderTop: '1px solid var(--border)' }} />

            {/* 4 - World View */}
            <section>
              <p className="section-label">04 — World View</p>
              <h2 className="text-xl font-bold text-[var(--text)] mt-1 mb-3" style={{ letterSpacing: '-0.02em' }}>
                Comparaison régionale
              </h2>
              <p className="text-sm text-[var(--text2)] leading-relaxed mb-4">
                Le World View agrège les votes par région géographique pour identifier les divergences
                d&apos;opinion entre l&apos;Afrique, la France, l&apos;Europe et les États-Unis.
              </p>
              <p className="text-sm text-[var(--text2)] leading-relaxed">
                Le pourcentage affiché par région représente le ratio YES parmi les votes engagés (YES + NO)
                dans cette zone géographique. Les votes neutres sont indiqués séparément.
              </p>
            </section>

            <div style={{ borderTop: '1px solid var(--border)' }} />

            {/* 5 - Polarisation */}
            <section>
              <p className="section-label">05 — Indices analytiques</p>
              <h2 className="text-xl font-bold text-[var(--text)] mt-1 mb-3" style={{ letterSpacing: '-0.02em' }}>
                Polarisation &amp; momentum
              </h2>
              <div className="space-y-3">
                {[
                  { metric: 'Indice de polarisation', formula: '(YES + NO) / Total',  desc: "Mesure le niveau d'engagement. Un signal très polarisé a peu de votes neutres." },
                  { metric: 'Score de momentum',      formula: 'Δvotes / Δtemps',      desc: 'Détecte les signaux en accélération. Utile pour identifier les sujets émergents.' },
                  { metric: 'Divergence régionale',   formula: 'max(régions) - min(régions)', desc: "Amplitude de l'écart entre la région la plus YES et la plus NO." },
                ].map((item) => (
                  <div
                    key={item.metric}
                    className="p-4 rounded-xl"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-[var(--text)]">{item.metric}</p>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded"
                        style={{ fontFamily: 'var(--mono)', background: 'var(--surface3)', color: 'var(--teal)' }}
                      >
                        {item.formula}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text2)] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6 - Agents internes */}
            <div style={{ borderTop: '1px solid var(--border)' }} />
            <section>
              <p className="section-label">06 — Agents internes</p>
              <h2 className="text-xl font-bold text-[var(--text)] mt-1 mb-3" style={{ letterSpacing: '-0.02em' }}>
                Micro-agents de transparence
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'SignalBalancingAgent',  desc: "Garantit qu'aucune catégorie ne dépasse 30% du fil visible." },
                  { name: 'TensionDetectionAgent', desc: 'Détecte les signaux très polarisés et les signale pour contexte additionnel. Ne supprime jamais.' },
                  { name: 'RegionalHarmonizer',    desc: "Maintient la diversité régionale. La région de l'utilisateur est prioritaire (max 40%) mais toutes les autres sont toujours visibles." },
                  { name: 'LifeTopicExpander',     desc: 'Garantit que les sujets vitaux (santé, éducation, logement) ne sont pas noyés par les news ou la crypto.' },
                ].map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
                  >
                    <span className="text-[10px] font-bold text-[var(--teal)] mt-0.5 shrink-0" style={{ fontFamily: 'var(--mono)' }}>▸</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{agent.name}</p>
                      <p className="text-xs text-[var(--text3)] mt-0.5 leading-relaxed">{agent.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text3)] leading-relaxed pt-3" style={{ fontFamily: 'var(--mono)' }}>
                Tous les agents sont des fonctions pures. Pas d&apos;effets de bord. Pas de tracking utilisateur. Pas de filtrage idéologique.
              </p>
            </section>

          </div>
        </div>

        {/* Footer CTA */}
        <section
          className="py-12"
          style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}
        >
          <div className="container max-w-xl flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-[var(--text)] mb-1">Une question sur la méthodologie ?</p>
              <p className="text-xs text-[var(--text2)]">L&apos;équipe ZAWIOS est disponible pour les chercheurs et journalistes.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)' }}
            >
              Nous contacter
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
