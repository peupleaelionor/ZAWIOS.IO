'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { IconLogo } from '@/components/ui/icons'
import { StreakIndicator } from '@/components/streak/streak-indicator'
import { useLanguage } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function Navbar() {
  const [isOpen, setIsOpen]  = useState(false)
  const { lang, setLang, t } = useLanguage()
  const [user, setUser]      = useState<User | null>(null)
  const pathname             = usePathname()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  const navLinks = [
    { href: '/predictions', label: t.nav.predictions },
    { href: '/leaderboard', label: t.nav.leaderboard },
    { href: '/methodology', label: 'Méthodo' },
    { href: '/pricing',     label: t.nav.pricing },
    { href: '/about',       label: t.nav.about },
  ]
  // Secondary: visible on lg+, always in mobile menu
  const secondaryLinks = [
    { href: '/insights',     label: t.nav.insights },
    { href: '/support',      label: t.nav.support },
    { href: '/about',        label: t.nav.about },
  ]
  const navLinks = [...primaryLinks, ...secondaryLinks]

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header
      className="sticky top-0 z-50 w-full glass"
      style={{ borderBottom: '1px solid var(--border)' }}
      role="banner"
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg shrink-0" aria-label="ZAWIOS Home">
            <IconLogo size={32} aria-hidden="true" />
            <span
              className="gradient-text tracking-tight"
              style={{ fontFamily: 'var(--font)', fontWeight: 700 }}
            >
              ZAWIOS
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 overflow-hidden"
                  style={{ color: active ? 'var(--text)' : 'var(--text2)' }}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(29,228,222,0.08)' }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: 'var(--teal)' }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ── Right CTA bar ─────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2.5">
            <StreakIndicator compact />

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors duration-150"
              style={{
                fontFamily:    'var(--mono)',
                color:         'var(--text3)',
                border:        '1px solid var(--border2)',
                letterSpacing: '0.05em',
                background:    'transparent',
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
                <Button variant="ghost" size="sm">{t.nav.dashboard}</Button>
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

          {/* ── Mobile right controls ──────────────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-[11px] font-bold px-2 py-1 rounded-lg"
              style={{
                fontFamily:    'var(--mono)',
                color:         'var(--text3)',
                border:        '1px solid var(--border2)',
                letterSpacing: '0.05em',
              }}
              aria-label={`Switch language to ${lang === 'en' ? 'French' : 'English'}`}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text2)' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ────────────────────────────────────────────── */}
        <div
          id="mobile-nav"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-[420px] pb-4 opacity-100' : 'max-h-0 opacity-0',
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-0.5 pt-2">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm font-medium rounded-xl transition-colors"
                  style={{
                    color:      active ? 'var(--teal)' : 'var(--text2)',
                    background: active ? 'rgba(29,228,222,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}

            <div
              className="flex gap-2 mt-3 pt-3"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {user ? (
                <Link href="/dashboard" className="flex-1">
                  <Button size="sm" className="w-full">{t.nav.dashboard}</Button>
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
