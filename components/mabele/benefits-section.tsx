'use client'

import { motion } from 'framer-motion'
import { Search, ShoppingCart, Briefcase, Wallet, Layers, Check, type LucideIcon } from 'lucide-react'
import Image from 'next/image'

const benefits: { icon: LucideIcon; text: string }[] = [
  { icon: Search, text: 'Rechercher facilement n\'importe quel bien ou service' },
  { icon: ShoppingCart, text: 'Vendre et acheter en toute confiance' },
  { icon: Briefcase, text: 'Trouver des opportunités d\'emploi partout en RDC' },
  { icon: Wallet, text: 'Payer et recevoir avec KangaPay' },
  { icon: Layers, text: 'Gérer plusieurs services depuis un seul compte' },
]

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-golden/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-royal/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-golden/15 text-golden-deep mb-5">
              Au quotidien
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-[1.05]">
              Tout pour <span className="text-gradient-golden">avancer</span> au
              quotidien
            </h2>
            <p className="text-[var(--text-muted)] text-base lg:text-lg mb-8 max-w-lg">
              Une seule application pour gérer tous les aspects essentiels de
              votre vie en RDC.
            </p>
            <div className="space-y-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-blue transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-11 h-11 rounded-xl gradient-golden flex items-center justify-center shrink-0 shadow-golden">
                    <b.icon size={18} className="text-white" strokeWidth={2.4} />
                  </div>
                  <p className="text-sm lg:text-base font-semibold flex-1">
                    {b.text}
                  </p>
                  <Check
                    size={18}
                    className="text-emerald-600 shrink-0"
                    strokeWidth={2.5}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center gap-4 lg:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-8 gradient-royal opacity-10 blur-3xl rounded-full" />
            <Image
              src="/mabele/hero-phone.png"
              alt="MABELE mobile"
              width={224}
              height={224}
              className="relative w-44 lg:w-56 drop-shadow-2xl rounded-3xl"
            />
            <Image
              src="/mabele/hero-phone.png"
              alt="MABELE mobile"
              width={224}
              height={224}
              className="relative w-44 lg:w-56 drop-shadow-2xl rounded-3xl mt-12"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
