'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconLogo, IconTrending, IconChart, IconTrophy, IconUsers, IconZap, IconTarget } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { href: '/dashboard', label: 'Home', icon: IconTarget },
  { href: '/dashboard/predictions', label: 'Predictions', icon: IconTrending },
  { href: '/dashboard/insights', label: 'Insights', icon: IconChart },
  { href: '/leaderboard', label: 'Leaderboard', icon: IconTrophy },
  { href: '/dashboard/profile', label: 'Profile', icon: IconUsers },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 z-30 glass" style={{ borderRight: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5 h-16 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <IconLogo size={28} />
          <span className="font-bold gradient-text tracking-tight">ZAWIOS</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-[var(--accent)]/10 text-[var(--accent2)]'
                  : 'text-[var(--text2)] hover:bg-white/[0.04] hover:text-[var(--text)]'
              )}
            >
              <Icon className="w-4 h-4" size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 space-y-1" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/predictions/create"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
          >
            <IconZap className="w-4 h-4" size={16} />
            Create prediction
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text2)] hover:bg-white/[0.04] transition-colors"
          >
            <IconTarget className="w-4 h-4" size={16} />
            Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text2)] hover:bg-white/[0.04] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
