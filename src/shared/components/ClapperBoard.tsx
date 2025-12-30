import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H3, H4, P4 } from "@/shared/components/Typography";

// 단일 사다리꼴 스트라이프 (상단)
function TrapezoidTop() {
  return (
    <svg
      width="40"
      height="23"
      viewBox="0 0 40 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H32.7273L40 23H7.27273L0 0Z" fill="white" />
    </svg>
  );
}

// 단일 사다리꼴 스트라이프 (하단)
function TrapezoidBottom() {
  return (
    <svg
      width="40"
      height="23"
      viewBox="0 0 40 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M40 0H7.27273L0 23H32.7273L40 0Z" fill="white" />
    </svg>
  );
}

interface ClapperBoardProps {
  scene: string;
  place: string | null;
  roll: string | null;
  director: string;
  mood: string | null;
  prodNo?: string;
  date?: string;
}

const ClapperBoardContainer = styled.div`
  width: 263px;
  display: flex;
  flex-direction: column;
`;

const ClapperTop = styled.div`
  background-color: ${theme.colors.gray[800]};
  height: 23px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const ClapperStripe = styled.div`
  width: 40px;
  height: 100%;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const ClapperDivider = styled.div`
  height: 2px;
  background-color: ${theme.colors.gray[900]};
  width: 100%;
`;

const ClapperBody = styled.div`
  background-color: ${theme.colors.gray[800]};
  padding: 12px;
  display: flex;
  flex-direction: column;
  color: white;
`;

const ProdNumber = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 4px;
`;

const ProdLabel = styled(H4)`
  color: white;
`;

const ProdValue = styled(H4)`
  color: white;
`;

const InfoGrid = styled.div`
  display: flex;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
`;

const InfoCell = styled.div<{ borderRight?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 10px;
  flex: 1;
  border-right: ${(props) => (props.borderRight ? "1px solid white" : "none")};
`;

const InfoLabel = styled(P4)`
  color: white;
`;

const InfoValue = styled(H3)`
  color: white;
`;

const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid white;
  width: 133px;
`;

const InfoRow = styled.div<{ borderTop?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 4px 0;
  border-top: ${(props) => (props.borderTop ? "1px solid white" : "none")};
`;

const InfoRowLabel = styled(P4)`
  color: white;
`;

const InfoRowValue = styled(H4)`
  color: white;
`;

const RightInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 10px;
`;

export default function ClapperBoard({
  scene,
  place,
  roll,
  director,
  mood,
  prodNo = "1234512",
  date,
}: ClapperBoardProps) {
  // 날짜가 제공되지 않으면 오늘 날짜 사용
  const displayDate =
    date ||
    new Date()
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");

  return (
    <ClapperBoardContainer>
      <ClapperTop>
        <ClapperStripe>
          <TrapezoidTop />
        </ClapperStripe>
        <ClapperStripe>
          <TrapezoidTop />
        </ClapperStripe>
        <ClapperStripe>
          <TrapezoidTop />
        </ClapperStripe>
        <ClapperStripe>
          <TrapezoidTop />
        </ClapperStripe>
      </ClapperTop>
      <ClapperDivider />
      <ClapperTop>
        <ClapperStripe>
          <TrapezoidBottom />
        </ClapperStripe>
        <ClapperStripe>
          <TrapezoidBottom />
        </ClapperStripe>
        <ClapperStripe>
          <TrapezoidBottom />
        </ClapperStripe>
        <ClapperStripe>
          <TrapezoidBottom />
        </ClapperStripe>
      </ClapperTop>
      <ClapperDivider />
      <ClapperBody>
        <ProdNumber>
          <ProdLabel>PROD. NO.</ProdLabel>
          <ProdValue>{prodNo}</ProdValue>
        </ProdNumber>
        <InfoGrid>
          <InfoCell borderRight>
            <InfoLabel>SCENE</InfoLabel>
            <InfoValue>{scene}</InfoValue>
          </InfoCell>
          <InfoCell borderRight>
            <InfoLabel>PLACE</InfoLabel>
            <InfoValue>{place || "미선택"}</InfoValue>
          </InfoCell>
          <InfoCell>
            <InfoLabel>ROLL</InfoLabel>
            <InfoValue>{roll || "미선택"}</InfoValue>
          </InfoCell>
        </InfoGrid>
        <BottomInfo>
          <LeftInfo>
            <InfoRow>
              <InfoRowLabel>DATE</InfoRowLabel>
              <InfoRowValue>{displayDate}</InfoRowValue>
            </InfoRow>
            <InfoRow borderTop>
              <InfoRowLabel>DIRECTOR</InfoRowLabel>
              <InfoRowValue>{director}</InfoRowValue>
            </InfoRow>
          </LeftInfo>
          <RightInfo>
            <InfoLabel>MOOD</InfoLabel>
            <H4 style={{ color: "white" }}>{mood || "미선택"}</H4>
          </RightInfo>
        </BottomInfo>
      </ClapperBody>
    </ClapperBoardContainer>
  );
}
