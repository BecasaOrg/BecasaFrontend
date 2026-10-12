'use client'

import { useSearchParams } from 'next/navigation'
import Dashboard from './Dashboard'

export default function DashboardPage() {
  const q = useSearchParams()
  return <Dashboard tab={q.get('tab') ?? undefined} />
}
