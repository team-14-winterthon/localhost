import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Navbar from '@/shared/components/Navbar'
import LeafletMap from '@/shared/components/LeafletMap'
import BottomSheet from '@/shared/components/BottomSheet'
import SpotCard from '@/features/spots/components/SpotCard'
import { useLocationStore } from '@/shared/stores'
import { useSpots } from '@/features/spots/queries'
import type { Spot, Memory } from '@/features/spots/types'
import type { MapMarker } from '@/shared/components/LeafletMap/types'
import { calculateDistance } from '@/shared/utils/distance'
import { H3, P3 } from '@/shared/components/Typography'

const MapPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`

const CameraButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 260px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.primary};
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;

  &:active {
    opacity: 0.8;
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`

const SheetContent = styled.div`
  padding: 0 20px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-shrink: 0;
`

const Title = styled(H3)`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray[900]};
`

const ViewModeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[700]};

  &:active {
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const SpotList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LoadingMessage = styled(P3)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 24px;
`

// Detail View Styles
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[900]};

  svg {
    width: 24px;
    height: 24px;
  }
`

const ScrollContent = styled.div`
  overflow-y: auto;
  padding-bottom: 24px;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`

const DetailImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
`

const SpotMeta = styled.div`
  margin-bottom: 24px;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 13px;
  margin-top: 4px;
  
  svg {
    width: 14px;
    height: 14px;
  }
`

const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0 0 12px 0;
`

const MemoryOrbList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin: 0 -20px 24px;
  padding: 0 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MemoryOrbItem = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 140px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
`

const MemoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MemoryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  color: white;
  font-size: 12px;
  font-weight: 600;
`

const ChatSection = styled.div`
  margin-top: 12px;
`

const ChatCard = styled.div`
  background: #F2F4F6;
  border-radius: 16px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  /* Placeholder background logic */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1596443686812-2f45229eeb36?q=80&w=2000&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    opacity: 0.8;
  }
`

const ChatBubble = styled.div`
  background: #FFF9D1;
  padding: 12px 16px;
  border-radius: 16px;
  border-bottom-left-radius: 2px;
  margin-bottom: 50px; /* Space for character */
  position: relative;
  width: fit-content;
  z-index: 2;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  h5 {
    margin: 0 0 8px 0;
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`

const OptionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`

const OptionButton = styled.button`
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(0,0,0,0.1);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: white;
  }
`

const Character = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: white; /* Placeholder for character */
  border-radius: 50%;
  border: 4px solid #333;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`

const ActionButton = styled.button`
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`

export default function MapPage() {
  const navigate = useNavigate()

  // 전역 상태 사용
  const { position, loading: geoLoading, fetchPosition } = useLocationStore()
  const { data: spots = [], isLoading: loading } = useSpots()

  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  // 위치 정보 가져오기
  useEffect(() => {
    fetchPosition()
  }, [fetchPosition])

  // Mock Memories Data
  const memories: Memory[] = [
    {
      id: '1',
      visit_id: 'v1',
      title: '이게 부산이지 ㅋㅋ',
      description: '이 바닥을 뜨는 방법',
      image_url: 'https://placekitten.com/200/301',
      tags: ['맑음', '먹거리', '야간'],
      date: '2025년 12월 30',
      location: '자갈치 시장'
    },
    {
      id: '2',
      visit_id: 'v2',
      title: '고미 귀여워',
      description: '고양이가 최고야',
      image_url: 'https://placekitten.com/200/302',
      tags: ['구름', '힐링'],
      date: '2025년 12월 29일',
      location: '흰여울 문화마을'
    },
    {
      id: '3',
      visit_id: 'v3',
      title: '바다 뷰 레전드',
      description: '뷰가 미쳤어요',
      image_url: 'https://placekitten.com/200/303',
      tags: ['바다', '풍경'],
      date: '2025년 12월 28일',
      location: '태종대'
    }
  ]

  // 현재 위치 기준 중심 좌표
  const center = position
    ? { lat: position.coords.latitude, lng: position.coords.longitude }
    : { lat: 37.5665, lng: 126.978 } // 서울 기본

  // 마커 생성
  const markers: MapMarker[] = [
    // 현재 위치 마커
    ...(position
      ? [
        {
          id: 'current-location',
          position: { lat: position.coords.latitude, lng: position.coords.longitude },
          type: 'current' as const,
          title: '현재 위치',
        },
      ]
      : []),
    // Spot 마커들
    ...spots.map((spot) => ({
      id: spot.id,
      position: { lat: spot.lat, lng: spot.lng },
      type: 'spot' as const,
      title: spot.name,
      onClick: () => {
        setSelectedMemory(null)
        setSelectedSpot(spot)
      }
    })),
  ]

  // 거리 계산된 spots (정렬)
  const spotsWithDistance = spots
    .map((spot) => ({
      ...spot,
      distance: position
        ? calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          spot.lat,
          spot.lng
        )
        : undefined,
    }))
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))

  const handleMarkerClick = (markerId: string) => {
    if (markerId === 'current-location') return
    const spot = spots.find(s => s.id === markerId)
    if (spot) {
      setSelectedMemory(null)
      setSelectedSpot(spot)
    }
  }

  const handleSpotCardClick = (spotId: string) => {
    const spot = spots.find(s => s.id === spotId)
    if (spot) {
      setSelectedMemory(null)
      setSelectedSpot(spot)
    }
  }

  const handleMemoryClick = (id: string) => {
    const memory = memories.find(m => m.id === id)
    if (memory) setSelectedMemory(memory)
  }

  const handleCameraClick = () => {
    console.log('Camera clicked')
  }

  const handleBack = () => {
    if (selectedMemory) {
      setSelectedMemory(null)
    } else {
      setSelectedSpot(null)
    }
  }

  const MemoryTags = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 12px;
  `

  const Tag = styled.span`
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[700]};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  `

  const MemoryMetaInfo = styled.div`
    display: flex;
    gap: 8px;
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: 12px;
    margin-top: 12px;
  `

  return (
    <MapPageContainer>
      <LeafletMap
        center={selectedSpot ? { lat: selectedSpot.lat, lng: selectedSpot.lng } : center}
        zoom={selectedSpot ? 16 : 15}
        markers={markers}
        onMarkerClick={handleMarkerClick}
      />

      <CameraButton onClick={handleCameraClick}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </CameraButton>

      <BottomSheet
        minHeight={190}
        maxHeight={window.innerHeight * 0.85}
        initialHeight={selectedMemory ? window.innerHeight * 0.85 : selectedSpot ? window.innerHeight * 0.6 : 190}
      >
        <SheetContent>
          <SheetHeader>
            {selectedMemory ? (
              <HeaderLeft>
                <BackButton onClick={handleBack}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </BackButton>
                <Title>메모리 오브</Title>
              </HeaderLeft>
            ) : selectedSpot ? (
              <HeaderLeft>
                <BackButton onClick={handleBack}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </BackButton>
                <Title>{selectedSpot.name}</Title>
              </HeaderLeft>
            ) : (
              <>
                <Title>지도</Title>
                <ViewModeButton>
                  전체보기
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </ViewModeButton>
              </>
            )}
          </SheetHeader>

          {selectedMemory ? (
            <ScrollContent>
              <ChatCard>
                <Character>🐑</Character>
                <ChatBubble>
                  <h5>무엇을 도와 드릴까요?</h5>
                  <p>{selectedMemory.description}</p>
                  <OptionButtons>
                    <OptionButton>옵션(O)</OptionButton>
                    <OptionButton>찾기(S)</OptionButton>
                  </OptionButtons>
                </ChatBubble>
              </ChatCard>

              <div style={{ padding: '20px 0' }}>
                <SectionTitle style={{ marginBottom: 4 }}>{selectedMemory.title}</SectionTitle>
                <MemoryTags>
                  {selectedMemory.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </MemoryTags>
                <MemoryMetaInfo>
                  <span>📍 {selectedMemory.location}</span>
                  <span>·</span>
                  <span>{selectedMemory.date}</span>
                </MemoryMetaInfo>
              </div>
            </ScrollContent>
          ) : selectedSpot ? (
            <ScrollContent>
              <SpotMeta>
                <DetailImage src={selectedSpot.image_url || '/images/placeholder-spot.png'} alt={selectedSpot.name} />
                <MetaRow>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {selectedSpot.address || "부산 영도구 영선동 4가 605-3"}
                </MetaRow>
                <MetaRow>
                  <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"></circle></svg>
                  225개 <span style={{ margin: '0 4px' }}>·</span> 1.2km
                </MetaRow>
              </SpotMeta>

              <SectionTitle>나의 메모리 오브</SectionTitle>
              <MemoryOrbList>
                {memories.map((memory) => (
                  <MemoryOrbItem key={memory.id} onClick={() => handleMemoryClick(memory.id)} style={{ cursor: 'pointer' }}>
                    <MemoryImage src={memory.image_url} />
                    <MemoryOverlay>
                      {memory.title}
                    </MemoryOverlay>
                  </MemoryOrbItem>
                ))}
              </MemoryOrbList>

              <SectionTitle>이게 부산이지 ㅋㅋ</SectionTitle>
              <ChatSection>
                <ChatCard>
                  <Character>🐑</Character>
                  <ChatBubble>
                    <h5>무엇을 도와 드릴까요?</h5>
                    <p>이 바닥을 뜨는 방법</p>
                    <OptionButtons>
                      <OptionButton>옵션(O)</OptionButton>
                      <OptionButton>찾기(S)</OptionButton>
                    </OptionButtons>
                  </ChatBubble>
                </ChatCard>
              </ChatSection>

              <ActionButton onClick={() => navigate('/capture')}>
                📸 방문 인증하기
              </ActionButton>
            </ScrollContent>
          ) : (
            loading || geoLoading ? (
              <LoadingMessage>로딩 중...</LoadingMessage>
            ) : spotsWithDistance.length === 0 ? (
              <LoadingMessage>주변에 명소가 없습니다.</LoadingMessage>
            ) : (
              <SpotList>
                {spotsWithDistance.map((spot) => (
                  <SpotCard
                    key={spot.id}
                    spot={spot}
                    distance={spot.distance}
                    onClick={() => handleSpotCardClick(spot.id)}
                  />
                ))}
              </SpotList>
            )
          )}
        </SheetContent>
      </BottomSheet>

      <Navbar />
    </MapPageContainer>
  )
}