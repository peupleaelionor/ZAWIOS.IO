import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const variants = {
      primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] focus-visible:ring-[var(--primary)]',
      secondary:
        'bg-[var(--surface-alt)] text-[var(--text-muted)] hover:bg-[var(--surface)] border border-[var(--border)]',
      outline:
        'border border-[var(--border2)] bg-transparent text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-strong)]',
      ghost: 'bg-transparent text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-strong)]',
      danger: 'bg-[var(--negative)] text-white hover:brightness-110 focus-visible:ring-[var(--negative)]',
    }

    const sizes = {
      sm: 'text-sm px-3 py-2 gap-1.5 min-h-[36px]',
      md: 'text-sm px-4 py-2.5 gap-2 min-h-[44px]',
      lg: 'text-base px-6 py-3 gap-2 min-h-[48px]',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
