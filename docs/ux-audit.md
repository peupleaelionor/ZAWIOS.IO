# ZAWIOS — Audit UX par page

Statut : `[ ]` à vérifier · `[x]` validé · `[!]` bloquant

---

## Page d'accueil `/`

### Mobile 375px
- [ ] Héro : titre lisible, pas de coupure de mot bizarre
- [ ] Boutons CTA ("Commencer", "Voir les signaux") : height ≥ 44px, visibles sans scroll
- [ ] Barre de crédibilité : statistiques lisibles sur une ligne ou wrap propre
- [ ] Feed signaux : cards sans overflow, images non coupées
- [ ] Section piliers : texte sur 2–3 lignes max, jamais tronqué
- [ ] Footer : liens cliquables, texte lisible

### Contenu FR
- [ ] Hero headline en FR (`t.hero.headline1`, `t.hero.headline2`)
- [ ] Section label en FR
- [ ] CTA en FR (`t.hero.cta`, `t.hero.ctaSecondary`)
- [ ] Chiffres stats corrects (pas 0 fixé hardcodé)

### Performance
- [ ] LCP < 2.5s : identifier l'élément LCP (probablement le titre H1)
- [ ] Pas de layout shift à l'hydratation (framer-motion stagger)
- [ ] Fonts Sora chargées avant first paint

### Accessibilité
- [ ] H1 unique sur la page
- [ ] Focus ring visible sur tous les liens de navigation
- [ ] Images hero avec `alt` descriptif

---

## Page signaux `/signals`

### Mobile 375px
- [ ] Feed scroll vertical fluide
- [ ] Filtres (onglets Trending/New/Resolved) : tous visibles, pas de scroll horizontal caché
- [ ] Signal cards : pas de débordement de texte
- [ ] Pas de scroll horizontal sur la page entière

### VoteButtons (critique)
- [ ] Boutons OUI/NON/NEUTRE visibles sans cliquer sur la card
- [ ] Hauteur ≥ 44px sur chaque bouton
- [ ] Texte des boutons non tronqué à 375px
- [ ] `flex-wrap` actif : pas de bouton caché hors viewport

### Interactions
- [ ] Cliquer OUI : état visuel immédiat, chiffre qui change
- [ ] Cliquer une 2e fois : désélection ou confirmation
- [ ] Cliquer NON après OUI : switch correct
- [ ] Vote sans compte : gate s'affiche proprement

### Contenu
- [ ] Titres des signaux en FR
- [ ] Catégories affichées
- [ ] "Hot" badge visible sur les signaux trending

---

## Page détail signal `/signals/[id]`

### Mobile
- [ ] Header du signal lisible (titre sur max 3 lignes)
- [ ] VoteButtons tristate visibles et fonctionnels
- [ ] Nuance sheet ("Ça dépend") : bottom sheet s'ouvre depuis le bas
- [ ] Bottom sheet : safe-area-inset-bottom respecté sur iPhone
- [ ] Section commentaires : champ de saisie au-dessus du clavier iOS

### Contenu
- [ ] Question / titre clair
- [ ] Critères de résolution affichés
- [ ] Date de résolution affichée
- [ ] Contexte stratégique (si disponible)

### Accessibilité
- [ ] "Partager" : `aria-label` sur le bouton icon
- [ ] Dialog/Sheet : focus piégé dans le modal quand ouvert
- [ ] Escape ferme le sheet

---

## Leaderboard `/leaderboard`

### Mobile
- [ ] Tableau/liste lisible à 375px
- [ ] Avatar + nom + score visibles
- [ ] Pagination ou scroll virtualisé fonctionnel

### Contenu
- [ ] Classement par score Brier (précision), pas par volume
- [ ] Médailles/badges visibles pour top 3
- [ ] Catégories filtrables (si implémenté)

---

## Page support `/support`

### Mobile
- [ ] Barres de budget animées lisibles
- [ ] Bouton CTA Stripe visible sans scroll
- [ ] FAQ accordéon fonctionnel (touch-friendly)
- [ ] Section "autres façons d'aider" : cards sans overflow

### Conversion
- [ ] CTA principal clairement identifiable (couleur, taille)
- [ ] Prix et fréquence clairement indiqués
- [ ] Mention RGPD et Stripe (PCI-DSS) rassurante visible
- [ ] FAQ : réponse à "Puis-je annuler ?" visible en premier

### Légal
- [ ] Disclaimer "aucun rendement financier" présent
- [ ] Liens CGU et Politique de confidentialité fonctionnels

---

## Page profil `/profile/[username]`

### Mobile
- [ ] Avatar, nom, score affichés proprement
- [ ] Historique votes lisible
- [ ] Streak indicator visible si applicable

### Contenu
- [ ] Score de réputation affiché
- [ ] Catégories de forces (si calculées)
- [ ] Signaux résolus avec résultat correct/incorrect

---

## Dashboard `/dashboard`

### Authentification
- [ ] Redirection vers `/auth/login` si non connecté
- [ ] Retour vers `/dashboard` après login

### Mobile
- [ ] Statistiques personnelles lisibles
- [ ] Boutons d'action accessibles

---

## Admin `/admin` et `/admin/dashboard`

### Accès
- [ ] Protégé (middleware ou check serveur)
- [ ] Utilisateur non-admin redirigé

### Fonctionnement
- [ ] Queue de modération visible
- [ ] Actions approve/reject fonctionnelles
- [ ] Analytics (polarisation, divergence) affichées

---

## Authentification `/auth/login`, `/auth/signup`

### Mobile
- [ ] Formulaires lisibles à 375px
- [ ] Labels visibles (pas placeholder seul)
- [ ] Bouton submit ≥ 44px de hauteur
- [ ] Clavier iOS ne cache pas le bouton submit

### Validation
- [ ] Erreurs affichées inline (pas d'alert)
- [ ] Loading state pendant la soumission
- [ ] Redirect après succès

---

## Navigation globale (Navbar)

### Mobile
- [ ] Menu burger fonctionnel à 375px
- [ ] Tous les liens accessibles depuis le menu mobile
- [ ] Logo visible et cliquable
- [ ] LangToggle FR/EN accessible

### Desktop
- [ ] Liens primaires visibles (`/signals`, `/leaderboard`, `/intelligence`)
- [ ] Liens secondaires visibles si lg+
- [ ] Avatar utilisateur connecté cliquable

---

## Footer

- [ ] Liens légaux (CGU, Confidentialité) fonctionnels
- [ ] Pas de layout shift
- [ ] Lisible à 375px

---

## Points transversaux

### Couleurs & contraste
- [ ] Texte muted `#475569` sur fond `#F7F8FC` : ratio ≥ 4.5:1 ✓
- [ ] Texte strong `#0F172A` sur fond blanc : ratio > 14:1 ✓
- [ ] Royal Blue `#1C39BB` sur blanc : ratio ≥ 4.5:1 ✓ (vérifié)
- [ ] Bouton primary : texte blanc sur `#1C39BB` : ratio ≥ 4.5:1 ✓

### États
- [ ] Loading skeleton sur tous les composants async
- [ ] Error boundary sur le feed principal
- [ ] Toast notifications visibles et lisibles (Sonner)
- [ ] Page 404 custom (not-found.tsx) affichée

### Dark mode
- [ ] Toggle disponible (ThemeToggle)
- [ ] Pas de flash de contenu non stylé (FOUC)
- [ ] Script anti-flash en `<head>` avant toute CSS
