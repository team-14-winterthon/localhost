import { apiClient } from '@/shared/api/client'
import { useAuthStore } from '@/shared/stores'

export const authApi = {
  /**
   * 구글 소셜 로그인 URL로 리다이렉트
   * POST /auth/google -> Google Link로 이동
   */
  async redirectToGoogle(): Promise<void> {
    // 목 환경에서는 바로 콜백으로 이동
    if (import.meta.env.VITE_ENABLE_MOCKING === 'true') {
      window.location.href = '/#/auth/callback?code=mock-auth-code'
      return
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
    window.location.href = `${baseUrl}/auth/google`
  },

  /**
   * 구글 OAuth 콜백 처리 후 토큰 획득
   * POST /auth/login
   */
  async login(code: string): Promise<{ access_token: string }> {
    const response = await apiClient.post<{ access_token: string }>(
      '/auth/login',
      { code },
      { skipAuth: true }
    )
    return response
  },

  /**
   * 로그아웃 (Zustand store 초기화)
   */
  signOut(): void {
    useAuthStore.getState().logout()
  },
}
