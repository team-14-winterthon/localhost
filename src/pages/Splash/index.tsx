import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import toast from 'react-hot-toast';
import { theme } from '@/shared/styles/theme';
import { P1 } from '@/shared/components/Typography';
import { safeAreaPatterns } from '@/shared/styles/safeArea';
import { authApi } from '@/features/auth/api';
import { useAuthStore } from '@/shared/stores';

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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, isLoading: authLoading, setAuth } = useAuthStore();

  // OAuth 콜백 처리 - 목 로그인 사용 중이므로 비활성화
  // useEffect(() => {
  //   const handleOAuthCallback = async () => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const code = urlParams.get('code');
  //     const error = urlParams.get('error');

  //     if (error) {
  //       toast.error('로그인에 실패했습니다');
  //       window.history.replaceState({}, '', window.location.pathname);
  //       return;
  //     }

  //     if (code) {
  //       try {
  //         setIsLoading(true);
  //         const { access_token } = await authApi.login(code);
  //         setAuth(access_token);
  //         window.history.replaceState({}, '', window.location.pathname);
  //         toast.success('로그인 되었습니다');
  //         navigate('/home', { replace: true });
  //       } catch (err) {
  //         console.error('OAuth callback error:', err);
  //         toast.error('로그인 처리 중 오류가 발생했습니다');
  //         window.history.replaceState({}, '', window.location.pathname);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   handleOAuthCallback();
  // }, [navigate, setAuth]);

  // 이미 로그인되어 있으면 홈으로 리다이렉트
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      // 목 로그인: 바로 토큰 설정하고 홈으로 이동
      setAuth('mock-access-token');
      toast.success('로그인 되었습니다');
      navigate('/home', { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('로그인에 실패했습니다');
      setIsLoading(false);
    }
  };

  // 로딩 중이면 빈 화면 표시
  if (authLoading) {
    return <Container><StatusBar /></Container>;
  }

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
