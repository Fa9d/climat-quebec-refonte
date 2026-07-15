import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agir",
  description:
    "Passez à l'action avec Climat Québec : devenir membre, faire un don, rejoindre une lutte locale ou proposer une candidature pour le 5 octobre 2026.",
  openGraph: {
    title: "Agir · Climat Québec",
    description: "Le pouvoir citoyen est plus fort que l'argent.",
  },
};

export default function AgirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
