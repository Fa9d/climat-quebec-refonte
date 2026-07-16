"use client";

import Reveal from "@/components/reveal";
import { Kicker } from "@/components/ui";
import { assetPath } from "@/lib/asset-path";

/* ------------------------------------------------------------------ */
/*  Données issues de l'analyse textométrique (scripts/ du dépôt)      */
/* ------------------------------------------------------------------ */

const PARTIS = [
  { sigle: "CAQ", nom: "Coalition Avenir Québec", couleur: "#00aeef", champ: "Identité / langue", nousEux: 2.04, dramat: 0.08, mots: "ouverture, PME, laïcité, clause dérogatoire, immigration" },
  { sigle: "PQ", nom: "Parti Québécois", couleur: "#1c5fa8", champ: "Souveraineté", nousEux: 3.29, dramat: 0.0, mots: "bleu, internationales, pays, relations, souveraineté" },
  { sigle: "PLQ", nom: "Parti libéral du Québec", couleur: "#d71920", champ: "Économie", nousEux: 3.75, dramat: 0.43, mots: "français, PME, régionaliste, services publics, nationaliste" },
  { sigle: "QS", nom: "Québec solidaire", couleur: "#f58220", champ: "Social / services", nousEux: 2.2, dramat: 0.2, mots: "manifeste, travailleurs, logement, salaire minimum" },
  { sigle: "PCQ", nom: "Parti conservateur du Québec", couleur: "#1d3f6e", champ: "Souveraineté (autonomiste)", nousEux: 2.4, dramat: 0.0, mots: "autonomie, loi, constitution, national" },
  { sigle: "CQ", nom: "Climat Québec", couleur: "#2e8b57", champ: "Environnement", nousEux: 1.37, dramat: 1.67, mots: "climat, Stablex, citoyens, déchets, toxiques, BAPE", nous: true },
];

const KPIS = [
  { valeur: "1,67", label: "Ratio dramatisation / avenir", note: "Le seul parti > 1 : discours de crise, pas de projet", accent: true },
  { valeur: "429‰₀", label: "Poids du champ environnement", note: "Seul parti à profil environnemental dominant" },
  { valeur: "1,37", label: "Ratio « nous » / « eux »", note: "Le plus bas : nomme ses adversaires plutôt que rassembler" },
  { valeur: "×22", label: "Cooccurrence climat ↔ indépendance", note: "Fusion conceptuelle unique dans le paysage" },
];

const FIGURES = [
  { src: "/analyse/fig1_radar_champs.png", titre: "Profil discursif comparé", legende: "Poids des six champs lexicaux (‰₀ pour 10 000 mots). Chaque parti a une forme distincte : Climat Québec est le seul dont l'environnement domine, mais son profil est monothématique." },
  { src: "/analyse/fig2_specificites.png", titre: "Mots sur-employés (spécificités de Lafon)", legende: "Modèle hypergéométrique : un mot est spécifique s'il est sur-employé par rapport au corpus global. Climat Québec se signale par des dossiers concrets (Stablex, Blainville, BAPE) autant que par le concept de climat." },
  { src: "/analyse/fig3_indicateurs.png", titre: "Marqueurs d'analyse critique", legende: "À gauche le nous/eux (polarisation) ; à droite dramatisation/avenir. Climat Québec est le seul parti en régime de crise (1,67) alors que tous les autres sont sous 0,5." },
  { src: "/analyse/fig4_reseau_cq.png", titre: "Fusion climat ↔ indépendance", legende: "Réseau de cooccurrences : « indépendance » appelle « climat ». Les deux concepts sont soudés, ce qui différencie fortement le parti mais restreint son bassin à leur intersection." },
];

const LEVIERS = [
  { n: "01", titre: "Rééquilibrer pathos → logos", diag: "Ratio dramatisation/avenir de 1,67 (le seul > 1).", action: "Pour chaque dénonciation, formuler une proposition nommée et chiffrée. Objectif : ramener le ratio sous 0,8." },
  { n: "02", titre: "Construire un ethos de gouvernant", diag: "Modalité « il faut » / « doit » ≫ engagement propositionnel.", action: "Basculer de « il faut que le Québec… » (censeur) vers « nous ferons… » (acteur responsable)." },
  { n: "03", titre: "Hiérarchiser climat et indépendance", diag: "Fusion = niche étroite, doublement fragilisée en 2026.", action: "Climat / santé / territoire au premier plan (82 % d'adhésion) ; indépendance comme moyen argumenté, pas comme préalable." },
  { n: "04", titre: "Capitaliser sur l'ancrage territorial", diag: "Seul parti dont les mots-signatures incluent des dossiers locaux.", action: "Chaque circonscription ciblée reçoit son dossier local emblématique : le localisme devient la preuve du projet national." },
  { n: "05", titre: "Occuper le champ social délaissé", diag: "Champ social (103‰₀) très inférieur à QS (496), qui s'effondre.", action: "Relier climat et enjeux sociaux (coût de la vie, logement, santé) pour récupérer l'électorat orphelin de QS." },
];

/* ------------------------------------------------------------------ */

function BandeauConfidentiel() {
  return (
    <div className="border-b border-accent/30 bg-accent/10">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-2.5 sm:px-8">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-fg dark:text-accent">
          Document interne &middot; Stratégie confidentielle &middot; Ne pas diffuser publiquement
        </p>
      </div>
    </div>
  );
}

export default function AnalysePage() {
  return (
    <>
      <BandeauConfidentiel />

      {/* Héro */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Kicker>Observatoire du discours &middot; Élection 2026</Kicker>
          <h1 className="mt-5 max-w-4xl font-display text-4xl text-foreground sm:text-5xl md:text-6xl">
            Analyse du discours politique québécois
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            Étude textométrique et critique comparant le discours de Climat Québec à celui
            des cinq principaux partis (CAQ, PQ, PLQ, QS, PCQ), en vue du scrutin du
            5&nbsp;octobre 2026. Fondée sur un corpus de 233&nbsp;textes de Climat Québec
            et sur les plateformes des adversaires, analysée par le modèle hypergéométrique
            de Lafon.
          </p>
        </div>
      </section>

      {/* KPI clés */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((k) => (
            <Reveal
              key={k.label}
              className={`rounded-xl border p-6 ${
                k.accent
                  ? "border-accent/40 bg-accent/5"
                  : "border-border bg-surface"
              }`}
            >
              <div className={`font-display text-4xl ${k.accent ? "text-accent" : "text-foreground"}`}>
                {k.valeur}
              </div>
              <div className="mt-2 text-sm font-bold text-foreground">{k.label}</div>
              <p className="mt-1.5 text-sm leading-snug text-muted">{k.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Synthèse en trois constats */}
      <section className="border-y border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Kicker>Les trois constats structurants</Kicker>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              { t: "Un discours de crise, pas de projet", d: "Climat Québec sur-investit le lexique du danger (crise, urgence, toxique, menace) au détriment du projet réalisable. C'est efficace pour mobiliser la base, faible pour convaincre l'indécis." },
              { t: "Climat et indépendance soudés", d: "Le parti fusionne deux ordres du discours habituellement séparés au Québec. Différenciation forte, mais bassin restreint à leur intersection — doublement fragilisée en 2026." },
              { t: "Le paradoxe du nous/eux", d: "Ratio nous/eux le plus bas de tous : le clivage ne passe pas par les pronoms mais par la désignation d'adversaires concrets (Stablex, Rio Tinto, gouvernement)." },
            ].map((c, i) => (
              <Reveal key={c.t} className="rounded-xl border border-border bg-surface p-7">
                <div className="font-display text-3xl text-accent">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 font-display text-2xl text-foreground">{c.t}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tableau comparatif des partis */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Kicker>Cartographie discursive</Kicker>
        <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
          La signature de chaque parti
        </h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                <th className="py-3 pr-4 font-bold">Parti</th>
                <th className="py-3 pr-4 font-bold">Champ dominant</th>
                <th className="py-3 pr-4 font-bold">Nous/Eux</th>
                <th className="py-3 pr-4 font-bold">Dramat./Avenir</th>
                <th className="py-3 font-bold">Mots-signatures</th>
              </tr>
            </thead>
            <tbody>
              {PARTIS.map((p) => (
                <tr
                  key={p.sigle}
                  className={`border-b border-border/60 ${p.nous ? "bg-accent/5" : ""}`}
                >
                  <td className="py-4 pr-4">
                    <span className="inline-flex items-center gap-2 font-bold text-foreground">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.couleur }} aria-hidden="true" />
                      {p.sigle}
                    </span>
                    <div className="mt-0.5 text-xs text-muted">{p.nom}</div>
                  </td>
                  <td className="py-4 pr-4 text-foreground">{p.champ}</td>
                  <td className="py-4 pr-4 font-semibold text-foreground">{p.nousEux}</td>
                  <td className={`py-4 pr-4 font-semibold ${p.dramat > 1 ? "text-accent" : "text-foreground"}`}>
                    {p.dramat.toString().replace(".", ",")}
                  </td>
                  <td className="py-4 text-muted">{p.mots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted">
          Nous/Eux : &gt; 1 = discours de rassemblement. Dramat./Avenir : &gt; 1 = régime de crise. Poids lexical en ‰₀ (pour 10 000 mots signifiants).
        </p>
      </section>

      {/* Graphiques */}
      <section className="border-y border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Kicker>Visualisations</Kicker>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
            Les données en images
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {FIGURES.map((f) => (
              <Reveal key={f.src} className="rounded-xl border border-border bg-surface p-4 sm:p-6">
                <div className="w-full overflow-hidden rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath(f.src)}
                    alt={f.titre}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-contain"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl text-foreground">{f.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.legende}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leviers stratégiques */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Kicker>Recommandations</Kicker>
        <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
          Cinq leviers stratégiques
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Chaque levier traduit un constat de l&apos;analyse en action discursive concrète pour la campagne.
        </p>
        <div className="mt-10 space-y-5">
          {LEVIERS.map((l) => (
            <Reveal key={l.n} className="grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8">
              <div className="font-display text-4xl text-accent sm:text-5xl">{l.n}</div>
              <div>
                <h3 className="font-display text-2xl text-foreground">{l.titre}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <span className="font-bold text-foreground">Diagnostic — </span>{l.diag}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  <span className="font-bold text-foreground">Action — </span>{l.action}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Slogan / synthèse finale */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
        <div className="relative overflow-hidden rounded-xl bg-primary px-7 py-14 text-primary-fg sm:px-14 sm:py-20">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-fg/70">
              Positionnement recommandé
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl">
              « Reprendre nos pouvoirs pour protéger notre monde. »
            </h2>
            <p className="mt-5 max-w-xl text-lg text-primary-fg/85">
              L&apos;indépendance (« nos pouvoirs ») subordonnée à la finalité écologiste et
              protectrice (« protéger notre monde ») : du parti qui dénonce au parti qui
              protège et qui propose.
            </p>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-2xl" aria-hidden="true" />
        </div>
      </section>

      {/* Note méthodologique */}
      <section className="border-t border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <p className="text-xs leading-relaxed text-muted">
            <span className="font-bold text-foreground">Méthodologie —</span>{" "}
            Textométrie assistée par ordinateur (Python : scipy, matplotlib, networkx). Spécificités
            lexicales par le modèle hypergéométrique de Lafon (1980). Cadre d&apos;analyse critique du
            discours : Fairclough, Van Dijk, Charaudeau (ethos / pathos / logos). Corpus de Climat Québec
            extrait via l&apos;API WordPress publique (233 articles) ; corpus adverses constitués à partir
            des sources primaires officielles et de la couverture médiatique verbatim. Scripts et données
            reproductibles dans <code className="rounded bg-surface-2 px-1.5 py-0.5">analyse-discours/</code> du dépôt.
            Analyse réalisée en juillet 2026.
          </p>
        </div>
      </section>
    </>
  );
}
