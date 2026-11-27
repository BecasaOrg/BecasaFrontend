/* Fundación ASA Más · Registro Web RTE (DIAN).
   Cada documento se publica como imágenes por página (public/fundacion-asa-mas/docs/NN/pXX.webp),
   con marca de agua "Solo consulta". El PDF original NO se publica en el sitio. */

export type RteDoc = { id: string; name: string; pages: number }

export const rteDocs: RteDoc[] = [
  { id: '01', name: 'Estados financieros oficiales año 2025', pages: 9 },
  { id: '02', name: 'Certificado de existencia y representación legal', pages: 9 },
  { id: '03', name: 'Estatutos vigentes de la fundación', pages: 8 },
  { id: '04', name: 'Acta de constitución', pages: 2 },
  { id: '05', name: 'Acta de asamblea', pages: 11 },
  { id: '06', name: 'RUT', pages: 3 },
  { id: '07', name: 'Radicado solicitud de calificación', pages: 3 },
]

export const pageSrc = (doc: RteDoc, n: number) => `/fundacion-asa-mas/docs/${doc.id}/p${String(n).padStart(2, '0')}.webp`

export const DIAN_URL = 'https://muisca.dian.gov.co/WebRetesal/DefPublicacionYComentariosSolCondicionesServicio.faces'
