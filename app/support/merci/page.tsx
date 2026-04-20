import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'Merci — ZAWIOS',
  robots: { index: false, follow: false },
}

export default function SupportMerciPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main className="container py-24 text-center">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6"
          style={{ background: 'var(--positive)', opacity: 0.12 }}
          aria-hidden="true"
        />
        <div className="w-12 h-12 rounded-full inline-flex items-center justify-center -mt-[60px] mb-6 relative z-10"
          style={{ background: 'rgba(30,200,138,0.12)', border: '2px solid var(--positive)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--positive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em', fontFamily: 'var(--display-font)' }}
        >
          Merci pour votre soutien.
        </h1>
        <p className="text-base mb-8 mx-auto max-w-sm" style={{ color: 'var(--text-muted)' }}>
          Votre contribution aide ZAWIOS à maintenir son indépendance et son infrastructure mondiale.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ background: 'var(--primary)', color: '#FFFFFF' }}
        >
          Retour à l&apos;accueil
        </Link>
      </main>
    </div>
  )
}
