/**
 * Spot API
 * API 명세서 기준
 */

import { api } from '@/shared/api/client'
import type {
  SpotDetail,
  GetSpotsParams,
  GetSpotsResponse,
  GetNearbySpotsParams,
  GetNearbySpotsResponse,
  VerifyQrRequest,
  VerifyQrResponse,
} from './types'

export const spotsApi = {
  // 스팟 목록 조회
  getAll: (params?: GetSpotsParams) =>
    api.get<GetSpotsResponse>('/spots', { params }),

  // 스팟 상세 조회
  getById: (spotId: string) =>
    api.get<SpotDetail>(`/spots/${spotId}`),

  // 주변 스팟 검색
  getNearby: (params: GetNearbySpotsParams) =>
    api.get<GetNearbySpotsResponse>('/spots/nearby', { params }),

  // QR 코드 검증
  verifyQr: (spotId: string, data: VerifyQrRequest) =>
    api.post<VerifyQrResponse>(`/spots/${spotId}/verify-qr`, data),
}
