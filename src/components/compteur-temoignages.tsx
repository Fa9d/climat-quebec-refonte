"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}

export function CompteurTemoignages() {
  const [total, setTotal] = useState(0);
  const displayed = useCountUp(total);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("temoignages_publics")
        .select("id", { count: "exact", head: true });
      if (count !== null) setTotal(count);
    };
    fetchCount();

    const channel = supabase
      .channel("compteur-temoignages")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "temoignages",
          filter: "valide=eq.true",
        },
        () => {
          setTotal((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (total === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-surface-2 px-8 py-12 text-center ring-1 ring-border sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-6xl tabular-nums text-accent sm:text-7xl">
            {displayed.toLocaleString("fr-CA")}
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            {total === 1 ? "citoyen a témoigné" : "citoyens ont témoigné"}
          </p>
          <p className="mt-1 text-sm text-muted">
            Témoignages vérifiés, intégrés à nos dossiers.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <Link
            href="/temoignages"
            className="rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-surface"
          >
            Lire les témoignages →
          </Link>
          <Link
            href="/temoigner"
            className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            Témoigner maintenant
          </Link>
        </div>
      </div>
    </section>
  );
}
