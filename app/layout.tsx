import type { Metadata } from 'next'
import Script from 'next/script'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { GrainOverlay } from '@/components/ui/effects'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ZAWIOS — Vote. Compare. Build your reputation.',
    template: '%s | ZAWIOS',
  },
  description:
    "La couche sociale de l'information. Vote sur l'actualite, compare avec la foule, construis ta reputation.",
  keywords: ['vote', 'signal', 'actualite', 'reputation', 'crowd intelligence', 'opinion', 'ZAWIOS'],
  authors: [{ name: 'ZAWIOS' }],
  creator: 'ZAWIOS',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.io'),
  icons: {
    icon: '/brand/logo/favicon.svg',
    apple: '/brand/logo/icon-192.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://zawios.io',
    siteName: 'ZAWIOS',
    title: 'ZAWIOS — Vote. Compare. Build your reputation.',
    description: "Vote sur l'actualite, compare avec la foule, construis ta reputation.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAWIOS — Vote. Compare. Build your reputation.',
    description: "La couche sociale de l'information.",
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <Script
          defer
          data-domain="zawios.io"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <meta name="theme-color" content="#0C0D10" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased has-mobile-nav" style={{ fontFamily: "var(--font)" }}>
        <GrainOverlay />
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'var(--surface2)',
              border: '1px solid var(--border2)',
              color: 'var(--text)',
              fontFamily: 'var(--font)',
              fontSize: '13px',
            },
          }}
        />
        <AnalyticsProvider>
          <LanguageProvider>
            {children}
            <MobileNav />
          </LanguageProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
