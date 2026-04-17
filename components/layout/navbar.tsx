'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { LogoLockup } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useLanguage } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => setUser(data.user))
    } catch {}
  }, [])

  // Primary: always visible on desktop
  const primaryLinks = [
    { href: '/signals',       label: t.nav.signals },
    { href: '/leaderboard',   label: t.nav.leaderboard },
    { href: '/intelligence',  label: 'Intelligence' },
  ]
  // Secondary: visible on lg+, always in mobile menu
  const secondaryLinks = [
    { href: '/insights',     label: t.nav.insights },
    { href: '/support',      label: 'Soutenir' },
    { href: '/about',        label: t.nav.about },
  ]
  const navLinks = [...primaryLinks, ...secondaryLinks]

  return (
    <header
      className="sticky top-0 z-50 w-full glass"
      style={{ borderBottom: '1px solid var(--border)' }}
      role="banner"
    >
      <nav className="container" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <Link href="/" aria-label="ZAWIOS — accueil">
            <LogoLockup className="text-base md:text-lg" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: 'var(--text-subtle)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-strong)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-[10px] font-bold px-2 py-1 rounded-md transition-colors"
              style={{
                fontFamily: 'var(--mono)',
                color: 'var(--text-subtle)',
                border: '1px solid var(--border)',
                letterSpacing: '0.08em',
              }}
              aria-label={`Langue : passer en ${lang === 'en' ? 'français' : 'anglais'}`}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            {user ? (
              <Link href="/dashboard" className="flex items-center gap-2">
                <Avatar
                  src={user.user_metadata?.avatar_url}
                  name={user.user_metadata?.full_name || user.email || ''}
                  size="xs"
                />
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" style={{ color: 'var(--text-subtle)' }}>
                    {t.nav.signin}
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">{t.nav.join}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-[10px] font-bold px-2 py-1 rounded-md"
              style={{
                fontFamily: 'var(--mono)',
                color: 'var(--text-subtle)',
                border: '1px solid var(--border)',
                letterSpacing: '0.08em',
              }}
              aria-label="Toggle langue"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          className={cn('md:hidden overflow-hidden transition-all duration-250', isOpen ? 'max-h-80 pb-3' : 'max-h-0')}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col gap-0.5 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
              {user ? (
                <Link href="/dashboard" className="flex-1">
                  <Button size="sm" className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">{t.nav.signin}</Button>
                  </Link>
                  <Link href="/auth/signup" className="flex-1">
                    <Button size="sm" className="w-full">{t.nav.joinMobile}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
