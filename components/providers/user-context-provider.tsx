'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// ─── Types ──────────────────────────────────────────────────────────────────
export type DeviceType = 'mobile' | 'tablet' | 'desktop'
export type NetworkQuality = 'slow' | 'medium' | 'fast' | 'offline'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

export interface UserGeo {
  latitude: number | null
  longitude: number | null
  country: string | null
  region: string | null
  city: string | null
  timezone: string
}

export interface UserContextValue {
  device: DeviceType
  networkQuality: NetworkQuality
  isOnline: boolean
  geo: UserGeo
  timeOfDay: TimeOfDay
  prefersReducedMotion: boolean
  screenWidth: number
  /** True once the first detection pass is complete */
  ready: boolean
}

const DEFAULT_GEO: UserGeo = {
  latitude: null,
  longitude: null,
  country: null,
  region: null,
  city: null,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

function detectDevice(width: number): DeviceType {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

function detectTimeOfDay(): TimeOfDay {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'morning'
  if (h >= 12 && h < 17) return 'afternoon'
  if (h >= 17 && h < 21) return 'evening'
  return 'night'
}

function detectNetworkQuality(): NetworkQuality {
  if (!navigator.onLine) return 'offline'
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number } }).connection
  if (!conn) return 'fast'
  const etype = conn.effectiveType
  if (etype === 'slow-2g' || etype === '2g') return 'slow'
  if (etype === '3g') return 'medium'
  return 'fast'
}

// ─── Context ────────────────────────────────────────────────────────────────
const UserContext = createContext<UserContextValue>({
  device: 'desktop',
  networkQuality: 'fast',
  isOnline: true,
  geo: DEFAULT_GEO,
  timeOfDay: 'morning',
  prefersReducedMotion: false,
  screenWidth: 1280,
  ready: false,
})

// ─── Provider ───────────────────────────────────────────────────────────────
export function UserContextProvider({ children }: { children: ReactNode }) {
  const [ctx, setCtx] = useState<UserContextValue>({
    device: 'desktop',
    networkQuality: 'fast',
    isOnline: true,
    geo: DEFAULT_GEO,
    timeOfDay: detectTimeOfDay(),
    prefersReducedMotion: false,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
    ready: false,
  })

  useEffect(() => {
    // 1. Device + screen
    const width = window.innerWidth
    const device = detectDevice(width)

    // 2. Network
    const networkQuality = detectNetworkQuality()
    const isOnline = navigator.onLine

    // 3. Reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initial state
    setCtx((prev) => ({
      ...prev,
      device,
      networkQuality,
      isOnline,
      prefersReducedMotion,
      screenWidth: width,
      ready: true,
    }))

    // 4. Geolocation (non-blocking)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCtx((prev) => ({
            ...prev,
            geo: {
              ...prev.geo,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          }))
        },
        () => { /* user denied or unavailable — keep defaults */ },
        { timeout: 8000, enableHighAccuracy: false },
      )
    }

    // 5. Timezone-based country detection (lightweight, no API needed)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const tzCountry = guessCountryFromTimezone(tz)
    if (tzCountry) {
      setCtx((prev) => ({
        ...prev,
        geo: { ...prev.geo, country: tzCountry, timezone: tz },
      }))
    }

    // 6. Resize listener
    const handleResize = () => {
      setCtx((prev) => ({
        ...prev,
        screenWidth: window.innerWidth,
        device: detectDevice(window.innerWidth),
      }))
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // 7. Online/offline listeners
    const goOnline = () => setCtx((prev) => ({ ...prev, isOnline: true, networkQuality: detectNetworkQuality() }))
    const goOffline = () => setCtx((prev) => ({ ...prev, isOnline: false, networkQuality: 'offline' }))
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return (
    <UserContext.Provider value={ctx}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}

// ─── Timezone → Country mapping (common zones) ─────────────────────────────
function guessCountryFromTimezone(tz: string): string | null {
  const map: Record<string, string> = {
    'Europe/Paris': 'France',
    'Europe/Brussels': 'Belgique',
    'Europe/London': 'UK',
    'Europe/Berlin': 'Germany',
    'Europe/Madrid': 'Spain',
    'Europe/Rome': 'Italy',
    'Europe/Zurich': 'Switzerland',
    'Europe/Amsterdam': 'Netherlands',
    'America/New_York': 'USA',
    'America/Chicago': 'USA',
    'America/Denver': 'USA',
    'America/Los_Angeles': 'USA',
    'America/Toronto': 'Canada',
    'America/Montreal': 'Canada',
    'Africa/Kinshasa': 'RDC',
    'Africa/Lubumbashi': 'RDC',
    'Africa/Lagos': 'Nigeria',
    'Africa/Nairobi': 'Kenya',
    'Africa/Johannesburg': 'South Africa',
    'Africa/Casablanca': 'Morocco',
    'Africa/Algiers': 'Algeria',
    'Africa/Tunis': 'Tunisia',
    'Africa/Dakar': 'Senegal',
    'Africa/Abidjan': "Côte d'Ivoire",
    'Africa/Douala': 'Cameroon',
    'Asia/Tokyo': 'Japan',
    'Asia/Shanghai': 'China',
    'Asia/Kolkata': 'India',
    'Asia/Dubai': 'UAE',
    'Australia/Sydney': 'Australia',
    'Pacific/Auckland': 'New Zealand',
    'America/Sao_Paulo': 'Brazil',
    'America/Mexico_City': 'Mexico',
    'America/Buenos_Aires': 'Argentina',
  }
  return map[tz] ?? null
}
