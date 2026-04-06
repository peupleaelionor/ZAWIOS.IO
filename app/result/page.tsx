'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconMark, IconArrows, IconCheck } from '@/components/ui/icons'
import { SignalCard } from '@/components/signals/signal-card'
import { getTrendingSignals, getReputationTier, type Signal } from '@/lib/signals-data'
import { ShareCard } from '@/components/viral-loop/share-card'
import { ReputationBadge } from '@/components/viral-loop/reputation-badge'
import { CrowdComparison } from '@/components/viral-loop/crowd-comparison'
import { NextSignalCard } from '@/components/viral-loop/next-signal-card'

// Mock user data for demonstration
const MOCK_USER = {
  score: 1240,
  accuracy: 68,
  totalVotes: 47,
  correctVotes: 32,
  streak: 5,
}

function checkCorrect(vote: 'yes' | 'no', result?: boolean): boolean {
  if (result === undefined) return false
  return (vote === 'yes' && result === true) || (vote === 'no' && result === false)
}

export default function ResultPage() {
  const [showShare, setShowShare] = useState(false)
  const resolvedSignal: Signal = {
    id: 'result-demo',
    title: 'Apple will launch a foldable iPhone this year',
    description: '',
    category: 'tech',
    region: 'global',
    status: 'resolved',
    yesPercent: 38,
    noPercent: 62,
    totalVotes: 24301,
    createdBy: null,
    resolvedResult: false, // NO was correct
    timeAgo: '2h ago',
  }

  const userVote = 'no' as 'yes' | 'no'
  const wasCorrect = checkCorrect(userVote, resolvedSignal.resolvedResult)

  const tier = getReputationTier(MOCK_USER.score)
  const nextSignals = getTrendingSignals(2)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <IconMark width={32} leftColor="rgba(255,255,255,0.7)" rightColor="rgba(52,208,182,0.7)" />
            <span className="text-sm font-bold text-[var(--text)]">ZAWIOS</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">Feed</Button>
          </Link>
        </div>
      </header>

      <div className="container max-w-lg py-8">
        {/* Result header */}
        <div className="text-center mb-8">
          <div
            className={cn(
              'w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center',
              wasCorrect ? 'bg-[var(--teal)]/15' : 'bg-[var(--zred)]/15',
            )}
          >
            {wasCorrect ? (
              <IconCheck size={40} className="text-[var(--teal)]" />
            ) : (
              <span className="text-3xl font-bold text-[var(--zred)]" style={{ fontFamily: 'var(--mono)' }}>X</span>
            )}
          </div>
          <h1
            className={cn(
              'text-2xl font-bold mb-2',
              wasCorrect ? 'text-[var(--teal)]' : 'text-[var(--zred)]',
            )}
            style={{ letterSpacing: '-0.02em' }}
          >
            {wasCorrect ? 'Tu avais raison' : 'Tu avais tort'}
          </h1>
          <p className="text-sm text-[var(--text2)]">
            {wasCorrect
              ? 'Ton signal etait le bon. +25 points de reputation.'
              : 'Pas cette fois. Continue a voter pour ameliorer ton score.'}
          </p>
        </div>

        {/* Signal result card */}
        <div className="mb-6">
          <SignalCard signal={resolvedSignal} />
        </div>

        {/* Crowd comparison */}
        <CrowdComparison
          signal={resolvedSignal}
          userVote={userVote}
          wasCorrect={wasCorrect}
        />

        {/* Reputation */}
        <ReputationBadge
          score={MOCK_USER.score + (wasCorrect ? 25 : 0)}
          accuracy={MOCK_USER.accuracy}
          totalVotes={MOCK_USER.totalVotes}
          streak={MOCK_USER.streak}
        />

        {/* Share */}
        <div className="mt-6">
          <button
            onClick={() => setShowShare(!showShare)}
            className="w-full surface p-4 rounded-2xl text-center hover:bg-[var(--surface2)] transition-colors"
          >
            <p className="text-sm font-semibold text-[var(--text)]">Partager ce resultat</p>
            <p className="text-xs text-[var(--text3)] mt-0.5">Montre a tes amis que tu avais {wasCorrect ? 'raison' : 'tort'}</p>
          </button>
        </div>

        {showShare && (
          <div className="mt-4">
            <ShareCard
              signal={resolvedSignal}
              userVote={userVote}
              wasCorrect={wasCorrect}
              userScore={MOCK_USER.score}
            />
          </div>
        )}

        {/* Next signals */}
        <div className="mt-8">
          <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--mono)' }}>
            Continue a voter
          </p>
          <div className="space-y-3">
            {nextSignals.map((signal) => (
              <NextSignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>

        {/* Back to feed */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button size="lg" className="w-full gap-2">
              Retour au feed <IconArrows className="w-4 h-4" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
