'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogoLockup } from '@/components/ui/logo'
import { useLanguage } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  const navLinks = [
    { href: '/predictions', label: t.nav.predictions },
    { href: '/leaderboard', label: t.nav.leaderboard },
    { href: '/insights', label: t.nav.insights },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/about', label: t.nav.about },
  ]

  return (
    <header className="sticky top-0 z-50 w-full glass" style={{ borderBottom: '1px solid var(--border)' }}>
      <nav className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="ZAWIOS — Accueil">
            <LogoLockup className="text-lg" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + lang toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-xs font-semibold px-2 py-1 rounded-md transition-colors"
              style={{
                fontFamily: 'var(--mono)',
                color: 'var(--text3)',
                border: '1px solid var(--border)',
                letterSpacing: '0.05em',
              }}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">{t.nav.signin}</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">{t.nav.join}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-xs font-semibold px-2 py-1 rounded-md"
              style={{
                fontFamily: 'var(--mono)',
                color: 'var(--text3)',
                border: '1px solid var(--border)',
                letterSpacing: '0.05em',
              }}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-white/[0.04] transition-colors text-[var(--text2)]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] rounded-lg hover:bg-white/[0.04]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">{t.nav.signin}</Button>
              </Link>
              <Link href="/auth/signup" className="flex-1">
                <Button size="sm" className="w-full">{t.nav.joinMobile}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
