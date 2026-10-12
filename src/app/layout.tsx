import type { Metadata, Viewport } from 'next'
// Respaldo web de Acumin (ASA): Barlow empaquetada localmente.
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
import '@fontsource/barlow-condensed/latin-900.css'
import '@fontsource/barlow-condensed/latin-800-italic.css'
import '@fontsource/barlow-condensed/latin-900-italic.css'
import '@fontsource/barlow/latin-400.css'
import '@fontsource/barlow/latin-500.css'
import '@fontsource/barlow/latin-600.css'
import '@fontsource/barlow/latin-700.css'
import '@fontsource/barlow/latin-800.css'
import '@/styles/global.css'
import SiteShell from '@/components/SiteShell'

const SITE = 'https://www.athleticsa.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Athletic Scholarship Agency · Becas deportivo-académicas en EE. UU.',
  description: 'ASA: mentoría deportivo-académica fase por fase para estudiantes-atletas latinoamericanos. Diagnóstico gratuito, BECASA Camp y mentoría durante la universidad.',
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
  openGraph: {
    title: 'Athletic Scholarship Agency · No es solo el sueño. Es el plan.',
    description: 'Mentoría deportivo-académica para que atletas latinos y sus familias lleguen con un plan real a una beca en Estados Unidos. Diagnóstico gratuito.',
    type: 'website',
    images: ['/img/historias/santiago-accion.webp'],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#010423', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
