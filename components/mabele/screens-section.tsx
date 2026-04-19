'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Compass,
  ArrowRightLeft,
  Eye,
  PenLine,
  MessageCircle,
  User,
  Bell,
  type LucideIcon,
} from 'lucide-react'

interface Screen {
  icon: LucideIcon
  label: string
  desc: string
  tag: string
}

const screens: Screen[] = [
  { icon: LayoutDashboard, label: 'Dashboard Accueil', desc: 'Hub central pour accéder à tous les services.', tag: 'Accueil' },
  { icon: Compass, label: 'Explorer les services', desc: 'Parcourez immobilier, emploi, marché et plus.', tag: 'Discover' },
  { icon: ArrowRightLeft, label: 'Transactions & Listings', desc: 'Gérez vos annonces et vos échanges.', tag: 'Activité' },
  { icon: Eye, label: 'Détail Annonce', desc: 'Fiche complète avec photos, prix et contact.', tag: 'Listing' },
  { icon: PenLine, label: 'Publier une annonce', desc: 'Créez et publiez en quelques étapes simples.', tag: 'Créer' },
  { icon: MessageCircle, label: 'Messagerie & Trust', desc: 'Discutez en confiance avec des profils vérifiés.', tag: 'Chat' },
  { icon: User, label: 'Mon compte & Alertes', desc: 'Notifications, paramètres et historique.', tag: 'Profil' },
  { icon: Bell, label: 'Notifications temps réel', desc: 'Suivez les évolutions importantes à la seconde.', tag: 'Alertes' },
]

export function ScreensSection() {
  return (
    <section className="py-20 lg:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-royal/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-14 lg:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-royal/10 text-royal mb-5">
            Aperçu produit
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-[1.05]">
            L&apos;écosystème{' '}
            <span className="text-gradient-brand">MABELE</span>
          </h2>
          <p className="text-[var(--text-muted)] text-base lg:text-lg">
            Une plateforme complète pensée pour simplifier le quotidien en RDC.
            Chaque écran, chaque interaction est pensé pour l&apos;utilisateur
            congolais.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {screens.map((s, i) => (
            <motion.div
              key={s.label}
              className="group card-premium p-5"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="relative w-full h-32 rounded-2xl gradient-royal-vivid mb-5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id={`scr-${i}`}
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="2" cy="2" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#scr-${i})`} />
                  </svg>
                </div>
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-golden/30 blur-2xl group-hover:bg-golden/50 transition-colors" />
                <s.icon
                  size={40}
                  className="relative text-white/90 group-hover:scale-110 transition-transform"
                  strokeWidth={1.8}
                />
                <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur">
                  {s.tag}
                </span>
              </div>
              <h4 className="font-extrabold text-sm mb-1">{s.label}</h4>
              <p className="text-[var(--text-muted)] text-xs leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
