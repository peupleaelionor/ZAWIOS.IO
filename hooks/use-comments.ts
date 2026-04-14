'use client'
/**
 * useComments — localStorage-backed comments, Supabase-ready.
 *
 * To connect Supabase, replace localStorage calls:
 *   const { data } = await supabase
 *     .from('comments')
 *     .select('*, author:profiles(*)')
 *     .eq('prediction_id', predictionId)
 *     .order('upvotes', { ascending: false })
 *
 *   const { error } = await supabase
 *     .from('comments')
 *     .insert({ prediction_id, content, user_id: session.user.id })
 */
import { useState, useEffect, useCallback } from 'react'
import { getSeedComments, type LocalComment } from '@/lib/mock-comments'

function storageKey(predictionId: string) {
  return `zawios:comments:${predictionId}`
}

function loadLocalComments(predictionId: string): LocalComment[] {
  try {
    const raw = localStorage.getItem(storageKey(predictionId))
    return raw ? (JSON.parse(raw) as LocalComment[]) : []
  } catch {
    return []
  }
}

function saveLocalComments(predictionId: string, comments: LocalComment[]) {
  const localOnly = comments.filter((c) => c.is_local)
  localStorage.setItem(storageKey(predictionId), JSON.stringify(localOnly))
}

function loadLikedSet(predictionId: string): Set<string> {
  try {
    const raw = localStorage.getItem(`zawios:likes:${predictionId}`)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

export interface UseCommentsState {
  comments: LocalComment[]
  likedIds: Set<string>
  isPosting: boolean
  addComment: (content: string, authorName: string) => void
  toggleLike: (commentId: string) => void
}

export function useComments(predictionId: string): UseCommentsState {
  const [comments, setComments] = useState<LocalComment[]>([])
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [isPosting, setIsPosting] = useState(false)

  // Hydrate after mount
  useEffect(() => {
    const seed = getSeedComments(predictionId)
    const local = loadLocalComments(predictionId)
    const liked = loadLikedSet(predictionId)
    // Merge: seed first (sorted by upvotes), then local at top
    setComments([...local, ...seed])
    setLikedIds(liked)
  }, [predictionId])

  const addComment = useCallback(
    (content: string, authorName: string) => {
      if (!content.trim() || !authorName.trim()) return
      setIsPosting(true)

      const newComment: LocalComment = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        prediction_id: predictionId,
        author_name: authorName.trim(),
        author_username: authorName.trim().toLowerCase().replace(/\s+/g, '_'),
        content: content.trim(),
        upvotes: 0,
        created_at: new Date().toISOString(),
        is_local: true,
      }

      setComments((prev) => {
        const updated = [newComment, ...prev]
        saveLocalComments(predictionId, updated)
        return updated
      })

      setIsPosting(false)
      // ── TODO: replace with Supabase when auth is connected ──
      // const supabase = createClient()
      // supabase.from('comments').insert({ prediction_id: predictionId, content, user_id: session.user.id })
    },
    [predictionId],
  )

  const toggleLike = useCallback(
    (commentId: string) => {
      setLikedIds((prev) => {
        const next = new Set(prev)
        if (next.has(commentId)) {
          next.delete(commentId)
        } else {
          next.add(commentId)
        }
        localStorage.setItem(`zawios:likes:${predictionId}`, JSON.stringify([...next]))
        return next
      })

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, upvotes: likedIds.has(commentId) ? c.upvotes - 1 : c.upvotes + 1 }
            : c,
        ),
      )
      // ── TODO: replace with Supabase toggle ──
    },
    [predictionId, likedIds],
  )

  return { comments, likedIds, isPosting, addComment, toggleLike }
}
