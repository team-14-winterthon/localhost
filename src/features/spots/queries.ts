import { useQuery } from '@tanstack/react-query'
import { spotsApi } from './api'

export const spotKeys = {
  all: ['spots'] as const,
  lists: () => [...spotKeys.all, 'list'] as const,
  detail: (id: string) => [...spotKeys.all, 'detail', id] as const,
}

export function useSpots() {
  return useQuery({
    queryKey: spotKeys.lists(),
    queryFn: () => spotsApi.getAll(),
  })
}

export function useSpot(id: string) {
  return useQuery({
    queryKey: spotKeys.detail(id),
    queryFn: () => spotsApi.getById(id),
    enabled: !!id,
  })
}
