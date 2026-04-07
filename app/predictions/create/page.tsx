'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { IconArrows, IconMark } from '@/components/ui/icons'
import { SIGNAL_CATEGORIES, SIGNAL_REGIONS, type SignalCategory, type SignalRegion } from '@/lib/signals-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function CreateSignalPage() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState<SignalCategory>('tech')
  const [region, setRegion] = useState<SignalRegion>('global')
  const [duration, setDuration] = useState('1 Semaine')
  const [analysisVote, setAnalysisVote] = useState<'yes' | 'no' | null>(null)

  const handleSubmit = () => {
    if (!question.trim()) {
      toast.error('Ajoute une question pour ton signal.')
      return
    }
    toast.success('Signal publie', {
      description: 'Ton signal est maintenant visible dans le feed.',
    })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[var(--text2)] hover:text-[var(--text)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-sm font-semibold text-[var(--text)]">Creer un nouveau signal</h1>
          </div>
          <Link href="/" className="flex items-center gap-1.5">
            <IconMark width={24} />
          </Link>
        </div>
      </header>

      <div className="container max-w-lg py-8">
        <div className="space-y-6">
          {/* Question */}
          <div>
            <label className="text-xs font-medium text-[var(--text2)] mb-2 block">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Will [Tech Company X] reach $100 billion valuation this year?"
              className="w-full p-4 rounded-lg text-sm text-[var(--text)] placeholder:text-[var(--text3)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--teal)]"
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border2)',
                minHeight: '100px',
                fontFamily: 'var(--font)',
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-[var(--text2)] mb-2 block">Categorie</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SignalCategory)}
                className="w-full px-4 py-3 rounded-lg text-sm text-[var(--text)] appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--teal)]"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border2)',
                  fontFamily: 'var(--font)',
                }}
              >
                {SIGNAL_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.labelFr}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text3)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          </div>

          {/* Region + Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--text2)] mb-2 block">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as SignalRegion)}
                className="w-full px-4 py-3 rounded-lg text-sm text-[var(--text)] appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--teal)]"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border2)',
                  fontFamily: 'var(--font)',
                }}
              >
                {SIGNAL_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.labelFr}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text2)] mb-2 block">Duree</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm text-[var(--text)] appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--teal)]"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border2)',
                  fontFamily: 'var(--font)',
                }}
              >
                <option>1 Semaine</option>
                <option>2 Semaines</option>
                <option>1 Mois</option>
                <option>3 Mois</option>
                <option>6 Mois</option>
                <option>1 An</option>
              </select>
            </div>
          </div>

          {/* Analysis vote */}
          <div>
            <label className="text-xs font-medium text-[var(--text2)] mb-3 block">Analyse pour :</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAnalysisVote('yes')}
                className={cn(
                  'py-3.5 rounded-lg text-sm font-bold transition-all duration-200',
                  analysisVote === 'yes'
                    ? 'bg-[var(--teal)] text-[var(--bg)]'
                    : 'text-[var(--text)] hover:bg-[var(--surface3)]',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  border: analysisVote === 'yes' ? '1px solid var(--teal)' : '1px solid var(--border2)',
                }}
              >
                YES
              </button>
              <button
                onClick={() => setAnalysisVote('no')}
                className={cn(
                  'py-3.5 rounded-lg text-sm font-bold transition-all duration-200',
                  analysisVote === 'no'
                    ? 'bg-[var(--text)] text-[var(--bg)]'
                    : 'text-[var(--text)] hover:bg-[var(--surface3)]',
                )}
                style={{
                  fontFamily: 'var(--mono)',
                  border: analysisVote === 'no' ? '1px solid var(--text)' : '1px solid var(--border2)',
                }}
              >
                NO
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleSubmit}
            disabled={!question.trim()}
          >
            Publier le signal <IconArrows className="w-4 h-4" size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
