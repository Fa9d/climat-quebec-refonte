"use client";

import Reveal from "@/components/reveal";
import { Kicker } from "@/components/ui";
import { TemoignagesTable } from "@/components/temoignages-table";
import Link from "next/link";

export default function TemoignagesPage() {
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
        <TemoignagesTable avecFiltre={true} />
      </div>
    </main>
  );
}
