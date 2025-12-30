import type {
  Movie,
  MovieDetail,
  MovieCreateRequest,
  MovieCreateResponse,
} from '@/features/videoGen/api'
import { IMAGES } from './places'

// 샘플 비디오 URL (W3Schools 제공)
const SAMPLE_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4'

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: '자갈치시장 먹방 브이로그',
    thumbnailUrl: IMAGES.jagalchi,
    videoUrl: SAMPLE_VIDEO,
    dong: '부산',
    mood: '브이로그',
    createdAt: '2025-12-20T10:30:00.000Z',
    status: true,
  },
  {
    id: '2',
    title: '해운대 여름 휴가',
    thumbnailUrl: IMAGES.haeundae,
    videoUrl: SAMPLE_VIDEO,
    dong: '부산',
    mood: '다큐멘터리',
    createdAt: '2025-12-18T14:20:00.000Z',
    status: true,
  },
  {
    id: '3',
    title: '다대포 낙조의 추억',
    thumbnailUrl: IMAGES.dadaepo,
    videoUrl: SAMPLE_VIDEO,
    dong: '부산',
    mood: '코미디',
    createdAt: '2025-12-15T09:00:00.000Z',
    status: true,
  },
  {
    id: '4',
    title: '부산 맛집 투어',
    thumbnailUrl: IMAGES.jagalchi,
    videoUrl: SAMPLE_VIDEO,
    dong: '부산',
    mood: '브이로그',
    createdAt: '2025-12-12T16:45:00.000Z',
    status: true,
  },
  {
    id: '5',
    title: '해운대 서핑 도전기',
    thumbnailUrl: IMAGES.haeundae,
    videoUrl: SAMPLE_VIDEO,
    dong: '부산',
    mood: '코미디',
    createdAt: '2025-12-10T11:00:00.000Z',
    status: true,
  },
  {
    id: '6',
    title: '다대포 힐링 산책',
    thumbnailUrl: IMAGES.dadaepo,
    videoUrl: SAMPLE_VIDEO,
    dong: '부산',
    mood: '다큐멘터리',
    createdAt: '2025-12-08T08:30:00.000Z',
    status: true,
  },
]

export const mockMovieDetails: Record<string, MovieDetail> = {
  '1': {
    id: '1',
    title: '자갈치시장 먹방 브이로그',
    userId: 'user-1',
    videoUrl: SAMPLE_VIDEO,
    duration: 180,
  },
  '2': {
    id: '2',
    title: '해운대 여름 휴가',
    userId: 'user-1',
    videoUrl: SAMPLE_VIDEO,
    duration: 240,
  },
  '3': {
    id: '3',
    title: '다대포 낙조의 추억',
    userId: 'user-1',
    videoUrl: SAMPLE_VIDEO,
    duration: 150,
  },
  '4': {
    id: '4',
    title: '부산 맛집 투어',
    userId: 'user-1',
    videoUrl: SAMPLE_VIDEO,
    duration: 200,
  },
  '5': {
    id: '5',
    title: '해운대 서핑 도전기',
    userId: 'user-1',
    videoUrl: SAMPLE_VIDEO,
    duration: 165,
  },
  '6': {
    id: '6',
    title: '다대포 힐링 산책',
    userId: 'user-1',
    videoUrl: SAMPLE_VIDEO,
    duration: 190,
  },
}

// 영화 생성 시 사용할 카운터
let movieIdCounter = 7

export function createMockMovie(request: MovieCreateRequest): MovieCreateResponse {
  const id = String(movieIdCounter++)
  const now = new Date().toISOString()

  // 썸네일은 랜덤 부산 이미지 중 하나 사용
  const imageUrls = [IMAGES.jagalchi, IMAGES.haeundae, IMAGES.dadaepo]
  const thumbnailUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]

  // 생성된 영화를 목록에 추가
  const newMovie: Movie = {
    id,
    title: `${request.dong} ${request.mood} 영화`,
    thumbnailUrl,
    videoUrl: SAMPLE_VIDEO,
    dong: request.dong,
    mood: request.mood,
    createdAt: now,
    status: false, // 처음엔 생성 중 상태
  }

  mockMovies.unshift(newMovie)

  // 상세 정보도 추가
  mockMovieDetails[id] = {
    id,
    title: newMovie.title,
    userId: 'user-1',
    videoUrl: newMovie.videoUrl,
    duration: 0,
  }

  // 2초 후 완료 상태로 변경 (비동기 시뮬레이션)
  setTimeout(() => {
    const movie = mockMovies.find((m) => m.id === id)
    if (movie) {
      movie.status = true
    }
    const detail = mockMovieDetails[id]
    if (detail) {
      detail.duration = Math.floor(Math.random() * 180) + 60
    }
  }, 2000)

  return {
    id,
    status: false,
    dong: request.dong,
    mood: request.mood,
    startDate: request.startDate,
    endDate: request.endDate,
    createdAt: now,
  }
}

export function getMovieById(id: string): MovieDetail | undefined {
  return mockMovieDetails[id]
}

export function getMyMovies(): Movie[] {
  return mockMovies
}
