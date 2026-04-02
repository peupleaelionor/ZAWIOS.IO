export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="flex">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-64 min-h-screen p-6" style={{ borderRight: '1px solid var(--border)', background: 'var(--surface)' }}>
          <div className="h-8 w-28 rounded-lg mb-8 animate-pulse" style={{ background: 'var(--surface3)' }} />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-9 rounded-lg animate-pulse" style={{ background: 'var(--surface2)' }} />
            ))}
          </div>
        </div>
        {/* Content skeleton */}
        <div className="flex-1 p-6 lg:p-10">
          <div className="h-8 w-48 rounded-lg mb-2 animate-pulse" style={{ background: 'var(--surface3)' }} />
          <div className="h-5 w-64 rounded-lg mb-8 animate-pulse" style={{ background: 'var(--surface2)' }} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl animate-pulse surface" />
            ))}
          </div>
          <div className="h-64 rounded-xl animate-pulse surface" />
        </div>
      </div>
    </div>
  )
}
