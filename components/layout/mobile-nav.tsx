'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconPlus } from '@/components/ui/icons'

const navItems = [
  {
    href: '/',
    label: 'Accueil',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/signals',
    label: 'Explorer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  // Centre: bouton créer
  {
    href: '/propositions',
    label: 'Proposer',
    center: true,
    icon: <IconPlus size={22} />,
  },
  {
    href: '/leaderboard',
    label: 'Scores',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    href: '/dashboard',
    label: 'Profil',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export function MobileNav() {
  const pathname = usePathname()

  // Masqué sur le dashboard (qui a sa propre navigation)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/auth')) {
    return null
  }

  return (
    <>
      {/* Spacer pour compenser la nav fixe */}
      <div className="h-16 md:hidden" aria-hidden="true" />
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(5,5,8,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        aria-label="Navigation principale"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            if (item.center) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center w-14 h-14 rounded-full -mt-5 transition-transform active:scale-95"
                  style={{ background: 'var(--accent)', color: 'var(--bg)', boxShadow: '0 4px 24px rgba(23,213,207,0.45)' }}
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 px-3 py-1 transition-colors"
                style={{ color: isActive ? 'var(--text)' : 'var(--text3)' }}
                aria-label={item.label}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
