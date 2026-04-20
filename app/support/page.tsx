import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SupportForm } from '@/components/support/support-form'

export const metadata: Metadata = {
  title: 'Soutenir ZAWIOS — Infrastructure du signal collectif',
  description: 'Contribuez à l\'infrastructure mondiale ZAWIOS. Indépendance, neutralité, R&D. Aucun rendement financier.',
}

const WHY = [
  {
    n: '01', title: 'Indépendance',
    desc: 'ZAWIOS ne dépend d\'aucun acteur financier ou politique. Votre soutien garantit notre neutralité éditoriale et analytique sur la durée.',
  },
  {
    n: '02', title: 'Infrastructure',
    desc: 'Serveurs, base de données distribuée, CDN mondial, sécurité et disponibilité 24/7. Chaque contribution finance des ressources concrètes.',
  },
  {
    n: '03', title: 'Recherche & développement',
    desc: 'Algorithmes de pondération, détection de biais, moteur de divergence comparative. Développement à long terme, sans pression commerciale.',
  },
]

const BUDGET = [
  { label: 'Infrastructure technique',   pct: 52, color: 'var(--primary)' },
  { label: 'Développement produit',      pct: 28, color: 'var(--teal, #0EA5A0)' },
  { label: 'Sécurité & conformité RGPD', pct: 12, color: 'var(--warn)' },
  { label: 'Recherche qualité signal',    pct:  8, color: 'var(--text-subtle)' },
]

const FAQ = [
  {
    q: 'Puis-je annuler un soutien mensuel ?',
    a: 'Oui, à tout moment depuis votre espace Stripe — sans engagement, sans délai.',
  },
  {
    q: 'Recevrai-je un reçu fiscal ?',
    a: 'Un reçu Stripe est envoyé automatiquement. ZAWIOS n\'est pas une association fiscalement reconnue : la déductibilité fiscale ne s\'applique pas.',
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: 'Le paiement est traité exclusivement par Stripe (PCI-DSS niveau 1). ZAWIOS ne stocke aucune donnée bancaire.',
  },
  {
    q: 'Puis-je contribuer de manière anonyme ?',
    a: 'Oui. Aucun nom ne sera affiché publiquement. Le traitement Stripe nécessite votre adresse e-mail pour le reçu.',
  },
  {
    q: 'Où va précisément l\'argent ?',
    a: 'Voir la répartition budgétaire ci-dessus. Les contributions vont intégralement à l\'infrastructure technique et au développement produit.',
  },
]

const OTHER_WAYS = [
  {
    icon: '↗',
    title: 'Partager ZAWIOS',
    desc: 'Partagez un signal ou la page d\'accueil avec votre réseau. La croissance organique est notre modèle.',
  },
  {
    icon: '✉',
    title: 'Inviter un analyste',
    desc: 'Invitez quelqu\'un dont vous respectez le jugement. La qualité des signaux dépend de la qualité des analystes.',
  },
  {
    icon: '★',
    title: 'Donner un retour',
    desc: 'Signalez un bug, proposez un signal, améliorez la plateforme. Chaque retour compte autant qu\'un don.',
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="pt-20 pb-14" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-[640px]">
            <p className="section-label mb-5">Soutien</p>
            <h1
              className="font-bold mb-5"
              style={{
                fontFamily: 'var(--display-font)',
                fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                letterSpacing: '-0.025em',
                color: 'var(--text-strong)',
                lineHeight: 1.1,
              }}
            >
              Soutenir l&apos;infrastructure ZAWIOS.
            </h1>
            <p className="text-base leading-relaxed mb-7" style={{ color: 'var(--text-muted)', maxWidth: 480 }}>
              ZAWIOS est une infrastructure de signal collectif, indépendante de tout acteur financier.
              Votre contribution maintient sa neutralité et son développement.
            </p>
            <a
              href="#contribuer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'var(--primary)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                fontSize: '15px',
                fontFamily: 'var(--font)',
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(28,57,187,0.14)',
                transition: 'background 150ms ease',
              }}
            >
              Contribuer
            </a>
          </div>
        </section>

        {/* ── Pourquoi ─────────────────────────────────────────────── */}
        <section className="py-14 md:py-20" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-[640px]">
            <p className="section-label mb-4">Pourquoi soutenir</p>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {WHY.map((w) => (
                <div
                  key={w.n}
                  className="py-7 grid items-start"
                  style={{ gridTemplateColumns: '32px 1fr', gap: '20px', borderBottom: '1px solid var(--border)' }}
                >
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, color: 'var(--primary)', opacity: 0.55, marginTop: 2 }}>
                    {w.n}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em', marginBottom: 6 }}>
                      {w.title}
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Budget ───────────────────────────────────────────────── */}
        <section
          className="py-12 md:py-16"
          style={{ background: 'var(--surface-alt, var(--surface))', borderBottom: '1px solid var(--border)' }}
        >
          <div className="container max-w-[640px]">
            <p className="section-label mb-6">Où va l&apos;argent</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {BUDGET.map((b) => (
                <div key={b.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-strong)' }}>{b.label}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 700, color: b.color }}>{b.pct}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                      style={{ width: `${b.pct}%`, height: '100%', background: b.color, borderRadius: '99px', transition: 'width 600ms ease' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p
              className="mt-6 text-xs font-medium px-4 py-3 rounded-xl"
              style={{ background: 'var(--primary-soft, #E8EDFF)', color: 'var(--primary)', fontFamily: 'var(--mono)', letterSpacing: '0.01em' }}
            >
              Aucune contribution ne donne droit à un rendement financier, un retour sur investissement ou une contrepartie financière.
            </p>
          </div>
        </section>

        {/* ── Contribuer ───────────────────────────────────────────── */}
        <section id="contribuer" className="py-14 md:py-20" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-[640px]">
            <p className="section-label mb-4">Contribuer</p>
            <h2
              className="font-bold mb-8"
              style={{ fontFamily: 'var(--display-font)', fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}
            >
              Choisissez votre contribution.
            </h2>
            <SupportForm />
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="py-14 md:py-20" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container max-w-[640px]">
            <p className="section-label mb-6">FAQ</p>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  style={{ borderBottom: '1px solid var(--border)', padding: '0' }}
                >
                  <summary
                    style={{
                      listStyle: 'none',
                      padding: '18px 0',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--text-strong)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.q}
                    <span style={{ color: 'var(--text-subtle)', fontSize: '18px', flexShrink: 0, marginLeft: 12 }}>+</span>
                  </summary>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', paddingBottom: '18px' }}>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Autres façons d'aider ─────────────────────────────────── */}
        <section className="py-14 md:py-20 section-alt">
          <div className="container max-w-[640px]">
            <p className="section-label mb-6">Autres façons d&apos;aider</p>
            <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {OTHER_WAYS.map((w) => (
                <div
                  key={w.title}
                  style={{
                    padding: '20px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 1px 3px rgba(11,16,32,0.05)',
                  }}
                >
                  <span style={{ fontSize: '22px', display: 'block', marginBottom: '12px', color: 'var(--primary)' }}>
                    {w.icon}
                  </span>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-strong)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                    {w.title}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <div style={{ background: 'var(--surface-inset, var(--surface-alt))', borderTop: '1px solid var(--border)', padding: '16px 0' }}>
        <div className="container max-w-[640px]">
          <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--text-subtle)', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>
            ZAWIOS n&apos;est pas une plateforme d&apos;investissement et ne propose aucun rendement financier, aucune contrepartie, aucun actif numérique.
            &nbsp;·&nbsp;
            <Link href="/terms" style={{ color: 'var(--text-subtle)', textDecoration: 'underline', textDecorationColor: 'var(--border)' }}>
              CGU
            </Link>
            &nbsp;·&nbsp;
            <Link href="/privacy" style={{ color: 'var(--text-subtle)', textDecoration: 'underline', textDecorationColor: 'var(--border)' }}>
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
