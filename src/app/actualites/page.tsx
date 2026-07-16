import type { Metadata } from "next";
import { PageHero, CtaBanner } from "@/components/ui";
import ActualitesLive from "@/components/actualites-live";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Les dernières nouvelles de Climat Québec : candidatures, dossiers et mobilisations en vue de l'élection générale du 5 octobre 2026.",
  openGraph: {
    title: "Actualités · Climat Québec",
    description: "Les dernières nouvelles du mouvement Climat Québec.",
  },
};

export default function ActualitesPage() {
  return (
    <>
      <PageHero
        kicker="Actualités"
        titre="Le mouvement en marche."
        intro="Candidatures, dossiers et mobilisations : suivez l'actualité de Climat Québec vers le 5 octobre 2026."
      />

      <ActualitesLive />

      <CtaBanner />
    </>
  );
}
