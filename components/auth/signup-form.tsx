'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Check your email</h3>
        <p className="text-sm text-zinc-500">
          We&apos;ve sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full name"
        type="text"
        placeholder="Alex Chen"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        autoComplete="name"
      />
      <Input
        label="Username"
        type="text"
        placeholder="alexchen"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
        hint="Only letters, numbers, and underscores"
      />
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        autoComplete="email"
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Minimum 8 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-zinc-400 hover:text-zinc-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        Create free account
      </Button>
    </form>
  )
}
