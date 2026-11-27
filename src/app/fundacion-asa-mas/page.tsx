import type { Metadata } from 'next'
import Fundacion from '@/views/Fundacion'

export const metadata: Metadata = {
  title: 'Fundación ASA Más · Registro Web RTE (DIAN)',
  description: 'Transparencia y Régimen Tributario Especial de la Fundación ASA Más: información del artículo 364-5 del Estatuto Tributario, documentos de consulta pública y enlace para comentarios ante la DIAN.',
}

export default function Page() { return <Fundacion /> }
