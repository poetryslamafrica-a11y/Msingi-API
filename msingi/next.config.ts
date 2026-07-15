import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
  experimental: {
    // PPR/typed routes can be enabled once on stable Next 15
  },
};

export default nextConfig;
