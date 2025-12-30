import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H3, P1 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import FilmStrip from "@/shared/components/FilmStrip";
import MovieFilmCard from "@/shared/components/MovieFilmCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
}

export default function MoviePage() {
  const navigate = useNavigate();
  // 영화 데이터 상태 관리 (빈 배열로 초기화하여 빈 상태 표시)
  const [myMovies] = useState<Movie[]>([]);

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

          {myMovies.length === 0 ? (
            <EmptyState>
              <EmptyMessage>아직 만든 영화가 없어요!</EmptyMessage>
            </EmptyState>
          ) : (
            <MovieListContainer>
              {myMovies.map((movie) => (
                <MyMovieCard key={movie.id}>
                  <FilmStrip />
                  <MovieImage>
                    <img
                      src={movie.thumbnail}
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
            {[
              { subtitle: "농약 두봉지", title: "레전드 부산소마고의 영화" },
              { subtitle: "농약 두봉지", title: "부산의 추억" },
              { subtitle: "농약 두봉지", title: "해운대 이야기" },
            ].map((movie, index) => (
              <MovieFilmCard
                key={`popular-movie-${index}`}
                imageSrc="/images/placeholder-movie.jpg"
                author={movie.subtitle}
                title={movie.title}
                onClick={() => navigate(`/video/view/${index + 1}`)}
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
