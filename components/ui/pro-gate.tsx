'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { type Feature, getAccessPrompt } from '@/lib/features'

interface ProGateProps {
  feature: Feature
  className?: string
  /** Show as inline blur overlay or standalone block */
  mode?: 'overlay' | 'block'
  children?: React.ReactNode
}

/** Subtle lock icon SVG — no external dependencies */
function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="6" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * ProGate — subtle gated feature indicator.
 * Never shows "Upgrade now". Uses analytical language only.
 */
export function ProGate({ feature, className, mode = 'overlay', children }: ProGateProps) {
  const prompt = getAccessPrompt(feature)

  if (mode === 'overlay' && children) {
    return (
      <div className={cn('relative', className)}>
        {/* Blurred content */}
        <div style={{ filter: 'blur(3px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.4 }}>
          {children}
        </div>
        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              color: 'var(--text2)',
              fontFamily: 'var(--mono)',
            }}
          >
            <LockIcon />
            <Link
              href={prompt.href}
              className="hover:text-[var(--teal)] transition-colors"
            >
              {prompt.label}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Block mode: standalone indicator
  return (
    <div
      className={cn('flex items-center gap-2 py-2.5 px-3 rounded-lg', className)}
      style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
      }}
    >
      <span style={{ color: 'var(--text3)' }}>
        <LockIcon />
      </span>
      <Link
        href={prompt.href}
        className="text-[11px] font-semibold text-[var(--text3)] hover:text-[var(--teal)] transition-colors"
        style={{ fontFamily: 'var(--mono)' }}
      >
        {prompt.label} →
      </Link>
    </div>
  )
}
