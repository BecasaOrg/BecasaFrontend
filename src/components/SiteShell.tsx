'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import Band from './Band'
import BackToTop from './BackToTop'
import WhatsAppFab from './WhatsAppFab'
import CookieBanner from './CookieBanner'
import { initReveal } from '../lib/reveal'
import { applySeo } from '../lib/seo'
import { auth, setRouter } from '../lib/app'
import { camps } from '../data/becasa'

const BAND = ['/becasa/crea-tu-perfil', '/becasa/login', '/becasa/registrate']
const HERO = ['/', '/nuestra-historia', '/servicios', '/becasa', ...camps.map(c => `/becasa/${c.slug}`)]

/** Estructura común: header, footer, botones flotantes, aviso de cookies y animaciones de entrada. */
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const band = BAND.includes(pathname)
  const solid = band || !HERO.includes(pathname)

  useEffect(() => { setRouter(router) }, [router])
  useEffect(() => { auth.refresh() }, [])

  // Animaciones de entrada, título/descripción y ancla (#seccion) en cada cambio de página.
  useEffect(() => {
    applySeo(pathname)
    const stop = initReveal(document.getElementById('main') ?? document.body)
    const anchor = window.location.hash.slice(1)
    const t = anchor ? setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 350) : undefined
    return () => { stop?.(); if (t) clearTimeout(t) }
  }, [pathname])

  // Los enlaces internos (<a href="/...">) navegan sin recargar la página.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest?.('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      const url = new URL(href, window.location.origin)
      if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return // ancla en la misma página
      e.preventDefault()
      router.push(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  return (
    <>
      <a href="#main" className="sr-only" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus() }}>Saltar al contenido</a>
      <Header solid={solid} />
      <div className={band ? 'band-scene' : undefined}>
        {band && <Band />}
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer band={!band} />
      </div>
      <BackToTop />
      <WhatsAppFab />
      <CookieBanner />
    </>
  )
}
