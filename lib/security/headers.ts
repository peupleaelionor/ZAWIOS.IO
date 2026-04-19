/**
 * ZAWIOS — Security headers factory
 *
 * Military-grade headers for a platform targeting 94 countries.
 * Applied in both middleware (runtime) and next.config.ts (build-time).
 *
 * Standards:
 *   • OWASP Secure Headers Project
 *   • Mozilla Observatory A+ target
 *   • HSTS preload-ready
 */

import { NextResponse } from 'next/server'

/**
 * Core security headers applied to every response.
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  const h = response.headers

  // Prevent clickjacking
  h.set('X-Frame-Options', 'DENY')

  // Prevent MIME-type sniffing
  h.set('X-Content-Type-Options', 'nosniff')

  // XSS filter (legacy browsers)
  h.set('X-XSS-Protection', '1; mode=block')

  // Strict referrer policy
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // HSTS — 2 years, with preload
  h.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  // Permissions policy — deny all dangerous APIs
  h.set(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=(self)',
      'fullscreen=(self)',
    ].join(', '),
  )

  // Prevent cross-domain policy file loading (Flash/PDF)
  h.set('X-Permitted-Cross-Domain-Policies', 'none')

  // DNS prefetch control
  h.set('X-DNS-Prefetch-Control', 'on')

  // Cross-Origin policies
  h.set('Cross-Origin-Opener-Policy', 'same-origin')
  h.set('Cross-Origin-Resource-Policy', 'same-origin')

  // Cache control for HTML responses (no caching of authenticated content)
  if (!h.has('Cache-Control')) {
    h.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  }

  return response
}

/**
 * Content Security Policy for ZAWIOS.
 *
 * Strict but allows:
 *   • Self-hosted scripts and styles
 *   • Giphy CDN for GIF reactions
 *   • Google Fonts for Sora/Inter/IBM Plex Mono
 *   • Plausible analytics
 *   • Pollinations AI images
 *   • Cloudinary uploads
 *   • Supabase API
 *   • Stripe (payment)
 */
export function buildCsp(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://plausible.io https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://media.giphy.com https://image.pollinations.ai https://res.cloudinary.com https://*.supabase.co",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://plausible.io https://*.supabase.co https://api.stripe.com https://image.pollinations.ai wss://*.supabase.co",
    "frame-src 'self' https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "media-src 'self' https://media.giphy.com",
    "upgrade-insecure-requests",
  ]

  return directives.join('; ')
}

/**
 * API-specific security headers (no-cache, no CORS by default).
 */
export function applyApiHeaders(response: NextResponse): NextResponse {
  const h = response.headers
  h.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  h.set('Pragma', 'no-cache')
  h.set('X-Content-Type-Options', 'nosniff')
  return response
}
