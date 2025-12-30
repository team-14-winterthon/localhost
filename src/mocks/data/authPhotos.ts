import type { AuthPhoto, UploadPhotoResponse } from '@/features/media/api'

export const mockAuthPhotos: AuthPhoto[] = [
  {
    id: 'photo-1',
    url: 'https://picsum.photos/seed/auth-photo-1/800/600',
    description: '해운대 해수욕장에서 찍은 인증샷! 파도가 정말 시원했어요.',
    isVerified: true,
  },
  {
    id: 'photo-2',
    url: 'https://picsum.photos/seed/auth-photo-2/800/600',
    description: '광안대교 야경과 함께. 불빛이 너무 예뻤습니다.',
    isVerified: true,
  },
  {
    id: 'photo-3',
    url: 'https://picsum.photos/seed/auth-photo-3/800/600',
    description: '감천문화마을 어린왕자 동상 앞에서!',
    isVerified: true,
  },
  {
    id: 'photo-4',
    url: 'https://picsum.photos/seed/auth-photo-4/800/600',
    description: '성산일출봉 정상에서 본 풍경',
    isVerified: true,
  },
  {
    id: 'photo-5',
    url: 'https://picsum.photos/seed/auth-photo-5/800/600',
    description: '협재해수욕장의 에메랄드빛 바다',
    isVerified: true,
  },
  {
    id: 'photo-6',
    url: 'https://picsum.photos/seed/auth-photo-6/800/600',
    description: '경복궁 경회루에서',
    isVerified: false,
  },
  {
    id: 'photo-7',
    url: 'https://picsum.photos/seed/auth-photo-7/800/600',
    description: 'N서울타워에서 바라본 서울 전경',
    isVerified: true,
  },
]

// 지역별 사진 매핑 (my-memories용)
const photosByDong: Record<string, string[]> = {
  부산: ['photo-1', 'photo-2', 'photo-3'],
  제주: ['photo-4', 'photo-5'],
  서울: ['photo-6', 'photo-7'],
}

// 사진 ID 카운터
let photoIdCounter = 8

export function getMyPhotos(): AuthPhoto[] {
  return mockAuthPhotos
}

export function getMyMemories(dong?: string): AuthPhoto[] {
  if (!dong) return mockAuthPhotos

  const photoIds = photosByDong[dong]
  if (!photoIds) return []

  return mockAuthPhotos.filter((photo) => photoIds.includes(photo.id))
}

export function uploadPhoto(
  _photo: File,
  spotId: string,
  description?: string
): UploadPhotoResponse {
  const id = `photo-${photoIdCounter++}`
  const url = `https://picsum.photos/seed/${id}/800/600`
  const desc = description || `${spotId}에서 찍은 사진`

  const newPhoto: AuthPhoto = {
    id,
    url,
    description: desc,
    isVerified: Math.random() > 0.3, // 70% 확률로 인증 성공
  }

  mockAuthPhotos.unshift(newPhoto)

  return {
    id,
    url,
    description: desc,
    isVerified: newPhoto.isVerified!,
  }
}
