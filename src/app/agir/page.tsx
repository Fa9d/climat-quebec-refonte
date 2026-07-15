"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Kicker } from "@/components/ui";

const ACTIONS = [
  {
    titre: "Devenir membre",
    texte:
      "Ajoutez votre voix au mouvement. L'adhésion est le socle d'un parti citoyen indépendant des lobbys.",
    cta: "Adhérer",
    href: "#adhesion",
  },
  {
    titre: "Faire un don",
    texte:
      "Chaque contribution finance nos campagnes régionales et notre présence sur le terrain, partout au Québec.",
    cta: "Donner",
    href: "#adhesion",
  },
  {
    titre: "Rejoindre une lutte",
    texte:
      "Stablex, TES Canada, Rio Tinto : engagez-vous dans une lutte locale près de chez vous.",
    cta: "S'impliquer",
    href: "/dossiers",
  },
  {
    titre: "Proposer une candidature",
    texte:
      "Portez nos couleurs dans votre circonscription et défendez les enjeux de votre région.",
    cta: "Se porter candidat",
    href: "#adhesion",
  },
];

export default function AgirPage() {
  const [envoye, setEnvoye] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    courriel: "",
    region: "",
    circonscription: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnvoye(true);
  };

  return (
    <>
      <section className="border-b border-border bg-primary text-primary-fg">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Agir
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-5xl sm:text-6xl md:text-7xl">
            Passez à l&apos;action.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-fg/85">
            Le pouvoir citoyen est plus fort que l&apos;argent. Choisissez votre
            façon de contribuer au mouvement.
          </p>
        </div>
      </section>

      {/* Actions segmentées */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {ACTIONS.map((a) => (
            <article
              key={a.titre}
              className="flex flex-col rounded-xl border border-border bg-surface p-8 shadow-sm"
            >
              <h2 className="font-display text-2xl text-foreground">
                {a.titre}
              </h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                {a.texte}
              </p>
              <Link
                href={a.href}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                {a.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Formulaire d'adhésion */}
      <section id="adhesion" className="bg-surface scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Kicker>Adhésion</Kicker>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Devenez membre de Climat Québec.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Remplissez le formulaire ci-contre. Un membre de l&apos;équipe
              communiquera avec vous pour finaliser votre adhésion.
            </p>
          </div>

          <div>
            {envoye ? (
              <div
                role="status"
                data-testid="confirmation-adhesion"
                className="rounded-xl border border-accent/40 bg-accent/10 p-8 sm:p-10"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-fg" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">
                      Merci{form.nom ? `, ${form.nom}` : ""} !
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      Votre demande d&apos;adhésion a bien été reçue. Nous vous
                      écrirons à {form.courriel || "votre courriel"} pour la
                      suite.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEnvoye(false);
                        setForm({ nom: "", courriel: "", region: "", circonscription: "" });
                      }}
                      data-testid="reset-form"
                      className="mt-5 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-surface-2"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                data-testid="form-adhesion"
                className="rounded-xl border border-border bg-background p-8 shadow-sm sm:p-10"
                noValidate
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="nom" className="block text-sm font-bold text-foreground">
                      Nom complet <span className="text-accent">*</span>
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      data-testid="input-nom"
                      className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="courriel" className="block text-sm font-bold text-foreground">
                      Courriel <span className="text-accent">*</span>
                    </label>
                    <input
                      id="courriel"
                      name="courriel"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.courriel}
                      onChange={(e) => setForm({ ...form, courriel: e.target.value })}
                      data-testid="input-courriel"
                      className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm font-bold text-foreground">
                      Région
                    </label>
                    <input
                      id="region"
                      name="region"
                      type="text"
                      autoComplete="address-level1"
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                      data-testid="input-region"
                      className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="circonscription" className="block text-sm font-bold text-foreground">
                      Circonscription
                    </label>
                    <input
                      id="circonscription"
                      name="circonscription"
                      type="text"
                      value={form.circonscription}
                      onChange={(e) => setForm({ ...form, circonscription: e.target.value })}
                      data-testid="input-circonscription"
                      className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  data-testid="submit-adhesion"
                  className="mt-8 w-full rounded-full bg-accent px-7 py-4 text-base font-bold text-accent-fg transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-10"
                >
                  Envoyer ma demande d&apos;adhésion
                </button>
                <p className="mt-4 text-xs text-muted">
                  Démonstration : aucune donnée n&apos;est transmise ni conservée.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
