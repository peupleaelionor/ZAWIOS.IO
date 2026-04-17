'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const AMOUNTS = [10, 25, 50, 100]

type Frequency = 'once' | 'monthly'

export function SupportForm() {
  const [frequency, setFrequency] = useState<Frequency>('once')
  const [selected, setSelected] = useState<number>(25)
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const amount = custom ? parseInt(custom, 10) : selected

  const handleSubmit = async () => {
    if (!amount || amount < 1) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, frequency }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Une erreur est survenue.')
      }
    } catch {
      setError('Impossible de contacter le serveur de paiement.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Frequency tabs */}
      <div
        className="inline-flex rounded-xl p-1 gap-1"
        style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)' }}
        role="group"
        aria-label="Fréquence de contribution"
      >
        {(['once', 'monthly'] as Frequency[]).map((f) => (
          <button
            key={f}
            onClick={() => setFrequency(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: frequency === f ? 'var(--surface)' : 'transparent',
              color: frequency === f ? 'var(--text-strong)' : 'var(--text-muted)',
              boxShadow: frequency === f ? '0 1px 3px rgba(15,23,42,0.06)' : 'none',
              border: frequency === f ? '1px solid var(--border)' : '1px solid transparent',
            }}
          >
            {f === 'once' ? 'Soutien ponctuel' : 'Soutien mensuel'}
          </button>
        ))}
      </div>

      {/* Amount buttons */}
      <div>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
          Montant suggéré
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => { setSelected(a); setCustom('') }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: selected === a && !custom ? 'var(--primary)' : 'var(--surface)',
                color: selected === a && !custom ? '#FFFFFF' : 'var(--text-strong)',
                border: selected === a && !custom
                  ? '2px solid var(--primary)'
                  : '2px solid var(--border)',
                fontFamily: 'var(--mono)',
              }}
            >
              {a}€
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Autre :</span>
          <div className="relative">
            <input
              type="number"
              min="1"
              placeholder="Montant"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(0) }}
              className="w-28 px-3 py-2 rounded-lg text-sm outline-none transition-all"
              style={{
                background: 'var(--surface)',
                border: custom ? '2px solid var(--primary)' : '2px solid var(--border)',
                color: 'var(--text-strong)',
                fontFamily: 'var(--mono)',
              }}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: 'var(--text-subtle)' }}
            >
              €
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      {error && (
        <p className="text-sm" style={{ color: 'var(--negative)' }}>{error}</p>
      )}
      <Button
        size="lg"
        loading={loading}
        disabled={!amount || amount < 1}
        onClick={handleSubmit}
        className="w-full sm:w-auto"
      >
        {loading ? 'Redirection…' : `Contribuer ${amount ? amount + '€' : ''}${frequency === 'monthly' ? '/mois' : ''} →`}
      </Button>

      <p className="text-xs" style={{ color: 'var(--text-subtle)', fontFamily: 'var(--mono)' }}>
        Paiement sécurisé par Stripe. Aucun rendement financier.
      </p>
    </div>
  )
}
