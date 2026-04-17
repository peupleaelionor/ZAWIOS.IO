import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SupportForm } from '@/components/support/support-form'

export const metadata: Metadata = {
  title: 'Soutenir ZAWIOS',
  description: 'Soutenez l\'infrastructure mondiale de signal stratégique ZAWIOS. Contribution libre, sans rendement financier.',
}

const WHY = [
  {
    title: 'Indépendance',
    desc: 'ZAWIOS ne dépend d\'aucun acteur financier ou politique. Votre soutien garantit notre neutralité éditoriale et analytique.',
  },
  {
    title: 'Infrastructure mondiale',
    desc: 'Maintenance technique, sécurité, scalabilité et disponibilité 24/7. Chaque contribution finance des ressources concrètes.',
  },
  {
    title: 'Recherche & développement',
    desc: 'Amélioration continue des modèles analytiques, des algorithmes de pondération et des outils de visualisation.',
  },
]

const TRANSPARENCY = [
  'Infrastructure technique (serveurs, base de données, CDN)',
  'Développement produit et ingénierie',
  'Sécurité et conformité RGPD',
  'Recherche sur la qualité des signaux collectifs',
]

export default function SupportPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-20 pb-14" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-[640px]">
            <p className="section-label mb-5">Soutien</p>
            <h1
              className="font-bold mb-5"
              style={{
                fontFamily: 'var(--display-font)',
                fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                letterSpacing: '-0.02em',
                color: 'var(--text-strong)',
                lineHeight: 1.12,
              }}
            >
              Soutenir l&apos;infrastructure ZAWIOS
            </h1>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: 500 }}>
              ZAWIOS est une infrastructure mondiale de signal stratégique.
              Votre soutien permet de maintenir son indépendance,
              sa neutralité et son développement.
            </p>
          </div>
        </section>

        {/* Pourquoi soutenir */}
        <section className="py-14 md:py-20">
          <div className="container max-w-[640px]">
            <p className="section-label mb-4">Pourquoi soutenir</p>
            <div className="space-y-0 divide-y" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              {WHY.map((w, i) => (
                <div key={i} className="py-7 grid grid-cols-[32px_1fr] gap-5 items-start">
                  <span
                    className="text-xs font-bold mt-1"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--primary)', opacity: 0.55 }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1.5 text-[0.975rem]" style={{ color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>
                      {w.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparence */}
        <section className="py-12 section-alt" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container max-w-[640px]">
            <p className="section-label mb-4">Transparence</p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Les contributions sont utilisées pour :
            </p>
            <ul className="space-y-2 mb-6">
              {TRANSPARENCY.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--positive)', marginTop: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="text-xs font-medium px-4 py-3 rounded-lg"
              style={{
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                fontFamily: 'var(--mono)',
                letterSpacing: '0.01em',
              }}
            >
              Aucune contribution ne donne droit à un rendement financier.
            </p>
          </div>
        </section>

        {/* Options de soutien */}
        <section className="py-14 md:py-20" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container max-w-[640px]">
            <p className="section-label mb-4">Contribuer</p>
            <h2
              className="text-xl md:text-2xl font-bold mb-8"
              style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em', fontFamily: 'var(--display-font)' }}
            >
              Choisissez votre contribution.
            </h2>
            <SupportForm />
          </div>
        </section>

      </main>

      {/* Footer disclaimer */}
      <div
        className="py-4"
        style={{ background: 'var(--surface-alt)', borderTop: '1px solid var(--border)' }}
      >
        <div className="container max-w-[640px]">
          <p className="text-xs text-center" style={{ color: 'var(--text-subtle)', fontFamily: 'var(--mono)' }}>
            ZAWIOS n&apos;est pas une plateforme d&apos;investissement et ne propose aucun rendement financier.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
