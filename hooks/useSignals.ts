'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys, type SignalFeedParams } from '@/lib/query-keys'
import { mockSignals } from '@/lib/signals-data'
import type { Signal } from '@/lib/signals-data'

type ApiSignal = Signal & { user_vote?: string | null }

async function fetchSignals(params: SignalFeedParams): Promise<ApiSignal[]> {
  const sp = new URLSearchParams()
  if (params.category && params.category !== 'all') sp.set('category', params.category)
  if (params.region   && params.region   !== 'all') sp.set('region', params.region)
  if (params.sort)   sp.set('sort',   params.sort)
  if (params.limit)  sp.set('limit',  String(params.limit))
  if (params.offset) sp.set('offset', String(params.offset))

  const res = await fetch(`/api/signals?${sp.toString()}`, {
    next: { revalidate: 30 },
  })

  if (!res.ok) throw new Error('Failed to fetch signals')

  const json = await res.json() as { signals: ApiSignal[]; source: string }

  // API returns DB rows (snake_case) — map to Signal shape (camelCase)
  if (json.source === 'db' && Array.isArray(json.signals)) {
    return (json.signals as unknown as Record<string, unknown>[]).map(mapDbRow)
  }

  // DB not available → fall back to mock data with client-side filtering
  return filterMock(params)
}

function mapDbRow(row: Record<string, unknown>): ApiSignal {
  return {
    id:               String(row.id),
    title:            String(row.title ?? ''),
    description:      String(row.description ?? ''),
    category:         row.category as Signal['category'],
    region:           row.region   as Signal['region'],
    status:           row.status   as Signal['status'],
    yesPercent:       Number(row.yes_percent     ?? 50),
    noPercent:        Number(row.no_percent      ?? 50),
    neutralPercent:   Number(row.neutral_percent ?? 0),
    totalVotes:       Number(row.total_votes     ?? 0),
    createdBy:        row.created_by as string | null,
    creatorName:      row.creator_name as string | undefined,
    trending:         Boolean(row.trending),
    hot:              Boolean(row.hot),
    resolvedResult:   row.resolved_result as boolean | undefined,
    timeAgo:          formatTimeAgo(row.created_at as string),
    regionalBreakdown: row.regional_breakdown as Signal['regionalBreakdown'],
    user_vote:        row.user_vote as string | null,
  }
}

function filterMock(params: SignalFeedParams): ApiSignal[] {
  let signals = [...mockSignals].filter((s) => s.status === 'active')
  if (params.category && params.category !== 'all') {
    signals = signals.filter((s) => s.category === params.category)
  }
  if (params.region && params.region !== 'all') {
    signals = signals.filter((s) => s.region === params.region)
  }
  switch (params.sort) {
    case 'popular': signals.sort((a, b) => b.totalVotes - a.totalVotes); break
    case 'latest':  signals.sort((a, b) => (b.timeAgo < a.timeAgo ? 1 : -1)); break
    default:        signals.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0) || b.totalVotes - a.totalVotes)
  }
  const offset = params.offset ?? 0
  const limit  = params.limit  ?? 20
  return signals.slice(offset, offset + limit)
}

function formatTimeAgo(iso?: string): string {
  if (!iso) return ''
  const ms = Date.now() - new Date(iso).getTime()
  const h  = ms / 3_600_000
  if (h < 1)  return `${Math.round(h * 60)} min`
  if (h < 24) return `${Math.round(h)}h`
  return `${Math.round(h / 24)}j`
}

// ── Public hook ───────────────────────────────────────────────────────────────

export function useSignals(params: SignalFeedParams = {}) {
  return useQuery({
    queryKey:  queryKeys.signals.feed(params),
    queryFn:   () => fetchSignals(params),
    staleTime: 60_000,
  })
}

export function useSignalDetail(id: string) {
  const qc = useQueryClient()

  return useQuery({
    queryKey: queryKeys.signals.detail(id),
    queryFn: async (): Promise<ApiSignal | null> => {
      const res = await fetch(`/api/signals/${id}`)
      if (!res.ok) return null
      const json = await res.json() as { signal: Record<string, unknown>; userVote: string | null }
      return { ...mapDbRow(json.signal), user_vote: json.userVote }
    },
    // Seed from feed cache if available
    initialData: () => {
      const caches = qc.getQueriesData<ApiSignal[]>({ queryKey: queryKeys.signals.all })
      for (const [, data] of caches) {
        if (!Array.isArray(data)) continue
        const found = data.find((s) => s.id === id)
        if (found) return found
      }
      return undefined
    },
  })
}
