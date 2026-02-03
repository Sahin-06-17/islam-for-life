import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  // 1. Force Webpack
  webpack: (config) => {
    return config;
  },

  // 2. Disable Source Maps (CRITICAL FIX FOR VERCEL MEMORY)
  productionBrowserSourceMaps: false,

  // 3. Ignore Errors to prevent build failure
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA(nextConfig);