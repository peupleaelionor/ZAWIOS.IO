'use client'
import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { IconCheckCircle } from '@/components/ui/icons'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
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
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h1 className="text-3xl font-bold text-[var(--text)]">Get in touch</h1>
            <p className="mt-3 text-[var(--text2)]">
              Questions, feedback, or partnership inquiries — we read everything.
            </p>
          </div>

          <div className="surface rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-[var(--teal)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconCheckCircle className="w-6 h-6 text-[var(--teal)]" size={24} />
                </div>
                <h3 className="font-semibold text-[var(--text)] mb-2">Message sent</h3>
                <p className="text-sm text-[var(--text2)]">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
