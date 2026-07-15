# Climat Québec — Refonte du site

Refonte moderne du site du parti politique québécois **Climat Québec**, construite avec Next.js, React et Tailwind CSS. Le projet propose une nouvelle identité visuelle audacieuse et militante, ancrée dans le territoire québécois (forêt boréale, eau, énergie).

## Deux lignes éditoriales

Le site intègre un **sélecteur de version de contenu** (dans l'en-tête) permettant de basculer entre :

- **Nouvelle ligne (2026)** — positionnement recommandé par une analyse stratégique : slogan « Reprendre nos pouvoirs pour protéger notre monde ».
- **Ligne actuelle** — reprise fidèle du contenu existant de climat.quebec : « La force de contrer les lobbys ».

La bascule s'opère via un React Context, sans rechargement.

## Fonctionnalités

- 7 pages : Accueil, Notre vision, Nos priorités, Dossiers locaux, Candidats, Agir, Actualités
- Mode clair / sombre (préférence système + bascule manuelle)
- Design responsive mobile-first, accessibilité WCAG AA
- Contenu et données réels (candidatures, résultats électoraux, dossiers) centralisés dans `src/data/content.ts`

## Stack technique

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Typographie via [Fontshare](https://www.fontshare.com/)

## Démarrage

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
npm run start    # serveur de production
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Déploiement

Ce projet est une application Next.js à runtime Node. Déploiement recommandé sur [Vercel](https://vercel.com/).

## Sources

Contenu et données : [climat.quebec](https://climat.quebec/), [Élections Québec](https://www.electionsquebec.qc.ca/), [Léger](https://leger360.com/), [Assemblée nationale du Québec](https://www.assnat.qc.ca/).

---

Parti autorisé par le DGEQ depuis le 2 août 2021 · Élections générales du 5 octobre 2026.
