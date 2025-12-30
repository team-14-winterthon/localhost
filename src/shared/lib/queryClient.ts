import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (previously cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Query Keys - centralized management
export const queryKeys = {
  places: {
    all: ['places'] as const,
    list: (dong?: string) => [...queryKeys.places.all, 'list', dong] as const,
  },
  memories: {
    all: ['memories'] as const,
    detail: (id: string) => [...queryKeys.memories.all, 'detail', id] as const,
  },
  authPhotos: {
    all: ['authPhotos'] as const,
    my: () => [...queryKeys.authPhotos.all, 'my'] as const,
    myMemories: (dong?: string) => [...queryKeys.authPhotos.all, 'myMemories', dong] as const,
  },
  movies: {
    all: ['movies'] as const,
    my: () => [...queryKeys.movies.all, 'my'] as const,
    detail: (id: string) => [...queryKeys.movies.all, 'detail', id] as const,
  },
}
