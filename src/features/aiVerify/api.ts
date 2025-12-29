import { api } from '@/shared/api/client'

export interface VerifyRequest {
  imageUrl: string
  spotId: string
}

export interface VerifyResponse {
  verified: boolean
  confidence: number
  message: string
}

export const aiVerifyApi = {
  async verify(request: VerifyRequest): Promise<VerifyResponse> {
    return api.post<VerifyResponse>('/ai/verify', request)
  },
}
