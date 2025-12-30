/**
 * User API
 * API 명세서 기준
 */

import { api } from '@/shared/api/client'
import type {
  UserProfile,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
} from './types'

export const usersApi = {
  // 현재 사용자 정보 조회
  getMe: () => api.get<UserProfile>('/users/me'),

  // 사용자 정보 수정
  updateMe: (data: UpdateUserRequest) =>
    api.patch<UpdateUserResponse>('/users/me', data),

  // 사용자 계정 삭제
  deleteMe: (data: DeleteUserRequest) =>
    api.delete<DeleteUserResponse>('/users/me', { data }),
}
