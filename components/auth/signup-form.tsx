'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/components/providers/language-provider'

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { getAppUrl } = await import('@/lib/utils')
    const appUrl = getAppUrl()
    const { error: err } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          username: form.username,
        },
        emailRedirectTo: `${appUrl}/auth/callback`,
      },
    })

    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="text-center py-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'color-mix(in srgb, var(--teal) 15%, transparent)', color: 'var(--teal)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-[var(--text)] mb-1">{t.auth.checkEmail}</p>
        <p className="text-sm text-[var(--text2)]">
          {t.auth.confirmSent}{' '}
          <span className="font-medium text-[var(--text)]">{form.email}</span>.
        </p>
      </div>
    )
  }

  return (
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
        label={t.auth.nameLabel}
        type="text"
        placeholder="Alex Chen"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        autoComplete="name"
      />
      <Input
        label={t.auth.usernameLabel}
        type="text"
        placeholder="alexchen"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
        hint={t.auth.usernameHint}
      />
      <Input
        label={t.auth.emailLabel}
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        autoComplete="email"
      />
      <div className="relative">
        <Input
          label={t.auth.passwordLabel}
          type={showPassword ? 'text' : 'password'}
          placeholder={t.auth.passwordPlaceholder}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 transition-colors"
          style={{ color: 'var(--text3)' }}
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <Button type="submit" className="w-full" loading={loading}>
        {t.auth.createAccount}
      </Button>
    </form>
  )
}
