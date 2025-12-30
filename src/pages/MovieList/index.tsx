import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H2, H4, P3, P4 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  padding: 0 20px;
  width: 100%;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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

const SortDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray[200]};
  }
`;

const SortText = styled(P3)`
  color: ${theme.colors.gray[700]};
  text-align: center;
`;

const SortIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
`;

const MovieCard = styled.div`
  background-color: ${theme.colors.gray[800]};
  overflow: hidden;
  padding: 10px;
  height: 320px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilmStrip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FilmHole = styled.div`
  background-color: white;
  width: 18px;
  height: 12px;
  flex-shrink: 0;
`;

const MovieImage = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4)
    );
    z-index: 1;
  }
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  color: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MovieSubtitle = styled(P4)`
  color: white;
`;

const MovieTitle = styled(H4)`
  color: white;
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

interface MovieListPageProps {
  type?: "my" | "popular";
}

export default function MovieListPage({ type = "my" }: MovieListPageProps) {
  const navigate = useNavigate();
  const [sortOrder] = useState("기본순");

  // React Query로 영화 목록 조회
  const { data: movies = [], isLoading } = useMyMovies();

  const pageTitle = type === "my" ? "내가 만든 영화" : "인기 영화관";

  return (
    <PageContainer>
      <Header>
        <Logo src="/images/logo.png" alt="localhost logo" />
      </Header>

      <Content>
        <TitleBar>
          <TitleSection>
            <BackButton onClick={() => navigate(-1)}>
              <img src="/images/expand_left.svg" alt="뒤로가기" />
            </BackButton>
            <PageTitle>{pageTitle}</PageTitle>
          </TitleSection>
          <SortDropdown>
            <SortText>{sortOrder}</SortText>
            <SortIcon src="/images/expand_down.svg" alt="정렬" />
          </SortDropdown>
        </TitleBar>

        {isLoading ? (
          <P3 style={{ textAlign: "center", padding: "40px 0" }}>로딩 중...</P3>
        ) : movies.length === 0 ? (
          <P3 style={{ textAlign: "center", padding: "40px 0" }}>
            아직 만든 영화가 없습니다
          </P3>
        ) : (
          <MovieGrid>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ cursor: "pointer" }}
              >
                <FilmStrip>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FilmHole key={`top-hole-${i}`} />
                  ))}
                </FilmStrip>
                <MovieImage>
                  <img
                    src={movie.thumbnailUrl || "/images/placeholder-movie.jpg"}
                    alt={movie.title}
                  />
                  <MovieInfo>
                    <MovieSubtitle>{movie.dong} · {movie.mood}</MovieSubtitle>
                    <MovieTitle>{movie.title}</MovieTitle>
                  </MovieInfo>
                </MovieImage>
                <FilmStrip>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FilmHole key={`bottom-hole-${i}`} />
                  ))}
                </FilmStrip>
              </MovieCard>
            ))}
          </MovieGrid>
        )}
      </Content>

      <FloatingButton onClick={() => navigate("/movie/create")}>
        <img src="/images/makeFilmBtn.svg" alt="영화 만들기" />
      </FloatingButton>

      <Navbar />
    </PageContainer>
  );
}
