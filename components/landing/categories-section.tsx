import { SIGNAL_CATEGORIES, CATEGORY_COLORS } from '@/lib/signals-data'

export function CategoriesSection() {
  return (
    <section className="py-10 md:py-16 bg-[var(--bg2)]">
      <div className="container">
        <div className="mb-6 md:mb-10">
          <p className="section-label">Categories</p>
          <h2 className="text-xl md:text-3xl font-bold text-[var(--text)] mt-1" style={{ letterSpacing: '-0.02em' }}>
            Tous les sujets. Toutes les regions.
          </h2>
          <p className="mt-2 text-sm text-[var(--text2)] max-w-md">
            De la tech aux sports, de l&apos;Afrique aux USA — il y a toujours un sujet qui t&apos;interesse.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SIGNAL_CATEGORIES.map((cat) => {
            const colors = CATEGORY_COLORS[cat.id]
            return (
              <span
                key={cat.id}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors hover:brightness-125 cursor-pointer"
                style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.text}20` }}
              >
                {cat.labelFr}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
