import { http, HttpResponse, delay } from 'msw'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const aiVerifyHandlers = [
  // POST /ai/verify - AI 검증
  http.post(`${BASE_URL}/ai/verify`, async ({ request }) => {
    await delay(1500) // AI 처리 시간 시뮬레이션

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = (await request.json()) as { imageUrl?: string; spotId?: string }

    if (!body.imageUrl || !body.spotId) {
      return HttpResponse.json(
        { error: 'imageUrl and spotId are required' },
        { status: 400 }
      )
    }

    // 랜덤하게 검증 결과 반환 (80% 성공률)
    const verified = Math.random() > 0.2
    const confidence = verified
      ? 0.75 + Math.random() * 0.25 // 75% ~ 100%
      : 0.2 + Math.random() * 0.3   // 20% ~ 50%

    return HttpResponse.json({
      verified,
      confidence: Math.round(confidence * 100) / 100,
      message: verified
        ? '사진이 해당 장소에서 촬영된 것으로 확인되었습니다.'
        : '사진이 해당 장소와 일치하지 않는 것 같습니다. 다시 시도해주세요.',
    })
  }),
]
