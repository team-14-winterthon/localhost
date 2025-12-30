/**
 * AI Verify API
 * API 명세서 기준
 */

import { api } from '@/shared/api/client'
import type {
  VerifyPhotoRequest,
  VerifyPhotoResponse,
  VerificationResultResponse,
  RetryVerificationRequest,
  RetryVerificationResponse,
} from './types'

export const aiVerifyApi = {
  // 사진 검증 시작
  verifyPhoto: (data: VerifyPhotoRequest) =>
    api.post<VerifyPhotoResponse>('/ai/verify-photo', data),

  // 검증 결과 조회
  getVerificationResult: (sessionId: string) =>
    api.get<VerificationResultResponse>(`/ai/verification/${sessionId}`),

  // 검증 재시도
  retryVerification: (sessionId: string, data: RetryVerificationRequest) =>
    api.post<RetryVerificationResponse>(`/ai/verification/${sessionId}/retry`, data),
}
