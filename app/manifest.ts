import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'ZAWIOS — Intelligence Collective',
    short_name:       'ZAWIOS',
    description:      'Vote sur les signaux du monde. Compare avec la foule. Construis ta réputation.',
    start_url:        '/',
    display:          'standalone',
    background_color: '#0C0D10',
    theme_color:      '#17D5CF',
    orientation:      'portrait-primary',
    lang:             'fr',
    categories:       ['news', 'social', 'education'],
    icons: [
      {
        src:     '/icons/icon-192.png',
        sizes:   '192x192',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/icons/icon-192-maskable.png',
        sizes:   '192x192',
        type:    'image/png',
        purpose: 'maskable',
      },
      {
        src:     '/icons/icon-512.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/icons/icon-512-maskable.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name:       'Signaux',
        short_name: 'Signaux',
        url:        '/predictions',
        description: 'Voir les signaux actifs',
      },
      {
        name:       'Classement',
        short_name: 'Classement',
        url:        '/leaderboard',
        description: 'Top analystes ZAWIOS',
      },
    ],
    screenshots: [],
  }
}
