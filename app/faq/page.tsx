'use client'
import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { IconChevronDown } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'What is ZAWIOS?',
    answer: "ZAWIOS is a collective intelligence platform where you predict future events, vote on questions, and build a public reputation based on your accuracy over time. It's not gambling — there's no money involved. It's about signal, data, and reputation.",
  },
  {
    question: 'How does the reputation system work?',
    answer: "Your reputation score is based on your signal accuracy over time. When a signal resolves, users who voted correctly receive score points. The weight of each point depends on the question's difficulty and the number of voters. Your global rank updates in real-time.",
  },
  {
    question: 'Is there any real money involved?',
    answer: 'No. ZAWIOS is not a betting platform. There is no real money, no cryptocurrency, no tokens, and no financial prizes. You earn points, reputation, badges, and ranking — but no monetary value.',
  },
  {
    question: 'How are signals resolved?',
    answer: 'Signals are resolved by our moderation team when the resolution date arrives or when the outcome becomes clear. We use public verifiable sources. The resolution process and sources are always made transparent.',
  },
  {
    question: 'Can I create my own signals?',
    answer: 'Yes! Any registered user can create signals. All signals go through a brief moderation check before going live to ensure quality and clarity.',
  },
  {
    question: 'What is Premium?',
    answer: 'Premium unlocks advanced stats, full history exports, detailed analytics, custom alerts, and priority support. The core signal and voting experience is always free.',
  },
  {
    question: 'How do I improve my accuracy score?',
    answer: 'Focus on signals in areas where you have genuine knowledge. Take time to research before voting. Be willing to update your views as new evidence emerges. Consistency and discipline over many signals will naturally improve your track record.',
  },
  {
    question: 'Is my profile public?',
    answer: 'Yes, by default. Your signals, vote history, and reputation score are public so others can evaluate your track record. You can control specific aspects of your privacy in account settings.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[var(--border)]">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-[var(--text)]">{question}</span>
        <IconChevronDown className={cn('w-4 h-4 text-[var(--text3)] flex-shrink-0 transition-transform', open && 'rotate-180')} size={16} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-96 pb-5' : 'max-h-0')}>
        <p className="text-sm text-[var(--text2)] leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />
      <main className="container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Support</Badge>
            <h1 className="text-3xl font-bold text-[var(--text)]">Frequently asked questions</h1>
            <p className="mt-3 text-[var(--text2)]">Everything you need to know about ZAWIOS</p>
          </div>
          <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
