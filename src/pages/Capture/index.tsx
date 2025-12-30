import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { theme } from '@/shared/styles/theme';
import { H2, P2 } from '@/shared/components/Typography';
import { safeAreaPatterns } from '@/shared/styles/safeArea';
import Navbar from '@/shared/components/Navbar';
import { ActionSheet } from '@/shared/components/ActionSheet';
import { authPhotosApi } from '@/features/media/api';
import { useNativeBridge } from '@/shared/hooks/useNativeBridge';
import { base64ToDataUrl, base64ToFile } from '@/shared/utils/nativeBridge';

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
  const { openCamera, openGallery, isNativeApp } = useNativeBridge();

  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState(showError);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showSourceSheet, setShowSourceSheet] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCameraCapture = async () => {
    try {
      if (isNativeApp) {
        // NativeBridge 방식
        const result = await openCamera();
        if (result?.success && result.data) {
          const dataUrl = base64ToDataUrl(result.data.base64, result.data.mimeType);
          setPhoto(dataUrl);
          const file = base64ToFile(result.data.base64, result.data.mimeType, `photo_${Date.now()}.jpg`);
          setPhotoFile(file);
        } else if (result?.error) {
          console.error('Camera error:', result.error);
          toast.error('카메라를 열 수 없습니다');
        }
      } else {
        // 브라우저 폴백 - input file 사용
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const dataUrl = await fileToDataUrl(file);
            setPhoto(dataUrl);
            setPhotoFile(file);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast.error('카메라를 열 수 없습니다');
    }
  };

  const handleGallerySelect = async () => {
    try {
      if (isNativeApp) {
        // NativeBridge 방식
        const result = await openGallery();
        if (result?.success && result.data) {
          const dataUrl = base64ToDataUrl(result.data.base64, result.data.mimeType);
          setPhoto(dataUrl);
          const file = base64ToFile(result.data.base64, result.data.mimeType, `photo_${Date.now()}.jpg`);
          setPhotoFile(file);
        } else if (result?.error) {
          console.error('Gallery error:', result.error);
          toast.error('갤러리를 열 수 없습니다');
        }
      } else {
        // 브라우저 폴백 - input file 사용
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const dataUrl = await fileToDataUrl(file);
            setPhoto(dataUrl);
            setPhotoFile(file);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error('Gallery error:', error);
      toast.error('갤러리를 열 수 없습니다');
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoClick = () => {
    if (photo) {
      setShowActionSheet(true);
    } else {
      setShowSourceSheet(true);
    }
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
    setPhotoFile(null);
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

      {/* 사진이 있을 때: 수정/삭제 ActionSheet */}
      <ActionSheet
        isOpen={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        options={[
          {
            title: '사진 수정하기',
            onSelect: () => setShowSourceSheet(true),
          },
          {
            title: '사진 삭제하기',
            destructive: true,
            onSelect: handleDeletePhoto,
          },
        ]}
      />

      {/* 사진 소스 선택: 카메라/갤러리 ActionSheet */}
      <ActionSheet
        isOpen={showSourceSheet}
        onClose={() => setShowSourceSheet(false)}
        options={[
          {
            title: '카메라로 촬영',
            onSelect: handleCameraCapture,
          },
          {
            title: '갤러리에서 선택',
            onSelect: handleGallerySelect,
          },
        ]}
      />

      <Navbar />
    </Container>
  );
}
