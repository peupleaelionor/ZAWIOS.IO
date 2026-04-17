import type { Prediction, Category, Region, RegionalBreakdown } from '@/types'

function mkRegions(
  yG: number, yAf: number, yFr: number, yEu: number, yUS: number,
  votes: number
): RegionalBreakdown[] {
  return [
    { region: 'Global' as Region, yes_percent: yG, vote_count: Math.round(votes * 0.33) },
    { region: 'Africa' as Region, yes_percent: yAf, vote_count: Math.round(votes * 0.12) },
    { region: 'France' as Region, yes_percent: yFr, vote_count: Math.round(votes * 0.08) },
    { region: 'Europe' as Region, yes_percent: yEu, vote_count: Math.round(votes * 0.25) },
    { region: 'USA' as Region, yes_percent: yUS, vote_count: Math.round(votes * 0.22) },
  ]
}

function wv(
  n: number,
  title: string,
  cat: Category,
  pcts: [number, number, number, number, number],
  votes: number,
  resDate: string,
  createdAt: string,
  featured: boolean,
  tags: string[],
  resolved?: { notes: string; yes: boolean }
): Prediction {
  const id = `wv${String(n).padStart(3, '0')}`
  const [yG, yAf, yFr, yEu, yUS] = pcts
  const yesVotes = Math.round(votes * yG / 100)
  const noVotes = votes - yesVotes
  const status = resolved ? 'resolved' as const : 'open' as const

  return {
    id,
    title,
    description: '',
    category: cat,
    type: 'yes_no',
    status,
    created_by: 'world_view',
    resolution_date: resDate + 'T00:00:00Z',
    resolved_at: resolved ? resDate + 'T12:00:00Z' : undefined,
    resolution_notes: resolved?.notes,
    vote_count: votes,
    comment_count: Math.round(votes * 0.018),
    view_count: Math.round(votes * 3.8),
    featured,
    tags,
    options: [
      {
        id: `${id}_y`,
        prediction_id: id,
        label: 'Oui',
        vote_count: yesVotes,
        percentage: yG,
        is_correct: resolved ? (resolved.yes ? true : undefined) : undefined,
      },
      {
        id: `${id}_n`,
        prediction_id: id,
        label: 'Non',
        vote_count: noVotes,
        percentage: 100 - yG,
        is_correct: resolved ? (resolved.yes ? undefined : true) : undefined,
      },
    ],
    regional_data: mkRegions(yG, yAf, yFr, yEu, yUS, votes),
    created_at: createdAt,
    updated_at: createdAt,
  }
}

export const worldViewSignals: Prediction[] = [
  // ── Groupe 1 : Travail & Emploi ──────────────────────────────────────────
  wv(1,'Le télétravail deviendra la norme dans les grandes entreprises d\'ici 2026','work',[68,52,72,70,65],8200,'2026-12-31','2025-01-15T10:00:00Z',false,['télétravail','futur du travail']),
  wv(2,'L\'IA va supprimer plus d\'emplois qu\'elle n\'en crée dans les 5 prochaines années','work',[57,72,61,58,48],12400,'2028-12-31','2025-01-22T10:00:00Z',true,['IA','emploi','automatisation']),
  wv(3,'Le revenu universel de base sera expérimenté dans 10+ pays d\'ici 2030','work',[63,58,71,66,55],7800,'2030-12-31','2025-02-01T10:00:00Z',false,['revenu universel','politique sociale']),
  wv(4,'Les semaines de 4 jours seront adoptées par la majorité des entreprises d\'ici 2027','work',[74,45,82,76,62],9100,'2027-12-31','2025-02-08T10:00:00Z',true,['4 jours','bien-être','productivité']),
  wv(5,'Les travailleurs de la gig economy seront requalifiés comme salariés d\'ici 2028','work',[48,35,64,55,38],5400,'2028-12-31','2025-02-15T10:00:00Z',false,['gig economy','droit du travail']),
  wv(6,'Le salaire minimum sera indexé sur l\'inflation dans la majorité des pays d\'ici 2027','work',[66,61,78,72,52],6200,'2027-12-31','2025-02-20T10:00:00Z',false,['salaire','inflation','politique']),
  wv(7,'Les compétences en IA seront obligatoires dans les offres d\'emploi dès 2025','work',[82,76,79,80,85],14300,'2025-12-31','2025-03-01T10:00:00Z',true,['IA','compétences','recrutement']),
  wv(8,'Le chômage technologique va dépasser 15% dans les pays développés d\'ici 2030','work',[44,55,40,42,38],8900,'2030-12-31','2025-03-08T10:00:00Z',false,['chômage','automatisation','économie']),
  wv(9,'Les syndicats retrouveront une influence croissante dans les grandes entreprises','work',[52,48,68,58,35],5700,'2027-12-31','2025-03-15T10:00:00Z',false,['syndicats','travail','pouvoir']),
  wv(10,'Le travail physique va se revaloriser face au travail intellectuel d\'ici 2030','work',[46,62,44,48,42],4800,'2030-12-31','2025-03-20T10:00:00Z',false,['travail physique','valeur','société']),

  // ── Groupe 2 : Éducation ─────────────────────────────────────────────────
  wv(11,'Les universités physiques perdront plus de 30% de leurs étudiants d\'ici 2030','education',[38,28,34,36,42],6100,'2030-12-31','2025-02-01T10:00:00Z',false,['université','éducation','digital']),
  wv(12,'Les enfants nés en 2025 apprendront principalement via l\'IA d\'ici 2035','education',[61,74,55,58,66],7200,'2035-12-31','2025-02-10T10:00:00Z',false,['IA','éducation','enfants']),
  wv(13,'Les diplômes traditionnels perdront de la valeur face aux certifications en ligne','education',[67,78,58,64,72],9800,'2027-12-31','2025-02-20T10:00:00Z',true,['diplômes','certifications','futur']),
  wv(14,'La programmation sera enseignée dès 6 ans dans les écoles publiques d\'ici 2030','education',[72,68,76,74,78],8400,'2030-12-31','2025-03-01T10:00:00Z',false,['programmation','école','compétences']),
  wv(15,'Les MOOCs remplaceront les formations professionnelles continues d\'ici 2030','education',[55,64,48,52,60],5800,'2030-12-31','2025-03-10T10:00:00Z',false,['MOOCs','formation','digital']),
  wv(16,'L\'enseignement à domicile (homeschooling) triplera dans les pays développés','education',[34,28,26,30,42],4300,'2030-12-31','2025-03-15T10:00:00Z',false,['homeschooling','éducation','familles']),
  wv(17,'Les réseaux sociaux seront interdits dans les établissements scolaires d\'ici 2026','education',[76,58,82,78,68],11200,'2026-12-31','2025-03-22T10:00:00Z',true,['réseaux sociaux','école','régulation']),
  wv(18,'L\'accès à l\'éducation de qualité sera équitable entre pays riches et pauvres d\'ici 2040','education',[42,64,38,40,38],5100,'2040-12-31','2025-04-01T10:00:00Z',false,['équité','éducation','pays émergents']),
  wv(19,'Les tests standardisés seront abandonnés pour des évaluations continues d\'ici 2030','education',[58,52,64,62,54],6700,'2030-12-31','2025-04-08T10:00:00Z',false,['évaluation','école','pédagogie']),
  wv(20,'L\'IA personnalisera l\'apprentissage de chaque élève d\'ici 2028','education',[79,82,72,76,84],13400,'2028-12-31','2025-04-15T10:00:00Z',true,['IA','apprentissage','personnalisation']),

  // ── Groupe 3 : Technologie & IA ─────────────────────────────────────────
  wv(21,'L\'IA générative sera intégrée dans tous les smartphones d\'ici 2026','technology',[88,82,84,86,92],18900,'2026-12-31','2025-03-01T10:00:00Z',true,['IA','smartphones','générative']),
  wv(22,'Les voitures autonomes représenteront 20% des nouvelles ventes d\'ici 2030','technology',[52,38,46,50,62],11200,'2030-12-31','2025-03-10T10:00:00Z',false,['voitures autonomes','mobilité']),
  wv(23,'L\'informatique quantique rendra obsolètes les systèmes de chiffrement actuels','technology',[61,52,64,62,68],8400,'2030-12-31','2025-03-20T10:00:00Z',false,['quantique','cybersécurité','chiffrement']),
  wv(24,'Un réseau social décentralisé dépassera 1 milliard d\'utilisateurs d\'ici 2028','technology',[44,58,38,42,48],6800,'2028-12-31','2025-04-01T10:00:00Z',false,['décentralisé','web3','réseaux sociaux']),
  wv(25,'Les assistants vocaux remplaceront les claviers pour 50% des requêtes d\'ici 2028','technology',[56,68,48,52,62],9200,'2028-12-31','2025-04-10T10:00:00Z',false,['vocal','IA','interface']),
  wv(26,'La réalité augmentée deviendra l\'interface principale face aux smartphones d\'ici 2032','technology',[48,54,44,46,55],7600,'2032-12-31','2025-04-20T10:00:00Z',false,['AR','interface','futur']),
  wv(27,'Les implants neuronaux seront disponibles commercialement d\'ici 2030','technology',[34,28,28,30,42],9400,'2030-12-31','2025-05-01T10:00:00Z',false,['neurotechnologie','BCI','biotech']),
  wv(28,'L\'IA composera des hits musicaux classés dans les top 10 mondiaux d\'ici 2027','technology',[71,62,66,68,76],7800,'2027-12-31','2025-05-10T10:00:00Z',false,['IA','musique','créativité']),
  wv(29,'Les deepfakes rendront la vérification d\'identité vidéo impossible d\'ici 2027','technology',[68,72,64,66,72],10200,'2027-12-31','2025-05-20T10:00:00Z',true,['deepfakes','identité','cybersécurité']),
  wv(30,'Le Web3 sera adopté par des gouvernements pour des services publics d\'ici 2030','technology',[35,48,28,32,38],5600,'2030-12-31','2025-06-01T10:00:00Z',false,['web3','gouvernance','blockchain']),

  // ── Groupe 4 : Finance & Économie ────────────────────────────────────────
  wv(31,'Le dollar perdra son statut de monnaie de réserve mondiale d\'ici 2035','finance',[44,62,38,42,32],12300,'2035-12-31','2025-04-01T10:00:00Z',true,['dollar','réserve mondiale','géopolitique']),
  wv(32,'Les cryptomonnaies seront adoptées comme monnaie officielle dans 10+ pays d\'ici 2030','finance',[55,72,42,48,62],14800,'2030-12-31','2025-04-10T10:00:00Z',true,['crypto','bitcoin','adoption']),
  wv(33,'Une récession mondiale majeure frappera avant 2027','finance',[62,68,66,64,55],16400,'2027-12-31','2025-04-20T10:00:00Z',true,['récession','économie','crise']),
  wv(34,'L\'inflation restera au-dessus de 3% dans les pays développés jusqu\'en 2027','finance',[71,58,74,72,65],13200,'2027-12-31','2025-05-01T10:00:00Z',false,['inflation','économie','banques centrales']),
  wv(35,'Les banques traditionnelles fusionneront massivement face aux fintechs d\'ici 2030','finance',[57,62,52,55,62],8700,'2030-12-31','2025-05-10T10:00:00Z',false,['banques','fintech','consolidation']),
  wv(36,'Le revenu médian doublera dans les pays émergents d\'ici 2035','finance',[48,68,38,42,44],6200,'2035-12-31','2025-05-20T10:00:00Z',false,['revenus','émergents','croissance']),
  wv(37,'Les marchés boursiers intégreront des critères ESG obligatoires d\'ici 2028','finance',[62,54,72,68,52],7400,'2028-12-31','2025-06-01T10:00:00Z',false,['ESG','bourse','durabilité']),
  wv(38,'L\'or reviendra comme référence monétaire internationale d\'ici 2035','finance',[36,48,34,36,28],8900,'2035-12-31','2025-06-10T10:00:00Z',false,['or','monnaie','géopolitique']),
  wv(39,'Les inégalités de richesse augmenteront dans tous les pays du G20 d\'ici 2030','finance',[74,82,72,72,68],11600,'2030-12-31','2025-06-20T10:00:00Z',false,['inégalités','richesse','G20']),
  wv(40,'Les monnaies numériques de banques centrales domineront les transactions d\'ici 2030','finance',[66,58,64,68,62],9100,'2030-12-31','2025-07-01T10:00:00Z',false,['CBDC','monnaie numérique','banques centrales']),

  // ── Groupe 5 : Environnement & Climat ────────────────────────────────────
  wv(41,'Les températures mondiales dépasseront +1.5°C de réchauffement dès 2027','science',[78,82,84,82,62],17800,'2027-12-31','2025-05-01T10:00:00Z',true,['climat','réchauffement','GIEC']),
  wv(42,'Les énergies renouvelables couvriront 50% de la production mondiale d\'ici 2032','science',[66,74,72,70,58],12400,'2032-12-31','2025-05-10T10:00:00Z',false,['renouvelables','énergie','transition']),
  wv(43,'Une espèce de mammifère connue disparaîtra chaque mois d\'ici 2035','science',[54,68,58,56,46],8200,'2035-12-31','2025-05-20T10:00:00Z',false,['biodiversité','extinction','nature']),
  wv(44,'La viande cultivée en laboratoire représentera 10% du marché d\'ici 2032','science',[48,42,44,48,56],9800,'2032-12-31','2025-06-01T10:00:00Z',false,['viande','lab','alimentation']),
  wv(45,'Les catastrophes naturelles coûteront plus de 1 000 milliards USD par an d\'ici 2030','science',[72,76,74,74,64],10400,'2030-12-31','2025-06-10T10:00:00Z',false,['catastrophes','climat','assurance']),
  wv(46,'L\'eau potable deviendra un bien rare dans 30+ pays d\'ici 2035','science',[68,84,62,66,58],11200,'2035-12-31','2025-06-20T10:00:00Z',true,['eau','pénurie','ressources']),
  wv(47,'Les politiques climatiques freineront la croissance des pays en développement','science',[52,42,56,54,48],8600,'2030-12-31','2025-07-01T10:00:00Z',false,['climat','développement','économie']),
  wv(48,'La reforestation mondiale compensera les émissions carbone d\'ici 2045','science',[36,44,38,38,34],5400,'2045-12-31','2025-07-10T10:00:00Z',false,['reforestation','carbone','nature']),
  wv(49,'Les villes côtières majeures commenceront à se déplacer d\'ici 2040','science',[58,72,62,60,52],7200,'2040-12-31','2025-07-20T10:00:00Z',false,['villes','montée des eaux','adaptation']),
  wv(50,'Le plastique à usage unique sera banni dans tous les pays de l\'OCDE d\'ici 2028','science',[76,62,82,80,64],9800,'2028-12-31','2025-08-01T10:00:00Z',false,['plastique','interdiction','OCDE']),

  // ── Groupe 6 : Santé ─────────────────────────────────────────────────────
  wv(51,'L\'espérance de vie mondiale dépassera 85 ans d\'ici 2045','science',[62,48,66,64,68],8400,'2045-12-31','2025-06-01T10:00:00Z',false,['longévité','santé','démographie']),
  wv(52,'Le cancer du sein sera guéri à 95% des cas d\'ici 2035','science',[57,52,62,60,62],9200,'2035-12-31','2025-06-10T10:00:00Z',false,['cancer','médecine','biotechnologie']),
  wv(53,'Une prochaine pandémie plus grave que le COVID surviendra avant 2035','science',[64,72,68,66,56],14600,'2035-12-31','2025-06-20T10:00:00Z',true,['pandémie','santé mondiale','épidémie']),
  wv(54,'Les maladies mentales seront reconnues comme priorité de santé publique n°1','science',[74,68,82,78,68],12800,'2027-12-31','2025-07-01T10:00:00Z',true,['santé mentale','bien-être','politiques']),
  wv(55,'La résistance aux antibiotiques tuera plus que le cancer d\'ici 2050','science',[52,58,56,54,46],7600,'2050-12-31','2025-07-10T10:00:00Z',false,['antibiotiques','résistance','santé']),
  wv(56,'Les thérapies géniques CRISPR seront accessibles au grand public d\'ici 2035','science',[48,42,52,50,54],7800,'2035-12-31','2025-07-20T10:00:00Z',false,['CRISPR','génétique','médecine']),
  wv(57,'L\'obésité sera traitée comme maladie chronique prioritaire d\'ici 2030','science',[68,58,72,70,64],9400,'2030-12-31','2025-08-01T10:00:00Z',false,['obésité','santé','politiques']),
  wv(58,'Les médecins seront largement remplacés par l\'IA dans le diagnostic d\'ici 2035','science',[56,48,52,54,64],11200,'2035-12-31','2025-08-10T10:00:00Z',false,['IA','médecine','diagnostic']),
  wv(59,'La durée de vie humaine pourra dépasser 120 ans grâce à la biotechnologie d\'ici 2060','science',[44,38,40,42,52],9800,'2060-12-31','2025-08-20T10:00:00Z',false,['longévité','biotech','futur']),
  wv(60,'Les applications de bien-être mental dépasseront les médicaments en usage d\'ici 2030','science',[62,54,64,62,68],8200,'2030-12-31','2025-09-01T10:00:00Z',false,['santé mentale','apps','numérique']),

  // ── Groupe 7 : Politique & Gouvernance ───────────────────────────────────
  wv(61,'La démocratie libérale sera remise en question dans 20% des pays d\'ici 2030','politics',[66,74,68,66,58],13200,'2030-12-31','2025-07-01T10:00:00Z',true,['démocratie','populisme','gouvernance']),
  wv(62,'Le vote électronique sécurisé sera adopté massivement d\'ici 2030','politics',[58,72,52,56,54],8800,'2030-12-31','2025-07-10T10:00:00Z',false,['e-vote','démocratie','numérique']),
  wv(63,'Une nouvelle guerre froide technologique entre USA et Chine durera 20+ ans','politics',[74,68,78,76,68],16400,'2040-12-31','2025-07-20T10:00:00Z',true,['USA','Chine','géopolitique']),
  wv(64,'Les organisations supranationales (ONU, UE) gagneront plus de pouvoir d\'ici 2030','politics',[46,54,52,50,34],7200,'2030-12-31','2025-08-01T10:00:00Z',false,['ONU','UE','multilatéralisme']),
  wv(65,'Les mouvements populistes continueront à gagner du terrain en Europe d\'ici 2028','politics',[72,62,76,74,68],11800,'2028-12-31','2025-08-10T10:00:00Z',false,['populisme','Europe','élections']),
  wv(66,'La corruption politique sera réduite grâce à la transparence blockchain d\'ici 2035','politics',[38,48,34,36,36],5600,'2035-12-31','2025-08-20T10:00:00Z',false,['corruption','blockchain','transparence']),
  wv(67,'Des villes-États numériques émergeront comme nouvelles formes de gouvernance d\'ici 2040','politics',[42,52,38,40,48],7400,'2040-12-31','2025-09-01T10:00:00Z',false,['gouvernance','villes','futur']),
  wv(68,'Le droit de vote sera accordé aux résidents permanents non-citoyens dans plusieurs pays','politics',[46,54,44,48,38],6800,'2030-12-31','2025-09-10T10:00:00Z',false,['vote','citoyenneté','immigration']),
  wv(69,'La surveillance de masse par l\'État sera restreinte par de nouvelles lois d\'ici 2028','politics',[52,44,62,56,46],9200,'2028-12-31','2025-09-20T10:00:00Z',false,['surveillance','vie privée','régulation']),
  wv(70,'L\'abstentionnisme électoral sera réduit grâce au vote obligatoire dans plusieurs pays','politics',[48,52,44,46,38],5800,'2030-12-31','2025-10-01T10:00:00Z',false,['abstention','démocratie','vote']),

  // ── Groupe 8 : Style de vie & Société ────────────────────────────────────
  wv(71,'Les mariages traditionnels continueront à décliner dans les pays développés','lifestyle',[76,52,80,78,72],10400,'2030-12-31','2025-08-01T10:00:00Z',false,['mariage','société','tendances']),
  wv(72,'La consommation de viande rouge sera réduite de 50% dans les pays développés d\'ici 2035','lifestyle',[48,36,52,50,46],8800,'2035-12-31','2025-08-10T10:00:00Z',false,['alimentation','viande','environnement']),
  wv(73,'Les réseaux sociaux auront un impact mesuré négatif sur la démocratie d\'ici 2028','lifestyle',[74,66,78,76,68],12600,'2028-12-31','2025-08-20T10:00:00Z',false,['réseaux sociaux','démocratie','désinformation']),
  wv(74,'La population mondiale atteindra un pic avant 2080','lifestyle',[64,56,68,66,62],7600,'2080-12-31','2025-09-01T10:00:00Z',false,['population','démographie','futur']),
  wv(75,'Les religions traditionnelles perdront de l\'influence dans les pays émergents d\'ici 2035','lifestyle',[48,38,54,52,44],6400,'2035-12-31','2025-09-10T10:00:00Z',false,['religion','société','sécularisation']),
  wv(76,'L\'esprit de communauté locale se renforcera dans les villes post-pandémie d\'ici 2027','lifestyle',[56,62,60,58,52],5200,'2027-12-31','2025-09-20T10:00:00Z',false,['communauté','lien social','villes']),
  wv(77,'Les voyages en avion seront réduits de 30% pour des raisons environnementales d\'ici 2030','lifestyle',[44,32,52,48,36],7800,'2030-12-31','2025-10-01T10:00:00Z',false,['avion','environnement','voyage']),
  wv(78,'La musique générée par IA dominera les charts mondiaux d\'ici 2030','lifestyle',[62,56,58,60,68],9400,'2030-12-31','2025-10-10T10:00:00Z',false,['IA','musique','culture']),
  wv(79,'Le travail de soin (care work) sera davantage valorisé économiquement d\'ici 2030','lifestyle',[72,78,76,74,66],8600,'2030-12-31','2025-10-20T10:00:00Z',false,['care work','économie','genre']),
  wv(80,'Les espaces de coworking dépasseront les bureaux traditionnels en nombre d\'ici 2030','lifestyle',[54,58,52,54,58],6200,'2030-12-31','2025-11-01T10:00:00Z',false,['coworking','télétravail','immobilier']),

  // ── Groupe 9 : Afrique & Pays Émergents ──────────────────────────────────
  wv(81,'L\'Afrique sub-saharienne connaîtra une croissance de 5%+ par an jusqu\'en 2030','africa',[64,82,48,52,56],7800,'2030-12-31','2025-09-01T10:00:00Z',false,['Afrique','croissance','émergents']),
  wv(82,'Le paiement mobile va transformer l\'économie africaine d\'ici 2028','africa',[84,94,74,78,80],12400,'2028-12-31','2025-09-10T10:00:00Z',true,['mobile money','Afrique','fintech']),
  wv(83,'Une ville africaine intégrera le top 10 des centres financiers mondiaux d\'ici 2040','africa',[52,78,36,40,44],8600,'2040-12-31','2025-09-20T10:00:00Z',false,['Lagos','Nairobi','finance']),
  wv(84,'La diaspora africaine jouera un rôle croissant dans le développement du continent','africa',[78,88,70,74,72],9200,'2030-12-31','2025-10-01T10:00:00Z',true,['diaspora','Afrique','développement']),
  wv(85,'L\'accès à l\'électricité sera universel en Afrique sub-saharienne d\'ici 2040','africa',[58,72,54,56,60],10400,'2040-12-31','2025-10-10T10:00:00Z',false,['électricité','Afrique','énergie']),
  wv(86,'Les start-ups africaines attireront plus de 50 milliards USD d\'investissements d\'ici 2028','africa',[66,84,54,58,62],7200,'2028-12-31','2025-10-20T10:00:00Z',false,['start-ups','Afrique','investissement']),
  wv(87,'Une langue africaine deviendra langue officielle d\'une organisation internationale','africa',[38,68,26,30,32],4800,'2035-12-31','2025-11-01T10:00:00Z',false,['swahili','langue','diplomatie']),
  wv(88,'La zone de libre-échange africaine (ZLECAf) sera pleinement opérationnelle d\'ici 2030','africa',[62,82,48,52,56],7600,'2030-12-31','2025-11-10T10:00:00Z',false,['ZLECAf','commerce','intégration']),
  wv(89,'L\'enseignement supérieur africain attirera des étudiants des pays développés d\'ici 2035','africa',[44,72,32,36,38],5400,'2035-12-31','2025-11-20T10:00:00Z',false,['université','Afrique','attractivité']),
  wv(90,'Les pays africains seront significativement moins dépendants de l\'aide internationale d\'ici 2035','africa',[56,74,44,48,52],8200,'2035-12-31','2025-12-01T10:00:00Z',false,['aide','Afrique','autonomie']),

  // ── Groupe 10 : Futur & Signaux résolus ──────────────────────────────────
  wv(91,'L\'humanité établira une présence permanente sur la Lune avant 2026','future',[38,28,34,36,44],14200,'2026-01-01','2024-01-10T10:00:00Z',false,['Lune','espace','NASA'],{notes:'Aucune base lunaire permanente établie avant 2026. Signal résolu : Non.',yes:false}),
  wv(92,'Une intelligence artificielle générale (AGI) sera développée avant 2026','future',[42,46,38,40,48],18600,'2026-01-01','2024-02-01T10:00:00Z',true,['AGI','IA','singularité'],{notes:'Aucun système AGI confirmé. Les grands modèles restent des IA étroites. Signal résolu : Non.',yes:false}),
  wv(93,'L\'IA remportera un prix littéraire majeur reconnu par une académie d\'ici 2025','future',[65,56,62,64,72],9800,'2025-12-31','2024-03-01T10:00:00Z',false,['IA','littérature','prix'],{notes:'Des œuvres co-créées avec l\'IA ont remporté des prix dans plusieurs pays en 2025. Signal résolu : Oui.',yes:true}),
  wv(94,'Les voitures électriques dépasseront 30% des nouvelles ventes mondiales en 2025','future',[72,58,76,74,68],12400,'2025-12-31','2024-04-01T10:00:00Z',true,['électrique','automobile','transition'],{notes:'Les ventes mondiales de VE ont dépassé 30% en Chine et en Europe. Signal résolu : Oui.',yes:true}),
  wv(95,'Un État africain rejoindra le G7 avant 2026','future',[22,38,18,20,24],11200,'2026-01-01','2024-05-01T10:00:00Z',false,['G7','Afrique','géopolitique'],{notes:'Aucun État africain n\'a rejoint le G7. La structure reste inchangée. Signal résolu : Non.',yes:false}),
  wv(96,'L\'Union Européenne adoptera une monnaie numérique officielle (euro digital) avant 2026','future',[32,28,36,34,28],8600,'2026-01-01','2024-06-01T10:00:00Z',false,['euro digital','BCE','CBDC'],{notes:'L\'euro numérique est encore en phase pilote. Aucune adoption officielle avant 2026. Signal résolu : Non.',yes:false}),
  wv(97,'Bitcoin dépassera 100 000 USD en 2024','future',[68,62,64,66,74],9400,'2024-12-31','2024-01-20T10:00:00Z',true,['Bitcoin','crypto','prix'],{notes:'Bitcoin a franchi le cap des 100 000 USD le 5 décembre 2024. Signal résolu : Oui.',yes:true}),
  wv(98,'Les Jeux Olympiques de Paris 2024 seront un succès médiatique et organisationnel','future',[74,68,84,80,68],7800,'2024-09-30','2024-03-10T10:00:00Z',false,['JO Paris 2024','sport','France'],{notes:'Les JO Paris 2024 ont été salués comme une réussite historique, avec 12 milliards de téléspectateurs. Signal résolu : Oui.',yes:true}),
  wv(99,'L\'inflation européenne retombera durablement sous 2% avant fin 2025','future',[48,42,52,50,44],5600,'2025-12-31','2024-07-01T10:00:00Z',false,['inflation','Europe','BCE'],{notes:'L\'inflation européenne a oscillé entre 2% et 2.8% en 2025. La BCE n\'a pas atteint sa cible de façon durable. Signal résolu : Non.',yes:false}),
  wv(100,'Un traité international contraignant sur l\'IA sera signé d\'ici 2025','future',[45,48,44,46,40],8200,'2025-12-31','2024-08-01T10:00:00Z',false,['IA','traité','régulation'],{notes:'La Convention de Bletchley et l\'AI Act européen ont posé des bases, mais aucun traité global contraignant n\'a été signé. Signal résolu : Non.',yes:false}),
]
