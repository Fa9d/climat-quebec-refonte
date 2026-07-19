// ============================================================================
// DOSSIERS ENRICHIS — Argumentaire + Contre-arguments + Cartographie acteurs
// ============================================================================

export interface ContrArgument {
  argument: string;   // ce que l'adversaire dira
  reponse: string;    // notre réponse préparée
}

export interface ActeurAdverse {
  nom: string;
  role: string;
  organisation: string;
  liensFinanciers?: string;
  liensPartisans?: string;
  porteTournante?: string;
  sources: string[];
}

export interface StrategieEnquete {
  registresAConsulter: string[];
  questionsAClarifier: string[];
  documentsPublicsClefs: string[];
}

export interface DossierComplet {
  slug: string;
  titre: string;
  region: string;
  contexteComplet: string;
  enjeuxSpecifiques: string[];
  proposition: string;
  argumentsOpposition: string[];
  contrArguments: ContrArgument[];
  acteursAdverses: ActeurAdverse[];
  strategieEnquete: StrategieEnquete;
  statut: "Actif" | "En cours" | "Victoire partielle";
}

// ============================================================================
// DOSSIER 1 : TES CANADA
// ============================================================================

export const DOSSIER_TES_CANADA: DossierComplet = {
  slug: "tes-canada",
  titre: "TES Canada, c'est NON",
  region: "Mauricie · Shawinigan",
  statut: "Actif",

  contexteComplet:
    "TES Canada (Transitional Energy Solutions) est une entreprise privée qui propose d'installer une gigafactory de production de matériaux de batteries à Shawinigan, en Mauricie. Le projet prévoit une consommation massive d'électricité d'Hydro-Québec — estimée entre 700 MW et 1 000 MW — et d'importantes quantités d'eau industrielle. La puissance électrique réservée équivaut à alimenter environ 700 000 foyers québécois. Les conditions de l'entente de principe avec Hydro-Québec n'ont pas été rendues publiques. En avril 2026, le gouvernement Fréchette s'apprêtait à signer une entente avant même l'évaluation environnementale complète.",

  enjeuxSpecifiques: [
    "Consommation de 700 à 1 000 MW d'électricité publique au profit d'intérêts privés étrangers",
    "Entente opaque avec Hydro-Québec : tarifs préférentiels non divulgués à la population",
    "Risque de pénurie de capacité électrique pour les Québécois et les PME locales",
    "Impacts sur les ressources hydriques de la Mauricie non évalués publiquement",
    "Absence de BAPE obligatoire avant la signature de l'entente de principe",
    "Emplois promis principalement temporaires (phase construction) ; bénéfices à long terme captés hors Québec",
    "Précédent dangereux : privatisation rampante des surplus d'Hydro-Québec",
  ],

  proposition:
    "Suspendre toute signature d'entente avec TES Canada jusqu'à : (1) divulgation complète de tous les termes contractuels à l'Assemblée nationale ; (2) évaluation environnementale indépendante incluant BAPE ; (3) démonstration que la capacité électrique est excédentaire et ne nuit pas aux besoins collectifs ; (4) participation financière publique majoritaire ou retrait total du projet.",

  argumentsOpposition: [
    "L'entente de principe avec Hydro-Québec a été négociée hors du regard de l'Assemblée nationale — violation de la transparence démocratique",
    "700 à 1 000 MW représentent une ressource collective détournée : Hydro-Québec appartient aux Québécois, pas aux actionnaires de TES Canada",
    "Le PDG Éric Gauthier, ancien cadre de Power Corporation, représente exactement le type d'intérêts privés que la nationalisation de l'électricité visait à contrer",
    "Aucun BAPE n'a été déclenché malgré l'envergure du projet — précédent légal risqué",
    "Les emplois annoncés sont en grande majorité des emplois de construction temporaires",
    "Les bénéfices fiscaux iront à une entité enregistrée hors Québec ; le Québec assume le risque environnemental et infrastructurel",
    "La Mauricie n'a pas été consultée — les élus municipaux ont été placés devant le fait accompli",
  ],

  contrArguments: [
    {
      argument: "Le projet va créer des milliers d'emplois en région",
      reponse:
        "Les emplois annoncés sont majoritairement des emplois de construction (phase temporaire). Les emplois permanents en haute technologie nécessitent une main-d'œuvre spécialisée non disponible localement à court terme. Exiger : combien d'emplois permanents? Quel % comblé par des résidents de Mauricie? Quel salaire moyen? Ces données n'ont pas été rendues publiques.",
    },
    {
      argument: "C'est de l'énergie propre, ça remplace les batteries au lithium sale",
      reponse:
        "L'énergie produite par TES Canada sera vendue sur les marchés nord-américains, pas réservée au Québec. La 'propreté' de la chaîne de valeur dépend de l'extraction du lithium, du cobalt et du nickel — processus miniers destructeurs souvent réalisés sans normes environnementales québécoises.",
    },
    {
      argument: "Hydro-Québec a des surplus électriques, autant les valoriser",
      reponse:
        "Les surplus d'Hydro-Québec servent de tampon pour les années de faible hydraulicité, les vagues de froid, et l'électrification des transports à venir. Brader 1 000 MW à prix préférentiel à une seule entreprise privée prive la collectivité de cette réserve stratégique pour une génération.",
    },
    {
      argument: "Le Québec doit attirer les investissements étrangers pour sa transition",
      reponse:
        "La transition ne se fait pas en sous-traitant notre énergie publique. Le modèle à défendre c'est Hydro-Québec elle-même qui investit dans la transformation — pas un intermédiaire privé qui extrait la valeur ajoutée. D'autres provinces ont signé des ententes similaires et regrettent le manque de retombées réelles.",
    },
    {
      argument: "S'opposer à TES Canada c'est s'opposer à la transition énergétique",
      reponse:
        "C'est exactement l'inverse. La transition énergétique exige que les ressources collectives soient gérées collectivement. S'opposer à TES Canada, c'est refuser que la transition serve de prétexte pour privatiser Hydro-Québec par tranche de 1 000 MW. Nous sommes pour la transition — sous contrôle public.",
    },
  ],

  acteursAdverses: [
    {
      nom: "Éric Gauthier",
      role: "PDG de TES Canada",
      organisation: "TES Canada",
      liensFinanciers: "Ancien cadre de Power Corporation (empire Desmarais). Power Corp est actionnaire indirect de plusieurs fonds d'infrastructure énergétique.",
      liensPartisans: "À vérifier : historique de dons politiques au Registre des élections du Québec (electionsquebec.qc.ca)",
      porteTournante: "Trajectoire cabinet privé → entreprise d'infrastructure → projet bénéficiant de contrats publics",
      sources: [
        "climat.quebec — Lettre du 10 avril 2026 : 'Réponse à la propagande de TES Canada'",
        "lobbyisme.gouv.qc.ca — chercher 'TES Canada'",
        "Registraire des entreprises du Québec — administrateurs de TES Canada inc.",
      ],
    },
    {
      nom: "Power Corporation / Groupe Desmarais",
      role: "Réseau financier de fond",
      organisation: "Power Corporation of Canada",
      liensFinanciers: "Actionnaire de Sagard Holdings, fonds d'infrastructure, Great-West, IGM Financial. Intérêts dans l'énergie privée au Canada.",
      liensPartisans: "Historique de financement des partis libéraux fédéral et provincial. Relations connues avec la CAQ via des intermédiaires.",
      sources: [
        "Rapports annuels Power Corporation (sedar.com)",
        "Financement politique : directeur général des élections Canada (elections.ca)",
      ],
    },
    {
      nom: "Christine Fréchette (CAQ)",
      role: "Première ministre du Québec",
      organisation: "Coalition Avenir Québec",
      liensFinanciers: "Gouvernement signataire potentiel de l'entente Hydro-Québec / TES Canada",
      liensPartisans: "CAQ — vérifier les liens entre donateurs CAQ 2022-2026 et actionnaires / dirigeants TES Canada",
      sources: [
        "Assemblée nationale — débats et questions orales sur TES Canada",
        "Registre des lobbyistes : mandats actifs auprès du MERN et du MEI",
      ],
    },
  ],

  strategieEnquete: {
    registresAConsulter: [
      "lobbyisme.gouv.qc.ca — chercher 'TES Canada', 'Transitional Energy', 'Gauthier'",
      "Registraire des entreprises du Québec (REQ) — administrateurs, actionnaires, siège social",
      "SEAO (seao.ca) — contrats accordés à TES Canada ou entreprises liées",
      "electionsquebec.qc.ca — dons politiques des dirigeants identifiés (2018-2026)",
      "SEDAR/EDGAR — si TES Canada ou maison mère est cotée en bourse",
      "Assemblée nationale — verbatim des commissions parlementaires sur TES Canada",
    ],
    questionsAClarifier: [
      "Qui sont les actionnaires réels de TES Canada inc. au REQ?",
      "Quel est le tarif électrique négocié avec Hydro-Québec (tarif L industriel ou tarif spécial)?",
      "L'entente de principe a-t-elle été approuvée par le CA d'Hydro-Québec?",
      "Quels lobbyistes ont rencontré quels ministres, et à quelle fréquence?",
      "Y a-t-il des mandats de conseil/lobbying payés à d'anciens élus ou fonctionnaires?",
      "Quel est le plan de sortie si TES Canada fait défaut ou quitte le Québec?",
    ],
    documentsPublicsClefs: [
      "Rapport annuel Hydro-Québec 2025 — capacité réservée aux grands clients industriels",
      "Plan stratégique Hydro-Québec 2035 — projections de surplus",
      "Décret(s) du Conseil des ministres autorisant les négociations avec TES Canada",
      "Documents MELCCFP sur l'évaluation environnementale du site de Shawinigan",
      "Procès-verbaux du conseil de ville de Shawinigan sur le projet TES Canada",
    ],
  },
};

// ============================================================================
// DOSSIER 2 : STABLEX
// ============================================================================

export const DOSSIER_STABLEX: DossierComplet = {
  slug: "stablex",
  titre: "Stoppons Stablex",
  region: "Blainville · Laurentides",
  statut: "Actif",

  contexteComplet:
    "Stablex Canada inc. opère depuis 1980 un centre de traitement et d'élimination de matières dangereuses à Blainville, dans les Laurentides. Le site jouxte la Grande Tourbière de Blainville, un milieu humide d'importance régionale qui filtre naturellement l'eau potable pour des centaines de milliers de personnes de la Couronne Nord. En 2026, l'entreprise cherche à agrandir sa capacité d'enfouissement. En juin 2026, une campagne d'échantillonnage indépendante menée conjointement par Climat Québec et la Coalition des citoyens de Blainville a confirmé une contamination des eaux souterraines à proximité du site.",

  enjeuxSpecifiques: [
    "Contamination confirmée des eaux souterraines par échantillonnage indépendant (juin 2026)",
    "Menace directe sur la Grande Tourbière de Blainville — milieu humide irremplaçable",
    "Risque pour l'eau potable de la Couronne Nord (plusieurs centaines de milliers de résidents)",
    "Agrandissement proposé malgré la contamination détectée",
    "Données environnementales officielles non rendues publiques dans leur intégralité",
    "Absence d'application du principe de précaution par le gouvernement CAQ",
    "Processus d'autorisation opaque via la CMM",
  ],

  proposition:
    "Moratoire immédiat sur tout agrandissement du site Stablex jusqu'à : (1) publication intégrale de toutes les données d'échantillonnage (MELCCFP et données indépendantes) ; (2) évaluation indépendante des risques pour la tourbière et les eaux souterraines ; (3) enquête publique (BAPE ou équivalent) avec participation citoyenne réelle ; (4) plan de décontamination aux frais de Stablex si contamination avérée.",

  argumentsOpposition: [
    "Une contamination des eaux souterraines a été scientifiquement confirmée en juin 2026 — agrandir maintenant viole le principe de précaution",
    "La Grande Tourbière de Blainville est un service écologique public non remplaçable : sa perte est irréversible",
    "Le MELCCFP n'a pas publié ses propres données — opacité incompatible avec la démocratie environnementale",
    "Stablex opère depuis 1980 sur un site qui jouxte un milieu humide : les permis initiaux méritent d'être réexaminés",
    "L'État protège les revenus fiscaux de Stablex au lieu de protéger la santé de 300 000+ résidents",
    "Le droit à l'eau potable est reconnu par l'ONU — le gouvernement québécois a l'obligation légale de le protéger",
  ],

  contrArguments: [
    {
      argument: "Stablex traite des déchets dangereux : il faut bien les mettre quelque part",
      reponse:
        "C'est un faux dilemme. La question n'est pas 'déchets dangereux oui ou non' mais 'à quel endroit et sous quelles conditions'. Un site adjacent à un milieu humide critique et dont les eaux souterraines sont déjà contaminées n'est pas le bon endroit. La solution est la dépollution du site existant et la recherche d'alternatives, pas l'agrandissement.",
    },
    {
      argument: "Stablex respecte toutes les normes réglementaires",
      reponse:
        "Si Stablex respectait toutes les normes, pourquoi l'échantillonnage indépendant de juin 2026 a-t-il confirmé une contamination? Soit les normes sont insuffisantes, soit elles ne sont pas respectées. Dans les deux cas, l'agrandissement est inacceptable. Nous demandons la publication de TOUTES les données, pas seulement celles que Stablex choisit de divulguer.",
    },
    {
      argument: "Le site crée des emplois locaux à Blainville",
      reponse:
        "Les emplois locaux ne compensent pas la contamination de l'eau potable d'une région. On ne négocie pas la santé publique contre des emplois. Une décontamination sérieuse et une reconversion du site créeraient aussi des emplois spécialisés en génie environnemental, sans sacrifier l'eau et les milieux naturels.",
    },
    {
      argument: "Les données de contamination sont préliminaires et non officielles",
      reponse:
        "Si les données officielles contredisent nos résultats, le gouvernement n'a qu'à publier immédiatement toutes ses propres données d'échantillonnage. Refuser de les publier tout en disqualifiant les données indépendantes, c'est le comportement d'une autorité qui cache quelque chose. Nous demandons la transparence totale.",
    },
    {
      argument: "Le processus réglementaire est en cours, laissons-le suivre son cours",
      reponse:
        "Le 'processus' a déjà permis 44 ans d'opération adjacente à une tourbière critique. La contamination confirmée en 2026 montre que le processus a failli. Continuer sans moratoire, c'est permettre que la contamination s'aggrave pendant qu'on délibère. Le principe de précaution commande d'arrêter d'abord, d'évaluer ensuite.",
    },
  ],

  acteursAdverses: [
    {
      nom: "Stablex Canada inc.",
      role: "Opérateur du site d'élimination de matières dangereuses",
      organisation: "Stablex Canada (filiale de Clean Harbors, États-Unis)",
      liensFinanciers: "Clean Harbors Inc. est cotée en bourse (NYSE: CLH), siège à Norwell, Massachusetts. Chiffre d'affaires ~6 milliards USD. Stablex Canada est une de ses filiales canadiennes.",
      sources: [
        "Registraire des entreprises du Québec — Stablex Canada inc.",
        "SEC.gov / NYSE — Clean Harbors Inc. (CLH) — rapports annuels 10-K",
        "lobbyisme.gouv.qc.ca — chercher 'Stablex', 'Clean Harbors'",
      ],
    },
    {
      nom: "Clean Harbors Inc.",
      role: "Maison mère américaine (NYSE: CLH)",
      organisation: "Clean Harbors, Norwell MA, États-Unis",
      liensFinanciers: "Société cotée en bourse, ~6 Mds$ CA. Opère des sites similaires aux États-Unis, Canada, Mexique. Intérêt direct à maximiser la capacité d'enfouissement canadienne.",
      sources: [
        "SEC EDGAR — Clean Harbors 10-K annuel",
        "Rapport annuel Stablex Canada — dépôt au REQ",
      ],
    },
    {
      nom: "CMM — Communauté métropolitaine de Montréal",
      role: "Autorité planificatrice — consultations sur déchets dangereux (avril 2026)",
      organisation: "CMM (organisme public)",
      liensFinanciers: "Intérêt à maintenir des solutions régionales de traitement des déchets dangereux pour ses membres.",
      sources: [
        "cmm.qc.ca — comptes rendus des consultations publiques sur les déchets dangereux (2026)",
        "Assemblée nationale — questions à la ministre de l'Environnement sur le rôle de la CMM",
      ],
    },
    {
      nom: "MELCCFP",
      role: "Ministère de l'Environnement — autorité de délivrance des permis",
      organisation: "Gouvernement du Québec (CAQ)",
      liensPartisans: "CAQ — vérifier si des directives ministérielles ont été données pour accélérer le dossier",
      sources: [
        "Accès à l'information : demander les communications internes MELCCFP sur le dossier Stablex 2024-2026",
        "Assemblée nationale — débats et questions orales sur Stablex",
      ],
    },
  ],

  strategieEnquete: {
    registresAConsulter: [
      "lobbyisme.gouv.qc.ca — chercher 'Stablex', 'Clean Harbors'",
      "REQ — Stablex Canada inc. : administrateurs, actionnaires, changements récents",
      "SEC EDGAR — Clean Harbors 10-K : risques environnementaux déclarés pour le site canadien",
      "electionsquebec.qc.ca — dons politiques des dirigeants de Stablex / Clean Harbors au Québec",
      "Accès à l'information (Loi sur l'accès) — données d'échantillonnage MELCCFP 2020-2026",
      "cmm.qc.ca — procès-verbaux et mémoires de la consultation déchets dangereux 2026",
    ],
    questionsAClarifier: [
      "Quelles sont exactement les données de contamination que le MELCCFP détient et refuse de publier?",
      "Qui a approuvé le dernier renouvellement de permis de Stablex et à quelle date?",
      "Y a-t-il des mandataires de lobbying actifs auprès du gouvernement Fréchette pour ce dossier?",
      "La tourbière de Blainville est-elle protégée par un statut légal (milieu humide d'intérêt)?",
      "Stablex a-t-elle déjà fait l'objet de condamnations ou d'ordres de conformité au Québec?",
    ],
    documentsPublicsClefs: [
      "Permis d'exploitation Stablex — MELCCFP (via demande d'accès à l'information)",
      "Étude d'impact environnemental déposée par Stablex pour l'agrandissement",
      "Rapport de la campagne d'échantillonnage indépendante — Climat Québec / Coalition (juin 2026)",
      "Schéma d'aménagement de la MRC Thérèse-De Blainville — zonage du site Stablex",
      "Plan métropolitain de gestion des déchets dangereux de la CMM",
    ],
  },
};

// ============================================================================
// DOSSIER 3 : MÉGA-ÉOLIENNES PRIVÉES
// ============================================================================

export const DOSSIER_MEGA_EOLIENNES: DossierComplet = {
  slug: "mega-eoliennes-privees",
  titre: "Méga-éoliennes privées",
  region: "Arthabaska · Centre-du-Québec · régions rurales",
  statut: "En cours",

  contexteComplet:
    "Le gouvernement CAQ a lancé depuis 2022 de vastes appels d'offres pour le développement de l'éolien, confiés à des promoteurs privés. Des projets de méga-éoliennes (turbines de 5 à 7 MW, hauteurs de 200 m+) sont imposés dans des régions rurales — Arthabaska, Centre-du-Québec, Mauricie, Bas-Saint-Laurent — sans véritable consentement des municipalités et des résidents. Les MRC et les conseils municipaux sont souvent contournés par des ententes directes entre le promoteur et les propriétaires terriens. Les redevances versées aux communautés sont minimales comparativement aux profits captés par les actionnaires, souvent des fonds d'investissement étrangers.",

  enjeuxSpecifiques: [
    "Projets imposés sans consentement municipal ni référendum communautaire",
    "Promoteurs privés captent la quasi-totalité des bénéfices ; redevances communautaires symboliques",
    "Impacts visuels, sonores et sur la faune (oiseaux, chauves-souris) non évalués adéquatement",
    "Dépréciation des propriétés résidentielles riveraines documentée dans d'autres juridictions",
    "Ressource éolienne (vent) est une ressource naturelle collective — sa privatisation est illégitime",
    "Aucun mécanisme de participation financière citoyenne obligatoire",
    "Contrats de 20-25 ans qui lient Hydro-Québec à des tarifs négociés hors marché",
  ],

  proposition:
    "Moratoire sur tout nouveau projet éolien privé. Transition vers un modèle 100% public (Hydro-Québec maître d'œuvre) ou coopératif (communautés locales actionnaires majoritaires). Exiger un véritable consentement communautaire préalable (vote de la MRC ou référendum). Divulgation complète des contrats d'achat d'électricité signés par Hydro-Québec.",

  argumentsOpposition: [
    "Le vent est une ressource naturelle collective — le confier à des promoteurs privés revient à privatiser un bien commun, exactement comme vendre l'eau des rivières",
    "Les contrats d'achat à long terme (20-25 ans) signés avec des privés coûtent plus cher à Hydro-Québec que si elle construisait elle-même — la différence est un transfert de richesse aux actionnaires",
    "Le modèle coopératif ou Hydro-Québec maître d'œuvre existe déjà (ex : éolien des Moulins, parcs communautaires) et fonctionne",
    "Les MRC concernées ont voté des résolutions d'opposition qui ont été ignorées — violation de l'autonomie municipale",
    "Les études d'impact sont commandées et payées par les promoteurs eux-mêmes — conflit d'intérêts structurel",
    "Les contrats éoliens représentent une dette cachée pour Hydro-Québec et les contribuables, non inscrite au bilan",
  ],

  contrArguments: [
    {
      argument: "L'éolien privé est nécessaire pour atteindre les cibles de réduction de GES",
      reponse:
        "Les cibles de réduction de GES ne spécifient pas que l'énergie renouvelable doit être développée par le secteur privé. Hydro-Québec peut développer l'éolien elle-même ou en partenariat avec les communautés. L'argument confond l'objectif (décarbonisation) avec le moyen (privatisation) — les deux ne sont pas liés.",
    },
    {
      argument: "Les promoteurs prennent le risque financier à la place d'Hydro-Québec",
      reponse:
        "Faux : Hydro-Québec garantit l'achat de l'électricité à prix fixe pendant 20-25 ans. Ce contrat garanti élimine pratiquement tout risque pour le promoteur. C'est le consommateur québécois qui garantit la rentabilité du projet. Le 'risque privé' est un mythe dans ce modèle.",
    },
    {
      argument: "Les propriétaires terriens profitent des redevances",
      reponse:
        "Seuls les propriétaires des terrains sur lesquels sont érigées les éoliennes reçoivent des redevances (quelques milliers de dollars par turbine par an). Les voisins immédiats subissent les impacts sans compensation. La communauté dans son ensemble ne bénéficie pas proportionnellement à la valeur de la ressource exploitée.",
    },
    {
      argument: "Les municipalités ont été consultées",
      reponse:
        "Il y a une différence entre consultation et consentement. Plusieurs MRC ont adopté des résolutions d'opposition formelle qui ont été ignorées par le gouvernement provincial. Une consultation sans droit de veto n'est pas un consentement — c'est une procédure d'acceptation simulée.",
    },
  ],

  acteursAdverses: [
    {
      nom: "Boralex inc.",
      role: "Promoteur éolien — l'un des plus actifs au Québec",
      organisation: "Boralex inc. (TSX: BLX), siège à Kingsey Falls, QC",
      liensFinanciers: "Société cotée en bourse (TSX: BLX). Actionnaires institutionnels incluent Caisse de dépôt, fonds américains et européens. Revenus garantis par contrats Hydro-Québec.",
      liensPartisans: "À vérifier : dons politiques des dirigeants (electionsquebec.qc.ca). Boralex a des intérêts directs à maintenir le modèle d'appels d'offres privés.",
      sources: [
        "TSX — Boralex inc. (BLX) — rapports annuels",
        "lobbyisme.gouv.qc.ca — mandats de représentation Boralex auprès du MERN et MEI",
        "electionsquebec.qc.ca — dons politiques dirigeants Boralex",
      ],
    },
    {
      nom: "EDF Renouvelables Canada",
      role: "Promoteur éolien multinational",
      organisation: "EDF Renouvelables (filiale EDF France, semi-public)",
      liensFinanciers: "EDF est partiellement détenue par l'État français. Sa filiale canadienne développe des projets au Québec avec des contrats Hydro-Québec garantis.",
      sources: [
        "lobbyisme.gouv.qc.ca — EDF Renouvelables Canada",
        "SEAO — contrats et appels d'offres liés à EDF au Québec",
      ],
    },
    {
      nom: "Ministère de l'Économie et de l'Innovation (MEI) — CAQ",
      role: "Autorité responsable des appels d'offres éoliens",
      organisation: "Gouvernement du Québec (CAQ)",
      liensPartisans: "Le MEI pilote les appels d'offres au bénéfice des promoteurs privés plutôt que de mandater Hydro-Québec directement.",
      sources: [
        "Assemblée nationale — commissions parlementaires sur la politique énergétique",
        "Décrets du Conseil des ministres autorisant les appels d'offres éoliens 2022-2026",
      ],
    },
  ],

  strategieEnquete: {
    registresAConsulter: [
      "lobbyisme.gouv.qc.ca — Boralex, EDF Renouvelables, Innergex, Hydro-Québec Production",
      "SEAO — appels d'offres éoliens et contrats d'achat d'électricité 2020-2026",
      "TSX — Boralex (BLX), Innergex (INE) : actionnaires institutionnels",
      "electionsquebec.qc.ca — dons politiques des PDG et VP des promoteurs éoliens",
      "Assemblée nationale — verbatim des commissions sur la politique énergétique",
    ],
    questionsAClarifier: [
      "Quels sont les tarifs exacts des contrats d'achat d'électricité signés avec chaque promoteur?",
      "Combien de MRC ont adopté des résolutions d'opposition et ont été ignorées?",
      "Quel est le retour financier réel vers les communautés locales comparé aux profits des promoteurs?",
      "Y a-t-il des lobbyistes ayant travaillé pour le MERN avant de rejoindre des promoteurs privés?",
    ],
    documentsPublicsClefs: [
      "Contrats d'achat d'électricité (CAE) entre Hydro-Québec et les promoteurs éoliens — via accès à l'information",
      "Résolutions des MRC d'Arthabaska et du Centre-du-Québec sur les projets éoliens",
      "Rapports d'impact environnemental déposés au MELCCFP pour chaque projet",
      "Plan d'approvisionnement d'Hydro-Québec 2025-2034",
    ],
  },
};

// ============================================================================
// DOSSIER 4 : RIO TINTO / ALCAN — PÉRIBONKA
// ============================================================================

export const DOSSIER_RIO_TINTO: DossierComplet = {
  slug: "rio-tinto-alcan",
  titre: "Rio Tinto / Alcan — Péribonka",
  region: "Saguenay–Lac-Saint-Jean · Côte-Nord",
  statut: "Actif",

  contexteComplet:
    "Rio Tinto (multinationale britanno-australienne) contrôle via sa filiale Rio Tinto Alcan plusieurs barrages hydroélectriques majeurs sur la rivière Péribonka et ses affluents au Saguenay–Lac-Saint-Jean. Ces droits ont été acquis par Alcan il y a un siècle dans le cadre de concessions industrielles accordées pour développer l'industrie de l'aluminium. Rio Tinto rachète Alcan en 2007. Ces barrages génèrent une énergie hydraulique colossale qui alimente les alumineries de Jonquière (Arvida), Grande-Baie et Alma. Les bénéfices de cette énergie — produite par des ressources hydriques québécoises — sont captés par des actionnaires étrangers. Les contrats et conventions hydroélectriques qui régissent ces droits ont été négociés à des époques où la conscience de la souveraineté des ressources naturelles était très différente.",

  enjeuxSpecifiques: [
    "Des ressources hydriques collectives québécoises génèrent des profits pour des actionnaires britanniques et australiens",
    "Contrats centenaires accordant des droits d'eau et d'hydroélectricité à des conditions jamais révisées",
    "Rio Tinto peut menacer de fermer les alumineries si le Québec renégocie — chantage à l'emploi",
    "Les communautés autochtones (Ilnuatsh, Innus) n'ont jamais consenti aux barrages sur leurs territoires ancestraux",
    "Aucune évaluation récente et publique de la valeur réelle des droits hydrauliques cédés à Rio Tinto",
    "L'aluminium produit est exporté brut — la valeur ajoutée est réalisée hors Québec",
    "Péribonka : impacts écologiques sur les poissons migrateurs jamais pleinement compensés",
  ],

  proposition:
    "Mandater le gouvernement pour renégocier les conventions hydroélectriques avec Rio Tinto Alcan, exiger une redevance juste sur les droits d'eau utilisés, et inscrire dans la loi l'obligation de consultation des Premières Nations affectées. Étudier la possibilité de rachat public des infrastructures hydrauliques à l'expiration des contrats.",

  argumentsOpposition: [
    "Les barrages sur la Péribonka ont été construits grâce aux ressources naturelles du Québec — la rente hydraulique appartient aux Québécois, pas aux actionnaires de Rio Tinto",
    "Des droits centenaires accordés dans un contexte colonial et pré-démocratique ne constituent pas un titre perpétuel et légitime",
    "Les Ilnuatsh et les Innus du Lac-Saint-Jean n'ont jamais cédé leurs droits sur la Péribonka — titre ancestral non éteint",
    "Le Québec paie sa propre électricité plus cher que ce que Rio Tinto paie pour alimenter ses alumineries — inéquité structurelle",
    "Lors du rachat d'Alcan par Rio Tinto (2007), aucune renégociation des droits d'eau n'a été exigée par le gouvernement québécois",
    "La nationalisation ou le rapatriement partiel des barrages est économiquement viable et politiquement légitime",
  ],

  contrArguments: [
    {
      argument: "Toucher aux droits de Rio Tinto fera fermer les alumineries et détruira des milliers d'emplois",
      reponse:
        "C'est le chantage classique de toute multinationale qui bénéficie de ressources sous-évaluées. Rio Tinto a investi des milliards dans ses alumineries québécoises — elle ne peut pas les déménager. La renégociation des droits d'eau ne menace pas les emplois : elle demande simplement une juste compensation pour les ressources publiques utilisées. D'autres juridictions (Islande, Norvège) ont renégocié avec succès.",
    },
    {
      argument: "Les contrats sont légaux et doivent être respectés",
      reponse:
        "La légalité et la légitimité ne sont pas la même chose. Des contrats centenaires signés dans un contexte colonial, sans consultation des Premières Nations et sans évaluation moderne de la valeur des ressources, peuvent être légalement contraignants tout en étant profondément inéquitables. La renégociation est possible à l'expiration des contrats, et le Québec a le droit de ne pas les renouveler automatiquement.",
    },
    {
      argument: "Rio Tinto investit au Québec et paie des impôts ici",
      reponse:
        "Les impôts payés ne compensent pas la valeur de la rente hydraulique captée. Une étude indépendante de la valeur marchande des droits d'eau accordés à Rio Tinto, comparée aux redevances réellement payées, démontrerait l'ampleur du transfert de richesse. Nous demandons cette étude publique.",
    },
    {
      argument: "L'aluminium québécois est parmi les plus propres au monde grâce à l'hydroélectricité",
      reponse:
        "Précisément — et c'est une valeur que Rio Tinto monnaie sur les marchés mondiaux (aluminium bas carbone). Cette valeur verte vient entièrement de nos ressources naturelles. Si l'aluminium québécois a une prime verte, une partie de cette prime devrait revenir aux Québécois sous forme de redevances plus élevées.",
    },
  ],

  acteursAdverses: [
    {
      nom: "Rio Tinto Alcan inc.",
      role: "Opérateur des alumineries et des barrages",
      organisation: "Rio Tinto Alcan (filiale de Rio Tinto plc)",
      liensFinanciers: "Rio Tinto plc est cotée à Londres (LSE: RIO) et Sydney (ASX: RIO). Capitalisation boursière ~100 milliards USD. Filiale québécoise contrôle barrages Péribonka, Passes-Dangereuses, Chute-du-Diable.",
      porteTournante: "Vérifier les passages entre hauts fonctionnaires du MERN/MRN et postes de direction chez Rio Tinto Alcan Québec",
      sources: [
        "lobbyisme.gouv.qc.ca — Rio Tinto Alcan",
        "London Stock Exchange — Rio Tinto plc rapports annuels",
        "MERN Québec — registre des droits hydrauliques accordés à Rio Tinto Alcan",
      ],
    },
    {
      nom: "Gouvernement du Québec (successifs)",
      role: "Gardien des conventions hydroélectriques — complice par inaction",
      organisation: "CAQ, PLQ, PQ (successivement)",
      liensPartisans: "Aucun parti provincial n'a remis en question les droits de Rio Tinto depuis des décennies — consensus transpartisan de non-intervention",
      sources: [
        "Assemblée nationale — historique des débats sur les conventions hydroélectriques",
        "MERN — texte des conventions hydroélectriques (via accès à l'information)",
      ],
    },
    {
      nom: "Conseil des Premières Nations du Québec et du Labrador (CPNQL)",
      role: "À mobiliser comme allié, pas adversaire — droits non cédés sur Péribonka",
      organisation: "CPNQL + Conseil des Innus de Pessamit + Nation Ilnuatsh",
      sources: [
        "Traités et ententes territoriales disponibles sur les sites des nations concernées",
        "Décisions judiciaires sur les droits ancestraux en Mauricie et Saguenay (jurisprudence)",
      ],
    },
  ],

  strategieEnquete: {
    registresAConsulter: [
      "lobbyisme.gouv.qc.ca — Rio Tinto Alcan, mandats actifs",
      "MERN Québec — registre des droits hydrauliques et conventions",
      "London Stock Exchange / ASX — Rio Tinto plc : rapports annuels, risques déclarés au Québec",
      "electionsquebec.qc.ca — dons politiques des dirigeants Rio Tinto Alcan Québec",
      "Accès à l'information — texte intégral des conventions hydroélectriques",
    ],
    questionsAClarifier: [
      "Quel est le tarif exact payé par Rio Tinto Alcan pour l'eau et l'électricité par rapport au tarif industriel standard?",
      "À quelle date expirent les principales conventions hydroélectriques?",
      "Y a-t-il eu des renouvellements tacites sans approbation parlementaire?",
      "Les nations Ilnuatsh et Innu ont-elles des recours juridiques actifs concernant la Péribonka?",
      "Quelle est la valeur actualisée des droits d'eau cédés selon une évaluation économique moderne?",
    ],
    documentsPublicsClefs: [
      "Conventions hydroélectriques originales entre le Québec (ou ses prédécesseurs) et Alcan/Rio Tinto",
      "Renouvellements de conventions 1990-2026 — Conseil des ministres",
      "Rapport du Vérificateur général du Québec sur la gestion des droits hydrauliques industriels",
      "Décisions du Tribunal des droits de la personne / Cour supérieure sur droits ancestraux Péribonka",
    ],
  },
};

// ============================================================================
// DOSSIER 5 : TRANSPORT COLLECTIF
// ============================================================================

export const DOSSIER_TRANSPORT: DossierComplet = {
  slug: "transport-collectif",
  titre: "Transport collectif pour tous",
  region: "Toutes les régions du Québec",
  statut: "En cours",

  contexteComplet:
    "Le Québec consacre depuis des décennies l'écrasante majorité de ses investissements en transport aux routes et autoroutes, au détriment du transport collectif régional. En dehors de Montréal et Québec, les services de transport en commun sont quasi inexistants ou symboliques. Cette dépendance à l'automobile génère des émissions de GES massives (le transport représente ~40% des émissions québécoises), des coûts exorbitants pour les ménages, et une exclusion sociale des personnes sans voiture. Le lobby automobile, pétrolier et de la construction routière exerce une influence déterminante sur les politiques de transport depuis des générations.",

  enjeuxSpecifiques: [
    "Transport = ~40% des émissions de GES au Québec — secteur le plus difficile à décarboniser sans investissement public majeur",
    "Des régions entières n'ont aucun service de transport collectif — exclusion sociale systémique",
    "Coût de l'automobile représente 15-20% du budget des ménages à faible revenu",
    "Les investissements routiers bénéficient aux lobbys de la construction, pas aux citoyens",
    "La gratuité ou le faible coût du transport en commun est prouvée comme levier de réduction des GES",
    "Les aînés, les personnes handicapées et les jeunes sans permis sont les premières victimes",
  ],

  proposition:
    "Gratuité du transport en commun local et régional partout au Québec. Électrification de 100% des flottes d'autobus scolaires et municipaux d'ici 2030. Création d'un réseau de trains de passagers interrégionaux. Réorientation des budgets d'expansion autoroutière vers le transport collectif.",

  argumentsOpposition: [
    "Le transport représente 40% des GES québécois — impossible d'atteindre nos cibles sans décarboniser massivement ce secteur",
    "La dépendance à l'automobile est imposée, pas choisie : les citoyens des régions n'ont pas d'alternative crédible",
    "La gratuité du transport collectif est moins coûteuse socialement que les coûts de la congestion, de la pollution et des accidents routiers",
    "Chaque dollar investi en transport collectif génère 3 à 5$ de retombées économiques (études UITP, APTA)",
    "Les investissements autoroutiers profitent principalement aux lobbys de la construction — pas au bien commun",
  ],

  contrArguments: [
    {
      argument: "La gratuité des transports coûte trop cher",
      reponse:
        "Les recettes tarifaires ne représentent qu'environ 30-40% du coût de fonctionnement des réseaux — le reste est déjà subventionné. La gratuité augmenterait l'achalandage, réduirait les coûts de perception, et serait largement compensée par les économies en santé, congestion et GES. Tallinn, Luxembourg et plusieurs villes françaises l'ont adopté avec succès.",
    },
    {
      argument: "Les régions sont trop peu denses pour justifier le transport collectif",
      reponse:
        "La faible densité est en partie la conséquence de l'étalement urbain lui-même causé par la priorité donnée à l'automobile. Des modèles adaptés existent : transport à la demande, navettes intercités, trains régionaux. L'argument de la densité est un cercle vicieux que seul un investissement public peut briser.",
    },
    {
      argument: "Les gens préfèrent leur voiture et ne prendront pas les transports collectifs",
      reponse:
        "Les gens choisissent leur voiture parce qu'ils n'ont pas d'alternative fiable, rapide et confortable. Là où des alternatives de qualité existent, l'achalandage est au rendez-vous. Le problème n'est pas la préférence culturelle pour l'auto — c'est l'absence d'alternative crédible.",
    },
  ],

  acteursAdverses: [
    {
      nom: "Association des constructeurs de routes et grands travaux du Québec (ACRGTQ)",
      role: "Lobby de l'industrie de la construction routière",
      organisation: "ACRGTQ",
      liensFinanciers: "Représente les entreprises qui bénéficient des contrats d'expansion autoroutière — intérêt direct à maintenir les budgets routiers",
      sources: [
        "lobbyisme.gouv.qc.ca — ACRGTQ mandats actifs",
        "electionsquebec.qc.ca — financement politique de l'ACRGTQ et membres",
      ],
    },
    {
      nom: "Canadian Automobile Association (CAA-Québec)",
      role: "Lobby pro-automobile sous couverture associative",
      organisation: "CAA-Québec",
      liensFinanciers: "Organisation dont le modèle économique repose sur la dépendance à l'automobile (assurances, dépannage)",
      sources: ["lobbyisme.gouv.qc.ca — CAA-Québec"],
    },
    {
      nom: "Pétrolières (Imperial Oil, Suncor, Shell Canada)",
      role: "Opposants structurels à toute réduction de la dépendance au pétrole",
      organisation: "Diverses — représentées par l'IOGC et les Producteurs de pétrole et gaz du Canada",
      sources: [
        "lobbyisme.gouv.qc.ca — mandats des pétrolières au Québec",
        "Rapports annuels Imperial Oil, Suncor — risques réglementaires déclarés",
      ],
    },
  ],

  strategieEnquete: {
    registresAConsulter: [
      "lobbyisme.gouv.qc.ca — ACRGTQ, CAA-Québec, pétrolières, constructeurs automobiles",
      "electionsquebec.qc.ca — financement des partis par l'industrie de la construction",
      "MTQ (Ministère des Transports) — budgets comparatifs routes vs transport collectif 2010-2026",
      "SEAO — contrats d'infrastructure routière vs transport collectif 2015-2026",
    ],
    questionsAClarifier: [
      "Quel % du budget du MTQ va aux routes vs transport collectif chaque année depuis 2010?",
      "Combien de réunions les lobbyistes de l'ACRGTQ ont-ils tenues avec le MTQ depuis 2022?",
      "Y a-t-il des anciens employés du MTQ travaillant maintenant pour des firmes de construction routière?",
    ],
    documentsPublicsClefs: [
      "Plan québécois des infrastructures (PQI) — ventilation transport collectif vs routier",
      "Politique de mobilité durable du Québec — objectifs vs réalisations",
      "Rapports du Vérificateur général sur les dépassements de coûts des projets routiers",
    ],
  },
};

// ============================================================================
// DOSSIER 6 : LITHIUM ET MINES
// ============================================================================

export const DOSSIER_LITHIUM: DossierComplet = {
  slug: "lithium-mines",
  titre: "Développement du lithium",
  region: "James Bay · Abitibi · Côte-Nord · régions minières",
  statut: "En cours",

  contexteComplet:
    "Le Québec dispose de réserves importantes en lithium, cobalt, nickel et autres minéraux critiques pour la fabrication de batteries. Depuis 2020, une ruée vers ces minéraux s'est déclenchée, avec une explosion du nombre de claims miniers (droits d'exploration) surtout dans le Nord-du-Québec, l'Abitibi-Témiscamingue et la Côte-Nord. La Loi sur les mines du Québec demeure parmi les plus favorables aux compagnies minières en Amérique du Nord : droits d'exploration accordés automatiquement, royautés parmi les plus basses du monde, peu d'obligations de transformation locale. Les Premières Nations du Nord (Cris, Innus, Naskapis, Anishinabeg) sont les premières affectées.",

  enjeuxSpecifiques: [
    "Ruée vers les claims miniers sans planification territoriale ni consentement des Premières Nations",
    "Royautés minières québécoises parmi les plus basses de toutes les juridictions comparables",
    "Lithium exporté brut — valeur ajoutée (raffinage, cathodes, batteries) réalisée ailleurs",
    "Destruction de milieux naturels nordiques irremplaçables sans évaluation environnementale stratégique",
    "Droits ancestraux des Cris (Eeyou Istchee) et autres nations non respectés malgré la Paix des Braves",
    "Sociétés minières juniors non capitalisées : risque de sites abandonnés sans décontamination",
    "Aucune obligation légale de transformation au Québec — le minerai peut être exporté brut",
  ],

  proposition:
    "Réviser la Loi sur les mines pour : (1) augmenter significativement les royautés sur les minéraux critiques ; (2) exiger une transformation minimale au Québec avant exportation ; (3) établir un droit de veto des communautés autochtones sur les projets en territoire ancestral ; (4) instaurer une évaluation environnementale stratégique avant tout nouveau claim dans les territoires nordiques sensibles.",

  argumentsOpposition: [
    "Les ressources minières du Québec appartiennent à tous les Québécois — les royautés actuelles ne reflètent pas cette réalité",
    "Exporter du lithium brut quand on veut développer une filière de batteries au Québec est une contradiction fondamentale",
    "La Loi sur les mines de 1965 (amendée) a été conçue pour attirer les investisseurs, pas pour maximiser les retombées pour les citoyens",
    "Les Premières Nations du Nord n'ont pas cédé leurs droits sur les sous-sols — le CPCMLQ (Convention de la Baie-James) ne couvre pas les minéraux critiques de manière satisfaisante",
    "Les compagnies minières juniors n'ont pas les reins assez solides pour assumer les coûts de décontamination — l'État paiera",
  ],

  contrArguments: [
    {
      argument: "Si on augmente les royautés, les compagnies minières iront ailleurs",
      reponse:
        "Le lithium québécois est dans le sol québécois — il ne se déplace pas. Les compagnies qui veulent ce lithium spécifique (géologie, pureté, proximité des marchés nord-américains) paieront des royautés justes. La concurrence internationale sur les royautés est un argument que les minières utilisent partout — et qui est réfuté par les exemples de l'Australie, du Chili et de la Norvège.",
    },
    {
      argument: "Le développement minier crée des emplois dans les régions éloignées",
      reponse:
        "Les emplois miniers sont réels mais limités et cycliques. L'argument serait plus convaincant si la loi exigeait la transformation locale du minerai — ce qui créerait beaucoup plus d'emplois stables et qualifiés. Les emplois de l'extraction seule sont insuffisants pour justifier le niveau de concession accordé aux minières.",
    },
    {
      argument: "Le lithium est essentiel pour la transition énergétique",
      reponse:
        "Exactement — ce qui lui confère une valeur stratégique élevée, et donc justifie que le Québec en tire le maximum de bénéfices. Une ressource stratégique devrait être sous contrôle stratégique — pas bradée à des juniors non capitalisées cotées à Toronto ou Vancouver.",
    },
  ],

  acteursAdverses: [
    {
      nom: "Association minière du Québec (AMQ)",
      role: "Principal lobby de l'industrie minière québécoise",
      organisation: "AMQ",
      liensFinanciers: "Représente les grandes minières et les juniors. Finance des études pro-industrie. S'oppose systématiquement à toute augmentation des royautés.",
      sources: [
        "lobbyisme.gouv.qc.ca — AMQ mandats actifs",
        "electionsquebec.qc.ca — financement politique AMQ et membres",
      ],
    },
    {
      nom: "Patriot Battery Metals / Winsome Resources / juniors lithium",
      role: "Compagnies minières juniors — détentrices de claims lithium au Québec",
      organisation: "Diverses (cotées TSX Venture, ASX)",
      liensFinanciers: "Souvent non rentables, financées par capital-risque, actionnaires majoritairement étrangers. Modèle : acquérir claims → prouver ressource → vendre à major. Le Québec assume le risque environnemental.",
      sources: [
        "TSX Venture / ASX — fiches des compagnies",
        "MERN Québec — registre des claims miniers",
        "SEDAR — prospectus et rapports techniques des compagnies",
      ],
    },
    {
      nom: "MERN — Ministère de l'Énergie et des Ressources naturelles",
      role: "Autorité de délivrance des claims et permis miniers",
      organisation: "Gouvernement du Québec (CAQ)",
      liensPartisans: "CAQ a une posture pro-développement minier ; le MERN délivre les claims quasi automatiquement",
      sources: [
        "MERN — registre public des titres miniers (gestim.mern.gouv.qc.ca)",
        "Assemblée nationale — débats sur la réforme de la Loi sur les mines",
      ],
    },
  ],

  strategieEnquete: {
    registresAConsulter: [
      "gestim.mern.gouv.qc.ca — registre public des titres miniers : densité de claims par région",
      "lobbyisme.gouv.qc.ca — AMQ, compagnies minières actives au Québec",
      "TSX Venture / SEDAR — actionnaires et financement des juniors lithium québécoises",
      "electionsquebec.qc.ca — dons politiques des dirigeants de l'industrie minière",
      "MELCCFP — évaluations environnementales des projets miniers nordiques en cours",
    ],
    questionsAClarifier: [
      "Quel est le taux effectif de royautés minières payé au Québec comparé à l'Australie, au Chili et à la Norvège?",
      "Combien de claims lithium ont été accordés depuis 2020 et dans quels territoires?",
      "Quelles nations autochtones sont affectées et ont-elles été consultées (obligation Haïda/Taku)?",
      "Combien de sites miniers abandonnés sans décontamination le Québec a-t-il actuellement?",
      "Y a-t-il des anciens fonctionnaires du MERN travaillant maintenant pour des minières actives au Québec?",
    ],
    documentsPublicsClefs: [
      "Loi sur les mines du Québec — version consolidée actuelle",
      "Registre des titres miniers (GESTIM) — données publiques par région",
      "Convention de la Baie-James et du Nord québécois — articles sur les ressources minières",
      "Rapport du Commissaire au développement durable sur la gestion des ressources minières",
      "Études comparatives des régimes de royautés minières (IRIS, IREC, Université Laval)",
    ],
  },
};

// ============================================================================
// EXPORT GLOBAL
// ============================================================================

export const DOSSIERS_COMPLETS: DossierComplet[] = [
  DOSSIER_TES_CANADA,
  DOSSIER_STABLEX,
  DOSSIER_MEGA_EOLIENNES,
  DOSSIER_RIO_TINTO,
  DOSSIER_TRANSPORT,
  DOSSIER_LITHIUM,
];

export const getDossierComplet = (slug: string): DossierComplet | undefined =>
  DOSSIERS_COMPLETS.find((d) => d.slug === slug);
