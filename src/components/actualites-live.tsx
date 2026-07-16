"use client";

import { useEffect, useState } from "react";
import { ACTUALITES, type Actualite } from "@/data/content";

// Point d'entrée de l'API REST WordPress de climat.quebec.
// L'API est publique et autorise CORS depuis ivia.quebec, donc l'appel
// se fait directement dans le navigateur du visiteur — chaque nouvel
// article publié sur climat.quebec apparaît ici automatiquement.
const API =
  "https://climat.quebec/wp-json/wp/v2/posts?per_page=12&_embed=wp:featuredmedia&_fields=id,date,link,title,excerpt,content,_embedded";

const MOIS = [
  "",
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function frDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${parseInt(d, 10)} ${MOIS[parseInt(m, 10)]} ${y}`;
}

function stripHtml(input: string): string {
  if (!input) return "";
  const txt = input
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\u2009/g, " ")
    .replace(/\[&hellip;\]|\[…\]|\[\.\.\.\]/g, "");
  // décoder les entités HTML via le DOM
  const el = typeof document !== "undefined" ? document.createElement("textarea") : null;
  let decoded = txt;
  if (el) {
    el.innerHTML = txt;
    decoded = el.value;
  }
  return decoded.replace(/\s+/g, " ").trim();
}

function isJunk(ex: string): boolean {
  if (!ex) return true;
  if (ex.startsWith("@") || ex.includes("♬")) return true;
  if ((ex.match(/#/g) || []).length >= 2) return true;
  return ex.length < 40;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toActualite(p: any): Actualite {
  const titre = stripHtml(p?.title?.rendered ?? "");
  let extrait = stripHtml(p?.excerpt?.rendered ?? "");
  if (isJunk(extrait)) extrait = stripHtml(p?.content?.rendered ?? "");
  if (isJunk(extrait))
    extrait =
      "Publication de Climat Québec. Cliquez pour lire l’article complet sur le site officiel.";
  if (extrait.length > 230) {
    extrait = extrait.slice(0, 230).replace(/\s+\S*$/, "") + "…";
  }
  const media = p?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
  return {
    date: frDate(p?.date ?? ""),
    titre,
    extrait,
    lien: p?.link ?? "",
    image: media || undefined,
    source: "climat.quebec",
  };
}

export default function ActualitesLive() {
  // On part des articles pré-buildés (fallback immédiat, zéro flash vide),
  // puis on les remplace par la version live dès que l'API répond.
  const [items, setItems] = useState<Actualite[]>(ACTUALITES);
  const [live, setLive] = useState<boolean>(false);

  useEffect(() => {
    let annule = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch(API, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (annule || !Array.isArray(data) || data.length === 0) return;
        setItems(data.map(toActualite));
        setLive(true);
      })
      .catch(() => {
        // silencieux : on garde les articles pré-buildés en repli
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      annule = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="mb-8 flex items-center gap-3">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            live ? "bg-accent" : "bg-muted/40"
          }`}
          aria-hidden
        />
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {live
            ? "Synchronisé en direct avec climat.quebec"
            : "Dernières nouvelles"}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((a, i) => {
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
  );
}
