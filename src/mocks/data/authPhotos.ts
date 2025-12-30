import type { AuthPhoto, UploadPhotoResponse } from '@/features/media/api'

export const mockAuthPhotos: AuthPhoto[] = [
  {
    id: 'photo-1',
    url: 'https://picsum.photos/seed/jagalchi-photo/800/600',
    description: '자갈치시장에서 싱싱한 회 한 접시! 역시 부산이 맛있어요.',
    isVerified: true,
  },
  {
    id: 'photo-2',
    url: 'https://picsum.photos/seed/haeundae-photo/800/600',
    description: '해운대해수욕장에서 찍은 인증샷! 파도가 정말 시원했어요.',
    isVerified: true,
  },
  {
    id: 'photo-3',
    url: 'https://picsum.photos/seed/dadaepo-photo/800/600',
    description: '다대포해수욕장 낙조분수쇼! 노을과 함께 너무 예뻤어요.',
    isVerified: true,
  },
]

// 지역별 사진 매핑 (my-memories용)
const photosByDong: Record<string, string[]> = {
  부산: ['photo-1', 'photo-2', 'photo-3'],
}

// 사진 ID 카운터
let photoIdCounter = 4

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
