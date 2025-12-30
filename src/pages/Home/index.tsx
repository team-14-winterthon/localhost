import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H3, P2 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import HighlightFilmCard from "@/shared/components/HighlightFilmCard";
import MovieFilmCard from "@/shared/components/MovieFilmCard";
import { useNavigate } from "react-router-dom";
import { useMyMovies } from "@/shared/hooks";

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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 20px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SectionTitle = styled(H3)`
  color: ${theme.colors.base.black};
`;

const SectionLink = styled.button`
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

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const MemoryCard = styled.button`
  border: 1px solid ${theme.colors.gray[500]};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const MemoryContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const MarkerIcon = styled.div`
  position: relative;
  width: 37px;
  height: 48px;
  flex-shrink: 0;
`;

const MemoryText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 176px;
  text-align: left;
`;

const MemoryTitle = styled(H3)`
  color: ${theme.colors.base.black};
`;

const MemoryDescription = styled(P2)`
  color: ${theme.colors.base.black};
  letter-spacing: 0.28px;
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const PopularSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const MovieScroll = styled.div`
  display: flex;
  gap: 0;
  overflow-x: auto;
  overflow-y: hidden;
  width: calc(100vw - 40px);
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function HomePage() {
  const navigate = useNavigate();
  const { data: movies = [] } = useMyMovies();

  return (
    <PageContainer>
      <Header>
        <Logo src="/images/logo.png" alt="localhost logo" />
      </Header>

      <Main>
        {movies.length > 0 && (
          <Section>
            <SectionTitle>이달의 하이라이트</SectionTitle>
            <HighlightFilmCard
              imageSrc={movies[0].thumbnailUrl || "/images/highlight.jpg"}
            />
          </Section>
        )}

        <MemoryCard onClick={() => navigate("/capture")}>
          <MemoryContent>
            <MarkerIcon>
              <img src="/images/markerSymbol.svg" alt="마커" />
            </MarkerIcon>
            <MemoryText>
              <MemoryTitle>메모리 오브</MemoryTitle>
              <MemoryDescription>순간의 추억을 저장해요!</MemoryDescription>
            </MemoryText>
          </MemoryContent>
          <ArrowIcon src="/images/arrow_right.svg" alt="화살표" />
        </MemoryCard>

        <PopularSection>
          <SectionHeader>
            <SectionTitle>인기 영화관</SectionTitle>
            <SectionLink onClick={() => navigate("/video/popular")}>
              바로가기
            </SectionLink>
          </SectionHeader>
          <MovieScroll>
            {movies.slice(0, 3).map((movie) => (
              <MovieFilmCard
                key={movie.id}
                imageSrc={movie.thumbnailUrl || "/images/placeholder-movie.jpg"}
                author={movie.dong}
                title={movie.title}
                onClick={() => navigate(`/video/view/${movie.id}`)}
              />
            ))}
          </MovieScroll>
        </PopularSection>
      </Main>

      <Navbar />
    </PageContainer>
  );
}
