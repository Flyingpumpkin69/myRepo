import type { NextConfig } from "next";

const nextConfig: NextConfig = {
devIndicators:false,
output: 'export',  // <--- This is the magic line for free hosting
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
