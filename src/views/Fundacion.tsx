'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import f from './Fundacion.module.css'
import { LinkButton, Icon } from '../components/ui/ui'
import { rteDocs, pageSrc, DIAN_URL, type RteDoc } from '../data/fundacion'

const shield = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
const chat = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
const external = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
const eye = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>

/** Fundación ASA Más: Registro Web RTE (art. 364-5 E.T.). Documentos de consulta pública, solo lectura. */
export default function Fundacion() {
  const [open, setOpen] = useState<RteDoc | null>(null)

  // Enlace directo a un documento: /fundacion-asa-mas#doc-01
  useEffect(() => {
    const fromHash = () => { const m = /^#doc-(\d{2})$/.exec(window.location.hash); setOpen(m ? rteDocs.find(d => d.id === m[1]) ?? null : null) }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])
  const show = (d: RteDoc) => { history.replaceState(null, '', `#doc-${d.id}`); setOpen(d) }
  const close = useCallback(() => { history.replaceState(null, '', window.location.pathname); setOpen(null) }, [])

  return (
    <>
      <section className={`glow ${f.hero}`} aria-labelledby="rte-hero">
        <div className={`container ${f.heroInner}`}>
          <div className={f.org}>
            <span className={f.icon}>{shield}</span>
            <div>
              <div className={f.orgName}>Fundación ASA Más</div>
              <span className={f.orgTag}>Registro Web RTE (DIAN)</span>
            </div>
          </div>
          <h1 id="rte-hero" className={`display ${f.heroTitle}`}>Transparencia y Régimen Tributario Especial <span>(RTE)</span></h1>
          <p className={f.heroLead}>Información publicada en cumplimiento del artículo 364-5 del Estatuto Tributario. Consulta los documentos oficiales de la Fundación y radica tus comentarios ante la DIAN.</p>
          <div className={f.heroActions}>
            <LinkButton href="#documentos">Ver documentos {Icon.arrow}</LinkButton>
            <LinkButton variant="light" href={DIAN_URL} target="_blank" rel="noopener noreferrer">Comentarios ante la DIAN {external}</LinkButton>
          </div>
        </div>
      </section>

      {/* TÍTULO 1 */}
      <section className={f.block} aria-labelledby="rte-t1">
        <div className="container">
          <p className={f.kicker}>Régimen Tributario Especial</p>
          <h2 id="rte-t1" className={`display ${f.title}`}>Transparencia y Régimen Tributario Especial (RTE)</h2>
          <p className={f.sub}>Información publicada en cumplimiento del artículo 364-5 del Estatuto Tributario</p>

          <div className={f.grid}>
            <div>
              <blockquote className={f.legal}>
                <p>De conformidad con lo establecido en el Artículo 364-5 parágrafo 4 referido al REGISTRO WEB Y REMISIÓN DE COMENTARIOS DE LA SOCIEDAD CIVIL, el artículo 7 de la Resolución No. 000019 del 28 de marzo de 2018 expedida por la DIRECCIÓN DE IMPUESTOS Y ADUANAS NACIONALES (DIAN), y el párrafo segundo del artículo 1.2.1.5.1.3. del Decreto Único Reglamentario 1625 de 2016 referido al Registro Web, se tiene que, la entidad solicitante de CALIFICACIÓN AL RÉGIMEN TRIBUTARIO ESPECIAL está en la obligación de aportar una dirección Web, que puede ser página Web o cualquier espacio virtual público de libre acceso, en el cual la sociedad civil pueda ingresar y manifestar sus inconformidades cuando haya lugar a estas.</p>
              </blockquote>
              <div className={f.declare}>
                <p><strong>Declaración Institucional de Cumplimiento:</strong> La FUNDACIÓN ASA MAS dispone este espacio virtual oficial para que toda persona natural o jurídica, comunitaria o veeduría ciudadana pueda inspeccionar libremente los antecedentes, estatutos, estados contables y certificaciones aportadas en la solicitud de calificación al Régimen Tributario Especial, garantizando el derecho a la rendición pública de cuentas y habilitando un canal directo y transparente para la radicación de comentarios e inconformidades.</p>
              </div>
            </div>

            <aside className={f.dian} aria-label="Comentarios de la sociedad civil ante la DIAN">
              <span className={f.dianIcon}>{chat}</span>
              <h3>Comentarios de la sociedad civil</h3>
              <p>Consulta la solicitud y radica tus comentarios o inconformidades directamente en el portal oficial de la DIAN.</p>
              <LinkButton href={DIAN_URL} target="_blank" rel="noopener noreferrer">Ir al portal DIAN {external}<span className="sr-only"> (se abre en una pestaña nueva)</span></LinkButton>
              <span className={f.dianUrl}>muisca.dian.gov.co · Publicación y comentarios RTE</span>
            </aside>
          </div>
        </div>
      </section>

      {/* TÍTULO 2 */}
      <section id="documentos" className={f.block} aria-labelledby="rte-t2" style={{ scrollMarginTop: 'var(--header-h)' }}>
        <div className="container">
          <p className={f.kicker}>Documentos para consulta pública</p>
          <h2 id="rte-t2" className={`display ${f.title}`}>Transparencia y Documentación de Soporte</h2>
          <p className={f.sub}>Documentos Oficiales Publicados para Consulta Pública</p>
          <p className={f.intro}>En atención al Artículo 364-5 del Estatuto Tributario, la Resolución 000019 de 2018 y el Decreto 1625 de 2016, se publican para el libre examen de los ciudadanos y autoridades los siguientes documentos oficiales que sustentan la solicitud de calificación.</p>

          <ol className={f.docs}>
            {rteDocs.map(d => (
              <li key={d.id}>
                <button type="button" className={f.doc} onClick={() => show(d)} aria-haspopup="dialog">
                  <span className={f.num} aria-hidden="true">{d.id}</span>
                  <span className={f.docTxt}>
                    <span className={f.docName}>{d.name}</span>
                    <span className={f.docMeta}>{d.pages} {d.pages === 1 ? 'página' : 'páginas'} · Solo consulta</span>
                  </span>
                  <span className={f.go}>{eye}<span>Ver</span></span>
                </button>
              </li>
            ))}
          </ol>
          <p className={f.foot}>Los documentos se muestran en este sitio solo para consulta. Por protección, no están disponibles para descarga.</p>
        </div>
      </section>

      {open && <Viewer doc={open} onClose={close} />}
    </>
  )
}

/** Visor a pantalla completa: muestra las páginas como imágenes (sin PDF, sin botón de descarga ni impresión). */
function Viewer({ doc, onClose }: { doc: RteDoc; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Bloquea guardar e imprimir desde el teclado mientras el visor está abierto.
      if ((e.ctrlKey || e.metaKey) && ['s', 'p'].includes(e.key.toLowerCase())) e.preventDefault()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus() }
  }, [onClose])

  return createPortal(
    <div ref={ref} className={f.viewer} role="dialog" aria-modal="true" aria-label={doc.name} tabIndex={-1}
      onContextMenu={e => e.preventDefault()} onDragStart={e => e.preventDefault()}>
      <div className={f.vBar}>
        <span className={f.num} aria-hidden="true">{doc.id}</span>
        <div className={f.vTitle}><b>{doc.name}</b><span>{doc.pages} {doc.pages === 1 ? 'página' : 'páginas'} · Solo consulta</span></div>
        <button type="button" className={f.vClose} onClick={onClose} aria-label="Cerrar documento">{Icon.close}</button>
      </div>
      <div className={f.vPages}>
        {Array.from({ length: doc.pages }, (_, i) => (
          <figure key={i} style={{ margin: 0, display: 'grid', gap: 6, justifyItems: 'center', width: '100%' }}>
            <div className={f.vPage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pageSrc(doc, i + 1)} alt={`${doc.name}, página ${i + 1} de ${doc.pages}`} loading={i < 2 ? 'eager' : 'lazy'} draggable={false} width={1275} height={1650} />
            </div>
            <figcaption className={f.vNum}>Página {i + 1} de {doc.pages}</figcaption>
          </figure>
        ))}
        <p className={f.vNote}>Documento publicado por la Fundación ASA Más para consulta pública (art. 364-5 E.T.). Uso exclusivo de consulta.</p>
      </div>
    </div>,
    document.body,
  )
}
