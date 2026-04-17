'use client'

import React from 'react'

interface AppShellProps {
  children: React.ReactNode
}

/**
 * Mobile-first app shell — constrains content to a phone-width container
 * with native-like scrolling. Use as a wrapper inside layouts that need
 * a standalone-app feel (PWA / mobile web).
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <div className="app-content">{children}</div>
    </div>
  )
}
