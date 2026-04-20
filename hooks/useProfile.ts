'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'

export interface ProfileData {
  user_id:          string
  username:         string
  full_name:        string
  avatar_url?:      string
  bio?:             string
  location?:        string
  website?:         string
  plan:             string
  is_premium:       boolean
  created_at:       string
  reputation?: {
    total_score:       number
    accuracy_rate:     number
    prediction_count:  number
    global_rank:       number
  }
  email?: string
}

async function fetchMyProfile(): Promise<ProfileData | null> {
  const res = await fetch('/api/profile')
  if (res.status === 401) return null
  if (!res.ok) throw new Error('Failed to load profile')
  const json = await res.json() as { profile: ProfileData; email: string }
  return { ...json.profile, email: json.email }
}

/** Fetch the authenticated user's profile */
export function useMyProfile() {
  return useQuery({
    queryKey: queryKeys.profile.me,
    queryFn:  fetchMyProfile,
    staleTime: 5 * 60_000,    // 5 min — profile data changes rarely
    retry: 1,
  })
}

async function fetchPublicProfile(username: string): Promise<ProfileData | null> {
  // Public profiles are fetched server-side, but this hook supports client-side navigation
  const res = await fetch(`/api/profile?username=${encodeURIComponent(username)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to load profile')
  const json = await res.json() as { profile: ProfileData }
  return json.profile
}

/** Fetch a public user profile by username */
export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: queryKeys.profile.user(username),
    queryFn:  () => fetchPublicProfile(username),
    staleTime: 5 * 60_000,
    enabled:   Boolean(username),
  })
}
