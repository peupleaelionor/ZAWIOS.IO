'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-zinc-900 dark:text-white">ZAWIOS</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Reset password</h1>
          <p className="mt-1 text-sm text-zinc-500">We&apos;ll email you a reset link</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          {sent ? (
            <div className="text-center py-2">
              <p className="text-emerald-600 font-medium mb-2">Email sent!</p>
              <p className="text-sm text-zinc-500">Check your inbox for the reset link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" loading={loading}>
                Send reset link
              </Button>
            </form>
          )}
        </div>

        <Link href="/auth/login" className="flex items-center justify-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 mt-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
