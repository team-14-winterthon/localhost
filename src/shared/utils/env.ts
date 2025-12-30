/**
 * 환경변수 안전하게 읽기
 */

export const env = {
  googleMaps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  },
} as const

export function requireEnv(key: string): string {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}
