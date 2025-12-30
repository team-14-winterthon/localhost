import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { moviesApi, type MovieCreateRequest } from '@/features/videoGen/api'
import { queryKeys } from '@/shared/lib/queryClient'

/**
 * 내 영화 목록 조회
 */
export function useMyMovies() {
  return useQuery({
    queryKey: queryKeys.movies.my(),
    queryFn: () => moviesApi.getMyMovies(),
  })
}

/**
 * 영화 상세 조회
 */
export function useMovie(movieId: string) {
  return useQuery({
    queryKey: queryKeys.movies.detail(movieId),
    queryFn: () => moviesApi.getById(movieId),
    enabled: !!movieId,
  })
}

/**
 * 영화 생성 뮤테이션
 */
export function useCreateMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: MovieCreateRequest) => moviesApi.create(request),
    onSuccess: () => {
      // Invalidate movies list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.movies.all })
    },
  })
}
