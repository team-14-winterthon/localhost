import { http, HttpResponse, delay } from 'msw'
import { getFeed } from '../data/feed'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const feedHandlers = [
  // GET /feed - 피드 조회
  http.get(`${BASE_URL}/feed`, async () => {
    await delay(500)

    const feedItems = getFeed()
    return HttpResponse.json(feedItems)
  }),
]
