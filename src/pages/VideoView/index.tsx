import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H4, P2 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { moviesApi, type MovieDetail } from "@/features/videoGen/api";

const PageContainer = styled.div`
  background-color: ${theme.colors.base.black};
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const TopBar = styled.div`
  padding: 46px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
    filter: brightness(0) invert(1);
  }

  &:active {
    opacity: 0.7;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px 40px;
  position: relative;
`;

const RightActions = styled.div`
  position: absolute;
  right: 20px;
  bottom: 140px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:active {
    opacity: 0.7;
  }
`;

const ActionIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const ActionCount = styled(P2)`
  color: white;
  font-weight: 600;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: calc(100% - 80px);
`;

const CreatorName = styled(H4)`
  color: white;
`;

const VideoTitle = styled(P2)`
  color: white;
  line-height: 1.5;
`;

export default function VideoViewPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) {
        console.error("Movie ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await moviesApi.getById(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to load movie:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentOverlay>
          <MainContent>
            <P2 style={{ color: "white", textAlign: "center" }}>로딩 중...</P2>
          </MainContent>
        </ContentOverlay>
        <Navbar />
      </PageContainer>
    );
  }

  if (!movie) {
    return (
      <PageContainer>
        <ContentOverlay>
          <TopBar>
            <BackButton onClick={() => navigate(-1)}>
              <img src="/images/expand_left.svg" alt="뒤로가기" />
            </BackButton>
          </TopBar>
          <MainContent>
            <P2 style={{ color: "white", textAlign: "center" }}>
              영화를 찾을 수 없습니다
            </P2>
          </MainContent>
        </ContentOverlay>
        <Navbar />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <VideoBackground>
        {movie.videoUrl ? (
          <video
            src={movie.videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img src="/images/video-background.jpg" alt={movie.title} />
        )}
      </VideoBackground>
      <GradientOverlay />

      <ContentOverlay>
        <TopBar>
          <BackButton onClick={() => navigate(-1)}>
            <img src="/images/expand_left.svg" alt="뒤로가기" />
          </BackButton>
        </TopBar>

        <MainContent>
          <RightActions>
            <ActionButton onClick={handleLikeToggle}>
              <ActionIcon
                src={isLiked ? "/images/heart_fill.svg" : "/images/heart.svg"}
                alt="좋아요"
              />
              <ActionCount>999</ActionCount>
            </ActionButton>
            <ActionButton>
              <ActionIcon src="/images/comment.svg" alt="댓글" />
              <ActionCount>999</ActionCount>
            </ActionButton>
            <ActionButton>
              <ActionIcon src="/images/download.svg" alt="다운로드" />
            </ActionButton>
          </RightActions>

          <VideoInfo>
            <CreatorName>{movie.userId}</CreatorName>
            <VideoTitle>{movie.title}</VideoTitle>
          </VideoInfo>
        </MainContent>
      </ContentOverlay>

      <Navbar />
    </PageContainer>
  );
}
