export function SocialProofSection() {
  const stats = [
    { value: '47K+', label: 'Votants actifs', sub: '+18% ce mois' },
    { value: '32',   label: 'Signaux / jour',  sub: 'Mis à jour en continu' },
    { value: '94',   label: 'Pays représentés', sub: '4 continents' },
    { value: '64%',  label: 'Précision foule',  sub: 'Moyenne globale' },
  ]

  return (
    <section className="py-8 md:py-12" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-5 px-3 rounded-2xl"
              style={{
                background: 'var(--surface)',
                border:     '1px solid var(--border2)',
              }}
            >
              <p
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-[11px] font-semibold mt-1 uppercase tracking-wider"
                style={{ color: 'var(--text2)', fontFamily: 'var(--mono)' }}
              >
                {stat.label}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--text3)' }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
