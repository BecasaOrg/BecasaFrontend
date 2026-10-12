import { NextResponse, type NextRequest } from 'next/server'

/** Regreso del inicio de sesión con Google (el backend redirige aquí con ?token=).
 *  Guarda el token en la cookie httpOnly y lo quita de la URL. */
export function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const res = NextResponse.redirect(new URL(token ? '/dashboard' : '/becasa/login?error=google', req.url))
  if (token && /^[\w|.-]{20,200}$/.test(token)) {
    res.cookies.set('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 })
  }
  res.headers.set('Referrer-Policy', 'no-referrer')
  return res
}
