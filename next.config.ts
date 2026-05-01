import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: 'https://athleticscholarshipagency.com/api/:path*',
  //       destination: 'https://athleticscholarshipagency.comhttps://athleticscholarshipagency.com/api/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;