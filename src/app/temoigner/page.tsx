"use client";

import { useState, type FormEvent } from "react";
import { Kicker } from "@/components/ui";
import { DOSSIERS_COMPLETS } from "@/data/dossiers-enrichis";
import { useSoumettreTemoin, type ConsentementType } from "@/hooks/use-soumettre-temoin";

interface FormState {
  nomOuPseudonyme: string;
  dossierSlug:     string;
  dateObservation: string;
  lieuPrecis:      string;
  description:     string;
  impactConcret:   string;
  consentement:    ConsentementType | "";
}

const INITIAL: FormState = {
  nomOuPseudonyme: "",
  dossierSlug:     "",
  dateObservation: "",
  lieuPrecis:      "",
  description:     "",
  impactConcret:   "",
  consentement:    "",
};

export default function TemoignerPage() {
  const [form, setForm]     = useState<FormState>(INITIAL);
  const [erreurs, setErr]   = useState<Partial<Record<keyof FormState, string>>>({});
  const { soumettre, statut, erreurServeur, reset } = useSoumettreTemoin();

  const envoye  = statut === "success";
  const loading = statut === "loading";

  const set = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const valider = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.nomOuPseudonyme.trim()) e.nomOuPseudonyme = "Requis (un pseudonyme suffit).";
    if (!form.dossierSlug)            e.dossierSlug     = "Choisissez un dossier.";
    if (!form.dateObservation)        e.dateObservation = "Date requise.";
    if (!form.lieuPrecis.trim())      e.lieuPrecis      = "Lieu requis.";
    if (form.description.trim().length < 30)
      e.description = "Décrivez votre observation en au moins 30 caractères.";
    if (!form.consentement)           e.consentement    = "Choisissez une option.";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valider()) return;
    await soumettre({
      nomOuPseudonyme: form.nomOuPseudonyme,
      dossierSlug:     form.dossierSlug,
      dateObservation: form.dateObservation,
      lieuPrecis:      form.lieuPrecis,
      description:     form.description,
      impactConcret:   form.impactConcret || undefined,
      consentement:    form.consentement as ConsentementType,
    });
  };

  const inputClass = (field: keyof FormState) =>
    `mt-2 w-full rounded-lg border px-4 py-3 text-base text-foreground outline-none focus:border-accent bg-surface ${
      erreurs[field] ? "border-red-500" : "border-border"
    }`;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Kicker>Témoignages</Kicker>
          <h1 className="mt-5 max-w-4xl font-display text-5xl text-foreground sm:text-6xl">
            Votre observation compte.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Décrivez ce que vous avez vu, entendu ou vécu en lien avec un dossier de
            Climat Québec. Votre témoignage sera validé par un coordinateur avant
            d&apos;être intégré au dossier.
          </p>
        </div>
      </section>

      {/* Étapes */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { num: "01", titre: "Décrivez les faits", texte: "Décrivez ce que vous observez, sans interprétation causale. Évitez « à cause de » — décrivez ce que vous voyez, entendez ou mesurez." },
            { num: "02", titre: "Validation interne", texte: "Un coordinateur Climat Québec examine votre témoignage. Si nécessaire, il peut vous contacter pour préciser certains points." },
            { num: "03", titre: "Intégration au dossier", texte: "Une fois validé, votre témoignage renforce le dossier factuel et amplifie l’argumentaire public selon votre consentement." },
          ].map((step) => (
            <div key={step.num} className="rounded-xl border border-border bg-surface p-6">
              <span className="font-display text-3xl text-accent">{step.num}</span>
              <h3 className="mt-2 font-bold text-foreground">{step.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulaire */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          {envoye ? (
            <div role="status" data-testid="confirmation-temoin"
              className="rounded-xl border border-accent/40 bg-accent/10 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-fg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-2xl text-foreground">
                    Merci{form.nomOuPseudonyme ? `, ${form.nomOuPseudonyme}` : ""}!
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    Votre témoignage a été enregistré dans notre base de données. Un coordinateur
                    le passera en revue et l’intégrera au dossier{" "}
                    <strong>
                      {DOSSIERS_COMPLETS.find((d) => d.slug === form.dossierSlug)?.titre ?? form.dossierSlug}
                    </strong>{" "}
                    selon votre consentement.
                  </p>
                  <button type="button"
                    onClick={() => { reset(); setForm(INITIAL); setErr({}); }}
                    data-testid="reset-temoin"
                    className="mt-5 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-surface-2">
                    Soumettre un autre témoignage
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} data-testid="form-temoin" noValidate
              className="space-y-7 rounded-xl border border-border bg-background p-8 shadow-sm sm:p-10">

              {erreurServeur && (
                <div role="alert" className="rounded-lg border border-red-400 bg-red-50 px-5 py-4 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
                  {erreurServeur}
                </div>
              )}

              {/* Nom */}
              <div>
                <label htmlFor="nomOuPseudonyme" className="block text-sm font-bold text-foreground">
                  Votre nom ou pseudonyme <span className="text-accent">*</span>
                </label>
                <p className="mt-1 text-xs text-muted">Un pseudonyme est accepté.</p>
                <input id="nomOuPseudonyme" type="text" required
                  value={form.nomOuPseudonyme}
                  onChange={(e) => set("nomOuPseudonyme", e.target.value)}
                  data-testid="input-nom" className={inputClass("nomOuPseudonyme")} />
                {erreurs.nomOuPseudonyme && <p className="mt-1 text-xs text-red-500">{erreurs.nomOuPseudonyme}</p>}
              </div>

              {/* Dossier */}
              <div>
                <label htmlFor="dossierSlug" className="block text-sm font-bold text-foreground">
                  Dossier concerné <span className="text-accent">*</span>
                </label>
                <select id="dossierSlug" required
                  value={form.dossierSlug}
                  onChange={(e) => set("dossierSlug", e.target.value)}
                  data-testid="select-dossier" className={inputClass("dossierSlug")}>
                  <option value="">-- Choisissez un dossier --</option>
                  {DOSSIERS_COMPLETS.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.titre} — {d.region}</option>
                  ))}
                </select>
                {erreurs.dossierSlug && <p className="mt-1 text-xs text-red-500">{erreurs.dossierSlug}</p>}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="dateObservation" className="block text-sm font-bold text-foreground">
                  Date de l’observation <span className="text-accent">*</span>
                </label>
                <input id="dateObservation" type="date" required
                  value={form.dateObservation}
                  onChange={(e) => set("dateObservation", e.target.value)}
                  data-testid="input-date" className={inputClass("dateObservation")} />
                {erreurs.dateObservation && <p className="mt-1 text-xs text-red-500">{erreurs.dateObservation}</p>}
              </div>

              {/* Lieu */}
              <div>
                <label htmlFor="lieuPrecis" className="block text-sm font-bold text-foreground">
                  Lieu précis <span className="text-accent">*</span>
                </label>
                <p className="mt-1 text-xs text-muted">Ex : « rue des Érables, à 500 m de l’entrée du site »</p>
                <input id="lieuPrecis" type="text" required
                  value={form.lieuPrecis}
                  onChange={(e) => set("lieuPrecis", e.target.value)}
                  data-testid="input-lieu" className={inputClass("lieuPrecis")} />
                {erreurs.lieuPrecis && <p className="mt-1 text-xs text-red-500">{erreurs.lieuPrecis}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-bold text-foreground">
                  Description de l’observation <span className="text-accent">*</span>
                </label>
                <p className="mt-1 text-xs text-muted">
                  Décrivez les faits. Évitez les interprétations causales.
                </p>
                <textarea id="description" required rows={5}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  data-testid="textarea-description"
                  className={inputClass("description") + " resize-y"} />
                <p className="mt-1 text-right text-xs text-muted">{form.description.length} caractères</p>
                {erreurs.description && <p className="mt-1 text-xs text-red-500">{erreurs.description}</p>}
              </div>

              {/* Impact */}
              <div>
                <label htmlFor="impactConcret" className="block text-sm font-bold text-foreground">
                  Impact concret sur vous ou votre famille
                </label>
                <p className="mt-1 text-xs text-muted">Facultatif — santé, usage du territoire, qualité de vie.</p>
                <textarea id="impactConcret" rows={3}
                  value={form.impactConcret}
                  onChange={(e) => set("impactConcret", e.target.value)}
                  data-testid="textarea-impact"
                  className={inputClass("impactConcret") + " resize-y"} />
              </div>

              {/* Consentement */}
              <fieldset>
                <legend className="text-sm font-bold text-foreground">
                  Consentement d’utilisation <span className="text-accent">*</span>
                </legend>
                <div className="mt-3 space-y-3">
                  {([
                    ["public-nomme",       "Témoignage public avec mon nom"],
                    ["public-anonyme",     "Témoignage public anonymisé"],
                    ["interne-seulement",  "Usage interne seulement (non diffusé)"],
                  ] as [ConsentementType, string][]).map(([val, label]) => (
                    <label key={val} className="flex cursor-pointer items-start gap-3">
                      <input type="radio" name="consentement" value={val}
                        checked={form.consentement === val}
                        onChange={() => set("consentement", val)}
                        className="mt-0.5 h-4 w-4 accent-accent" />
                      <span className="text-sm text-foreground">{label}</span>
                    </label>
                  ))}
                </div>
                {erreurs.consentement && <p className="mt-2 text-xs text-red-500">{erreurs.consentement}</p>}
              </fieldset>

              <button type="submit" data-testid="submit-temoin" disabled={loading}
                className="w-full rounded-full bg-accent px-7 py-4 text-base font-bold text-accent-fg transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto sm:px-10">
                {loading ? "Envoi en cours…" : "Soumettre mon témoignage"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
