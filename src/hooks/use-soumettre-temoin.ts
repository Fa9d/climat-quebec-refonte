"use client";

import { useState } from "react";

export type ConsentementType =
  | "public-nomme"
  | "public-anonyme"
  | "interne-seulement";

export interface SoumissionTemoin {
  nomOuPseudonyme: string;
  dossierSlug:     string;
  dateObservation: string;
  lieuPrecis:      string;
  description:     string;
  impactConcret?:  string;
  consentement:    ConsentementType;
}

type Statut = "idle" | "loading" | "success" | "error";

export function useSoumettreTemoin() {
  const [statut, setStatut] = useState<Statut>("idle");
  const [erreurServeur, setErreurServeur] = useState<string | null>(null);

  const soumettre = async (data: SoumissionTemoin): Promise<boolean> => {
    setStatut("loading");
    setErreurServeur(null);

    try {
      const res = await fetch("/api/temoignages", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setErreurServeur(
          (json as { error?: string }).error ??
          "Une erreur est survenue. Veuillez réessayer."
        );
        setStatut("error");
        return false;
      }

      setStatut("success");
      return true;
    } catch {
      setErreurServeur("Impossible de joindre le serveur. Vérifiez votre connexion.");
      setStatut("error");
      return false;
    }
  };

  const reset = () => {
    setStatut("idle");
    setErreurServeur(null);
  };

  return { soumettre, statut, erreurServeur, reset };
}
