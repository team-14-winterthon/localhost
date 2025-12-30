import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useSpot } from '@/features/spots/queries'
import { useLocationStore } from '@/shared/stores'
import { H2, H4, P2, P3 } from '@/shared/components/Typography'
import { calculateDistance } from '@/shared/utils/distance'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
`

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const BackButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
`

const TitleSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Title = styled(H2)`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Distance = styled(P3)`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const VisitCount = styled(P3)`
  margin: 0;
`

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SectionTitle = styled(H4)`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`

const Description = styled(P2)`
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
`

const MemoryOrbsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const MemoryOrb = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
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

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export default function SpotDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // 전역 상태 사용
  const { position, fetchPosition } = useLocationStore()
  const { data: spot, isLoading } = useSpot(id || '')

  // 위치 정보 가져오기
  useEffect(() => {
    fetchPosition()
  }, [fetchPosition])

  // 임시 방문 횟수 (추후 API 연동)
  const visitCount = 42

  if (isLoading) {
    return <LoadingContainer>로딩 중...</LoadingContainer>
  }

  if (!spot) {
    return <LoadingContainer>명소를 찾을 수 없습니다.</LoadingContainer>
  }

  const distance = position
    ? calculateDistance(
        position.coords.latitude,
        position.coords.longitude,
        spot.lat,
        spot.lng
      )
    : undefined

  return (
    <Container>
      <Header>
        <HeaderImage
          src={spot.image_url || '/images/placeholder-spot.png'}
          alt={spot.name}
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder-spot.png'
          }}
        />
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
      </Header>

      <Content>
        <TitleSection>
          <Title>{spot.name}</Title>
          <MetaInfo>
            {distance !== undefined && (
              <Distance>
                {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`}
              </Distance>
            )}
            <VisitCount>방문 {visitCount}회</VisitCount>
          </MetaInfo>
        </TitleSection>

        <Section>
          <SectionTitle>설명</SectionTitle>
          <Description>{spot.description || '설명이 없습니다.'}</Description>
        </Section>

        <Section>
          <SectionTitle>기억 구슬</SectionTitle>
          <MemoryOrbsContainer>
            {[...Array(Math.min(visitCount, 10))].map((_, index) => (
              <MemoryOrb key={index}>
                {index + 1}
              </MemoryOrb>
            ))}
          </MemoryOrbsContainer>
        </Section>

        <ActionButton onClick={() => navigate('/capture')}>
          📸 방문 인증하기
        </ActionButton>
      </Content>
    </Container>
  )
}
