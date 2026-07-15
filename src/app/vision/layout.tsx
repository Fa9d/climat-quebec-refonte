import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre vision",
  description:
    "La vision de Climat Québec : reprendre nos pouvoirs pour protéger notre monde. Texte fondateur, messages porteurs et discours de campagne 2026.",
  openGraph: {
    title: "Notre vision · Climat Québec",
    description: "Reprendre nos pouvoirs pour protéger notre monde.",
  },
};

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
