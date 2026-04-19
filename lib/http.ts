/* eslint-disable no-undef */
/**
 * ZAWIOS — HTTP fetch wrapper
 *
 * Production-grade fetch with:
 *   • AbortController for automatic timeout
 *   • Minimal retry logic (1 retry on network error)
 *   • JSON response parsing with error handling
 *   • Type-safe request/response
 *
 * Usage:
 *   const data = await http.get<Signal[]>('/api/signals')
 *   const result = await http.post('/api/vote', { signalId, vote: 'yes' })
 */

const DEFAULT_TIMEOUT = 10_000 // 10 seconds
const DEFAULT_RETRIES = 1

interface HttpOptions extends Omit<RequestInit, 'body'> {
  timeout?: number
  retries?: number
}

class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown,
  ) {
    super(`HTTP ${status}: ${statusText}`)
    this.name = 'HttpError'
  }
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit & { timeout?: number },
): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchInit } = init
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchInit,
      signal: controller.signal,
    })
    return response
  } finally {
    clearTimeout(id)
  }
}

async function fetchWithRetry(
  url: string,
  init: RequestInit & { timeout?: number; retries?: number },
): Promise<Response> {
  const { retries = DEFAULT_RETRIES, ...fetchInit } = init
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchInit)

      // Don't retry on client errors (4xx) — only on server errors (5xx) or network issues
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response
      }

      // Server error — retry
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
        continue
      }

      return response
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      if (attempt < retries && lastError.name !== 'AbortError') {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)))
        continue
      }
    }
  }

  throw lastError ?? new Error('Fetch failed')
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let body: unknown = null
    try {
      body = await response.json()
    } catch {
      body = await response.text().catch(() => null)
    }
    throw new HttpError(response.status, response.statusText, body)
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = path.startsWith('http') ? path : path
  if (!params) return url
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `${url}?${qs}` : url
}

export const http = {
  async get<T>(
    path: string,
    options: HttpOptions & { params?: Record<string, string | number | boolean | undefined> } = {},
  ): Promise<T> {
    const { params, timeout, retries, ...init } = options
    const url = buildUrl(path, params)
    const response = await fetchWithRetry(url, {
      ...init,
      method: 'GET',
      timeout,
      retries,
    })
    return handleResponse<T>(response)
  },

  async post<T>(
    path: string,
    body?: unknown,
    options: HttpOptions = {},
  ): Promise<T> {
    const { timeout, retries, ...init } = options
    const response = await fetchWithRetry(path, {
      ...init,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      timeout,
      retries,
    })
    return handleResponse<T>(response)
  },

  async patch<T>(
    path: string,
    body?: unknown,
    options: HttpOptions = {},
  ): Promise<T> {
    const { timeout, retries, ...init } = options
    const response = await fetchWithRetry(path, {
      ...init,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      timeout,
      retries,
    })
    return handleResponse<T>(response)
  },

  async delete<T>(
    path: string,
    options: HttpOptions = {},
  ): Promise<T> {
    const { timeout, retries, ...init } = options
    const response = await fetchWithRetry(path, {
      ...init,
      method: 'DELETE',
      timeout,
      retries,
    })
    return handleResponse<T>(response)
  },
}

export { HttpError }
