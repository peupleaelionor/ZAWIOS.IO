import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CreatePredictionForm } from '@/components/predictions/create-prediction-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create prediction',
  description: 'Create a new prediction on ZAWIOS.',
}

export default function CreatePredictionPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-[var(--text)] mb-2">Create a prediction</h1>
          <p className="text-[var(--text2)] mb-8">
            Ask a clear, verifiable question about the future. Predictions need a resolution date and at least one option.
          </p>
          <CreatePredictionForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
