/**
 * Media API
 * API 명세서 기준
 */

import { apiClient } from '@/shared/api/client'
import { api } from '@/shared/api/client'
import type {
  MediaDetail,
  GetMediaParams,
  GetMediaResponse,
  UploadMediaRequest,
  UploadMediaResponse,
  UpdateMediaRequest,
  UpdateMediaResponse,
  DeleteMediaResponse,
  UploadVoiceMemoRequest,
  UploadVoiceMemoResponse,
} from './types'

export const mediaApi = {
  // 미디어 목록 조회
  getAll: (params?: GetMediaParams) =>
    api.get<GetMediaResponse>('/media', { params }),

  // 미디어 상세 조회
  getById: (mediaId: string) =>
    api.get<MediaDetail>(`/media/${mediaId}`),

  // 미디어 업로드 (multipart/form-data)
  upload: async (data: UploadMediaRequest): Promise<UploadMediaResponse> => {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('spot_id', data.spot_id)
    formData.append('verification_id', data.verification_id)
    formData.append('location', JSON.stringify(data.location))
    if (data.user_memo) {
      formData.append('user_memo', data.user_memo)
    }

    const response = await apiClient.post<UploadMediaResponse>('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // 미디어 수정
  update: (mediaId: string, data: UpdateMediaRequest) =>
    api.patch<UpdateMediaResponse>(`/media/${mediaId}`, data),

  // 미디어 삭제
  delete: (mediaId: string) =>
    api.delete<DeleteMediaResponse>(`/media/${mediaId}`),

  // 음성 메모 업로드 (multipart/form-data)
  uploadVoiceMemo: async (data: UploadVoiceMemoRequest): Promise<UploadVoiceMemoResponse> => {
    const formData = new FormData()
    formData.append('audio_file', data.audio_file)
    formData.append('media_id', data.media_id)
    formData.append('duration', String(data.duration))

    const response = await apiClient.post<UploadVoiceMemoResponse>('/media/voice-memo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}
