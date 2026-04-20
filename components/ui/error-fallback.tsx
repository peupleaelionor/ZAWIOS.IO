'use client'

/**
 * ZAWIOS — Error fallback component
 *
 * Used with react-error-boundary to display a branded error state
 * when a component tree crashes. Includes retry functionality.
 */

import { type FallbackProps } from 'react-error-boundary'

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Une erreur est survenue lors du chargement. Réessayez dans un instant.'
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(229, 72, 77, 0.08)' }}
      >
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--negative)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: 'var(--text-strong)' }}
      >
        Erreur inattendue
      </h3>

      <p
        className="text-sm mb-6 max-w-sm"
        style={{ color: 'var(--text-muted)' }}
      >
        {message}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        style={{
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Réessayer
      </button>
    </div>
  )
}
