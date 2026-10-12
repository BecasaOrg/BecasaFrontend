import type { NextConfig } from 'next'

const API_ORIGIN = 'https://athleticscholarshipagency.com'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  async rewrites() {
    return [
      // Archivos públicos del backend (avatares, etc.)
      { source: '/storage/:path*', destination: `${API_ORIGIN}/storage/:path*` },
    ]
  },
  async redirects() {
    return [
      // URLs del sitio anterior → nuevas rutas
      { source: '/becasa/informacion', destination: '/becasa/bucaramanga', permanent: false },
      { source: '/dashboard/perfil', destination: '/dashboard?tab=perfil', permanent: false },
      { source: '/disciplinas', destination: '/servicios', permanent: false },
      { source: '/unete', destination: '/servicios', permanent: false },
      { source: '/campamento/:slug', destination: '/becasa/:slug', permanent: false },
      { source: '/registro', destination: '/becasa/crea-tu-perfil', permanent: false },
      { source: '/ingresar', destination: '/becasa/login', permanent: false },
      { source: '/inscripcion', destination: '/becasa/registrate', permanent: false },
      { source: '/tablero', destination: '/dashboard', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
