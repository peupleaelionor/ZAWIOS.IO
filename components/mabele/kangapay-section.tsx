'use client'

import { motion } from 'framer-motion'
import {
  Wallet,
  QrCode,
  Send,
  Download,
  Store,
  Clock,
  PiggyBank,
  Users,
  Receipt,
  ArrowUpRight,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

interface Feature {
  icon: LucideIcon
  label: string
  desc: string
  featured?: boolean
}

const features: Feature[] = [
  { icon: Wallet, label: 'Mon Wallet', desc: 'Solde, historique et gestion en temps réel.', featured: true },
  { icon: QrCode, label: 'Scanner QR', desc: 'Payez un marchand en scannant son code.' },
  { icon: Send, label: 'Envoyer', desc: 'Transférez de l\'argent instantanément.' },
  { icon: Download, label: 'Recevoir', desc: 'Recevez des fonds sur votre wallet.' },
  { icon: Store, label: 'Payer marchand', desc: 'Réglez vos achats chez les partenaires.' },
  { icon: Clock, label: 'Historique', desc: 'Suivez toutes vos transactions passées.' },
  { icon: PiggyBank, label: 'Épargne', desc: 'Épargnez automatiquement chaque mois.' },
  { icon: Users, label: 'Tontine', desc: 'Participez à des tontines numériques sécurisées.' },
  { icon: Receipt, label: 'Reçus', desc: 'Reçus numériques pour chaque transaction.' },
]

export function KangaPaySection() {
  return (
    <section
      id="kangapay"
      className="relative py-20 lg:py-32 gradient-midnight text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-royal/30 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-golden/15 blur-[120px]" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="kp-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kp-grid)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-14 lg:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-golden/15 text-golden mb-5 ring-1 ring-golden/20">
            <Wallet size={12} /> KangaPay &amp; Paiements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-[1.05]">
            Le portefeuille mobile{' '}
            <span className="text-gradient-golden">de confiance</span>
          </h2>
          <p className="text-white/70 text-base lg:text-lg">
            Envoyez, recevez, épargnez et payez vos marchands — directement
            depuis MABELE, partout en RDC.
          </p>
        </motion.div>

        {/* Featured wallet card + grid */}
        <div className="grid lg:grid-cols-[1.1fr_2fr] gap-6 mb-6">
          {/* Hero wallet preview */}
          <motion.div
            className="relative rounded-[1.75rem] p-7 overflow-hidden shadow-premium-xl"
            style={{
              background:
                'linear-gradient(135deg, hsl(218 70% 35%) 0%, hsl(222 76% 25%) 60%, hsl(228 50% 8%) 100%)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-golden/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl gradient-golden flex items-center justify-center">
                    <Wallet size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-sm">KangaPay</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/10">
                  Wallet
                </span>
              </div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                Solde disponible
              </p>
              <p className="text-4xl lg:text-5xl font-extrabold mb-1 tracking-tight">
                1 245 000{' '}
                <span className="text-xl text-golden">FC</span>
              </p>
              <p className="text-xs text-white/50 mb-7 flex items-center gap-1.5">
                <TrendingUp size={12} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold">+12,5%</span> ce
                mois
              </p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {([
                  { icon: Send, label: 'Envoyer' },
                  { icon: Download, label: 'Recevoir' },
                  { icon: QrCode, label: 'Scanner' },
                ] as const).map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 transition-colors"
                  >
                    <a.icon size={18} className="text-golden" />
                    <span className="text-[10px] font-bold">{a.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.05] border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Download size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">De Marie K.</p>
                    <p className="text-[10px] text-white/50">il y a 2 min</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-emerald-400">
                  +50 000 FC
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top features */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.slice(0, 4).map((f, i) => (
              <motion.div
                key={f.label}
                className="group relative rounded-2xl bg-white/[0.05] border border-white/10 p-6 hover:bg-white/[0.10] hover:border-golden/30 transition-all overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-golden/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl gradient-golden flex items-center justify-center shadow-golden group-hover:scale-110 transition-transform">
                    <f.icon size={22} className="text-white" strokeWidth={2.2} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/30 group-hover:text-golden transition-colors"
                  />
                </div>
                <h4 className="relative font-extrabold text-base mb-1">
                  {f.label}
                </h4>
                <p className="relative text-white/60 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.slice(4).map((f, i) => (
            <motion.div
              key={f.label}
              className="group rounded-2xl bg-white/[0.05] border border-white/10 p-5 hover:bg-white/[0.10] hover:border-golden/30 transition-all"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="w-10 h-10 rounded-xl bg-golden/15 ring-1 ring-golden/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <f.icon size={18} className="text-golden" strokeWidth={2.2} />
              </div>
              <h4 className="font-bold text-sm mb-0.5">{f.label}</h4>
              <p className="text-white/55 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
