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

  // 2. Ignore Typescript errors (Keep this)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // REMOVED "eslint" block to fix the error
};

export default withPWA(nextConfig);