import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authPhotosApi } from '@/features/media/api'
import { queryKeys } from '@/shared/lib/queryClient'

/**
 * 나의 인증 사진 목록 조회
 */
export function useMyPhotos() {
  return useQuery({
    queryKey: queryKeys.authPhotos.my(),
    queryFn: () => authPhotosApi.getMyPhotos(),
  })
}

/**
 * 나의 메모리 오브 조회 (지도용)
 */
export function useMyMemories(dong?: string) {
  return useQuery({
    queryKey: queryKeys.authPhotos.myMemories(dong),
    queryFn: () => authPhotosApi.getMyMemories(dong),
  })
}

/**
 * 사진 업로드 뮤테이션
 */
export function useUploadPhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ photo, spotId, description }: {
      photo: File
      spotId: string
      description?: string
    }) => authPhotosApi.upload(photo, spotId, description),
    onSuccess: () => {
      // Invalidate photo lists to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.authPhotos.all })
    },
  })
}
