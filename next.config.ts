import type { NextConfig } from "next";

// Le site est destiné à être servi sous le sous-chemin /climat sur fa9.quebec.
// On active basePath + export statique uniquement pour le build de déploiement,
// en posant DEPLOY_TARGET=static-climat. Le `npm run dev` local reste à la racine.
const isStaticClimat = process.env.DEPLOY_TARGET === "static-climat";
const basePath = process.env.BASE_PATH ?? "/climat";

const nextConfig: NextConfig = isStaticClimat
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_BASE_PATH: basePath },
    }
  : {
      /* config de développement (racine) */
      env: { NEXT_PUBLIC_BASE_PATH: "" },
    };

export default nextConfig;
