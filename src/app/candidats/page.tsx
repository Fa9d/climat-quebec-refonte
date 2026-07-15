import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBanner } from "@/components/ui";
import { CANDIDATS, RESULTATS } from "@/data/content";

export const metadata: Metadata = {
  title: "Candidats",
  description:
    "Rencontrez les candidates et candidats de Climat Québec pour l'élection du 5 octobre 2026, chacun relié à un enjeu concret de sa circonscription.",
  openGraph: {
    title: "Candidats · Climat Québec",
    description:
      "Des candidatures ancrées dans leur région, reliées à un enjeu local concret.",
  },
};

function initiales(nom: string) {
  return nom
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function CandidatsPage() {
  return (
    <>
      <PageHero
        kicker="Notre équipe"
        titre="Une équipe ancrée dans son territoire."
        intro="Chaque candidature porte un enjeu concret de sa région. C'est ainsi que les luttes locales deviennent un projet national."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CANDIDATS.map((c) => (
            <li
              key={c.nom}
              data-testid={`candidat-${c.circonscription}`}
              className="flex flex-col rounded-xl border border-border bg-surface p-7 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary font-display text-lg text-primary-fg"
                  aria-hidden="true"
                >
                  {initiales(c.nom)}
                </span>
                <div>
                  <h2 className="font-display text-xl text-foreground">
                    {c.nom}
                  </h2>
                  <p className="text-sm font-semibold text-accent">{c.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-eau dark:text-[#8fd0e6]">
                {c.circonscription}
              </p>
              <p className="mt-2 flex-1 text-base leading-relaxed text-muted">
                {c.enjeu}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Résultats électoraux */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Nos résultats électoraux
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted">
            La transparence, dossier par dossier. Chaque scrutin est une étape
            vers l&apos;élection générale du 5 octobre 2026.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Résultats électoraux de Climat Québec
              </caption>
              <thead>
                <tr className="bg-surface-2 text-xs uppercase tracking-widest text-muted">
                  <th scope="col" className="px-5 py-3 font-bold">Scrutin</th>
                  <th scope="col" className="px-5 py-3 font-bold">Date</th>
                  <th scope="col" className="px-5 py-3 font-bold">Candidat</th>
                  <th scope="col" className="px-5 py-3 font-bold">Votes</th>
                  <th scope="col" className="px-5 py-3 font-bold">%</th>
                </tr>
              </thead>
              <tbody>
                {RESULTATS.map((r, i) => (
                  <tr
                    key={i}
                    className="border-t border-border text-foreground"
                  >
                    <td className="px-5 py-4 font-semibold">{r.scrutin}</td>
                    <td className="px-5 py-4 text-muted">{r.date}</td>
                    <td className="px-5 py-4 text-muted">{r.candidat}</td>
                    <td className="px-5 py-4 tabular-nums">{r.votes}</td>
                    <td className="px-5 py-4 tabular-nums font-semibold text-accent">
                      {r.pct}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="rounded-xl border border-border bg-surface p-8 text-center sm:p-12">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Vous voulez porter nos couleurs ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted">
            Proposez votre candidature et défendez votre région.
          </p>
          <Link
            href="/agir"
            className="mt-6 inline-block rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-fg"
          >
            Proposer une candidature
          </Link>
        </div>
      </div>

      <CtaBanner />
    </>
  );
}
