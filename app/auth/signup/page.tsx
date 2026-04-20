import Link from 'next/link'
import { SignupForm } from '@/components/auth/signup-form'
import { LogoLockup } from '@/components/ui/logo'
import { formatNumber } from '@/lib/utils'
import { PLATFORM_STATS } from '@/lib/mock-data'
import { copy } from '@/lib/i18n.copy'
import type { Metadata } from 'next'

const c = copy.fr

export const metadata: Metadata = {
  title: c.auth.signupTitle,
  description: c.auth.signupSubtitle,
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" aria-label="ZAWIOS — Accueil">
            <LogoLockup className="text-lg" />
          </Link>
          <h1 className="mt-7 text-2xl font-bold text-[var(--text)]" style={{ letterSpacing: '-0.01em' }}>
            {c.auth.signupTitle}
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text2)]">
            {c.auth.signupSubtitle}
          </p>
        </div>

        <div className="surface rounded-2xl p-7" style={{ border: '1px solid var(--border2)' }}>
          <SignupForm />
        </div>

        <p className="text-center text-sm text-[var(--text3)] mt-6">
          {c.auth.hasAccount}{' '}
          <Link href="/auth/login" className="font-medium text-[var(--accent)] hover:text-[var(--accent2)] transition-colors">
            {c.auth.signInLink}
          </Link>
        </p>
        <p className="text-center text-xs text-[var(--text3)] mt-3" style={{ opacity: 0.7 }}>
          {c.auth.termsNotice}{' '}
          <Link href="/terms" className="underline hover:text-[var(--text2)] transition-colors">{c.auth.termsLink}</Link>{' '}
          {c.auth.and}{' '}
          <Link href="/privacy" className="underline hover:text-[var(--text2)] transition-colors">{c.auth.privacyLink}</Link>.
        </p>
      </div>
    </div>
  )
}
