import Link from 'next/link'
import { SignupForm } from '@/components/auth/signup-form'
import { IconLogo } from '@/components/ui/icons'
import { formatNumber } from '@/lib/utils'
import { PLATFORM_STATS } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Join ZAWIOS — the collective intelligence and prediction platform.',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-lg">
            <IconLogo size={32} />
            <span className="gradient-text tracking-tight">ZAWIOS</span>
          </Link>
          <h1 className="mt-7 text-2xl font-bold text-[var(--text)]" style={{ letterSpacing: '-0.01em' }}>
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text2)]">
            Join {formatNumber(PLATFORM_STATS.total_users)} predictors. Free forever.
          </p>
        </div>

        <div className="surface rounded-2xl p-7" style={{ border: '1px solid var(--border2)' }}>
          <SignupForm />
        </div>

        <p className="text-center text-sm text-[var(--text3)] mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-[var(--accent2)] hover:text-[var(--accent3)] transition-colors">
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs text-[var(--text3)] mt-3" style={{ opacity: 0.7 }}>
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-[var(--text2)] transition-colors">Terms</Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-[var(--text2)] transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
