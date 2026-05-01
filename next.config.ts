
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Genera archivos HTML/CSS/JS puros para Netfirms
  output: 'export',
  
  images: {
    // 2. CRUCIAL: Desactiva la optimización automática porque requiere Node.js.
    // Esto permitirá que las etiquetas <Image> funcionen como <img> normales.
    unoptimized: true, 
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // He añadido este porque es tu dominio de la API
      {
        protocol: 'https',
        hostname: 'athleticscholarshipagency.com',
      },
    ],
  },
};

export default nextConfig;