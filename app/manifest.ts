import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZAWIOS',
    short_name: 'ZAWIOS',
    description:
      "La plateforme d'intelligence collective mondiale. Votez, prédisez, construisez votre réputation.",
    start_url: '/',
    display: 'standalone',
    background_color: '#05050A',
    theme_color: '#6B6EF8',
    orientation: 'portrait-primary',
    categories: ['social', 'news'],
    lang: 'fr',
    icons: [
      {
        src: '/favicons/logo-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/app-icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/app-icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
