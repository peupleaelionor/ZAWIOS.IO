import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PredictionRedirect({ params }: Props) {
  const { id } = await params
  redirect(`/signals/${id}`)
}
