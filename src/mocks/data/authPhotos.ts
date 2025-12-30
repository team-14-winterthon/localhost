import type { AuthPhoto, UploadPhotoResponse } from '@/features/media/api'
import { IMAGES } from './places'

export const mockAuthPhotos: AuthPhoto[] = [
  {
    id: 'photo-1',
    url: IMAGES.jagalchi,
    description: '자갈치시장에서 싱싱한 회 한 접시! 역시 부산이 맛있어요.',
    isVerified: true,
  },
  {
    id: 'photo-2',
    url: IMAGES.haeundae,
    description: '해운대해수욕장에서 찍은 인증샷! 파도가 정말 시원했어요.',
    isVerified: true,
  },
  {
    id: 'photo-3',
    url: IMAGES.dadaepo,
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
  // 업로드된 사진은 랜덤 부산 이미지 중 하나 사용
  const imageUrls = [IMAGES.jagalchi, IMAGES.haeundae, IMAGES.dadaepo]
  const url = imageUrls[Math.floor(Math.random() * imageUrls.length)]
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
