import { apiClient } from '@/shared/api/client'

export interface MovieCreateRequest {
  dong: string
  mood: string
  startDate: string
  endDate: string
}

export interface MovieCreateResponse {
  id: string
  status: boolean
  dong: string
  mood: string
  startDate: string
  endDate: string
  createdAt: string
}

export interface Movie {
  id: string
  title: string
  thumbnailUrl: string
  videoUrl: string
  dong: string
  mood: string
  createdAt: string
  status: boolean
}

export interface MovieDetail {
  id: string
  title: string
  userId: string
  videoUrl: string
  duration: number
}

export const moviesApi = {
  /**
   * 영화 생성 요청
   * POST /movies/create
   */
  async create(request: MovieCreateRequest): Promise<MovieCreateResponse> {
    return apiClient.post<MovieCreateResponse>('/movies/create', request)
  },

  /**
   * 나의 영화 목록 조회
   * GET /movies/my
   */
  async getMyMovies(): Promise<Movie[]> {
    return apiClient.get<Movie[]>('/movies/my')
  },

  /**
   * 영화 상세 조회
   * GET /movies/{movieId}
   */
  async getById(movieId: string): Promise<MovieDetail> {
    return apiClient.get<MovieDetail>(`/movies/${movieId}`)
  },
}

// Legacy export for backwards compatibility
export const videoGenApi = {
  async generate(_request: { visitIds: string[]; userId: string }) {
    // Map old format to new format (for gradual migration)
    return moviesApi.create({
      dong: '',
      mood: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    })
  },
  async getStatus(jobId: string) {
    const movie = await moviesApi.getById(jobId)
    return {
      jobId,
      status: 'completed' as const,
      videoUrl: movie.videoUrl,
    }
  },
}
