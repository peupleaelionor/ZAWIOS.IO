import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Intelligence',
  description: 'Infrastructure de données stratégiques pour équipes, organisations et médias. API Signal, datasets régionaux, rapports sur-mesure.',
}

const CAPABILITIES = [
  {
    n: '01',
    name: 'API Signal',
    desc: 'Accès programmatique à l\'ensemble des signaux actifs et résolus. Format JSON structuré. Rate limiting adapté à votre usage.',
  },
  {
    n: '02',
    name: 'Regional Sentiment Dataset',
    desc: 'Export complet des distributions de vote par région, catégorie et période. Formats CSV et Parquet disponibles.',
  },
  {
    n: '03',
    name: 'Rapports personnalisés',
    desc: 'Analyse sur-mesure sur des thématiques spécifiques. Livrables PDF ou JSON selon les besoins de votre organisation.',
  },
  {
    n: '04',
    name: 'Global Signal Index',
    desc: 'Indice synthétique de sentiment mondial agrégé sur 30+ catégories. Mise à jour quotidienne. Série historique complète.',
  },
  {
    n: '05',
    name: 'Widgets embarquables',
    desc: 'Intégrez les signaux ZAWIOS dans vos plateformes éditoriales ou dashboards internes. Personnalisables.',
  },
  {
    n: '06',
    name: 'SLA & Support dédié',
    desc: 'Accord de niveau de service, accès prioritaire et interlocuteur technique dédié. Disponible pour les plans organisationnels.',
  },
]

const USE_CASES = [
  {
    label: 'Médias & Journalisme',
    desc: 'Enrichissez vos articles avec des données d\'opinion régionale en temps réel. Source citée, méthodologie transparente.',
  },
  {
    label: 'Think tanks & Recherche',
    desc: 'Données quantitatives sur les perceptions collectives. Protocole de collecte documenté. Export structuré.',
  },
  {
    label: 'Organisations internationales',
    desc: 'Suivi du sentiment par zone géographique sur des sujets géopolitiques et sociaux. Granularité régionale.',
  },
  {
    label: 'Équipes stratégiques',
    desc: 'Intelligence collective structurée pour éclairer des décisions à fort enjeu. Tableaux de bord dédiés.',
  },
]

export default function IntelligencePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-20 pb-16" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-[720px]">
            <p className="section-label mb-5">ZAWIOS Intelligence</p>
            <h1
              className="font-bold mb-5"
              style={{
                fontFamily: 'var(--display-font)',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                letterSpacing: '-0.02em',
                color: 'var(--text-strong)',
                lineHeight: 1.1,
              }}
            >
              Infrastructure de données
              <br />
              pour les organisations.
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-muted)', maxWidth: 520 }}>
              Accès API, datasets régionaux, rapports sur-mesure.
              Pour les équipes qui ont besoin d&apos;intelligence collective
              à grande échelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font)',
                }}
              >
                Nous contacter
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: 'var(--surface-alt)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font)',
                }}
              >
                Voir la méthodologie
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 md:py-24">
          <div className="container max-w-[720px]">
            <p className="section-label mb-4">Capacités</p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-12"
              style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em', fontFamily: 'var(--display-font)' }}
            >
              Ce que vous obtenez.
            </h2>

            <div className="space-y-0 divide-y" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              {CAPABILITIES.map((cap) => (
                <div key={cap.n} className="py-7 grid grid-cols-[48px_1fr] gap-5 items-start">
                  <span
                    className="text-xs font-bold mt-0.5"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--primary)', opacity: 0.6 }}
                  >
                    {cap.n}
                  </span>
                  <div>
                    <h3
                      className="font-semibold mb-1.5"
                      style={{ fontSize: '0.975rem', color: 'var(--text-strong)', letterSpacing: '-0.01em' }}
                    >
                      {cap.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section
          className="py-16 md:py-20 section-alt"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="container max-w-[720px]">
            <p className="section-label mb-4">Cas d&apos;usage</p>
            <h2
              className="text-xl md:text-2xl font-bold mb-10"
              style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em', fontFamily: 'var(--display-font)' }}
            >
              Pour qui.
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {USE_CASES.map((uc) => (
                <div
                  key={uc.label}
                  className="p-5 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h3
                    className="font-semibold mb-2 text-sm"
                    style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.02em', textTransform: 'uppercase', fontSize: '11px' }}
                  >
                    {uc.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {uc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-14" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container max-w-[720px]">
            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-strong)' }}>
              Vous avez un besoin spécifique ?
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Décrivez votre cas d&apos;usage. Nous répondons sous 48 heures ouvrées.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: 'var(--primary)', color: '#FFFFFF' }}
            >
              Nous contacter →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
