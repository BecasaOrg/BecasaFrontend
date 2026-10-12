'use server'

/* ============================================================
   Acciones del servidor: único punto de contacto con el backend.
   - El token de sesión vive en la cookie httpOnly `auth_token`
     (el navegador nunca lo ve ni lo guarda en localStorage).
   - Los montos a pagar se calculan aquí, a partir de la inscripción
     guardada en el backend, no con datos que mande el navegador.
   ============================================================ */

import { cookies } from 'next/headers'
import type { ApiCamp, ApiPlace, ApiRegistration, ApiUser, Coupon, Result } from '@/lib/types'

const API = (process.env.API_URL || 'https://athleticscholarshipagency.com/api').replace(/\/$/, '')
const COOKIE = 'auth_token'
const WEEK = 60 * 60 * 24 * 7

async function token() {
  return (await cookies()).get(COOKIE)?.value
}

async function setToken(value: string) {
  ;(await cookies()).set(COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: WEEK,
  })
}

async function clearToken() {
  ;(await cookies()).delete(COOKIE)
}

type ApiResponse<T> = { ok: boolean; status: number; data: T }

async function api<T = unknown>(path: string, init: { method?: string; json?: unknown; form?: FormData; auth?: boolean; revalidate?: number } = {}): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  const t = init.auth === false ? undefined : await token()
  if (t) headers.Authorization = `Bearer ${t}`
  let body: BodyInit | undefined
  if (init.json !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(init.json) }
  else if (init.form) body = init.form
  const res = await fetch(`${API}${path}`, {
    method: init.method ?? 'GET',
    headers,
    body,
    ...(init.revalidate !== undefined && !t ? { next: { revalidate: init.revalidate } } : { cache: 'no-store' as const }),
  })
  let data: unknown = null
  try { data = await res.json() } catch { /* respuesta sin JSON */ }
  if (res.status === 401 && t) await clearToken().catch(() => {})
  return { ok: res.ok, status: res.status, data: data as T }
}

/** Convierte los errores de validación de Laravel ({ errors: { campo: [msg] } }) a { idDelCampo: msg }. */
function fieldErrors(data: unknown, map: Record<string, string>): Record<string, string> | undefined {
  const errs = (data as { errors?: Record<string, string[]> } | null)?.errors
  if (!errs) return undefined
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(errs)) out[map[k] ?? k] = traducir(Array.isArray(v) ? v[0] : String(v))
  return out
}

/** Traducciones de los mensajes en inglés más comunes de Laravel. */
function traducir(msg: string) {
  if (/has already been taken/i.test(msg)) return 'Ya existe una cuenta con este dato.'
  if (/is required/i.test(msg)) return 'Este campo es obligatorio.'
  if (/must be a valid email/i.test(msg)) return 'Revisa el formato del correo.'
  if (/confirmation does not match/i.test(msg)) return 'Las contraseñas no coinciden.'
  if (/must be at least 8/i.test(msg)) return 'Usa al menos 8 caracteres.'
  if (/must be a date before today/i.test(msg)) return 'La fecha debe ser anterior a hoy.'
  if (/selected .* is invalid/i.test(msg)) return 'El valor seleccionado no es válido.'
  if (/must be a file of type/i.test(msg)) return 'El archivo debe ser PDF, JPG o PNG.'
  if (/may not be greater than|must not be greater than/i.test(msg)) return 'El archivo o el texto es demasiado grande.'
  return msg
}

const msgOf = (data: unknown, fallback: string) => {
  const d = data as { message?: string; error?: string } | null
  return traducir(d?.message || d?.error || fallback)
}

/* ---------------- Sesión ---------------- */

export type SessionData = { user: ApiUser; country?: string; city?: string; registrations: ApiRegistration[] }

export async function getSession(): Promise<SessionData | null> {
  if (!(await token())) return null
  const me = await api<ApiUser>('/user')
  if (!me.ok || !me.data?.id) return null
  const user = me.data
  let country: string | undefined
  let city: string | undefined
  if (user.birth_country_id) {
    const c = await api<{ name: string; states?: { cities?: ApiPlace[] }[] }>(`/countries/${user.birth_country_id}`, { auth: false, revalidate: 86400 })
    if (c.ok) {
      country = c.data?.name
      if (user.city_id) city = c.data?.states?.flatMap(s => s.cities ?? []).find(x => x.id === user.city_id)?.name
    }
  }
  return { user, country, city, registrations: await myRegistrations(user.id) }
}

async function myRegistrations(userId: number): Promise<ApiRegistration[]> {
  // El backend devuelve todas las inscripciones: se filtran aquí por usuario
  // (ver nota de seguridad del backend en el PR).
  const r = await api<{ data?: ApiRegistration[] }>('/registrations')
  if (!r.ok) return []
  return (r.data?.data ?? []).filter(x => Number(x.user_id) === Number(userId))
}

export async function login(email: string, password: string): Promise<Result> {
  const r = await api<{ token?: string; message?: string }>('/login', { method: 'POST', json: { email, password }, auth: false })
  if (r.ok && r.data?.token) { await setToken(r.data.token); return { ok: true } }
  if (r.status === 401) return { ok: false, error: 'Correo o contraseña incorrectos.' }
  return { ok: false, error: msgOf(r.data, 'No pudimos iniciar sesión. Intenta de nuevo.'), fields: fieldErrors(r.data, { email: 'correo', password: 'pass' }) }
}

export type RegisterInput = {
  name: string; last_name: string; email: string; password: string; password_confirmation: string
  birth_date: string; birth_country_id: number; city_id: number; sport: string; phone: string
  gender: 'M' | 'F' | 'Other'; graduation_year: number
}

export async function register(input: RegisterInput): Promise<Result> {
  const r = await api<{ token?: string }>('/register', { method: 'POST', json: { ...input, role: undefined }, auth: false })
  if (r.ok && r.data?.token) { await setToken(r.data.token); return { ok: true } }
  return {
    ok: false,
    error: msgOf(r.data, 'No pudimos crear tu perfil. Intenta de nuevo.'),
    fields: fieldErrors(r.data, {
      name: 'nombres', last_name: 'apellidos', email: 'correo', password: 'pass', birth_date: 'nacimiento',
      birth_country_id: 'pais', city_id: 'ciudad', sport: 'deporte', phone: 'whatsapp', gender: 'genero', graduation_year: 'graduacion',
    }),
  }
}

export async function logout(): Promise<void> {
  if (await token()) await api('/logout', { method: 'POST' }).catch(() => {})
  await clearToken()
}

export async function updateProfile(form: FormData): Promise<Result> {
  if (!(await token())) return { ok: false, error: 'Tu sesión terminó. Ingresa de nuevo.' }
  const r = await api('/user', { method: 'POST', form })
  if (r.ok) return { ok: true }
  return { ok: false, error: msgOf(r.data, 'No pudimos guardar los cambios.') }
}

/* ---------------- Ubicaciones ---------------- */

const list = (d: unknown): ApiPlace[] => (Array.isArray(d) ? d : Array.isArray((d as { data?: unknown })?.data) ? (d as { data: ApiPlace[] }).data : [])

export async function getCountries(): Promise<ApiPlace[]> {
  return list((await api('/countries', { auth: false, revalidate: 86400 })).data)
}
export async function getStates(countryId: number): Promise<ApiPlace[]> {
  return list((await api(`/countries/${Number(countryId)}/states`, { auth: false, revalidate: 86400 })).data)
}
export async function getCities(stateId: number): Promise<ApiPlace[]> {
  return list((await api(`/states/${Number(stateId)}/cities`, { auth: false, revalidate: 86400 })).data)
}

/* ---------------- Campamentos ---------------- */

export async function getApiCamps(): Promise<ApiCamp[]> {
  const r = await api<{ data?: ApiCamp[] } | ApiCamp[]>('/camps', { revalidate: 300 })
  if (!r.ok) return []
  return Array.isArray(r.data) ? r.data : r.data?.data ?? []
}

/* ---------------- Inscripción a un campamento ---------------- */

export async function checkCoupon(code: string): Promise<Result<Coupon>> {
  if (!(await token())) return { ok: false, error: 'Ingresa para validar el código.' }
  const r = await api<{ success?: boolean; data?: Coupon; message?: string }>('/discounts', { method: 'POST', json: { code: code.trim() } })
  if (r.status === 404) return { ok: false, error: 'Código no encontrado.' }
  if (!r.ok || r.data?.success === false) return { ok: false, error: msgOf(r.data, 'Código no disponible.') }
  const coupon = (r.data?.data ?? r.data) as Coupon
  return { ok: true, data: coupon }
}

export type RegistrationResult = { checkoutUrl?: string; registrationId?: number }

export async function registerToCamp(form: FormData): Promise<Result<RegistrationResult>> {
  const session = await getSession()
  if (!session) return { ok: false, error: 'Tu sesión terminó. Ingresa de nuevo.' }
  // El usuario sale de la sesión, nunca del formulario.
  form.set('user_id', String(session.user.id))
  const file = form.get('health_insurance_path')
  if (file instanceof File && file.size === 0) form.delete('health_insurance_path')
  for (const k of ['discount_code', 'club_name', 'dietary_restrictions', 'medical_conditions']) if (form.get(k) === '') form.delete(k)
  const r = await api<{ success?: boolean; data?: { id?: number }; checkout_url?: string; message?: string }>('/registrations', { method: 'POST', form })
  if (r.ok && r.data?.success !== false) {
    return { ok: true, data: { checkoutUrl: r.data?.checkout_url, registrationId: r.data?.data?.id } }
  }
  return {
    ok: false,
    error: msgOf(r.data, 'No pudimos completar la inscripción.'),
    fields: fieldErrors(r.data, {
      identification_number: 'documento', years_experience: 'experiencia', position: 'posicion', skill_level: 'nivel',
      shirt_size: 'talla', club_name: 'club', school_name: 'colegio', health_insurance_path: 'eps', medical_conditions: 'medica',
      dietary_restrictions: 'medica', guardian_name: 'acudiente', guardian_phone: 'acudienteTel', guardian_email: 'acudienteMail',
      discount_code: 'cupon', installments_count: 'cupon',
    }),
  }
}

/* ---------------- Pago con tarjeta (Card Payment Brick) ---------------- */

export type CardPayment = {
  registrationId: number
  token: string
  paymentMethodId?: string
  issuerId?: string | number
  payer: { email: string; identification: { type: string; number: string } }
}

export async function payInstallment(p: CardPayment): Promise<Result<{ status: string; detail?: string }>> {
  const session = await getSession()
  if (!session) return { ok: false, error: 'Tu sesión terminó. Ingresa de nuevo.' }
  const reg = session.registrations.find(r => r.id === Number(p.registrationId))
  if (!reg) return { ok: false, error: 'No encontramos esta inscripción en tu cuenta.' }
  if (reg.payment_status === 'paid') return { ok: false, error: 'Esta inscripción ya está pagada.' }
  const total = Number(reg.total_price ?? reg.camp?.price ?? 0)
  const cuotas = Math.max(1, Number(reg.installments_count ?? 1))
  const amount = Math.round((total / cuotas) * 100) / 100
  if (!(amount > 0)) return { ok: false, error: 'No pudimos calcular el valor a pagar. Escríbenos por WhatsApp.' }
  const r = await api<{ success?: boolean; status?: string; detail?: string; message?: string }>('/payments/process-card', {
    method: 'POST',
    json: {
      token: p.token,
      transaction_amount: amount,
      description: `Inscripción: ${reg.camp?.name ?? 'BECASA Camp'}${cuotas > 1 ? ' (cuota)' : ''}`,
      installments: 1,
      payer: p.payer,
      registration_id: reg.id,
      camp_id: reg.camp_id,
    },
  })
  if (r.ok && r.data?.success) return { ok: true, data: { status: r.data.status ?? 'unknown', detail: r.data.detail } }
  return { ok: false, error: msgOf(r.data, 'No pudimos procesar el pago.') }
}
