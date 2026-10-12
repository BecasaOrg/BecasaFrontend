import { useSyncExternalStore } from 'react'
import type { Camp, PriceTier } from '../data/becasa'
import { camps } from '../data/becasa'
import type { ApiCamp, ApiRegistration } from './types'
import { getSession, logout as logoutAction } from '../app/actions'

/* ============================================================
   Navegación y sesión del sitio.
   - `go(path)` navega con el router de Next.js (lo registra SiteShell).
   - La sesión viene del backend (cookie httpOnly) a través de getSession().
   ============================================================ */

type Router = { push: (href: string) => void }
let router: Router | null = null
export const setRouter = (r: Router) => { router = r }
export const go = (path: string) => { if (router) router.push(path); else if (typeof window !== 'undefined') window.location.assign(path) }

/** Perfil del atleta tal como lo usa la interfaz. Se arma con los datos del backend. */
export type Athlete = {
  id?: number
  firstName: string; lastName: string; email: string; sport: string; country: string; city: string
  birth: string; phone: string; gender?: string; gradYear?: string; photo?: string
  // Datos de evento: se toman de la última inscripción para no volver a pedirlos.
  documento?: string; experiencia?: string; posicion?: string[]; nivel?: string; talla?: string
  club?: string; colegio?: string; eps?: string; alimentacion?: string; medica?: string
  acudiente?: string; acudienteTel?: string; acudienteMail?: string; comentarios?: string
  /** Slugs de los campamentos del sitio en los que está inscrito. */
  registrations: string[]
  /** Inscripciones tal como las devuelve el backend (estado de pago, valor, cuotas). */
  apiRegistrations: ApiRegistration[]
  badges: { event: string; year: string; city: string }[]
  badgeRequests?: { event: string; file: string; status: 'review' | 'rejected'; sent: string }[]
  done: Record<string, boolean>
  files: Record<string, string>
  showcase?: boolean
}

export const GENDER_TO_API: Record<string, 'M' | 'F' | 'Other'> = { Femenino: 'F', Masculino: 'M', 'Prefiero no decir': 'Other' }
const GENDER_FROM_API: Record<string, string> = { F: 'Femenino', M: 'Masculino', Other: 'Prefiero no decir' }
/** Niveles del evento de voleibol → valores del enum en base de datos. */
export const LEVEL_TO_API: Record<string, string> = {
  '1 - Principiante (Nuevo en el Voleibol y quiero seguir aprendiendo)': '1_principiante',
  '2 - Básico (En desarrollo y con fundamentos básicos)': '2_basico',
  '3 - Intermedio (Ya he competido en varios eventos de nivel)': '3_intermedio',
  '4 - Competitivo (Jugador experimentado y de los mejores en mi club)': '4_competitivo',
  '5 - Jugador de Liga/Selección Departamental': '5_liga',
  '6 - Jugador de Selección Nacional': '6_seleccion',
  'Formativo / escolar': '1_principiante',
  'Club / liga': '3_intermedio',
  'Departamental': '5_liga',
  'Selección nacional': '6_seleccion',
}

/* ---------- Relación campamento del sitio ↔ campamento del backend ---------- */
const norm = (s?: string | null) => (s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
const envIds: Record<string, number> = Object.fromEntries(
  (process.env.NEXT_PUBLIC_CAMP_IDS ?? '').split(',').map(x => x.split(':').map(s => s.trim())).filter(([k, v]) => k && Number(v)).map(([k, v]) => [k, Number(v)]),
)
/** Devuelve el slug del sitio para un campamento del backend (por NEXT_PUBLIC_CAMP_IDS o por ciudad/nombre). */
export function slugForApiCamp(c: { id: number; name?: string | null; city?: { name: string } | null } | null | undefined): string | undefined {
  if (!c) return undefined
  const byEnv = Object.entries(envIds).find(([, id]) => id === Number(c.id))
  if (byEnv) return byEnv[0]
  return camps.find(x => norm(c.city?.name) === norm(x.city) || norm(c.name).includes(norm(x.city)))?.slug
}
/** Busca el campamento del backend que corresponde a un slug del sitio. */
export function apiCampFor(slug: string, list: ApiCamp[]): ApiCamp | undefined {
  if (envIds[slug]) return list.find(c => Number(c.id) === envIds[slug])
  return list.find(c => slugForApiCamp(c) === slug)
}

/* ---------- Sesión ---------- */
type State = { user: Athlete | null; loaded: boolean }
let state: State = { user: null, loaded: false }
const subs = new Set<() => void>()
const emit = (s: State) => { state = s; subs.forEach(f => f()) }
const subscribe = (cb: () => void) => { subs.add(cb); return () => { subs.delete(cb) } }
const SERVER: State = { user: null, loaded: false }

function toAthlete(s: NonNullable<Awaited<ReturnType<typeof getSession>>>): Athlete {
  const u = s.user
  const regs = [...s.registrations].sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
  const last = regs[0]
  const str = (v: unknown) => (v === null || v === undefined || v === '' ? undefined : String(v))
  const levelLabel = last?.skill_level ? Object.entries(LEVEL_TO_API).find(([, v]) => v === last.skill_level)?.[0] : undefined
  return {
    id: u.id,
    firstName: u.name ?? '', lastName: u.last_name ?? '', email: u.email ?? '', sport: u.sport ?? '',
    country: s.country ?? '', city: s.city ?? '', birth: (u.birth_date ?? '').slice(0, 10), phone: u.phone ?? '',
    gender: u.gender ? GENDER_FROM_API[u.gender] : undefined, gradYear: str(u.graduation_year), photo: u.avatar ?? undefined,
    documento: str(last?.identification_number), experiencia: str(last?.years_experience),
    posicion: last?.position ? last.position.split(',').map(x => x.trim()).filter(Boolean) : undefined,
    nivel: levelLabel, talla: str(last?.shirt_size), club: str(last?.club_name), colegio: str(last?.school_name),
    // El certificado de EPS se pide en cada inscripción (el backend lo guarda por inscripción).
    eps: undefined,
    medica: str(last?.medical_conditions ?? last?.dietary_restrictions),
    acudiente: str(last?.guardian_name), acudienteTel: str(last?.guardian_phone), acudienteMail: str(last?.guardian_email),
    registrations: regs.map(r => slugForApiCamp(r.camp ?? { id: r.camp_id })).filter((x): x is string => !!x),
    apiRegistrations: regs,
    badges: [], done: {}, files: {},
  }
}

export const auth = {
  get: () => state.user,
  /** Vuelve a leer la sesión del backend. */
  refresh: async () => {
    try {
      const s = await getSession()
      emit({ user: s ? toAthlete(s) : null, loaded: true })
    } catch {
      emit({ user: null, loaded: true })
    }
    return state.user
  },
  /** `auth.set(null)` cierra la sesión. */
  set: (a: Athlete | null) => {
    if (a === null) { emit({ user: null, loaded: true }); logoutAction().catch(() => {}) }
    else emit({ user: a, loaded: true })
  },
  /** Cambios solo locales (funciones del tablero que aún no tienen backend). */
  patch: (p: Partial<Athlete>) => { if (state.user) emit({ ...state, user: { ...state.user, ...p } }) },
}

export function useSession() {
  return useSyncExternalStore(subscribe, () => state.user, () => SERVER.user)
}
export function useSessionLoaded() {
  return useSyncExternalStore(subscribe, () => state.loaded, () => SERVER.loaded)
}

/* ---------- Estado de precios e inscripciones por fecha ---------- */
const d = (s: string) => new Date(s + 'T00:00:00-05:00')
const endOf = (s: string) => new Date(s + 'T23:59:59-05:00')
export const today = () => new Date()

export type TierState = 'upcoming' | 'active' | 'closed'
export const tierState = (t: PriceTier, now = today()): TierState => (now < d(t.from) ? 'upcoming' : now > endOf(t.to) ? 'closed' : 'active')

export type CampStatus = { kind: 'soon' | 'open' | 'closed' | 'done'; label: string; tier?: PriceTier }
export function campStatus(c: Camp, now = today()): CampStatus {
  if (now > endOf(c.dates.end)) return { kind: 'done', label: 'Finalizado' }
  if (now < d(c.registration.opens)) {
    const opens = d(c.registration.opens).toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })
    return { kind: 'soon', label: `Inscripciones desde el ${opens}`, tier: c.prices[0] }
  }
  if (now > endOf(c.registration.closes)) return { kind: 'closed', label: 'Inscripciones cerradas' }
  const tier = c.prices.find(t => tierState(t, now) === 'active') ?? c.prices[c.prices.length - 1]
  return { kind: 'open', label: `Inscripciones abiertas · ${tier.name}`, tier }
}

export function daysUntil(dateStr: string, now = today()) {
  return Math.max(0, Math.ceil((d(dateStr).getTime() - now.getTime()) / 86400000))
}
