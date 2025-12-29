/**
 * API 엔드포인트 상수
 */

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  spots: {
    list: '/spots',
    detail: (id: string) => `/spots/${id}`,
    create: '/spots',
  },
  visits: {
    list: '/visits',
    create: '/visits',
  },
  media: {
    upload: '/media/upload',
  },
  aiVerify: {
    verify: '/ai/verify',
  },
  videoGen: {
    generate: '/video/generate',
    status: (id: string) => `/video/${id}/status`,
  },
} as const
