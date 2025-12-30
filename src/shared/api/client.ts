/**
 * Axios 기반 API 클라이언트
 * - Bearer 토큰 자동 주입
 * - 공통 헤더 설정
 * - 응답 래퍼 자동 처리
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse, ApiErrorResponse } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.memoryorb.app/v1'

// 커스텀 에러 클래스
export class ApiError extends Error {
  public status: number
  public code: string
  public details?: Record<string, unknown>

  constructor(status: number, code: string, message: string, details?: Record<string, unknown>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': '1.0',
    'X-Client-Platform': 'web',
    'X-Client-Version': '1.0.0',
  },
})

// 요청 인터셉터: 토큰 주입
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터: 래퍼 처리 및 에러 변환
axiosInstance.interceptors.response.use(
  (response) => {
    // 성공 응답에서 data 추출
    const apiResponse = response.data as ApiResponse<unknown>
    if (apiResponse && typeof apiResponse === 'object' && 'success' in apiResponse && apiResponse.success) {
      return { ...response, data: apiResponse.data }
    }
    return response
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response

      // 401 에러: 토큰 만료 처리
      if (status === 401) {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refresh_token: refreshToken,
            })
            const { access_token } = refreshResponse.data.data
            localStorage.setItem('accessToken', access_token)

            // 원래 요청 재시도
            if (error.config) {
              error.config.headers.Authorization = `Bearer ${access_token}`
              return axiosInstance(error.config)
            }
          } catch {
            // 리프레시 실패: 로그아웃 처리
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            window.location.href = '/login'
          }
        }
      }

      // API 에러 응답 처리
      if (data?.error) {
        throw new ApiError(
          status,
          data.error.code,
          data.error.message,
          data.error.details as Record<string, unknown>
        )
      }

      throw new ApiError(status, 'UNKNOWN_ERROR', error.message)
    }

    // 네트워크 에러
    if (error.request) {
      throw new ApiError(0, 'NETWORK_ERROR', 'API 서버에 연결할 수 없습니다.')
    }

    throw error
  }
)

// API 클라이언트 export
export const apiClient = axiosInstance

// 편의 메서드
export const api = {
  get: <T>(url: string, config?: Parameters<typeof axiosInstance.get>[1]) =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: Parameters<typeof axiosInstance.post>[2]) =>
    axiosInstance.post<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: Parameters<typeof axiosInstance.patch>[2]) =>
    axiosInstance.patch<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: Parameters<typeof axiosInstance.put>[2]) =>
    axiosInstance.put<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: Parameters<typeof axiosInstance.delete>[1]) =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
}
