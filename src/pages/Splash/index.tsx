import styled from '@emotion/styled';
import { useState } from 'react';
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
  gap: 24px;
  width: 100%;
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
  object-fit: contain;
`;

const Tagline = styled(P1)`
  color: ${theme.colors.gray[900]};
  text-align: center;
  white-space: nowrap;
`;

const BottomSection = styled.div`
  width: 100%;
  padding: 0 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: auto;
`;

const GoogleButton = styled.button`
  width: 100%;
  max-width: 335px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 52px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);

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
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const ButtonText = styled(P1)`
  color: ${theme.colors.base.black};
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
`;



export default function SplashPage() {
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
      </BottomSection>
    </Container>
  );
}
