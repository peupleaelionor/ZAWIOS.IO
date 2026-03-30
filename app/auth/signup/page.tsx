import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { SignupForm } from '@/components/auth/signup-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Join ZAWIOS — the collective intelligence and prediction platform.',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-zinc-900 dark:text-white">ZAWIOS</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Create your account</h1>
          <p className="mt-1 text-sm text-zinc-500">Join 47,000 predictors. Free forever.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <SignupForm />
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs text-zinc-400 mt-4">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="underline">Terms</Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
