import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* You are adding the code below into this object */
  experimental: {
    cacheComponents: true, // Enables 'use cache' and PPR in Next.js 16/2026
  },
};

export default nextConfig;
