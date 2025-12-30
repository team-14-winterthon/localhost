/**
 * Media 관련 React Query Hooks
 */

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { mediaApi } from './api'
import type {
  GetMediaParams,
  UploadMediaRequest,
  UpdateMediaRequest,
  UploadVoiceMemoRequest,
  MediaType,
} from './types'

// 쿼리 키
export const mediaKeys = {
  all: ['media'] as const,
  lists: () => [...mediaKeys.all, 'list'] as const,
  list: (params?: GetMediaParams) => [...mediaKeys.lists(), params] as const,
  details: () => [...mediaKeys.all, 'detail'] as const,
  detail: (id: string) => [...mediaKeys.details(), id] as const,
}

// 미디어 목록 조회
export const useMediaList = (params?: GetMediaParams) => {
  return useQuery({
    queryKey: mediaKeys.list(params),
    queryFn: () => mediaApi.getAll(params),
  })
}

// 미디어 목록 무한 스크롤
export const useInfiniteMediaList = (options?: {
  type?: MediaType
  date_from?: string
  date_to?: string
  limit?: number
}) => {
  const limit = options?.limit ?? 20

  return useInfiniteQuery({
    queryKey: [...mediaKeys.lists(), 'infinite', options],
    queryFn: ({ pageParam = 1 }) =>
      mediaApi.getAll({
        page: pageParam,
        limit,
        type: options?.type,
        date_from: options?.date_from,
        date_to: options?.date_to,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next ? lastPage.pagination.page + 1 : undefined,
  })
}

// 미디어 상세 조회
export const useMedia = (mediaId: string) => {
  return useQuery({
    queryKey: mediaKeys.detail(mediaId),
    queryFn: () => mediaApi.getById(mediaId),
    enabled: !!mediaId,
  })
}

// 미디어 업로드
export const useUploadMedia = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UploadMediaRequest) => mediaApi.upload(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() })
    },
  })
}

// 미디어 수정
export const useUpdateMedia = (mediaId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateMediaRequest) => mediaApi.update(mediaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.detail(mediaId) })
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() })
    },
  })
}

// 미디어 삭제
export const useDeleteMedia = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (mediaId: string) => mediaApi.delete(mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() })
    },
  })
}

// 음성 메모 업로드
export const useUploadVoiceMemo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UploadVoiceMemoRequest) => mediaApi.uploadVoiceMemo(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.detail(variables.media_id) })
    },
  })
}
