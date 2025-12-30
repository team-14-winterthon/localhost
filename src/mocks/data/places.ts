import type { Place, Memory } from '@/features/spots/types'

export const mockPlaces: Place[] = [
  // 부산 지역
  {
    id: 'place-1',
    name: '해운대 해수욕장',
    latitude: 35.1586,
    longitude: 129.1603,
  },
  {
    id: 'place-2',
    name: '광안리 해수욕장',
    latitude: 35.1532,
    longitude: 129.1187,
  },
  {
    id: 'place-3',
    name: '감천문화마을',
    latitude: 35.0975,
    longitude: 129.0107,
  },
  {
    id: 'place-4',
    name: '자갈치시장',
    latitude: 35.0967,
    longitude: 129.0303,
  },
  {
    id: 'place-5',
    name: '태종대',
    latitude: 35.0519,
    longitude: 129.0847,
  },
  // 제주 지역
  {
    id: 'place-6',
    name: '성산일출봉',
    latitude: 33.4586,
    longitude: 126.9425,
  },
  {
    id: 'place-7',
    name: '한라산',
    latitude: 33.3617,
    longitude: 126.5292,
  },
  {
    id: 'place-8',
    name: '협재해수욕장',
    latitude: 33.3942,
    longitude: 126.2397,
  },
  {
    id: 'place-9',
    name: '우도',
    latitude: 33.5003,
    longitude: 126.9517,
  },
  {
    id: 'place-10',
    name: '천지연폭포',
    latitude: 33.2467,
    longitude: 126.5544,
  },
  // 서울 지역
  {
    id: 'place-11',
    name: '경복궁',
    latitude: 37.5796,
    longitude: 126.9770,
  },
  {
    id: 'place-12',
    name: 'N서울타워',
    latitude: 37.5512,
    longitude: 126.9882,
  },
  {
    id: 'place-13',
    name: '북촌한옥마을',
    latitude: 37.5826,
    longitude: 126.9831,
  },
  {
    id: 'place-14',
    name: '명동',
    latitude: 37.5636,
    longitude: 126.9869,
  },
  {
    id: 'place-15',
    name: '홍대',
    latitude: 37.5563,
    longitude: 126.9236,
  },
]

export const mockMemories: Memory[] = [
  {
    id: 'memory-1',
    title: '해운대의 아름다운 일몰',
    description: '해운대 해수욕장에서 바라본 황홀한 일몰 풍경. 하늘이 붉게 물들어 정말 아름다웠습니다.',
    url: 'https://picsum.photos/seed/haeundae/800/600',
  },
  {
    id: 'memory-2',
    title: '광안대교 야경',
    description: '광안리에서 본 광안대교의 화려한 야경. 레이저쇼가 정말 인상적이었어요.',
    url: 'https://picsum.photos/seed/gwangalli/800/600',
  },
  {
    id: 'memory-3',
    title: '감천마을 골목 탐험',
    description: '알록달록한 감천문화마을의 골목을 걸으며 찍은 사진들. 어린왕자와 여우 조형물도 만났어요.',
    url: 'https://picsum.photos/seed/gamcheon/800/600',
  },
  {
    id: 'memory-4',
    title: '성산일출봉 등반',
    description: '이른 아침 성산일출봉에 올라 본 일출. 힘들었지만 그만한 가치가 있었습니다.',
    url: 'https://picsum.photos/seed/seongsan/800/600',
  },
  {
    id: 'memory-5',
    title: '한라산 정상 정복',
    description: '드디어 한라산 백록담 정상에 올랐습니다! 구름 위를 걷는 기분이었어요.',
    url: 'https://picsum.photos/seed/hallasan/800/600',
  },
  {
    id: 'memory-6',
    title: '경복궁 한복 나들이',
    description: '한복을 입고 경복궁을 거닐었습니다. 마치 조선시대로 시간여행 온 것 같았어요.',
    url: 'https://picsum.photos/seed/gyeongbok/800/600',
  },
]

// 지역별로 필터링하는 헬퍼 함수
export function getPlacesByDong(dong?: string): Place[] {
  if (!dong) return mockPlaces

  const dongMapping: Record<string, string[]> = {
    부산: ['place-1', 'place-2', 'place-3', 'place-4', 'place-5'],
    제주: ['place-6', 'place-7', 'place-8', 'place-9', 'place-10'],
    서울: ['place-11', 'place-12', 'place-13', 'place-14', 'place-15'],
  }

  const placeIds = dongMapping[dong]
  if (!placeIds) return mockPlaces

  return mockPlaces.filter((place) => placeIds.includes(place.id))
}

export function getMemoryById(id: string): Memory | undefined {
  return mockMemories.find((memory) => memory.id === id)
}
