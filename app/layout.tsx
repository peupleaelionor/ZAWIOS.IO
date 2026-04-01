import type { Metadata } from 'next'
import Script from 'next/script'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ZAWIOS — Collective Intelligence Platform',
    template: '%s | ZAWIOS',
  },
  description:
    "See what the crowd thinks before it's right. ZAWIOS is the world's collective intelligence and prediction platform — vote, predict, build your reputation.",
  keywords: ['prediction', 'collective intelligence', 'forecasting', 'reputation', 'community', 'crowd signals'],
  authors: [{ name: 'ZAWIOS' }],
  creator: 'ZAWIOS',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.netlify.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zawios.netlify.app',
    siteName: 'ZAWIOS',
    title: 'ZAWIOS — Collective Intelligence Platform',
    description: "See what the crowd thinks before it's right. Vote, predict, build your reputation.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAWIOS — Collective Intelligence Platform',
    description: "See what the crowd thinks before it's right.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Plausible — single global script, no duplicates */}
        <Script
          defer
          data-domain="zawios.netlify.app"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
