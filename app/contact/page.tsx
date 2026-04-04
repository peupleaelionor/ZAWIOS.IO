'use client'
import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'contact@zawios.io',
          subject: `[Contact] ${form.subject}`,
          html: `<p><strong>From:</strong> ${form.name} (${form.email})</p><p>${form.message}</p>`,
        }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="container py-16 flex-1">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Get in touch</h1>
            <p className="mt-3" style={{ color: 'var(--text3)' }}>
              Questions, feedback, or partnership inquiries — we read everything.
            </p>
          </div>

          <div className="surface rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(52,208,182,0.1)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--teal)' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Message sent</h3>
                <p className="text-sm" style={{ color: 'var(--text3)' }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
                <Textarea
                  label="Message"
                  placeholder="Tell us more..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
                {error && <p className="text-sm" style={{ color: 'var(--zred)' }}>{error}</p>}
                <Button type="submit" className="w-full" loading={loading}>
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
