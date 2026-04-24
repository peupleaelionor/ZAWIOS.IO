# ZAWIOS.IO

> **L'intelligence collective, là où le signal précède le bruit.**

ZAWIOS est une plateforme d'intelligence collective de nouvelle génération — ni jeu, ni pari, ni spéculation. Les utilisateurs analysent des événements futurs, construisent leur réputation sur la précision, et alimentent un réseau de signaux collaboratifs d'une puissance inégalée. Zéro argent réel, zéro mise, zéro token.

---

## Ce qui rend ZAWIOS incomparable

ZAWIOS n'est pas une énième application web. C'est une architecture pensée pour résister à la copie, à l'exploitation et à l'obsolescence.

- **Isolation totale des données** — chaque utilisateur ne voit et ne modifie que ce qui lui appartient, imposé au niveau base de données via Row-Level Security
- **Authentification sans surface d'attaque côté client** — la session est gérée exclusivement server-side, aucune clé sensible n'atteint le navigateur
- **Validation à double couche** — Zod côté client *et* serveur, aucune donnée non validée ne touche la base
- **Middleware de protection de route** — chaque route protégée est vérifiée à l'edge avant tout rendu
- **Signaux de réputation non falsifiables** — le score est recalculé côté serveur à chaque résolution, sans intervention utilisateur possible
- **Headers de sécurité natifs** — CSP, X-Frame-Options, HSTS, configurés au niveau CDN

---

## Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| Signaux | Questions ouvertes sur l'avenir, catégorisées et tracées en temps réel |
| Votes | Oui/Non, Choix multiple, Probabilité (0–100 %) |
| Réputation | Score de précision, classement mondial, maîtrise par catégorie |
| Classement | Rankings publics par score et taux de précision |
| Insights | Analytiques de foule, tendances, performance par catégorie |
| Médias | Upload de photos de profil et d'images liées aux signaux |
| Bibliothèque | Banque intégrée d'images et vidéos de référence |
| Admin | Modération, CRUD complet, journal d'audit, gestion utilisateurs |

**Aucun argent, aucun pari, aucun token — uniquement le signal et la réputation.**

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 16 (App Router + Turbopack) |
| Langage | TypeScript strict |
| Styles | Tailwind CSS v4 |
| Base de données | Supabase (Postgres + Auth + Realtime + Storage) |
| Validation | Zod v4 |
| Data fetching | TanStack Query v5 |
| Formulaires | React Hook Form |
| Graphiques | Recharts |
| État global | Zustand |
| Animations | Framer Motion |
| Déploiement | Netlify (Edge Functions) |
| Paiement | Stripe |

---

## Architecture du projet

```
app/                        # Next.js App Router
├── (public)/               # Pages marketing
│   ├── page.tsx            # Landing page
│   ├── about/
│   ├── faq/
│   ├── pricing/
│   ├── contact/
│   ├── privacy/
│   └── terms/
├── auth/                   # Authentification SSR
│   ├── login/
│   ├── signup/
│   └── forgot-password/
├── signals/                # Signaux collectifs
│   ├── page.tsx            # Explorer
│   ├── [id]/               # Détail signal
│   └── create/             # Créer un signal
├── leaderboard/
├── insights/
├── profile/[username]/
├── dashboard/              # Espace personnel protégé
│   ├── page.tsx
│   ├── signals/
│   ├── insights/
│   ├── profile/            # Upload photo de profil
│   └── settings/
└── admin/                  # Panel d'administration

components/
├── ui/                     # Primitives UI
├── layout/                 # Navigation, footer, sidebar
├── signals/                # Composants signaux
├── media/                  # Upload, galerie, lecteur vidéo
└── auth/                   # Formulaires d'authentification

lib/
├── utils.ts
├── brand.ts                # Design system tokens
├── i18n.copy.ts            # Dictionnaire FR/EN
├── http.ts                 # Client HTTP avec abort/retry
├── telemetry.ts            # Télémétrie privacy-first
└── supabase/               # Clients Supabase (browser + server)

types/                      # Interfaces TypeScript
db/                         # Schéma SQL, migrations, seeds
scripts/                    # Outils QA (layout, vocabulaire, icônes)
```

---

## Démarrage rapide

### Prérequis

- Node.js 20+
- npm 10+
- Un projet Supabase

### 1. Cloner et installer

```bash
git clone https://github.com/peupleaelionor/ZAWIOS.IO.git
cd ZAWIOS.IO
npm install
```

### 2. Variables d'environnement

```bash
cp .env.example .env.local
```

Renseigner `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Initialiser la base de données

1. Ouvrir le SQL Editor de votre projet Supabase
2. Exécuter `db/schema.sql` — tables, index, politiques RLS, triggers
3. Exécuter `db/seed.sql` (optionnel) — catégories et badges de démonstration

### 4. Lancer en local

```bash
npm run dev
```

Accéder à [http://localhost:3000](http://localhost:3000)

---

## Déploiement sur Netlify

### 1. Connecter le dépôt

- Aller sur [app.netlify.com](https://app.netlify.com)
- Cliquer sur "Add new site" → "Import an existing project"
- Sélectionner le dépôt GitHub

### 2. Paramètres de build

| Paramètre | Valeur |
|---|---|
| Build command | `npm run build` |
| Publish directory | `.next` |

> Le fichier `netlify.toml` à la racine configure tout automatiquement.

### 3. Variables d'environnement

Dans Netlify → Site settings → Environment variables, ajouter :

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

### 4. Déployer

Pousser sur la branche `main` — Netlify déploie automatiquement.

---

## Médias utilisateur

ZAWIOS intègre une gestion native des médias via **Supabase Storage** :

- Upload de photo de profil (JPEG, PNG, WebP — max 5 Mo)
- Images attachées aux signaux et propositions
- Banque d'images et vidéos de référence pour enrichir les signaux
- Contrôle d'accès par politique RLS — chaque fichier est lié à son auteur

Les fichiers sont servis via CDN avec URLs signées à durée limitée pour les contenus privés.

---

## Sécurité — Architecture à couches

```
Couche 1 · Edge       : Headers de sécurité (CSP, HSTS, X-Frame)
Couche 2 · Middleware : Vérification de session avant tout rendu
Couche 3 · API        : Auth server-side — aucune clé exposée au client
Couche 4 · Validation : Zod — schémas stricts sur chaque entrée
Couche 5 · Database   : RLS Supabase — isolation par user_id au niveau SQL
Couche 6 · Rendu      : React — protection XSS par défaut
```

- [x] RLS activé sur toutes les tables
- [x] Données utilisateur isolées par `user_id`
- [x] Clé service-role jamais exposée au navigateur
- [x] Authentification gérée server-side (Supabase SSR)
- [x] Routes protégées via middleware Edge
- [x] Validation Zod sur toutes les entrées (client + serveur)
- [x] Protection XSS par défaut (React)
- [x] Headers de sécurité dans `netlify.toml`
- [ ] Rate limiting (via Supabase Edge Functions)
- [ ] CAPTCHA sur les formulaires d'authentification

---

## Système de réputation

Le score ZAWIOS est calculé de façon transparente et non manipulable :

| Composant | Poids | Description |
|---|---|---|
| Précision de base | 50 % | Signaux corrects / total des signaux |
| Bonus de volume | 20 % | Plus de signaux = signal plus fiable |
| Poids de difficulté | 20 % | Les signaux à contre-courant du consensus rapportent plus |
| Poids de récence | 10 % | Les signaux récents sont valorisés davantage |

**Formule (simplifiée) :**

```
score = (signaux_corrects / total_signaux)
        × log(total_signaux + 1)
        × moy(poids_difficulté)
        × facteur_récence
        × 1000
```

Tous les scores sont recalculés côté serveur lors de chaque résolution.

---

## Outils QA

```bash
npm run lint          # ESLint (flat config, TypeScript strict)
npm run typecheck     # tsc --noEmit
npm run layout:check  # Détection anti-débordement (100vw, w-screen)
npm run vocab:check   # Garde vocabulaire (termes interdits)
npm run qa:all        # lint + typecheck + layout + vocab + build
```

---

## Roadmap

| Fonctionnalité | Statut |
|---|---|
| Upload photo de profil | ✅ Disponible |
| Banque d'images de référence | 🔄 En cours |
| Bibliothèque vidéo intégrée | 🔄 En cours |
| Agent IA — génération de mini-vidéos de signal | 🗺 Planifié |
| Agent clone — personnalisation dynamique du feed | 🗺 Planifié |
| Animations dynamiques de signal en temps réel | 🗺 Planifié |
| Abonnements Premium (Stripe) | 🗺 Planifié |

---

## Checklist de mise en production

- [ ] Variables d'environnement configurées en production
- [ ] `db/schema.sql` exécuté sur le Supabase de production
- [ ] Providers Supabase Auth configurés (Google, email)
- [ ] URLs de redirection Supabase Auth pointant sur le domaine de production
- [ ] Supabase Realtime activé sur la table des votes
- [ ] Fournisseur email configuré (Resend recommandé)
- [ ] Domaine personnalisé configuré dans Netlify
- [ ] HTTPS activé (automatique sur Netlify)
- [ ] Tous les flux d'authentification testés de bout en bout
- [ ] Politiques RLS vérifiées avec différents rôles utilisateur
- [ ] Monitoring d'erreurs configuré (Sentry recommandé)
- [ ] Analytics configurées (Plausible recommandé)

---

## Licence

MIT — voir le fichier LICENSE.

---

*Construit avec ❤️ pour la communauté mondiale de l'intelligence collective.*
