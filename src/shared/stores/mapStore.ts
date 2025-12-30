import { create } from 'zustand'
import type { Place } from '@/features/spots/types'
import type { AuthPhoto } from '@/features/media/api'

type ViewMode = '전체보기' | '관광명소' | '특산품'

interface MapState {
  // Selection state
  selectedPlace: Place | null
  selectedMemory: AuthPhoto | null
  viewMode: ViewMode

  // Actions
  selectPlace: (place: Place | null) => void
  selectMemory: (memory: AuthPhoto | null) => void
  setViewMode: (mode: ViewMode) => void
  clearSelection: () => void
}

export const useMapStore = create<MapState>((set) => ({
  selectedPlace: null,
  selectedMemory: null,
  viewMode: '전체보기',

  selectPlace: (place) => set({
    selectedPlace: place,
    selectedMemory: null  // Clear memory when selecting place
  }),

  selectMemory: (memory) => set({ selectedMemory: memory }),

  setViewMode: (mode) => set({ viewMode: mode }),

  clearSelection: () => set({
    selectedPlace: null,
    selectedMemory: null
  }),
}))
