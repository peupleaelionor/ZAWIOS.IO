import type { MetadataRoute } from 'next'

// PWA manifest — icons will be updated when /public/brand/icon-*.png are delivered
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZAWIOS',
    short_name: 'ZAWIOS',
    description:
      "La plateforme d'intelligence collective mondiale. Votez, prédisez, construisez votre réputation.",
    start_url: '/',
    display: 'standalone',
    background_color: '#050508',
    theme_color: '#050508',
    orientation: 'portrait-primary',
    categories: ['social', 'news'],
    lang: 'fr',
    icons: [
      // ASSET SLOT — replace src paths when /public/brand/icon-*.png are delivered
      {
        src: '/brand/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/brand/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
