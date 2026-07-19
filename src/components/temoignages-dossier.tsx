"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Reveal from "@/components/reveal";
import Link from "next/link";

type Temoignage = {
  id: string;
  prenom: string | null;
  ville: string | null;
  message: string;
  created_at: string;
};

export function TemoignagesDossier({ slug }: { slug: string }) {
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("temoignages_publics")
        .select("id, prenom, ville, message, created_at")
        .eq("dossier_slug", slug)
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) setTemoignages(data);
      setLoading(false);
    };
    fetchData();

    const channel = supabase
      .channel(`temoignages-dossier-${slug}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "temoignages",
          filter: `dossier_slug=eq.${slug}`,
        },
        (payload) => {
          const t = payload.new as Temoignage & { valide: boolean };
          if (!t.valide || !t.message) return;
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
  }, [slug]);

  if (loading)
    return (
      <div className="mt-8 space-y-3">
        {[1, 2].map((n) => (
          <div key={n} className="h-24 animate-pulse rounded-xl bg-surface-2" />
        ))}
      </div>
    );

  if (temoignages.length === 0)
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted">
        <p className="text-sm">
          Aucun témoignage pour ce dossier.{" "}
          <Link href="/temoigner" className="text-accent hover:underline">
            Soyez le premier à témoigner.
          </Link>
        </p>
      </div>
    );

  return (
    <div className="mt-8">
      <h2 className="font-display text-2xl text-foreground">
        Ce que les citoyens vivent
      </h2>
      <p className="mt-2 text-sm text-muted">
        {temoignages.length} témoignage{temoignages.length > 1 ? "s" : ""} lié
        {temoignages.length > 1 ? "s" : ""} à ce dossier.
      </p>
      <ul className="mt-6 space-y-4">
        {temoignages.map((t, i) => (
          <Reveal
            as="li"
            key={t.id}
            delay={i * 60}
            className="rounded-xl border border-border bg-surface p-5 shadow-sm"
          >
            <blockquote>
              <p className="text-sm leading-relaxed text-foreground">
                &ldquo;{t.message}&rdquo;
              </p>
            </blockquote>
            <footer className="mt-3 flex items-center gap-2 text-xs text-muted">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent"
                aria-hidden="true"
              >
                {(t.prenom ?? "A")[0].toUpperCase()}
              </div>
              <span>
                {t.prenom ?? "Anonyme"}
                {t.ville ? ` — ${t.ville}` : ""}
              </span>
              <span className="ml-auto">
                {new Date(t.created_at).toLocaleDateString("fr-CA", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </footer>
          </Reveal>
        ))}
      </ul>
      <Link
        href="/temoignages"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all"
      >
        Tous les témoignages →
      </Link>
    </div>
  );
}
