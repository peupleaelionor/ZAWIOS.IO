import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { UserContextProvider } from '@/components/providers/user-context-provider'
import { NetworkStatus } from '@/components/layout/network-status'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default:  'ZAWIOS — Intelligence Collective',
    template: '%s | ZAWIOS',
  },
  description:
    "Vote YES ou NO sur les sujets qui font l'actu. Compare ton signal avec la foule mondiale, construis ta réputation d'analyste.",
  keywords: ['prédiction', 'intelligence collective', 'vote', 'réputation', 'signaux', 'actualité', 'analyse', 'forecasting', 'crowd wisdom'],
  authors: [{ name: 'ZAWIOS' }],
  creator: 'ZAWIOS',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.netlify.app'),
  openGraph: {
    type:            'website',
    locale:          'fr_FR',
    alternateLocale: 'en_US',
    url:             'https://zawios.netlify.app',
    siteName:        'ZAWIOS',
    title:           'ZAWIOS — Intelligence Collective',
    description:     'Vote sur les signaux du monde. Compare avec la foule. Construis ta réputation.',
    images: [
      {
        url:    '/social-cards/og-image.png',
        width:  1200,
        height: 630,
        alt:    'ZAWIOS — Intelligence Collective',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'ZAWIOS — Intelligence Collective',
    description: 'Vote sur les signaux du monde. Compare avec la foule.',
    images: ['/social-cards/twitter-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  appleWebApp: {
    capable:        true,
    statusBarStyle: 'black-translucent',
    title:          'ZAWIOS',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  width:          'device-width',
  initialScale:   1,
  maximumScale:   5,
  userScalable:   true,
  viewportFit:    'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <meta name="theme-color" content="#1de4de" />
        <meta name="color-scheme" content="dark" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* PWA meta */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* Plausible */}
        <Script
          defer
          data-domain="zawios.netlify.app"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {/* Service Worker registration */}
        <Script id="sw-register" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .catch(function() { /* SW optional */ });
            });
          }
        `}</Script>
      </head>
      <body className="antialiased has-bottom-nav" style={{ fontFamily: 'var(--font)' }} role="application">
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background:  'var(--surface2)',
              border:      '1px solid var(--border2)',
              color:       'var(--text)',
              fontFamily:  'var(--font)',
              fontSize:    '13px',
            },
          }}
        />
        <QueryProvider>
          <AnalyticsProvider>
            <LanguageProvider>
              <UserContextProvider>
                <NetworkStatus />
                {children}
                <BottomNav />
              </UserContextProvider>
            </LanguageProvider>
          </AnalyticsProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
