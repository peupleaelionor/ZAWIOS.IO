'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconMark, IconArrows, IconCheck } from '@/components/ui/icons'
import { SignalCard, type TriVote } from '@/components/signals/signal-card'
import { SIGNAL_CATEGORIES, SIGNAL_REGIONS, getTrendingSignals, CATEGORY_COLORS, type SignalCategory, type SignalRegion } from '@/lib/signals-data'

type Step = 'interests' | 'vote' | 'result'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('interests')
  const [selectedCategories, setSelectedCategories] = useState<SignalCategory[]>([])
  const [selectedRegions, setSelectedRegions] = useState<SignalRegion[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null)

  const trendingSignal = getTrendingSignals(1)[0]

  const toggleCategory = (cat: SignalCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const toggleRegion = (region: SignalRegion) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    )
  }

  const handleVote = (_signalId: string, vote: TriVote) => {
    setUserVote(vote === 'neutral' ? null : vote)
    setHasVoted(true)
    // Delay to let the vote animation play
    setTimeout(() => setStep('result'), 800)
  }

  const handleFinish = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[var(--surface2)]">
        <div
          className="h-full bg-[var(--teal)] transition-all duration-500 ease-out"
          style={{
            width: step === 'interests' ? '33%' : step === 'vote' ? '66%' : '100%',
          }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-md">

          {/* ─── STEP 1: INTERESTS ─── */}
          {step === 'interests' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <IconMark width={48} leftColor="rgba(255,255,255,0.7)" rightColor="rgba(52,208,182,0.7)" />
                </div>
                <h1 className="text-2xl font-bold text-[var(--text)] mb-2" style={{ letterSpacing: '-0.02em' }}>
                  Qu&apos;est-ce qui t&apos;interesse ?
                </h1>
                <p className="text-sm text-[var(--text2)]">
                  Choisis tes sujets et regions pour personnaliser ton feed.
                </p>
              </div>

              {/* Categories */}
              <div>
                <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--mono)' }}>
                  Sujets
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIGNAL_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id)
                    const colors = CATEGORY_COLORS[cat.id]
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                          isSelected
                            ? 'ring-1'
                            : 'opacity-60 hover:opacity-100',
                        )}
                        style={{
                          background: isSelected ? colors.bg : 'var(--surface2)',
                          color: isSelected ? colors.text : 'var(--text2)',
                          border: isSelected ? `1px solid ${colors.text}40` : '1px solid transparent',
                        }}
                      >
                        {cat.labelFr}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Regions */}
              <div>
                <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--mono)' }}>
                  Regions
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIGNAL_REGIONS.map((region) => {
                    const isSelected = selectedRegions.includes(region.id)
                    return (
                      <button
                        key={region.id}
                        onClick={() => toggleRegion(region.id)}
                        className={cn(
                          'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                          isSelected
                            ? 'bg-[var(--teal)]/15 text-[var(--teal)] ring-1 ring-[var(--teal)]/30'
                            : 'bg-[var(--surface2)] text-[var(--text2)] opacity-60 hover:opacity-100',
                        )}
                      >
                        {region.labelFr}
                      </button>
                    )
                  })}
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => setStep('vote')}
              >
                Continuer <IconArrows className="w-4 h-4" size={16} />
              </Button>

              <button
                onClick={() => setStep('vote')}
                className="w-full text-center text-xs text-[var(--text3)] hover:text-[var(--text2)] transition-colors"
              >
                Passer cette etape
              </button>
            </div>
          )}

          {/* ─── STEP 2: FIRST VOTE ─── */}
          {step === 'vote' && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-[var(--text)] mb-2" style={{ letterSpacing: '-0.02em' }}>
                  Ton premier vote
                </h1>
                <p className="text-sm text-[var(--text2)]">
                  Choisis YES ou NO. Compare-toi a la foule.
                </p>
              </div>

              {trendingSignal && (
                <SignalCard signal={trendingSignal} onVote={handleVote} />
              )}

              {!hasVoted && (
                <p className="text-center text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                  Tape sur YES ou NO pour voter
                </p>
              )}
            </div>
          )}

          {/* ─── STEP 3: RESULT ─── */}
          {step === 'result' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--teal) 15%, transparent)' }}>
                  <IconCheck size={32} className="text-[var(--teal)]" />
                </div>
                <h1 className="text-2xl font-bold text-[var(--text)] mb-2" style={{ letterSpacing: '-0.02em' }}>
                  Signal enregistre
                </h1>
                <p className="text-sm text-[var(--text2)]">
                  Tu as vote <span className="font-bold text-[var(--text)]">{userVote === 'yes' ? 'YES' : 'NO'}</span>.{' '}
                  {trendingSignal && (
                    <>
                      {userVote === 'yes' && trendingSignal.yesPercent > 50 && 'Tu es avec la majorite.'}
                      {userVote === 'yes' && trendingSignal.yesPercent <= 50 && 'Tu es contre la majorite. Audacieux.'}
                      {userVote === 'no' && trendingSignal.noPercent > 50 && 'Tu es avec la majorite.'}
                      {userVote === 'no' && trendingSignal.noPercent <= 50 && 'Tu es contre la majorite. Audacieux.'}
                    </>
                  )}
                </p>
              </div>

              {/* Crowd comparison */}
              {trendingSignal && (
                <div className="surface p-5 rounded-xl">
                  <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--mono)' }}>
                    Comparaison avec la foule
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1.5" style={{ fontFamily: 'var(--mono)' }}>
                        <span className="text-[var(--teal)] font-semibold">YES {trendingSignal.yesPercent}%</span>
                        <span className="text-[var(--text3)]">NO {trendingSignal.noPercent}%</span>
                      </div>
                      <div className="h-2 bg-[var(--surface3)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${trendingSignal.yesPercent}%`,
                            background: 'var(--teal)',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* User position marker */}
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--surface2)]">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: userVote === 'yes' ? 'var(--teal)' : 'var(--text)' }}
                    />
                    <span className="text-xs text-[var(--text2)]">
                      Ton vote : <span className="font-bold text-[var(--text)]">{userVote === 'yes' ? 'YES' : 'NO'}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Reputation preview */}
              <div className="surface p-5 rounded-xl text-center">
                <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--mono)' }}>
                  Ta reputation
                </p>
                <p className="text-3xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--mono)' }}>
                  10
                </p>
                <p className="text-xs text-[var(--text3)] mt-1">points de reputation</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--surface2)', color: 'var(--text2)', fontFamily: 'var(--mono)' }}>
                  Debutant
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleFinish}
              >
                Decouvrir le feed <IconArrows className="w-4 h-4" size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
