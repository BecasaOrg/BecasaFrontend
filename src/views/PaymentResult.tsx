'use client'

import { useEffect } from 'react'
import { LinkButton } from '../components/ui/ui'
import { waBecasa } from '../data/asa'
import { auth } from '../lib/app'

const TEXT = {
  success: ['¡Pago recibido!', 'Mercado Pago confirmó tu pago. En unos minutos verás el estado actualizado en tu tablero y te llegará la confirmación al correo.'],
  pending: ['Pago en revisión', 'Mercado Pago está procesando tu pago. Te avisaremos por correo cuando se confirme; también verás el estado en tu tablero.'],
  failure: ['El pago no se completó', 'No se realizó ningún cobro. Puedes intentarlo de nuevo desde tu tablero o escribirnos por WhatsApp y te ayudamos.'],
} as const

/** Página a la que vuelve Mercado Pago (back_urls del backend: /payment/success|pending|failure). */
export default function PaymentResult({ kind }: { kind: keyof typeof TEXT }) {
  const [title, text] = TEXT[kind]
  useEffect(() => { auth.refresh() }, [])
  return (
    <section style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', background: 'var(--blue)', color: 'var(--white)', padding: 'calc(var(--header-h) + 40px) var(--gutter) 60px', textAlign: 'center' }}>
      <div style={{ display: 'grid', gap: 18, justifyItems: 'center', maxWidth: 560 }}>
        <h1 className="display" style={{ fontSize: 'var(--fs-h1)', color: kind === 'failure' ? 'var(--white)' : 'var(--lime)' }}>{title}</h1>
        <p>{text}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <LinkButton href="/dashboard?tab=Campamentos">Ir a mi tablero</LinkButton>
          {kind !== 'success' && <LinkButton variant="light" href={waBecasa()} target="_blank" rel="noreferrer">Escríbenos</LinkButton>}
        </div>
      </div>
    </section>
  )
}
