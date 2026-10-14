import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
