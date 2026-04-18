'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoLockup } from '@/components/ui/logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-lg" aria-label="ZAWIOS — Accueil">
            <LogoLockup className="text-lg" />
          </Link>
          <h1 className="mt-7 text-2xl font-bold text-[var(--text)]" style={{ letterSpacing: '-0.01em' }}>
            Set new password
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text2)]">Choose a strong password for your account</p>
        </div>

        <div className="surface rounded-2xl p-7" style={{ border: '1px solid var(--border2)' }}>
          {done ? (
            <div className="text-center py-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'color-mix(in srgb, var(--teal) 15%, transparent)', color: 'var(--teal)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[var(--text)] mb-1">Password updated</p>
              <p className="text-sm text-[var(--text2)]">Redirecting to your dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{ background: 'color-mix(in srgb, var(--zred) 12%, transparent)', color: 'var(--zred)', border: '1px solid color-mix(in srgb, var(--zred) 25%, transparent)' }}
                >
                  {error}
                </div>
              )}
              <Input
                label="New password"
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Input
                label="Confirm password"
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Button type="submit" className="w-full" loading={loading}>
                Update password
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
