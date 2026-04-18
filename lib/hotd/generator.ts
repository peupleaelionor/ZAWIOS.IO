/**
 * ZAWIOS — Auto HOTD Generator Engine
 *
 * Generates institutional-grade HOTD from structural templates.
 * No extreme phrasing. No rage bait. Randomized structural elements.
 */

import type { Hotd, HotdCategory } from './types'

// ═══════════════════════════════════════════════════════
// STRUCTURAL TEMPLATES
// ═══════════════════════════════════════════════════════

const TEMPLATES: Record<HotdCategory, string[]> = {
  Économie: [
    'Faut-il restructurer {element} pour renforcer {outcome} ?',
    'La transformation de {element} peut-elle garantir {outcome} à long terme ?',
    'Un rééquilibrage de {element} permettrait-il de stabiliser {outcome} ?',
  ],
  Travail: [
    'La redéfinition de {element} améliorerait-elle {outcome} dans les dix prochaines années ?',
    'Le modèle actuel de {element} est-il viable pour {outcome} ?',
    'Faut-il repenser {element} pour favoriser {outcome} ?',
  ],
  Technologie: [
    'Les États doivent-ils encadrer {element} comme infrastructure publique ?',
    'La régulation de {element} protégerait-elle {outcome} ?',
    'Le développement de {element} nécessite-t-il un cadre institutionnel pour {outcome} ?',
  ],
  Société: [
    'Un changement structurel dans {element} améliorerait-il {outcome} ?',
    'La transformation de {element} renforcerait-elle {outcome} à l\'échelle collective ?',
    'Faut-il réformer {element} pour préserver {outcome} ?',
  ],
  Géopolitique: [
    'La reconfiguration de {element} stabiliserait-elle {outcome} à l\'échelle mondiale ?',
    'Les institutions internationales doivent-elles repenser {element} pour {outcome} ?',
    'Un nouvel équilibre dans {element} est-il nécessaire pour {outcome} ?',
  ],
  Éducation: [
    'Le système éducatif doit-il intégrer {element} pour préparer {outcome} ?',
    'La réforme de {element} améliorerait-elle {outcome} pour les générations futures ?',
    'Faut-il repenser {element} dans l\'éducation pour garantir {outcome} ?',
  ],
  Environnement: [
    'La transition vers {element} est-elle indispensable pour {outcome} ?',
    'Les politiques de {element} suffisent-elles à protéger {outcome} ?',
    'Faut-il accélérer {element} pour préserver {outcome} à horizon 2050 ?',
  ],
}

const ELEMENTS: Record<HotdCategory, string[]> = {
  Économie: [
    'la fiscalité des entreprises',
    'le système bancaire décentralisé',
    'les mécanismes de redistribution',
    'la dette souveraine',
    'les flux de capitaux transfrontaliers',
    'la politique monétaire commune',
  ],
  Travail: [
    'le temps de travail hebdomadaire',
    'la formation professionnelle continue',
    'le statut du travailleur indépendant',
    'la protection sociale des travailleurs numériques',
    'la mobilité professionnelle internationale',
    'le télétravail institutionnalisé',
  ],
  Technologie: [
    'l\'intelligence artificielle générative',
    'les infrastructures de données souveraines',
    'la gouvernance algorithmique',
    'la connectivité satellitaire',
    'la cybersécurité collective',
    'l\'identité numérique universelle',
  ],
  Société: [
    'l\'accès au logement',
    'la politique de santé publique',
    'la cohésion intergénérationnelle',
    'les mécanismes de solidarité nationale',
    'la parité dans les institutions',
    'l\'intégration sociale des populations mobiles',
  ],
  Géopolitique: [
    'les alliances commerciales multilatérales',
    'la gouvernance des ressources naturelles',
    'la coopération interétatique',
    'la régulation des flux migratoires structurels',
    'la diplomatie numérique',
    'l\'autonomie stratégique continentale',
  ],
  Éducation: [
    'la littératie numérique',
    'les curricula scientifiques',
    'l\'apprentissage par compétences',
    'la formation aux métiers émergents',
    'l\'accès universel à l\'enseignement supérieur',
    'l\'éducation financière structurelle',
  ],
  Environnement: [
    'les énergies renouvelables décentralisées',
    'la tarification carbone universelle',
    'la protection de la biodiversité marine',
    'l\'agriculture régénérative',
    'la gestion des ressources hydriques',
    'la circularité industrielle',
  ],
}

const OUTCOMES: Record<HotdCategory, string[]> = {
  Économie: [
    'la stabilité macroéconomique',
    'l\'équité fiscale structurelle',
    'la résilience économique collective',
    'la compétitivité souveraine',
    'l\'inclusion financière globale',
  ],
  Travail: [
    'la qualité de vie professionnelle',
    'la productivité collective',
    'la sécurité économique individuelle',
    'l\'adaptabilité du marché du travail',
    'l\'équilibre vie professionnelle et personnelle',
  ],
  Technologie: [
    'la souveraineté numérique',
    'la protection des libertés individuelles',
    'l\'innovation responsable',
    'l\'accès équitable aux technologies',
    'la résilience des infrastructures critiques',
  ],
  Société: [
    'la stabilité collective',
    'la cohésion sociale',
    'l\'égalité des chances',
    'le bien-être structurel',
    'la résilience communautaire',
  ],
  Géopolitique: [
    'la paix structurelle',
    'l\'équilibre géostratégique',
    'la coopération internationale durable',
    'la stabilité régionale',
    'la réduction des asymétries de pouvoir',
  ],
  Éducation: [
    'l\'employabilité des jeunes générations',
    'la pensée critique collective',
    'l\'adaptation au monde de demain',
    'la réduction des inégalités éducatives',
    'la compétitivité intellectuelle nationale',
  ],
  Environnement: [
    'la durabilité écologique',
    'la résilience climatique',
    'la neutralité carbone',
    'la sécurité alimentaire mondiale',
    'la préservation des écosystèmes',
  ],
}

// ═══════════════════════════════════════════════════════
// RANDOM HELPERS
// ═══════════════════════════════════════════════════════

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// ═══════════════════════════════════════════════════════
// IMPACT LEVEL HEURISTIC
// ═══════════════════════════════════════════════════════

function computeImpactLevel(
  divergence: number,
  eraRelevance: number,
): 'low' | 'medium' | 'high' {
  const combined = (divergence + eraRelevance) / 2
  if (combined >= 70) return 'high'
  if (combined >= 40) return 'medium'
  return 'low'
}

function computePolarizationRisk(divergence: number): 'low' | 'medium' | 'high' {
  if (divergence >= 70) return 'high'
  if (divergence >= 40) return 'medium'
  return 'low'
}

// ═══════════════════════════════════════════════════════
// GENERATOR
// ═══════════════════════════════════════════════════════

let generatorCounter = 0

/**
 * Generate a structurally valid HOTD from category templates.
 */
export function generateHotdFromTemplate(category: HotdCategory): Hotd {
  const template = pick(TEMPLATES[category])
  const element = pick(ELEMENTS[category])
  const outcome = pick(OUTCOMES[category])

  const title = template
    .replace('{element}', element)
    .replace('{outcome}', outcome)

  const expectedDivergence = randomRange(25, 85)
  const eraRelevanceScore = randomRange(30, 95)

  generatorCounter++

  return {
    id: `hotd-gen-${Date.now()}-${generatorCounter}`,
    title,
    category,
    impactLevel: computeImpactLevel(expectedDivergence, eraRelevanceScore),
    polarizationRisk: computePolarizationRisk(expectedDivergence),
    expectedDivergence,
    eraRelevanceScore,
    description: `Signal structurel : ${element}. Enjeu : ${outcome}.`,
    createdAt: new Date(),
  }
}

/**
 * Generate multiple HOTD with balanced category distribution.
 */
export function generateBalancedHotdSet(count: number): Hotd[] {
  const categories: HotdCategory[] = [
    'Économie', 'Travail', 'Technologie', 'Société',
    'Géopolitique', 'Éducation', 'Environnement',
  ]

  const result: Hotd[] = []
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length]
    result.push(generateHotdFromTemplate(category))
  }
  return result
}
