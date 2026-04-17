'use client'

import { useState, useRef, useEffect } from 'react'

// ── Reaction definitions ─────────────────────────────────────────────────
export type ReactionType = 'fire' | 'brain' | 'bullseye' | 'clap' | 'diamond' | 'eyes'

export interface ReactionCount {
  type: ReactionType
  count: number
}

interface ReactionDef {
  type: ReactionType
  label: string
  color: string
  svg: string // SVG path data
}

const REACTIONS: ReactionDef[] = [
  {
    type: 'fire',
    label: 'Hot take',
    color: '#F0404E',
    svg: 'M12 23c-3.6 0-7-2.5-7-7 0-3 1.5-4.5 3-6.5S12 5 12 1c0 0 3 3 3 6.5s-.5 3.5-1 5c-.2.6.4 1.2 1 .8 1.5-1 2.5-2.5 3-4.3 0 0 2 2 2 5 0 4.5-3.4 9-8 9z',
  },
  {
    type: 'brain',
    label: 'Smart',
    color: '#A5A7FB',
    svg: 'M12 2C9 2 7 4 7 6.5c0 1-.5 2-1.5 2.5C4 10 3 11.5 3 13.5 3 16 5 18 7.5 18H8v3h8v-3h.5c2.5 0 4.5-2 4.5-4.5 0-2-1-3.5-2.5-4.5-1-.5-1.5-1.5-1.5-2.5C17 4 15 2 12 2z',
  },
  {
    type: 'bullseye',
    label: 'Spot on',
    color: '#14C8BE',
    svg: 'M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zm0-4a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    type: 'clap',
    label: 'Bravo',
    color: '#F0B429',
    svg: 'M19 14c.6-.6.6-1.5 0-2.1l-1.4-1.4c-.6-.6-1.5-.6-2.1 0L13 13V7c0-.8-.7-1.5-1.5-1.5S10 6.2 10 7v5L7.5 9.5c-.6-.6-1.5-.6-2.1 0-.6.6-.6 1.5 0 2.1L12 18l7-4z',
  },
  {
    type: 'diamond',
    label: 'Gem',
    color: '#60a5fa',
    svg: 'M6 3h12l4.5 7L12 21 1.5 10 6 3zm2.5 1L5 9.5h3.5L12 5 8.5 4zm7 0L12 5l3.5 4.5H19l-3.5-5.5zM12 7l-3 3.5h6L12 7zM5.5 11l5.5 7.5V11H5.5zm7 0v7.5L18 11h-5.5z',
  },
  {
    type: 'eyes',
    label: 'Following',
    color: '#8486F9',
    svg: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z',
  },
]

interface ReactionBarProps {
  reactions: ReactionCount[]
  userReaction?: ReactionType | null
  onReact: (type: ReactionType) => void
  compact?: boolean
}

export function ReactionBar({ reactions, userReaction, onReact, compact }: ReactionBarProps) {
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Close picker on outside click
  useEffect(() => {
    if (!showPicker) return
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showPicker])

  const activeReactions = reactions.filter((r) => r.count > 0)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 4 : 6,
        flexWrap: 'wrap',
        position: 'relative',
      }}
    >
      {/* Existing reaction pills */}
      {activeReactions.map((r) => {
        const def = REACTIONS.find((d) => d.type === r.type)
        if (!def) return null
        const isActive = userReaction === r.type
        return (
          <button
            key={r.type}
            onClick={() => onReact(r.type)}
            title={def.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              padding: compact ? '2px 6px' : '3px 8px',
              borderRadius: 20,
              border: `1px solid ${isActive ? def.color + '40' : 'var(--border)'}`,
              background: isActive ? def.color + '12' : 'transparent',
              cursor: 'pointer',
              transition: 'all 150ms',
              fontSize: compact ? 10 : 11,
              fontFamily: 'var(--mono)',
              color: isActive ? def.color : 'var(--text3)',
              fontWeight: isActive ? 600 : 400,
            }}
          >
            <svg
              width={compact ? 11 : 13}
              height={compact ? 11 : 13}
              viewBox="0 0 24 24"
              fill={isActive ? def.color : 'none'}
              stroke={isActive ? 'none' : 'currentColor'}
              strokeWidth={1.5}
            >
              <path d={def.svg} />
            </svg>
            {r.count}
          </button>
        )
      })}

      {/* Add reaction button */}
      <div ref={pickerRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setShowPicker((v) => !v)}
          title="Add reaction"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: compact ? 24 : 28,
            height: compact ? 24 : 28,
            borderRadius: 20,
            border: '1px solid var(--border)',
            background: showPicker ? 'var(--surface2)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 150ms',
            color: 'var(--text3)',
          }}
        >
          <svg
            width={compact ? 12 : 14}
            height={compact ? 12 : 14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </button>

        {/* Reaction picker popup */}
        {showPicker && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: 6,
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              borderRadius: 12,
              padding: '6px 4px',
              display: 'flex',
              gap: 2,
              zIndex: 40,
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              animation: 'gifPickerIn 150ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {REACTIONS.map((def) => {
              const isActive = userReaction === def.type
              return (
                <button
                  key={def.type}
                  onClick={() => {
                    onReact(def.type)
                    setShowPicker(false)
                  }}
                  title={def.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: 'none',
                    background: isActive ? def.color + '18' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 150ms',
                    color: isActive ? def.color : 'var(--text2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = def.color + '18'
                    e.currentTarget.style.transform = 'scale(1.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isActive ? def.color + '18' : 'transparent'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill={isActive ? def.color : 'none'}
                    stroke={isActive ? 'none' : 'currentColor'}
                    strokeWidth={1.5}
                  >
                    <path d={def.svg} />
                  </svg>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export { REACTIONS }
