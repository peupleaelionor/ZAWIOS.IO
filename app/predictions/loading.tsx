export default function PredictionsLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="h-16 border-b border-zinc-200 dark:border-zinc-800" />
      <div className="container py-10">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-6 animate-pulse" />
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
