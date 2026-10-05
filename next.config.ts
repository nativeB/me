import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the hero screenshot is the largest paint, so every KB counts.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
