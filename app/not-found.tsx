import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-7xl font-bold text-[var(--accent)] mb-4">404</p>
          <h1 className="text-2xl font-bold text-[var(--text)] mb-3">Page not found</h1>
          <p className="text-[var(--text2)] mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
