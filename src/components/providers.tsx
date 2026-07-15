"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CONTENT, type Version, type VersionContent } from "@/data/content";

/* ---------------------------------------------------------------------------
   Contexte de VERSION de contenu (2 lignes éditoriales)
   State React uniquement — jamais de localStorage. Défaut = "nouvelle".
   --------------------------------------------------------------------------- */

interface VersionCtx {
  version: Version;
  setVersion: (v: Version) => void;
  content: VersionContent;
}

const VersionContext = createContext<VersionCtx | null>(null);

export function ContentVersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<Version>("nouvelle");
  const value = useMemo(
    () => ({ version, setVersion, content: CONTENT[version] }),
    [version]
  );
  return (
    <VersionContext.Provider value={value}>{children}</VersionContext.Provider>
  );
}

export function useVersion(): VersionCtx {
  const ctx = useContext(VersionContext);
  if (!ctx)
    throw new Error("useVersion doit être utilisé dans ContentVersionProvider");
  return ctx;
}

/* ---------------------------------------------------------------------------
   Contexte de THÈME (clair / sombre)
   Défaut = préférence système (matchMedia), override par state. Pas de storage.
   --------------------------------------------------------------------------- */

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [overridden, setOverridden] = useState(false);

  // Suivre la préférence système tant que l'utilisateur n'a pas basculé.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (!overridden) setTheme(mq.matches ? "dark" : "light");
    const onChange = (e: MediaQueryListEvent) => {
      if (!overridden) setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [overridden]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      toggleTheme: () => {
        setOverridden(true);
        setTheme((t) => (t === "dark" ? "light" : "dark"));
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans ThemeProvider");
  return ctx;
}

/* Provider combiné pour envelopper l'app dans le layout. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ContentVersionProvider>{children}</ContentVersionProvider>
    </ThemeProvider>
  );
}
