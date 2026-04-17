import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { UserContextProvider } from '@/components/providers/user-context-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { NetworkStatus } from '@/components/layout/network-status'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ZAWIOS — Intelligence Collective',
    template: '%s | ZAWIOS',
  },
  description:
    "Vote YES ou NO sur les sujets qui font l'actu. Compare ton signal avec la foule mondiale, construis ta réputation d'analyste.",
  keywords: ['prédiction', 'intelligence collective', 'vote', 'réputation', 'signaux', 'actualité', 'analyse', 'forecasting', 'crowd wisdom'],
  authors: [{ name: 'ZAWIOS' }],
  creator: 'ZAWIOS',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.io'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: 'https://zawios.io',
    siteName: 'ZAWIOS',
    title: 'ZAWIOS — Intelligence Collective',
    description: 'Vote sur les signaux du monde. Compare avec la foule. Construis ta réputation.',
    images: [
      {
        url: '/social-cards/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZAWIOS — Intelligence Collective',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAWIOS — Intelligence Collective',
    description: 'Vote sur les signaux du monde. Compare avec la foule.',
    images: ['/social-cards/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ZAWIOS',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
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
        <link rel="dns-prefetch" href="https://plausible.io" />
        <meta name="theme-color" content="#1C39BB" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Anti-flash: set theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('zawios-theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()` }} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Plausible — single global script, no duplicates */}
        <Script
          defer
          data-domain="zawios.io"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <Script id="sw-register" strategy="afterInteractive">
          {`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`}
        </Script>
      </head>
      <body className="antialiased has-bottom-nav" style={{ fontFamily: "var(--font)" }} role="application">
        <Toaster
          theme="system"
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              color: 'var(--text-strong)',
              fontFamily: 'var(--font)',
              fontSize: '13px',
            },
          }}
        />
        <ThemeProvider>
          <AnalyticsProvider>
            <LanguageProvider>
              <UserContextProvider>
                <NetworkStatus />
                <main>
                  {children}
                </main>
                <BottomNav />
              </UserContextProvider>
            </LanguageProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
