/**
 * Region API
 * API 명세서 기준
 */

import { api } from '@/shared/api/client'
import type {
  RegionDetail,
  GetRegionsResponse,
  GetRegionSpotsResponse,
} from './types'

export const regionsApi = {
  // 지역 목록 조회
  getAll: () =>
    api.get<GetRegionsResponse>('/regions'),

  // 지역 상세 조회
  getById: (regionId: string) =>
    api.get<RegionDetail>(`/regions/${regionId}`),

  // 지역별 스팟 목록 조회
  getSpots: (regionId: string) =>
    api.get<GetRegionSpotsResponse>(`/regions/${regionId}/spots`),
}
