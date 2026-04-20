import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'ZAWIOS Intelligence — Accès institutionnel',
  description: 'API, datasets sentiment régional, rapports personnalisés. Pour les équipes, organisations et médias.',
}

const CAPABILITIES = [
  {
    id: 'api',
    name: 'API Signal',
    desc: 'Accès programmatique à l\'ensemble des signaux actifs et résolus. Format JSON structuré. Rate limiting adapté.',
  },
  {
    id: 'dataset',
    name: 'Regional Sentiment Dataset',
    desc: 'Export complet des distributions de vote par région, catégorie, période. Format CSV / Parquet.',
  },
  {
    id: 'reports',
    name: 'Rapports personnalisés',
    desc: 'Analyse sur-mesure sur des thématiques spécifiques. Livrables PDF ou JSON selon les besoins.',
  },
  {
    id: 'gsi',
    name: 'Global Signal Index',
    desc: 'Indice synthétique de sentiment mondial agrégé sur 30+ catégories. Mise à jour quotidienne.',
  },
  {
    id: 'embed',
    name: 'Widgets embarquables',
    desc: 'Intégrez les signaux ZAWIOS dans vos plateformes éditoriales ou dashboards internes.',
  },
  {
    id: 'sla',
    name: 'SLA & Support dédié',
    desc: 'Accord de niveau de service, accès prioritaire et interlocuteur technique dédié.',
  },
]

const USE_CASES = [
  { label: 'Médias & Journalisme', desc: 'Enrichissez vos articles avec des données d\'opinion régionale en temps réel.' },
  { label: 'Think tanks & Recherche', desc: 'Données quantitatives sur les perceptions collectives. Méthodologie transparente.' },
  { label: 'Organisations internationales', desc: 'Suivi du sentiment par région géographique sur des sujets géopolitiques.' },
  { label: 'Équipes stratégiques', desc: 'Intelligence collective structurée pour éclairer des décisions à fort enjeu.' },
]

export default function IntelligencePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-20 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent2)' }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--mono)', color: 'var(--accent2)' }}>
                ZAWIOS Intelligence
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4" style={{ letterSpacing: '-0.03em' }}>
              Infrastructure de données<br />pour les organisations.
            </h1>
            <p className="text-base text-[var(--text2)] leading-relaxed mb-8 max-w-md">
              Accès API, datasets régionaux, rapports sur-mesure.
              Pour les équipes qui ont besoin d&apos;intelligence collective
              à grande échelle.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110"
              style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border2)', fontFamily: 'var(--font)' }}
            >
              Nous contacter
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-14">
          <div className="container max-w-3xl">
            <p className="section-label mb-6">Capacités</p>
            <div className="grid md:grid-cols-2 gap-3">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.id}
                  className="p-5 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="text-sm font-semibold text-[var(--text)] mb-2">{cap.name}</p>
                  <p className="text-xs text-[var(--text2)] leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-12" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-3xl">
            <p className="section-label mb-6">Cas d'usage</p>
            <div className="space-y-2">
              {USE_CASES.map((uc) => (
                <div
                  key={uc.label}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--accent2)' }} />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{uc.label}</p>
                    <p className="text-xs text-[var(--text2)] mt-0.5 leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-3" style={{ letterSpacing: '-0.025em' }}>
              Discutons de vos besoins
            </h2>
            <p className="text-sm text-[var(--text2)] mb-2">
              Tarification sur devis selon le volume et les cas d&apos;usage.
            </p>
            <p
              className="text-[10px] text-[var(--text3)] mb-6"
              style={{ fontFamily: 'var(--mono)' }}
            >
              Pas de tarif public affiché — chaque accès institutionnel est structuré selon les besoins spécifiques.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:brightness-110"
              style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border2)', fontFamily: 'var(--font)' }}
            >
              Contacter l&apos;équipe Intelligence
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
