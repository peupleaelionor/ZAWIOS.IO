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
  },
} as const

export type Copy = typeof copy
export type CopyLang = typeof copy.fr
