import { Suspense } from 'react'
import DashboardPage from '@/views/DashboardPage'
export const metadata = { title: 'Mi tablero · ASA', robots: { index: false } }
export default function Page() { return <Suspense><DashboardPage /></Suspense> }
