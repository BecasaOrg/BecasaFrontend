import { NextResponse, type NextRequest } from 'next/server'

/** El tablero es privado: sin cookie de sesión, se va a ingresar. */
export function middleware(req: NextRequest) {
  if (req.cookies.get('auth_token')?.value) return NextResponse.next()
  const url = new URL('/becasa/login', req.url)
  url.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search)
  return NextResponse.redirect(url)
}

export const config = { matcher: ['/dashboard/:path*', '/dashboard'] }
