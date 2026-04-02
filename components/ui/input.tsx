import { cn } from '@/lib/utils'
import { type InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text2)] mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors duration-200',
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
Input.displayName = 'Input'

export { Input }
