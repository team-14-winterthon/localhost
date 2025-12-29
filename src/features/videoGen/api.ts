import { api } from '@/shared/api/client'

export interface VideoGenerateRequest {
  visitIds: string[]
  userId: string
}

export interface VideoGenerateResponse {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

export interface VideoStatusResponse {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  videoUrl?: string
  progress?: number
  error?: string
}

export const videoGenApi = {
  async generate(request: VideoGenerateRequest): Promise<VideoGenerateResponse> {
    return api.post<VideoGenerateResponse>('/video/generate', request)
  },

  async getStatus(jobId: string): Promise<VideoStatusResponse> {
    return api.get<VideoStatusResponse>(`/video/${jobId}/status`)
  },
}
