/**
 * Video 관련 타입 정의
 * API 명세서 기준
 */

import type { Pagination, PaginationParams } from '@/shared/api/types'

// 영상 상태
export type VideoStatus = 'completed' | 'processing' | 'failed' | 'queued'

// 영상 생성 단계 상태
export type GenerationStepStatus = 'pending' | 'processing' | 'completed' | 'failed'

// 영상 장르
export type VideoGenre = 'travel_vlog' | 'cinematic' | 'highlight' | 'documentary'

// 음악 스타일
export type MusicStyle = 'upbeat' | 'calm' | 'dramatic' | 'nostalgic'

// 편집 스타일
export type EditingStyle = 'smooth' | 'dynamic' | 'minimal' | 'storytelling'

// 영상 길이
export type VideoDuration = 'short' | 'medium' | 'long' // 30초, 1분, 2분

// 영상 기본 정보 (목록용)
export interface Video {
  id: string
  title: string
  status: VideoStatus
  thumbnail: string
  duration: number
  created_at: string
}

// 영상 상세 정보
export interface VideoDetail extends Video {
  url: string
  description?: string
  spots_featured: string[]
  view_count: number
  like_count: number
  updated_at: string
}

// 영상 목록 조회 파라미터
export interface GetVideosParams extends PaginationParams {
  status?: VideoStatus
}

// 영상 목록 응답
export interface GetVideosResponse {
  videos: Video[]
  pagination: Pagination
}

// 영상 수정 요청
export interface UpdateVideoRequest {
  title?: string
  description?: string
  is_public?: boolean
}

// 영상 수정 응답
export interface UpdateVideoResponse {
  id: string
  title: string
  description: string
  is_public: boolean
  updated_at: string
}

// 영상 삭제 응답
export interface DeleteVideoResponse {
  message: string
  deleted_at: string
}

// 영상 생성 요청
export interface CreateVideoRequest {
  title: string
  selection_criteria: {
    date_from?: string
    date_to?: string
    media_ids?: string[]
    auto_select?: boolean
    max_photos?: number
  }
  style_preferences: {
    genre: VideoGenre
    music_style: MusicStyle
    editing_style: EditingStyle
    duration: VideoDuration
    include_voice_memos?: boolean
    language?: string
  }
}

// 영상 생성 응답
export interface CreateVideoResponse {
  video_generation_id: string
  status: VideoStatus
  estimated_duration: string
  estimated_completion: string
  queue_position: number
}

// 영상 생성 단계
export interface GenerationStep {
  name: string
  status: GenerationStepStatus
  duration: string
}

// 선택된 사진 정보
export interface SelectedPhoto {
  media_id: string
  spot_name: string
  selection_reason: string
}

// 영상 생성 상태 응답
export interface VideoGenerationStatusResponse {
  generation_id: string
  status: VideoStatus
  progress: number
  current_step: string
  steps: GenerationStep[]
  selected_photos: SelectedPhoto[]
}
