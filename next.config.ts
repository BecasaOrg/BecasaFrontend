
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurado para Vercel (servidor completo, no exportación estática)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'athleticscholarshipagency.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://athleticscholarshipagency.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;