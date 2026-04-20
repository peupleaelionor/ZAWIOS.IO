'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, CreditCard, Smartphone, UserCheck, ArrowRight, Lock } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'Identité validée', desc: 'Chaque utilisateur est vérifié pour votre sécurité.' },
  { icon: CreditCard, label: 'Paiement sécurisé', desc: 'Transactions protégées de bout en bout via KangaPay.' },
  { icon: Smartphone, label: 'KangaPay Mobile', desc: 'Payez et recevez depuis votre téléphone, partout.' },
  { icon: UserCheck, label: 'Compte vérifié', desc: 'Badges de confiance pour les profils certifiés.' },
]

export function TrustSection() {
  return (
    <section id="inscription" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-royal/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center">
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-royal/10 text-royal mb-5">
              Confiance &amp; Sécurité
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-[1.05]">
              Un environnement{' '}
              <span className="text-gradient-brand">fiable</span>, pensé pour la
              RDC.
            </h2>
            <p className="text-[var(--text-muted)] mb-9 text-base lg:text-lg max-w-lg">
              Identité, paiements et profils vérifiés — chaque interaction est
              protégée pour vous donner confiance.
            </p>
            <div className="space-y-3">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-royal/20 hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-royal flex items-center justify-center shrink-0 shadow-royal">
                    <b.icon size={20} className="text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-0.5">{b.label}</h4>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Signup form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 gradient-royal opacity-10 rounded-[2rem] blur-2xl" />
            <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-golden/30 blur-2xl" />

            <div className="relative bg-[var(--surface)] rounded-[1.75rem] p-8 lg:p-10 border border-[var(--border)] shadow-premium-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-golden/15 text-golden-deep">
                  Gratuit
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  Aucune carte requise
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-extrabold mb-2">
                Créer mon compte
              </h3>
              <p className="text-[var(--text-muted)] mb-7 text-sm">
                Rejoignez des milliers d&apos;utilisateurs à travers la RDC.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs font-bold mb-1.5 block text-[var(--text-muted)] uppercase tracking-wider">
                    Prénom
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Merveille"
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm font-medium placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold mb-1.5 block text-[var(--text-muted)] uppercase tracking-wider">
                    Téléphone
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-sm font-bold">
                      🇨🇩 +243
                    </span>
                    <input
                      type="tel"
                      placeholder="812 345 678"
                      className="flex-1 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm font-medium placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-1.5 block text-[var(--text-muted)] uppercase tracking-wider">
                    Vous êtes
                  </label>
                  <select className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm font-medium focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all">
                    <option>Particulier</option>
                    <option>Professionnel</option>
                    <option>Agent immobilier</option>
                    <option>Commerçant</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="group w-full py-4 gradient-golden text-white font-extrabold rounded-xl shadow-golden hover:translate-y-[-1px] transition-all text-base flex items-center justify-center gap-2"
                >
                  Créer mon compte gratuitement
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)] text-center pt-1">
                  <Lock size={12} /> Vos données sont chiffrées et privées.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
