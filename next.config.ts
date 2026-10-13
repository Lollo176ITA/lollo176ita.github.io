import type { NextConfig } from "next";

// GitHub Pages serve solo file statici: `output: "export"` genera `out/`.
// Cache Components (e quindi `ensureStatic`) e Partial Prefetching non sono
// compatibili con l'export in Next 16.4: la build fallisce con
// "PPR cannot be enabled in export mode".
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
