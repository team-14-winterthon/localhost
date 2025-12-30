/**
 * User 관련 React Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from './api'
import type { UpdateUserRequest, DeleteUserRequest } from './types'

// 쿼리 키
export const userKeys = {
  all: ['users'] as const,
  me: () => [...userKeys.all, 'me'] as const,
}

// 현재 사용자 정보 조회
export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: usersApi.getMe,
    staleTime: 1000 * 60 * 10, // 10분
  })
}

// 사용자 정보 수정
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => usersApi.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

// 사용자 계정 삭제
export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DeleteUserRequest) => usersApi.deleteMe(data),
    onSuccess: () => {
      // 토큰 제거
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      // 캐시 초기화
      queryClient.clear()
    },
  })
}
