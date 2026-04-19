'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Immobilier', href: '#services' },
  { label: 'Emploi', href: '#services' },
  { label: 'Marché', href: '#services' },
  { label: 'KangaPay', href: '#kangapay' },
  { label: 'Agri', href: '#services' },
  { label: 'SIKIN', href: '#services' },
]

export function MabeleHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--surface)]/85 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_1px_0_0_var(--border),0_8px_24px_-12px_rgba(0,0,0,0.08)]'
          : 'bg-[var(--surface)]/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4 lg:px-8">
        <a href="/mabele" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-royal/20 blur-md rounded-full group-hover:bg-royal/30 transition-colors" />
            <Image
              src="/mabele/mabele-logo.png"
              alt="MABELE"
              width={36}
              height={36}
              className="relative object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-xl tracking-tight">
              MABELE
            </span>
            <span className="text-[9px] font-semibold text-[var(--text-muted)] tracking-[0.18em] uppercase mt-0.5">
              by Flow Tech DRC
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-2xl bg-[var(--surface-alt)]/40 border border-[var(--border)]/40">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-1.5 text-[13px] font-semibold text-[var(--text-muted)] hover:text-royal hover:bg-[var(--surface)] rounded-xl transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="#inscription"
            className="px-4 py-2 text-sm font-semibold text-[var(--text-muted)] hover:text-royal transition-colors"
          >
            Se connecter
          </a>
          <a
            href="#inscription"
            className="px-5 py-2.5 text-sm font-bold gradient-golden text-white rounded-xl shadow-golden hover:translate-y-[-1px] transition-all"
          >
            Créer un compte
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[var(--surface)] border-t border-[var(--border)] px-4 pb-6 pt-2 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block px-3 py-3 font-semibold text-[var(--text-muted)] hover:text-royal hover:bg-surface-blue rounded-xl transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <a
              href="#inscription"
              className="flex-1 text-center px-4 py-3 text-sm font-semibold border border-[var(--border)] rounded-xl"
            >
              Se connecter
            </a>
            <a
              href="#inscription"
              className="flex-1 text-center px-4 py-3 text-sm font-bold gradient-golden text-white rounded-xl shadow-golden"
            >
              Créer un compte
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
