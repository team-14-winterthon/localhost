import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { theme } from '@/shared/styles/theme';
import { P1 } from '@/shared/components/Typography';
import { safeAreaPatterns } from '@/shared/styles/safeArea';
import { authApi } from '@/features/auth/api';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  margin-top: 210px;
`;

const LogoContainer = styled.div`
  width: 173px;
  height: 64px;
  position: relative;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Tagline = styled(P1)`
  color: ${theme.colors.base.black};
  text-align: center;
  white-space: nowrap;
`;

const BottomSection = styled.div`
  width: 100%;
  padding: 0 20px 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
`;

const GoogleButton = styled.button`
  width: 100%;
  max-width: 334px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 12px;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[500]};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 48px;

  &:active {
    background-color: ${theme.colors.gray[200]};
    transform: scale(0.98);
  }

  @media (hover: hover) {
    &:hover {
      background-color: ${theme.colors.gray[200]};
    }
  }
`;

const GoogleIcon = styled.img`
  width: 23px;
  height: 24px;
  flex-shrink: 0;
`;

const ButtonText = styled(P1)`
  color: ${theme.colors.gray[900]};
  text-align: center;
  white-space: nowrap;
`;

const HomeIndicator = styled.div`
  width: 135px;
  height: 5px;
  background-color: ${theme.colors.gray[800]};
  border-radius: 2.5px;
`;

export default function SplashPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      // Get Google OAuth URL from backend
      const { url } = await authApi.getGoogleAuthUrl();

      // Redirect to Google OAuth
      window.location.href = url;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('로그인에 실패했습니다');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <StatusBar />

      <MainContent>
        <LogoContainer>
          <LogoImage src="/images/logo.png" alt="LocalHost Logo" />
        </LogoContainer>
        <Tagline>순간을 모아, 마법을 만든다.</Tagline>
      </MainContent>

      <BottomSection>
        <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}>
          <GoogleIcon src="/images/google-icon.png" alt="Google" />
          <ButtonText>{isLoading ? '로그인 중...' : '구글으로 로그인하기'}</ButtonText>
        </GoogleButton>
        <HomeIndicator />
      </BottomSection>
    </Container>
  );
}
