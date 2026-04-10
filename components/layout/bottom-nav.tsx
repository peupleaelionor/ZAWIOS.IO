'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconHome, IconTrending, IconCreate, IconLeaderboard, IconProfile } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/',             label: 'Accueil',  icon: IconHome,        color: 'var(--teal)' },
  { href: '/predictions',  label: 'Signaux',  icon: IconTrending,    color: 'var(--accent2)' },
  { href: '/predictions/create', label: 'Créer', icon: IconCreate,   color: 'var(--pink)' },
  { href: '/leaderboard',  label: 'Top',      icon: IconLeaderboard, color: 'var(--amber)' },
  { href: '/dashboard',    label: 'Profil',   icon: IconProfile,     color: 'var(--teal)' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bottom-nav md:hidden safe-bottom" aria-label="Mobile navigation">
      <div className="flex items-end justify-around h-16 px-2">
        {navItems.map(({ href, label, icon: Icon, color }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          const isCreate  = href === '/predictions/create'

          if (isCreate) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center -mt-3 relative"
                aria-label={label}
              >
                {/* FAB-style create button */}
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-2xl shadow-lg"
                  style={{
                    background:  'linear-gradient(135deg, var(--teal), var(--accent2))',
                    boxShadow:   '0 4px 16px rgba(29,228,222,0.35)',
                    transform:   'translateY(-4px)',
                  }}
                >
                  <Icon size={22} style={{ color: 'var(--bg)' }} />
                </span>
                <span
                  className="text-[9px] font-semibold mt-0.5"
                  style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}
                >
                  {label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5 relative min-w-[56px] min-h-[48px] pb-1"
              aria-label={label}
            >
              {/* Active background pill */}
              {isActive && (
                <span
                  className="absolute top-1 inset-x-1 h-8 rounded-xl"
                  style={{
                    background: `color-mix(in srgb, ${color} 12%, transparent)`,
                    border:     `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
                  }}
                />
              )}

              {/* Icon */}
              <span className="relative z-10">
                <Icon
                  size={19}
                  style={{
                    color:      isActive ? color : 'var(--text3)',
                    filter:     isActive ? `drop-shadow(0 0 6px color-mix(in srgb, ${color} 60%, transparent))` : 'none',
                    transition: 'color 200ms, filter 200ms',
                  }}
                />
              </span>

              {/* Label */}
              <span
                className="relative z-10 text-[9px] font-semibold transition-colors duration-200"
                style={{
                  color:      isActive ? color : 'var(--text3)',
                  fontFamily: 'var(--mono)',
                }}
              >
                {label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: color }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
