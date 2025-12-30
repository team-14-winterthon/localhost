import type { FeedItem } from '@/features/feed/api'

export const mockFeedItems: FeedItem[] = [
  {
    id: 'feed-1',
    url: 'https://picsum.photos/seed/feed-1/800/600',
    description: '해운대 해수욕장에서 즐긴 여름 바캉스! 물이 정말 깨끗했어요 🏖️',
    user: {
      nickname: '여행러버',
    },
  },
  {
    id: 'feed-2',
    url: 'https://picsum.photos/seed/feed-2/800/600',
    description: '광안대교 야경이 너무 아름다워서 한참을 바라봤어요 ✨',
    user: {
      nickname: '맛집탐험가',
    },
  },
  {
    id: 'feed-3',
    url: 'https://picsum.photos/seed/feed-3/800/600',
    description: '감천문화마을 골목골목이 다 예술이에요!',
    user: {
      nickname: '사진작가',
    },
  },
  {
    id: 'feed-4',
    url: 'https://picsum.photos/seed/feed-4/800/600',
    description: '성산일출봉에서 본 일출! 힘들게 올라간 보람이 있었습니다 🌅',
    user: {
      nickname: '새벽러너',
    },
  },
  {
    id: 'feed-5',
    url: 'https://picsum.photos/seed/feed-5/800/600',
    description: '한라산 등반 성공! 백록담의 신비로운 모습에 감동받았어요',
    user: {
      nickname: '등산왕',
    },
  },
  {
    id: 'feed-6',
    url: 'https://picsum.photos/seed/feed-6/800/600',
    description: '협재해수욕장의 에메랄드빛 바다... 제주도 최고!',
    user: {
      nickname: '바다사랑',
    },
  },
  {
    id: 'feed-7',
    url: 'https://picsum.photos/seed/feed-7/800/600',
    description: '경복궁에서 한복 입고 사진 찍었어요. 마치 조선시대 같았습니다',
    user: {
      nickname: '전통매니아',
    },
  },
  {
    id: 'feed-8',
    url: 'https://picsum.photos/seed/feed-8/800/600',
    description: 'N서울타워에서 야경 보며 연인과 데이트 💕',
    user: {
      nickname: '로맨티스트',
    },
  },
  {
    id: 'feed-9',
    url: 'https://picsum.photos/seed/feed-9/800/600',
    description: '북촌한옥마을 골목이 너무 예뻐서 시간 가는 줄 몰랐어요',
    user: {
      nickname: '골목탐험가',
    },
  },
  {
    id: 'feed-10',
    url: 'https://picsum.photos/seed/feed-10/800/600',
    description: '자갈치시장에서 싱싱한 회 한 접시! 역시 부산이 맛있어요 🍣',
    user: {
      nickname: '맛집탐험가',
    },
  },
]

export function getFeed(): FeedItem[] {
  return mockFeedItems
}
