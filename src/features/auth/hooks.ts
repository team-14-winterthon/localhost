/**
 * Auth 관련 React Query Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from './api'
import type { GoogleLoginRequest, LogoutRequest } from './types'

// 디바이스 ID 생성/조회
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('deviceId')
  if (!deviceId) {
    deviceId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem('deviceId', deviceId)
  }
  return deviceId
}

// 구글 로그인
export const useGoogleLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (googleAccessToken: string) => {
      const data: GoogleLoginRequest = {
        google_access_token: googleAccessToken,
        device_id: getDeviceId(),
      }
      return authApi.googleLogin(data)
    },
    onSuccess: (response) => {
      // 토큰 저장
      localStorage.setItem('accessToken', response.access_token)
      localStorage.setItem('refreshToken', response.refresh_token)

      // 사용자 정보 캐시
      queryClient.setQueryData(['user', 'me'], response.user)
    },
  })
}

// 로그아웃
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      const data: LogoutRequest = {
        device_id: getDeviceId(),
      }
      return authApi.logout(data)
    },
    onSuccess: () => {
      // 토큰 제거
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      // 캐시 초기화
      queryClient.clear()
    },
    onError: () => {
      // 실패해도 로컬 토큰은 제거
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      queryClient.clear()
    },
  })
}

// 인증 상태 확인
export const useAuth = () => {
  const accessToken = localStorage.getItem('accessToken')
  return {
    isAuthenticated: !!accessToken,
  }
}
