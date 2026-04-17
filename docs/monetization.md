# ZAWIOS — Monetization

## Core Principle

**Monetize depth. Not participation.**

Public participation (voting, reputation, leaderboard) is always free.
Premium layers unlock analytical depth and institutional access.

## Tiers

### Gratuit (Free)
- Vote YES / NO / NEUTRE
- World View basic
- Profile & basic reputation
- Public leaderboard
- Create signals

### Pro (12€/month)
- Deep regional divergence analysis
- Historical trend data
- Vote evolution over time
- Polarization index
- Neutral trend tracking
- Personal accuracy dashboard
- Regional heatmap
- Advanced reputation metrics

Feature flag: `enableProFeatures`
Access check: `hasAccess(plan, 'deepRegionalDivergence')` etc.

### Intelligence (contact-based, no public pricing)
- Full API access
- Data exports (CSV, Parquet)
- Regional sentiment datasets
- Custom reports
- Global Signal Index
- SLA & dedicated support

## UI Rules

- **No "Upgrade now" banners**
- Use: "Accéder à l'analyse complète" or "Voir les données complètes"
- Lock indicator: subtle `<ProGate />` component
- No aggressive upsell copy

## Anti-patterns (banned)

- Advertising
- Gamification monetization
- Attention capture
- Dark patterns

## Revenue Model

SaaS only. No ads. No data brokerage.
