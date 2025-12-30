import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H2, H3 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import { useNavigate } from "react-router-dom";
import ClapperBoard from "@/shared/components/ClapperBoard";

const PageContainer = styled.div`
  background-color: ${theme.colors.gray[100]};
  min-height: 100vh;
  position: relative;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.header`
  padding: 56px 20px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  height: 28px;
  width: 76px;
  display: block;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 20px;
  width: 100%;
  align-items: center;
  height: 580px;
  justify-content: space-between;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  align-self: flex-start;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }

  &:active {
    opacity: 0.7;
  }
`;

const PageTitle = styled(H2)`
  color: ${theme.colors.gray[900]};
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const CompletionMessage = styled(H3)`
  color: ${theme.colors.base.black};
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const PrimaryButton = styled.button`
  background-color: ${theme.colors.primary[500]};
  border: none;
  border-radius: 6px;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.7;
  }
`;

const ButtonText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: white;
  text-align: center;
`;

const BackLink = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.24px;
  color: ${theme.colors.gray[600]};
  text-decoration: underline;
  text-underline-position: from-font;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export default function MovieResultPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header>
        <Logo src="/images/logo.png" alt="localhost logo" />
      </Header>

      <Content>
        <TitleSection>
          <BackButton onClick={() => navigate(-1)}>
            <img src="/images/expand_left.svg" alt="뒤로가기" />
          </BackButton>
          <PageTitle>영화 만들기</PageTitle>
        </TitleSection>

        <CenterSection>
          <ClapperBoard
            scene="001"
            place="부산"
            roll="20 - 22"
            director="농약두봉지"
            mood="코미디"
            date="2025.12.30"
          />
          <CompletionMessage>영상이 완성되었습니다!</CompletionMessage>
        </CenterSection>

        <ButtonSection>
          <PrimaryButton onClick={() => navigate("/video/view/1")}>
            <ButtonText>보러가기</ButtonText>
          </PrimaryButton>
          <BackLink onClick={() => navigate("/home")}>
            확인하지 않고 돌아가기
          </BackLink>
        </ButtonSection>
      </Content>

      <Navbar />
    </PageContainer>
  );
}
