'use client'
import { useState } from 'react'
import { cn, getInitials } from '@/lib/utils'

interface AvatarProps {
  src?: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

function AvatarFallback({ name, size, className }: { name: string; size: keyof typeof SIZES; className?: string }) {
  return (
    <div
      className={cn('rounded-full flex items-center justify-center font-semibold flex-shrink-0', SIZES[size], className)}
      style={{ background: 'linear-gradient(135deg, var(--violet2) 0%, var(--teal) 100%)', color: 'white' }}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  )
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const [error, setError] = useState(false)

  if (src && !error) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover flex-shrink-0', SIZES[size], className)}
        onError={() => setError(true)}
        loading="lazy"
      />
    )
  }

  return <AvatarFallback name={name} size={size} className={className} />
}
