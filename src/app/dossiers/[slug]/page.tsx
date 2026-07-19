import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDossierComplet, DOSSIERS_COMPLETS } from "@/data/dossiers-enrichis";
import { DossierDetail } from "@/components/dossier-detail";
import { CtaBanner } from "@/components/ui";
import { TemoignagesDossier } from "@/components/temoignages-dossier";

// ─────────────────────────────────────────────
// Génération statique des slugs
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  return DOSSIERS_COMPLETS.map((d) => ({ slug: d.slug }));
}

// ─────────────────────────────────────────────
// Métadonnées dynamiques
// ─────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const dossier = getDossierComplet(slug);
  if (!dossier) return { title: "Dossier introuvable" };
  return {
    title: `${dossier.titre} · Climat Québec`,
    description: dossier.contexteComplet.slice(0, 155) + "…",
    openGraph: {
      title: dossier.titre,
      description: dossier.contexteComplet.slice(0, 155) + "…",
    },
  };
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function DossierPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const dossier = getDossierComplet(slug);
  if (!dossier) notFound();

  return (
    <>
      {/* Fil d'Ariane */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-4 sm:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/dossiers" className="hover:text-foreground transition-colors">Dossiers</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground font-medium">{dossier.titre}</span>
          </nav>
        </div>
      </div>

      {/* Composant principal avec onglets */}
      <DossierDetail dossier={dossier} />

      {/* Témoignages citoyens liés à ce dossier */}
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <TemoignagesDossier slug={slug} />
      </div>

      <CtaBanner />
    </>
  );
}
