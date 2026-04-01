'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function ContentsquareProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Load script once
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.querySelector('script[data-cs]')) return

    const script = document.createElement('script')
    script.src = 'https://t.contentsquare.net/uxa/2941cb68340ca.js'
    script.async = true
    script.setAttribute('data-cs', 'true')
    document.head.appendChild(script)
  }, [])

  // Send artificial pageview on route change (SPA)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const cs = (window as any)._uxa // eslint-disable-line @typescript-eslint/no-explicit-any
    if (Array.isArray(cs)) {
      cs.push(['trackPageview', pathname])
    }
  }, [pathname, searchParams])

  return null
}
