"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/reveal";
import { useTemoignages, TemoignagePublic } from "@/hooks/use-temoignages";
import { DOSSIERS } from "@/data/content";

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  /**
   * Si fourni, pré-sélectionne ce dossier et masque le sélecteur.
   * Utile quand TemoignagesTable est embarqué dans une page de dossier.
   */
  dossierSlugFixe?: string;
  /** Afficher ou non le sélecteur de dossier. Défaut : true. */
  avecFiltre?: boolean;
  /** Nombre maximum de résultats. Défaut : 100. */
  limit?: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TOUS = "" as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initiale(auteur: string | null) {
  return (auteur ?? "A")[0].toUpperCase();
}

// ─── Carte individuelle ───────────────────────────────────────────────────────
function CarteTemoignage({
  t,
  index,
  avecLienDossier = true,
}: {
  t: TemoignagePublic;
  index: number;
  avecLienDossier?: boolean;
}) {
  return (
    <Reveal
      as="li"
      delay={Math.min(index * 50, 300)}
      className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <blockquote>
        <p className="text-base leading-relaxed text-foreground sm:text-lg">
          &ldquo;{t.description}&rdquo;
        </p>
      </blockquote>

      {t.impact_concret && (
        <p className="mt-3 rounded-lg bg-surface-2 px-4 py-2.5 text-sm text-muted">
          <span className="font-semibold text-foreground">Impact concret : </span>
          {t.impact_concret}
        </p>
      )}

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent"
            aria-hidden="true"
          >
            {initiale(t.auteur_affiche)}
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
            {avecLienDossier && t.dossier_slug && (
              <Link
                href={`/dossiers/${t.dossier_slug}`}
                className="text-xs text-accent hover:underline"
              >
                Dossier&nbsp;: {t.dossier_slug}
              </Link>
            )}
          </div>
        </div>
        <time dateTime={t.date_observation} className="text-xs text-muted">
          {formatDate(t.date_observation)}
        </time>
      </footer>
    </Reveal>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export function TemoignagesTable({
  dossierSlugFixe,
  avecFiltre = true,
  limit = 100,
}: Props) {
  const [filtre, setFiltre] = useState<string>(dossierSlugFixe ?? TOUS);

  // Si le slug est fixé depuis les props, on l'utilise directement.
  const slugActif = dossierSlugFixe ?? (filtre === TOUS ? null : filtre);

  const { temoignages, loading } = useTemoignages({
    dossierSlug: slugActif,
    limit,
  });

  const masquerFiltre = !!dossierSlugFixe || !avecFiltre;

  return (
    <div>
      {/* ── Sélecteur de dossier ── */}
      {!masquerFiltre && (
        <div className="mb-8 flex flex-wrap gap-2">
          <BoutonFiltre
            actif={filtre === TOUS}
            onClick={() => setFiltre(TOUS)}
          >
            Tous les dossiers
          </BoutonFiltre>
          {DOSSIERS.map((d) => (
            <BoutonFiltre
              key={d.slug}
              actif={filtre === d.slug}
              onClick={() => setFiltre(d.slug)}
            >
              {d.titre}
            </BoutonFiltre>
          ))}
        </div>
      )}

      {/* ── Compteur ── */}
      {!loading && temoignages.length > 0 && (
        <p className="mb-4 text-sm text-muted">
          {temoignages.length} témoignage
          {temoignages.length > 1 ? "s" : ""}
          {slugActif ? " pour ce dossier" : " au total"}
        </p>
      )}

      {/* ── Contenu ── */}
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
        <EtatVide />
      ) : (
        <ul className="space-y-5">
          {temoignages.map((t, i) => (
            <CarteTemoignage
              key={t.id}
              t={t}
              index={i}
              avecLienDossier={!dossierSlugFixe}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Sous-composants ──────────────────────────────────────────────────────────
function BoutonFiltre({
  actif,
  onClick,
  children,
}: {
  actif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
        actif
          ? "bg-accent text-accent-fg"
          : "bg-surface-2 text-muted hover:bg-surface-offset hover:text-foreground ring-1 ring-border",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function EtatVide() {
  return (
    <div className="flex flex-col items-center py-16 text-center text-muted">
      <svg
        className="mb-4 h-10 w-10 text-muted/40"
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
      <p className="text-base font-semibold text-foreground">
        Aucun témoignage validé pour l&apos;instant.
      </p>
      <Link
        href="/temoigner"
        className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-fg"
      >
        Témoigner maintenant
      </Link>
    </div>
  );
}
