'use client'

import { motion } from 'framer-motion'
import { Apple, Play, Sparkles, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-royal/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-golden/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-royal/10 blur-[100px]" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[var(--surface)]/80 backdrop-blur border border-royal/15 text-royal mb-6 shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-golden" />
              </span>
              Beta — Kinshasa, RDC
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4.25rem] font-extrabold leading-[1.02] mb-6">
              <span>L&apos;application qui</span>{' '}
              <span className="text-gradient-brand">connecte</span>{' '}
              <span className="block">toute la</span>
              <span className="text-gradient-golden">République Démocratique</span>{' '}
              <span>du Congo</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mb-9 leading-relaxed">
              Cherchez, vendez, travaillez et payez dans une seule application.
              Immobilier, emploi, marché, paiements mobiles — tout est rassemblé
              dans MABELE.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="#inscription"
                className="group inline-flex items-center gap-2 px-7 py-3.5 font-bold gradient-golden text-white rounded-2xl shadow-golden hover:translate-y-[-2px] transition-all text-base"
              >
                Créer un compte
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href="#inscription"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold bg-[var(--surface)]/80 backdrop-blur border border-[var(--border)] hover:border-royal/30 hover:text-royal rounded-2xl shadow-sm transition-all text-base"
              >
                <Sparkles size={16} />
                Découvrir
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 bg-[var(--text-strong)] text-[var(--surface)] rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
              >
                <Apple size={18} />
                <span className="flex flex-col leading-none text-left">
                  <span className="text-[9px] font-medium opacity-70">
                    Disponible sur
                  </span>
                  <span className="text-xs font-bold mt-0.5">App Store</span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 bg-[var(--text-strong)] text-[var(--surface)] rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
              >
                <Play size={18} />
                <span className="flex flex-col leading-none text-left">
                  <span className="text-[9px] font-medium opacity-70">
                    Disponible sur
                  </span>
                  <span className="text-xs font-bold mt-0.5">Google Play</span>
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="relative">
              <div className="absolute -inset-12 bg-gradient-to-tr from-royal/30 via-golden/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute -inset-6 gradient-royal opacity-20 rounded-[3rem] blur-2xl" />

              {/* Floating badge — KangaPay */}
              <motion.div
                className="absolute -left-4 top-16 z-20 hidden sm:flex items-center gap-2 px-3 py-2 bg-[var(--surface)] rounded-2xl shadow-premium-lg border border-[var(--border)]/60"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 rounded-xl gradient-golden flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    KangaPay
                  </p>
                  <p className="text-xs font-bold">+250 000 FC reçus</p>
                </div>
              </motion.div>

              {/* Floating badge — Verified */}
              <motion.div
                className="absolute -right-2 bottom-24 z-20 hidden sm:flex items-center gap-2 px-3 py-2 bg-[var(--surface)] rounded-2xl shadow-premium-lg border border-[var(--border)]/60"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Identité
                  </p>
                  <p className="text-xs font-bold text-emerald-600">Vérifiée ✓</p>
                </div>
              </motion.div>

              <Image
                src="/mabele/hero-phone.png"
                alt="Application MABELE — écran principal"
                width={416}
                height={416}
                className="relative z-10 w-72 sm:w-80 lg:w-[26rem] animate-float drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          className="mt-14 lg:mt-20 pt-8 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span>🇨🇩 Made in DRC</span>
          <span className="hidden sm:inline">•</span>
          <span>Identité vérifiée</span>
          <span className="hidden sm:inline">•</span>
          <span>Paiement sécurisé</span>
          <span className="hidden sm:inline">•</span>
          <span>Disponible iOS &amp; Android</span>
        </motion.div>
      </div>
    </section>
  )
}
