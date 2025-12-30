/**
 * Media 관련 타입 정의
 * API 명세서 기준
 */

import type { Pagination, PaginationParams, Coordinates } from '@/shared/api/types'

// 미디어 타입
export type MediaType = 'photo' | 'video' | 'voice'

// 미디어 상태
export type MediaStatus = 'uploaded' | 'processing' | 'verified' | 'failed'

// AI 검증 상태
export type AiVerificationStatus = 'pending' | 'processing' | 'verified' | 'failed'

// 미디어 기본 정보 (목록용)
export interface Media {
  id: string
  type: MediaType
  url: string
  thumbnail_url: string
  spot_id: string
  spot_name: string
  user_memo?: string
  created_at: string
}

// 미디어 상세 정보
export interface MediaDetail extends Media {
  location: Coordinates
  metadata: {
    file_size: number
    dimensions?: {
      width: number
      height: number
    }
    format: string
  }
  ai_tags?: string[]
  updated_at: string
}

// 미디어 목록 조회 파라미터
export interface GetMediaParams extends PaginationParams {
  type?: MediaType
  date_from?: string
  date_to?: string
}

// 미디어 목록 응답
export interface GetMediaResponse {
  media: Media[]
  pagination: Pagination
}

// 미디어 업로드 요청 (FormData로 전송)
export interface UploadMediaRequest {
  file: File
  spot_id: string
  user_memo?: string
  location: Coordinates
  verification_id: string
}

// 미디어 업로드 응답
export interface UploadMediaResponse {
  id: string
  type: MediaType
  url: string
  thumbnail_url: string
  status: MediaStatus
  ai_verification_status: AiVerificationStatus
  created_at: string
}

// 미디어 수정 요청
export interface UpdateMediaRequest {
  user_memo?: string
  tags?: string[]
}

// 미디어 수정 응답
export interface UpdateMediaResponse {
  id: string
  user_memo: string
  tags: string[]
  updated_at: string
}

// 미디어 삭제 응답
export interface DeleteMediaResponse {
  message: string
  deleted_at: string
}

// 음성 메모 업로드 요청 (FormData로 전송)
export interface UploadVoiceMemoRequest {
  audio_file: File
  media_id: string
  duration: number
}

// 음성 메모 업로드 응답
export interface UploadVoiceMemoResponse {
  voice_memo_id: string
  audio_url: string
  duration: number
  transcription?: string
  transcription_confidence?: number
  status: 'processing' | 'processed' | 'failed'
}
