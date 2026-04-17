# ZAWIOS — Architecture

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript strict
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State**: Zustand (client) + TanStack Query (server state)
- **Analytics**: Plausible (privacy-first, no cookies)

## Folder Structure

```
/app              — Next.js App Router pages & layouts
  /admin          — Internal admin tools (role-protected)
  /pro            — Pro tier feature showcase
  /intelligence   — Institutional layer
  /methodology    — System transparency
  /product-system — Design system showcase
/components       — UI components
  /landing        — Homepage sections
  /signals        — Signal feed & cards
  /layout         — Nav, footer
  /ui             — Atomic UI components
  /viral-loop     — Sharing & reputation UI
/config           — App config, feature flags, env validation
/tokens           — Design tokens (colors, spacing, shadows, typography)
/hooks            — React hooks (useFeatureFlag, etc.)
/lib              — Business logic & data
  signal-analytics.ts  — Pure math: polarization, divergence, momentum
  signal-data.ts        — Mock signals + types
  features.ts           — Plan-based feature access control
/scripts          — CLI utilities (data generation, integrity checks)
/tests            — Unit tests (Vitest)
/docs             — Architecture & data model docs
/types            — Shared TypeScript types
```

## Key Principles

1. **No decorative code** — every component has a functional purpose
2. **Pure analytics** — `lib/signal-analytics.ts` is pure math, no UI logic
3. **Feature flags** — `config/feature-flags.ts` for on/off, `lib/features.ts` for plan-based
4. **Mobile-first** — 48px minimum touch targets, bottom nav on mobile
5. **French primary** — Default lang `fr`, full EN support via `lib/i18n.ts`
6. **Dark-first design** — `#0C0D10` base, `#17D5CF` teal accent, `#5A4BFF` purple

## Monetization

See `/docs/monetization.md`.

- **Free**: participate, vote, build reputation
- **Pro** (12€/mo): analytics, historical data, heatmaps
- **Intelligence**: API, datasets, reports (contact-based)

## Data Flow

```
Signal (lib/signals-data.ts)
  → SignalFeed (filter/sort)
  → SignalCard (display + vote)
  → Vote stored optimistically
  → WorldViewComparison (regional breakdown)
  → ReputationBadge (score update)
```

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional:
- `NEXT_PUBLIC_APP_URL` (defaults to `https://zawios.netlify.app`)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

Validated at startup via `config/env.validation.ts`.
