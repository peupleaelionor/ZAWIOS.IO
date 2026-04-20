'use client'

import { useLanguage } from '@/components/providers/language-provider'

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '6px',
        border: '1px solid var(--border)',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--mono)',
        fontWeight: 600,
        fontSize: '11px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        transition: 'all 150ms ease',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget
        t.style.borderColor = 'var(--primary)'
        t.style.color = 'var(--primary)'
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget
        t.style.borderColor = 'var(--border)'
        t.style.color = 'var(--text-muted)'
      }}
    >
      <span style={{ opacity: lang === 'fr' ? 1 : 0.45 }}>FR</span>
      <span style={{ opacity: 0.3 }}>/</span>
      <span style={{ opacity: lang === 'en' ? 1 : 0.45 }}>EN</span>
    </button>
  )
}
