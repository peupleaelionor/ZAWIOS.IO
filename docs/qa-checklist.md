# ZAWIOS — Checklist pré-déploiement

Cocher chaque point avant tout merge vers `main`.

---

## Build & Qualité

- [ ] `npm run build` — zéro erreur, zéro warning TypeScript bloquant
- [ ] `npm run typecheck` — `tsc --noEmit` clean
- [ ] `npm run lint` — zéro erreur ESLint
- [ ] `npm run layout:check` — zéro pattern FATAL (`100vw`, `w-screen`, `min-w-screen`)
- [ ] `npm run vocab:check` — vocabulaire cohérent

---

## Mobile & Responsive

- [ ] **Pas de débordement horizontal** sur `/`, `/signals`, `/support`, `/about` (vérifier à 375px)
- [ ] VoteButtons OUI/NON/NEUTRE **visibles et cliquables** à 375px, 390px, 430px
- [ ] Touch targets ≥ 44px (hauteur min sur tous les boutons CTA)
- [ ] `overflow-x: clip` actif sur `body` — vérifier dans DevTools
- [ ] **iOS Safari** : pas de `100vw` qui cause un scroll horizontal
- [ ] Safe-area insets respectés (`env(safe-area-inset-*)`) sur iPhone avec notch
- [ ] Texte lisible sans zoom sur 375px (font-size ≥ 14px partout)

---

## Contenu & i18n

- [ ] **FR par défaut** sur toutes les pages (premier chargement sans cookie)
- [ ] Switch EN → FR persistant (localStorage + cookie)
- [ ] Tous les textes UI affichés via `t()` — pas de chaînes hardcodées en anglais
- [ ] SEO : `<title>` et `<meta description>` en FR sur toutes les pages statiques
- [ ] OG image correcte sur `/` et `/signals`

---

## Accessibilité (AA minimum)

- [ ] `focus-visible` visible sur tous les éléments interactifs (outline 2px royal blue)
- [ ] Contraste AA : texte muted `#475569` sur fond `#F7F8FC` → ratio ≥ 4.5:1
- [ ] `aria-label` sur tous les boutons icon-only (vote, close, menu)
- [ ] Navigation clavier complète sur Navbar et VoteButtons
- [ ] `<img>` et `<Image>` avec attribut `alt` non vide

---

## Performance

- [ ] LCP < 2.5s (Lighthouse mobile, réseau 4G simulé)
- [ ] CLS < 0.03 (pas de layout shift à l'hydratation)
- [ ] TBT < 150ms
- [ ] Images optimisées via `next/image` avec `width` + `height`
- [ ] Fonts préchargées (`preload`) dans `<head>`
- [ ] Pas de bundle > 250 KB non-splitté

---

## Sécurité

- [ ] En-têtes de sécurité actifs (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`)
- [ ] CSP configuré dans `next.config.ts` ou `vercel.json`
- [ ] HSTS actif en production (`Strict-Transport-Security`)
- [ ] Variables d'environnement : toutes les variables `NEXT_PUBLIC_` et serveur définies dans Vercel
- [ ] Clés Supabase : `SUPABASE_SERVICE_KEY` jamais exposée côté client
- [ ] CSRF tokens actifs sur les routes POST critiques
- [ ] Rate limiting actif : `/api/signals/[id]/vote`, `/api/comments`

---

## Supabase & Base de données

- [ ] RLS activée sur toutes les tables (`signals`, `votes`, `users`, `hotd`, `comments`)
- [ ] Politiques RLS : lecture publique, écriture authentifiée uniquement
- [ ] Service role utilisé **uniquement** côté serveur (jamais dans le client browser)
- [ ] Migrations appliquées dans l'ordre : `0001_init.sql` → `20260410_signals.sql` → `20260411_comments.sql` → `20260419_hotd.sql`
- [ ] Trigger `update_signal_vote_counts()` actif

---

## Paiement (Stripe)

- [ ] Clés Stripe en **mode test** pour preview/staging
- [ ] Clés Stripe en **mode live** uniquement en production
- [ ] Webhook Stripe configuré avec la bonne URL de déploiement
- [ ] Page `/support` : CTA pointe vers Stripe Checkout fonctionnel

---

## Assets & Brand

- [ ] Favicon visible dans l'onglet navigateur (`/brand/favicon.svg`)
- [ ] Apple touch icon présent (`/icons/apple-touch-180.png`)
- [ ] OG image par défaut (`/social-cards/og-image.png`) 1200×630
- [ ] Pas de watermarks ou logos tiers sur les assets brand

---

## HOTD & Agents

- [ ] `/api/hotd/today` retourne un signal (ou 404 propre si aucun prévu)
- [ ] Cron HOTD configuré dans `vercel.json` avec `CRON_SECRET`
- [ ] Agent `SignalQualityGate` actif en review queue admin
- [ ] Anti-spam : `checkVoteAllowed()` retourne refus pour votes en rafale

---

## Déploiement Vercel

- [ ] Preview deploy réussi sur la branche
- [ ] Aucun warning `ENOENT` ou fichier manquant en logs build
- [ ] `next build` sans erreur en remote (logs Vercel)
- [ ] Routes dynamiques (`/signals/[id]`) fonctionnelles
- [ ] Page 404 custom affichée
- [ ] `sitemap.xml` et `robots.txt` accessibles

---

## CI (GitHub Actions)

- [ ] `ci.yml` : lint + typecheck + build passent
- [ ] `e2e.yml` : overflow, VoteButtons, touch targets verts
- [ ] Pas de secret exposé dans les logs CI

---

## Post-déploiement

- [ ] Smoke test manuel : `/`, `/signals`, `/leaderboard`, `/support`
- [ ] Test vote sur un signal (OUI, NON, NEUTRE)
- [ ] Test switch langue FR↔EN
- [ ] Test création de compte / login Supabase
- [ ] Sentry : aucune erreur non attendue dans le tableau de bord
