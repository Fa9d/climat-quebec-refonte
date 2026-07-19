"use client";

import Image from "next/image";
import Link from "next/link";
import { useVersion } from "@/components/providers";
import Reveal from "@/components/reveal";
import { Kicker, StatutBadge, CtaBanner } from "@/components/ui";
import { assetPath } from "@/lib/asset-path";
import { CompteurTemoignages } from "@/components/compteur-temoignages";
import {
  DOSSIERS,
  CANDIDATS,
  CONTEXTE_2026,
  PARTI,
} from "@/data/content";

export default function Home() {
  const { content } = useVersion();

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero-overlay relative isolate flex min-h-[86vh] items-end overflow-hidden">
        <Image
          src={assetPath("/images/hero-territory.webp")}
          alt="Territoire forestier et lac du Québec, brume matinale sur les collines boisées"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              {content.sousSlogan}
            </span>
            <h1 className="mt-6 font-display text-5xl text-white drop-shadow-sm sm:text-7xl md:text-[5.5rem]">
              {content.slogan}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              {content.heroIntro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/agir"
                data-testid="hero-cta-1"
                className="rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                {content.heroCta1}
              </Link>
              <Link
                href="/priorites"
                data-testid="hero-cta-2"
                className="rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                {content.heroCta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MESSAGES PORTEURS (asymétrique) ===================== */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Kicker>Ce que nous portons</Kicker>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Trois convictions, un seul combat.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {content.visionTitre === "Notre vision"
                ? "Reprendre nos pouvoirs, protéger nos ressources, changer la vie concrète des gens."
                : "Un parti dédié au climat, à la République et au bien commun."}
            </p>
            <Link
              href="/vision"
              className="mt-6 inline-flex items-center gap-2 font-bold text-accent hover:gap-3 transition-all"
            >
              Lire notre vision
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <ol className="space-y-5">
            {content.messagesPorteurs.map((m, i) => (
              <Reveal
                as="li"
                key={m.titre}
                delay={i * 90}
                className="rounded-lg border border-border bg-surface p-7 shadow-sm sm:p-9"
              >
                <div className="flex items-start gap-5">
                  <span className="font-display text-3xl text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">
                      {m.titre}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      {m.texte}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== APERÇU PRIORITÉS (bande foncée) ===================== */}
      <section className="bg-primary text-primary-fg">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                Nos priorités
              </span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl sm:text-5xl">
                Un programme clair pour un Québec debout.
              </h2>
            </div>
            <Link
              href="/priorites"
              className="shrink-0 rounded-full border border-primary-fg/40 px-6 py-3 text-sm font-bold transition-colors hover:bg-primary-fg/10"
            >
              Toutes les priorités
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.priorites.slice(0, 5).map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 70}
                className={`flex flex-col rounded-lg bg-primary-fg/[0.06] p-6 ring-1 ring-primary-fg/10 ${
                  i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <span className="text-sm font-bold text-accent">
                  {p.accroche}
                </span>
                <h3 className="mt-2 font-display text-2xl">{p.titre}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-fg/80">
                  {p.texte}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DOSSIERS LOCAUX ===================== */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <Kicker>Luttes locales</Kicker>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
            Sur le terrain, partout au Québec.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Des combats concrets pour l&apos;eau, l&apos;énergie et le territoire.
            Chaque lutte locale devient un projet national.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DOSSIERS.slice(0, 6).map((d, i) => (
            <Reveal
              key={d.slug}
              delay={(i % 3) * 70}
              className="group flex flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <StatutBadge statut={d.statut} />
                <span className="text-xs font-medium text-muted">{d.region}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-foreground">
                {d.titre}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {d.probleme}
              </p>
            </Reveal>
          ))}
        </div>
        <Link
          href="/dossiers"
          className="mt-8 inline-flex items-center gap-2 font-bold text-accent hover:gap-3 transition-all"
        >
          Voir tous les dossiers
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ===================== COMPTEUR TÉMOIGNAGES (temps réel) ===================== */}
      <CompteurTemoignages />

      {/* ===================== BANDEAU CANDIDATS (bleu eau) ===================== */}
      <section className="grain-eau text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                Notre équipe
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                Des candidatures ancrées dans leur région.
              </h2>
            </div>
            <Link
              href="/candidats"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-eau transition-transform hover:-translate-y-0.5"
            >
              Rencontrer l&apos;équipe
            </Link>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {CANDIDATS.slice(0, 6).map((c) => (
              <li
                key={c.nom}
                className="border-t border-white/25 pt-4"
              >
                <p className="font-display text-xl">{c.nom}</p>
                <p className="text-sm font-semibold text-white/85">
                  {c.circonscription} · {c.role}
                </p>
                <p className="mt-1 text-sm text-white/70">{c.enjeu}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== CONTEXTE 2026 (chiffres) ===================== */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Kicker>Contexte 2026</Kicker>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Un électorat en mouvement.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              À l&apos;approche du scrutin, rien n&apos;est joué. C&apos;est le
              moment de porter une voix climatique et souverainiste claire.
            </p>
            <dl className="mt-8 space-y-5">
              <div className="rounded-lg border border-border bg-surface p-5">
                <dt className="text-sm font-semibold text-muted">
                  Première ministre
                </dt>
                <dd className="mt-1 text-base text-foreground">
                  {CONTEXTE_2026.premiereMinistre}
                </dd>
              </div>
              <div className="rounded-lg border border-border bg-surface p-5">
                <dt className="text-sm font-semibold text-muted">
                  Composition de l&apos;Assemblée
                </dt>
                <dd className="mt-1 text-base text-foreground">
                  {CONTEXTE_2026.composition}
                </dd>
              </div>
            </dl>
          </div>

          <Reveal className="flex flex-col justify-center rounded-xl bg-surface-2 p-8 sm:p-10">
            <p className="font-display text-6xl text-accent sm:text-7xl">47 %</p>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-foreground">
              seulement des électeurs jugent leur choix définitif.
            </p>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted">
              {CONTEXTE_2026.sondage}
            </p>
            <p className="mt-4 text-xs text-muted/80">
              {PARTI.prochaineElection}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== GRAND CTA ===================== */}
      <CtaBanner />
    </>
  );
}
