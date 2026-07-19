"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Reveal from "@/components/reveal";
import { Kicker } from "@/components/ui";
import Link from "next/link";

type Temoignage = {
  id: string;
  auteur_affiche: string | null;  // nom public ou "Anonyme" selon consentement
  lieu_precis: string | null;
  description: string;
  dossier_slug: string | null;
  date_observation: string;
  created_at: string;
};

export default function TemoignagesPage() {
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemoignages = async () => {
      const { data, error } = await supabase
        .from("temoignages_publics")
        .select("id, auteur_affiche, lieu_precis, description, impact_concret, dossier_slug, date_observation, created_at")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) console.error("[temoignages]", error);
      if (!error && data) setTemoignages(data);
      setLoading(false);
    };

    fetchTemoignages();

    const channel = supabase
      .channel("temoignages-publics-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "temoignages",
          filter: "valide=eq.true",
        },
        (payload) => {
          const nouveau = payload.new as Temoignage;
          if (!nouveau.description) return;
          setTemoignages((prev) => {
            const exists = prev.find((t) => t.id === nouveau.id);
            if (exists) return prev;
            return [nouveau, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <Kicker>Voix citoyennes</Kicker>
        <h1 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
          Ce que les citoyens vivent.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Des témoignages réels, vérifiés par nos coordinateurs, qui alimentent
          nos dossiers et renforcent notre position face aux décideurs.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 text-sm font-semibold text-foreground ring-1 ring-border">
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent"
              aria-hidden="true"
            />
            Mise à jour en temps réel
          </span>
          <Link
            href="/temoigner"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            Témoigner à mon tour →
          </Link>
        </div>
      </Reveal>

      <div className="mt-14">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-32 animate-pulse rounded-xl bg-surface-2"
              />
            ))}
          </div>
        ) : temoignages.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center text-muted">
            <svg
              className="mb-4 h-12 w-12 text-muted/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <p className="text-lg font-semibold text-foreground">
              Aucun témoignage validé pour l&apos;instant.
            </p>
            <p className="mt-2 max-w-sm text-sm">
              Sois le premier à partager ton expérience.
            </p>
            <Link
              href="/temoigner"
              className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-fg"
            >
              Témoigner maintenant
            </Link>
          </div>
        ) : (
          <ul className="space-y-5">
            {temoignages.map((t, i) => (
              <Reveal
                as="li"
                key={t.id}
                delay={Math.min(i * 50, 300)}
                className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8"
              >
                <blockquote>
                  <p className="text-base leading-relaxed text-foreground sm:text-lg">
                    &ldquo;{t.description}&rdquo;
                  </p>
                </blockquote>
                <footer className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent"
                      aria-hidden="true"
                    >
                      {(t.auteur_affiche ?? "A")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t.auteur_affiche ?? "Anonyme"}
                        {t.lieu_precis ? (
                          <span className="font-normal text-muted">
                            {" "}&mdash; {t.lieu_precis}
                          </span>
                        ) : null}
                      </p>
                      {t.dossier_slug && (
                        <Link
                          href={`/dossiers/${t.dossier_slug}`}
                          className="text-xs text-accent hover:underline"
                        >
                          Dossier : {t.dossier_slug}
                        </Link>
                      )}
                    </div>
                  </div>
                  <time
                    dateTime={t.date_observation}
                    className="text-xs text-muted"
                  >
                    {formatDate(t.date_observation)}
                  </time>
                </footer>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
