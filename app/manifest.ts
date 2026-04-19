import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZAWIOS — Intelligence Collective',
    short_name: 'ZAWIOS',
    description:
      "Vote sur les signaux du monde. Compare avec la foule. Construis ta réputation d'analyste.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#1C39BB',
    orientation: 'portrait-primary',
    categories: ['social', 'news', 'education'],
    lang: 'fr',
    dir: 'ltr',
    scope: '/',
    id: '/',
    icons: [
      {
        src: '/brand/logo/zawios-mark-v2.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/pwa-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/pwa-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Signaux du jour',
        short_name: 'Signaux',
        url: '/signals',
        icons: [{ src: '/icons/pwa-192.png', sizes: '192x192' }],
      },
      {
        name: 'Classement',
        short_name: 'Classement',
        url: '/leaderboard',
        icons: [{ src: '/icons/pwa-192.png', sizes: '192x192' }],
      },
      {
        name: 'Mon profil',
        short_name: 'Profil',
        url: '/dashboard',
        icons: [{ src: '/icons/pwa-192.png', sizes: '192x192' }],
      },
    ],
  }
}
