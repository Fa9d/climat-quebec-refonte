"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

// ─── Type canonique (colonnes de la vue temoignages_publics) ───────────────────
export type TemoignagePublic = {
  id: string;
  auteur_affiche: string | null;
  lieu_precis: string | null;
  description: string;
  impact_concret: string | null;
  dossier_slug: string | null;
  date_observation: string;
  created_at: string;
};

export type FiltreTemoignages = {
  /** Limiter à un dossier précis (ex: "stablex"). null = tous. */
  dossierSlug?: string | null;
  /** Nombre maximum de résultats retournés. Défaut : 100. */
  limit?: number;
};

/**
 * Hook universel pour charger les témoignages publics validés.
 * Écoute les mises à jour en temps réel via Supabase Realtime.
 *
 * @example
 * // Tous les témoignages
 * const { temoignages, loading } = useTemoignages();
 *
 * // Filtrés par dossier
 * const { temoignages, loading } = useTemoignages({ dossierSlug: "stablex" });
 */
export function useTemoignages({
  dossierSlug = null,
  limit = 100,
}: FiltreTemoignages = {}) {
  const [temoignages, setTemoignages] = useState<TemoignagePublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErreur(null);

    const fetch = async () => {
      let query = supabase
        .from("temoignages_publics")
        .select(
          "id, auteur_affiche, lieu_precis, description, impact_concret, dossier_slug, date_observation, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(limit);

      if (dossierSlug) query = query.eq("dossier_slug", dossierSlug);

      const { data, error } = await query;
      if (error) {
        console.error("[useTemoignages]", error);
        setErreur(error.message);
      } else {
        setTemoignages(data ?? []);
      }
      setLoading(false);
    };

    fetch();

    // Realtime : écoute les validations coordinator
    const channelName = dossierSlug
      ? `temoignages-${dossierSlug}`
      : "temoignages-tous";

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "temoignages",
          filter: dossierSlug
            ? `dossier_slug=eq.${dossierSlug}`
            : undefined,
        },
        (payload) => {
          const t = payload.new as TemoignagePublic & { valide: boolean };
          if (!t.valide || !t.description) return;
          setTemoignages((prev) => {
            if (prev.find((x) => x.id === t.id)) return prev;
            return [t, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dossierSlug, limit]);

  return { temoignages, loading, erreur };
}
