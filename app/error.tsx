'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Something went wrong</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          An unexpected error occurred. This has been logged and our team will look into it.
        </p>
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
      </div>
    </div>
  )
}
