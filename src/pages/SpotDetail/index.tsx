import { useParams, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useMemory } from '@/shared/hooks'
import { H2, H4, P2 } from '@/shared/components/Typography'

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

  // React Query로 메모리 상세 조회
  const { data: memory, isLoading } = useMemory(id || '')

  if (isLoading) {
    return <LoadingContainer>로딩 중...</LoadingContainer>
  }

  if (!memory) {
    return <LoadingContainer>명소를 찾을 수 없습니다.</LoadingContainer>
  }

  return (
    <Container>
      <Header>
        <HeaderImage
          src={memory.url || '/images/placeholder-spot.png'}
          alt={memory.title}
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder-spot.png'
          }}
        />
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
      </Header>

      <Content>
        <TitleSection>
          <Title>{memory.title}</Title>
        </TitleSection>

        <Section>
          <SectionTitle>설명</SectionTitle>
          <Description>{memory.description || '설명이 없습니다.'}</Description>
        </Section>

        <ActionButton onClick={() => navigate('/capture')}>
          📸 방문 인증하기
        </ActionButton>
      </Content>
    </Container>
  )
}
