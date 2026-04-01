export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    </div>
  )
}
