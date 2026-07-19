// Types générés à partir du schéma Supabase.
// Pour régénérer : npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      temoignages: {
        Row: {
          id:                  string;
          created_at:          string;
          nom_ou_pseudonyme:   string;
          dossier_slug:        string;
          date_observation:    string;
          lieu_precis:         string;
          description:         string;
          impact_concret:      string | null;
          consentement:        "public-nomme" | "public-anonyme" | "interne-seulement";
          valide:              boolean;
          notes_editoriales:   string | null;
        };
        Insert: {
          nom_ou_pseudonyme:   string;
          dossier_slug:        string;
          date_observation:    string;
          lieu_precis:         string;
          description:         string;
          impact_concret?:     string | null;
          consentement:        "public-nomme" | "public-anonyme" | "interne-seulement";
        };
        Update: {
          valide?:             boolean;
          notes_editoriales?:  string | null;
        };
      };
    };
    Views: {
      temoignages_publics: {
        Row: {
          id:               string;
          created_at:       string;
          dossier_slug:     string;
          date_observation: string;
          lieu_precis:      string;
          description:      string;
          impact_concret:   string | null;
          auteur_affiche:   string | null;
        };
      };
    };
    Functions: {};
    Enums: {};
  };
}
