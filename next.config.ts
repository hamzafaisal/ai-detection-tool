import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['zctvrybhdzzmzrxbiqyg.supabase.co'],
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
    }
    return config;
  },
};

export default nextConfig;
