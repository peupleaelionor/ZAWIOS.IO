'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  TrendingUp,
  BarChart2,
  Trophy,
  User,
  PlusCircle,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/predictions', label: 'Predictions', icon: TrendingUp },
  { href: '/dashboard/insights', label: 'Insights', icon: BarChart2 },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 fixed inset-y-0 z-30">
        <div className="flex items-center gap-2 h-16 px-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-zinc-900 dark:text-white">ZAWIOS</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
          <Link
            href="/predictions/create"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Create prediction
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <LogOut className="w-4 h-4" />
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
