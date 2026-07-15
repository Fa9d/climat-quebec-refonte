import type { Metadata } from "next";
import { PageHero, CtaBanner } from "@/components/ui";
import { ACTUALITES } from "@/data/content";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Les dernières nouvelles de Climat Québec : candidatures, dossiers et mobilisations en vue de l'élection générale du 5 octobre 2026.",
  openGraph: {
    title: "Actualités · Climat Québec",
    description: "Les dernières nouvelles du mouvement Climat Québec.",
  },
};

export default function ActualitesPage() {
  return (
    <>
      <PageHero
        kicker="Actualités"
        titre="Le mouvement en marche."
        intro="Candidatures, dossiers et mobilisations : suivez l'actualité de Climat Québec vers le 5 octobre 2026."
      />

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <ol className="space-y-px overflow-hidden rounded-xl border border-border">
          {ACTUALITES.map((a, i) => (
            <li
              key={i}
              data-testid={`actualite-${i}`}
              className="bg-surface p-7 transition-colors hover:bg-surface-2 sm:p-9"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-8">
                <time className="shrink-0 text-sm font-bold uppercase tracking-widest text-accent sm:w-40">
                  {a.date}
                </time>
                <div>
                  <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                    {a.titre}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {a.extrait}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted/70">
                    Source : {a.source}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CtaBanner />
    </>
  );
}
