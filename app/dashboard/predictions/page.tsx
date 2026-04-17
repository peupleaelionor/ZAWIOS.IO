import { redirect } from 'next/navigation'

export default function DashboardPredictionsRedirect() {
  redirect('/dashboard/signals')
}
