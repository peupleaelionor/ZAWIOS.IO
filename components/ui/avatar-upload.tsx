'use client'

import { useState, useRef } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { IconEdit } from '@/components/ui/icons'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { toast } from 'sonner'

interface AvatarUploadProps {
  currentUrl?: string | null
  name: string
}

export function AvatarUpload({ currentUrl, name }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState(currentUrl || '')
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5 MB')
      return
    }

    setUploading(true)
    try {
      const { url } = await uploadToCloudinary(file, 'zawios/avatars')
      setAvatarUrl(url)

      // Save to profile
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: url }),
      })

      if (!res.ok) throw new Error('Failed to save')
      toast.success('Avatar updated')
    } catch {
      toast.error('Failed to upload avatar')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative inline-block mb-4">
      <Avatar src={avatarUrl} name={name} size="xl" />
      <button
        type="button"
        aria-label="Upload profile photo"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-0 right-0 w-7 h-7 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg disabled:opacity-50"
      >
        {uploading ? (
          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <IconEdit className="w-3.5 h-3.5 text-white" size={14} />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  )
}
