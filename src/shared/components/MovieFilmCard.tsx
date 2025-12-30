import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { P4 } from "@/shared/components/Typography";
import FilmStrip from "./FilmStrip";

interface MovieFilmCardProps {
  imageSrc: string;
  author: string;
  title: string;
  onClick?: () => void;
}

const Card = styled.div`
  background-color: ${theme.colors.gray[800]};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 170px;
  height: 320px;
  flex-shrink: 0;
  overflow: hidden;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const ImageGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 260px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;

const Image = styled.img`
  width: 195px;
  height: 260px;
  object-fit: cover;
  position: absolute;
  left: 50%;
  transform: translateX(calc(-50% - 22.5px));
`;

const Info = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 141px;
  color: white;
`;

const Author = styled(P4)`
  color: white;
  letter-spacing: 0.2px;
`;

const Title = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: white;
`;

export default function MovieFilmCard({
  imageSrc,
  author,
  title,
  onClick,
}: MovieFilmCardProps) {
  return (
    <Card onClick={onClick}>
      <FilmStrip />
      <ImageContainer>
        <ImageGradient />
        <Image src={imageSrc} alt={title} />
        <Info>
          <Author>{author}</Author>
          <Title>{title}</Title>
        </Info>
      </ImageContainer>
      <FilmStrip />
    </Card>
  );
}
