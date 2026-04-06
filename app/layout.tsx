import type { Metadata } from 'next'
import Script from 'next/script'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { GrainOverlay } from '@/components/ui/effects'
import { MobileNav } from '@/components/layout/mobile-nav'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ZAWIOS — Intelligence collective mondiale',
    template: '%s | ZAWIOS',
  },
  description:
    "Votez, prédisez, comparez. ZAWIOS est la plateforme d'intelligence collective mondiale — construisez votre réputation sur vos prédictions.",
  keywords: [
    'prédictions', 'intelligence collective', 'forecasting', 'réputation',
    'communauté', 'signaux collectifs', 'vote', 'opinions', 'tendances',
  ],
  authors: [{ name: 'ZAWIOS' }],
  creator: 'ZAWIOS',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.netlify.app'),
  // ASSET SLOT — favicon & apple icon: drop final files in /public/brand/
  icons: {
    icon: '/brand/favicon.svg',
    apple: '/brand/apple-touch-icon.png',
    shortcut: '/brand/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://zawios.netlify.app',
    siteName: 'ZAWIOS',
    title: 'ZAWIOS — Intelligence collective mondiale',
    description: "Votez, prédisez, comparez. Construisez votre réputation sur vos prédictions.",
    // ASSET SLOT — OG image: drop /public/brand/og-image.png (1200×630)
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZAWIOS — Intelligence collective mondiale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAWIOS — Intelligence collective mondiale',
    description: "Votez, prédisez, comparez. Construisez votre réputation.",
    // ASSET SLOT — Twitter card: same /brand/og-image.png
    images: ['/brand/og-image.png'],
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
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
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
      <body className="antialiased" style={{ fontFamily: "var(--font)" }}>
        <GrainOverlay />
        <AnalyticsProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AnalyticsProvider>
        <MobileNav />
      </body>
    </html>
  )
}
