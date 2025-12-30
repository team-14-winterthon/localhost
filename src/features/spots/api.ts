import { apiClient } from '@/shared/api/client'
import type { Place, Memory } from './types'

export const placesApi = {
  /**
   * 지도에 표시할 장소 정보 조회
   * GET /places
   */
  async getAll(dong?: string): Promise<Place[]> {
    const params = dong ? `?dong=${encodeURIComponent(dong)}` : ''
    return apiClient.get<Place[]>(`/places${params}`)
  },
}

export const memoriesApi = {
  /**
   * 메모리 오브 상세 정보 조회
   * GET /memories/{memoryId}
   */
  async getById(memoryId: string): Promise<Memory> {
    return apiClient.get<Memory>(`/memories/${memoryId}`)
  },
}

// Legacy export for backwards compatibility
export const spotsApi = {
  async getAll(): Promise<Place[]> {
    return placesApi.getAll()
  },
  async getById(id: string): Promise<Memory | null> {
    try {
      return await memoriesApi.getById(id)
    } catch {
      return null
    }
  },
}
