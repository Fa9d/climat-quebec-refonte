import type { NextConfig } from "next";

// DEPLOY_TARGET=static -> build statique pour VPS (génère out/)
// NODE_ENV=development -> dev local sans basePath
// sinon -> Vercel dynamic
const isStatic = process.env.DEPLOY_TARGET === "static";
const isDev    = process.env.NODE_ENV === "development";
const basePath = "/climat";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" } : {}),
  basePath: isDev ? "" : basePath,
  assetPrefix: isDev ? "" : basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isDev ? "" : basePath,
  },
};

export default nextConfig;
