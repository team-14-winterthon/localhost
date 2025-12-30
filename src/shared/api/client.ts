/**
 * HTTP 클라이언트 - Bearer 토큰 자동 주입
 */

import { env } from '../utils/env'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { skipAuth, headers, ...fetchOptions } = options

  const url = env.api.baseUrl
    ? `${env.api.baseUrl}${endpoint}`
    : endpoint

  // Get token from localStorage
  const token = !skipAuth ? localStorage.getItem('authToken') : null

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    })

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')

    if (!response.ok) {
      const errorData = isJson ? await response.json().catch(() => null) : null

      // Better error message for common issues
      if (!env.api.baseUrl) {
        throw new ApiError(
          response.status,
          'API 서버 주소가 설정되지 않았습니다. .env 파일을 확인해주세요.',
          errorData
        )
      }

      throw new ApiError(
        response.status,
        errorData?.message || response.statusText,
        errorData
      )
    }

    if (!isJson) {
      throw new ApiError(
        500,
        'API 서버가 응답하지 않습니다. 백엔드 서버가 실행 중인지 확인해주세요.',
        null
      )
    }

    return response.json()
  } catch (error) {
    // Network errors (CORS, connection refused, etc.)
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        0,
        'API 서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.',
        null
      )
    }

    throw error
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}

// Legacy export for backwards compatibility
export const api = apiClient
