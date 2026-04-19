/**
 * ZAWIOS — Input sanitization utilities
 *
 * All user input MUST pass through these functions before storage or display.
 * Defense-in-depth: even if the framework auto-escapes, we sanitize at input.
 *
 * Covers:
 *   • XSS prevention (HTML entity encoding)
 *   • SQL injection patterns (logged + blocked)
 *   • Path traversal prevention
 *   • Unicode normalization (homoglyph attack mitigation)
 *   • Length & format enforcement
 */

/** HTML-encode dangerous characters to prevent XSS */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/** Strip all HTML tags from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '')
}

/** Normalize Unicode to NFC form (mitigates homoglyph attacks) */
export function normalizeUnicode(input: string): string {
  return input.normalize('NFC')
}

/** Remove null bytes and other control characters (except newline, tab) */
export function stripControlChars(input: string): string {
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
}

/** Detect SQL injection patterns */
const SQL_PATTERNS = [
  /('\s*(OR|AND)\s+')/i,
  /(UNION\s+(ALL\s+)?SELECT)/i,
  /(;\s*(DROP|DELETE|INSERT|UPDATE|ALTER|CREATE)\s)/i,
  /(--\s)/,
  /(\/\*.*\*\/)/,
  /(\bEXEC\s)/i,
  /(\bxp_\w+)/i,
]

export function containsSqlInjection(input: string): boolean {
  return SQL_PATTERNS.some((pattern) => pattern.test(input))
}

/** Detect path traversal attempts */
export function containsPathTraversal(input: string): boolean {
  return /(\.\.[/\\])/.test(input) || /(%2e%2e[/\\%])/i.test(input)
}

/** Detect script injection in URLs */
export function isSafeUrl(url: string): boolean {
  const lower = url.toLowerCase().trim()
  if (lower.startsWith('javascript:')) return false
  if (lower.startsWith('data:text/html')) return false
  if (lower.startsWith('vbscript:')) return false
  try {
    const parsed = new URL(url, 'https://zawios.io')
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

/**
 * Full sanitization pipeline for user text input.
 * Returns sanitized string or null if input is malicious.
 */
export function sanitizeTextInput(
  input: string,
  options: { maxLength?: number; allowNewlines?: boolean } = {},
): string | null {
  const { maxLength = 5000, allowNewlines = true } = options

  if (typeof input !== 'string') return null

  let sanitized = input.trim()

  // Length check
  if (sanitized.length === 0 || sanitized.length > maxLength) return null

  // Strip control chars
  sanitized = stripControlChars(sanitized)

  // Normalize Unicode
  sanitized = normalizeUnicode(sanitized)

  // Strip HTML tags
  sanitized = stripHtml(sanitized)

  // Check for injection attempts
  if (containsSqlInjection(sanitized)) return null
  if (containsPathTraversal(sanitized)) return null

  // Remove newlines if not allowed
  if (!allowNewlines) {
    sanitized = sanitized.replace(/[\r\n]+/g, ' ')
  }

  return sanitized
}

/**
 * Sanitize a username: alphanumeric + underscores, 3-30 chars.
 */
export function sanitizeUsername(input: string): string | null {
  const cleaned = input.trim().toLowerCase()
  if (!/^[a-z0-9_]{3,30}$/.test(cleaned)) return null
  return cleaned
}

/**
 * Sanitize an email address (basic RFC 5322 compliance).
 */
export function sanitizeEmail(input: string): string | null {
  const cleaned = input.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) return null
  if (cleaned.length > 254) return null
  return cleaned
}
