/**
 * Spot 관련 타입 정의
 * API 명세서 기준
 */

import type { Location, Pagination, PaginationParams } from '@/shared/api/types'

// 스팟 카테고리
export type SpotCategory = 'food' | 'market' | 'scenery' | 'cultural'

// 스팟 기본 정보 (목록용)
export interface Spot {
  id: string
  name: string
  category: SpotCategory
  description: string
  location: Location
  created_at: string
  updated_at: string
}

// 스팟 상세 정보
export interface SpotDetail extends Spot {
  detailed_description?: string
  images: string[]
  tags: string[]
  operating_hours?: {
    weekdays: string
    weekends: string
  }
}

// 주변 스팟 (거리 포함)
export interface NearbySpot extends Spot {
  distance: number
  qr_code_url: string
  images: string[]
  tags: string[]
  rating?: number
}

// 스팟 목록 조회 파라미터
export interface GetSpotsParams extends PaginationParams {
  category?: SpotCategory
  city?: string
}

// 스팟 목록 응답
export interface GetSpotsResponse {
  spots: Spot[]
  pagination: Pagination
}

// 주변 스팟 조회 파라미터
export interface GetNearbySpotsParams {
  lat: number
  lng: number
  radius?: number
  limit?: number
  category?: SpotCategory
}

// 주변 스팟 응답
export interface GetNearbySpotsResponse {
  spots: NearbySpot[]
  total_count: number
  region_info: {
    name: string
    total_spots: number
  }
}

// QR 코드 검증 요청
export interface VerifyQrRequest {
  qr_data: string
  location: {
    lat: number
    lng: number
    accuracy?: number
  }
  timestamp: string
}

// QR 코드 검증 응답
export interface VerifyQrResponse {
  verification_id: string
  spot_id: string
  is_valid: boolean
  location_match: boolean
  distance_from_spot: number
  expires_at: string
  message: string
}
