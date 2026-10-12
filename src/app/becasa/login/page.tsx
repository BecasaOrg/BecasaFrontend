import { Suspense } from 'react'
import AuthPage from '@/views/AuthPage'
export const metadata = { title: 'Ingresar · ASA', robots: { index: false } }
export default function Page() { return <Suspense><AuthPage mode="ingresar" /></Suspense> }
