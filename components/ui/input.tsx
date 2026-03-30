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
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors duration-200',
            'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100',
            'border-zinc-200 dark:border-zinc-700',
            'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>}
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
