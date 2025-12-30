import styled from '@emotion/styled';
import { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { theme } from '@/shared/styles/theme';
import { H2, P2 } from '@/shared/components/Typography';
import { safeAreaPatterns } from '@/shared/styles/safeArea';
import Navbar from '@/shared/components/Navbar';
import { authPhotosApi } from '@/features/media/api';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const LogoHeader = styled.header`
  padding: 46px 20px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  height: 28px;
  width: 76px;
  display: block;
`;

const TitleHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  width: 100%;
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
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled(H2)`
  color: ${theme.colors.base.black};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px 20px 120px;
  flex: 1;
  width: 100%;
`;

const PhotoUploadArea = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  &:active {
    opacity: 0.8;
  }
`;

const CameraIcon = styled.img`
  width: 24px;
  height: 24px;
`;



const PhotoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 335px;
`;

const Label = styled(P2)`
  color: ${theme.colors.gray[600]};
  width: 100%;
  text-align: left;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 12px;
  font-family: ${theme.typography.p2.fontFamily};
  font-size: ${theme.typography.p2.fontSize};
  color: ${theme.colors.base.black};
  background-color: ${theme.colors.gray[100]};
  resize: none;
  min-height: 52px;

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    background-color: ${theme.colors.gray[100]};
  }
`;

const ErrorMessage = styled(P2)`
  color: ${theme.colors.primary[500]};
  text-align: center;
  width: 100%;
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

interface CapturePageProps {
  showError?: boolean;
}

export default function CapturePage({ showError = false }: CapturePageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const spotId = searchParams.get('spotId') || '';

  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState(showError);

  const handleBack = () => {
    navigate(-1);
  };

  const openCamera = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });

      if (image.webPath) {
        setPhoto(image.webPath);

        // Convert webPath to File for upload
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setPhotoFile(file);
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const handlePhotoClick = async () => {
    if (photo) {
      const result = await ActionSheet.showActions({
        options: [
          {
            title: '사진 수정하기',
          },
          {
            title: '사진 삭제하기',
            style: ActionSheetButtonStyle.Destructive,
          },
          {
            title: '취소',
            style: ActionSheetButtonStyle.Cancel,
          },
        ],
      });

      if (result.index === 0) {
        openCamera();
      } else if (result.index === 1) {
        setPhoto(null);
        setPhotoFile(null);
      }
    } else {
      openCamera();
    }
  };

  const handleSubmit = async () => {
    if (!photo || !photoFile) {
      toast.error('사진을 선택해주세요');
      return;
    }

    if (!spotId) {
      toast.error('장소 정보가 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      setUploadError(false);

      // POST /auth-photos/upload
      const result = await authPhotosApi.upload(photoFile, spotId, memo || undefined);

      // On success, navigate to success page
      navigate('/capture/success', {
        state: {
          photoId: result.id,
          photoUrl: result.url,
          description: result.description,
          isVerified: result.isVerified,
        }
      });
    } catch (error) {
      console.error('Photo upload error:', error);
      setUploadError(true);
      toast.error('업로드에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <StatusBar />
      <LogoHeader>
        <Logo src="/images/logo.png" alt="LocalHost" />
      </LogoHeader>

      <TitleHeader>
        <BackButton onClick={handleBack}>
          <img src="/images/arrow-left.svg" alt="뒤로가기" />
        </BackButton>
        <Title>사진 인증</Title>
      </TitleHeader>

      <FormContainer>
        <PhotoUploadArea onClick={handlePhotoClick}>
          {photo ? (
            <PhotoPreview src={photo} alt="업로드한 사진" />
          ) : (
            <CameraIcon src="/images/camera-icon.svg" alt="카메라" />
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

        <SubmitButton onClick={handleSubmit} disabled={!photo || isLoading}>
          {isLoading ? '업로드 중...' : '다음으로'}
        </SubmitButton>
      </FormContainer>



      <Navbar />
    </Container>
  );
}
