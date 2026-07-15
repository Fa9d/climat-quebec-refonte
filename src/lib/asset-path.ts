// Préfixe les chemins d'assets statiques (images, etc.) avec le basePath
// de déploiement lorsqu'il est défini. Next.js préfixe automatiquement les
// liens `next/link` et les assets internes, mais PAS les chemins d'images
// codés en dur dans les données ou le JSX. Ce helper comble cet écart.
//
// En développement (racine), NEXT_PUBLIC_BASE_PATH est vide -> aucun préfixe.
// En build de déploiement, on l'expose via next.config (env) = "/climat".

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
