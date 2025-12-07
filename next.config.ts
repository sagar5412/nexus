import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // experimental: {
  //   ppr: "incremental",
  // },
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
