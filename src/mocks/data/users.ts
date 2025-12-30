export interface MockUser {
  id: string
  nickname: string
  email: string
  createdAt: string
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    nickname: '여행러버',
    email: 'traveler@example.com',
    createdAt: '2024-01-15T09:00:00.000Z',
  },
  {
    id: 'user-2',
    nickname: '맛집탐험가',
    email: 'foodie@example.com',
    createdAt: '2024-02-20T14:30:00.000Z',
  },
  {
    id: 'user-3',
    nickname: '사진작가',
    email: 'photographer@example.com',
    createdAt: '2024-03-10T11:15:00.000Z',
  },
]

// 현재 로그인한 사용자 (목 데이터용)
export const currentUser = mockUsers[0]
