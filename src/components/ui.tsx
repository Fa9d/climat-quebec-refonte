import Link from "next/link";
import type { ReactNode } from "react";

/* Étiquette de section (kicker) */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
      <span className="h-px w-6 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

/* Badge de statut pour les dossiers */
export function StatutBadge({ statut }: { statut: string }) {
  const styles: Record<string, string> = {
    Actif: "bg-accent/15 text-accent-fg dark:text-accent",
    "En cours": "bg-eau/15 text-eau dark:text-[#8fd0e6]",
    "Victoire partielle": "bg-primary/15 text-primary dark:text-[#7fe0b3]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
        styles[statut] ?? "bg-surface-2 text-muted"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {statut}
    </span>
  );
}

/* Grand bandeau CTA réutilisable */
export function CtaBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
      <div className="relative overflow-hidden rounded-xl bg-primary px-7 py-14 text-primary-fg sm:px-14 sm:py-20">
        <div className="relative z-10 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl">
            Le pouvoir citoyen est plus fort que l&apos;argent.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-primary-fg/85">
            Ajoutez votre voix au mouvement. Devenez membre, faites un don ou
            rejoignez une lutte près de chez vous.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/agir"
              data-testid="cta-devenir-membre"
              className="rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              Devenir membre
            </Link>
            <Link
              href="/agir"
              data-testid="cta-donner"
              className="rounded-full border border-primary-fg/40 px-7 py-3.5 text-base font-bold text-primary-fg transition-colors hover:bg-primary-fg/10"
            >
              Faire un don
            </Link>
          </div>
        </div>
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-2xl"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

/* En-tête de page interne */
export function PageHero({
  kicker,
  titre,
  intro,
}: {
  kicker: string;
  titre: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-5 max-w-4xl font-display text-5xl text-foreground sm:text-6xl md:text-7xl">
          {titre}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
