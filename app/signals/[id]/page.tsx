import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SignalDetailView } from '@/components/signals/signal-detail-view'
import { mockSignals } from '@/lib/signals-data'
import { copy } from '@/lib/i18n.copy'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const signal = mockSignals.find((s) => s.id === id)
  if (!signal) return { title: copy.fr.signal.notFound }
  return {
    title: signal.title,
    description: signal.description,
    openGraph: {
      title: signal.title,
      description: signal.description,
      ...(signal.coverImage ? { images: [{ url: signal.coverImage, width: 800, height: 450 }] } : {}),
    },
  }
}

export default async function SignalDetailPage({ params }: PageProps) {
  const { id } = await params
  const signal = mockSignals.find((s) => s.id === id)
  if (!signal) notFound()

  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--background)' }}>
      <Navbar />
      <main>
        <SignalDetailView signal={signal} />
      </main>
      <Footer />
    </div>
  )
}
