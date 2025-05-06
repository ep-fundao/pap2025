import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useLightningcss: false, // Desativa lightningcss
    // turbopack: false, // Descomente apenas se o erro persistir
  },
};

export default nextConfig;