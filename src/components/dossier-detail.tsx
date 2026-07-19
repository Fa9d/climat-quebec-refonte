"use client";

import { useState } from "react";
import type { DossierComplet, ContrArgument, ActeurAdverse } from "@/data/dossiers-enrichis";
import { StatutBadge } from "@/components/ui";

// ─────────────────────────────────────────────
// Utilitaires internes
// ─────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-display text-3xl text-foreground">{children}</h2>
  );
}

function Tag({ children, color = "accent" }: { children: React.ReactNode; color?: "accent" | "eau" | "danger" }) {
  const styles = {
    accent: "bg-accent/10 text-accent dark:text-accent border border-accent/20",
    eau: "bg-eau/10 text-eau dark:text-[#8fd0e6] border border-eau/20",
    danger: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  };
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${styles[color]}`}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────
// Bloc : Contexte + Enjeux
// ─────────────────────────────────────────────

function BlocProbleme({ dossier }: { dossier: DossierComplet }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-8">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-eau dark:text-[#8fd0e6]">
        Le problème complet
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted">
        {dossier.contexteComplet}
      </p>
      <ul className="mt-6 space-y-2">
        {dossier.enjeuxSpecifiques.map((e, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// Bloc : Notre proposition
// ─────────────────────────────────────────────

function BlocProposition({ dossier }: { dossier: DossierComplet }) {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent/5 p-8">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">
        Notre proposition
      </h3>
      <p className="mt-3 text-base leading-relaxed text-foreground">
        {dossier.proposition}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Bloc : Nos arguments
// ─────────────────────────────────────────────

function BlocArguments({ dossier }: { dossier: DossierComplet }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-8">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
        Nos arguments
      </h3>
      <ul className="mt-5 space-y-3">
        {dossier.argumentsOpposition.map((arg, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {arg}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// Bloc : Contre-arguments (accordéon interactif)
// ─────────────────────────────────────────────

function ContrArgumentCard({ ca, index }: { ca: ContrArgument; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-2"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <Tag color="danger">Attaque {index + 1}</Tag>
          <span className="text-sm font-semibold text-foreground leading-relaxed">
            &laquo;&nbsp;{ca.argument}&nbsp;&raquo;
          </span>
        </div>
        <span
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="border-t border-border bg-primary/5 px-6 pb-6 pt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Notre réponse
          </p>
          <p className="text-sm leading-relaxed text-foreground">{ca.reponse}</p>
        </div>
      )}
    </div>
  );
}

function BlocContrArguments({ dossier }: { dossier: DossierComplet }) {
  return (
    <div>
      <p className="mb-5 text-sm text-muted">
        Cliquez sur une attaque pour voir l&apos;argumentaire préparé.
      </p>
      <div className="space-y-3">
        {dossier.contrArguments.map((ca, i) => (
          <ContrArgumentCard key={i} ca={ca} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Bloc : Cartographie des acteurs adverses
// ─────────────────────────────────────────────

function ActeurCard({ acteur }: { acteur: ActeurAdverse }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left hover:bg-surface-2 transition-colors"
        aria-expanded={open}
      >
        <div>
          <span className="text-sm font-bold text-foreground">{acteur.nom}</span>
          <span className="ml-3 text-xs text-muted">{acteur.role}</span>
        </div>
        <span
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="border-t border-border space-y-4 bg-surface-2 px-6 py-5 text-sm">
          <p>
            <span className="font-bold text-muted uppercase tracking-widest text-xs">Organisation&nbsp;</span>
            <span className="text-foreground">{acteur.organisation}</span>
          </p>
          {acteur.liensFinanciers && (
            <p>
              <span className="font-bold text-muted uppercase tracking-widest text-xs">Liens financiers&nbsp;</span>
              <span className="text-foreground">{acteur.liensFinanciers}</span>
            </p>
          )}
          {acteur.liensPartisans && (
            <p>
              <span className="font-bold text-muted uppercase tracking-widest text-xs">Liens partisans&nbsp;</span>
              <span className="text-foreground">{acteur.liensPartisans}</span>
            </p>
          )}
          {acteur.porteTournante && (
            <p>
              <span className="font-bold text-eau uppercase tracking-widest text-xs">Porte tournante&nbsp;</span>
              <span className="text-foreground">{acteur.porteTournante}</span>
            </p>
          )}
          {acteur.sources.length > 0 && (
            <div>
              <p className="font-bold text-muted uppercase tracking-widest text-xs mb-2">Sources à consulter</p>
              <ul className="space-y-1">
                {acteur.sources.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BlocActeurs({ dossier }: { dossier: DossierComplet }) {
  return (
    <div className="space-y-3">
      {dossier.acteursAdverses.map((a, i) => (
        <ActeurCard key={i} acteur={a} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Bloc : Stratégie d'enquête
// ─────────────────────────────────────────────

function BlocEnquete({ dossier }: { dossier: DossierComplet }) {
  const { strategieEnquete: e } = dossier;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border border-border bg-surface p-6">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">Registres à consulter</h4>
        <ul className="space-y-2">
          {e.registresAConsulter.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground leading-relaxed">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-surface p-6">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-eau dark:text-[#8fd0e6]">Questions à clarifier</h4>
        <ul className="space-y-2">
          {e.questionsAClarifier.map((q, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground leading-relaxed">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-eau" aria-hidden="true" />
              {q}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-surface p-6">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Documents publics clefs</h4>
        <ul className="space-y-2">
          {e.documentsPublicsClefs.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground leading-relaxed">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Navigation par onglets
// ─────────────────────────────────────────────

type Onglet = "probleme" | "proposition" | "arguments" | "attaques" | "acteurs" | "enquete";

const ONGLETS: { id: Onglet; label: string; emoji: string }[] = [
  { id: "probleme",    label: "Le problème",       emoji: "⚠️" },
  { id: "proposition", label: "Notre proposition",  emoji: "✅" },
  { id: "arguments",  label: "Nos arguments",       emoji: "💬" },
  { id: "attaques",   label: "Attaques & réponses", emoji: "🛡️" },
  { id: "acteurs",    label: "Qui sont-ils?",       emoji: "🔍" },
  { id: "enquete",    label: "Enquête",             emoji: "📋" },
];

// ─────────────────────────────────────────────
// Composant principal exporté
// ─────────────────────────────────────────────

export function DossierDetail({ dossier }: { dossier: DossierComplet }) {
  const [onglet, setOnglet] = useState<Onglet>("probleme");

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      {/* En-tête du dossier */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <StatutBadge statut={dossier.statut} />
            <span className="text-sm font-semibold text-muted">{dossier.region}</span>
          </div>
          <h1 className="font-display text-5xl text-foreground sm:text-6xl">
            {dossier.titre}
          </h1>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4">
        {ONGLETS.map((o) => (
          <button
            key={o.id}
            onClick={() => setOnglet(o.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              onglet === o.id
                ? "bg-accent text-accent-fg"
                : "bg-surface-2 text-muted hover:bg-accent/10 hover:text-accent"
            }`}
          >
            <span aria-hidden="true">{o.emoji}</span>
            {o.label}
          </button>
        ))}
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="min-h-64">
        {onglet === "probleme"    && <BlocProbleme    dossier={dossier} />}
        {onglet === "proposition" && <BlocProposition dossier={dossier} />}
        {onglet === "arguments"   && <BlocArguments   dossier={dossier} />}
        {onglet === "attaques"    && (
          <div>
            <SectionTitle>Attaques prévisibles & réponses préparées</SectionTitle>
            <BlocContrArguments dossier={dossier} />
          </div>
        )}
        {onglet === "acteurs"     && (
          <div>
            <SectionTitle>Qui sont-ils?</SectionTitle>
            <p className="mb-6 text-sm text-muted">
              Cartographie des acteurs adverses : liens financiers, partisans et portes tournantes.
            </p>
            <BlocActeurs dossier={dossier} />
          </div>
        )}
        {onglet === "enquete"     && (
          <div>
            <SectionTitle>Stratégie d&apos;enquête</SectionTitle>
            <p className="mb-6 text-sm text-muted">
              Registres publics, questions à clarifier et documents à obtenir pour démasquer jusqu&apos;à la racine.
            </p>
            <BlocEnquete dossier={dossier} />
          </div>
        )}
      </div>
    </div>
  );
}
