import { http, HttpResponse, delay } from 'msw'
import { getPlacesByDong, getMemoryById } from '../data/places'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const placesHandlers = [
  // GET /places - 장소 목록 조회
  http.get(`${BASE_URL}/places`, async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const dong = url.searchParams.get('dong') || undefined

    const places = getPlacesByDong(dong)
    return HttpResponse.json(places)
  }),

  // GET /memories/:memoryId - 메모리 상세 조회
  http.get(`${BASE_URL}/memories/:memoryId`, async ({ params }) => {
    await delay(300)

    const { memoryId } = params as { memoryId: string }
    const memory = getMemoryById(memoryId)

    if (!memory) {
      return HttpResponse.json(
        { error: 'Memory not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json(memory)
  }),
]
