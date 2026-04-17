import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CreatePredictionForm } from '@/components/predictions/create-prediction-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nouveau signal',
  description: 'Proposez un nouveau signal sur ZAWIOS.',
}

export default function CreateSignalPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-[var(--text)] mb-2">Proposer un signal</h1>
          <p className="text-[var(--text2)] mb-8">
            Posez une question claire et vérifiable. Chaque signal nécessite un horizon temporel et au moins une hypothèse.
          </p>
          <CreatePredictionForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
