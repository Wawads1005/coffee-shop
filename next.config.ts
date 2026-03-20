import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: {
    compilationMode: "annotation",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
