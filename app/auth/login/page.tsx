import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { LogoLockup } from '@/components/ui/logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your ZAWIOS account.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" aria-label="ZAWIOS — Accueil">
            <LogoLockup className="text-lg" />
          </Link>
          <h1 className="mt-7 text-2xl font-bold text-[var(--text)]" style={{ letterSpacing: '-0.01em' }}>
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text2)]">Sign in to continue building your track record</p>
        </div>

        <div className="surface rounded-2xl p-7" style={{ border: '1px solid var(--border2)' }}>
          <LoginForm />
        </div>

        <p className="text-center text-sm text-[var(--text3)] mt-6">
          No account yet?{' '}
          <Link href="/auth/signup" className="font-medium text-[var(--accent)] hover:text-[var(--accent2)] transition-colors">
            Create one for free
          </Link>
        </p>
      </div>
    </div>
  )
}
