/**
 * Auth 관련 타입 정의
 * API 명세서 기준
 */

// 사용자 정보
export interface User {
  id: string
  google_id: string
  nickname: string
  profile_image: string
  email: string
  created_at: string
  updated_at?: string
  is_new_user?: boolean
}

// 구글 로그인 요청
export interface GoogleLoginRequest {
  google_access_token: string
  device_id: string
  push_token?: string
}

// 구글 로그인 응답
export interface GoogleLoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  user: User
}

// 토큰 갱신 요청
export interface RefreshTokenRequest {
  refresh_token: string
}

// 토큰 갱신 응답
export interface RefreshTokenResponse {
  access_token: string
  expires_in: number
}

// 로그아웃 요청
export interface LogoutRequest {
  device_id: string
}

// 로그아웃 응답
export interface LogoutResponse {
  message: string
}

// 인증 상태
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
