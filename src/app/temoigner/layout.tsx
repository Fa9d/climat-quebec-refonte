import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Témoigner · Climat Québec",
  description:
    "Soumettez votre observation ou témoignage en lien avec un dossier de Climat Québec. Chaque fait documenté renforce notre dossier contre les projets incompatibles avec notre communauté.",
  openGraph: {
    title: "Témoigner · Climat Québec",
    description:
      "Votre observation compte. Décrivez ce que vous avez vu, entendu ou vécu.",
  },
};

export default function TemoignerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
