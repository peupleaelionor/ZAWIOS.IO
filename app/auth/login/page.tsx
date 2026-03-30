import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your ZAWIOS account.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-zinc-900 dark:text-white">ZAWIOS</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-500">Sign in to your account</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <LoginForm />
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
