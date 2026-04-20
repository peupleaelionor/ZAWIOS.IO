'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers/language-provider'

const NUANCE_TAGS = [
  { id: 'depends_region',           fr: 'Dépend de la région',      en: 'Depends on region' },
  { id: 'depends_income',           fr: 'Dépend du revenu',         en: 'Depends on income' },
  { id: 'depends_age',              fr: 'Dépend de l\'âge',         en: 'Depends on age' },
  { id: 'depends_time',             fr: 'Dépend du moment',         en: 'Depends on timing' },
  { id: 'need_more_data',           fr: 'Manque de données',        en: 'Need more data' },
  { id: 'too_complex',              fr: 'Trop complexe',            en: 'Too complex' },
  { id: 'both_sides',               fr: 'Les deux à la fois',       en: 'Both at once' },
  { id: 'depends_country',          fr: 'Dépend du pays',           en: 'Depends on country' },
  { id: 'short_term_yes_long_no',   fr: 'Oui court terme / Non long terme', en: 'Yes short / No long term' },
  { id: 'long_term_yes_short_no',   fr: 'Non court terme / Oui long terme', en: 'No short / Yes long term' },
] as const

type NuanceTag = (typeof NUANCE_TAGS)[number]['id']

interface NuanceSheetProps {
  open: boolean
  onClose: () => void
  onSubmit: (tags: NuanceTag[]) => void
}

export function NuanceSheet({ open, onClose, onSubmit }: NuanceSheetProps) {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState<Set<NuanceTag>>(new Set())

  if (!open) return null

  const toggle = (tag: NuanceTag) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else if (next.size < 3) next.add(tag)
      return next
    })
  }

  const handleSubmit = () => {
    onSubmit([...selected])
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(11,16,32,0.35)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'fr' ? 'Ajouter une nuance' : 'Add nuance'}
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 50,
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderRadius: '20px 20px 0 0',
          padding: '24px 20px',
          paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          boxShadow: '0 -8px 40px rgba(11,16,32,0.12)',
          maxHeight: '80dvh',
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--border2)', margin: '0 auto 20px' }} />

        <h3
          style={{
            fontFamily: 'var(--display-font)',
            fontWeight: 700,
            fontSize: '17px',
            letterSpacing: '-0.02em',
            color: 'var(--text-strong)',
            marginBottom: '6px',
          }}
        >
          {lang === 'fr' ? 'Votre nuance' : 'Your nuance'}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.55 }}>
          {lang === 'fr'
            ? 'Sélectionnez jusqu\'à 3 raisons qui nuancent votre vote.'
            : 'Select up to 3 reasons that nuance your vote.'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {NUANCE_TAGS.map((tag) => {
            const isSelected = selected.has(tag.id)
            return (
              <button
                key={tag.id}
                onClick={() => toggle(tag.id)}
                aria-pressed={isSelected}
                style={{
                  padding: '8px 14px',
                  borderRadius: '100px',
                  border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--primary-soft, var(--royal-soft))' : 'transparent',
                  color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '13px',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 130ms ease',
                  fontFamily: 'var(--font)',
                }}
              >
                {lang === 'fr' ? tag.fr : tag.en}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              minHeight: '44px',
              borderRadius: 'var(--radius)',
              border: '1.5px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {lang === 'fr' ? 'Annuler' : 'Cancel'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            style={{
              flex: 2,
              minHeight: '44px',
              borderRadius: 'var(--radius)',
              border: 'none',
              background: selected.size === 0 ? 'var(--surface-alt)' : 'var(--primary)',
              color: selected.size === 0 ? 'var(--text-subtle)' : '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: selected.size === 0 ? 'default' : 'pointer',
              transition: 'all 150ms ease',
              fontFamily: 'var(--font)',
            }}
          >
            {lang === 'fr' ? 'Confirmer' : 'Confirm'}
          </button>
        </div>
      </div>
    </>
  )
}
