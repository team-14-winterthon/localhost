import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import toast from 'react-hot-toast';
import { authApi } from '@/features/auth/api';
import { theme } from '@/shared/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  padding: 20px;
`;

const LoadingText = styled.p`
  font-family: ${theme.typography.p1.fontFamily};
  font-size: ${theme.typography.p1.fontSize};
  color: ${theme.colors.gray[600]};
  margin-top: 16px;
`;

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          toast.error('로그인에 실패했습니다');
          navigate('/', { replace: true });
          return;
        }

        if (!code) {
          navigate('/', { replace: true });
          return;
        }

        // Exchange code for access token
        const { access_token } = await authApi.handleGoogleCallback(code);

        // Save token to localStorage
        localStorage.setItem('authToken', access_token);

        // Redirect to home
        toast.success('로그인 되었습니다');
        navigate('/home', { replace: true });
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('로그인 처리 중 오류가 발생했습니다');
        navigate('/', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <Container>
      <LoadingText>로그인 처리 중...</LoadingText>
    </Container>
  );
}
