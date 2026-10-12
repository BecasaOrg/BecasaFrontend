import type { Metadata } from 'next'
import Landing from '@/views/Landing'
export const metadata: Metadata = { title: 'BECASA Camp · Campamento deportivo-académico · ASA', description: 'Entrena con coaches de universidades de Estados Unidos, entiende el sistema de becas y construye tu perfil de estudiante-atleta.' }
export default function Page() { return <Landing /> }
