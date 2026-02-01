import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ ignores TS errors in prod
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ ignores ESLint errors in prod
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pqzjdqxjsamhzuwqpwtj.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
