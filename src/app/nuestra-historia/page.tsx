import type { Metadata } from 'next'
import NuestraHistoria from '@/views/NuestraHistoria'
export const metadata: Metadata = { title: 'Nuestra historia · ASA', description: 'ASA nació de dos estudiantes-atletas colombianos. Formación, representación y mentoría para que nadie llegue solo a Estados Unidos.' }
export default function Page() { return <NuestraHistoria /> }
