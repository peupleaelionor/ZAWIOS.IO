import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'MABELE — L\'app tout-en-un de la RDC',
  description:
    'Cherchez, vendez, travaillez et payez dans une seule application. Immobilier, emploi, marché, paiements mobiles — tout est rassemblé dans MABELE.',
  openGraph: {
    title: 'MABELE — L\'app tout-en-un de la RDC',
    description:
      'Cherchez, vendez, travaillez et payez dans une seule application.',
    siteName: 'MABELE by Flow Tech DRC',
    locale: 'fr_FR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function MabeleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
