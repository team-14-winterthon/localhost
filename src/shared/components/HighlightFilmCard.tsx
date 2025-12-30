import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import FilmStrip from "./FilmStrip";

interface HighlightFilmCardProps {
  imageSrc: string;
  alt?: string;
}

const Card = styled.div`
  background-color: ${theme.colors.gray[800]};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 164px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  margin-top: -20px;
`;

const ImageGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 210px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.02) 0%,
    rgba(0, 0, 0, 0.08) 100%
  );
`;

export default function HighlightFilmCard({
  imageSrc,
  alt = "하이라이트",
}: HighlightFilmCardProps) {
  return (
    <Card>
      <FilmStrip count={6} />
      <ImageContainer>
        <Image src={imageSrc} alt={alt} />
        <ImageGradient />
      </ImageContainer>
      <FilmStrip count={6} />
    </Card>
  );
}
