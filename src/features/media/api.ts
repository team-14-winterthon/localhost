import { apiClient } from '@/shared/api/client'

export interface AuthPhoto {
  id: string
  url: string
  description: string
  isVerified?: boolean
}

export interface UploadPhotoResponse {
  id: string
  url: string
  description: string
  isVerified: boolean
}

export const authPhotosApi = {
  /**
   * 메모리 오브 인증하기 (사진 업로드)
   * POST /auth-photos/upload
   * Content-Type: multipart/form-data
   */
  async upload(
    photo: File,
    spotId: string,
    description?: string
  ): Promise<UploadPhotoResponse> {
    const formData = new FormData()
    formData.append('photo', photo)
    formData.append('spotId', spotId)
    if (description) {
      formData.append('description', description)
    }

    const token = localStorage.getItem('authToken')
    const baseUrl = import.meta.env.VITE_API_BASE_URL || ''

    const response = await fetch(`${baseUrl}/auth-photos/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('사진 업로드에 실패했습니다.')
    }

    return response.json()
  },

  /**
   * 나의 메모리 오브 목록 조회
   * GET /auth-photos/my
   */
  async getMyPhotos(): Promise<AuthPhoto[]> {
    return apiClient.get<AuthPhoto[]>('/auth-photos/my')
  },

  /**
   * 나의 메모리 오브 조회 (지도용)
   * GET /auth-photos/my-memories
   */
  async getMyMemories(dong?: string): Promise<AuthPhoto[]> {
    const params = dong ? `?dong=${encodeURIComponent(dong)}` : ''
    return apiClient.get<AuthPhoto[]>(`/auth-photos/my-memories${params}`)
  },
}

// Legacy export for backwards compatibility
export const mediaApi = authPhotosApi
