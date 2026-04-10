import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SignalVisual } from '@/components/ui/signal-visual'
import type { Category } from '@/types'

export const metadata: Metadata = {
  title: 'Système produit',
  description: 'Architecture, design system et composants ZAWIOS.',
}

const CATEGORIES: Array<{ value: Category | string; label: string }> = [
  { value: 'technology', label: 'Tech & IA' },
  { value: 'finance',    label: 'Finance' },
  { value: 'science',    label: 'Science' },
  { value: 'politics',   label: 'Politique' },
  { value: 'work',       label: 'Travail' },
  { value: 'education',  label: 'Éducation' },
  { value: 'africa',     label: 'Afrique' },
  { value: 'lifestyle',  label: 'Société' },
  { value: 'future',     label: 'Futur' },
  { value: 'sports',     label: 'Sport' },
  { value: 'business',   label: 'Business' },
  { value: 'culture',    label: 'Culture' },
  { value: 'world',      label: 'Monde' },
]

const SYSTEM_MODULES = [
  {
    label: 'Signal Feed',
    desc: 'Fil de prédictions avec filtres (catégorie, onglet), cartes Signal enrichies de visuels générés.',
    status: 'live',
    href: '/predictions',
  },
  {
    label: 'World View',
    desc: '100 signaux structurés, répartis en 10 groupes thématiques, avec comparaison régionale (5 zones).',
    status: 'live',
    href: '/predictions',
  },
  {
    label: 'Signal Detail',
    desc: 'Page de détail avec barre de vote, comparaison régionale, résolution et tags.',
    status: 'live',
    href: '/predictions/wv082',
  },
  {
    label: 'Leaderboard',
    desc: 'Classement des prédicteurs par score, précision et nombre de prédictions.',
    status: 'live',
    href: '/leaderboard',
  },
  {
    label: 'Premium / Plans',
    desc: 'Page de tarification avec plans Free / Premium / Creator / Business.',
    status: 'live',
    href: '/premium',
  },
  {
    label: 'Auth (Login / Signup)',
    desc: 'Pages d\'authentification, formulaires de connexion et inscription.',
    status: 'live',
    href: '/auth/login',
  },
  {
    label: 'Social Share Card',
    desc: 'Générateur de carte partageable pour résultats de prédiction.',
    status: 'planned',
    href: '#',
  },
  {
    label: 'Onboarding',
    desc: 'Flux d\'intégration: Vote, Comparez, Construisez votre réputation.',
    status: 'planned',
    href: '#',
  },
]

const COLOR_TOKENS = [
  { name: '--bg',      value: '#050508', label: 'Fond principal' },
  { name: '--bg2',     value: '#0a0a10', label: 'Fond secondaire' },
  { name: '--surface', value: '#0e0e16', label: 'Surface carte' },
  { name: '--accent',  value: '#7c6ef0', label: 'Accent violet' },
  { name: '--teal',    value: '#34d0b6', label: 'Teal signal' },
  { name: '--amber',   value: '#f0c050', label: 'Ambre score' },
  { name: '--zred',    value: '#f06070', label: 'Rouge alerte' },
  { name: '--blue',    value: '#60a8f0', label: 'Bleu données' },
  { name: '--text',    value: '#eaeaf0', label: 'Texte principal' },
  { name: '--text2',   value: '#a0a0b8', label: 'Texte secondaire' },
  { name: '--text3',   value: '#5c5c78', label: 'Texte tertiaire' },
]

export default function ProductSystemPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-16">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="section-label">Système produit</p>
          <h1 className="text-4xl font-bold mt-1 mb-4" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Architecture ZAWIOS
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
            Documentation interne : design tokens, composants, modules et état de déploiement.
          </p>
        </div>

        {/* Signal visuals — category grid */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text)' }}>
            SignalVisual — Visuels générés par catégorie
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.value}
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <div style={{ height: 72, overflow: 'hidden' }}>
                  <SignalVisual category={cat.value} />
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs font-medium" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                    {cat.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text3)' }}>{cat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Color tokens */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text)' }}>
            Design tokens — Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.name}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <div
                  className="w-8 h-8 flex-shrink-0 rounded-lg"
                  style={{ background: token.value, border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                    {token.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text3)' }}>{token.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Module status */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text)' }}>
            Modules — État de déploiement
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYSTEM_MODULES.map((mod) => (
              <Link
                key={mod.label}
                href={mod.href}
                className="block p-5 rounded-xl card-hover"
                style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{mod.label}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: mod.status === 'live' ? 'rgba(52,208,182,0.12)' : 'rgba(255,255,255,0.06)',
                      color: mod.status === 'live' ? 'var(--teal)' : 'var(--text3)',
                      fontFamily: 'var(--mono)',
                    }}
                  >
                    {mod.status === 'live' ? 'LIVE' : 'PLANNED'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>{mod.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text)' }}>
            Typographie
          </h2>
          <div className="surface rounded-2xl p-8 space-y-6">
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>Sora · Display</p>
              <p className="text-5xl font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>ZAWIOS</p>
            </div>
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>Sora · Body</p>
              <p className="text-base" style={{ color: 'var(--text2)' }}>
                Intelligence collective mondiale — votez, prédisez, comparez.
              </p>
            </div>
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>IBM Plex Mono · Data</p>
              <p className="text-base" style={{ color: 'var(--text)', fontFamily: 'var(--mono)' }}>
                SIGNAL · 73% · 47.8k votes · 2026-12-31
              </p>
            </div>
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>Section label</p>
              <p className="section-label" style={{ marginBottom: 0 }}>World View</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
