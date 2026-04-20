'use client'

import { useState, useRef, useEffect } from 'react'
import { GIF_CATEGORIES, searchGifs, type GifItem } from '@/lib/gif-library'

interface GifPickerProps {
  open: boolean
  onClose: () => void
  onSelect: (gif: GifItem) => void
}

export function GifPicker({ open, onClose, onSelect }: GifPickerProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('reactions')
  const [failedPreviews, setFailedPreviews] = useState<Set<string>>(new Set())
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const isSearching = search.trim().length > 0
  const results = isSearching
    ? searchGifs(search)
    : GIF_CATEGORIES.find((c) => c.id === activeCategory)?.gifs ?? []

  return (
    <div
      ref={panelRef}
      className="gif-picker"
      style={{
        position: 'absolute',
        bottom: '100%',
        left: 0,
        width: '100%',
        minWidth: 280,
        maxWidth: 400,
        marginBottom: 8,
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: 16,
        overflow: 'hidden',
        zIndex: 50,
        boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        animation: 'gifPickerIn 200ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Search bar */}
      <div style={{ padding: '12px 14px 8px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search GIFs…"
            autoFocus
            style={{
              width: '100%',
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '8px 12px 8px 34px',
              color: 'var(--text)',
              fontSize: 13,
              fontFamily: 'var(--font)',
              outline: 'none',
            }}
          />
          {/* Search icon */}
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text3)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Category tabs */}
      {!isSearching && (
        <div
          className="scrollbar-none"
          style={{
            display: 'flex',
            gap: 4,
            padding: '0 14px 8px',
            overflowX: 'auto',
          }}
        >
          {GIF_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flexShrink: 0,
                padding: '5px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'var(--mono)',
                letterSpacing: '0.02em',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 150ms',
                background:
                  activeCategory === cat.id
                    ? 'rgba(107,110,248,0.15)'
                    : 'transparent',
                color:
                  activeCategory === cat.id ? 'var(--accent)' : 'var(--text3)',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* GIF grid */}
      <div
        className="scrollbar-none"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          padding: '0 6px 6px',
          maxHeight: 240,
          overflowY: 'auto',
        }}
      >
        {results.map((gif) => (
          <button
            key={gif.id}
            onClick={() => {
              onSelect(gif)
              onClose()
              setSearch('')
            }}
            title={gif.title}
            style={{
              position: 'relative',
              paddingTop: '75%',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              background: 'var(--surface2)',
              transition: 'border-color 150ms, transform 150ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {failedPreviews.has(gif.id) ? (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: 'var(--text3)',
                  fontFamily: 'var(--mono)',
                  padding: 4,
                  textAlign: 'center',
                }}
              >
                {gif.title}
              </span>
            ) : (
              <img
                src={gif.preview}
                alt={gif.title}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={() => {
                  setFailedPreviews((prev) => new Set(prev).add(gif.id))
                }}
              />
            )}
            {/* Title overlay */}
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 4px 3px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                fontSize: 10,
                color: '#fff',
                fontFamily: 'var(--mono)',
                textAlign: 'center',
              }}
            >
              {gif.title}
            </span>
          </button>
        ))}
      </div>

      {results.length === 0 && (
        <div
          style={{
            padding: '24px 16px',
            textAlign: 'center',
            color: 'var(--text3)',
            fontSize: 13,
          }}
        >
          No GIFs found for &ldquo;{search}&rdquo;
        </div>
      )}

      {/* Powered by notice */}
      <div
        style={{
          padding: '6px 14px 8px',
          textAlign: 'right',
          fontSize: 10,
          color: 'var(--text3)',
          fontFamily: 'var(--mono)',
          opacity: 0.7,
        }}
      >
        Powered by GIPHY
      </div>
    </div>
  )
}
