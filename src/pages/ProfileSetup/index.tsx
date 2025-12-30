import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { theme } from '@/shared/styles/theme';
import { H2, P2, P1 } from '@/shared/components/Typography';
import { safeAreaPatterns } from '@/shared/styles/safeArea';

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
  color: ${theme.colors.gray[900]};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 77px 20px 0;
  flex: 1;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:active {
    opacity: 0.8;
  }
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

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  font-family: ${theme.typography.p2.fontFamily};
  font-size: ${theme.typography.p2.fontSize};
  color: ${theme.colors.base.black};
  background-color: ${theme.colors.gray[100]};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${theme.colors.gray[600]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const BottomSection = styled.div`
  padding: 0 20px 34px;
  width: 100%;
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 335px;
  padding: 12px;
  background-color: ${theme.colors.gray[500]};
  color: ${theme.colors.gray[100]};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin: 0 auto;

  &:disabled {
    background-color: ${theme.colors.gray[500]};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(:disabled) {
    background-color: ${theme.colors.primary[500]};

    &:active {
      background-color: ${theme.colors.primary[700]};
    }

    @media (hover: hover) {
      &:hover {
        background-color: ${theme.colors.primary[700]};
      }
    }
  }
`;

const ButtonText = styled(P1)`
  color: ${theme.colors.gray[100]};
  text-align: center;
`;

const HomeIndicator = styled.div`
  width: 135px;
  height: 5px;
  background-color: ${theme.colors.gray[800]};
  border-radius: 2.5px;
  margin: 21px auto 8px;
`;

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleProfileImageClick = () => {
    // TODO: Implement profile image upload
    toast('프로필 이미지 업로드 기능은 준비 중입니다');
  };

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      toast.error('닉네임을 입력해주세요');
      return;
    }

    if (!password.trim()) {
      toast.error('비밀번호를 입력해주세요');
      return;
    }

    try {
      setIsLoading(true);

      await authApi.setupProfile({
        nickname: nickname.trim(),
        password: password.trim(),
      });

      toast.success('프로필이 설정되었습니다');
      navigate('/home', { replace: true });
    } catch (error) {
      console.error('Profile setup error:', error);
      toast.error('프로필 설정에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = nickname.trim() && password.trim();

  return (
    <Container>
      <StatusBar />

      <Header>
        <BackButton onClick={handleBack}>
          <img src="/images/arrow-left.svg" alt="뒤로가기" />
        </BackButton>
        <Title>회원가입</Title>
      </Header>

      <FormContainer>
        <ProfileImage onClick={handleProfileImageClick}>
          <img src="/images/profile-default.svg" alt="프로필" />
        </ProfileImage>

        <InputGroup>
          <Label>닉네임*</Label>
          <Input
            type="text"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호*</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </FormContainer>

      <BottomSection>
        <SubmitButton onClick={handleSubmit} disabled={!isFormValid || isLoading}>
          <ButtonText>{isLoading ? '설정 중...' : '다음으로'}</ButtonText>
        </SubmitButton>
        <HomeIndicator />
      </BottomSection>
    </Container>
  );
}
