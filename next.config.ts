import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this folder so edits always recompile
  // (the parent "next js" directory holds sibling projects + lockfiles).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
