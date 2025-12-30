import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '@/shared/styles/theme';
import { H2, P2, H4 } from '@/shared/components/Typography';
import { safeAreaPatterns } from '@/shared/styles/safeArea';
import Navbar from '@/shared/components/Navbar';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  ${safeAreaPatterns.fullScreen}
`;

const StatusBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background-color: transparent;
  z-index: 100;
`;

const Logo = styled.div`
  width: 76px;
  height: 28px;
  margin-top: 20px;
  margin-left: 20px;
  align-self: flex-start;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 80px 20px 0;
  width: 100%;
`;

const SuccessTitle = styled(H2)`
  color: ${theme.colors.base.black};
  text-align: center;
  margin-top: 20px;
  font-size: 28px;
  font-weight: 700;
`;

const SymbolLogo = styled.div`
  width: 154px;
  height: 154px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Tag = styled.div`
  background-color: ${theme.colors.gray[200]};
  padding: 12px 20px;
  border-radius: 12px;
`;

const TagText = styled(H4)`
  color: ${theme.colors.base.black};
  text-align: center;
  font-weight: 700;
  font-size: 16px;
`;

const LocationContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const LocationItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const LocationIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const LocationText = styled(P2)`
  color: ${theme.colors.gray[600]};
  text-align: center;
`;

const Separator = styled(P2)`
  color: ${theme.colors.gray[600]};
`;

const BottomSection = styled.div`
  position: fixed;
  bottom: 93px;
  left: 0;
  right: 0;
  padding: 0 20px;
`;

const BackButton = styled.button`
  width: 100%;
  max-width: 335px;
  padding: 12px;
  background-color: ${theme.colors.primary[500]};
  color: ${theme.colors.gray[100]};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: ${theme.typography.p1.fontFamily};
  font-size: ${theme.typography.p1.fontSize};
  font-weight: ${theme.typography.p1.fontWeight};
  display: block;
  margin: 0 auto;

  &:active {
    background-color: ${theme.colors.primary[700]};
  }

  @media (hover: hover) {
    &:hover {
      background-color: ${theme.colors.primary[700]};
    }
  }
`;



interface LocationState {
  tags?: string[];
  location?: string;
  date?: string;
}

export default function CaptureSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  const {
    tags = ['맑음', '먹거리', '야간'],
    location: spotLocation = '자갈치 시장',
    date = '2025년 12월 30일'
  } = state;

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Container>
      <StatusBar />
      <Logo>
        <img src="/images/logo.png" alt="LocalHost" />
      </Logo>

      <ContentContainer>
        <SuccessTitle>메모리 오브를 받았습니다!</SuccessTitle>

        <SymbolLogo>
          <img src="/images/symbol-logo.svg" alt="메모리 오브" />
        </SymbolLogo>

        <InfoContainer>
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>
                <TagText>{tag}</TagText>
              </Tag>
            ))}
          </TagsContainer>

          <LocationContainer>
            <LocationItem>
              <LocationIcon src="/images/location-icon.svg" alt="위치" />
              <LocationText>{spotLocation}</LocationText>
            </LocationItem>
            <Separator>·</Separator>
            <LocationText>{date}</LocationText>
          </LocationContainer>
        </InfoContainer>
      </ContentContainer>

      <BottomSection>
        <BackButton onClick={handleBack}>
          돌아가기
        </BackButton>
      </BottomSection>

      <Navbar />
    </Container>
  );
}
