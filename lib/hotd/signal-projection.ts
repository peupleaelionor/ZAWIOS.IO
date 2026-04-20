/**
 * ZAWIOS — Signal Projection System
 *
 * Generates structured impact simulations for each signal.
 * No bias. No moral framing. Pure consequence analysis.
 */

import type { Hotd, SignalProjection, HotdCategory } from './types'

// ═══════════════════════════════════════════════════════
// PROJECTION TEMPLATES
// ═══════════════════════════════════════════════════════

const PROJECTION_MAP: Record<HotdCategory, {
  economic: string[]
  social: string[]
  technological: string[]
  governance: string[]
}> = {
  Économie: {
    economic: [
      'Redistribution des flux financiers entre acteurs publics et privés.',
      'Modification des mécanismes d\'épargne et d\'investissement à moyen terme.',
      'Rééquilibrage potentiel des balances commerciales régionales.',
    ],
    social: [
      'Impact sur le pouvoir d\'achat des ménages à revenu intermédiaire.',
      'Évolution des inégalités patrimoniales mesurables sur 5 à 10 ans.',
      'Modification des comportements de consommation structurels.',
    ],
    technological: [
      'Accélération de la digitalisation des services financiers.',
      'Développement d\'outils de mesure économique en temps réel.',
      'Émergence de nouvelles infrastructures de paiement.',
    ],
    governance: [
      'Nécessité de nouveaux cadres réglementaires transfrontaliers.',
      'Adaptation des politiques fiscales nationales.',
      'Renforcement des mécanismes de surveillance macroprudentielle.',
    ],
  },
  Travail: {
    economic: [
      'Transformation de la structure des coûts salariaux.',
      'Impact sur la productivité sectorielle mesurable à 3 ans.',
      'Modification des flux d\'emploi entre secteurs formels et informels.',
    ],
    social: [
      'Évolution de l\'équilibre vie professionnelle et personnelle.',
      'Modification des dynamiques de mobilité sociale.',
      'Impact sur la santé mentale professionnelle mesurable statistiquement.',
    ],
    technological: [
      'Automatisation accrue de tâches à faible valeur ajoutée.',
      'Émergence de nouveaux outils de collaboration distribuée.',
      'Développement de systèmes de formation adaptatifs.',
    ],
    governance: [
      'Adaptation du droit du travail aux nouvelles formes d\'emploi.',
      'Évolution des systèmes de protection sociale.',
      'Mise en place de cadres de régulation du travail à distance.',
    ],
  },
  Technologie: {
    economic: [
      'Concentration ou redistribution des investissements technologiques.',
      'Impact sur la compétitivité des économies émergentes.',
      'Création de nouveaux marchés à forte valeur ajoutée.',
    ],
    social: [
      'Modification de l\'accès à l\'information et aux services.',
      'Évolution des compétences requises pour l\'employabilité.',
      'Impact sur la vie privée et l\'autonomie individuelle.',
    ],
    technological: [
      'Accélération des cycles d\'innovation dans les secteurs adjacents.',
      'Émergence de dépendances technologiques structurelles.',
      'Développement de standards d\'interopérabilité.',
    ],
    governance: [
      'Nécessité de cadres éthiques pour les technologies émergentes.',
      'Adaptation des politiques de souveraineté numérique.',
      'Création de mécanismes de gouvernance algorithmique.',
    ],
  },
  Société: {
    economic: [
      'Impact budgétaire sur les politiques sociales.',
      'Modification des coûts de la cohésion sociale.',
      'Évolution des mécanismes de solidarité économique.',
    ],
    social: [
      'Transformation des dynamiques intergénérationnelles.',
      'Modification des structures familiales et communautaires.',
      'Impact sur les indices de bien-être collectif.',
    ],
    technological: [
      'Développement de plateformes de participation citoyenne.',
      'Utilisation accrue de données pour les politiques sociales.',
      'Innovation dans les services publics numériques.',
    ],
    governance: [
      'Adaptation des mécanismes démocratiques de consultation.',
      'Évolution des cadres juridiques de protection sociale.',
      'Renforcement des institutions de médiation sociale.',
    ],
  },
  Géopolitique: {
    economic: [
      'Reconfiguration des routes commerciales stratégiques.',
      'Impact sur les réserves de change et la stabilité monétaire.',
      'Modification des flux d\'investissement direct étranger.',
    ],
    social: [
      'Évolution des dynamiques migratoires structurelles.',
      'Impact sur les diasporas et les transferts de fonds.',
      'Modification des perceptions interculturelles.',
    ],
    technological: [
      'Fragmentation ou intégration des standards technologiques.',
      'Course à la souveraineté en matière d\'IA et de données.',
      'Développement d\'infrastructures numériques régionales.',
    ],
    governance: [
      'Réforme des institutions multilatérales existantes.',
      'Émergence de nouvelles alliances stratégiques.',
      'Adaptation des cadres de droit international.',
    ],
  },
  Éducation: {
    economic: [
      'Impact sur le retour sur investissement de la formation.',
      'Modification des coûts structurels de l\'éducation.',
      'Évolution de la valeur des diplômes sur le marché du travail.',
    ],
    social: [
      'Transformation de la mobilité sociale intergénérationnelle.',
      'Réduction ou aggravation des inégalités d\'accès.',
      'Impact sur la cohésion culturelle et scientifique.',
    ],
    technological: [
      'Intégration de l\'IA dans les processus pédagogiques.',
      'Développement de plateformes d\'apprentissage adaptatif.',
      'Transformation des méthodes d\'évaluation.',
    ],
    governance: [
      'Adaptation des politiques éducatives nationales.',
      'Harmonisation des cadres de certification internationaux.',
      'Mise en place de mécanismes d\'assurance qualité.',
    ],
  },
  Environnement: {
    economic: [
      'Transition des modèles économiques carbonés.',
      'Impact sur les marchés de l\'énergie à horizon 2040.',
      'Coût de l\'adaptation climatique pour les économies vulnérables.',
    ],
    social: [
      'Modification des modes de vie et de consommation.',
      'Impact sur la santé publique liée à l\'environnement.',
      'Évolution des mobilités géographiques climatiques.',
    ],
    technological: [
      'Accélération des innovations en énergie propre.',
      'Développement de technologies de capture et de stockage.',
      'Émergence de solutions de surveillance environnementale.',
    ],
    governance: [
      'Renforcement des engagements climatiques internationaux.',
      'Adaptation des réglementations environnementales.',
      'Création de mécanismes de financement vert.',
    ],
  },
}

// ═══════════════════════════════════════════════════════
// PROJECTION GENERATOR
// ═══════════════════════════════════════════════════════

function pickProjection(arr: string[], seed: number): string {
  return arr[seed % arr.length]
}

/**
 * Generate a structured signal projection for a HOTD.
 * Shows 3 possible consequences across 4 dimensions.
 */
export function generateSignalProjection(hotd: Hotd): SignalProjection {
  const templates = PROJECTION_MAP[hotd.category]

  /* Use a deterministic seed based on the HOTD id for consistency */
  const seed = hotd.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)

  return {
    economicImpact: pickProjection(templates.economic, seed),
    socialImpact: pickProjection(templates.social, seed + 1),
    technologicalImpact: pickProjection(templates.technological, seed + 2),
    governanceImpact: pickProjection(templates.governance, seed + 3),
  }
}

/**
 * Generate full projection with all 3 possible outcomes.
 */
export function generateFullProjection(hotd: Hotd): {
  scenario1: SignalProjection
  scenario2: SignalProjection
  scenario3: SignalProjection
} {
  const templates = PROJECTION_MAP[hotd.category]
  const seed = hotd.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)

  return {
    scenario1: {
      economicImpact: pickProjection(templates.economic, seed),
      socialImpact: pickProjection(templates.social, seed),
      technologicalImpact: pickProjection(templates.technological, seed),
      governanceImpact: pickProjection(templates.governance, seed),
    },
    scenario2: {
      economicImpact: pickProjection(templates.economic, seed + 1),
      socialImpact: pickProjection(templates.social, seed + 1),
      technologicalImpact: pickProjection(templates.technological, seed + 1),
      governanceImpact: pickProjection(templates.governance, seed + 1),
    },
    scenario3: {
      economicImpact: pickProjection(templates.economic, seed + 2),
      socialImpact: pickProjection(templates.social, seed + 2),
      technologicalImpact: pickProjection(templates.technological, seed + 2),
      governanceImpact: pickProjection(templates.governance, seed + 2),
    },
  }
}
