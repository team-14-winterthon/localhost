import styled from "@emotion/styled";

const FilmHoles = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FilmHole = styled.div`
  background-color: white;
  width: 18px;
  height: 12px;
`;

interface FilmStripProps {
  count?: number;
}

export default function FilmStrip({ count = 5 }: FilmStripProps) {
  return (
    <FilmHoles>
      {Array.from({ length: count }).map((_, i) => (
        <FilmHole key={i} />
      ))}
    </FilmHoles>
  );
}
