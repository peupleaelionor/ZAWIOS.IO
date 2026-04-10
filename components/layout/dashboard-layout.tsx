'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  IconLogo,
  IconTrending,
  IconChart,
  IconTrophy,
  IconUsers,
  IconPlus,
  IconTarget,
  IconSettings,
  IconSignOut,
  IconHome,
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const sidebarLinks = [
  { href: '/dashboard',              label: 'Tableau de bord', icon: IconHome },
  { href: '/dashboard/predictions',  label: 'Mes Prédictions', icon: IconTrending },
  { href: '/dashboard/insights',     label: 'Analyses',        icon: IconChart },
  { href: '/leaderboard',            label: 'Classement',      icon: IconTrophy },
  { href: '/dashboard/profile',      label: 'Mon Profil',      icon: IconUsers },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname  = usePathname()
  const router    = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-[220px] xl:w-[240px] fixed inset-y-0 z-30"
        style={{ background: 'var(--surface)', borderRight: '1px solid var(--border2)' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 h-[60px] px-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <IconLogo size={28} />
          <span
            className="font-bold gradient-text tracking-tight text-lg"
            style={{ fontFamily: 'var(--font)' }}
          >
            ZAWIOS
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150',
                  isActive
                    ? 'text-[var(--teal)]'
                    : 'text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/[0.04]',
                )}
                style={{
                  background: isActive ? 'rgba(29,228,222,0.08)' : 'transparent',
                  border:     isActive ? '1px solid rgba(29,228,222,0.15)' : '1px solid transparent',
                }}
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 space-y-0.5" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/predictions/create"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150"
            style={{
              background:  'rgba(29,228,222,0.08)',
              border:      '1px solid rgba(29,228,222,0.2)',
              color:       'var(--teal)',
            }}
          >
            <IconPlus size={16} className="shrink-0" />
            Nouveau signal
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-white/[0.04] transition-all"
          >
            <IconSettings size={16} className="shrink-0" />
            Paramètres
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--text2)] hover:text-[var(--zred)] hover:bg-[rgba(255,77,117,0.06)] transition-all"
          >
            <IconSignOut size={16} className="shrink-0" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-[220px] xl:ml-[240px]">
        {/* Top bar — desktop */}
        <div
          className="hidden lg:flex items-center justify-between h-[60px] px-6 sticky top-0 z-20"
          style={{
            background:   'rgba(13,14,20,0.90)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div />
          <div className="flex items-center gap-3">
            <Link
              href="/predictions/create"
              className="flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-xl transition-all"
              style={{
                background:  'var(--teal)',
                color:       'var(--bg)',
              }}
            >
              <IconPlus size={14} />
              Créer un signal
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
