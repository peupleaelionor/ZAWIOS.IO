'use client'

import {
  MabeleHeader,
  HeroSection,
  ServicesSection,
  BenefitsSection,
  KangaPaySection,
  ScreensSection,
  TrustSection,
  DownloadCTA,
  MabeleFooter,
} from '@/components/mabele'

export default function MabelePage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <MabeleHeader />
      <HeroSection />
      <ServicesSection />
      <BenefitsSection />
      <KangaPaySection />
      <ScreensSection />
      <TrustSection />
      <DownloadCTA />
      <MabeleFooter />
    </div>
  )
}
