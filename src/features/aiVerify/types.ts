/**
 * AI Verify 관련 타입 정의
 * API 명세서 기준
 */

// 검증 상태
export type VerificationStatus = 'pending' | 'processing' | 'completed' | 'failed'

// 검증 단계 상태
export type StepStatus = 'pending' | 'processing' | 'completed' | 'passed' | 'failed'

// 검증 단계
export interface VerificationStep {
  name: string
  status: StepStatus
  confidence: number | null
}

// 사진 검증 시작 요청
export interface VerifyPhotoRequest {
  media_id: string
  spot_id: string
  verification_id: string
}

// 사진 검증 시작 응답
export interface VerifyPhotoResponse {
  verification_session_id: string
  status: VerificationStatus
  estimated_completion: string
  steps: VerificationStep[]
}

// 위치 검증 상세
export interface LocationVerificationDetails {
  gps_accuracy: number
  distance_from_spot: number
  location_match: boolean
}

// 랜드마크 검증 상세
export interface LandmarkDetectionDetails {
  detected_landmarks: string[]
  landmark_confidence: number[]
}

// 중복 검증 상세
export interface DuplicateDetectionDetails {
  similarity_matches: string[]
  is_duplicate: boolean
}

// 품질 검증 상세
export interface QualityAssessmentDetails {
  sharpness: number
  lighting: number
  composition: number
}

// 검증 결과 상세
export interface VerificationStepResult {
  status: StepStatus
  confidence: number
  details: LocationVerificationDetails | LandmarkDetectionDetails | DuplicateDetectionDetails | QualityAssessmentDetails
}

// 검증 결과 조회 응답
export interface VerificationResultResponse {
  session_id: string
  status: VerificationStatus
  overall_result: 'verified' | 'failed' | 'pending'
  confidence_score: number
  completed_at?: string
  verification_steps: {
    location_verification: VerificationStepResult
    landmark_detection: VerificationStepResult
    duplicate_detection: VerificationStepResult
    quality_assessment: VerificationStepResult
  }
  ai_tags: {
    auto_generated: string[]
    confidence_scores: number[]
  }
}

// 검증 재시도 요청
export interface RetryVerificationRequest {
  retry_reason: string
  new_media_id: string
}

// 검증 재시도 응답
export interface RetryVerificationResponse {
  new_session_id: string
  status: VerificationStatus
  retry_count: number
  max_retries: number
}
