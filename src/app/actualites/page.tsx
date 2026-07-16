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

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {ACTUALITES.map((a, i) => {
            const Wrapper = a.lien ? "a" : "div";
            const linkProps = a.lien
              ? { href: a.lien, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={i}
                {...linkProps}
                data-testid={`actualite-${i}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:bg-surface-2"
              >
                {a.image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.image}
                      alt={a.titre}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <time className="text-xs font-bold uppercase tracking-widest text-accent">
                    {a.date}
                  </time>
                  <h2 className="mt-3 font-display text-xl leading-tight text-foreground sm:text-2xl">
                    {a.titre}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {a.extrait}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted/70">
                    {a.lien ? (
                      <span className="text-accent group-hover:underline">
                        Lire sur climat.quebec →
                      </span>
                    ) : (
                      <>Source : {a.source}</>
                    )}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
