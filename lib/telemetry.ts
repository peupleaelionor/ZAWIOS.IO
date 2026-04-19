/* eslint-disable no-undef */
/**
 * ZAWIOS — Client-side telemetry (minimal, privacy-first)
 *
 * Tracks:
 *   • Vote latency (time from click to server response)
 *   • Feed load time
 *   • Client-side errors (fetch failures, vote failures)
 *   • Route change performance
 *
 * Data is batched and sent to /api/telemetry every 30 seconds.
 * Fully anonymous — no PII, no fingerprinting.
 * Respects navigator.sendBeacon for page unload.
 *
 * Supabase table: client_events
 *   event_name TEXT NOT NULL
 *   value      FLOAT
 *   route      TEXT
 *   metadata   JSONB
 *   created_at TIMESTAMPTZ DEFAULT now()
 *   session_id TEXT (random per-tab, not per-user)
 */

interface TelemetryEvent {
  event: string
  value?: number
  route?: string
  metadata?: Record<string, unknown>
  ts: number
}

const BATCH_INTERVAL = 30_000 // 30 seconds
const MAX_BATCH_SIZE = 50
const ENDPOINT = '/api/telemetry'

let eventQueue: TelemetryEvent[] = []
let sessionId: string | null = null
let batchTimer: ReturnType<typeof setTimeout> | null = null

function getSessionId(): string {
  if (!sessionId) {
    sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36)
  }
  return sessionId
}

function getCurrentRoute(): string {
  if (typeof window === 'undefined') return ''
  return window.location.pathname
}

/**
 * Track a telemetry event.
 * Safe to call from anywhere — no-ops on server side.
 */
export function track(
  event: string,
  value?: number,
  metadata?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return

  // Respect Do Not Track
  if (navigator.doNotTrack === '1') return

  eventQueue.push({
    event,
    value,
    route: getCurrentRoute(),
    metadata,
    ts: Date.now(),
  })

  // Trim if queue is too large
  if (eventQueue.length > MAX_BATCH_SIZE) {
    eventQueue = eventQueue.slice(-MAX_BATCH_SIZE)
  }

  // Start batch timer if not running
  if (!batchTimer) {
    batchTimer = setTimeout(flushEvents, BATCH_INTERVAL)
  }
}

/**
 * Measure the execution time of an async operation.
 * Automatically tracks the result as a telemetry event.
 */
export async function measure<T>(
  eventName: string,
  fn: () => Promise<T>,
): Promise<T> {
  const start = performance.now()
  try {
    const result = await fn()
    const duration = Math.round(performance.now() - start)
    track(eventName, duration, { status: 'success' })
    return result
  } catch (error) {
    const duration = Math.round(performance.now() - start)
    track(eventName, duration, {
      status: 'error',
      error: error instanceof Error ? error.message : 'unknown',
    })
    throw error
  }
}

/**
 * Flush queued events to the server.
 */
function flushEvents(): void {
  batchTimer = null

  if (eventQueue.length === 0) return

  const events = [...eventQueue]
  eventQueue = []

  const payload = JSON.stringify({
    sessionId: getSessionId(),
    events,
  })

  // Use sendBeacon if available (works during page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(ENDPOINT, payload)
    return
  }

  // Fallback to fetch (fire-and-forget)
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Silently fail — telemetry should never break the app
  })
}

// Flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushEvents()
    }
  })
}

/** Pre-defined event names for consistency */
export const TelemetryEvents = {
  VOTE_LATENCY: 'vote_latency',
  FEED_LOAD: 'feed_load',
  SIGNAL_VIEW: 'signal_view',
  COMMENT_POST: 'comment_post',
  SEARCH_QUERY: 'search_query',
  ERROR_FETCH: 'error_fetch',
  ERROR_RENDER: 'error_render',
  NAV_ROUTE: 'nav_route',
  PWA_INSTALL: 'pwa_install',
  OFFLINE_HIT: 'offline_hit',
} as const
