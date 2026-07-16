import type { Metadata } from "next";

/* Document interne : la page /analyse ne doit jamais être indexée par les
   moteurs de recherche ni apparaître dans les aperçus sociaux. */
export const metadata: Metadata = {
  title: "Analyse du discours politique (interne)",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AnalyseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
