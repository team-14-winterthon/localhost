import { create } from 'zustand'
import { Geolocation } from '@capacitor/geolocation'
import type { Position } from '@capacitor/geolocation'

interface LocationState {
  position: Position | null
  error: string | null
  loading: boolean
  lastUpdated: number | null
}

interface LocationActions {
  fetchPosition: () => Promise<void>
  clearError: () => void
}

type LocationStore = LocationState & LocationActions

const CACHE_DURATION = 30 * 1000 // 30초 캐시

export const useLocationStore = create<LocationStore>()((set, get) => ({
  // State
  position: null,
  error: null,
  loading: false,
  lastUpdated: null,

  // Actions
  fetchPosition: async () => {
    const { lastUpdated, position, loading } = get()

    // 이미 로딩 중이면 스킵
    if (loading) return

    // 캐시가 유효하면 스킵
    if (position && lastUpdated && Date.now() - lastUpdated < CACHE_DURATION) {
      return
    }

    set({ loading: true, error: null })

    try {
      const newPosition = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      })
      set({
        position: newPosition,
        loading: false,
        lastUpdated: Date.now(),
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : '위치를 가져올 수 없습니다',
        loading: false,
      })
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))
