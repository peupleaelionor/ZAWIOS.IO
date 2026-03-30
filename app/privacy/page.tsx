import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ZAWIOS Privacy Policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="container py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-zinc-500 mb-10">Last updated: January 2025</p>

          <div className="space-y-8">
            {[
              {
                title: '1. Information we collect',
                content: 'We collect information you provide directly: your name, email address, and username when you create an account. We also collect your predictions, votes, and interactions on the platform. Technical data includes IP addresses, browser type, and usage analytics to improve the product.',
              },
              {
                title: '2. How we use your information',
                content: 'We use your data to provide the ZAWIOS service, calculate your reputation score, display your public profile, send you notifications about predictions, and improve the platform. We never sell your personal data to third parties.',
              },
              {
                title: '3. Public profile data',
                content: 'Your username, prediction history, votes, and reputation score are public by default. This transparency is fundamental to the integrity of the platform. You can control some visibility settings in your account preferences.',
              },
              {
                title: '4. Data retention',
                content: 'We retain your account data for as long as your account is active. If you delete your account, we will delete or anonymize your personal data within 30 days, though aggregate statistics may remain.',
              },
              {
                title: '5. Security',
                content: 'We implement industry-standard security measures including encryption in transit and at rest, secure authentication, and regular security audits. Your password is never stored in plain text.',
              },
              {
                title: '6. Your rights',
                content: 'You have the right to access, correct, or delete your personal data. You can export your data at any time. To exercise these rights, contact us at privacy@zawios.io.',
              },
              {
                title: '7. Cookies',
                content: 'We use essential cookies to maintain your session and preferences. We use analytics cookies (opt-out available) to understand how people use ZAWIOS and improve the experience.',
              },
              {
                title: '8. Contact',
                content: 'For privacy questions or requests, contact our privacy team at privacy@zawios.io.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{section.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
