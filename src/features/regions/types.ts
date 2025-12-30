/**
 * Region 관련 타입 정의
 * API 명세서 기준
 */

import type { SpotCategory } from '../spots/types'

// 지역 기본 정보 (목록용)
export interface Region {
  id: string
  name: string
  city: string
  description: string
  total_spots: number
  created_at: string
}

// 지역 영역 정보
export interface RegionBounds {
  north: number
  south: number
  east: number
  west: number
}

// 지역 상세 정보
export interface RegionDetail extends Region {
  area: {
    center: {
      lat: number
      lng: number
    }
    bounds: RegionBounds
  }
  featured_spots: {
    id: string
    name: string
    category: SpotCategory
  }[]
  updated_at: string
}

// 지역 목록 응답
export interface GetRegionsResponse {
  regions: Region[]
}

// 지역별 스팟 기본 정보
export interface RegionSpot {
  id: string
  name: string
  category: SpotCategory
  difficulty?: 'easy' | 'medium' | 'hard'
}

// 지역별 스팟 목록 응답
export interface GetRegionSpotsResponse {
  region: {
    id: string
    name: string
    total_spots: number
    description: string
  }
  spots: RegionSpot[]
}
