import { apiClient } from '@/shared/api/client'

export interface FeedItem {
  id: string
  url: string
  description: string
  user: {
    nickname: string
  }
}

export const feedApi = {
  /**
   * 승인된 인증사진 피드 조회
   * GET /feed
   */
  async getFeed(): Promise<FeedItem[]> {
    return apiClient.get<FeedItem[]>('/feed')
  },
}
