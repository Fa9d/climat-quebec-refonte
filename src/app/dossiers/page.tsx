import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, StatutBadge, CtaBanner } from "@/components/ui";
import { DOSSIERS } from "@/data/content";

export const metadata: Metadata = {
  title: "Dossiers locaux",
  description:
    "Les luttes locales de Climat Québec : Stablex, TES Canada, méga-éoliennes privées, Rio Tinto/Alcan, transport collectif et lithium. Le problème, notre proposition, la région et le statut.",
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
          {DOSSIERS.map((d) => (
            <article
              key={d.slug}
              data-testid={`dossier-${d.slug}`}
              className="flex flex-col rounded-xl border border-border bg-surface p-7 shadow-sm transition-shadow hover:shadow-md sm:p-9"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatutBadge statut={d.statut} />
                <span className="text-sm font-semibold text-muted">
                  {d.region}
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl text-foreground">
                {d.titre}
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-eau dark:text-[#8fd0e6]">
                    Le problème
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {d.probleme}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
                    Notre proposition
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground">
                    {d.proposition}
                  </p>
                </div>
              </div>

              <Link
                href="/agir"
                data-testid={`impliquer-${d.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                S&apos;impliquer
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
