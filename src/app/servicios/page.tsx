import type { Metadata } from 'next'
import Servicios from '@/views/Servicios'
export const metadata: Metadata = { title: 'Servicios · Siete fases y un puente · ASA', description: 'Tu camino al campus fase por fase: diagnóstico gratuito, roadmap, perfil, promoción, decisión, visa y mentoría en la universidad.' }
export default function Page() { return <Servicios /> }
