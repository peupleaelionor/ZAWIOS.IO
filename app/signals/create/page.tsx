import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Créer un signal',
  description: 'Proposez un nouveau signal stratégique.',
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
              Créer
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: 'var(--display-font)',
                letterSpacing: '-0.02em',
                color: 'var(--text-strong)',
              }}
            >
              Proposez un signal.
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              Partagez votre hypothèse stratégique avec la communauté mondiale.
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
              Le formulaire de création de signal sera bientôt disponible. Pour l'instant, veuillez contacter l'équipe ZAWIOS.
            </p>
            
            <div className="flex gap-3">
              <Link href="/signals" className="flex-1">
                <Button variant="outline" className="w-full">
                  Retour aux signaux
                </Button>
              </Link>
              <Link href="/support" className="flex-1">
                <Button className="w-full">
                  Contacter
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
