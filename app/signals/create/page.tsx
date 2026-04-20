import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { copy } from '@/lib/i18n.copy'

export const metadata: Metadata = {
  title: copy.fr.signalCreate.label,
  description: copy.fr.signalCreate.subtitle,
}

export default function CreateSignalPage() {
  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--background)' }}>
      <Navbar />
      
      <main className="container py-12 md:py-16">
        <div className="max-w-[600px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p 
              className="section-label mb-3"
              style={{ fontFamily: 'var(--mono)' }}
            >
              {copy.fr.signalCreate.label}
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: 'var(--display-font)',
                letterSpacing: '-0.02em',
                color: 'var(--text-strong)',
              }}
            >
              {copy.fr.signalCreate.title}
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {copy.fr.signalCreate.subtitle}
            </p>
          </div>

          {/* Form placeholder */}
          <div
            className="p-8 rounded-xl border"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <p style={{ color: 'var(--text-muted)' }} className="mb-6">
              {copy.fr.signalCreate.comingSoon}
            </p>
            
            <div className="flex gap-3">
              <Link href="/signals" className="flex-1">
                <Button variant="outline" className="w-full">
                  {copy.fr.signalCreate.backToSignals}
                </Button>
              </Link>
              <Link href="/support" className="flex-1">
                <Button className="w-full">
                  {copy.fr.signalCreate.contact}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
