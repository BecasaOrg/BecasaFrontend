'use client'

import { useSearchParams } from 'next/navigation'
import Auth from './Auth'

/** Lee los parámetros de la URL (?camp=, ?redirect=) y abre el formulario correspondiente. */
export default function AuthPage({ mode }: { mode: 'registro' | 'ingresar' | 'datos' }) {
  const q = useSearchParams()
  const camp = q.get('camp') ?? (mode === 'datos' ? 'bucaramanga' : undefined)
  const raw = q.get('redirect') ?? ''
  // Solo rutas internas (evita redirecciones a otros sitios).
  const redirect = raw.startsWith('/') && !raw.startsWith('//') ? raw : undefined
  return <Auth key={mode + (camp ?? '')} mode={mode} camp={camp} redirect={redirect} googleError={q.get('error') === 'google'} />
}
