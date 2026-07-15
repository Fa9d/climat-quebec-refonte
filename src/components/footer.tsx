import Link from "next/link";
import { Logo } from "./logo";
import { PARTI } from "@/data/content";

const NAV = [
  { href: "/vision", label: "Notre vision" },
  { href: "/priorites", label: "Nos priorités" },
  { href: "/dossiers", label: "Dossiers locaux" },
  { href: "/candidats", label: "Candidats" },
  { href: "/agir", label: "Agir" },
  { href: "/actualites", label: "Actualités" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Le parti politique indépendantiste entièrement dédié à l&apos;urgence
            climatique et à la reprise du pouvoir citoyen.
          </p>
          <address className="mt-5 not-italic text-sm text-muted">
            Saint-Roch-de-Richelieu, Québec
          </address>
        </div>

        <nav aria-label="Liens du pied de page">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
            Naviguer
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-sm text-foreground/90 transition-colors hover:text-accent"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
            Le parti
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>Cheffe : {PARTI.cheffe}</li>
            <li>{PARTI.autorisation}</li>
            <li className="font-semibold text-foreground">
              {PARTI.prochaineElection}
            </li>
          </ul>
          <Link
            href="/agir"
            data-testid="cta-membre-footer"
            className="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-fg"
          >
            Devenir membre
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            {PARTI.autorisation} · {PARTI.prochaineElection}
          </p>
          <p>
            © {new Date().getFullYear()} {PARTI.nom}. Tous droits réservés.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-8 text-xs leading-relaxed text-muted/80 sm:px-8">
          Contenu et données : climat.quebec, Élections Québec, Léger, Assemblée
          nationale du Québec.
        </div>
      </div>
    </footer>
  );
}
