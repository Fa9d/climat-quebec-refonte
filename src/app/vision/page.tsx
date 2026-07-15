"use client";

import { useVersion } from "@/components/providers";
import Reveal from "@/components/reveal";
import { Kicker, CtaBanner } from "@/components/ui";
import { PARTI } from "@/data/content";

export default function VisionPage() {
  const { content } = useVersion();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Kicker>{content.visionTitre}</Kicker>
          <h1 className="mt-5 max-w-4xl font-display text-5xl text-foreground sm:text-6xl md:text-7xl">
            {content.slogan}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {content.sousSlogan} — {PARTI.nom}, cheffe {PARTI.cheffe}.
          </p>
        </div>
      </section>

      {/* Texte de vision / fondateur — colonne éditoriale */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-3xl text-foreground">
              {content.visionTitre}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {PARTI.fondation}
            </p>
          </div>
          <div className="max-w-2xl space-y-6">
            {content.visionTexte.map((para, i) => (
              <Reveal
                as="p"
                key={i}
                delay={i * 60}
                className={
                  i === 0
                    ? "text-2xl leading-snug text-foreground font-medium"
                    : "text-lg leading-relaxed text-muted"
                }
              >
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Messages porteurs développés */}
      <section className="bg-primary text-primary-fg">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Nos messages porteurs
          </span>
          <div className="mt-10 space-y-px overflow-hidden rounded-xl">
            {content.messagesPorteurs.map((m, i) => (
              <Reveal
                key={m.titre}
                delay={i * 80}
                className="grid gap-4 bg-primary-fg/[0.06] p-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-10"
              >
                <span className="font-display text-4xl text-accent sm:text-5xl">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">{m.titre}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-primary-fg/85 sm:text-lg">
                    {m.texte}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Discours / extrait fondateur */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <Kicker>{content.discoursTitre}</Kicker>
        <div className="mt-8 space-y-5">
          {content.discours.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display text-3xl text-foreground sm:text-4xl"
                  : "text-lg leading-relaxed text-muted"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
