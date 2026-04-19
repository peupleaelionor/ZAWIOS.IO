/**
 * ZAWIOS — Security module barrel export
 *
 * Military-grade security infrastructure for 94 countries.
 * Import everything from '@/lib/security' in API routes and middleware.
 */

export { checkRateLimit, rateLimitHeaders, type RateLimitResult, type RateLimitTier } from './rate-limiter'
export { sanitizeTextInput, sanitizeUsername, sanitizeEmail, escapeHtml, stripHtml, isSafeUrl, containsSqlInjection, containsPathTraversal } from './sanitize'
export { applySecurityHeaders, buildCsp, applyApiHeaders } from './headers'
export { generateCsrfToken, validateCsrf, CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from './csrf'
export { validateApiRequest, parseJsonBody, getClientIp, isMaliciousBot } from './request-validator'
