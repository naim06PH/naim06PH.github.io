import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — generates a fully static site in `out/`,
  // perfect for GitHub Pages, Cloudflare Pages, S3, etc.
  output: "export",

  // GitHub Pages serves directories with trailing slashes.
  trailingSlash: true,

  // `next/image` optimizer is a runtime — disable for static export.
  images: { unoptimized: true },

  // Hide the Next.js dev indicator badge (only visible in `next dev`).
  devIndicators: false,
};

export default nextConfig;
