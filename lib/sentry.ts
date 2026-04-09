/**
 * Lightweight Sentry error reporting.
 * Uses the Sentry HTTP API to avoid adding a heavy SDK dependency.
 * Falls back silently when SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN is not set.
 */

function getDsn(): string | null {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SENTRY_DSN || null
  }
  return process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || null
}

function parseDsn(dsn: string) {
  // DSN format: https://<key>@<host>/<project_id>
  const match = dsn.match(/^https?:\/\/([^@]+)@([^/]+)\/(.+)$/)
  if (!match) return null
  return { key: match[1], host: match[2], projectId: match[3] }
}

export function captureException(error: unknown, context?: Record<string, unknown>) {
  try {
    const dsn = getDsn()
    if (!dsn) return

    const parsed = parseDsn(dsn)
    if (!parsed) return

    const message = error instanceof Error ? error.message : String(error)
    const stack = error instanceof Error ? error.stack : undefined

    const envelope = JSON.stringify({
      event_id: crypto.randomUUID().replace(/-/g, ''),
      timestamp: new Date().toISOString(),
      platform: 'javascript',
      level: 'error',
      logger: 'zawios',
      message: { formatted: message },
      exception: stack
        ? {
            values: [
              {
                type: error instanceof Error ? error.constructor.name : 'Error',
                value: message,
                stacktrace: { frames: parseStack(stack) },
              },
            ],
          }
        : undefined,
      extra: context,
      environment: process.env.NODE_ENV || 'production',
    })

    const url = `https://${parsed.host}/api/${parsed.projectId}/store/?sentry_key=${parsed.key}&sentry_version=7`

    if (typeof fetch !== 'undefined') {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: envelope,
      }).catch(() => { /* non-blocking */ })
    }
  } catch {
    /* Sentry reporting must never throw */
  }
}

function parseStack(stack: string) {
  return stack
    .split('\n')
    .slice(1, 10)
    .map((line) => {
      const match = line.match(/at\s+(.+?)\s+\((.+):(\d+):(\d+)\)/)
      if (match) {
        return {
          function: match[1],
          filename: match[2],
          lineno: Number(match[3]),
          colno: Number(match[4]),
        }
      }
      return { function: line.trim(), filename: 'unknown', lineno: 0, colno: 0 }
    })
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  try {
    const dsn = getDsn()
    if (!dsn) return

    const parsed = parseDsn(dsn)
    if (!parsed) return

    const envelope = JSON.stringify({
      event_id: crypto.randomUUID().replace(/-/g, ''),
      timestamp: new Date().toISOString(),
      platform: 'javascript',
      level,
      logger: 'zawios',
      message: { formatted: message },
      environment: process.env.NODE_ENV || 'production',
    })

    const url = `https://${parsed.host}/api/${parsed.projectId}/store/?sentry_key=${parsed.key}&sentry_version=7`

    if (typeof fetch !== 'undefined') {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: envelope,
      }).catch(() => { /* non-blocking */ })
    }
  } catch {
    /* non-blocking */
  }
}
