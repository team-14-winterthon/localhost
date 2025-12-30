import type {
  Movie,
  MovieDetail,
  MovieCreateRequest,
  MovieCreateResponse,
} from '@/features/videoGen/api'

export const mockMovies: Movie[] = [
  {
    id: 'movie-1',
    title: '자갈치시장 먹방 브이로그',
    thumbnailUrl: 'https://picsum.photos/seed/movie-jagalchi/400/300',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    dong: '부산',
    mood: '브이로그',
    createdAt: '2024-12-15T10:30:00.000Z',
    status: true,
  },
  {
    id: 'movie-2',
    title: '해운대 여름 휴가',
    thumbnailUrl: 'https://picsum.photos/seed/movie-haeundae/400/300',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    dong: '부산',
    mood: '다큐멘터리',
    createdAt: '2024-12-10T14:20:00.000Z',
    status: true,
  },
  {
    id: 'movie-3',
    title: '다대포 낙조의 추억',
    thumbnailUrl: 'https://picsum.photos/seed/movie-dadaepo/400/300',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    dong: '부산',
    mood: '코미디',
    createdAt: '2024-12-05T09:00:00.000Z',
    status: true,
  },
]

export const mockMovieDetails: Record<string, MovieDetail> = {
  'movie-1': {
    id: 'movie-1',
    title: '자갈치시장 먹방 브이로그',
    userId: 'user-1',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: 180,
  },
  'movie-2': {
    id: 'movie-2',
    title: '해운대 여름 휴가',
    userId: 'user-1',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: 240,
  },
  'movie-3': {
    id: 'movie-3',
    title: '다대포 낙조의 추억',
    userId: 'user-1',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: 150,
  },
}

// 영화 생성 시 사용할 카운터
let movieIdCounter = 4

export function createMockMovie(request: MovieCreateRequest): MovieCreateResponse {
  const id = `movie-${movieIdCounter++}`
  const now = new Date().toISOString()

  // 생성된 영화를 목록에 추가
  const newMovie: Movie = {
    id,
    title: `${request.dong} ${request.mood} 영화`,
    thumbnailUrl: `https://picsum.photos/seed/${id}/400/300`,
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
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
