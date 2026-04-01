export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="flex">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 min-h-screen p-6">
          <div className="h-8 w-28 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-8 animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-9 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        {/* Content skeleton */}
        <div className="flex-1 p-6 lg:p-10">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-2 animate-pulse" />
          <div className="h-5 w-64 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-8 animate-pulse" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
