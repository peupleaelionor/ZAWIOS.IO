import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'ZAWIOS Terms of Service — the rules and conditions for using our platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="container py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Terms of Service</h1>
          <p className="text-sm text-[var(--text2)] mb-10">Last updated: January 2025</p>
          <div className="space-y-8 text-[var(--text2)] leading-relaxed">
            {[
              {
                title: '1. Acceptance of terms',
                content: 'By creating an account or using ZAWIOS, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the platform.',
              },
              {
                title: '2. No monetary element',
                content: 'ZAWIOS is strictly a signal and reputation platform. There is no real money, no cryptocurrency, no tokens of monetary value, and no financial prizes. All points and scores are non-monetary. ZAWIOS is not a financial platform.',
              },
              {
                title: '3. Eligibility',
                content: 'You must be at least 13 years old to use ZAWIOS. If you are under 18, you must have parental consent.',
              },
              {
                title: '4. User conduct',
                content: 'You agree not to post false or misleading information, harass other users, attempt to manipulate the platform, or engage in any activity that disrupts the integrity of signals. Violations may result in account suspension.',
              },
              {
                title: '5. Content ownership',
                content: 'You retain ownership of the signals and content you create. By posting on ZAWIOS, you grant us a license to display and use that content to operate the platform.',
              },
              {
                title: '6. Accuracy and resolution',
                content: 'ZAWIOS makes reasonable efforts to resolve signals accurately using public verifiable sources. We are not responsible for disagreements about outcomes. Our moderation decisions on signal resolution are final.',
              },
              {
                title: '7. Termination',
                content: 'We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from your settings page.',
              },
              {
                title: '8. Limitation of liability',
                content: 'ZAWIOS is provided "as is." We make no warranty about accuracy, availability, or fitness for any particular purpose. Our liability is limited to the maximum extent permitted by law.',
              },
              {
                title: '9. Changes to terms',
                content: 'We may update these terms from time to time. We will notify you of material changes by email or prominent notice on the platform.',
              },
              {
                title: '10. Contact',
                content: 'For questions about these terms, contact legal@zawios.io.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-[var(--text)] mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
