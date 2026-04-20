import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { LogoLockup } from '@/components/ui/logo'
import { copy } from '@/lib/i18n.copy'
import type { Metadata } from 'next'

const c = copy.fr

export const metadata: Metadata = {
  title: c.auth.loginTitle,
  description: c.auth.loginSubtitle,
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
            {c.auth.loginTitle}
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text2)]">{c.auth.loginSubtitle}</p>
        </div>

        <div className="surface rounded-2xl p-7" style={{ border: '1px solid var(--border2)' }}>
          <LoginForm />
        </div>

        <p className="text-center text-sm text-[var(--text3)] mt-6">
          {c.auth.noAccount}{' '}
          <Link href="/auth/signup" className="font-medium text-[var(--accent)] hover:text-[var(--accent2)] transition-colors">
            {c.auth.createFree}
          </Link>
        </p>
      </div>
    </div>
  )
}
