/**
 * ZAWIOS — Centralized i18n copy dictionary
 *
 * FR is the source of truth (editorial, university-level, sober, accessible).
 * EN is a faithful mirror (no slang, no hype).
 *
 * Controlled lexicon:
 *   FR allowed: signal, vote, lecture, indice, tendance, écart, synthèse, précision,
 *               réputation, classement, modération, agrégé, contextualisé
 *   FR avoid:   pari, mise, gains, jackpot, token, "révolution", "disruptif", "viral", "hype", "divin"
 *   EN allowed: signal, vote, insight, index, trend, gap, summary, accuracy,
 *               reputation, moderation, aggregated, contextualized
 *   EN avoid:   bet, wager, gamble, token, "revolutionary", "hype"
 */

export const copy = {
  fr: {
    /* ── Brand / Positioning ── */
    brand: {
      baseline: "ZAWIOS — l'infrastructure du signal collectif.",
      promise:
        'Tu votes, tu expliques, et tu compares ton signal à celui de ta région — sans bruit.',
      disclaimer:
        "Les données sont agrégées. L'objectif est la compréhension, non la confrontation.",
    },

    /* ── Navigation ── */
    nav: {
      home: 'Accueil',
      signals: 'Signaux',
      create: 'Créer',
      leaderboard: 'Classement',
      insights: 'Analyses',
      profile: 'Profil',
      settings: 'Paramètres',
      about: 'À propos',
      signin: 'Connexion',
      join: 'Commencer',
      joinMobile: 'Commencer',
      intelligence: 'Intelligence',
      support: 'Soutenir',
      dashboard: 'Tableau de bord',
    },

    /* ── Hero ── */
    hero: {
      titleLine1: "Vote sur l'actualité.",
      titleLine2: 'Compare avec ton monde.',
      titleAccent: 'Compare avec ton monde.',
      subtitle:
        'Un signal collectif, structuré. Tu votes, tu expliques, tu observes les écarts.',
      cta: 'Commencer',
      ctaSecondary: 'Voir les signaux',
      liveIndicator: '47 000 actifs · 94 pays',
      featuredSignal: 'Signal du moment',
      sectionLabel: 'Intelligence Collective',
      headline1: 'Analyse collective\n mondiale.',
      headline2: 'Compare. Décide. Anticipe.',
      description:
        'Infrastructure stratégique fondée sur la réputation et la précision des signaux collectifs.',
    },

    /* ── Tri-state vote ── */
    vote: {
      yes: 'Oui',
      no: 'Non',
      neutral: 'Neutre',
      neutralTooltip:
        "Neutre = abstention comptabilisée. N'affecte pas la précision.",
      alignedMajority: 'Aligné avec la majorité.',
      againstMajority: 'À contre-majorité.',
      abstentionCounted: 'Abstention comptabilisée.',
      toastYes: 'Signal OUI enregistré',
      toastNo: 'Signal NON enregistré',
      toastNeutral: 'Signal NEUTRE enregistré',
      youVoted: 'Tu as voté',
      next: 'Suivant',
    },

    /* ── Mini-avis ── */
    miniAvis: {
      placeholder:
        'Ajoute une justification (optionnel). Une phrase suffit.',
      post: 'Publier',
      reply: 'Répondre',
      helpful: 'Utile',
      report: 'Signaler',
      hide: 'Masquer avis',
      show: 'Voir avis',
      add: '+ Ajouter un mini-avis',
      cancel: 'Annuler',
      published: 'Avis publié',
    },

    /* ── Signal context (structured analysis) ── */
    signalContext: {
      positionRecorded: '✔ Position enregistrée.',
      addAnalysis: 'Ajouter une analyse (facultatif)',
      placeholder: 'Précisez votre analyse en une phrase (180 car. max).',
      submit: 'Publier',
      cancel: 'Annuler',
      published: 'Analyse publiée.',
      sectionTitle: 'Analyses stratégiques',
      like: 'Utile',
      report: 'Signaler',
      nuanceIndex: 'Indice de contextualisation',
      nuancePercent: 'des votes incluent une analyse',
      synthesisTitle: 'Synthèse stratégique',
      synthesisNote: 'Synthèse générée à partir des contextes utilisateurs.',
      charCount: 'caractères',
    },

    /* ── Propositions (subject suggestions) ── */
    propositions: {
      pageTitle: 'Propositions',
      pageSubtitle:
        'Propose un sujet de signal. La communauté valide. La plateforme publie.',
      suggestCta: 'Proposer un sujet',
      formTitle: 'Nouveau sujet',
      titleLabel: 'Titre du sujet',
      titlePlaceholder: 'Question claire et vérifiable (max 120 car.)',
      descLabel: 'Description courte',
      descPlaceholder: 'Contexte et justification (max 300 car.)',
      categoryLabel: 'Catégorie',
      horizonLabel: 'Horizon',
      horizonShort: 'Court terme',
      horizonMedium: 'Moyen terme',
      horizonLong: 'Long terme',
      submit: 'Soumettre',
      cancel: 'Annuler',
      submitted: 'Proposition soumise.',
      validate: 'Valider',
      reject: 'Rejeter',
      validated: 'Validé par la communauté',
      pending: 'En attente',
      editorial: 'Revue éditoriale',
      approved: 'Approuvé',
      rejected: 'Non retenu',
      validationPercent: 'approbation',
      votesCount: 'votes',
      antiSpamLimit: 'Limite atteinte (2 propositions par semaine).',
      antiSpamCooldown: 'Pause temporaire (14 jours).',
      tooShort: 'Le titre doit contenir au moins 40 caractères.',
    },

    /* ── World View ── */
    worldView: {
      title: 'Lecture régionale',
      text: "Par défaut, ZAWIOS affiche ta région. L'international s'active sur demande.",
      ctaOptIn: 'Activer la comparaison mondiale',
      safetyNote: 'Les écarts sont agrégés et contextualisés.',
      yesPerRegion: '% OUI par région',
      you: 'toi',
      globalSummary: 'Global résumé',
      compareLabel: 'Comparer Afrique / Europe / USA',
      sectionSubtitle:
        'Résumé global agrégé — données anonymes et indicatives.',
      privacyNote: 'Données agrégées · anonymes · indicatives',
      consensus: 'consensus',
      moderateGap: 'écart modéré',
      divergence: 'divergence',
      howWorldThinks: 'Comment le monde pense',
      regionGlobal: 'Global',
      regionAfrica: 'Afrique',
      regionFrance: 'France',
      regionEurope: 'Europe',
      regionUSA: 'USA',
    },

    /* ── Categories ── */
    categories: {
      label: 'Catégories',
      title: 'Tous les sujets. Toutes les régions.',
      subtitle:
        "De la tech aux sports, de l'Afrique au USA — il y a toujours un sujet qui t'intéresse.",
      activeSignals: 'sujets actifs',
      cta: 'Commencer',
    },

    /* ── Gating (soft conversion) ── */
    gating: {
      title: 'Crée un compte pour suivre ta précision.',
      body: 'Un compte te permet de conserver tes votes, ton historique et tes analyses.',
      cta: 'Créer un compte (gratuit)',
      dismiss: 'Plus tard',
    },

    /* ── Premium ── */
    premium: {
      unlock: "Débloquer l'analyse",
      trends: 'Accéder aux tendances historiques',
      export: 'Exporter un rapport',
      intelligence: 'Intelligence (sur demande)',
    },

    /* ── Auth ── */
    auth: {
      loginTitle: 'Bon retour',
      loginSubtitle: 'Connecte-toi pour retrouver ton historique.',
      signupTitle: 'Crée ton compte',
      signupSubtitle: 'Rejoins la communauté. Gratuit.',
      emailLabel: 'Adresse e-mail',
      passwordLabel: 'Mot de passe',
      nameLabel: 'Nom complet',
      usernameLabel: "Nom d'utilisateur",
      forgotPassword: 'Mot de passe oublié ?',
      signIn: 'Se connecter',
      createAccount: 'Créer un compte (gratuit)',
      or: 'ou',
      continueGoogle: 'Continuer avec Google',
      noAccount: 'Pas encore de compte ?',
      createFree: 'En créer un gratuitement',
      hasAccount: 'Déjà un compte ?',
      signInLink: 'Se connecter',
      checkEmail: 'Vérifie ta boîte mail',
      confirmSent: 'Nous avons envoyé un lien de confirmation à',
      termsNotice: 'En créant un compte, tu acceptes nos',
      termsLink: 'Conditions',
      and: 'et',
      privacyLink: 'Politique de confidentialité',
      usernameHint: 'Lettres, chiffres et underscores uniquement',
      passwordPlaceholder: 'Minimum 8 caractères',
    },

    /* ── Feed ── */
    feed: {
      live: 'Live',
      liveSignals: 'Signaux en direct',
      results: 'Résultats',
      resolvedSignals: 'Signaux résolus',
      all: 'Tous',
      worldViewLabel: 'Vision Monde',
      worldViewQuestion: 'Comment le monde pense ?',
      worldViewDesc:
        "Signaux cross-régionaux — compare l'opinion de l'Afrique, la France, l'Europe et les USA.",
      viewWorldView: 'Voir tous les signaux Vision Monde →',
      trends: 'Tendances',
      recent: 'Récents',
      popular: 'Populaires',
      following: 'Suivis',
      consensus: 'Consensus',
      divergence: 'Divergence',
      viewWorld: 'Voir Monde',
      compareRegions: 'Comparer régions',
      allRegions: 'Toutes régions',
      noResults: 'Aucun signal pour ces filtres.',
      resetFilters: 'Réinitialiser les filtres',
      sortBy: 'Trier par',
      categoryLabel: 'Catégorie',
      regionLabel: 'Région',
      world: 'Monde',
      noMatch: 'Aucun signal ne correspond à vos critères.',
    },

    /* ── Signal card ── */
    signal: {
      resolved: 'Résolu',
      crowdSignal: 'Signal collectif',
      actualResult: 'Résultat réel',
      true: 'VRAI',
      false: 'FAUX',
      trending: 'tendance',
      votes: 'votes',
      horizonShort: '1-3 ans',
      horizonMedium: '5-10 ans',
      horizonLong: '15-30 ans',
      notFound: 'Signal introuvable',
    },

    /* ── Steps ── */
    steps: {
      label: 'Comment ça marche',
      title: '3 étapes. Rien de plus.',
      step1Title: 'Vote',
      step1Desc:
        'Oui ou Non sur les sujets du moment. Ton signal compte.',
      step2Title: 'Compare',
      step2Desc:
        'Observe ce que la foule pense. Es-tu avec la majorité ?',
      step3Title: 'Réputation',
      step3Desc:
        'Chaque réponse juste renforce ton indice. Construis ta réputation.',
    },

    /* ── CTA ── */
    cta: {
      label: 'Rejoindre',
      title: 'Commence à construire ta réputation.',
      subtitle: '47 000 analystes votent chaque jour. Gratuit.',
      button: 'Commencer',
    },

    /* ── Footer ── */
    footer: {
      tagline:
        "L'infrastructure du signal collectif. Vote, explique, compare — sans bruit.",
      rights: 'Tous droits réservés.',
      sections: {
        Product: 'Produit',
        Company: 'Entreprise',
        Legal: 'Légal',
      },
      links: {
        Predictions: 'Signaux',
        Leaderboard: 'Classement',
        Insights: 'Analyses',
        Système: 'Système produit',
        Pricing: 'Tarifs',
        Premium: 'Premium',
        Creator: 'Créateur',
        Business: 'Business',
        About: 'À propos',
        Contact: 'Contact',
        FAQ: 'FAQ',
        'Privacy Policy': 'Politique de confidentialité',
        'Terms of Service': "Conditions d'utilisation",
        Methodology: 'Méthodologie',
      },
    },

    /* ── Home page ── */
    page: {
      methodology: 'Méthodologie',
      methodologyTitle: 'Trois piliers.',
      methodologyReadMore: 'Lire la méthodologie complète →',
      pillarTitle1: 'Signal structuré',
      pillarDesc1:
        "Chaque vote est accompagné d'un contexte analytique. Les données brutes deviennent une position argumentée, traçable et comparable.",
      pillarTitle2: 'Réputation pondérée',
      pillarDesc2:
        "La précision historique de chaque analyste pondère l'impact de son signal. Plus tu es exact, plus ton vote compte.",
      pillarTitle3: 'Corrélation comparative mondiale',
      pillarDesc3:
        'Les signaux sont agrégés par région, catégorie et période. La divergence entre zones géographiques est mesurée et exposée.',
      statsAnalysts: 'Analystes',
      statsCountries: 'Pays',
      statsAccuracy: 'Précision moy.',
      feedLabel: 'Signal du moment',
      feedTitle: 'En direct',
      viewAll: 'Voir tout →',
      leaderboardLabel: 'Classement',
      leaderboardTitle: 'Top analystes',
      leaderboardSignals: 'signaux',
    },

    /* ── About ── */
    about: {
      metaTitle: 'À propos',
      metaDescription:
        "Découvrez ZAWIOS — la plateforme d'intelligence collective pour les signaux et la réputation.",
      mission: 'Notre mission',
      missionHeadline:
        "L'intelligence est collective.\nLa réputation doit être vérifiable.",
      missionDesc:
        "ZAWIOS repose sur un constat : agréger de nombreuses perspectives indépendantes produit de meilleures analyses que n'importe quel analyste isolé. Nous avons conçu la plateforme pour mesurer cela — et pour reconnaître ceux qui voient juste, régulièrement.",
      openGlobal: 'Ouvert et mondial',
      openGlobalDesc:
        "Pas de gardiens. Des analystes de 94 pays participent sur un pied d'égalité. Les meilleures idées gagnent, indépendamment du diplôme ou du lieu.",
      accuracyFirst: 'Précision avant tout',
      accuracyFirstDesc:
        'Nous mesurons ce qui compte : aviez-vous raison ? Pas la force de votre conviction, ni votre notoriété — seulement votre historique dans le temps.',
      transparentData: 'Données transparentes',
      transparentDataDesc:
        "Chaque signal est public. Chaque vote est enregistré. Chaque indice de réputation est calculé de manière transparente. Aucune boîte noire.",
      story: 'Notre histoire',
      storyP1:
        "ZAWIOS est né d'une frustration : les analyses les plus précieuses étaient réservées à des rapports coûteux, des modèles propriétaires et des réseaux fermés. Pendant ce temps, des millions de personnes informées avaient des intuitions justes sur le monde — sans aucun moyen de le prouver.",
      storyP2:
        "Nous avons créé ZAWIOS pour changer cela. Une plateforme où chacun peut prendre position, rivaliser en précision et construire un historique vérifiable. Pas d'argent, pas de paris — juste des signaux publics et un indice qui reflète la réalité.",
      storyP3:
        "Nous croyons que l'intelligence collective, correctement structurée et mesurée, produit de meilleures analyses que n'importe quel expert isolé. Et nous croyons que ceux qui ont régulièrement raison méritent d'être reconnus.",
      readyCta: 'Prêt à construire ta réputation ?',
      joinCta: 'Rejoindre ZAWIOS (gratuit)',
    },

    /* ── Signal detail ── */
    detail: {
      backToSignals: 'Retour aux signaux',
      regionalComparison: 'Comparaison régionale',
      published: 'Publié',
      horizon: 'Horizon',
    },

    /* ── Signal create ── */
    signalCreate: {
      label: 'Créer',
      title: 'Proposez un signal.',
      subtitle:
        'Partagez votre hypothèse stratégique avec la communauté mondiale.',
      comingSoon:
        "Le formulaire de création de signal sera bientôt disponible. Pour l'instant, veuillez contacter l'équipe ZAWIOS.",
      backToSignals: 'Retour aux signaux',
      contact: 'Contacter',
    },

    /* ── Signal listing page ── */
    signalPage: {
      label: 'Signaux stratégiques',
      title: 'Mesurez le futur.',
      subtitle:
        'Analysez les tendances mondiales. Votez sur les hypothèses stratégiques. Construisez votre signal.',
    },

    /* ── Signal intelligence ── */
    signalIntelligence: {
      impactLow: 'Impact faible',
      impactStructural: 'Impact structurel',
      impactCivilizational: 'Impact civilisationnel',
      conviction: 'Conviction',
      why: 'Pourquoi ?',
      personalImpactQuestion:
        'Cette hypothèse impactera-t-elle votre vie ?',
      accelerating: 'En accélération',
      signalScore: 'Signal Score',
      clarity: 'Clarté',
      impact: 'Impact',
      divergenceLabel: 'Divergence',
      participation: 'Participation',
      tooEarly: 'Trop tôt pour conclure',
    },
  },

  en: {
    /* ── Brand / Positioning ── */
    brand: {
      baseline: 'ZAWIOS — collective signal infrastructure.',
      promise:
        'Vote, explain, and compare your signal with your region — without noise.',
      disclaimer:
        'Data is aggregated. The goal is understanding, not confrontation.',
    },

    /* ── Navigation ── */
    nav: {
      home: 'Home',
      signals: 'Signals',
      create: 'Create',
      leaderboard: 'Leaderboard',
      insights: 'Insights',
      profile: 'Profile',
      settings: 'Settings',
      about: 'About',
      signin: 'Sign in',
      join: 'Get started',
      joinMobile: 'Start',
      intelligence: 'Intelligence',
      support: 'Support',
      dashboard: 'Dashboard',
    },

    /* ── Hero ── */
    hero: {
      titleLine1: 'Vote on what matters.',
      titleLine2: 'Compare with your world.',
      titleAccent: 'Compare with your world.',
      subtitle:
        'Structured collective signal. Vote, explain, and observe differences.',
      cta: 'Get started',
      ctaSecondary: 'Browse signals',
      liveIndicator: '47,000 active · 94 countries',
      featuredSignal: 'Featured signal',
      sectionLabel: 'Collective Intelligence',
      headline1: 'Global collective\n analysis.',
      headline2: 'Compare. Decide. Anticipate.',
      description:
        'Strategic infrastructure built on the reputation and accuracy of collective signals.',
    },

    /* ── Tri-state vote ── */
    vote: {
      yes: 'Yes',
      no: 'No',
      neutral: 'Neutral',
      neutralTooltip:
        'Neutral = counted abstention. Does not affect accuracy.',
      alignedMajority: 'Aligned with the majority.',
      againstMajority: 'Against the majority.',
      abstentionCounted: 'Abstention counted.',
      toastYes: 'YES signal recorded',
      toastNo: 'NO signal recorded',
      toastNeutral: 'NEUTRAL signal recorded',
      youVoted: 'You voted',
      next: 'Next',
    },

    /* ── Mini-avis ── */
    miniAvis: {
      placeholder:
        'Add a short rationale (optional). One sentence is enough.',
      post: 'Post',
      reply: 'Reply',
      helpful: 'Helpful',
      report: 'Report',
      hide: 'Hide opinions',
      show: 'Show opinions',
      add: '+ Add a short opinion',
      cancel: 'Cancel',
      published: 'Opinion posted',
    },

    /* ── Signal context (structured analysis) ── */
    signalContext: {
      positionRecorded: '✔ Position recorded.',
      addAnalysis: 'Add an analysis (optional)',
      placeholder: 'Summarize your analysis in one sentence (180 char max).',
      submit: 'Post',
      cancel: 'Cancel',
      published: 'Analysis posted.',
      sectionTitle: 'Strategic analyses',
      like: 'Helpful',
      report: 'Report',
      nuanceIndex: 'Contextualization index',
      nuancePercent: 'of votes include an analysis',
      synthesisTitle: 'Strategic synthesis',
      synthesisNote: 'Synthesis generated from user contexts.',
      charCount: 'characters',
    },

    /* ── Propositions (subject suggestions) ── */
    propositions: {
      pageTitle: 'Proposals',
      pageSubtitle:
        'Suggest a signal topic. The community validates. The platform publishes.',
      suggestCta: 'Suggest a topic',
      formTitle: 'New topic',
      titleLabel: 'Topic title',
      titlePlaceholder: 'Clear and verifiable question (max 120 char)',
      descLabel: 'Short description',
      descPlaceholder: 'Context and justification (max 300 char)',
      categoryLabel: 'Category',
      horizonLabel: 'Horizon',
      horizonShort: 'Short term',
      horizonMedium: 'Medium term',
      horizonLong: 'Long term',
      submit: 'Submit',
      cancel: 'Cancel',
      submitted: 'Proposal submitted.',
      validate: 'Validate',
      reject: 'Reject',
      validated: 'Community validated',
      pending: 'Pending',
      editorial: 'Editorial review',
      approved: 'Approved',
      rejected: 'Not retained',
      validationPercent: 'approval',
      votesCount: 'votes',
      antiSpamLimit: 'Limit reached (2 proposals per week).',
      antiSpamCooldown: 'Temporary pause (14 days).',
      tooShort: 'Title must be at least 40 characters.',
    },

    /* ── World View ── */
    worldView: {
      title: 'Regional view',
      text: 'By default, ZAWIOS shows your region. Global comparisons are opt-in.',
      ctaOptIn: 'Enable global comparison',
      safetyNote: 'Differences are aggregated and contextualized.',
      yesPerRegion: '% YES per region',
      you: 'you',
      globalSummary: 'Global summary',
      compareLabel: 'Compare Africa / Europe / USA',
      sectionSubtitle:
        'Aggregated global summary — anonymous, indicative data.',
      privacyNote: 'Aggregated · anonymous · indicative',
      consensus: 'consensus',
      moderateGap: 'moderate gap',
      divergence: 'divergence',
      howWorldThinks: 'How the world thinks',
      regionGlobal: 'Global',
      regionAfrica: 'Africa',
      regionFrance: 'France',
      regionEurope: 'Europe',
      regionUSA: 'USA',
    },

    /* ── Categories ── */
    categories: {
      label: 'Categories',
      title: 'Every topic. Every region.',
      subtitle:
        'From tech to sports, from Africa to the USA — there is always a topic for you.',
      activeSignals: 'active signals',
      cta: 'Get started',
    },

    /* ── Gating (soft conversion) ── */
    gating: {
      title: 'Create an account to track your accuracy.',
      body: 'An account lets you save votes, history, and insights.',
      cta: 'Create free account',
      dismiss: 'Not now',
    },

    /* ── Premium ── */
    premium: {
      unlock: 'Unlock analysis',
      trends: 'Access historical trends',
      export: 'Export report',
      intelligence: 'Intelligence (on request)',
    },

    /* ── Auth ── */
    auth: {
      loginTitle: 'Welcome back',
      loginSubtitle: 'Sign in to access your history.',
      signupTitle: 'Create your account',
      signupSubtitle: 'Join the community. Free.',
      emailLabel: 'Email address',
      passwordLabel: 'Password',
      nameLabel: 'Full name',
      usernameLabel: 'Username',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign in',
      createAccount: 'Create free account',
      or: 'or',
      continueGoogle: 'Continue with Google',
      noAccount: 'No account yet?',
      createFree: 'Create one for free',
      hasAccount: 'Already have an account?',
      signInLink: 'Sign in',
      checkEmail: 'Check your email',
      confirmSent: 'We sent a confirmation link to',
      termsNotice: 'By creating an account, you agree to our',
      termsLink: 'Terms',
      and: 'and',
      privacyLink: 'Privacy Policy',
      usernameHint: 'Letters, numbers, and underscores only',
      passwordPlaceholder: 'Minimum 8 characters',
    },

    /* ── Feed ── */
    feed: {
      live: 'Live',
      liveSignals: 'Live signals',
      results: 'Results',
      resolvedSignals: 'Resolved signals',
      all: 'All',
      worldViewLabel: 'World View',
      worldViewQuestion: 'How does the world think?',
      worldViewDesc:
        'Cross-regional signals — compare opinions from Africa, France, Europe, and the USA.',
      viewWorldView: 'View all World View signals →',
      trends: 'Trending',
      recent: 'Recent',
      popular: 'Popular',
      following: 'Following',
      consensus: 'Consensus',
      divergence: 'Divergence',
      viewWorld: 'View World',
      compareRegions: 'Compare regions',
      allRegions: 'All regions',
      noResults: 'No signals match these filters.',
      resetFilters: 'Reset filters',
      sortBy: 'Sort by',
      categoryLabel: 'Category',
      regionLabel: 'Region',
      world: 'World',
      noMatch: 'No signals match your criteria.',
    },

    /* ── Signal card ── */
    signal: {
      resolved: 'Resolved',
      crowdSignal: 'Crowd signal',
      actualResult: 'Actual result',
      true: 'TRUE',
      false: 'FALSE',
      trending: 'trending',
      votes: 'votes',
      horizonShort: '1-3 years',
      horizonMedium: '5-10 years',
      horizonLong: '15-30 years',
      notFound: 'Signal not found',
    },

    /* ── Steps ── */
    steps: {
      label: 'How it works',
      title: '3 steps. Nothing more.',
      step1Title: 'Vote',
      step1Desc:
        'Yes or No on trending topics. Your signal matters.',
      step2Title: 'Compare',
      step2Desc:
        'See what the crowd thinks. Are you with the majority?',
      step3Title: 'Reputation',
      step3Desc:
        'Each correct answer strengthens your index. Build your reputation.',
    },

    /* ── CTA ── */
    cta: {
      label: 'Join',
      title: 'Start building your reputation.',
      subtitle: '47,000 analysts vote every day. Free.',
      button: 'Get started',
    },

    /* ── Footer ── */
    footer: {
      tagline:
        'Collective signal infrastructure. Vote, explain, compare — without noise.',
      rights: 'All rights reserved.',
      sections: {
        Product: 'Product',
        Company: 'Company',
        Legal: 'Legal',
      },
      links: {
        Predictions: 'Signals',
        Leaderboard: 'Leaderboard',
        Insights: 'Insights',
        Système: 'Product System',
        Pricing: 'Pricing',
        Premium: 'Premium',
        Creator: 'Creator',
        Business: 'Business',
        About: 'About',
        Contact: 'Contact',
        FAQ: 'FAQ',
        'Privacy Policy': 'Privacy Policy',
        'Terms of Service': 'Terms of Service',
        Methodology: 'Methodology',
      },
    },

    /* ── Home page ── */
    page: {
      methodology: 'Methodology',
      methodologyTitle: 'Three pillars.',
      methodologyReadMore: 'Read full methodology →',
      pillarTitle1: 'Structured signal',
      pillarDesc1:
        'Every vote includes analytical context. Raw data becomes a traceable, comparable, argued position.',
      pillarTitle2: 'Weighted reputation',
      pillarDesc2:
        "Each analyst's historical accuracy weighs the impact of their signal. The more accurate you are, the more your vote counts.",
      pillarTitle3: 'Global comparative correlation',
      pillarDesc3:
        'Signals are aggregated by region, category, and period. Divergence between geographical zones is measured and exposed.',
      statsAnalysts: 'Analysts',
      statsCountries: 'Countries',
      statsAccuracy: 'Avg. accuracy',
      feedLabel: 'Featured signal',
      feedTitle: 'Live',
      viewAll: 'View all →',
      leaderboardLabel: 'Leaderboard',
      leaderboardTitle: 'Top analysts',
      leaderboardSignals: 'signals',
    },

    /* ── About ── */
    about: {
      metaTitle: 'About',
      metaDescription:
        'Learn about ZAWIOS — the collective intelligence platform for signals and reputation.',
      mission: 'Our mission',
      missionHeadline:
        'Intelligence is collective.\nReputation should be verifiable.',
      missionDesc:
        'ZAWIOS was built on one premise: aggregating many independent perspectives produces better forecasts than any single analyst. We built the platform to measure that — and to recognize the people who get it right, consistently.',
      openGlobal: 'Open & Global',
      openGlobalDesc:
        'No gatekeepers. Predictors from 94 countries participate on equal terms. The best ideas win, regardless of credential or location.',
      accuracyFirst: 'Accuracy First',
      accuracyFirstDesc:
        'We measure what matters: were you right? Not how loud you were, not how confident you sounded — just your track record over time.',
      transparentData: 'Transparent Data',
      transparentDataDesc:
        'Every signal is public. Every vote is recorded. Every reputation score is calculated transparently. No black boxes.',
      story: 'The story',
      storyP1:
        'ZAWIOS started from a frustration: the most valuable forecasting insights were reserved for expensive research reports, proprietary models, and private networks. Meanwhile, millions of informed people had accurate intuitions about the world — and no way to prove it.',
      storyP2:
        'We built ZAWIOS to fix that. A platform where anyone can take a position, compete on accuracy, and build a verified track record. No money, no bets — just public predictions and a score that reflects reality.',
      storyP3:
        'We believe that collective intelligence, properly structured and measured, produces better forecasts than any single expert. And we believe that the people who are consistently right deserve recognition.',
      readyCta: 'Ready to start building your reputation?',
      joinCta: 'Join ZAWIOS free',
    },

    /* ── Signal detail ── */
    detail: {
      backToSignals: 'Back to signals',
      regionalComparison: 'Regional comparison',
      published: 'Published',
      horizon: 'Horizon',
    },

    /* ── Signal create ── */
    signalCreate: {
      label: 'Create',
      title: 'Propose a signal.',
      subtitle:
        'Share your strategic hypothesis with the global community.',
      comingSoon:
        'The signal creation form will be available soon. In the meantime, please contact the ZAWIOS team.',
      backToSignals: 'Back to signals',
      contact: 'Contact',
    },

    /* ── Signal listing page ── */
    signalPage: {
      label: 'Strategic signals',
      title: 'Measure the future.',
      subtitle:
        'Analyze global trends. Vote on strategic hypotheses. Build your signal.',
    },

    /* ── Signal intelligence ── */
    signalIntelligence: {
      impactLow: 'Low impact',
      impactStructural: 'Structural impact',
      impactCivilizational: 'Civilizational impact',
      conviction: 'Conviction',
      why: 'Why?',
      personalImpactQuestion:
        'Will this hypothesis impact your life?',
      accelerating: 'Accelerating',
      signalScore: 'Signal Score',
      clarity: 'Clarity',
      impact: 'Impact',
      divergenceLabel: 'Divergence',
      participation: 'Participation',
      tooEarly: 'Too early to conclude',
    },
  },
} as const

export type Copy = typeof copy
export type CopyLang = typeof copy.fr
