import { cn } from '@/lib/utils'
import { type TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--text2)] mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors resize-none',
            'bg-[var(--surface)] text-[var(--text)]',
            'border-[var(--border2)]',
            'placeholder:text-[var(--text3)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent',
            error && 'border-[var(--zred)] focus:ring-[var(--zred)]',
            className
          )}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-xs text-[var(--text3)]">{hint}</p>}
        {error && <p className="mt-1.5 text-xs text-[var(--zred)]">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
