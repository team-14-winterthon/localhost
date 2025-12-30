/**
 * Video 관련 React Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { videosApi } from './api'
import type {
  GetVideosParams,
  UpdateVideoRequest,
  CreateVideoRequest,
  VideoStatus,
} from './types'

// 쿼리 키
export const videoKeys = {
  all: ['videos'] as const,
  lists: () => [...videoKeys.all, 'list'] as const,
  list: (params?: GetVideosParams) => [...videoKeys.lists(), params] as const,
  details: () => [...videoKeys.all, 'detail'] as const,
  detail: (id: string) => [...videoKeys.details(), id] as const,
  generation: (id: string) => [...videoKeys.all, 'generation', id] as const,
}

// 영상 목록 조회
export const useVideos = (params?: GetVideosParams) => {
  return useQuery({
    queryKey: videoKeys.list(params),
    queryFn: () => videosApi.getAll(params),
  })
}

// 영상 상세 조회
export const useVideo = (videoId: string) => {
  return useQuery({
    queryKey: videoKeys.detail(videoId),
    queryFn: () => videosApi.getById(videoId),
    enabled: !!videoId,
  })
}

// 영상 수정
export const useUpdateVideo = (videoId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateVideoRequest) => videosApi.update(videoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.detail(videoId) })
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() })
    },
  })
}

// 영상 삭제
export const useDeleteVideo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (videoId: string) => videosApi.delete(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() })
    },
  })
}

// 영상 생성 시작
export const useCreateVideo = () => {
  return useMutation({
    mutationFn: (data: CreateVideoRequest) => videosApi.create(data),
  })
}

// 영상 생성 상태 조회 (polling 지원)
export const useVideoGenerationStatus = (
  generationId: string,
  options?: {
    enabled?: boolean
    refetchInterval?: number | false
  }
) => {
  return useQuery({
    queryKey: videoKeys.generation(generationId),
    queryFn: () => videosApi.getGenerationStatus(generationId),
    enabled: !!generationId && (options?.enabled ?? true),
    refetchInterval: (query) => {
      // 완료되면 polling 중지
      const data = query.state.data
      const completedStatuses: VideoStatus[] = ['completed', 'failed']
      if (data && completedStatuses.includes(data.status)) {
        return false
      }
      return options?.refetchInterval ?? 3000 // 3초마다 polling
    },
  })
}
