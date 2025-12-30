/**
 * Spot 관련 React Query Hooks
 */

import { useQuery, useMutation } from '@tanstack/react-query'
import { spotsApi } from './api'
import type {
  GetSpotsParams,
  GetNearbySpotsParams,
  VerifyQrRequest,
  SpotCategory,
} from './types'

// 쿼리 키
export const spotKeys = {
  all: ['spots'] as const,
  lists: () => [...spotKeys.all, 'list'] as const,
  list: (params?: GetSpotsParams) => [...spotKeys.lists(), params] as const,
  details: () => [...spotKeys.all, 'detail'] as const,
  detail: (id: string) => [...spotKeys.details(), id] as const,
  nearby: (params: GetNearbySpotsParams) => [...spotKeys.all, 'nearby', params] as const,
}

// 스팟 목록 조회
export const useSpots = (params?: GetSpotsParams) => {
  return useQuery({
    queryKey: spotKeys.list(params),
    queryFn: () => spotsApi.getAll(params),
  })
}

// 스팟 상세 조회
export const useSpot = (spotId: string) => {
  return useQuery({
    queryKey: spotKeys.detail(spotId),
    queryFn: () => spotsApi.getById(spotId),
    enabled: !!spotId,
  })
}

// 주변 스팟 검색
export const useNearbySpots = (
  lat: number | undefined,
  lng: number | undefined,
  options?: {
    radius?: number
    limit?: number
    category?: SpotCategory
  }
) => {
  const params: GetNearbySpotsParams = {
    lat: lat ?? 0,
    lng: lng ?? 0,
    ...options,
  }

  return useQuery({
    queryKey: spotKeys.nearby(params),
    queryFn: () => spotsApi.getNearby(params),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 1000 * 60 * 1, // 1분 (위치 기반이라 자주 갱신)
  })
}

// QR 코드 검증
export const useVerifyQr = (spotId: string) => {
  return useMutation({
    mutationFn: (data: VerifyQrRequest) => spotsApi.verifyQr(spotId, data),
  })
}
