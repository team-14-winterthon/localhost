/**
 * Auth API
 * API 명세서 기준
 */

import { api } from '@/shared/api/client'
import type {
  GoogleLoginRequest,
  GoogleLoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutRequest,
  LogoutResponse,
} from './types'

export const authApi = {
  // 구글 로그인
  googleLogin: (data: GoogleLoginRequest) =>
    api.post<GoogleLoginResponse>('/auth/google', data),

  // 토큰 갱신
  refreshToken: (data: RefreshTokenRequest) =>
    api.post<RefreshTokenResponse>('/auth/refresh', data),

  // 로그아웃
  logout: (data: LogoutRequest) =>
    api.post<LogoutResponse>('/auth/logout', data),
}
