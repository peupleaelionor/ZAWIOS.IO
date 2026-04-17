'use client'
/**
 * useEnhancedComments — Full-featured comment hook with threading, reactions, GIFs.
 * localStorage-backed, Supabase-ready architecture.
 */
import { useState, useEffect, useCallback } from 'react'
import {
  getEnhancedComments,
  getCommentReplies,
  getTotalCommentCount,
  type EnhancedComment,
} from '@/lib/enhanced-comments'
import type { ReactionType } from '@/components/comments/reaction-bar'

export type SortMode = 'popular' | 'recent' | 'oldest'

function storageKey(predictionId: string, suffix: string) {
  return `zawios:v2:${suffix}:${predictionId}`
}

function loadLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export interface UseEnhancedCommentsState {
  comments: EnhancedComment[]
  getReplies: (commentId: string) => EnhancedComment[]
  totalCount: number
  sortMode: SortMode
  setSortMode: (mode: SortMode) => void
  isPosting: boolean
  addComment: (content: string, authorName: string, gifUrl?: string, gifTitle?: string, parentId?: string) => void
  toggleReaction: (commentId: string, reaction: ReactionType) => void
  userReactions: Record<string, ReactionType>
  expandedReplies: Set<string>
  toggleReplies: (commentId: string) => void
}

export function useEnhancedComments(predictionId: string): UseEnhancedCommentsState {
  const [topLevel, setTopLevel] = useState<EnhancedComment[]>([])
  const [localReplies, setLocalReplies] = useState<Record<string, EnhancedComment[]>>({})
  const [userReactions, setUserReactions] = useState<Record<string, ReactionType>>({})
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [sortMode, setSortMode] = useState<SortMode>('popular')
  const [isPosting, setIsPosting] = useState(false)
  const [localComments, setLocalComments] = useState<EnhancedComment[]>([])

  // Hydrate
  useEffect(() => {
    const seed = getEnhancedComments(predictionId)
    const local = loadLocal<EnhancedComment[]>(storageKey(predictionId, 'comments'), [])
    const reactions = loadLocal<Record<string, ReactionType>>(storageKey(predictionId, 'reactions'), {})
    setTopLevel(seed)
    setLocalComments(local)
    setUserReactions(reactions)
  }, [predictionId])

  // Sorted top-level comments
  const comments = [...localComments.filter((c) => !c.parent_id), ...topLevel].sort((a, b) => {
    if (a.is_local && !b.is_local) return -1
    if (!a.is_local && b.is_local) return 1
    switch (sortMode) {
      case 'popular':
        return b.upvotes - a.upvotes
      case 'recent':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      default:
        return 0
    }
  })

  const getReplies = useCallback(
    (commentId: string): EnhancedComment[] => {
      const seedReplies = getCommentReplies(commentId, predictionId)
      const locals = localReplies[commentId] ?? []
      return [...seedReplies, ...locals]
    },
    [predictionId, localReplies],
  )

  const totalCount = getTotalCommentCount(predictionId) + localComments.length

  const addComment = useCallback(
    (content: string, authorName: string, gifUrl?: string, gifTitle?: string, parentId?: string) => {
      if (!content.trim() && !gifUrl) return
      if (!authorName.trim()) return
      setIsPosting(true)

      const newComment: EnhancedComment = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        prediction_id: predictionId,
        author_name: authorName.trim(),
        author_username: authorName.trim().toLowerCase().replace(/\s+/g, '_'),
        content: content.trim(),
        gif_url: gifUrl,
        gif_title: gifTitle,
        upvotes: 0,
        reactions: [],
        created_at: new Date().toISOString(),
        is_local: true,
        parent_id: parentId,
      }

      if (parentId) {
        setLocalReplies((prev) => {
          const updated = { ...prev, [parentId]: [...(prev[parentId] ?? []), newComment] }
          return updated
        })
        // Auto-expand replies for the parent
        setExpandedReplies((prev) => new Set(prev).add(parentId))
      } else {
        setLocalComments((prev) => {
          const updated = [newComment, ...prev]
          localStorage.setItem(
            storageKey(predictionId, 'comments'),
            JSON.stringify(updated),
          )
          return updated
        })
      }

      setIsPosting(false)
    },
    [predictionId],
  )

  const toggleReaction = useCallback(
    (commentId: string, reaction: ReactionType) => {
      setUserReactions((prev) => {
        const next = { ...prev }
        if (next[commentId] === reaction) {
          delete next[commentId]
        } else {
          next[commentId] = reaction
        }
        localStorage.setItem(storageKey(predictionId, 'reactions'), JSON.stringify(next))
        return next
      })
    },
    [predictionId],
  )

  const toggleReplies = useCallback((commentId: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev)
      if (next.has(commentId)) {
        next.delete(commentId)
      } else {
        next.add(commentId)
      }
      return next
    })
  }, [])

  return {
    comments,
    getReplies,
    totalCount,
    sortMode,
    setSortMode,
    isPosting,
    addComment,
    toggleReaction,
    userReactions,
    expandedReplies,
    toggleReplies,
  }
}
