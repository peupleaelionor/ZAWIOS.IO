'use client'

/**
 * SuggestionForm — Minimal form to propose a signal subject.
 *
 * Fields: Title (120 chars), Description (300 chars), Category, Horizon.
 * Design: Blanc Royal — Royal Signal Blue CTA, clean borders, institutional.
 */

import { useState } from 'react'
import { toast } from 'sonner'
import { useLanguage } from '@/components/providers/language-provider'
import { SIGNAL_CATEGORIES } from '@/lib/signals-data'
import type { TimeHorizon } from '@/lib/suggestions'

const ROYAL_BLUE = '#1C39BB'

interface SuggestionFormProps {
  onSubmit: (payload: {
    title: string
    description: string
    category: string
    timeHorizon: TimeHorizon
  }) => { success: boolean; error?: string }
  onCancel: () => void
  canSubmit: { allowed: boolean; reason?: string }
}

export function SuggestionForm({
  onSubmit,
  onCancel,
  canSubmit,
}: SuggestionFormProps) {
  const { t } = useLanguage()
  const tp = t.propositions

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('tech')
  const [horizon, setHorizon] = useState<TimeHorizon>('medium')

  if (!canSubmit.allowed) {
    return (
      <div
        className="p-4 rounded-xl text-center"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border2)',
        }}
      >
        <p
          className="text-[12px] text-[var(--text3)]"
          style={{ fontFamily: 'var(--mono)' }}
        >
          {canSubmit.reason === 'antiSpamCooldown'
            ? tp.antiSpamCooldown
            : tp.antiSpamLimit}
        </p>
      </div>
    )
  }

  const handleSubmit = () => {
    const result = onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      timeHorizon: horizon,
    })

    if (result.success) {
      setTitle('')
      setDescription('')
      toast.success(tp.submitted)
      onCancel()
    } else if (result.error === 'tooShort') {
      toast.error(tp.tooShort)
    } else if (result.error === 'duplicate') {
      toast.error('Sujet similaire déjà proposé.')
    }
  }

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${ROYAL_BLUE}25`,
      }}
    >
      <h3
        className="text-[14px] font-bold mb-4"
        style={{ color: ROYAL_BLUE }}
      >
        {tp.formTitle}
      </h3>

      {/* Title */}
      <div className="mb-4">
        <label
          className="block text-[11px] font-semibold mb-1.5"
          style={{ fontFamily: 'var(--mono)', color: 'var(--text2)' }}
        >
          {tp.titleLabel}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 120))}
          placeholder={tp.titlePlaceholder}
          maxLength={120}
          className="w-full px-3 py-2.5 rounded-lg text-[13px] bg-transparent outline-none placeholder:text-[var(--text3)]"
          style={{
            color: 'var(--text)',
            border: '1px solid var(--border2)',
            fontFamily: 'var(--font)',
          }}
        />
        <span
          className="text-[9px] mt-1 block"
          style={{
            fontFamily: 'var(--mono)',
            color: title.length > 100 ? 'var(--warn)' : 'var(--text3)',
          }}
        >
          {title.length}/120
        </span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          className="block text-[11px] font-semibold mb-1.5"
          style={{ fontFamily: 'var(--mono)', color: 'var(--text2)' }}
        >
          {tp.descLabel}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 300))}
          placeholder={tp.descPlaceholder}
          maxLength={300}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg text-[13px] bg-transparent outline-none resize-none placeholder:text-[var(--text3)]"
          style={{
            color: 'var(--text)',
            border: '1px solid var(--border2)',
            fontFamily: 'var(--font)',
          }}
        />
        <span
          className="text-[9px] mt-1 block"
          style={{
            fontFamily: 'var(--mono)',
            color: description.length > 260 ? 'var(--warn)' : 'var(--text3)',
          }}
        >
          {description.length}/300
        </span>
      </div>

      {/* Category + Horizon row */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Category */}
        <div>
          <label
            className="block text-[11px] font-semibold mb-1.5"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text2)' }}
          >
            {tp.categoryLabel}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-[12px] bg-transparent outline-none"
            style={{
              color: 'var(--text)',
              border: '1px solid var(--border2)',
              fontFamily: 'var(--mono)',
            }}
          >
            {SIGNAL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id} style={{ background: 'var(--surface)' }}>
                {cat.labelFr}
              </option>
            ))}
          </select>
        </div>

        {/* Horizon */}
        <div>
          <label
            className="block text-[11px] font-semibold mb-1.5"
            style={{ fontFamily: 'var(--mono)', color: 'var(--text2)' }}
          >
            {tp.horizonLabel}
          </label>
          <select
            value={horizon}
            onChange={(e) => setHorizon(e.target.value as TimeHorizon)}
            className="w-full px-3 py-2 rounded-lg text-[12px] bg-transparent outline-none"
            style={{
              color: 'var(--text)',
              border: '1px solid var(--border2)',
              fontFamily: 'var(--mono)',
            }}
          >
            <option value="short" style={{ background: 'var(--surface)' }}>
              {tp.horizonShort}
            </option>
            <option value="medium" style={{ background: 'var(--surface)' }}>
              {tp.horizonMedium}
            </option>
            <option value="long" style={{ background: 'var(--surface)' }}>
              {tp.horizonLong}
            </option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-[11px] font-semibold"
          style={{
            fontFamily: 'var(--mono)',
            color: 'var(--text3)',
          }}
        >
          {tp.cancel}
        </button>
        <button
          onClick={handleSubmit}
          disabled={title.trim().length < 10}
          className="px-5 py-2 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-30"
          style={{
            fontFamily: 'var(--mono)',
            background: ROYAL_BLUE,
            color: '#fff',
          }}
        >
          {tp.submit}
        </button>
      </div>
    </div>
  )
}
