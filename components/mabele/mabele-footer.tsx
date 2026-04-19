import { Apple, Play } from 'lucide-react'
import Image from 'next/image'

const links = {
  Produit: ['Immobilier', 'Emploi', 'Marché', 'Agriculture'],
  Solutions: ['KangaPay', 'SIKIN', 'Tontine', 'Épargne'],
  Entreprise: ['À propos', 'Contact', 'Carrières', 'Presse'],
  Légal: ['Confidentialité', 'Conditions', 'CGU', 'Cookies'],
}

export function MabeleFooter() {
  return (
    <footer className="relative gradient-midnight text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-royal/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-golden/8 blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-golden/30 blur-md rounded-full" />
                <Image
                  src="/mabele/mabele-logo.png"
                  alt="MABELE"
                  width={40}
                  height={40}
                  className="relative object-contain brightness-200"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-2xl">
                  MABELE
                </span>
                <span className="text-[10px] font-semibold text-golden tracking-[0.18em] uppercase mt-1">
                  by Flow Tech DRC
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              L&apos;application tout-en-un pour la République Démocratique du
              Congo. Cherchez, vendez, travaillez et payez — au même endroit.
            </p>
            <div className="flex gap-2 mb-5">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 bg-white/[0.08] hover:bg-white/[0.15] ring-1 ring-white/10 rounded-xl text-xs font-bold transition-colors"
              >
                <Apple size={14} /> App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 bg-white/[0.08] hover:bg-white/[0.15] ring-1 ring-white/10 rounded-xl text-xs font-bold transition-colors"
              >
                <Play size={14} /> Google Play
              </a>
            </div>
            <p className="text-white/40 text-xs">
              📍 Kinshasa, République Démocratique du Congo
            </p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-extrabold text-xs mb-4 text-golden uppercase tracking-[0.15em]">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © 2026{' '}
            <span className="font-bold text-white/80">MABELE</span> · une
            initiative{' '}
            <span className="font-bold text-golden">Flow Tech DRC</span>. Tous
            droits réservés.
          </p>
          <p className="text-xs text-white/40">
            Fait avec ❤️ à Kinshasa, RDC
          </p>
        </div>
      </div>
    </footer>
  )
}
