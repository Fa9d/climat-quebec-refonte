import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, StatutBadge, CtaBanner } from "@/components/ui";
import { DOSSIERS } from "@/data/content";
import { DOSSIERS_COMPLETS } from "@/data/dossiers-enrichis";

export const metadata: Metadata = {
  title: "Dossiers locaux",
  description:
    "Les luttes locales de Climat Québec : Stablex, TES Canada, méga-éoliennes privées, Rio Tinto/Alcan, transport collectif et lithium. Argumentaire complet, acteurs adverses et stratégie d'enquête.",
  openGraph: {
    title: "Dossiers locaux · Climat Québec",
    description:
      "Des combats concrets pour l'eau, l'énergie et le territoire, partout au Québec.",
  },
};

export default function DossiersPage() {
  return (
    <>
      <PageHero
        kicker="Luttes locales"
        titre="Nos dossiers sur le terrain."
        intro="Chaque lutte locale porte un même combat national : protéger notre eau, notre énergie et notre territoire contre les intérêts privés."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {DOSSIERS.map((d) => {
            const enrichi = DOSSIERS_COMPLETS.find((e) => e.slug === d.slug);
            return (
              <article
                key={d.slug}
                data-testid={`dossier-${d.slug}`}
                className="flex flex-col rounded-xl border border-border bg-surface p-7 shadow-sm transition-shadow hover:shadow-md sm:p-9"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <StatutBadge statut={d.statut} />
                  <span className="text-sm font-semibold text-muted">{d.region}</span>
                </div>

                <h2 className="mt-5 font-display text-3xl text-foreground">{d.titre}</h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-eau dark:text-[#8fd0e6]">
                      Le problème
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">{d.probleme}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
                      Notre proposition
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-foreground">{d.proposition}</p>
                  </div>
                </div>

                {/* Badges informatifs si dossier enrichi disponible */}
                {enrichi && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {enrichi.contrArguments.length} attaques analysées
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-eau/10 px-3 py-1 text-xs font-semibold text-eau dark:text-[#8fd0e6]">
                      {enrichi.acteursAdverses.length} acteurs cartographiés
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {enrichi.argumentsOpposition.length} arguments
                    </span>
                  </div>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  {enrichi ? (
                    <Link
                      href={`/dossiers/${d.slug}`}
                      data-testid={`dossier-complet-${d.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
                    >
                      Dossier complet
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <Link
                      href="/agir"
                      data-testid={`impliquer-${d.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
                    >
                      S&apos;impliquer
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
