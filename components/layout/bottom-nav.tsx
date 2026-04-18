'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconHome, IconTrending, IconCreate, IconLeaderboard, IconProfile } from '@/components/ui/icons'
import { useLanguage } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: '/',              label: t.nav.home,        icon: IconHome },
    { href: '/signals',       label: t.nav.signals,     icon: IconTrending },
    { href: '/signals/create',label: t.nav.create,      icon: IconCreate },
    { href: '/leaderboard',   label: t.nav.leaderboard, icon: IconLeaderboard },
    { href: '/profile',       label: t.nav.profile,     icon: IconProfile },
  ]

  return (
    <nav className="bottom-nav safe-bottom" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] transition-colors duration-150',
                isActive ? 'text-[var(--primary)]' : 'text-[var(--text-subtle)]',
              )}
            >
              <Icon size={20} className="w-5 h-5" />
              <span className="text-[10px] font-medium" style={{ fontFamily: 'var(--mono)' }}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
