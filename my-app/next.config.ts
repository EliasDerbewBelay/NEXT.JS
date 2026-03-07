import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript : {
  ignoreBuildErrors: true,
  },
  cacheComponents: true,
  images: {
    /**
     * Use the Cloudinary loader so Next.js generates transformation URLs
     * directly rather than proxying images through its own optimizer.
     * This eliminates the "upstream image response timed out" error.
     */
    loaderFile: "./lib/cloudinary-loader.ts",
  },
};

export default nextConfig;
