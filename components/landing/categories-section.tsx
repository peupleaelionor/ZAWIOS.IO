'use client'

import Link from 'next/link'
import { SIGNAL_CATEGORIES, CATEGORY_COLORS } from '@/lib/signals-data'
import { useLanguage } from '@/components/providers/language-provider'

// Signal counts per category (approx from data)
const CATEGORY_COUNTS: Record<string, number> = {
  worldview: 20,
  news: 14,
  tech: 12,
  business: 9,
  crypto: 8,
  sports: 7,
  culture: 6,
  society: 7,
  entertainment: 5,
  trends: 6,
  fun: 4,
  work: 8,
  education: 6,
  health: 9,
  housing: 5,
  climate: 7,
  relationships: 4,
  youth: 5,
  spirituality: 3,
  finance: 6,
  geopolitics: 10,
}

// Minimal monochrome SVG mini-assets per category
function MiniAsset({ category }: { category: string }) {
  const color = 'rgba(255,255,255,0.07)'
  const stroke = 'rgba(255,255,255,0.18)'

  switch (category) {
    case 'news':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <rect x="4" y="6" width="36" height="28" rx="3" stroke={stroke} strokeWidth="1.2" />
          <line x1="10" y1="14" x2="34" y2="14" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="10" y1="19" x2="28" y2="19" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="10" y1="24" x2="31" y2="24" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="52" cy="20" r="8" stroke="rgba(65,105,225,0.25)" strokeWidth="1" />
          <circle cx="52" cy="20" r="4" fill="rgba(65,105,225,0.12)" />
        </svg>
      )
    case 'tech':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <rect x="20" y="10" width="24" height="20" rx="3" stroke={stroke} strokeWidth="1.2" />
          <line x1="26" y1="16" x2="38" y2="16" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
          <line x1="26" y1="20" x2="34" y2="20" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
          <line x1="26" y1="24" x2="36" y2="24" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
          <circle cx="8" cy="14" r="3" stroke={stroke} strokeWidth="1" />
          <line x1="11" y1="14" x2="20" y2="14" stroke={stroke} strokeWidth="0.8" />
          <circle cx="8" cy="26" r="3" stroke={stroke} strokeWidth="1" />
          <line x1="11" y1="26" x2="20" y2="26" stroke={stroke} strokeWidth="0.8" />
          <circle cx="56" cy="20" r="3" stroke="rgba(65,105,225,0.3)" strokeWidth="1" />
          <line x1="44" y1="20" x2="53" y2="20" stroke="rgba(65,105,225,0.2)" strokeWidth="0.8" />
        </svg>
      )
    case 'business':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <line x1="8" y1="32" x2="56" y2="32" stroke={stroke} strokeWidth="1" />
          <rect x="10" y="22" width="8" height="10" rx="1" fill={color} stroke={stroke} strokeWidth="1" />
          <rect x="24" y="16" width="8" height="16" rx="1" fill={color} stroke={stroke} strokeWidth="1" />
          <rect x="38" y="10" width="8" height="22" rx="1" fill="rgba(65,105,225,0.08)" stroke="rgba(65,105,225,0.3)" strokeWidth="1" />
          <polyline points="10,22 28,14 46,8" stroke="rgba(65,105,225,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    case 'crypto':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="32" cy="20" r="14" stroke={stroke} strokeWidth="1.2" />
          <text x="32" y="25" textAnchor="middle" fontSize="14" fontWeight="600" fill="rgba(65,105,225,0.35)" fontFamily="monospace">₿</text>
          <circle cx="32" cy="20" r="9" stroke="rgba(65,105,225,0.1)" strokeWidth="1" strokeDasharray="2 3" />
        </svg>
      )
    case 'sports':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="32" cy="20" r="14" stroke={stroke} strokeWidth="1.2" />
          <path d="M22 14 C26 18 38 18 42 14" stroke={stroke} strokeWidth="1" fill="none" />
          <path d="M20 22 C24 26 40 26 44 22" stroke={stroke} strokeWidth="1" fill="none" />
          <line x1="32" y1="6" x2="32" y2="34" stroke={stroke} strokeWidth="0.8" />
        </svg>
      )
    case 'culture':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <path d="M12 32 Q20 10 32 20 Q44 30 52 8" stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="20" r="3" fill="rgba(65,105,225,0.2)" stroke="rgba(65,105,225,0.4)" strokeWidth="1" />
          <circle cx="12" cy="32" r="2" fill={color} stroke={stroke} strokeWidth="1" />
          <circle cx="52" cy="8" r="2" fill={color} stroke={stroke} strokeWidth="1" />
        </svg>
      )
    case 'society':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="20" cy="16" r="6" stroke={stroke} strokeWidth="1.2" />
          <circle cx="36" cy="16" r="6" stroke={stroke} strokeWidth="1.2" />
          <circle cx="28" cy="14" r="6" stroke="rgba(65,105,225,0.3)" strokeWidth="1.2" />
          <path d="M10 32 Q20 24 28 26 Q36 24 46 32" stroke={stroke} strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'entertainment':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="32" cy="20" r="14" stroke={stroke} strokeWidth="1.2" />
          <polygon points="28,14 28,26 42,20" fill="rgba(65,105,225,0.12)" stroke="rgba(65,105,225,0.35)" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      )
    case 'trends':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <polyline points="8,30 20,22 32,26 44,14 56,10" stroke="rgba(65,105,225,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="56" cy="10" r="3" fill="rgba(65,105,225,0.2)" stroke="rgba(65,105,225,0.5)" strokeWidth="1" />
          <polyline points="8,34 56,34" stroke={stroke} strokeWidth="0.8" />
        </svg>
      )
    case 'fun':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="32" cy="20" r="14" stroke={stroke} strokeWidth="1.2" />
          <circle cx="27" cy="17" r="2" fill={stroke} />
          <circle cx="37" cy="17" r="2" fill={stroke} />
          <path d="M26 24 Q32 29 38 24" stroke="rgba(65,105,225,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'worldview':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <ellipse cx="32" cy="20" rx="14" ry="14" stroke={stroke} strokeWidth="1.2" />
          <ellipse cx="32" cy="20" rx="8" ry="14" stroke={stroke} strokeWidth="0.8" />
          <line x1="18" y1="20" x2="46" y2="20" stroke={stroke} strokeWidth="0.8" />
          <line x1="20" y1="14" x2="44" y2="14" stroke={stroke} strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="20" y1="26" x2="44" y2="26" stroke={stroke} strokeWidth="0.6" strokeDasharray="2 2" />
          <circle cx="32" cy="20" r="2" fill="rgba(65,105,225,0.3)" />
        </svg>
      )
    case 'work':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <rect x="16" y="10" width="32" height="22" rx="3" stroke={stroke} strokeWidth="1.2" />
          <line x1="16" y1="16" x2="48" y2="16" stroke={stroke} strokeWidth="1" />
          <rect x="28" y="12" width="8" height="8" rx="1.5" stroke="rgba(65,105,225,0.3)" strokeWidth="1" fill="rgba(65,105,225,0.08)" />
        </svg>
      )
    case 'education':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <path d="M32 8 L52 18 L32 28 L12 18 Z" stroke={stroke} strokeWidth="1.2" fill={color} />
          <line x1="32" y1="28" x2="32" y2="36" stroke="rgba(65,105,225,0.3)" strokeWidth="1" />
          <path d="M20 22 L20 30 Q32 36 44 30 L44 22" stroke={stroke} strokeWidth="0.8" fill="none" />
        </svg>
      )
    case 'health':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <rect x="28" y="8" width="8" height="24" rx="2" fill="rgba(65,105,225,0.1)" stroke="rgba(65,105,225,0.3)" strokeWidth="1" />
          <rect x="20" y="16" width="24" height="8" rx="2" fill="rgba(65,105,225,0.1)" stroke="rgba(65,105,225,0.3)" strokeWidth="1" />
        </svg>
      )
    case 'housing':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <path d="M32 8 L50 22 L50 34 L14 34 L14 22 Z" stroke={stroke} strokeWidth="1.2" fill={color} />
          <rect x="27" y="24" width="10" height="10" rx="1" stroke={stroke} strokeWidth="1" />
        </svg>
      )
    case 'climate':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="24" cy="22" r="10" stroke="rgba(65,105,225,0.3)" strokeWidth="1.2" fill="rgba(65,105,225,0.06)" />
          <path d="M34 16 Q42 12 48 18 Q54 18 54 24 Q54 30 48 30 L24 30" stroke={stroke} strokeWidth="1" fill="none" />
        </svg>
      )
    case 'relationships':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="24" cy="18" r="6" stroke={stroke} strokeWidth="1.2" />
          <circle cx="40" cy="18" r="6" stroke={stroke} strokeWidth="1.2" />
          <path d="M18 30 Q24 24 32 26 Q40 24 46 30" stroke="rgba(65,105,225,0.3)" strokeWidth="1" fill="none" />
        </svg>
      )
    case 'youth':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="32" cy="14" r="6" stroke={stroke} strokeWidth="1.2" />
          <path d="M22 34 Q32 24 42 34" stroke={stroke} strokeWidth="1" fill="none" />
          <line x1="32" y1="20" x2="32" y2="28" stroke={stroke} strokeWidth="1" />
        </svg>
      )
    case 'spirituality':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <circle cx="32" cy="20" r="12" stroke={stroke} strokeWidth="1.2" />
          <circle cx="32" cy="20" r="6" stroke="rgba(65,105,225,0.3)" strokeWidth="0.8" />
          <circle cx="32" cy="20" r="2" fill="rgba(65,105,225,0.4)" />
        </svg>
      )
    case 'finance':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <line x1="10" y1="32" x2="54" y2="32" stroke={stroke} strokeWidth="1" />
          <rect x="14" y="24" width="6" height="8" rx="1" fill={color} stroke={stroke} strokeWidth="1" />
          <rect x="24" y="18" width="6" height="14" rx="1" fill={color} stroke={stroke} strokeWidth="1" />
          <rect x="34" y="12" width="6" height="20" rx="1" fill="rgba(65,105,225,0.08)" stroke="rgba(65,105,225,0.3)" strokeWidth="1" />
          <rect x="44" y="8" width="6" height="24" rx="1" fill="rgba(65,105,225,0.08)" stroke="rgba(65,105,225,0.3)" strokeWidth="1" />
        </svg>
      )
    case 'geopolitics':
      return (
        <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
          <ellipse cx="32" cy="20" rx="20" ry="14" stroke={stroke} strokeWidth="1.2" />
          <ellipse cx="32" cy="20" rx="10" ry="14" stroke={stroke} strokeWidth="0.8" />
          <line x1="12" y1="20" x2="52" y2="20" stroke={stroke} strokeWidth="0.8" />
        </svg>
      )
    default:
      return null
  }
}

export function CategoriesSection() {
  const displayCategories = SIGNAL_CATEGORIES.filter((c) => c.id !== 'worldview')
  const { t } = useLanguage()

  return (
    <section className="py-12 md:py-20" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="section-label">{t.categories.label}</p>
          <h2
            className="text-2xl md:text-4xl font-bold text-[var(--text)] mt-1 leading-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.categories.title}
          </h2>
          <p className="mt-2 text-sm text-[var(--text2)] max-w-md leading-relaxed">
            {t.categories.subtitle}
          </p>
        </div>

        {/* Category rows */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border2)' }}
        >
          {displayCategories.map((cat, i) => {
            const colors = CATEGORY_COLORS[cat.id]
            const count = CATEGORY_COUNTS[cat.id] ?? 5
            const isLast = i === displayCategories.length - 1
            return (
              <Link
                key={cat.id}
                href={`/predictions?category=${cat.id}`}
                className="group flex items-center justify-between px-5 py-4 transition-colors duration-150 hover:bg-white/[0.025]"
                style={{
                  borderBottom: isLast ? 'none' : '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              >
                {/* Left: color dot + label */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: colors.text }}
                  />
                  <span
                    className="text-[15px] font-semibold text-[var(--text)] group-hover:text-white transition-colors"
                  >
                    {cat.labelFr}
                  </span>
                </div>

                {/* Middle: count */}
                <div className="flex items-center gap-4 ml-auto mr-4">
                  <span
                    className="text-[11px] font-medium whitespace-nowrap"
                    style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}
                  >
                    {count} {t.categories.activeSignals}
                  </span>
                  <span
                    className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ fontFamily: 'var(--mono)', color: colors.text }}
                  >
                    →
                  </span>
                </div>

                {/* Right: mini asset */}
                <div className="shrink-0 opacity-60 group-hover:opacity-90 transition-opacity">
                  <MiniAsset category={cat.id} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href="/predictions"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'var(--teal)',
              color: 'var(--bg)',
              fontFamily: 'var(--font)',
            }}
          >
            {t.categories.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}