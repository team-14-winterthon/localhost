/**
 * API 공통 타입 정의
 * API 명세서 기준
 */

// 성공 응답 래퍼
export interface ApiResponse<T> {
  success: true
  data: T
  meta: {
    timestamp: string
    request_id: string
  }
}

// 오류 응답
export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
  meta: {
    timestamp: string
    request_id: string
  }
}

// 페이지네이션
export interface Pagination {
  total: number
  page: number
  limit: number
  has_next: boolean
  has_prev?: boolean
}

// 페이지네이션 쿼리 파라미터
export interface PaginationParams {
  page?: number
  limit?: number
}

// 위치 정보
export interface Location {
  lat: number
  lng: number
  address: string
  city?: string
  district?: string
}

// 위치 좌표
export interface Coordinates {
  lat: number
  lng: number
  accuracy?: number
}
