import Link from 'next/link'
import { SIGNAL_CATEGORIES, CATEGORY_COLORS } from '@/lib/signals-data'

// Signal counts + emoji per category
const CATEGORY_META: Record<string, { count: number; emoji: string; sub: string }> = {
  worldview:     { count: 20, emoji: '🌍', sub: '4 continents' },
  news:          { count: 14, emoji: '📰', sub: 'Actualité chaude' },
  tech:          { count: 12, emoji: '🤖', sub: 'Tech & IA' },
  business:      { count: 9,  emoji: '📈', sub: 'Marchés & startups' },
  crypto:        { count: 8,  emoji: '🔐', sub: 'Web3 & DeFi' },
  sports:        { count: 7,  emoji: '⚽', sub: 'Football & + ' },
  culture:       { count: 6,  emoji: '🎭', sub: 'Art & tendances' },
  society:       { count: 7,  emoji: '👥', sub: 'Humanité & droits' },
  entertainment: { count: 5,  emoji: '🎬', sub: 'Séries, films, musique' },
  trends:        { count: 6,  emoji: '🔥', sub: 'Ce qui buzz' },
  fun:           { count: 4,  emoji: '😄', sub: 'Bonne humeur' },
}

export function CategoriesSection() {
  const displayCategories = SIGNAL_CATEGORIES.filter((c) => c.id !== 'worldview')
  const worldview = SIGNAL_CATEGORIES.find((c) => c.id === 'worldview')

  return (
    <section className="py-14 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="container">

        {/* ── Header ── */}
        <div className="mb-8 md:mb-10">
          <p className="section-label">Catégories</p>
          <h2
            className="text-2xl md:text-4xl font-bold mt-1 leading-tight"
            style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}
          >
            Tous les sujets.{' '}
            <span className="gradient-text">Toutes les régions.</span>
          </h2>
          <p className="mt-2 text-sm md:text-base max-w-md" style={{ color: 'var(--text2)' }}>
            De la tech à la culture, du sport à la société — un sujet pour chaque humain sur Terre.
          </p>
        </div>

        {/* ── World View featured card ── */}
        {worldview && (
          <Link
            href="/predictions?category=worldview"
            className="group block mb-4"
          >
            <div
              className="relative rounded-2xl px-6 py-5 overflow-hidden transition-all duration-200"
              style={{
                background:  'linear-gradient(135deg, rgba(29,228,222,0.08) 0%, rgba(108,92,231,0.08) 100%)',
                border:      '1px solid rgba(29,228,222,0.25)',
                boxShadow:   '0 4px 20px rgba(29,228,222,0.08)',
              }}
            >
              {/* Shimmer accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, var(--teal), var(--accent2), var(--teal))', backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}
              />

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🌍</span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-base font-bold" style={{ color: 'var(--text)' }}>World View</span>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(29,228,222,0.15)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}
                      >
                        Live
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text2)' }}>
                      Compare Afrique · France · Europe · USA — 4 continents en temps réel
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
                    20 sujets
                  </span>
                  <span style={{ color: 'var(--teal)' }}>→</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Category emoji grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {displayCategories.map((cat) => {
            const colors = CATEGORY_COLORS[cat.id]
            const meta   = CATEGORY_META[cat.id] ?? { count: 5, emoji: '📌', sub: '' }

            return (
              <Link
                key={cat.id}
                href={`/predictions?category=${cat.id}`}
                className="group relative rounded-2xl p-4 flex flex-col gap-2 transition-all duration-200 overflow-hidden"
                style={{
                  background:  'var(--surface)',
                  border:      `1px solid var(--border2)`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
                  style={{ background: `${colors.bg}` }}
                />

                {/* Emoji */}
                <span className="text-3xl relative z-10">{meta.emoji}</span>

                {/* Name */}
                <div className="relative z-10">
                  <p
                    className="text-[13px] font-bold leading-tight mb-0.5 transition-colors duration-150"
                    style={{ color: 'var(--text)' }}
                  >
                    {cat.labelFr}
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--text3)' }}>
                    {meta.sub}
                  </p>
                </div>

                {/* Count pill */}
                <span
                  className="relative z-10 self-start text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background:  colors.bg,
                    color:       colors.text,
                    fontFamily:  'var(--mono)',
                  }}
                >
                  {meta.count} actifs
                </span>

                {/* Arrow — appears on hover */}
                <span
                  className="absolute top-3 right-3 text-[11px] opacity-0 group-hover:opacity-100 transition-all duration-150"
                  style={{ color: colors.text }}
                >
                  →
                </span>
              </Link>
            )
          })}
        </div>

        {/* ── CTA ── */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/predictions"
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
            style={{
              background:  'var(--teal)',
              color:       'var(--bg)',
              fontFamily:  'var(--font)',
            }}
          >
            Voir tous les signaux
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-150"
            style={{
              background:  'var(--surface)',
              border:      '1px solid var(--border2)',
              color:       'var(--text2)',
              fontFamily:  'var(--font)',
            }}
          >
            Créer un compte gratuit
          </Link>
        </div>
      </div>
    </section>
  )
}
