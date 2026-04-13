'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LogoLockup } from '@/components/ui/logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" aria-label="ZAWIOS — Accueil">
            <LogoLockup className="text-lg" />
          </Link>
          <h1 className="mt-7 text-2xl font-bold text-[var(--text)]" style={{ letterSpacing: '-0.01em' }}>
            Reset password
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text2)]">We&apos;ll email you a reset link</p>
        </div>

        <div className="surface rounded-2xl p-7" style={{ border: '1px solid var(--border2)' }}>
          {sent ? (
            <div className="text-center py-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'color-mix(in srgb, var(--teal) 15%, transparent)', color: 'var(--teal)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[var(--text)] mb-1">Email sent</p>
              <p className="text-sm text-[var(--text2)]">Check your inbox for the reset link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                required
              />
              <Button type="submit" className="w-full" loading={loading}>
                Send reset link
              </Button>
            </form>
          )}
        </div>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-1.5 text-sm text-[var(--text3)] hover:text-[var(--text2)] mt-6 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
