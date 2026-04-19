import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ── Image optimization — whitelist trusted CDNs only ─────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.giphy.com' },
      { protocol: 'https', hostname: 'image.pollinations.ai' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'fonts.gstatic.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },

  // ── Security headers applied at build-time ───────────────────────────
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
        },
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/api/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
      ],
    },
  ],

  // ── Strict powered-by removal ────────────────────────────────────────
  poweredByHeader: false,

  // ── Compression ──────────────────────────────────────────────────────
  compress: true,
}

export default nextConfig
