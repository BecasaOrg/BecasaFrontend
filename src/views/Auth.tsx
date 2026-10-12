'use client'

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import s from './Auth.module.css'
import { Button, Modal, LinkButton } from '../components/ui/ui'
import { TermsModal } from '../components/TextModals'
import { camps, img, sports } from '../data/becasa'
import { auth, go, campStatus, useSession, useSessionLoaded, apiCampFor, GENDER_TO_API, LEVEL_TO_API, type Athlete } from '../lib/app'
import { login, register, getCountries, getStates, getCities, getApiCamps, registerToCamp, checkCoupon } from '../app/actions'
import type { ApiCamp, ApiPlace, Coupon } from '../lib/types'

type Mode = 'registro' | 'ingresar' | 'datos'
type Errors = Record<string, string>

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const age = (iso: string) => { const b = new Date(iso); const n = new Date(); let a = n.getFullYear() - b.getFullYear(); if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) a--; return a }
/** Mensaje de confirmación (Notion ENT-000). */
const WA_CHANNEL_SANTANDER = 'https://whatsapp.com/channel/0029VbDzTLuBFLgYwmKY1B3Q'
const bring = [
  'Uniforme o ropa deportiva cómoda para los entrenamientos.',
  'Zapatillas deportivas apropiadas.',
  'Rodilleras, muñequeras, tobilleras u otro soporte que uses regularmente.',
  'Sudadera o chaqueta ligera (en caso de frío o lluvia).',
  'Documento de identidad.',
  'Carné de EPS o certificado de afiliación (obligatorio).',
  'Al menos una pregunta para los entrenadores o el staff ASA. ¡Queremos que nos conozcas así como nosotros queremos conocerte!',
]
const years = Array.from({ length: 12 }, (_, i) => 2020 + i)

/** Indicativos de país (Notion: el acudiente puede escoger el indicativo de su país). */
const dialCodes: [string, string][] = [
  ['+57', 'CO'], ['+1', 'EE. UU./CA'], ['+52', 'MX'], ['+593', 'EC'], ['+51', 'PE'], ['+58', 'VE'], ['+507', 'PA'], ['+506', 'CR'],
  ['+502', 'GT'], ['+503', 'SV'], ['+504', 'HN'], ['+505', 'NI'], ['+1 809', 'DO'], ['+1 787', 'PR'], ['+591', 'BO'], ['+595', 'PY'],
  ['+598', 'UY'], ['+56', 'CL'], ['+54', 'AR'], ['+55', 'BR'], ['+34', 'ES'],
]
function DialCode({ id, name }: { id: string; name: string }) {
  return (
    <select className={s.dial} id={id} name={name} defaultValue="+57" aria-label="Indicativo del país">
      {dialCodes.map(([c, n]) => <option key={c + n} value={c}>{n} {c}</option>)}
    </select>
  )
}

/** Nombres legibles de cada campo, para decir exactamente qué falló (Notion: "indicar cuál es el error"). */
const fieldNames: Record<string, string> = {
  nombres: 'Nombres', apellidos: 'Apellidos', nacimiento: 'Fecha de nacimiento', genero: 'Género', deporte: 'Deporte', graduacion: 'Año de graduación',
  whatsapp: 'Número de WhatsApp (celular)', correo: 'Correo electrónico', pais: 'País', departamento: 'Departamento o estado', ciudad: 'Ciudad de residencia', cupon: 'Código de descuento', general: 'Error', pass: 'Contraseña', pass2: 'Confirmar contraseña',
  terms: 'Aceptar las políticas', documento: 'Documento de identidad', experiencia: 'Años de experiencia', posicion: 'Posición en cancha', nivel: 'Nivel de juego',
  talla: 'Talla de camiseta', club: 'Club(es) o equipo(s)', colegio: 'Colegio o universidad', eps: 'Certificado de EPS', medica: 'Condición médica, restricción alimenticia o alergias',
  acudiente: 'Nombre del acudiente', acudienteTel: 'Celular del acudiente', acudienteMail: 'Correo del acudiente', termsEvent: 'Autorización y consentimiento', edad: 'Edad',
}
function ErrorSummary({ errors }: { errors: Errors }) {
  const keys = Object.keys(errors).filter(k => k !== 'general')
  if (!keys.length && !errors.general) return null
  return (
    <div className={s.alert} role="alert">
      <b>{keys.length === 0 ? 'No pudimos completar el registro.' : `No pudimos completar el registro. ${keys.length === 1 ? 'Revisa este campo:' : `Revisa estos ${keys.length} campos:`}`}</b>
      {errors.general && <p style={{ margin: '6px 0' }}>{errors.general}</p>}
      {keys.length > 0 && <ul>{keys.map(k => <li key={k}><a href={`#${k}`} onClick={e => { e.preventDefault(); document.getElementById(k)?.focus() }}>{fieldNames[k] ?? k}</a>: {errors[k]}</li>)}</ul>}
    </div>
  )
}

function Field({ id, label, hint, req = true, error, full, children }: { id: string; label: string; hint?: string; req?: boolean; error?: string; full?: boolean; children: ReactNode }) {
  return (
    <div className={`${s.field} ${full ? s.full : ''}`}>
      <label htmlFor={id}>{label}{req && <i aria-hidden="true"> *</i>}{hint && <small>({hint})</small>}</label>
      {children}
      {error && <span className={s.err} id={`${id}-err`} role="alert">{error}</span>}
    </div>
  )
}

function Password({ id, name, placeholder, error, auto }: { id: string; name: string; placeholder: string; error?: string; auto: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className={s.control}>
      <input className={s.input} id={id} name={name} type={show ? 'text' : 'password'} placeholder={placeholder} autoComplete={auto} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} style={{ paddingRight: 48 }} />
      <button type="button" className={s.eye} onClick={() => setShow(v => !v)} aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
        <img src={img(show ? 'icons/ojitos-abierto.svg' : 'icons/ojitos-cerrado.svg')} alt="" />
      </button>
    </div>
  )
}

const GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_LOGIN === 'true'
const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN || 'https://athleticscholarshipagency.com'
function SocialLogin({ verb }: { verb: string }) {
  const [msg, setMsg] = useState('')
  return (
    <>
      <div className={s.or}>o</div>
      <div className={s.social}>
        <button type="button" className={s.socialBtn} onClick={() => (GOOGLE ? window.location.assign(`${API_ORIGIN}/api/auth/google/redirect`) : setMsg('Ingreso con Google: muy pronto.'))}><img src={img('icons/google-colorok.png')} alt="" />{verb} con Google</button>
        <button type="button" className={`${s.socialBtn} ${s.apple}`} onClick={() => setMsg('Ingreso con Apple: muy pronto.')}><img src={img('icons/appleok.png')} alt="" />{verb} con Apple</button>
      </div>
      {msg && <p className={s.hint} style={{ marginTop: 8, textAlign: 'center' }} role="status">{msg}</p>}
    </>
  )
}

/* Campos que pide la inscripción a un evento. Solo se muestran los que el perfil todavía no tiene. */
const eventFields: { key: keyof Athlete; label: string; group?: string }[] = [
  { key: 'documento', label: 'CC, documento de identidad o pasaporte' },
  { key: 'experiencia', label: 'Años de experiencia competitiva' },
  { key: 'posicion', label: 'Posición en la cancha' },
  { key: 'nivel', label: 'Nivel de juego estimado' },
  { key: 'talla', label: 'Talla de camiseta' },
  { key: 'club', label: 'Club(es) o equipo(s)' },
  { key: 'colegio', label: 'Colegio o universidad actual' },
  { key: 'eps', label: 'Certificado de EPS o carné de salud' },
  { key: 'medica', label: 'Condición médica, restricción alimenticia o alergias' },
  { key: 'acudiente', label: 'Nombre del acudiente', group: 'Acudiente' },
  { key: 'acudienteTel', label: 'Contacto del acudiente', group: 'Acudiente' },
  { key: 'acudienteMail', label: 'Correo del acudiente', group: 'Acudiente' },
]
const filled = (v: unknown) => (Array.isArray(v) ? v.length > 0 : !!String(v ?? '').trim())

export default function Auth({ mode, camp: campSlug, redirect, googleError }: { mode: Mode; camp?: string; redirect?: string; googleError?: boolean }) {
  const camp = camps.find(c => c.slug === campSlug)
  const user = useSession()
  const loaded = useSessionLoaded()
  // Ubicaciones (backend): país → departamento → ciudad
  const [countries, setCountries] = useState<ApiPlace[]>([])
  const [states, setStates] = useState<ApiPlace[]>([])
  const [cities, setCities] = useState<ApiPlace[]>([])
  const [countryId, setCountryId] = useState('')
  const [stateId, setStateId] = useState('')
  // Inscripción: campamento del backend, archivo de EPS, cupón y cuotas
  const [apiCamps, setApiCamps] = useState<ApiCamp[] | null>(null)
  const [epsFile, setEpsFile] = useState<File | null>(null)
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [couponMsg, setCouponMsg] = useState('')
  const [checking, setChecking] = useState(false)
  const [cuotas, setCuotas] = useState(1)
  const [checkoutUrl, setCheckoutUrl] = useState<string | undefined>()

  useEffect(() => {
    if (mode !== 'registro') return
    getCountries().then(list => {
      setCountries(list)
      const co = list.find(c => c.name.toLowerCase() === 'colombia')
      if (co) setCountryId(String(co.id))
    }).catch(() => {})
  }, [mode])
  useEffect(() => {
    setStates([]); setStateId(''); setCities([])
    if (countryId) getStates(Number(countryId)).then(setStates).catch(() => {})
  }, [countryId])
  useEffect(() => {
    setCities([])
    if (stateId) getCities(Number(stateId)).then(setCities).catch(() => {})
  }, [stateId])
  useEffect(() => {
    if (mode === 'datos' && user) getApiCamps().then(setApiCamps).catch(() => setApiCamps([]))
  }, [mode, user])
  // Con sesión iniciada no tiene sentido mostrar "crear perfil" o "ingresar".
  useEffect(() => {
    if (loaded && user && mode !== 'datos') go(camp ? `/becasa/registrate?camp=${camp.slug}` : redirect ?? '/dashboard')
  }, [loaded, user, mode, camp, redirect])
  const after = () => go(camp ? `/becasa/registrate?camp=${camp.slug}` : redirect ?? '/dashboard')
  const [errors, setErrors] = useState<Errors>(googleError ? { general: 'No pudimos ingresar con Google. Intenta de nuevo o usa tu correo.' } : {})
  const [loading, setLoading] = useState(false)
  const [tos, setTos] = useState<'cuenta' | 'evento' | null>(null)
  const [accepted, setAccepted] = useState(false)
  const [acceptedEvent, setAcceptedEvent] = useState(false)
  const [done, setDone] = useState(false)
  const [fileName, setFileName] = useState('')

  const err = (k: string) => errors[k]
  const inv = (k: string) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })
  const focusFirst = (er: Errors) => document.getElementById(Object.keys(er)[0])?.focus()

  /* ---------- 1. Crear perfil (cuenta) ---------- */
  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    if (f.empresa) return // campo trampa: solo lo llenan los bots
    const er: Errors = {}
    ;['nombres', 'apellidos', 'nacimiento', 'genero', 'deporte', 'graduacion', 'whatsapp', 'correo', 'pais', 'departamento', 'ciudad', 'pass', 'pass2'].forEach(k => { if (!f[k]?.trim()) er[k] = 'Este campo es obligatorio.' })
    if (f.correo && !emailOk(f.correo)) er.correo = 'Revisa el correo: debe tener el formato nombre@dominio.com.'
    if (f.whatsapp && f.whatsapp.replace(/\D/g, '').length < 7) er.whatsapp = 'El celular parece incompleto: revisa el número (sin el indicativo).'
    if (f.pass && f.pass.length < 8) er.pass = 'Usa al menos 8 caracteres.'
    if (f.pass2 && f.pass !== f.pass2) er.pass2 = 'Las contraseñas no coinciden.'
    if (!accepted) er.terms = 'Debes aceptar las políticas de la cuenta.'
    setErrors(er)
    if (Object.keys(er).length) { focusFirst(er); return }
    setLoading(true)
    const r = await register({
      name: f.nombres.trim(), last_name: f.apellidos.trim(), email: f.correo.trim(), password: f.pass, password_confirmation: f.pass2,
      birth_date: f.nacimiento, birth_country_id: Number(f.pais), city_id: Number(f.ciudad), sport: f.deporte,
      phone: `${f.whatsappCode ?? '+57'} ${f.whatsapp.trim()}`.slice(0, 20), gender: GENDER_TO_API[f.genero] ?? 'Other', graduation_year: Number(f.graduacion),
    }).catch(() => ({ ok: false as const, error: 'Error de conexión. Intenta de nuevo.', fields: undefined }))
    if (!r.ok) { setLoading(false); const er2 = r.fields && Object.keys(r.fields).length ? r.fields : { general: r.error }; setErrors(er2); focusFirst(er2); return }
    await auth.refresh()
    setLoading(false)
    after()
  }

  /* ---------- Ingresar ---------- */
  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    if (f.empresa) return // campo trampa: solo lo llenan los bots
    const er: Errors = {}
    if (!f.correo) er.correo = 'Escribe tu correo.'; else if (!emailOk(f.correo)) er.correo = 'Revisa el formato del correo.'
    if (!f.pass) er.pass = 'Escribe tu contraseña.'
    setErrors(er)
    if (Object.keys(er).length) return
    setLoading(true)
    const r = await login(f.correo.trim(), f.pass).catch(() => ({ ok: false as const, error: 'Error de conexión. Intenta de nuevo.', fields: undefined }))
    if (!r.ok) { setLoading(false); setErrors(r.fields && Object.keys(r.fields).length ? r.fields : { general: r.error }); return }
    await auth.refresh()
    setLoading(false)
    after()
  }

  /* ---------- 2. Inscripción al evento (solo lo que falta) ---------- */
  const missing = user ? eventFields.filter(f => !filled(user[f.key])) : eventFields
  const has = (k: keyof Athlete) => missing.some(m => m.key === k)
  const alreadyIn = !!(user && camp && user.registrations.includes(camp.slug))

  async function onEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('empresa')) return // campo trampa: solo lo llenan los bots
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const er: Errors = {}
    missing.forEach(m => {
      if (m.key === 'posicion') { if (!f.getAll('posicion').length) er.posicion = 'Elige al menos una posición.' }
      else if (m.key === 'eps') { if (!epsFile) er.eps = 'Adjunta el certificado de la EPS o el carné de salud.'; else if (epsFile.size > 5 * 1024 * 1024) er.eps = 'El archivo pesa más de 5 MB.' }
      else if (!val(m.key)) er[m.key] = 'Este campo es obligatorio.'
    })
    if (has('acudienteTel') && val('acudienteTel') && val('acudienteTel').replace(/\D/g, '').length < 7) er.acudienteTel = 'El celular del acudiente parece incompleto.'
    if (has('acudienteMail') && val('acudienteMail') && !emailOk(val('acudienteMail'))) er.acudienteMail = 'Revisa el formato del correo.'
    if (user?.birth && camp) { const a = age(user.birth); if (a < 11 || a > 25) er.edad = `BECASA Camp es para atletas de 11 a 25 años. Según tu perfil tienes ${a}.` }
    if (!acceptedEvent) er.termsEvent = 'Debes aceptar las políticas y condiciones del evento.'
    setErrors(er)
    if (Object.keys(er).length) { focusFirst(er); return }
    const apiCamp = camp && apiCamps ? apiCampFor(camp.slug, apiCamps) : undefined
    if (!apiCamp) { const e2 = { general: 'Las inscripciones de este campamento aún no están abiertas en el sistema. Escríbenos por WhatsApp y te ayudamos.' }; setErrors(e2); return }
    // Valor de cada dato: lo que escribió ahora o lo que ya estaba en su perfil.
    const pick = (k: keyof Athlete) => (has(k) ? val(k) : String((user?.[k] as string | undefined) ?? ''))
    const body = new FormData()
    body.set('camp_id', String(apiCamp.id))
    body.set('identification_number', pick('documento'))
    body.set('years_experience', pick('experiencia'))
    body.set('position', (has('posicion') ? f.getAll('posicion').map(String) : user?.posicion ?? []).join(', '))
    body.set('skill_level', LEVEL_TO_API[pick('nivel')] ?? 'principiante')
    body.set('shirt_size', pick('talla'))
    body.set('club_name', pick('club'))
    body.set('school_name', pick('colegio'))
    if (epsFile) body.set('health_insurance_path', epsFile)
    body.set('medical_conditions', pick('medica'))
    body.set('dietary_restrictions', pick('medica'))
    body.set('guardian_name', pick('acudiente'))
    body.set('guardian_phone', has('acudienteTel') ? `${val('acudienteTelCode') || '+57'} ${val('acudienteTel')}` : user?.acudienteTel ?? '')
    body.set('guardian_email', pick('acudienteMail'))
    if (coupon) { body.set('discount_code', coupon.code); body.set('installments_count', String(cuotas)) }
    setLoading(true)
    const r = await registerToCamp(body).catch(() => ({ ok: false as const, error: 'Error de conexión. Intenta de nuevo.', fields: undefined }))
    setLoading(false)
    if (!r.ok) { const e2 = r.fields && Object.keys(r.fields).length ? { ...r.fields, general: r.error } : { general: r.error }; setErrors(e2); focusFirst(e2); return }
    setCheckoutUrl(r.data.checkoutUrl)
    setDone(true)
    auth.refresh()
  }

  const title = mode === 'ingresar'
    ? <>Bienvenido de vuelta. <mark>Sigue tu proceso.</mark></>
    : mode === 'datos' ? <>Inscripción a <mark>BECASA Camp {camp?.city}.</mark></>
      : <>Crea tu perfil y regístrate en un <mark>campamento.</mark></>
  const st = camp ? campStatus(camp) : null

  // La inscripción requiere perfil.
  if (!loaded && mode === 'datos') {
    return <section className={s.page}><div className="container" style={{ maxWidth: 640 }}><div className={s.card}><p className={s.sub} role="status"><span className={s.spinner} /> Cargando tu perfil…</p></div></div></section>
  }
  if (mode === 'datos' && !user) {
    return (
      <section className={s.page}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className={s.card} style={{ display: 'grid', gap: 14, justifyItems: 'start' }}>
            <h1 className={s.h1Card}>Primero crea tu perfil</h1>
            <p className={s.sub}>Para inscribirte a un evento necesitas un perfil de atleta. Te toma 3 minutos y luego solo te pediremos los datos del evento.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <LinkButton href={`/becasa/crea-tu-perfil?camp=${campSlug ?? ''}`}>Crear perfil</LinkButton>
              <span className={s.haveAccount}>¿Ya tienes cuenta? <a href={`/becasa/login?camp=${campSlug ?? ''}`}>Ingresa</a></span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={s.page}>
      <div className="container">
        <div className={`${s.panel} ${s.grid}`}>
        <aside className={s.aside}>
          <h1>{title}</h1>
          {mode === 'registro' && <p>Tu perfil es tu cuenta en ASA: con él te inscribes a eventos, recibes las instrucciones de pago y, después del campamento, tu Scorecard ASA.</p>}
          {mode === 'datos' && <p className={s.welcome}>Bienvenido al evento de voleibol con más proyección en Colombia.</p>}
          {mode === 'datos' && <p>Ya tenemos tus datos del perfil. Aquí solo completas lo que pide el campamento; todo queda guardado en tu perfil para la próxima vez.</p>}
          {camp && st && (
            <div className={s.campBox}>
              <small>{mode === 'datos' ? 'Evento' : 'Después te inscribes en'}</small>
              <b>BECASA Camp 2026 · {camp.city}</b>
              <span><b className={s.k}>Fecha:</b> {camp.dates.long}</span>
              <span><b className={s.k}>Lugar:</b> {camp.venue.name} · {camp.venue.city}</span>
              {camp.hours && <span><b className={s.k}>Hora:</b> {camp.hours}</span>}
              <span>{st.label}</span>
            </div>
          )}
          <div className={s.community}>
            <div className={s.faces}>{[1, 2, 3, 4].map(n => <img key={n} src={img(`comunidad/c${n}.webp`)} alt="" />)}</div>
            <b>Una comunidad de más de +350 atletas del país</b>
          </div>
          <img className={s.becasa} src={img('icons/becasa-ok.svg')} alt="BECASA Camp" />
        </aside>

        <div className={s.card}>
          {mode === 'registro' && (
            <>
              {camp && <div className={s.steps} aria-label="Paso 1 de 2"><span className={s.on} /><span /></div>}
              <h2>Crea tu perfil</h2>
              <p className={s.sub}>{camp ? 'Paso 1 de 2: tu cuenta. ' : ''}Te toma unos 3 minutos. Los campos con * son obligatorios.</p>
              <form className={s.form} onSubmit={onRegister} noValidate>
                <div className="sr-only" aria-hidden="true"><label>Empresa<input name="empresa" tabIndex={-1} autoComplete="off" /></label></div>
                <ErrorSummary errors={errors} />
                <Field id="nombres" label="Nombres" error={err('nombres')}><input className={s.input} id="nombres" name="nombres" placeholder="Nombres" autoComplete="given-name" {...inv('nombres')} /></Field>
                <Field id="apellidos" label="Apellidos" error={err('apellidos')}><input className={s.input} id="apellidos" name="apellidos" placeholder="Apellidos" autoComplete="family-name" {...inv('apellidos')} /></Field>
                <Field id="nacimiento" label="Fecha de nacimiento" error={err('nacimiento')}><input className={s.input} id="nacimiento" name="nacimiento" type="date" autoComplete="bday" {...inv('nacimiento')} /></Field>
                <Field id="genero" label="Género" error={err('genero')}>
                  <select className={s.input} id="genero" name="genero" defaultValue="" {...inv('genero')}><option value="" disabled>Selecciona</option><option>Femenino</option><option>Masculino</option><option>Prefiero no decir</option></select>
                </Field>
                <Field id="deporte" label="Deporte" error={err('deporte')}>
                  <select className={s.input} id="deporte" name="deporte" defaultValue={camp?.sport ?? ''} {...inv('deporte')}><option value="" disabled>Selecciona</option>{sports.map(x => <option key={x}>{x}</option>)}</select>
                </Field>
                <Field id="graduacion" label="Año de graduación" hint="colegio" error={err('graduacion')}>
                  <select className={s.input} id="graduacion" name="graduacion" defaultValue="" {...inv('graduacion')}><option value="" disabled>Selecciona</option>{years.map(y => <option key={y}>{y}</option>)}</select>
                </Field>
                <Field id="whatsapp" label="Número de WhatsApp" error={err('whatsapp')}>
                  <div className={s.prefix}><DialCode id="whatsappCode" name="whatsappCode" /><input className={s.input} id="whatsapp" name="whatsapp" type="tel" inputMode="numeric" placeholder="300 000 0000" autoComplete="tel-national" {...inv('whatsapp')} /></div>
                </Field>
                <Field id="correo" label="Correo electrónico" error={err('correo')}><input className={s.input} id="correo" name="correo" type="email" placeholder="nombre@correo.com" autoComplete="email" {...inv('correo')} /></Field>
                <Field id="pais" label="País" error={err('pais')}>
                  <select className={s.input} id="pais" name="pais" value={countryId} onChange={e => setCountryId(e.target.value)} {...inv('pais')}><option value="" disabled>{countries.length ? 'Selecciona' : 'Cargando…'}</option>{countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                </Field>
                <Field id="departamento" label="Departamento o estado" error={err('departamento')}>
                  <select className={s.input} id="departamento" name="departamento" value={stateId} onChange={e => setStateId(e.target.value)} disabled={!countryId} {...inv('departamento')}><option value="" disabled>Selecciona</option>{states.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                </Field>
                <Field id="ciudad" label="Ciudad de residencia" error={err('ciudad')} full>
                  <select className={s.input} id="ciudad" name="ciudad" defaultValue="" key={stateId} disabled={!stateId} {...inv('ciudad')}><option value="" disabled>Selecciona</option>{cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                </Field>
                <Field id="pass" label="Contraseña" hint="mín. 8 caracteres" error={err('pass')}><Password id="pass" name="pass" placeholder="Contraseña" auto="new-password" error={err('pass')} /></Field>
                <Field id="pass2" label="Confirmar contraseña" error={err('pass2')}><Password id="pass2" name="pass2" placeholder="Repite la contraseña" auto="new-password" error={err('pass2')} /></Field>
                <div className={`${s.full} ${s.field}`}>
                  <label className={s.check}>
                    <input type="checkbox" id="terms" checked={accepted} onChange={e => setAccepted(e.target.checked)} aria-invalid={!!err('terms')} />
                    <span>Declaro que la información de este formulario es verídica y acepto las <button type="button" className={s.linkBtn} onClick={() => setTos('cuenta')}>políticas de la cuenta</button>.</span>
                  </label>
                  {err('terms') && <span className={s.err} role="alert">{err('terms')}</span>}
                </div>
                <div className={s.submitRow}>
                  <span className={s.haveAccount}>¿Ya tienes cuenta? <a href={`/becasa/login${camp ? `?camp=${camp.slug}` : ''}`}>Ingresa</a></span>
                  <Button type="submit" disabled={loading} aria-busy={loading}>{loading ? <><span className={s.spinner} /> Creando…</> : camp ? 'Crear perfil y continuar' : 'Crear perfil'}</Button>
                </div>
              </form>
              <SocialLogin verb="Registrarse" />
            </>
          )}

          {mode === 'ingresar' && (
            <>
              <h2>Ingresar</h2>
              <p className={s.sub}>Entra a tu tablero para ver tus inscripciones y tu progreso.</p>
              <form className={s.form} onSubmit={onLogin} noValidate style={{ gridTemplateColumns: '1fr' }}>
                {err('general') && <p className={s.alert} role="alert">{err('general')}</p>}
                <div className="sr-only" aria-hidden="true"><label>Empresa<input name="empresa" tabIndex={-1} autoComplete="off" /></label></div>
                <Field id="correo" label="Correo electrónico" error={err('correo')}><input className={s.input} id="correo" name="correo" type="email" placeholder="nombre@correo.com" autoComplete="email" {...inv('correo')} /></Field>
                <Field id="pass" label="Contraseña" error={err('pass')}><Password id="pass" name="pass" placeholder="Contraseña" auto="current-password" error={err('pass')} /></Field>
                <div className={s.submitRow}>
                  <a href="/pronto" className={s.haveAccount}>¿Olvidaste tu contraseña?</a>
                  <Button type="submit" disabled={loading} aria-busy={loading}>{loading ? <><span className={s.spinner} /> Ingresando…</> : 'Ingresar'}</Button>
                </div>
              </form>
              <SocialLogin verb="Ingresar" />
              <p className={`${s.switch} ${s.haveAccount}`}>¿Aún no tienes perfil? <a href="/becasa/crea-tu-perfil">Créalo aquí</a></p>
            </>
          )}

          {mode === 'datos' && user && (
            <>
              <div className={s.steps} aria-label="Paso 2 de 2"><span className={s.on} /><span className={s.on} /></div>
              <h2>Inscripción al evento</h2>
              <p className={s.sub}>Paso 2 de 2. Solo te pedimos lo que el campamento necesita y aún no está en tu perfil.</p>

              <div className={s.summary}>
                <header><b>Datos de tu perfil</b><a href="/dashboard?tab=perfil">Editar</a></header>
                <dl>
                  <div><dt>Nombre</dt><dd>{user.firstName} {user.lastName}</dd></div>
                  <div><dt>Correo</dt><dd>{user.email}</dd></div>
                  <div><dt>WhatsApp</dt><dd>{user.phone}</dd></div>
                  <div><dt>Deporte</dt><dd>{user.sport}</dd></div>
                  <div><dt>Ciudad</dt><dd>{user.city}</dd></div>
                  {eventFields.filter(f => filled(user[f.key])).slice(0, 4).map(f => <div key={f.key}><dt>{f.label}</dt><dd>{Array.isArray(user[f.key]) ? (user[f.key] as string[]).join(', ') : String(user[f.key])}</dd></div>)}
                </dl>
              </div>

              {alreadyIn && !done && <p className={s.allSet} role="status">Ya estás inscrito en este campamento. Puedes ver el estado del pago en tu tablero.</p>}

              <form className={s.form} onSubmit={onEvent} noValidate>
                <div className="sr-only" aria-hidden="true"><label>Empresa<input name="empresa" tabIndex={-1} autoComplete="off" /></label></div>
                <ErrorSummary errors={errors} />
                {missing.length === 0 && <p className={`${s.allSet} ${s.full}`}>Tu perfil ya tiene todos los datos que pide el evento. Solo confirma y acepta las políticas.</p>}
                {has('documento') && <Field id="documento" label="CC, documento de identidad o pasaporte" error={err('documento')}><input className={s.input} id="documento" name="documento" placeholder="Número de documento o pasaporte" {...inv('documento')} /></Field>}
                {has('experiencia') && <Field id="experiencia" label="Años de experiencia competitiva" error={err('experiencia')}><input className={s.input} id="experiencia" name="experiencia" type="number" min={0} max={25} placeholder="Ej. 4" {...inv('experiencia')} /></Field>}
                {has('posicion') && (
                  <div className={`${s.field} ${s.full}`}>
                    <span id="posicion-l" style={{ fontSize: 'var(--fs-small)', fontWeight: 700 }}>Posición en la cancha <i style={{ color: '#c0392b', fontStyle: 'normal' }}>*</i></span>
                    <div className={s.chips} role="group" aria-labelledby="posicion-l" id="posicion" tabIndex={-1}>
                      {['Armador/a', 'Opuesto/a', 'Central', 'Punta', 'Líbero', 'Aún no definida'].map(p => <label key={p}><input type="checkbox" name="posicion" value={p} /><span>{p}</span></label>)}
                    </div>
                    {err('posicion') && <span className={s.err} role="alert">{err('posicion')}</span>}
                  </div>
                )}
                {has('nivel') && (
                  <Field id="nivel" label="Nivel de juego" error={err('nivel')}>
                    <select className={s.input} id="nivel" name="nivel" defaultValue="" {...inv('nivel')}><option value="" disabled>Selecciona</option><option>Formativo / escolar</option><option>Club / liga</option><option>Departamental</option><option>Selección nacional</option></select>
                  </Field>
                )}
                {has('talla') && (
                  <Field id="talla" label="Talla de camisa" error={err('talla')}>
                    <select className={s.input} id="talla" name="talla" defaultValue="" {...inv('talla')}><option value="" disabled>Selecciona</option>{['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(t => <option key={t}>{t}</option>)}</select>
                  </Field>
                )}
                {has('club') && <Field id="club" label="Club(es) o equipo(s) al que perteneces" hint="separa con comas" error={err('club')}><input className={s.input} id="club" name="club" placeholder="Ej. Club Voleibol Santander" {...inv('club')} /></Field>}
                {has('colegio') && <Field id="colegio" label="Nombre del colegio o universidad actual" error={err('colegio')}><input className={s.input} id="colegio" name="colegio" placeholder="Nombre de la institución" {...inv('colegio')} /></Field>}
                {has('eps') && (
                  <div className={`${s.field} ${s.full}`}>
                    <span style={{ fontSize: 'var(--fs-small)', fontWeight: 700 }}>Certificado de afiliación a la EPS o carné de salud <i style={{ color: '#c0392b', fontStyle: 'normal' }}>*</i></span>
                    <label className={s.file} id="eps" tabIndex={-1}>
                      <img src={img('icons/clip.svg')} alt="" />
                      <span>{fileName || 'Adjuntar archivo (PDF o imagen)'}</span>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => { const f = e.target.files?.[0] ?? null; setEpsFile(f); setFileName(f?.name ?? '') }} />
                    </label>
                    {err('eps') && <span className={s.err} role="alert">{err('eps')}</span>}
                  </div>
                )}
                {has('medica') && <Field id="medica" label="¿Tienes alguna condición médica, restricción alimenticia o alergias?" hint='escribe "Ninguna" si no' error={err('medica')} full><input className={s.input} id="medica" name="medica" placeholder="Escribe…" {...inv('medica')} /></Field>}
                {(has('acudiente') || has('acudienteTel') || has('acudienteMail')) && <p className={s.group}>Acudiente</p>}
                {has('acudiente') && <Field id="acudiente" label="Nombre completo del acudiente" error={err('acudiente')}><input className={s.input} id="acudiente" name="acudiente" placeholder="Nombre completo" {...inv('acudiente')} /></Field>}
                {has('acudienteTel') && (
                  <Field id="acudienteTel" label="Celular del acudiente" hint="elige el indicativo del país" error={err('acudienteTel')}>
                    <div className={s.prefix}><DialCode id="acudienteTelCode" name="acudienteTelCode" /><input className={s.input} id="acudienteTel" name="acudienteTel" type="tel" inputMode="numeric" placeholder="300 000 0000" {...inv('acudienteTel')} /></div>
                  </Field>
                )}
                {has('acudienteMail') && <Field id="acudienteMail" label="Correo del acudiente" error={err('acudienteMail')} full><input className={s.input} id="acudienteMail" name="acudienteMail" type="email" placeholder="nombre@correo.com" {...inv('acudienteMail')} /></Field>}
                <p className={s.group}>Pago</p>
                <Field id="cupon" label="Código de descuento" req={false} hint="opcional" error={err('cupon')} full>
                  <div className={s.prefix}>
                    <input className={s.input} id="cupon" name="cupon" placeholder="Escribe tu código" autoComplete="off" disabled={!!coupon} {...inv('cupon')} />
                    {coupon
                      ? <Button type="button" size="sm" variant="ghost" onClick={() => { setCoupon(null); setCuotas(1); setCouponMsg('') }}>Quitar</Button>
                      : <Button type="button" size="sm" variant="dark" disabled={checking} onClick={async () => {
                          const code = (document.getElementById('cupon') as HTMLInputElement | null)?.value.trim() ?? ''
                          if (!code) { setCouponMsg('Escribe un código.'); return }
                          setChecking(true)
                          const r = await checkCoupon(code).catch(() => ({ ok: false as const, error: 'Error de conexión.' }))
                          setChecking(false)
                          if (r.ok) { setCoupon(r.data); setCouponMsg('') } else setCouponMsg(r.error)
                        }}>{checking ? 'Validando…' : 'Validar'}</Button>}
                  </div>
                  {couponMsg && <span className={s.err} role="alert">{couponMsg}</span>}
                  {coupon && <span className={s.hint} role="status">Código {coupon.code}: {Number(coupon.discount_percentage)}% de descuento{Number(coupon.max_installments) > 1 ? ` · hasta ${Number(coupon.max_installments)} cuotas` : ''}.</span>}
                </Field>
                {coupon && Number(coupon.max_installments) > 1 && (
                  <Field id="cuotas" label="Número de cuotas" req={false}>
                    <select className={s.input} id="cuotas" value={cuotas} onChange={e => setCuotas(Number(e.target.value))}>
                      {Array.from({ length: Math.min(Number(coupon.max_installments), 12) }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n === 1 ? 'cuota' : 'cuotas'}</option>)}
                    </select>
                  </Field>
                )}
                <p className={s.group}>Autorización y consentimiento</p>
                <div className={`${s.full} ${s.field}`}>
                  <label className={s.check}>
                    <input type="checkbox" id="termsEvent" checked={acceptedEvent} onChange={e => setAcceptedEvent(e.target.checked)} aria-invalid={!!err('termsEvent')} />
                    <span>Declaro que la información suministrada en este formulario es verídica y acepto los <button type="button" className={s.linkBtn} onClick={() => setTos('evento')}>términos y condiciones del evento</button>.</span>
                  </label>
                  {err('termsEvent') && <span className={s.err} role="alert">{err('termsEvent')}</span>}
                </div>
                <div className={s.submitRow}>
                  <a href="/dashboard" className={s.haveAccount}>Completar después</a>
                  <Button type="submit" disabled={loading} aria-busy={loading}>{loading ? <><span className={s.spinner} /> Enviando…</> : 'Inscribirme'}</Button>
                </div>
              </form>
            </>
          )}
        </div>
        </div>
      </div>

      <TermsModal open={tos !== null} kind={tos ?? 'evento'} onClose={() => setTos(null)} onAccept={() => (tos === 'cuenta' ? setAccepted(true) : setAcceptedEvent(true))} />
      <Modal open={done} onClose={() => go('/dashboard?tab=Campamentos')} label="Registro exitoso" width={720} dark>
        <div className={s.success}>
          <img src={img('popup/popup4.webp')} alt="Atletas de BECASA Camp celebrando" />
          <div className={s.confirm}>
            <h2 className="display">¡Registro exitoso!</h2>
            <p className={s.confirmLead}>¡Gracias por completar tu registro y por dar este primer paso hacia una oportunidad que puede transformar tu futuro!</p>
            <div className={s.channel}>
              <b>Canal oficial de WhatsApp</b>
              <p>Únete a nuestro canal oficial, donde publicaremos comunicaciones e información importante del evento.</p>
              <LinkButton href={WA_CHANNEL_SANTANDER} target="_blank" rel="noreferrer">Unirme al canal · Santander</LinkButton>
            </div>
            <p>¡Te animamos a entrenar con disciplina, mantenerte motivado y vivir con expectativa lo que será un fin de semana inolvidable!</p>
            <h3>Checklist de lo que debes traer al BECASA Camp Santander 2026</h3>
            <ul className={s.checklist}>
              {bring.map(x => <li key={x}>{x}</li>)}
            </ul>
            <p><b>Y también…</b> Tu actitud y disciplina serán tan importantes como tu rendimiento. Cada práctica y cada juego es tu vitrina: da lo mejor de ti. Aprovecha cada charla y taller, porque son herramientas para tu futuro.</p>
            <p className={s.sign}>¡Nos vemos pronto!<br />— Equipo ASA | Fundación ASA Más</p>
            <p className={s.hint}>Tu inscripción queda pendiente de pago. Puedes pagar ahora con Mercado Pago (tarjeta, PSE y pagos internacionales) o más tarde desde tu tablero.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {checkoutUrl && <LinkButton href={checkoutUrl} rel="noreferrer">Pagar ahora</LinkButton>}
              <LinkButton variant="light" href="/dashboard?tab=Campamentos">Ir a mi tablero</LinkButton>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  )
}
