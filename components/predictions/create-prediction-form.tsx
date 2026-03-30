'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { PlusCircle, X, CheckCircle } from 'lucide-react'

const categoryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'politics', label: 'Politics' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'business', label: 'Business' },
  { value: 'culture', label: 'Culture' },
  { value: 'world', label: 'World' },
]

const typeOptions = [
  { value: 'yes_no', label: 'Yes / No' },
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'probability', label: 'Probability (0–100%)' },
]

export function CreatePredictionForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'technology',
    type: 'yes_no',
    resolution_date: '',
    options: ['Yes', 'No'],
    tags: [] as string[],
    tagInput: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const addOption = () => {
    if (form.options.length < 6) {
      setForm((f) => ({ ...f, options: [...f.options, ''] }))
    }
  }

  const removeOption = (index: number) => {
    setForm((f) => ({ ...f, options: f.options.filter((_, i) => i !== index) }))
  }

  const updateOption = (index: number, value: string) => {
    setForm((f) => ({ ...f, options: f.options.map((o, i) => (i === index ? value : o)) }))
  }

  const addTag = () => {
    const tag = form.tagInput.trim().toLowerCase()
    if (tag && !form.tags.includes(tag) && form.tags.length < 5) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag], tagInput: '' }))
    }
  }

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }))
  }

  const handleTypeChange = (type: string) => {
    const defaultOptions =
      type === 'yes_no'
        ? ['Yes', 'No']
        : type === 'probability'
          ? ['Community estimate']
          : ['Option A', 'Option B']
    setForm((f) => ({ ...f, type, options: defaultOptions }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Prediction submitted!</h3>
        <p className="text-zinc-500 mb-6">Your prediction is under review and will be live shortly.</p>
        <Button onClick={() => setSuccess(false)} variant="outline">Create another</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-6">
      <Input
        label="Question"
        placeholder="Will AI surpass human performance on all benchmarks by 2025?"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        hint="Be specific and verifiable. Good predictions have clear yes/no outcomes."
      />

      <Textarea
        label="Context & description"
        placeholder="Add context that helps people make an informed prediction..."
        rows={4}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Select
          label="Question type"
          options={typeOptions}
          value={form.type}
          onChange={(e) => handleTypeChange(e.target.value)}
        />
      </div>

      <Input
        label="Resolution date"
        type="date"
        value={form.resolution_date}
        onChange={(e) => setForm({ ...form, resolution_date: e.target.value })}
        required
        hint="When will this question be resolved?"
      />

      {/* Options */}
      {form.type !== 'probability' && (
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Answer options
          </label>
          <div className="space-y-2">
            {form.options.map((option, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {form.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    className="p-2.5 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {form.type === 'multiple_choice' && form.options.length < 6 && (
            <button
              type="button"
              onClick={addOption}
              className="mt-2 flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-500"
            >
              <PlusCircle className="w-4 h-4" />
              Add option
            </button>
          )}
        </div>
      )}

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Tags <span className="font-normal text-zinc-400">(optional, max 5)</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.tagInput}
            onChange={(e) => setForm({ ...form, tagInput: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Add tag..."
            className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button type="button" variant="outline" size="sm" onClick={addTag}>Add</Button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {form.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full" loading={loading}>
          Submit prediction for review
        </Button>
        <p className="text-xs text-zinc-400 text-center mt-3">
          Predictions are reviewed by our team before going live. This usually takes less than 24 hours.
        </p>
      </div>
    </form>
  )
}
