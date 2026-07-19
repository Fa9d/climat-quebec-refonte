// ============================================================================
// TYPES — Protocole de construction de dossier citoyen
// Reflète la structure du document docs/protocole-dossier-citoyen.md
// ============================================================================

export type NiveauContribution = 1 | 2 | 3 | 4;

export type ConsentementTemoin =
  | "public-nomme"
  | "public-anonyme"
  | "interne-seulement";

export interface FicheTemoin {
  id: string;
  dossierSlug: string;           // lie au DossierComplet
  dateObservation: string;       // ISO 8601
  lieuPrecis: string;
  description: string;           // description factuelle, sans causalité
  impactConcret: string;         // consequences dans la vie quotidienne
  documentsJoints: string[];     // URLs ou noms de fichiers
  consentement: ConsentementTemoin;
  nomOuPseudonyme: string;       // identifiable en interne
  valide: boolean;               // validé par un coordinateur
  notesEditoriales?: string;     // transformations éditoriales effectuées
}

export interface AttaquePrevue {
  formulation: string;           // mot pour mot si possible
  sourceProbable: string;        // qui lancera cet argument
  structureLogique:
    | "faux-dilemme"
    | "generalisation"
    | "appel-autorite"
    | "distraction"
    | "autre";
  cequiEstVrai: string;          // ne jamais nier ce qui est exact
  cequiEstFauxOuIncomplet: string;
  notreReponse: string;          // max 3 phrases
  sourceReponse: string;
}

export type RegistrePublic =
  | "lobbyisme.gouv.qc.ca"
  | "REQ"
  | "SEAO"
  | "electionsquebec.qc.ca"
  | "MELCCFP"
  | "BAPE"
  | "assnat.qc.ca"
  | "canlii.org"
  | "sedarplus.ca"
  | "sec.gov/edgar"
  | "gestim.mern.gouv.qc.ca"
  | "elections.ca"
  | "autre";

export type RegistreImpact =
  | "environnemental"
  | "social"
  | "economique"
  | "droits";

export interface ImpactDocumente {
  type: RegistreImpact;
  description: string;
  reversible: boolean;
  source: string;
}

export interface ActeurDossier {
  nom: string;
  role: string;
  organisation: string;
  categorie: "adverse" | "allie" | "neutre" | "deciseur";
  liensFinanciers?: string;
  liensPartisans?: string;
  porteTournante?: string;
  sources: string[];
}

export interface ActionHistorique {
  date: string;              // ISO 8601
  description: string;
  type:
    | "depot-memoire"
    | "conference-presse"
    | "rencontre-elu"
    | "petition"
    | "acces-information"
    | "assemblee"
    | "autre";
  reponseRecue?: string;
  prochainePose?: string;
}

// Structure principale d'un dossier citoyen selon le protocole
export interface DossierCitoyen {
  // Section 1 — Identification
  slug: string;
  nomLegal: string;
  promoteur: string;
  territoireVise: string;
  statutLegal: string;
  dateOuverture: string;     // ISO 8601
  coordinateurs: string[];

  // Section 2 — Le problème
  contexte: string;
  descriptionFactuelle: string;
  impacts: ImpactDocumente[];
  lacunesProcessus: string[];

  // Section 3 — Notre proposition
  demandeMinimale: string;
  conditionsReconsideration: string[];
  alternativeProposee: string;
  precedents: string[];

  // Section 4 — Argumentaire offensif
  argumentsLegaux: { argument: string; source: string }[];
  argumentsEnvironnementaux: { argument: string; source: string }[];
  argumentsEconomiques: { argument: string; source: string }[];
  argumentsDemocratiques: { argument: string; source: string }[];

  // Section 5 — Analyse des attaques
  attaquesPrevues: AttaquePrevue[];

  // Section 6 — Acteurs
  acteurs: ActeurDossier[];

  // Section 7 — Stratégie d'enquête
  registresAConsulter: RegistrePublic[];
  questionsAClarifier: string[];
  documentsAObtenir: string[];

  // Section 8 — Témoignages
  temoignages: FicheTemoin[];

  // Section 9 — Historique
  historique: ActionHistorique[];

  // Meta
  statut: "Actif" | "En cours" | "Victoire partielle" | "Fermé";
  niveauCompletion: number;  // 0-100, calculé automatiquement
}

// Calcul du niveau de complétion d'un dossier
export function calculerCompletion(d: DossierCitoyen): number {
  const sections: boolean[] = [
    Boolean(d.nomLegal && d.promoteur && d.territoireVise),
    Boolean(d.contexte && d.impacts.length > 0),
    Boolean(d.demandeMinimale && d.alternativeProposee),
    Boolean(
      d.argumentsLegaux.length > 0 ||
      d.argumentsEnvironnementaux.length > 0
    ),
    Boolean(d.attaquesPrevues.length > 0),
    Boolean(d.acteurs.filter((a) => a.categorie === "adverse").length > 0),
    Boolean(d.registresAConsulter.length > 0 && d.questionsAClarifier.length > 0),
    Boolean(d.temoignages.filter((t) => t.valide).length > 0),
    Boolean(d.historique.length > 0),
  ];
  return Math.round(
    (sections.filter(Boolean).length / sections.length) * 100
  );
}
