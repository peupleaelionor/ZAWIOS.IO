'use client'

import { useState } from 'react'
import { cn, getInitials } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

/**
 * Robust avatar with automatic fallback to gradient initials.
 * If the image fails to load (404, network error, etc.) the component
 * silently switches to the initials view — no broken square "?".
 */
export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }

  const showImage = src && !imgError

  if (showImage) {
    return (
      /* eslint-disable-next-line */
      <img
        src={src}
        alt={name}
        onError={() => setImgError(true)}
        className={cn('rounded-full object-cover', sizes[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full text-white flex items-center justify-center font-semibold',
        sizes[size],
        className
      )}
      style={{ background: 'linear-gradient(135deg, var(--teal), var(--accent))' }}
    >
      {getInitials(name)}
    </div>
  )
}
