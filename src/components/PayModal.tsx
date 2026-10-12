'use client'

import { useEffect, useRef, useState } from 'react'
import { Button, LinkButton, Modal } from './ui/ui'
import { cop } from '../data/becasa'
import { waBecasa } from '../data/asa'
import { payInstallment } from '../app/actions'
import type { ApiRegistration } from '../lib/types'

/* Pago con el Card Payment Brick de Mercado Pago: los datos de la tarjeta
   se escriben en campos alojados por Mercado Pago (nunca pasan por este sitio).
   El valor lo recalcula el servidor a partir de la inscripción. */

type CardFormData = {
  token: string
  issuer_id?: string
  payment_method_id?: string
  payer: { email: string; identification: { type: string; number: string } }
}
type BrickController = { unmount: () => void }
type MPInstance = { bricks: () => { create: (kind: 'cardPayment', container: string, settings: unknown) => Promise<BrickController> } }
declare global { interface Window { MercadoPago?: new (key: string, opts?: { locale: string }) => MPInstance } }

const SDK = 'https://sdk.mercadopago.com/js/v2'
const KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? ''

const REJECTED: Record<string, string> = {
  cc_rejected_bad_filled_card_number: 'Revisa el número de la tarjeta.',
  cc_rejected_bad_filled_date: 'Revisa la fecha de vencimiento.',
  cc_rejected_bad_filled_security_code: 'Revisa el código de seguridad.',
  cc_rejected_insufficient_amount: 'La tarjeta no tiene fondos suficientes.',
  cc_rejected_call_for_authorize: 'Debes autorizar el pago con tu banco.',
  cc_rejected_card_disabled: 'La tarjeta está deshabilitada. Llama a tu banco.',
  cc_rejected_duplicated_payment: 'Ya hiciste un pago por este valor. Revisa tu tablero.',
  cc_rejected_high_risk: 'El pago fue rechazado por seguridad. Prueba con otra tarjeta.',
  cc_rejected_max_attempts: 'Superaste el límite de intentos. Prueba con otra tarjeta.',
}

function loadSdk(): Promise<void> {
  if (window.MercadoPago) return Promise.resolve()
  return new Promise((ok, fail) => {
    const s = document.createElement('script')
    s.src = SDK; s.async = true
    s.onload = () => ok(); s.onerror = () => fail(new Error('sdk'))
    document.body.appendChild(s)
  })
}

export default function PayModal({ registration, email, onClose, onPaid }: { registration: ApiRegistration; email: string; onClose: () => void; onPaid: () => void }) {
  const total = Number(registration.total_price ?? registration.camp?.price ?? 0)
  const n = Math.max(1, Number(registration.installments_count ?? 1))
  const amount = Math.round((total / n) * 100) / 100
  const [state, setState] = useState<'loading' | 'ready' | 'done' | 'pending' | 'error'>('loading')
  const [msg, setMsg] = useState('')
  const ctrl = useRef<BrickController | null>(null)
  const paid = useRef(onPaid)
  paid.current = onPaid

  useEffect(() => {
    let alive = true
    if (!KEY) { setState('error'); setMsg('El pago con tarjeta no está configurado todavía. Escríbenos por WhatsApp y te enviamos el enlace de pago.'); return }
    loadSdk().then(async () => {
      if (!alive || !window.MercadoPago) return
      const mp = new window.MercadoPago(KEY, { locale: 'es-CO' })
      ctrl.current = await mp.bricks().create('cardPayment', 'mp-card-brick', {
        initialization: { amount, payer: { email } },
        customization: { paymentMethods: { maxInstallments: 1 }, visual: { style: { theme: 'default' } } },
        callbacks: {
          onReady: () => alive && setState('ready'),
          onError: () => { if (alive) { setState('error'); setMsg('No pudimos cargar el formulario de pago. Recarga la página e intenta de nuevo.') } },
          onSubmit: async (data: CardFormData) => {
            const r = await payInstallment({
              registrationId: registration.id,
              token: data.token,
              paymentMethodId: data.payment_method_id,
              issuerId: data.issuer_id,
              payer: { email: data.payer?.email || email, identification: data.payer?.identification },
            })
            if (!alive) return
            if (!r.ok) { setState('error'); setMsg(r.error); return }
            if (r.data.status === 'approved') { setState('done'); paid.current() }
            else if (r.data.status === 'in_process' || r.data.status === 'pending') { setState('pending'); paid.current() }
            else { setState('error'); setMsg(REJECTED[r.data.detail ?? ''] ?? 'El pago fue rechazado. Prueba con otra tarjeta o escríbenos por WhatsApp.') }
          },
        },
      })
    }).catch(() => { if (alive) { setState('error'); setMsg('No pudimos conectar con Mercado Pago. Revisa tu conexión e intenta de nuevo.') } })
    return () => { alive = false; ctrl.current?.unmount(); ctrl.current = null }
  }, [amount, email, registration.id])

  return (
    <Modal open onClose={onClose} label="Pagar inscripción" width={620}>
      <div style={{ display: 'grid', gap: 14 }}>
        <h2 className="display" style={{ fontSize: 'var(--fs-h3)' }}>{state === 'done' ? '¡Pago aprobado!' : state === 'pending' ? 'Pago en revisión' : 'Pagar inscripción'}</h2>
        {(state === 'loading' || state === 'ready') && (
          <p>{registration.camp?.name ?? 'BECASA Camp'} · {n > 1 ? `Cuota de ${cop(amount)} COP (total ${cop(total)} COP en ${n} cuotas)` : `${cop(amount)} COP`}</p>
        )}
        {state === 'loading' && <p role="status">Cargando el formulario seguro de Mercado Pago…</p>}
        <div id="mp-card-brick" hidden={state === 'done' || state === 'pending'} />
        {state === 'done' && <p>Recibimos tu pago. Te llegará la confirmación al correo y el estado ya se ve en tu tablero.</p>}
        {state === 'pending' && <p>Mercado Pago está revisando el pago. Te avisaremos por correo cuando se confirme.</p>}
        {state === 'error' && <p role="alert" style={{ color: 'var(--danger)', fontWeight: 700 }}>{msg}</p>}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {state === 'error' && <LinkButton variant="dark" href={waBecasa()} target="_blank" rel="noreferrer">Escríbenos</LinkButton>}
          <Button variant={state === 'done' ? 'lime' : 'ghost'} onClick={onClose}>{state === 'done' || state === 'pending' ? 'Listo' : 'Cerrar'}</Button>
        </div>
      </div>
    </Modal>
  )
}
