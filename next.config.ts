import type { NextConfig } from "next";

// BASE_PATH : /climat en prod/Vercel, vide en dev local
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/climat";
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  basePath: isDev ? "" : basePath,
  assetPrefix: isDev ? "" : basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isDev ? "" : basePath,
  },
};

export default nextConfig;
