// ============================================================================
// CONTENU DU SITE — DEUX VERSIONS
// ----------------------------------------------------------------------------
// Le site propose deux lignes éditoriales, sélectionnables via le sélecteur en
// haut de page (ContentVersionProvider) :
//   - "nouvelle"  : ligne recommandée par l'analyse stratégique 2026
//                   (slogan « Reprendre nos pouvoirs pour protéger notre monde »)
//   - "actuelle"  : reprise fidèle du contenu existant de climat.quebec
//
// Sources de l'analyse : dossier stratégique Climat Québec (recherche 2026),
// climat.quebec (texte fondateur, programme, dossiers), Élections Québec,
// Léger, Le Soleil, Assemblée nationale du Québec.
// ============================================================================

export type Version = "nouvelle" | "actuelle";

export interface Priority {
  slug: string;
  titre: string;
  accroche: string;
  texte: string;
  image?: string;
}

export interface Dossier {
  slug: string;
  titre: string;
  region: string;
  probleme: string;
  proposition: string;
  statut: "Actif" | "En cours" | "Victoire partielle";
}

export interface Candidat {
  nom: string;
  circonscription: string;
  role: string;
  enjeu: string;
}

export interface Actualite {
  date: string;
  titre: string;
  extrait: string;
  source: string;
}

export interface VersionContent {
  meta: {
    version: Version;
    label: string;
    description: string;
  };
  slogan: string;
  sousSlogan: string;
  heroIntro: string;
  heroCta1: string;
  heroCta2: string;
  visionTitre: string;
  visionTexte: string[];
  messagesPorteurs: { titre: string; texte: string }[];
  priorites: Priority[];
  discoursTitre: string;
  discours: string[];
}

// ---------------------------------------------------------------------------
// DONNÉES PARTAGÉES (identiques dans les deux versions — faits vérifiés)
// ---------------------------------------------------------------------------

export const PARTI = {
  nom: "Climat Québec",
  cheffe: "Martine Ouellet",
  fondation: "14 mai 2021 · Congrès de fondation le 23 avril 2022, Boucherville",
  autorisation: "Parti autorisé par le DGEQ depuis le 2 août 2021",
  prochaineElection: "Élections générales du 5 octobre 2026",
};

export const RESULTATS = [
  { scrutin: "Partielle Chicoutimi", date: "23 février 2026", candidat: "Olivier Dion", votes: "223", pct: "1,45 %" },
  { scrutin: "Partielle Arthabaska", date: "11 août 2025", candidat: "Trystan Martel", votes: "96", pct: "0,26 %" },
  { scrutin: "Partielle Terrebonne", date: "17 mars 2025", candidat: "Benoit Beauchamp", votes: "169", pct: "0,75 %" },
  { scrutin: "Générale", date: "3 octobre 2022", candidat: "54 candidatures", votes: "8 644", pct: "0,21 %" },
  { scrutin: "Partielle Marie-Victorin", date: "11 avril 2022", candidat: "Martine Ouellet", votes: "310", pct: "1,90 %" },
];

export const CANDIDATS: Candidat[] = [
  { nom: "Martine Ouellet", circonscription: "Champlain", role: "Cheffe", enjeu: "TES Canada, énergie publique, indépendance" },
  { nom: "Jean-Claude St-André", circonscription: "Gouin", role: "Candidat", enjeu: "Justice climatique, transport collectif" },
  { nom: "Jean Cloutier", circonscription: "Portneuf", role: "Cofondateur · porte-parole", enjeu: "Transport, éolien, écologie régionale" },
  { nom: "Olivier Dion", circonscription: "Chicoutimi", role: "Candidat", enjeu: "Rio Tinto/Alcan, Péribonka" },
  { nom: "Benoit Beauchamp", circonscription: "Terrebonne", role: "Candidat", enjeu: "Eau potable, Stablex" },
  { nom: "Trystan Martel", circonscription: "Arthabaska", role: "Candidat", enjeu: "Éolien privé, aménagement" },
  { nom: "Marie-Claude Archambault", circonscription: "Blainville", role: "Candidate", enjeu: "Stablex, déchets dangereux" },
];

export const DOSSIERS: Dossier[] = [
  {
    slug: "stablex",
    titre: "Stoppons Stablex",
    region: "Blainville · Laurentides",
    probleme:
      "Un projet d'agrandissement d'un site d'enfouissement de matières dangereuses menace la Grande Tourbière de Blainville et l'eau potable des citoyens. Une campagne d'échantillonnage indépendante a confirmé une contamination en 2026.",
    proposition:
      "Protéger les citoyens et non l'industrie : moratoire sur l'agrandissement, transparence complète des données environnementales et priorité au principe de précaution.",
    statut: "Actif",
  },
  {
    slug: "tes-canada",
    titre: "TES Canada, c'est NON",
    region: "Mauricie",
    probleme:
      "Un mégaprojet énergétique privé consommerait une part importante des ressources en eau et en électricité de la région, sans contrepartie claire pour la population.",
    proposition:
      "Refuser les projets qui dépouillent le Québec de ses ressources collectives au bénéfice d'intérêts privés.",
    statut: "Actif",
  },
  {
    slug: "mega-eoliennes-privees",
    titre: "Méga-éoliennes privées",
    region: "Arthabaska · Centre-du-Québec",
    probleme:
      "Le développement de l'éolien est confié à des promoteurs privés, imposant des projets sans véritable consentement des communautés et privatisant une ressource publique.",
    proposition:
      "Développer l'énergie renouvelable sous contrôle public, avec le consentement et le bénéfice réel des communautés d'accueil.",
    statut: "En cours",
  },
  {
    slug: "rio-tinto-alcan",
    titre: "Rio Tinto / Alcan — Péribonka",
    region: "Saguenay–Lac-Saint-Jean",
    probleme:
      "Des privilèges hérités permettent à une multinationale de contrôler des barrages et des ressources hydriques qui appartiennent au peuple québécois.",
    proposition:
      "« Les barrages sur la Péribonka nous appartiennent » : rapatrier le contrôle public de l'énergie et de l'eau.",
    statut: "Actif",
  },
  {
    slug: "transport-collectif",
    titre: "Transport collectif pour tous",
    region: "Toutes les régions",
    probleme:
      "Le sous-investissement chronique dans le transport en commun laisse des régions entières dépendantes de l'automobile et alourdit les émissions de GES.",
    proposition:
      "Gratuité du transport en commun local et régional, électrification des flottes et investissements massifs partout au Québec.",
    statut: "En cours",
  },
  {
    slug: "lithium-mines",
    titre: "Développement du lithium",
    region: "Régions minières",
    probleme:
      "La ruée vers le lithium se fait sans encadrement suffisant, au risque de reproduire un modèle extractiviste au détriment des milieux naturels.",
    proposition:
      "Mettre fin au développement anarchique du lithium et encadrer strictement l'exploitation des ressources stratégiques.",
    statut: "En cours",
  },
];

export const ACTUALITES: Actualite[] = [
  {
    date: "15 juillet 2026",
    titre: "Jean-Claude St-André sera candidat dans Gouin",
    extrait:
      "L'ancien député de L'Assomption et militant indépendantiste de longue date porte les couleurs de Climat Québec dans Gouin.",
    source: "climat.quebec",
  },
  {
    date: "6 juillet 2026",
    titre: "10 nouveaux candidats se joignent à l'équipe",
    extrait:
      "Climat Québec poursuit sa lancée avec de nouvelles candidatures régionales pour l'élection du 5 octobre.",
    source: "climat.quebec",
  },
  {
    date: "12 juin 2026",
    titre: "Stablex : une contamination confirmée",
    extrait:
      "Une nouvelle campagne d'échantillonnage indépendante confirme une contamination dans le secteur de la Grande Tourbière de Blainville.",
    source: "climat.quebec",
  },
  {
    date: "3 avril 2026",
    titre: "Martine Ouellet choisit Champlain et lance un mouvement dans 10 régions",
    extrait:
      "La cheffe annonce 15 candidatures et un déploiement dans dix régions du Québec.",
    source: "climat.quebec",
  },
];

// ---------------------------------------------------------------------------
// VERSION « NOUVELLE » — ligne recommandée par l'analyse 2026
// ---------------------------------------------------------------------------

const NOUVELLE: VersionContent = {
  meta: {
    version: "nouvelle",
    label: "Nouvelle ligne (2026)",
    description: "Positionnement recommandé par l'analyse stratégique",
  },
  slogan: "Reprendre nos pouvoirs pour protéger notre monde",
  sousSlogan: "Climat · Territoire · République",
  heroIntro:
    "Protéger notre eau, notre énergie, nos terres et notre santé exige un Québec qui dispose de tous ses pouvoirs. Climat Québec est le parti qui ose le dire.",
  heroCta1: "Devenir membre",
  heroCta2: "Nos priorités",
  visionTitre: "Notre vision",
  visionTexte: [
    "Partout sur notre territoire, des citoyens se lèvent pour protéger leur eau, leurs terres, leurs forêts et leur santé. Ils se lèvent contre des projets imposés sans véritable consentement, parce qu'ils voient bien que trop souvent, les décisions se prennent loin d'eux, pour des intérêts qui ne sont pas les leurs.",
    "Climat Québec existe pour leur donner une voix politique claire. Notre message est simple : il faut reprendre nos pouvoirs pour protéger notre monde.",
    "Nous sommes indépendantistes non par nostalgie, mais parce que l'urgence climatique exige un État capable de décider entièrement pour son territoire, de protéger ses ressources et de dire non aux lobbys. La République que nous proposons n'est pas un drapeau planté sur le même vieux système : c'est un nouveau pacte démocratique où chaque grande décision devra passer un test simple — est-ce bon pour le climat, le territoire, la santé, l'équité et le bien commun ?",
  ],
  messagesPorteurs: [
    {
      titre: "Protéger ce qui nous appartient",
      texte: "Eau, électricité, terres agricoles, forêts, milieux naturels et santé publique. Ce qui est à nous ne doit pas être livré au privé.",
    },
    {
      titre: "Décider ici, pour le climat et le bien commun",
      texte: "Une République avec des pouvoirs complets et un contrôle démocratique des ressources. Chaque décision passe le test du climat et de l'équité.",
    },
    {
      titre: "Changer la vie concrète",
      texte: "Transport collectif abordable, énergie publique, industries propres, emplois régionaux et sécurité environnementale pour toutes les régions.",
    },
  ],
  priorites: [
    {
      slug: "eau-sante",
      titre: "Eau et santé",
      accroche: "Défendre l'eau potable avant les profits",
      texte:
        "Protéger nos sources d'eau, refuser les déchets toxiques qui menacent les milieux de vie et faire passer la santé publique avant les intérêts industriels.",
      image: "/images/priority-water.webp",
    },
    {
      slug: "energie-publique",
      titre: "Énergie publique",
      accroche: "L'électricité au service du peuple",
      texte:
        "S'opposer à la privatisation de l'électricité, reprendre le contrôle public de nos barrages et développer le renouvelable au bénéfice des communautés.",
    },
    {
      slug: "transport",
      titre: "Transport collectif",
      accroche: "Un réseau digne d'un peuple moderne",
      texte:
        "Gratuité du transport en commun local et régional, électrification des flottes, soutien au télétravail et investissements dans toutes les régions.",
    },
    {
      slug: "agriculture-forets",
      titre: "Agriculture et forêts",
      accroche: "Nourrir le Québec, protéger le carbone",
      texte:
        "Une agriculture de proximité qui nourrit sans épuiser les sols et une gestion forestière qui protège le carbone, la biodiversité et les communautés.",
      image: "/images/priority-forest.webp",
    },
    {
      slug: "republique-democratie",
      titre: "République et démocratie",
      accroche: "Reprendre nos pouvoirs",
      texte:
        "Créer la République du Québec pour disposer de tous nos pouvoirs, dire non aux lobbys et remettre les grandes décisions entre les mains des citoyens.",
    },
  ],
  discoursTitre: "Discours de campagne 2026",
  discours: [
    "Québécoises, Québécois,",
    "Nous vivons un moment de vérité. Partout sur notre territoire, des citoyens se lèvent pour protéger leur eau, leurs terres, leurs forêts, leur santé et leur avenir. Ils se lèvent contre des projets imposés sans véritable consentement. Ils se lèvent parce qu'ils voient bien que trop souvent, les décisions se prennent loin d'eux, pour des intérêts qui ne sont pas les leurs.",
    "Climat Québec existe pour leur donner une voix politique claire.",
    "Notre message est simple : il faut reprendre nos pouvoirs pour protéger notre monde. Protéger notre monde, ce n'est pas un slogan abstrait. C'est empêcher que notre électricité soit livrée au privé pendant que les familles paient plus cher. C'est refuser que nos terres agricoles deviennent des zones de spéculation. C'est défendre l'eau potable avant les profits. C'est dire non aux déchets toxiques qui menacent les milieux de vie. C'est bâtir un réseau de transport collectif digne d'un peuple moderne. C'est obliger les grands pollueurs à changer, au lieu de demander toujours plus d'efforts aux citoyens ordinaires.",
    "On nous dit souvent que le Québec est trop petit pour agir. C'est faux. Le Québec a l'énergie, le territoire, le savoir-faire, les travailleurs, les régions, les chercheurs, les agriculteurs, les entrepreneurs et les citoyens pour devenir un exemple mondial. Ce qui nous manque, ce n'est pas le talent. Ce qui nous manque, ce sont tous nos pouvoirs.",
    "C'est pourquoi Climat Québec est indépendantiste. Pas par nostalgie. Pas pour répéter les débats du passé. Nous sommes indépendantistes parce que l'urgence climatique exige un État capable de décider entièrement pour son territoire. Un État capable de protéger ses ressources. Un État capable de dire non aux lobbys, non aux pétrolières, non aux arrangements conclus au-dessus de la tête du monde. Un État capable de dire oui à la vie, oui aux régions, oui à la justice, oui aux générations qui viennent.",
    "La République du Québec que nous proposons n'est pas un drapeau planté sur le même vieux système. C'est un nouveau pacte démocratique. Dans cette République, chaque grande décision devra passer un test simple : est-ce bon pour le climat, pour le territoire, pour la santé, pour l'équité et pour le bien commun ? Si la réponse est non, le projet ne doit pas aller de l'avant.",
    "Nous ne voulons pas seulement dénoncer. Nous voulons construire. Construire des transports collectifs accessibles et régionaux. Construire une économie qui transforme nos industries plutôt que de les abandonner. Construire une agriculture de proximité qui nourrit le Québec sans épuiser les sols. Construire une gestion forestière qui protège le carbone, la biodiversité et les communautés. Construire un État qui reprend le contrôle de l'énergie et qui met l'électricité publique au service du peuple, pas au service de quelques intérêts privés.",
    "Les autres partis promettent de gérer la crise. Nous disons que le temps est venu de changer les règles. On ne protège pas le climat avec des demi-mesures. On ne protège pas le Québec avec des mains attachées. On ne protège pas l'avenir en laissant les lobbys écrire la suite.",
    "À celles et ceux qui se sentent seuls dans leur municipalité, dans leur rang, dans leur quartier, dans leur région, nous disons : vous ne l'êtes pas. Votre combat pour l'eau, pour la terre, pour l'air, pour les enfants et pour la dignité est le même combat que le nôtre. Ensemble, nous pouvons faire de ces luttes locales un projet national.",
    "Le Québec n'a pas besoin d'un autre parti qui explique pourquoi il ne peut pas agir. Le Québec a besoin d'un parti qui sait pourquoi il doit agir, et qui est prêt à reprendre les pouvoirs nécessaires pour le faire.",
    "Climat Québec, c'est le choix du courage, du territoire et du bien commun. C'est le choix d'un Québec qui se tient debout. C'est le choix d'un nouveau pays pour protéger notre monde.",
  ],
};

// ---------------------------------------------------------------------------
// VERSION « ACTUELLE » — reprise fidèle du discours existant de climat.quebec
// ---------------------------------------------------------------------------

const ACTUELLE: VersionContent = {
  meta: {
    version: "actuelle",
    label: "Ligne actuelle",
    description: "Contenu existant de climat.quebec",
  },
  slogan: "La force de contrer les lobbys",
  sousSlogan: "Un nouveau pays pour agir véritablement",
  heroIntro:
    "L'urgence, c'est maintenant. Climat Québec est le parti politique indépendantiste entièrement dédié à l'urgence climatique et à la reprise du pouvoir citoyen face aux grands intérêts privés.",
  heroCta1: "Devenir membre",
  heroCta2: "Notre programme",
  visionTitre: "Texte fondateur",
  visionTexte: [
    "L'alarme a sonné. L'urgence climatique est la priorité absolue de notre époque, et le temps des tergiversations est largement dépassé. Aucun autre enjeu ne peut être traité sérieusement si nous n'agissons pas d'abord sur le climat.",
    "Le Canada agit comme un frein environnemental et se comporte, sur le plan climatique, comme un pays voyou. Les grands pollueurs et les lobbys dictent l'agenda politique pendant que le bien commun est sacrifié.",
    "C'est pourquoi la création de la République du Québec est nécessaire : elle est le moyen politique d'agir véritablement, de rapatrier tous nos pouvoirs et de faire de la justice climatique le fondement de toutes les décisions de l'État. Le pouvoir citoyen est plus fort que l'argent.",
  ],
  messagesPorteurs: [
    {
      titre: "Urgence climatique",
      texte: "Un parti entièrement dédié au climat, où chaque décision de l'État est prise à travers le prisme climatique.",
    },
    {
      titre: "République du Québec",
      texte: "L'indépendance et la proclamation de la République comme condition de l'action climatique véritable dès un premier mandat.",
    },
    {
      titre: "Contrer les lobbys",
      texte: "Reprendre l'État aux grandes corporations, aux promoteurs privés et aux pétrolières au bénéfice du bien commun.",
    },
  ],
  priorites: [
    {
      slug: "ges",
      titre: "Réduction des GES",
      accroche: "Contraindre les grands pollueurs",
      texte:
        "Contraintes fortes sur l'industrie, efficacité énergétique, remplacement du pétrole et du gaz par l'électricité verte, élimination des émissions dans le résidentiel.",
    },
    {
      slug: "transport",
      titre: "Transports",
      accroche: "Gratuité et électrification",
      texte:
        "Gratuité du transport en commun local et régional, investissements massifs, électrification des autobus scolaires et municipaux, trains de passagers.",
    },
    {
      slug: "agriculture-dechets",
      titre: "Agriculture et déchets",
      accroche: "Nature, nourricier et de proximité",
      texte:
        "Réduction des émissions agricoles, meilleure gestion des déchets et promotion d'un modèle agricole nourricier et de proximité.",
      image: "/images/priority-forest.webp",
    },
    {
      slug: "forets",
      titre: "Forêt",
      accroche: "Du modèle extractiviste au modèle climatiste",
      texte:
        "Séquestration du carbone, protection du territoire forestier et passage d'un modèle extractiviste à un modèle climatiste.",
    },
    {
      slug: "mieux-etat",
      titre: "Mieux d'État",
      accroche: "Le bien commun d'abord",
      texte:
        "Reconstruction de l'État autour du bien commun, contrôle public et capacité d'agir contre les intérêts privés.",
    },
    {
      slug: "international",
      titre: "Rôle international",
      accroche: "La République sur la scène mondiale",
      texte:
        "Faire de la République du Québec un acteur climatique reconnu et exemplaire sur la scène internationale.",
    },
  ],
  discoursTitre: "Extrait du texte fondateur",
  discours: [
    "L'alarme a sonné.",
    "L'urgence climatique est la priorité absolue de notre époque. Le temps des tergiversations est largement dépassé. Nous vivons une grande redéfinition de la politique québécoise, où l'écart se creuse entre les aspirations des citoyens et les agendas de partis trop liés à l'élite économique.",
    "Le Canada agit comme un frein environnemental. Sur le plan climatique, il se comporte comme un pays voyou. Les grands pollueurs et les lobbys dictent l'agenda pendant que le bien commun est sacrifié.",
    "Climat Québec est né pour changer cela. Nous sommes un parti politique indépendantiste entièrement dédié à l'urgence climatique. Nous croyons que la création de la République du Québec est le moyen nécessaire pour agir véritablement.",
    "Dans cette République, l'État reprend le contrôle de ses ressources et fait de la justice climatique le fondement de toutes ses décisions. Le pouvoir citoyen est plus fort que l'argent.",
    "Rejoignez-nous. Un nouveau pays pour agir véritablement.",
  ],
};

export const CONTENT: Record<Version, VersionContent> = {
  nouvelle: NOUVELLE,
  actuelle: ACTUELLE,
};

export const CONTEXTE_2026 = {
  premiereMinistre: "Christine Fréchette (CAQ), 33e première ministre, assermentée le 15 avril 2026",
  composition: "CAQ 79 · PLQ 18 · QS 11 · PQ 7 · Indépendants 10",
  sondage:
    "Léger (juin 2026) chez les décidés : PQ 30 % · PLQ 27 % · CAQ 21 % · PCQ 13 % · QS 8 %. Seulement 47 % jugent leur choix définitif.",
};
