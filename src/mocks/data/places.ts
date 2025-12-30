import type { Place, Memory } from '@/features/spots/types'

// 실제 부산 이미지 URL (Unsplash)
const IMAGES = {
  jagalchi: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&h=600&fit=crop',
  haeundae: 'https://images.unsplash.com/photo-1598981457915-aea220950616?w=800&h=600&fit=crop',
  dadaepo: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=600&fit=crop',
  bssm: 'https://velog.velcdn.com/images/lovingcats/post/6d6e63c4-f82e-41e4-809d-3d7ee5d0bf65/image.png?w=800&h=600',
}

export const mockPlaces: Place[] = [
  {
    id: 'place-1',
    name: '자갈치시장',
    latitude: 35.0967,
    longitude: 129.0303,
  },
  {
    id: 'place-2',
    name: '해운대해수욕장',
    latitude: 35.1586,
    longitude: 129.1603,
  },
  {
    id: 'place-3',
    name: '다대포해수욕장',
    latitude: 35.0469,
    longitude: 128.9664,
  },
  {
    id: 'place-4',
    name: '부산소프트웨어마이스터고등학교',
    latitude: 35.1887725,
    longitude: 128.9034629,
  },
]

export const mockMemories: Memory[] = [
  {
    id: 'memory-1',
    title: '자갈치시장 맛집 탐방',
    description: '싱싱한 회와 해산물의 천국! 자갈치시장에서 먹은 회가 정말 맛있었어요.',
    url: IMAGES.jagalchi,
  },
  {
    id: 'memory-2',
    title: '해운대의 아름다운 일몰',
    description: '해운대해수욕장에서 바라본 황홀한 일몰 풍경. 하늘이 붉게 물들어 정말 아름다웠습니다.',
    url: IMAGES.haeundae,
  },
  {
    id: 'memory-3',
    title: '다대포 낙조분수',
    description: '다대포해수욕장의 멋진 낙조분수쇼! 음악과 함께하는 분수가 환상적이었어요.',
    url: IMAGES.dadaepo,
  },
  {
    id: 'memory-4',
    title: '부산소프트웨어마이스터고등학교',
    description: '부산소프트웨어마이스터고등학교 6기 탄생을 환영합니다...',
    url: IMAGES.bssm,
  },
]

// 지역별로 필터링하는 헬퍼 함수
export function getPlacesByDong(dong?: string): Place[] {
  if (!dong) return mockPlaces

  const dongMapping: Record<string, string[]> = {
    부산: ['place-1', 'place-2', 'place-3', 'place-4'],
  }

  const placeIds = dongMapping[dong]
  if (!placeIds) return mockPlaces

  return mockPlaces.filter((place) => placeIds.includes(place.id))
}

export function getMemoryById(id: string): Memory | undefined {
  return mockMemories.find((memory) => memory.id === id)
}

export { IMAGES }
