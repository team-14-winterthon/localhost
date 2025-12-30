/**
 * User 관련 타입 정의
 * API 명세서 기준
 */

// 사용자 정보 (조회용)
export interface UserProfile {
  id: string
  nickname: string
  email: string
  profile_image: string
  created_at: string
  updated_at: string
}

// 사용자 수정 요청
export interface UpdateUserRequest {
  nickname?: string
  profile_image?: string // base64 또는 URL
}

// 사용자 수정 응답
export interface UpdateUserResponse {
  id: string
  nickname: string
  profile_image: string
  updated_at: string
}

// 사용자 삭제 요청
export interface DeleteUserRequest {
  reason?: string
}

// 사용자 삭제 응답
export interface DeleteUserResponse {
  message: string
  deleted_at: string
}
