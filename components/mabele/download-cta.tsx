'use client'

import { motion } from 'framer-motion'
import {
  Apple,
  Play,
  Home,
  Briefcase,
  ShoppingBag,
  Wallet,
  Sprout,
  Shield,
  Sparkles,
} from 'lucide-react'

const modules = [
  { icon: Home, label: 'Immobilier' },
  { icon: Briefcase, label: 'Emploi' },
  { icon: ShoppingBag, label: 'Marché' },
  { icon: Wallet, label: 'KangaPay' },
  { icon: Sprout, label: 'Agri' },
  { icon: Shield, label: 'SIKIN' },
]

export function DownloadCTA() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden p-10 lg:p-16 text-center gradient-midnight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-royal/40 blur-[120px]" />
            <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] rounded-full bg-golden/20 blur-[120px]" />
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.04]"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern id="cta-grid" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          <div className="relative text-white">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-golden/15 text-golden ring-1 ring-golden/20 mb-6">
              <Sparkles size={12} /> Disponible sur iOS &amp; Android
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-5 leading-[1.05] max-w-3xl mx-auto">
              Téléchargez l&apos;app{' '}
              <span className="text-gradient-golden">MABELE</span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-base lg:text-lg mb-10">
              Tout votre quotidien en RDC, rassemblé au même endroit. Une seule
              app pour chercher, vendre, travailler et payer.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <a
                href="#"
                className="flex items-center gap-3 px-7 py-4 bg-white text-[var(--text-strong)] rounded-2xl font-bold hover:opacity-95 transition-opacity shadow-premium-lg"
              >
                <Apple size={22} />
                <span className="flex flex-col leading-none text-left">
                  <span className="text-[10px] font-medium opacity-60">
                    Disponible sur
                  </span>
                  <span className="text-base font-extrabold mt-0.5">
                    App Store
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-7 py-4 bg-white text-[var(--text-strong)] rounded-2xl font-bold hover:opacity-95 transition-opacity shadow-premium-lg"
              >
                <Play size={22} />
                <span className="flex flex-col leading-none text-left">
                  <span className="text-[10px] font-medium opacity-60">
                    Disponible sur
                  </span>
                  <span className="text-base font-extrabold mt-0.5">
                    Google Play
                  </span>
                </span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {modules.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-2 px-4 py-2 bg-white/[0.08] ring-1 ring-white/10 rounded-xl hover:bg-white/[0.15] transition-colors"
                >
                  <m.icon size={14} className="text-golden" />
                  <span className="text-xs font-bold">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
