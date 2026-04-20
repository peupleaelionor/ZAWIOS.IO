import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brand Kit',
  description: 'Logos, tokens et ressources visuelles ZAWIOS.',
  robots: { index: false, follow: false },
}

const ASSETS = [
  { name: 'Logo mark SVG 32px', path: '/brand-kit/logos/logo-mark-32.svg', type: 'SVG' },
  { name: 'Logo mark SVG 64px', path: '/brand-kit/logos/logo-mark-64.svg', type: 'SVG' },
  { name: 'App icon 192px',     path: '/app-icons/icon-192.png',           type: 'PNG' },
  { name: 'App icon 512px',     path: '/app-icons/icon-512.png',           type: 'PNG' },
  { name: 'Brand tokens',       path: '/brand-kit/tokens.json',            type: 'JSON' },
  { name: 'Copy FR',            path: '/brand-kit/copy/fr.json',           type: 'JSON' },
  { name: 'Copy EN',            path: '/brand-kit/copy/en.json',           type: 'JSON' },
]

export default function BrandKitPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '48px 20px 80px',
        color: 'var(--text)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Brand Kit
      </p>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          marginBottom: 40,
        }}
      >
        Ressources ZAWIOS
      </h1>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr
            style={{
              borderBottom: '1px solid var(--border2)',
              textAlign: 'left',
            }}
          >
            <th style={{ padding: '8px 12px 8px 0', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--text3)', fontWeight: 500 }}>
              FICHIER
            </th>
            <th style={{ padding: '8px 12px 8px 0', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--text3)', fontWeight: 500 }}>
              TYPE
            </th>
            <th style={{ padding: '8px 0', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--text3)', fontWeight: 500, textAlign: 'right' }}>
              LIEN
            </th>
          </tr>
        </thead>
        <tbody>
          {ASSETS.map((a) => (
            <tr
              key={a.path}
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <td style={{ padding: '12px 12px 12px 0', fontSize: 14, color: 'var(--text)' }}>
                {a.name}
              </td>
              <td style={{ padding: '12px 12px 12px 0', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' }}>
                {a.type}
              </td>
              <td style={{ padding: '12px 0', textAlign: 'right' }}>
                <a
                  href={a.path}
                  download
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                  }}
                >
                  Télécharger ↓
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: 48, fontSize: 13, color: 'var(--text3)' }}>
        Usage réservé aux partenaires officiels ZAWIOS.{' '}
        <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          ← Retour
        </Link>
      </p>
    </div>
  )
}
