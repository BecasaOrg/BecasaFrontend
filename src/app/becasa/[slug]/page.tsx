import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CampDetail from '@/views/CampDetail'
import { camps } from '@/data/becasa'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return camps.map(c => ({ slug: c.slug })) }
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const camp = camps.find(c => c.slug === slug)
  if (!camp) return {}
  return { title: `${camp.title} · ${camp.dates.label}`, description: `${camp.sport} en ${camp.city}: rutas, coaches de Estados Unidos y Scorecard ASA. Inscríbete.` }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!camps.some(c => c.slug === slug)) notFound()
  return <CampDetail slug={slug} />
}
