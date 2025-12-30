import { apiClient } from '@/shared/api/client'
import type { User } from './types'

interface AuthResponse {
  access_token: string
  user: User
}

export const authApi = {
  async getGoogleAuthUrl(): Promise<{ url: string }> {
    const response = await apiClient.get<{ url: string }>('/auth/google/url', { skipAuth: true })
    return response
  },

  async handleGoogleCallback(code: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      '/auth/google/callback',
      { code },
      { skipAuth: true }
    )
    return response
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    return response
  },

  async signOut(): Promise<void> {
    await apiClient.post('/auth/logout')
  },
}
