/**
 * Video API
 * API 명세서 기준
 */

import { api } from '@/shared/api/client'
import type {
  VideoDetail,
  GetVideosParams,
  GetVideosResponse,
  UpdateVideoRequest,
  UpdateVideoResponse,
  DeleteVideoResponse,
  CreateVideoRequest,
  CreateVideoResponse,
  VideoGenerationStatusResponse,
} from './types'

export const videosApi = {
  // 영상 목록 조회
  getAll: (params?: GetVideosParams) =>
    api.get<GetVideosResponse>('/videos', { params }),

  // 영상 상세 조회
  getById: (videoId: string) =>
    api.get<VideoDetail>(`/videos/${videoId}`),

  // 영상 수정
  update: (videoId: string, data: UpdateVideoRequest) =>
    api.patch<UpdateVideoResponse>(`/videos/${videoId}`, data),

  // 영상 삭제
  delete: (videoId: string) =>
    api.delete<DeleteVideoResponse>(`/videos/${videoId}`),

  // 영상 생성 시작
  create: (data: CreateVideoRequest) =>
    api.post<CreateVideoResponse>('/videos/create', data),

  // 영상 생성 상태 조회
  getGenerationStatus: (generationId: string) =>
    api.get<VideoGenerationStatusResponse>(`/videos/generation/${generationId}`),
}
