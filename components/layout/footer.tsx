import Link from 'next/link'
import { IconLogo } from '@/components/ui/icons'

const footerLinks = {
  Product: [
    { href: '/predictions', label: 'Predictions' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/insights', label: 'Insights' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/premium', label: 'Premium' },
    { href: '/creator', label: 'Creator' },
    { href: '/business', label: 'Business' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }} className="bg-[var(--bg)]">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg mb-3">
              <IconLogo size={28} />
              <span className="gradient-text tracking-tight">ZAWIOS</span>
            </Link>
            <p className="text-sm text-[var(--text3)] max-w-xs leading-relaxed">
              The world&apos;s collective intelligence platform. See what the crowd thinks before
              it&apos;s right.
            </p>
            <p className="mt-4 text-xs text-[var(--text3)]" style={{ opacity: 0.6 }}>
              &copy; {new Date().getFullYear()} ZAWIOS. All rights reserved.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-[var(--text2)] mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text3)] hover:text-[var(--text)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
