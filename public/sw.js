/**
 * ZAWIOS Service Worker
 * Strategy:
 *   - Static assets (JS/CSS/images): cache-first, stale-while-revalidate
 *   - API routes (/api/*): network-first, fall back to cache if offline
 *   - Pages (HTML): network-first, fall back to offline shell
 *   - Font requests: cache-first (long TTL)
 */

const CACHE_VERSION = 'zawios-v1'
const STATIC_CACHE  = `${CACHE_VERSION}-static`
const API_CACHE     = `${CACHE_VERSION}-api`

const STATIC_PATTERNS = [
  /\/_next\/static\//,
  /\.(?:woff2?|ttf|otf)$/,
  /\.(?:png|jpg|jpeg|webp|svg|ico)$/,
  /\.(?:css)$/,
]

// App shell — precached for instant startup
const PRECACHE_URLS = [
  '/',
  '/offline',
]

// ── Install: precache shell ───────────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => { /* non-fatal */ }),
    ).then(() => self.skipWaiting()),
  )
})

// ── Activate: clean up old caches ────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith('zawios-') && k !== STATIC_CACHE && k !== API_CACHE)
          .map((k) => caches.delete(k)),
      ),
    ).then(() => self.clients.claim()),
  )
})

// ── Fetch ─────────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle same-origin + Google Fonts
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.g')) return
  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Static assets → cache-first
  if (STATIC_PATTERNS.some((p) => p.test(url.pathname) || p.test(url.href))) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // API routes → network-first, short cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE, 30))
    return
  }

  // Pages → network-first, fall back to offline
  event.respondWith(networkFirst(request, STATIC_CACHE, 0))
})

// ── Strategies ────────────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    return new Response('Offline', { status: 503 })
  }
}

async function networkFirst(request, cacheName, maxAgeSeconds) {
  try {
    const response = await fetch(request)
    if (response.ok && cacheName) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) {
      if (maxAgeSeconds > 0) {
        const dateHeader = cached.headers.get('date')
        if (dateHeader) {
          const age = (Date.now() - new Date(dateHeader).getTime()) / 1000
          if (age > maxAgeSeconds) return new Response('Stale', { status: 503 })
        }
      }
      return cached
    }
    // Last resort: offline shell
    const shell = await caches.match('/')
    return shell ?? new Response('Offline', { status: 503 })
  }
}
