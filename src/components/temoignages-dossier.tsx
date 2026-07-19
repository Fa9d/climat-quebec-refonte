"use client";

/**
 * Composant léger pour les pages de dossier.
 * Délègue tout le chargement/affichage à TemoignagesTable
 * avec un slug fixe et sans sélecteur de filtre.
 */
import Link from "next/link";
import { TemoignagesTable } from "@/components/temoignages-table";

export function TemoignagesDossier({ slug }: { slug: string }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-foreground">
        Ce que les citoyens vivent
      </h2>
      <p className="mt-2 text-sm text-muted">
        Témoignages liés à ce dossier, vérifiés par nos coordinateurs.
      </p>

      <div className="mt-6">
        <TemoignagesTable dossierSlugFixe={slug} avecFiltre={false} limit={20} />
      </div>

      <Link
        href="/temoignages"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all hover:gap-2"
      >
        Tous les témoignages →
      </Link>
    </section>
  );
}
