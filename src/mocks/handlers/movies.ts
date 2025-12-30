import { http, HttpResponse, delay } from 'msw'
import { getMyMovies, getMovieById, createMockMovie } from '../data/movies'
import type { MovieCreateRequest } from '@/features/videoGen/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const moviesHandlers = [
  // POST /movies/create - 영화 생성
  http.post(`${BASE_URL}/movies/create`, async ({ request }) => {
    await delay(800)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = (await request.json()) as MovieCreateRequest

    if (!body.dong || !body.mood) {
      return HttpResponse.json(
        { error: 'dong and mood are required' },
        { status: 400 }
      )
    }

    const result = createMockMovie(body)
    return HttpResponse.json(result)
  }),

  // GET /movies/my - 나의 영화 목록
  http.get(`${BASE_URL}/movies/my`, async ({ request }) => {
    await delay(500)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const movies = getMyMovies()
    return HttpResponse.json(movies)
  }),

  // GET /movies/:movieId - 영화 상세 조회
  http.get(`${BASE_URL}/movies/:movieId`, async ({ params, request }) => {
    await delay(400)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { movieId } = params as { movieId: string }
    const movie = getMovieById(movieId)

    if (!movie) {
      return HttpResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json(movie)
  }),
]
