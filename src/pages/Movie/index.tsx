import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H3, P1 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import FilmStrip from "@/shared/components/FilmStrip";
import MovieFilmCard from "@/shared/components/MovieFilmCard";
import { useNavigate } from "react-router-dom";
import { useMyMovies } from "@/shared/hooks";

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const SectionTitle = styled(H3)`
  color: ${theme.colors.base.black};
`;

const MoreLink = styled.a`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: ${theme.colors.gray[600]};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const MovieListContainer = styled.div`
  display: flex;
  gap: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-left: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyMovieCard = styled.div`
  background-color: ${theme.colors.gray[800]};
  overflow: hidden;
  padding: 10px;
  min-width: 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MovieImage = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.02),
      rgba(0, 0, 0, 0.08)
    );
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
`;

const EmptyMessage = styled(P1)`
  color: ${theme.colors.gray[600]};
  text-align: center;
`;

const FloatingButton = styled.button`
  position: fixed;
  right: 22px;
  bottom: 120px;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
  }

  &:active {
    opacity: 0.8;
  }
`;

export default function MoviePage() {
  const navigate = useNavigate();
  // React Query로 영화 목록 조회
  const { data: myMovies = [], isLoading } = useMyMovies();

  return (
    <PageContainer>
      <Header>
        <Logo src="/images/logo.png" alt="localhost logo" />
      </Header>

      <Content>
        {/* 내가 만든 영화 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>내가 만든 영화</SectionTitle>
            {myMovies.length > 0 && (
              <MoreLink onClick={() => navigate("/video/my")}>더보기</MoreLink>
            )}
          </SectionHeader>

          {isLoading ? (
            <EmptyState>
              <EmptyMessage>로딩 중...</EmptyMessage>
            </EmptyState>
          ) : myMovies.length === 0 ? (
            <EmptyState>
              <EmptyMessage>아직 만든 영화가 없어요!</EmptyMessage>
            </EmptyState>
          ) : (
            <MovieListContainer>
              {myMovies.map((movie) => (
                <MyMovieCard
                  key={movie.id}
                  onClick={() => navigate(`/video/view/${movie.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <FilmStrip />
                  <MovieImage>
                    <img
                      src={movie.thumbnailUrl || "/images/placeholder-movie.jpg"}
                      alt={movie.title}
                    />
                  </MovieImage>
                  <FilmStrip />
                </MyMovieCard>
              ))}
            </MovieListContainer>
          )}
        </Section>

        {/* 인기 영화관 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>인기 영화관</SectionTitle>
            <MoreLink onClick={() => navigate("/video/popular")}>
              더보기
            </MoreLink>
          </SectionHeader>
          <MovieListContainer>
            {myMovies.slice(0, 3).map((movie) => (
              <MovieFilmCard
                key={`popular-${movie.id}`}
                imageSrc={movie.thumbnailUrl || "/images/placeholder-movie.jpg"}
                author={movie.dong}
                title={movie.title}
                onClick={() => navigate(`/video/view/${movie.id}`)}
              />
            ))}
          </MovieListContainer>
        </Section>
      </Content>

      {/* 플로팅 버튼 */}
      <FloatingButton onClick={() => navigate("/movie/create")}>
        <img src="/images/makeFilmBtn.svg" alt="영화 만들기" />
      </FloatingButton>

      <Navbar />
    </PageContainer>
  );
}
