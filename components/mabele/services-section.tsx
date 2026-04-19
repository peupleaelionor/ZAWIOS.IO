'use client'

import { motion } from 'framer-motion'
import {
  Home,
  Briefcase,
  ShoppingBag,
  Wallet,
  Sprout,
  Shield,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  icon: LucideIcon
  label: string
  desc: string
  accent: string
  tag: string
  featured?: boolean
}

const services: Service[] = [
  {
    icon: Home,
    label: 'Immobilier',
    desc: 'Achetez, louez ou vendez des biens partout en RDC.',
    accent: 'royal',
    tag: '+12k annonces',
  },
  {
    icon: Briefcase,
    label: 'Emploi',
    desc: 'Trouvez des opportunités ou publiez vos offres.',
    accent: 'golden',
    tag: 'Offres vérifiées',
  },
  {
    icon: ShoppingBag,
    label: 'Marché',
    desc: 'Achetez et vendez produits neufs ou d\'occasion.',
    accent: 'red',
    tag: 'Livraison locale',
  },
  {
    icon: Wallet,
    label: 'KangaPay',
    desc: 'Envoyez, recevez et payez en toute sécurité.',
    accent: 'midnight',
    tag: 'Paiement instantané',
    featured: true,
  },
  {
    icon: Sprout,
    label: 'Agriculture',
    desc: 'Connectez producteurs et acheteurs agricoles.',
    accent: 'emerald',
    tag: 'Du champ au marché',
  },
  {
    icon: Shield,
    label: 'SIKIN',
    desc: 'Protection et services de confiance numérique.',
    accent: 'royal',
    tag: 'Trust & Sécurité',
  },
]

const accentMap: Record<
  string,
  { bg: string; ring: string; icon: string; chip: string }
> = {
  royal: {
    bg: 'bg-royal/8',
    ring: 'ring-royal/15',
    icon: 'gradient-royal text-white',
    chip: 'bg-royal/10 text-royal',
  },
  golden: {
    bg: 'bg-golden/8',
    ring: 'ring-golden/20',
    icon: 'gradient-golden text-white',
    chip: 'bg-golden/15 text-golden-deep',
  },
  red: {
    bg: 'bg-brand-red/8',
    ring: 'ring-brand-red/15',
    icon: 'bg-brand-red text-white',
    chip: 'bg-brand-red/10 text-brand-red',
  },
  midnight: {
    bg: 'bg-midnight',
    ring: 'ring-midnight/30',
    icon: 'gradient-golden text-white',
    chip: 'bg-golden/20 text-golden',
  },
  emerald: {
    bg: 'bg-emerald-500/8',
    ring: 'ring-emerald-500/15',
    icon: 'bg-emerald-500 text-white',
    chip: 'bg-emerald-500/10 text-emerald-700',
  },
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-royal/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-golden/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-14 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-royal/10 text-royal mb-5">
            L&apos;écosystème MABELE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 max-w-3xl mx-auto leading-[1.05]">
            Tous vos services,{' '}
            <span className="text-gradient-brand">une seule app</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto text-base lg:text-lg">
            MABELE rassemble les outils essentiels du quotidien congolais dans
            un écosystème unique, fiable et moderne.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((s, i) => {
            const a = accentMap[s.accent]
            const isDark = s.accent === 'midnight'
            return (
              <motion.a
                key={s.label}
                href={s.label === 'KangaPay' ? '#kangapay' : '#services'}
                className={`group relative overflow-hidden rounded-3xl p-7 ring-1 ${a.ring} ${
                  isDark ? 'card-premium-dark' : 'card-premium'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <div
                  className={`absolute -top-12 -right-12 w-40 h-40 rounded-full ${
                    isDark ? 'bg-golden/10' : a.bg
                  } blur-2xl group-hover:scale-110 transition-transform duration-500`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${a.icon} flex items-center justify-center shadow-md group-hover:scale-105 group-hover:rotate-[-4deg] transition-transform duration-300`}
                    >
                      <s.icon size={26} strokeWidth={2.2} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className={`${
                        isDark
                          ? 'text-white/40 group-hover:text-golden'
                          : 'text-[var(--text-subtle)] group-hover:text-royal'
                      } transition-colors`}
                    />
                  </div>

                  <h3
                    className={`font-extrabold text-xl mb-2 ${
                      isDark ? 'text-white' : ''
                    }`}
                  >
                    {s.label}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-5 ${
                      isDark ? 'text-white/70' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {s.desc}
                  </p>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                      isDark ? 'bg-golden/15 text-golden' : a.chip
                    }`}
                  >
                    {s.tag}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
