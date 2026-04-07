'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { IconHome, IconCreate, IconActivity, IconProfile, IconSearch } from '@/components/ui/icons'

const navItems = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/predictions/create', label: 'Create', icon: IconCreate },
  { href: '/predictions', label: 'Feed', icon: IconSearch },
  { href: '/leaderboard', label: 'Activity', icon: IconActivity },
  { href: '/dashboard/profile', label: 'Profile', icon: IconProfile },
]

export function MobileNav() {
  const pathname = usePathname()

  // Hide on onboarding and result pages
  if (pathname?.startsWith('/onboarding') || pathname?.startsWith('/result')) {
    return null
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(12, 13, 16, 0.92)',
        backdropFilter: 'blur(16px) saturate(1.4)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname?.startsWith(item.href))
          const Icon = item.icon
          const isCreate = item.label === 'Create'

          if (isCreate) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--teal), var(--accent))',
                    boxShadow: '0 2px 12px rgba(23, 213, 207, 0.3)',
                  }}
                >
                  <Icon size={22} className="text-[var(--bg)]" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[48px] py-1',
                isActive ? 'text-[var(--text)]' : 'text-[var(--text3)]',
              )}
            >
              <Icon size={20} />
              <span className="text-[9px] font-medium" style={{ fontFamily: 'var(--mono)' }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" style={{ background: 'rgba(12, 13, 16, 0.92)' }} />
    </nav>
  )
}
