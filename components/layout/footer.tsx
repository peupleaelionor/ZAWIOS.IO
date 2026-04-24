'use client'
import Link from 'next/link'
import { LogoLockup } from '@/components/ui/logo'
import { useLanguage } from '@/components/providers/language-provider'

const footerStructure = {
  Product: [
    { href: '/signals', key: 'Signals' },
    { href: '/leaderboard', key: 'Leaderboard' },
    { href: '/insights', key: 'Insights' },
    { href: '/product-system', key: 'Système' },
    { href: '/pricing', key: 'Pricing' },
    { href: '/premium', key: 'Premium' },
    { href: '/creator', key: 'Creator' },
    { href: '/business', key: 'Business' },
  ],
  Company: [
    { href: '/about', key: 'About' },
    { href: '/contact', key: 'Contact' },
    { href: '/faq', key: 'FAQ' },
  ],
  Legal: [
    { href: '/privacy', key: 'Privacy Policy' },
    { href: '/terms', key: 'Terms of Service' },
    { href: '/methodology', key: 'Methodology' },
  ],
} as const

type SectionKey = keyof typeof footerStructure
type LinkKey = typeof footerStructure[SectionKey][number]['key']

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{ borderTop: '1px solid var(--border)' }} className="relative overflow-hidden bg-[var(--bg)]" role="contentinfo">
      {/* Scattered bowtie watermark — subtle brand layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/brand/backgrounds/patterns/bg-scatter.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
          opacity: 0.30,
        }}
      />
      <div className="container relative py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-3" aria-label="ZAWIOS Home">
              <LogoLockup className="text-lg" />
            </Link>
            <p className="text-sm text-[var(--text3)] max-w-xs leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="mt-4 text-xs text-[var(--text3)]" style={{ opacity: 0.6 }}>
              &copy; {new Date().getFullYear()} ZAWIOS. {t.footer.rights}
            </p>
          </div>

          {/* Links */}
          {(Object.entries(footerStructure) as unknown as [SectionKey, { href: string; key: string }[]][]).map(([section, links]) => (
            <nav key={section} aria-label={`${section} links`}>
              <h4 className="text-xs font-semibold text-[var(--text2)] mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                {t.footer.sections[section as keyof typeof t.footer.sections]}
              </h4>
              <ul className="space-y-2" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text3)] hover:text-[var(--text)] transition-colors"
                    >
                      {t.footer.links[link.key as LinkKey]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  )
}
