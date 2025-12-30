import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { theme } from "@/shared/styles/theme";
import { H2, P2 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";

const PageContainer = styled.div`
  background-color: white;
  min-height: 100vh;
  position: relative;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.header`
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

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  width: 100%;
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
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }

  &:active {
    opacity: 0.7;
  }
`;

const PageTitle = styled(H2)`
  color: ${theme.colors.base.black};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 424px;
  overflow: hidden;
  position: relative;
`;

const MemoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const MemoryTitle = styled(H2)`
  color: ${theme.colors.base.black};
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Tag = styled.div`
  background-color: #f4f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
`;

const TagText = styled(P2)`
  color: #4a5468;
  letter-spacing: 0.24px;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const MetaItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const LocationIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const MetaText = styled(P2)`
  color: #717d96;
  letter-spacing: 0.28px;
`;

export default function MemoryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // TODO: API에서 메모리 데이터 가져오기
  const memory = {
    id: id,
    title: "이게 부산이지 ㅋㅋ",
    imageUrl: "https://placekitten.com/400/500",
    tags: ["맑음", "먹거리", "야간"],
    location: "자갈치 시장",
    date: "2025년 12월 30일",
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <Header>
        <Logo src="/images/logo.png" alt="localhost logo" />
      </Header>

      <TitleSection>
        <BackButton onClick={handleBack}>
          <img src="/images/expand_left.svg" alt="뒤로가기" />
        </BackButton>
        <PageTitle>메모리 오브</PageTitle>
      </TitleSection>

      <Content>
        <ImageWrapper>
          <MemoryImage src={memory.imageUrl} alt={memory.title} />
        </ImageWrapper>

        <MemoryTitle>{memory.title}</MemoryTitle>

        <TagsContainer>
          {memory.tags.map((tag) => (
            <Tag key={tag}>
              <TagText>{tag}</TagText>
            </Tag>
          ))}
        </TagsContainer>

        <MetaInfo>
          <MetaItem>
            <LocationIcon src="/images/location-icon.svg" alt="위치" />
            <MetaText>{memory.location}</MetaText>
          </MetaItem>
          <MetaText>·</MetaText>
          <MetaText>{memory.date}</MetaText>
        </MetaInfo>
      </Content>

      <Navbar />
    </PageContainer>
  );
}
