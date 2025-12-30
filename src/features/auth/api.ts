import { apiClient } from '@/shared/api/client'

export const authApi = {
  async getGoogleAuthUrl(): Promise<{ url: string }> {
    const response = await apiClient.get<{ url: string }>('/auth/google/url', { skipAuth: true })
    return response
  },

  async handleGoogleCallback(code: string): Promise<{ access_token: string }> {
    const response = await apiClient.post<{ access_token: string }>(
      '/auth/google/callback',
      { code },
      { skipAuth: true }
    )
    return response
  },

  async signOut(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      localStorage.removeItem('authToken')
    }
  },
}
