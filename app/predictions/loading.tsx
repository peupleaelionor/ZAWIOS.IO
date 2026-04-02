export default function PredictionsLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="h-16" style={{ borderBottom: '1px solid var(--border)' }} />
      <div className="container py-10">
        <div className="h-8 w-48 rounded-lg mb-6 animate-pulse" style={{ background: 'var(--surface3)' }} />
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-20 rounded-full animate-pulse" style={{ background: 'var(--surface2)' }} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 rounded-xl animate-pulse surface" />
          ))}
        </div>
      </div>
    </div>
  )
}
