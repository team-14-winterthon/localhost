import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { theme } from '@/shared/styles/theme';
import { H2, P2 } from '@/shared/components/Typography';
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

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 54px 20px 0;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled(H2)`
  color: ${theme.colors.base.black};
`;

const Logo = styled.div`
  position: fixed;
  top: 56px;
  left: 20px;
  width: 76px;
  height: 28px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  padding: 122px 20px 0;
  flex: 1;
`;

const PhotoUploadArea = styled.div`
  width: 116px;
  height: 137px;
  background-color: ${theme.colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  img {
    width: 24px;
    height: 24px;
  }

  &:active {
    opacity: 0.8;
  }
`;

const PhotoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 336px;
`;

const Label = styled(P2)`
  color: ${theme.colors.gray[600]};
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  font-family: ${theme.typography.p2.fontFamily};
  font-size: ${theme.typography.p2.fontSize};
  color: ${theme.colors.base.black};
  background-color: ${theme.colors.gray[100]};
  resize: none;
  min-height: 41px;

  &::placeholder {
    color: ${theme.colors.gray[600]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const ErrorMessage = styled(P2)`
  color: ${theme.colors.primary[500]};
  text-align: center;
  width: 100%;
`;

const BottomSection = styled.div`
  position: fixed;
  bottom: 93px;
  left: 0;
  right: 0;
  padding: 0 20px;
`;

const SubmitButton = styled.button`
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

  &:disabled {
    background-color: ${theme.colors.gray[500]};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(:disabled):active {
    background-color: ${theme.colors.primary[700]};
  }

  @media (hover: hover) {
    &:not(:disabled):hover {
      background-color: ${theme.colors.primary[700]};
    }
  }
`;

const HomeIndicator = styled.div`
  width: 135px;
  height: 5px;
  background-color: ${theme.colors.gray[800]};
  border-radius: 2.5px;
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
`;

interface CapturePageProps {
  showError?: boolean;
}

export default function CapturePage({ showError = false }: CapturePageProps) {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState(showError);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePhotoClick = () => {
    // TODO: Implement Capacitor Camera API
    toast('카메라 기능은 준비 중입니다');
  };

  const handleSubmit = async () => {
    if (!photo) {
      toast.error('사진을 선택해주세요');
      return;
    }

    try {
      setIsLoading(true);
      setUploadError(false);

      // TODO: Implement photo upload API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // On success, navigate to success page
      navigate('/capture/success', {
        state: {
          tags: ['맑음', '먹거리', '야간'],
          location: '자갈치 시장',
          date: '2025년 12월 30일'
        }
      });
    } catch (error) {
      console.error('Photo upload error:', error);
      setUploadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <StatusBar />
      <Logo>
        <img src="/images/logo.png" alt="LocalHost" />
      </Logo>

      <Header>
        <BackButton onClick={handleBack}>
          <img src="/images/arrow-left.svg" alt="뒤로가기" />
        </BackButton>
        <Title>사진 인증</Title>
      </Header>

      <FormContainer>
        <PhotoUploadArea onClick={handlePhotoClick}>
          {photo ? (
            <PhotoPreview src={photo} alt="업로드한 사진" />
          ) : (
            <img src="/images/camera-icon.svg" alt="카메라" />
          )}
        </PhotoUploadArea>

        <InputGroup>
          <Label>메모</Label>
          <Textarea
            placeholder="이곳에 대한 메모를 작성해주세요(선택)"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={1}
          />
        </InputGroup>

        {uploadError && (
          <ErrorMessage>업로드에 실패했습니다. 다시 시도해주세요.</ErrorMessage>
        )}
      </FormContainer>

      <BottomSection>
        <SubmitButton onClick={handleSubmit} disabled={!photo || isLoading}>
          {isLoading ? '업로드 중...' : '다음으로'}
        </SubmitButton>
      </BottomSection>

      <Navbar />
      <HomeIndicator />
    </Container>
  );
}
