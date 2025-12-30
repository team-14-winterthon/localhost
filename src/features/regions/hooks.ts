/**
 * Region 관련 React Query Hooks
 */

import { useQuery } from '@tanstack/react-query'
import { regionsApi } from './api'

// 쿼리 키
export const regionKeys = {
  all: ['regions'] as const,
  lists: () => [...regionKeys.all, 'list'] as const,
  details: () => [...regionKeys.all, 'detail'] as const,
  detail: (id: string) => [...regionKeys.details(), id] as const,
  spots: (id: string) => [...regionKeys.all, 'spots', id] as const,
}

// 지역 목록 조회
export const useRegions = () => {
  return useQuery({
    queryKey: regionKeys.lists(),
    queryFn: regionsApi.getAll,
    staleTime: 1000 * 60 * 60, // 1시간 (지역 정보는 자주 안 바뀜)
  })
}

// 지역 상세 조회
export const useRegion = (regionId: string) => {
  return useQuery({
    queryKey: regionKeys.detail(regionId),
    queryFn: () => regionsApi.getById(regionId),
    enabled: !!regionId,
    staleTime: 1000 * 60 * 60, // 1시간
  })
}

// 지역별 스팟 목록 조회
export const useRegionSpots = (regionId: string) => {
  return useQuery({
    queryKey: regionKeys.spots(regionId),
    queryFn: () => regionsApi.getSpots(regionId),
    enabled: !!regionId,
  })
}
