/**
 * ZAWIOS — CSRF protection utilities
 *
 * Double-submit cookie pattern:
 *   1. Server sets a random token in a cookie (HttpOnly=false so JS can read it)
 *   2. Client sends the token as X-CSRF-Token header
 *   3. Server validates cookie === header
 *
 * For Next.js API routes with Supabase auth, the auth token itself
 * provides session binding. This CSRF layer adds defense-in-depth
 * for state-changing mutations.
 */

const CSRF_COOKIE_NAME = '__zawios_csrf'
const CSRF_HEADER_NAME = 'x-csrf-token'
const TOKEN_LENGTH = 32

/** Generate a cryptographically random CSRF token */
export function generateCsrfToken(): string {
  const buffer = new Uint8Array(TOKEN_LENGTH)
  crypto.getRandomValues(buffer)
  return Array.from(buffer, (b) => b.toString(16).padStart(2, '0')).join('')
}

/** Validate that the CSRF header matches the cookie */
export function validateCsrf(request: Request, cookieValue: string | undefined): boolean {
  if (!cookieValue) return false
  const headerValue = request.headers.get(CSRF_HEADER_NAME)
  if (!headerValue) return false

  // Constant-time comparison to prevent timing attacks
  if (cookieValue.length !== headerValue.length) return false
  let mismatch = 0
  for (let i = 0; i < cookieValue.length; i++) {
    mismatch |= cookieValue.charCodeAt(i) ^ headerValue.charCodeAt(i)
  }
  return mismatch === 0
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME }
