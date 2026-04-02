export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--surface3)', borderTopColor: 'var(--accent)' }} />
        <p className="text-sm text-[var(--text3)]" style={{ fontFamily: 'var(--mono)' }}>Loading...</p>
      </div>
    </div>
  )
}
