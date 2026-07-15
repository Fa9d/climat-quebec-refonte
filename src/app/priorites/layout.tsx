import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos priorités",
  description:
    "Le programme de Climat Québec, priorité par priorité : eau et santé, énergie publique, transport collectif, agriculture et forêts, République et démocratie.",
  openGraph: {
    title: "Nos priorités · Climat Québec",
    description: "Un programme clair pour un Québec debout.",
  },
};

export default function PrioritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
