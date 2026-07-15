/* Marque géométrique Climat Québec : un « Q » ouvert dont la queue devient
   une feuille / pousse — évoque le territoire, la croissance et le Québec.
   Monochrome via currentColor ; l'accent (feuille) prend la couleur militante. */

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      role="img"
      aria-label="Climat Québec"
    >
      {/* Cercle ouvert (le territoire / la République) */}
      <path
        d="M24 5.5c10.2 0 18.5 8.3 18.5 18.5S34.2 42.5 24 42.5 5.5 34.2 5.5 24 13.8 5.5 24 5.5Z"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="94 22"
        strokeDashoffset="6"
      />
      {/* Pousse / feuille militante */}
      <path
        d="M24 33c0-6 3.6-10.4 9.6-12.2C33.1 27 29.4 31 24 33Z"
        fill="var(--accent, #2fbf71)"
      />
      <path
        d="M24 33V22"
        stroke="var(--accent, #2fbf71)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 text-primary shrink-0" />
      <span className="font-display text-[1.35rem] leading-none tracking-tight text-foreground">
        Climat<span className="text-accent">·</span>Québec
      </span>
    </span>
  );
}
