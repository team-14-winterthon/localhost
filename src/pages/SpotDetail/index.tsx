import { useParams, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useSpot } from '@/features/spots/hooks'
import { H2, H4, P2, P3 } from '@/shared/components/Typography'
import { useGeolocation } from '@/shared/hooks/useGeolocation'
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

const Category = styled(P3)`
  margin: 0;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 4px;
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

const TagsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const Tag = styled.span`
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
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
  const { position } = useGeolocation()

  const { data: spot, isLoading, error } = useSpot(id || '')

  if (isLoading) {
    return <LoadingContainer>로딩 중...</LoadingContainer>
  }

  if (error || !spot) {
    return <LoadingContainer>명소를 찾을 수 없습니다.</LoadingContainer>
  }

  const distance = position
    ? calculateDistance(
        position.coords.latitude,
        position.coords.longitude,
        spot.location.lat,
        spot.location.lng
      )
    : undefined

  const mainImage = spot.images?.[0] || '/images/placeholder-spot.png'

  return (
    <Container>
      <Header>
        <HeaderImage
          src={mainImage}
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
            <Category>{spot.category}</Category>
          </MetaInfo>
        </TitleSection>

        <Section>
          <SectionTitle>설명</SectionTitle>
          <Description>
            {spot.detailed_description || spot.description || '설명이 없습니다.'}
          </Description>
        </Section>

        {spot.tags && spot.tags.length > 0 && (
          <Section>
            <SectionTitle>태그</SectionTitle>
            <TagsContainer>
              {spot.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          </Section>
        )}

        {spot.operating_hours && (
          <Section>
            <SectionTitle>운영 시간</SectionTitle>
            <Description>
              평일: {spot.operating_hours.weekdays}<br />
              주말: {spot.operating_hours.weekends}
            </Description>
          </Section>
        )}

        <ActionButton onClick={() => navigate('/capture')}>
          📸 방문 인증하기
        </ActionButton>
      </Content>
    </Container>
  )
}
