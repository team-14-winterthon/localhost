import { http, HttpResponse, delay } from 'msw'
import { currentUser } from '../data/users'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const authHandlers = [
  // POST /auth/login - 구글 로그인 콜백
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as { code?: string }

    if (!body.code) {
      return HttpResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      )
    }

    // 목 토큰 반환
    return HttpResponse.json({
      access_token: 'mock-access-token-' + Date.now(),
    })
  }),

  // GET /auth/me - 현재 사용자 정보
  http.get(`${BASE_URL}/auth/me`, async ({ request }) => {
    await delay(300)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      id: currentUser.id,
      nickname: currentUser.nickname,
      created_at: currentUser.createdAt,
    })
  }),

  // POST /auth/logout - 로그아웃
  http.post(`${BASE_URL}/auth/logout`, async () => {
    await delay(200)
    return HttpResponse.json({ success: true })
  }),

  // GET /auth/google - 구글 OAuth 리다이렉트 (실제로는 리다이렉트지만 목에서는 성공 응답)
  http.get(`${BASE_URL}/auth/google`, async () => {
    await delay(100)
    // 실제로는 구글 OAuth URL로 리다이렉트하지만,
    // 목 환경에서는 바로 콜백 URL로 보내는 것처럼 처리
    return HttpResponse.json({
      redirectUrl: '/auth/callback?code=mock-auth-code',
    })
  }),
]
