/**
 * AI Verify 관련 React Query Hooks
 */

import { useQuery, useMutation } from '@tanstack/react-query'
import { aiVerifyApi } from './api'
import type { VerifyPhotoRequest, RetryVerificationRequest } from './types'

// 쿼리 키
export const aiVerifyKeys = {
  all: ['aiVerify'] as const,
  verification: (sessionId: string) => [...aiVerifyKeys.all, 'verification', sessionId] as const,
}

// 사진 검증 시작
export const useVerifyPhoto = () => {
  return useMutation({
    mutationFn: (data: VerifyPhotoRequest) => aiVerifyApi.verifyPhoto(data),
  })
}

// 검증 결과 조회 (polling 지원)
export const useVerificationResult = (
  sessionId: string,
  options?: {
    enabled?: boolean
    refetchInterval?: number | false
  }
) => {
  return useQuery({
    queryKey: aiVerifyKeys.verification(sessionId),
    queryFn: () => aiVerifyApi.getVerificationResult(sessionId),
    enabled: !!sessionId && (options?.enabled ?? true),
    refetchInterval: (query) => {
      // 완료되면 polling 중지
      const data = query.state.data
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false
      }
      return options?.refetchInterval ?? 2000 // 2초마다 polling
    },
  })
}

// 검증 재시도
export const useRetryVerification = (sessionId: string) => {
  return useMutation({
    mutationFn: (data: RetryVerificationRequest) =>
      aiVerifyApi.retryVerification(sessionId, data),
  })
}
