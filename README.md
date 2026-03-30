# ZAWIOS.IO

> **See what the crowd thinks before it's right.**

ZAWIOS is a collective intelligence and prediction platform — not a gambling site. Users take positions on future events, earn reputation based on accuracy, and contribute to crowd-sourced forecasting signals. No real money, no bets, no tokens.

---

## Product Overview

| Feature | Description |
|---------|-------------|
| Predictions | Open questions about the future, categorized and tracked |
| Voting | Yes/No, Multiple Choice, or Probability (0–100%) |
| Reputation | Accuracy-based scoring, global ranking, category mastery |
| Leaderboard | Public rankings by score and accuracy rate |
| Insights | Crowd analytics, trends, and category performance |
| Admin | Moderation, CRUD, audit trail, user management |

**No money, no bets, no tokens — just signal and reputation.**

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (Postgres + Auth + Realtime) |
| Validation | Zod |
| Data fetching | TanStack Query |
| Forms | React Hook Form |
| Charts | Recharts |
| State | Zustand |
| Deployment | Netlify |

---

## Project Structure

```
app/                    # Next.js App Router pages
├── (public)/           # Marketing pages
│   ├── page.tsx        # Landing page
│   ├── about/
│   ├── faq/
│   ├── pricing/
│   ├── contact/
│   ├── privacy/
│   └── terms/
├── auth/               # Authentication
│   ├── login/
│   ├── signup/
│   └── forgot-password/
├── predictions/        # Prediction pages
│   ├── page.tsx        # Browse
│   ├── [id]/           # Detail
│   └── create/         # Create
├── leaderboard/
├── insights/
├── profile/[username]/
├── dashboard/          # Protected dashboard
│   ├── page.tsx
│   ├── predictions/
│   ├── insights/
│   ├── profile/
│   └── settings/
└── admin/              # Admin panel

components/
├── ui/                 # Shared UI primitives
├── layout/             # Navigation, footer, sidebar
├── predictions/        # Prediction-specific components
└── auth/               # Auth forms

lib/
├── utils.ts            # Utility functions
├── mock-data.ts        # Demo data
└── supabase/           # Supabase clients

types/                  # TypeScript interfaces
db/                     # SQL schema and seeds
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- A Supabase project

### 1. Clone & install

```bash
git clone https://github.com/peupleaelionor/ZAWIOS.IO.git
cd ZAWIOS.IO
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up the database

1. Go to your Supabase project → SQL Editor
2. Run `db/schema.sql` to create all tables, indexes, RLS policies, and triggers
3. Optionally run `db/seed.sql` for demo categories and badges

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Deployment on Netlify

### 1. Connect repository

- Go to [app.netlify.com](https://app.netlify.com)
- Click "Add new site" → "Import an existing project"
- Select your GitHub repository

### 2. Configure build settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `.next` |

> The `netlify.toml` in the project root configures this automatically.

### 3. Set environment variables

In Netlify dashboard → Site settings → Environment variables, add:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

### 4. Deploy

Push to `main` branch — Netlify will auto-deploy.

### Required Netlify plugin

Make sure `@netlify/plugin-nextjs` is installed:
```bash
npm install -D @netlify/plugin-nextjs
```

Or add it in `netlify.toml` (already configured).

---

## Security Checklist

- [x] RLS enabled on all tables
- [x] User data isolated by `user_id`
- [x] No service role key exposed to client
- [x] Auth handled server-side via Supabase SSR
- [x] Protected routes via middleware
- [x] Input validation with Zod (extendable)
- [x] XSS prevention via React defaults
- [x] Security headers in netlify.toml
- [ ] Rate limiting (add via Supabase or edge function)
- [ ] CAPTCHA on auth forms (add reCAPTCHA)

---

## Production Checklist

- [ ] Set all environment variables in production
- [ ] Run `db/schema.sql` on production Supabase
- [ ] Configure Supabase Auth providers (Google, email)
- [ ] Set Supabase Auth redirect URLs to production domain
- [ ] Enable Supabase Realtime for votes table
- [ ] Set up email provider (Resend recommended)
- [ ] Configure custom domain in Netlify
- [ ] Enable HTTPS (automatic on Netlify)
- [ ] Test all auth flows end-to-end
- [ ] Verify RLS policies with different user roles
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Configure analytics (Google Analytics or Plausible)

---

## Reputation System

The ZAWIOS reputation score is calculated transparently:

| Component | Weight | Description |
|-----------|--------|-------------|
| Base accuracy | 50% | Correct predictions / total predictions |
| Volume bonus | 20% | More predictions = more reliable signal |
| Difficulty weight | 20% | Consensus-divergent correct predictions score higher |
| Recency weight | 10% | Recent predictions weighted more heavily |

**Formula (simplified):**
```
score = (correct_predictions / total_predictions)
        × log(total_predictions + 1)
        × avg(difficulty_weight)
        × recency_factor
        × 1000
```

All scores are recalculated when predictions resolve.

---

## Customization

### Adding categories

Edit `db/schema.sql` to add new category values to the CHECK constraint, then insert into the `categories` table.

### Extending predictions

Add new columns to the `predictions` table and update `types/index.ts` accordingly.

### Adding payment (Premium)

Integrate Stripe webhooks to update the `subscriptions` table when users upgrade. The `is_premium` field on profiles gates premium features.

---

## License

MIT — see LICENSE file.

---

*Built with ❤️ for the global forecasting community.*
