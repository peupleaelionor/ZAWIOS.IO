'use client'

import { useEffect } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
const win = () => window as any

export function CrispProvider() {
  useEffect(() => {
    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    if (!websiteId) return
    if (typeof window === 'undefined') return
    if (win().CRISP_WEBSITE_ID) return

    win().$crisp = []
    win().CRISP_WEBSITE_ID = websiteId

    const script = document.createElement('script')
    script.src = 'https://client.crisp.chat/l.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return null
}

export function openCrispChat() {
  if (typeof window !== 'undefined' && win().$crisp) {
    win().$crisp.push(['do', 'chat:open'])
  }
}

export function trackCrispEvent(event: string, data?: Record<string, string>) {
  if (typeof window !== 'undefined' && win().$crisp) {
    win().$crisp.push(['set', 'session:event', [[[event, data]]]])
  }
}
