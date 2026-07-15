"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useTheme, useVersion } from "./providers";
import type { Version } from "@/data/content";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/vision", label: "Notre vision" },
  { href: "/priorites", label: "Nos priorités" },
  { href: "/dossiers", label: "Dossiers" },
  { href: "/candidats", label: "Candidats" },
  { href: "/agir", label: "Agir" },
  { href: "/actualites", label: "Actualités" },
];

function VersionSwitch() {
  const { version, setVersion } = useVersion();
  const options: { key: Version; short: string; full: string }[] = [
    { key: "nouvelle", short: "2026", full: "Nouvelle ligne 2026" },
    { key: "actuelle", short: "Actuelle", full: "Ligne actuelle" },
  ];
  return (
    <div
      className="inline-flex rounded-full border border-border bg-surface-2 p-0.5"
      role="group"
      aria-label="Sélecteur de ligne éditoriale"
      data-testid="version-switch"
    >
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => setVersion(o.key)}
          aria-pressed={version === o.key}
          title={o.full}
          data-testid={`version-${o.key}`}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            version === o.key
              ? "bg-primary text-primary-fg"
              : "text-muted hover:text-foreground"
          }`}
        >
          {o.short}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
      data-testid="theme-toggle"
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" aria-label="Climat Québec — accueil" data-testid="logo-link">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigation principale">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-${item.href === "/" ? "accueil" : item.href.slice(1)}`}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <VersionSwitch />
          </div>
          <ThemeToggle />
          <Link
            href="/agir"
            data-testid="cta-membre-header"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-fg shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            Devenir membre
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground xl:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            data-testid="menu-toggle"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-border bg-background xl:hidden" data-testid="mobile-menu">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4" aria-label="Navigation mobile">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-base font-medium ${
                    active ? "bg-surface-2 text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 flex items-center justify-between gap-3">
              <VersionSwitch />
              <Link
                href="/agir"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-fg"
              >
                Devenir membre
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
