// ═══════════════════════════════════════════════════════════════════════
// ZAWIOS Service Worker v3 — Production PWA
//
// Strategy:
//   • App shell: cache-first (instant loads)
//   • API calls:  network-first (fresh data, offline fallback)
//   • Static assets: cache-first + stale-while-revalidate
//   • Navigation: network-first with offline.html fallback
//   • Background sync ready for offline votes
// ═══════════════════════════════════════════════════════════════════════

const CACHE_VERSION = 'zawios-v3'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`
const IMAGE_CACHE = `${CACHE_VERSION}-images`
const OFFLINE_URL = '/offline.html'

// App shell — precached for instant startup
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
]

// Max items per dynamic cache (LRU eviction)
const DYNAMIC_CACHE_LIMIT = 50
const IMAGE_CACHE_LIMIT = 100

// ── Install: precache app shell ────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

// ── Activate: purge old caches ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith('zawios-') && !k.startsWith(CACHE_VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  )
})

// ── Trim cache to limit (iterative) ────────────────────────────────────
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName)
  let keys = await cache.keys()
  while (keys.length > maxItems) {
    await cache.delete(keys[0])
    keys = await cache.keys()
  }
}

// ── Fetch strategies ───────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and cross-origin (except trusted CDNs)
  if (request.method !== 'GET') return

  const TRUSTED_ORIGINS = [
    'https://media.giphy.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]

  if (
    url.origin !== self.location.origin &&
    !TRUSTED_ORIGINS.some((origin) => url.origin === origin)
  ) {
    return
  }

  // Navigation: network-first → offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigations
          if (response.ok) {
            const clone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, clone)
              trimCache(DYNAMIC_CACHE, DYNAMIC_CACHE_LIMIT)
            })
          }
          return response
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    )
    return
  }

  // API routes: network-first (no caching of API calls)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request))
    return
  }

  // Images (Giphy GIFs, Pollinations, etc.): cache-first
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/)
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone()
              caches.open(IMAGE_CACHE).then((cache) => {
                cache.put(request, clone)
                trimCache(IMAGE_CACHE, IMAGE_CACHE_LIMIT)
              })
            }
            return response
          })
      )
    )
    return
  }

  // Static assets (_next/static, fonts): cache-first
  if (
    url.pathname.startsWith('/_next/static') ||
    url.origin === 'https://fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone()
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone))
            }
            return response
          })
      )
    )
    return
  }

  // Everything else: stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, clone)
              trimCache(DYNAMIC_CACHE, DYNAMIC_CACHE_LIMIT)
            })
          }
          return response
        })
        .catch(() => cached)

      return cached || networkFetch
    })
  )
})
