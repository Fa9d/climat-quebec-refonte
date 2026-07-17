"use client";

import Link from "next/link";
import Reveal from "@/components/reveal";
import { Kicker } from "@/components/ui";

/* ------------------------------------------------------------------ */
/*  Données réelles — circonscription provinciale de Mercier          */
/*  (Plateau-Mont-Royal / Mile End). Sources : Élections Québec,      */
/*  Wikipédia (résultats électoraux), Ville de Montréal.              */
/* ------------------------------------------------------------------ */

const HISTORIQUE = [
  { annee: "2008", qs: 37.9, pq: 34.3, plq: 21.3, caq: null, vert: 3.6, part: 56.0, note: "Khadir bat le PQ sortant" },
  { annee: "2012", qs: 46.7, pq: 23.5, plq: 13.5, caq: 11.0, vert: 2.8, part: 76.3, note: "Consolidation" },
  { annee: "2014", qs: 46.2, pq: 20.5, plq: 23.0, caq: 8.4, vert: null, part: 72.4, note: "PLQ 2e" },
  { annee: "2018", qs: 54.5, pq: 12.1, plq: 17.7, caq: 8.0, vert: 3.8, part: 65.6, note: "Sommet QS (Ghazal)" },
  { annee: "2022", qs: 53.9, pq: 14.6, plq: 14.0, caq: 10.3, vert: 3.0, part: 63.6, note: "Léger recul, participation en baisse" },
];

const PROFIL = [
  { valeur: "≈ 69 %", label: "Locataires", note: "Quartiers centraux : très forte proportion de locataires vs propriétaires" },
  { valeur: "Jeune", label: "Population 25-44 ans surreprésentée", note: "Célibataires, unions libres, mobilité résidentielle élevée" },
  { valeur: "63,6 %", label: "Participation 2022", note: "En baisse depuis 2012 (76 %) — gisement d'abstentionnistes" },
  { valeur: "≈ 3 %", label: "Plafond historique du vote Vert", note: "L'électorat écolo vote QS, pas Vert : la clé du problème" },
];

const CIBLES = [
  {
    titre: "Les déçus de QS",
    part: "Cœur de cible",
    desc: "QS a atteint son plafond (54,5 % → 53,9 %) et gouverne en 2e opposition. Une frange de sa base juge le parti trop dispersé, trop institutionnel, pas assez radical sur le climat. C'est le bassin le plus mobilisable.",
    accent: true,
  },
  {
    titre: "Les abstentionnistes climato-anxieux",
    part: "Gisement",
    desc: "La participation a chuté de 13 points depuis 2012. Beaucoup de jeunes du Plateau ne se déplacent plus. Un message clair, mono-enjeu et incarné peut réactiver ce vote.",
  },
  {
    titre: "Les orphelins écologistes",
    part: "Appoint",
    desc: "Le vote Vert plafonne à 3 % : ces électeurs veulent voter climat mais n'ont pas de véhicule crédible. Climat Québec peut devenir ce véhicule.",
  },
];

const OBJECTIONS = [
  {
    q: "« Pourquoi ne pas simplement voter Québec solidaire ? »",
    r: "QS parle de tout — logement, santé, langue, laïcité. Climat Québec porte une seule promesse non négociable : chaque décision passe le test climatique. Quand un parti défend cent priorités, il n'en a aucune. Moi, j'en ai une, et je ne la lâcherai jamais.",
  },
  {
    q: "« Un parti d'un seul enjeu, c'est réducteur, non ? »",
    r: "Le climat n'est pas un enjeu parmi d'autres : c'est le cadre de tous les autres. Le logement, la santé, le coût de la vie — tout est affecté par la crise climatique. Rénover et isoler nos logements, c'est baisser les loyers ET les émissions. Un seul fil conducteur, mais qui touche toute votre vie.",
  },
  {
    q: "« L'indépendance, ça me fait peur / ça ne m'intéresse pas. »",
    r: "L'indépendance n'est pas un préalable, c'est un moyen. Reprendre nos pouvoirs, c'est pouvoir agir sur le climat sans attendre la permission d'Ottawa. Si vous tenez au climat d'abord, on est déjà d'accord sur l'essentiel.",
  },
  {
    q: "« Vous n'avez aucune chance de gagner ici. »",
    r: "En 2008, Amir Khadir a fait 37,9 % et a battu un PQ qui semblait imprenable. Les bastions tombent quand les gens décident que ça suffit. Chaque vote pour moi, c'est un signal clair : le Plateau veut le climat au centre, pas en note de bas de page.",
  },
];

const PLAN = [
  { n: "01", titre: "Porte-à-porte thématique", desc: "Cibler les triplex locatifs et les rues à forte densité de jeunes. Argument d'entrée : logement + climat liés (isolation, loyers, rénovation)." },
  { n: "02", titre: "Présence de quartier", desc: "Ruelles vertes, comités logement, conseils d'arrondissement, marchés. Incarner le candidat de proximité face à une députée devenue cheffe parlementaire, très occupée à Québec." },
  { n: "03", titre: "Mobiliser l'abstention", desc: "Campagne de sortie du vote ciblée sur les 18-34 ans. Message d'espoir et de solution, pas de catastrophe." },
  { n: "04", titre: "Contenu local concret", desc: "Un dossier emblématique par secteur (transport actif, verdissement, logement social). Le localisme comme preuve du projet national." },
];

/* ------------------------------------------------------------------ */

const maxVote = 60; // échelle des barres (%)

function BandeauConfidentiel() {
  return (
    <div className="border-b border-accent/30 bg-accent/10">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-2.5 sm:px-8">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-fg dark:text-accent">
          Document interne &middot; Stratégie de candidature &middot; Ne pas diffuser publiquement
        </p>
      </div>
    </div>
  );
}

export default function PlateauPage() {
  return (
    <>
      <BandeauConfidentiel />

      {/* Héro */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Link href="/analyse" className="text-sm font-semibold text-eau hover:underline">
            &larr; Retour à l&apos;analyse du discours
          </Link>
          <div className="mt-4">
            <Kicker>Stratégie de circonscription &middot; Mercier</Kicker>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-4xl text-foreground sm:text-5xl md:text-6xl">
            Plateau-Mont-Royal : gagner le bastion écolo
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            La circonscription provinciale de Mercier (Plateau-Mont-Royal, Mile End) est le
            fief historique de Québec solidaire depuis l&apos;élection d&apos;Amir Khadir en 2008.
            C&apos;est aussi le terrain où le message de Climat Québec peut le mieux résonner —
            à condition de viser juste. Voici la lecture stratégique du terrain et le plan pour
            y percer.
          </p>
        </div>
      </section>

      {/* Le défi en clair */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="rounded-xl border border-eau/40 bg-eau/5 p-7 sm:p-9">
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">Le défi, dit franchement</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Mercier ne se prend pas de front : QS y récolte près de <span className="font-bold text-foreground">54 %</span>,
            le 2<sup>e</sup> parti (PQ) plafonne à 15 %. On ne bat pas QS sur son terrain en étant un
            QS-bis. Mais deux signaux ouvrent une brèche : QS a <span className="font-bold text-foreground">atteint son plafond</span>{" "}
            (léger recul de 2018 à 2022) et la <span className="font-bold text-foreground">participation s&apos;effrite</span>{" "}
            (de 76 % en 2012 à 64 % en 2022). La cible réaliste n&apos;est pas 50 % : c&apos;est de
            s&apos;imposer comme <span className="font-bold text-foreground">la vraie alternative écolo-progressiste</span> et de
            réactiver les abstentionnistes et les déçus.
          </p>
        </div>
      </section>

      {/* Profil de la circonscription */}
      <section className="border-y border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Kicker>Portrait du terrain</Kicker>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">Qui vote sur le Plateau</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROFIL.map((p) => (
              <Reveal key={p.label} className="rounded-xl border border-border bg-surface p-6">
                <div className="font-display text-3xl text-foreground">{p.valeur}</div>
                <div className="mt-2 text-sm font-bold text-foreground">{p.label}</div>
                <p className="mt-1.5 text-sm leading-snug text-muted">{p.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Historique électoral — graphique en barres */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Kicker>Historique électoral</Kicker>
        <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
          Vingt ans de domination solidaire
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Part du vote (%) par parti à chaque scrutin. Le vote Vert (en gris) n&apos;a jamais
          dépassé 4 % : l&apos;électorat écologiste du Plateau se reporte sur QS, pas sur un parti vert.
        </p>

        <div className="mt-10 space-y-6">
          {HISTORIQUE.map((h) => (
            <Reveal key={h.annee} className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl text-foreground">{h.annee}</span>
                <span className="text-xs text-muted">{h.note} &middot; participation {h.part.toString().replace(".", ",")} %</span>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { nom: "Québec solidaire", val: h.qs, couleur: "#f58220" },
                  { nom: "Parti québécois", val: h.pq, couleur: "#1c5fa8" },
                  { nom: "Parti libéral", val: h.plq, couleur: "#d71920" },
                  { nom: "Coalition Avenir Québec", val: h.caq, couleur: "#00aeef" },
                  { nom: "Parti vert", val: h.vert, couleur: "#9ca3af" },
                ]
                  .filter((b) => b.val != null)
                  .map((b) => (
                    <div key={b.nom} className="flex items-center gap-3">
                      <span className="w-44 shrink-0 text-xs text-muted">{b.nom}</span>
                      <div className="relative h-5 flex-1 overflow-hidden rounded bg-surface-2">
                        <div
                          className="flex h-full items-center rounded pl-2 text-[11px] font-bold text-white"
                          style={{ width: `${((b.val as number) / maxVote) * 100}%`, backgroundColor: b.couleur, minWidth: "2.5rem" }}
                        >
                          {(b.val as number).toString().replace(".", ",")}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Sources : Élections Québec ; compilation des résultats de Mercier (2008-2022). Le PQ, autrefois à 34 % (2008), est tombé à 15 %.
        </p>
      </section>

      {/* Cibles électorales */}
      <section className="border-y border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Kicker>Où chercher les voix</Kicker>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">Trois bassins mobilisables</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {CIBLES.map((c) => (
              <Reveal
                key={c.titre}
                className={`rounded-xl border p-7 ${c.accent ? "border-lilas/45 bg-tertiary-fond" : "border-border bg-surface"}`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider ${c.accent ? "text-lilas" : "text-eau"}`}>
                  {c.part}
                </span>
                <h3 className="mt-2 font-display text-2xl text-foreground">{c.titre}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Les 3 messages */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Kicker>Messages de campagne</Kicker>
        <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">Trois messages qui portent ici</h2>
        <div className="mt-8 space-y-5">
          {[
            { t: "Le climat d'abord, vraiment", d: "Seul parti au profil environnemental dominant. Message : « QS parle de tout ; moi je porte une promesse non négociable — chaque décision passe le test climatique. » On transforme le mono-enjeu en clarté." },
            { t: "Logement et climat, même combat", d: "L'enjeu n°1 du Plateau en 2026. « Rénover et isoler le parc locatif, c'est baisser les loyers ET les émissions. Le logement social est une politique climatique. » Concret, chiffré, local." },
            { t: "Un candidat de quartier, pas de passage", d: "Face à une députée devenue cheffe parlementaire, se poser en candidat de proximité : ruelles vertes, comités logement, conseils d'arrondissement. « Vivre le Plateau, pas le survoler. »" },
          ].map((m, i) => (
            <Reveal key={m.t} className="grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8">
              <div className="font-display text-4xl text-accent sm:text-5xl">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="font-display text-2xl text-foreground">{m.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Objections / réponses */}
      <section className="border-y border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Kicker>Sur le pas de porte</Kicker>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">Répondre aux objections</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Les quatre objections les plus probables du porte-à-porte, avec une réponse prête à
            l&apos;emploi pour chacune.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {OBJECTIONS.map((o) => (
              <Reveal key={o.q} className="rounded-xl border border-border bg-surface p-7">
                <p className="font-display text-lg font-bold text-eau">{o.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{o.r}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qu'il faut éviter */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Kicker>Angles morts</Kicker>
        <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">Ce qu&apos;il faut éviter</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { t: "Mettre l'indépendance en avant", d: "Sur le Plateau, ça divise l'électorat cible. Garder l'indépendance comme moyen (« reprendre nos pouvoirs »), jamais comme préalable." },
            { t: "Le registre catastrophiste", d: "Le parti est le seul en « mode crise ». Ici, les gens sont déjà convaincus de l'urgence : ils veulent des solutions et de l'espoir, pas de l'anxiété." },
            { t: "Jouer au censeur", d: "Passer de « il faut que… » à « voici ce que je ferai, dès le premier mandat ». Un ethos de gouvernant, pas de vigie." },
          ].map((e) => (
            <Reveal key={e.t} className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-eau" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
                </svg>
                <div>
                  <h3 className="font-display text-lg text-foreground">{e.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{e.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Plan d'action */}
      <section className="border-t border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Kicker>Plan d&apos;action terrain</Kicker>
          <h2 className="mt-5 font-display text-3xl text-foreground sm:text-4xl">Quatre chantiers de campagne</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PLAN.map((p) => (
              <Reveal key={p.n} className="rounded-xl border border-border bg-surface p-7">
                <div className="font-display text-4xl text-accent">{p.n}</div>
                <h3 className="mt-3 font-display text-xl text-foreground">{p.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accroche porte-à-porte */}
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="relative overflow-hidden rounded-xl bg-primary px-7 py-14 text-primary-fg sm:px-14 sm:py-20">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-fg/70">Accroche porte-à-porte</p>
            <h2 className="mt-4 font-display text-2xl leading-snug sm:text-4xl">
              « Sur le Plateau, on est déjà écolos dans nos gestes. Moi, je veux que nos élus le
              soient dans leurs décisions — sur le logement, les ruelles, le transport. Reprendre
              nos pouvoirs, pour protéger notre monde, ici, concrètement. »
            </h2>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-accent/25 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-lilas/25 blur-2xl" aria-hidden="true" />
        </div>
      </section>

      {/* Note méthodologique */}
      <section className="border-t border-border bg-surface-2/40">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <p className="text-xs leading-relaxed text-muted">
            <span className="font-bold text-foreground">Sources &amp; méthode —</span>{" "}
            Résultats électoraux de Mercier (2008-2022) : Élections Québec et compilations publiques.
            Profil sociodémographique : Ville de Montréal, Statistique Canada (recensement).
            Enjeux locaux 2026 (logement, itinérance) : couverture de presse locale du Plateau-Mont-Royal.
            Recommandations discursives dérivées de l&apos;analyse textométrique comparative des 5 partis
            (voir la <Link href="/analyse" className="text-eau underline">page d&apos;analyse du discours</Link>).
            Attention : la circonscription provinciale de Mercier (Plateau / Mile End) est distincte de
            l&apos;arrondissement Mercier–Hochelaga-Maisonneuve. Analyse réalisée en juillet 2026.
          </p>
        </div>
      </section>
    </>
  );
}
