/**
 * ZAWIOS — Zustand UI store.
 * Handles UI-only state: feed filters, sidebar, modal visibility.
 * Server data lives in React Query, never here.
 */
import { create } from 'zustand'
import type { SignalCategory, SignalRegion } from '@/lib/signals-data'

type SortTab = 'trending' | 'latest' | 'popular' | 'following'

interface UIState {
  // Feed filters
  feedSort:     SortTab
  feedCategory: SignalCategory | 'all'
  feedRegion:   SignalRegion   | 'all'
  showWorldView: boolean

  // Actions
  setFeedSort:     (sort: SortTab)                       => void
  setFeedCategory: (cat: SignalCategory | 'all')        => void
  setFeedRegion:   (region: SignalRegion | 'all')       => void
  toggleWorldView: ()                                    => void
  resetFeedFilters: ()                                   => void
}

export const useUIStore = create<UIState>()((set) => ({
  feedSort:      'trending',
  feedCategory:  'all',
  feedRegion:    'all',
  showWorldView: false,

  setFeedSort:     (sort)    => set({ feedSort: sort }),
  setFeedCategory: (cat)     => set({ feedCategory: cat }),
  setFeedRegion:   (region)  => set({ feedRegion: region }),
  toggleWorldView: ()        => set((s) => ({ showWorldView: !s.showWorldView })),
  resetFeedFilters: ()       => set({ feedSort: 'trending', feedCategory: 'all', feedRegion: 'all' }),
}))
