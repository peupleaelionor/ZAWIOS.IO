# ZAWIOS.IO — Plan de métriques beta

**Ce qui se mesure s'améliore. Ce document définit les indicateurs fondamentaux dès le premier jour de beta.**

---

## Principes de mesure

- Prioriser la **qualité du signal** sur le volume d'utilisateurs
- Mesurer ce qui révèle la santé réelle de la communauté, pas les vanity metrics
- Chaque métrique doit être liée à une décision produit possible
- Revue hebdomadaire en phase beta, mensuelle ensuite

---

## 1. Activation & Rétention

> *Est-ce que les analystes reviennent ?*

| Métrique | Définition | Cible J+30 | Cible J+90 |
|---|---|---|---|
| **D1 Retention** | % d'inscrits qui reviennent J+1 | ≥ 35% | ≥ 40% |
| **D7 Retention** | % d'inscrits actifs à J+7 | ≥ 20% | ≥ 25% |
| **D30 Retention** | % d'inscrits actifs à J+30 | ≥ 10% | ≥ 18% |
| **Temps à premier vote** | Délai entre inscription et premier signal voté | < 10 min médiane | < 7 min médiane |
| **Votes par utilisateur actif / semaine** | Profondeur d'engagement | ≥ 3 | ≥ 5 |

**Signaux d'alerte** : D1 < 20% → problème d'onboarding. D7 < 10% → problème de valeur perçue.

---

## 2. Qualité du signal

> *Est-ce que les votes sont fiables et résolvables ?*

| Métrique | Définition | Cible J+30 | Cible J+90 |
|---|---|---|---|
| **Résolution rate** | % de signaux ayant atteint leur date de vérification et été résolus | ≥ 60% | ≥ 80% |
| **Brier score moyen** | Score de calibration des contributeurs (0 = parfait, 1 = nul) | < 0.30 médiane | < 0.25 médiane |
| **Taux de signaux ambigus** | % de signaux impossibles à résoudre faute de source claire | < 15% | < 10% |
| **Délai moyen de résolution** | Temps entre la date prévue et la résolution effective | < 7 jours | < 3 jours |

**Note** : un Brier score médian < 0.25 correspond à une calibration significativement meilleure que le hasard sur des questions binaires.

---

## 3. Dynamique communautaire

> *Est-ce que la communauté produit de la diversité et de la nuance ?*

| Métrique | Définition | Cible J+30 | Cible J+90 |
|---|---|---|---|
| **Vote diversity index** | Entropie des votes OUI/NON/NEUTRE par signal (0 = consensus total, 1 = parfaite divergence) | > 0.4 médiane | > 0.5 médiane |
| **Nuance rate** | % de votes accompagnés d'une nuance ou d'un argument textuel | ≥ 25% | ≥ 40% |
| **Comment rate** | % de signaux ayant au moins un commentaire de discussion | ≥ 30% | ≥ 50% |
| **Contributeurs uniques actifs / semaine** | Largeur de la base de signal | ≥ 50 à J+30 | ≥ 300 à J+90 |

**Signaux d'alerte** : nuance rate < 15% → votes superficiels, risque de dégradation de qualité. Vote diversity < 0.2 → possible comportement de meute ou biais de sélection.

---

## 4. Anti-spam & Confiance

> *Est-ce que le système de pondération fonctionne ?*

| Métrique | Définition | Cible J+30 | Cible J+90 |
|---|---|---|---|
| **Distribution des trust scores** | % de comptes dans chaque quartile (Q1 bas confiance → Q4 haute confiance) | Q4 ≥ 40% | Q4 ≥ 55% |
| **Votes rejetés** | % de votes filtrés par le système anti-spam avant publication | < 5% | < 3% |
| **Taux de comptes suspendus** | % de comptes désactivés pour comportement anormal | < 2% | < 1% |
| **Concentration de votes** | % de signaux où ≥ 50% des votes viennent d'un seul utilisateur | < 5% | < 2% |

**Note sur le trust weight** : la distribution cible Q4 ≥ 55% à J+90 reflète une communauté qui se qualifie progressivement — pas un réseau qui gonfle artificiellement.

---

## 5. HOTD — Hot of the Day

> *Est-ce que le signal mis en avant crée de l'engagement incrémental ?*

| Métrique | Définition | Cible J+30 | Cible J+90 |
|---|---|---|---|
| **HOTD engagement rate** | Votes + nuances + partages sur le signal HOTD vs médiane du feed | ≥ 3× la médiane | ≥ 5× la médiane |
| **Taux de partage externe** | % de vues HOTD générant un partage hors plateforme | ≥ 8% | ≥ 12% |
| **Nouveaux inscrits via HOTD** | % d'inscriptions attribuables à un partage HOTD | ≥ 15% des inscriptions | ≥ 20% des inscriptions |

---

## 6. Revenus (horizon futur)

> *Quand le modèle économique s'active-t-il ?*

| Métrique | Définition | Horizon | Cible |
|---|---|---|---|
| **Conversion libre → premium** | % d'utilisateurs actifs passant en abonnement payant | M+3 | ≥ 3% des actifs |
| **MRR analytics** | Revenu mensuel récurrent — tier analytics premium | M+4 | Premier MRR positif |
| **Leads API institutionnelle** | Contacts qualifiés pour accès API (médias, think tanks) | M+6 | ≥ 5 prospects |
| **Taux de churn premium** | % d'abonnés premium résiliant par mois | M+6 | < 8% |

---

## Récapitulatif des cibles par horizon

### J+30
- 100 analystes actifs
- D7 retention ≥ 20%
- Résolution rate ≥ 60%
- Nuance rate ≥ 25%
- Trust Q4 ≥ 40%

### J+60
- 250 analystes actifs
- Brier score médian < 0.28
- HOTD engagement ≥ 4× la médiane
- Vote diversity > 0.45
- 0 incidents de manipulation de signal détectés

### J+90
- 500 analystes actifs
- D30 retention ≥ 18%
- Résolution rate ≥ 80%
- Nuance rate ≥ 40%
- Trust Q4 ≥ 55%
- Premiers leads API identifiés

---

## Outillage de mesure

| Outil | Usage |
|---|---|
| **Supabase Analytics** | Données brutes — votes, sessions, résolutions |
| **PostHog** (recommandé) | Rétention, funnels, comportement utilisateur |
| **Dashboard interne** | Brier scores, trust distribution, HOTD stats |
| **Export hebdomadaire** | CSV manuel pour revue d'équipe en phase early beta |

---

*Dernière mise à jour : lancement beta — ces métriques sont révisables à chaque sprint.*
*ZAWIOS.IO | Infrastructure de signal collectif | FR primary*
