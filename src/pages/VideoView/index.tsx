import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H4, P2 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useVideo } from "@/features/videos/hooks";

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

  img {
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
  padding: 56px 20px 20px;
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
  const { videoId } = useParams<{ videoId: string }>();
  const { data: video, isLoading, error } = useVideo(videoId || "");
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (isLoading) {
    return (
      <PageContainer>
        <ContentOverlay style={{ justifyContent: "center", alignItems: "center" }}>
          <P2 style={{ color: "white" }}>로딩 중...</P2>
        </ContentOverlay>
        <Navbar />
      </PageContainer>
    );
  }

  if (error || !video) {
    return (
      <PageContainer>
        <ContentOverlay style={{ justifyContent: "center", alignItems: "center" }}>
          <P2 style={{ color: "white" }}>영상을 불러올 수 없습니다.</P2>
        </ContentOverlay>
        <Navbar />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <VideoBackground>
        <img src={video.thumbnail || "/images/video-background.jpg"} alt={video.title} />
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
              <ActionCount>{formatCount(video.like_count)}</ActionCount>
            </ActionButton>
            <ActionButton>
              <ActionIcon src="/images/comment.svg" alt="댓글" />
              <ActionCount>{formatCount(video.view_count)}</ActionCount>
            </ActionButton>
            <ActionButton>
              <ActionIcon src="/images/download.svg" alt="다운로드" />
            </ActionButton>
          </RightActions>

          <VideoInfo>
            <CreatorName>{video.title}</CreatorName>
            <VideoTitle>{video.description || "여행의 추억을 담은 영상"}</VideoTitle>
          </VideoInfo>
        </MainContent>
      </ContentOverlay>

      <Navbar />
    </PageContainer>
  );
}
