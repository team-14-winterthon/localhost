import type { FeedItem } from '@/features/feed/api'

export const mockFeedItems: FeedItem[] = [
  {
    id: 'feed-1',
    url: 'https://picsum.photos/seed/feed-jagalchi/800/600',
    description: '자갈치시장에서 싱싱한 회 먹방! 아저씨가 손질해주신 광어회 최고 🍣',
    user: {
      nickname: '맛집탐험가',
    },
  },
  {
    id: 'feed-2',
    url: 'https://picsum.photos/seed/feed-haeundae/800/600',
    description: '해운대해수욕장에서 즐긴 여름 바캉스! 물이 정말 깨끗했어요 🏖️',
    user: {
      nickname: '여행러버',
    },
  },
  {
    id: 'feed-3',
    url: 'https://picsum.photos/seed/feed-dadaepo/800/600',
    description: '다대포해수욕장 낙조분수쇼 보러 왔어요! 음악과 분수의 조화가 환상적 ⛲',
    user: {
      nickname: '사진작가',
    },
  },
  {
    id: 'feed-4',
    url: 'https://picsum.photos/seed/feed-jagalchi2/800/600',
    description: '자갈치시장 2층에서 먹은 회덮밥! 가성비 최고입니다 👍',
    user: {
      nickname: '부산토박이',
    },
  },
  {
    id: 'feed-5',
    url: 'https://picsum.photos/seed/feed-haeundae2/800/600',
    description: '해운대 야경이 너무 예뻐서 밤산책 했어요 🌙',
    user: {
      nickname: '야경러버',
    },
  },
  {
    id: 'feed-6',
    url: 'https://picsum.photos/seed/feed-dadaepo2/800/600',
    description: '다대포 일몰 타임! 하늘이 온통 주황빛으로 물들었어요 🌅',
    user: {
      nickname: '일몰헌터',
    },
  },
]

export function getFeed(): FeedItem[] {
  return mockFeedItems
}
