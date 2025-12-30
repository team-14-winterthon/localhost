import { useQuery } from '@tanstack/react-query'
import { placesApi, memoriesApi } from '@/features/spots/api'
import { queryKeys } from '@/shared/lib/queryClient'

/**
 * 모든 장소 목록 조회
 */
export function usePlaces(dong?: string) {
  return useQuery({
    queryKey: queryKeys.places.list(dong),
    queryFn: () => placesApi.getAll(dong),
  })
}

/**
 * 메모리 상세 조회
 */
export function useMemory(memoryId: string) {
  return useQuery({
    queryKey: queryKeys.memories.detail(memoryId),
    queryFn: () => memoriesApi.getById(memoryId),
    enabled: !!memoryId,
  })
}
