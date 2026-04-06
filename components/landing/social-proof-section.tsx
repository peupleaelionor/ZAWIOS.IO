export function SocialProofSection() {
  const stats = [
    { value: '47K+', label: 'Votants actifs' },
    { value: '32', label: 'Signaux / jour' },
    { value: '94', label: 'Pays' },
    { value: '64%', label: 'Precision moyenne' },
  ]

  return (
    <section className="py-12 bg-[var(--bg)]">
      <div className="container">
        <div
          className="max-w-2xl mx-auto surface"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {stats.map((stat, i, arr) => (
            <div
              key={stat.label}
              className="py-5 px-3 text-center"
              style={i < arr.length - 1 ? { borderRight: '1px solid var(--border)' } : {}}
            >
              <p
                className="text-lg md:text-xl font-bold text-[var(--text)]"
                style={{ fontFamily: 'var(--mono)' }}
              >
                {stat.value}
              </p>
              <p className="text-[10px] text-[var(--text3)] mt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--mono)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
