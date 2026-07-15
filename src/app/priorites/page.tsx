"use client";

import Image from "next/image";
import { useVersion } from "@/components/providers";
import Reveal from "@/components/reveal";
import { Kicker, CtaBanner } from "@/components/ui";

export default function PrioritesPage() {
  const { content } = useVersion();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Kicker>Nos priorités</Kicker>
          <h1 className="mt-5 max-w-4xl font-display text-5xl text-foreground sm:text-6xl md:text-7xl">
            Le programme, priorité par priorité.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Des engagements concrets pour l&apos;eau, l&apos;énergie, le
            transport, le territoire et la démocratie.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <ol className="space-y-16 sm:space-y-24">
          {content.priorites.map((p, i) => {
            const hasImage = Boolean(p.image);
            const flip = i % 2 === 1;
            return (
              <Reveal
                as="li"
                key={p.slug}
                className={`grid items-center gap-8 ${
                  hasImage ? "lg:grid-cols-2 lg:gap-14" : ""
                }`}
              >
                <div className={flip && hasImage ? "lg:order-2" : ""}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-widest text-eau dark:text-[#8fd0e6]">
                      {p.accroche}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
                    {p.titre}
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                    {p.texte}
                  </p>
                </div>
                {hasImage && (
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-xl shadow-md ${
                      flip ? "lg:order-1" : ""
                    }`}
                  >
                    <Image
                      src={p.image as string}
                      alt={`Illustration — ${p.titre}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </Reveal>
            );
          })}
        </ol>
      </section>

      <CtaBanner />
    </>
  );
}
