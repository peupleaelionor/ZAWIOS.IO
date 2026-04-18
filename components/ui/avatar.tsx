'use client'

import { useState } from 'react'
import { cn, getInitials } from '@/lib/utils'

/** Brand avatars available as fallbacks */
const BRAND_AVATARS = [
  '/avatars/avatar-01.svg',
  '/avatars/avatar-02.svg',
  '/avatars/avatar-03.svg',
  '/avatars/avatar-04.svg',
  '/avatars/avatar-05.svg',
]

/** Deterministic avatar pick based on name string */
function getBrandAvatar(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return BRAND_AVATARS[Math.abs(hash) % BRAND_AVATARS.length]
}

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

/**
 * Robust avatar with automatic fallback:
 * 1. Try user-provided src
 * 2. Fall back to brand SVG avatar (deterministic per name)
 * 3. Final fallback to gradient initials
 */
export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const [brandError, setBrandError] = useState(false)

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }

  const showImage = src && !imgError
  const showBrand = !showImage && !brandError

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

  if (showBrand) {
    return (
      /* eslint-disable-next-line */
      <img
        src={getBrandAvatar(name)}
        alt={name}
        onError={() => setBrandError(true)}
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
