'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconHome, IconTrending, IconCreate, IconLeaderboard, IconProfile } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/predictions', label: 'Feed', icon: IconTrending },
  { href: '/predictions/create', label: 'Create', icon: IconCreate },
  { href: '/leaderboard', label: 'Rank', icon: IconLeaderboard },
  { href: '/profile', label: 'Profile', icon: IconProfile },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bottom-nav md:hidden safe-bottom" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] transition-colors duration-150',
                isActive ? 'text-[var(--teal)]' : 'text-[var(--text3)]',
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
