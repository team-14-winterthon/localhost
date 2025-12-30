import { http, HttpResponse, delay } from 'msw'
import { getMyPhotos, getMyMemories, uploadPhoto } from '../data/authPhotos'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const authPhotosHandlers = [
  // POST /auth-photos/upload - 사진 업로드
  http.post(`${BASE_URL}/auth-photos/upload`, async ({ request }) => {
    await delay(1000) // 업로드는 좀 더 오래 걸리는 것처럼

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const photo = formData.get('photo') as File | null
    const spotId = formData.get('spotId') as string | null
    const description = formData.get('description') as string | null

    if (!photo || !spotId) {
      return HttpResponse.json(
        { error: 'photo and spotId are required' },
        { status: 400 }
      )
    }

    const result = uploadPhoto(photo, spotId, description || undefined)
    return HttpResponse.json(result)
  }),

  // GET /auth-photos/my - 나의 인증사진 목록
  http.get(`${BASE_URL}/auth-photos/my`, async ({ request }) => {
    await delay(400)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const photos = getMyPhotos()
    return HttpResponse.json(photos)
  }),

  // GET /auth-photos/my-memories - 나의 메모리 (지도용)
  http.get(`${BASE_URL}/auth-photos/my-memories`, async ({ request }) => {
    await delay(400)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const url = new URL(request.url)
    const dong = url.searchParams.get('dong') || undefined

    const memories = getMyMemories(dong)
    return HttpResponse.json(memories)
  }),
]
