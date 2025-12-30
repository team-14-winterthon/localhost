import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H2, H3, H4, P1, P2, P4 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Value = Date | null | [Date | null, Date | null];

const PageContainer = styled.div`
  background-color: ${theme.colors.gray[100]};
  min-height: 100vh;
  position: relative;
  padding-bottom: 100px;
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
  padding: 0 20px;
  width: 100%;
  align-items: center;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  align-self: flex-start;
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

const ClapperBoard = styled.div`
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
  background: repeating-linear-gradient(
    -45deg,
    #000,
    #000 5px,
    #fff 5px,
    #fff 10px
  );
`;

const ClapperDivider = styled.div`
  height: 2px;
  background-color: #fff;
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

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 334px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const FormLabel = styled(P2)`
  color: ${theme.colors.gray[600]};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const OptionButton = styled.button<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? theme.colors.primary[500] : theme.colors.gray[100]};
  border: 1px solid
    ${(props) =>
      props.selected ? theme.colors.primary[500] : theme.colors.gray[400]};
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const OptionButtonText = styled(P1)<{ selected?: boolean }>`
  color: ${(props) =>
    props.selected ? theme.colors.gray[100] : theme.colors.gray[700]};
  text-align: center;
`;

const DateInput = styled.div`
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;

  &:hover {
    border-color: ${theme.colors.gray[500]};
  }
`;

const DateText = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: ${theme.colors.gray[600]};
`;

const CalendarIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) =>
    props.disabled ? theme.colors.gray[500] : theme.colors.primary[500]};
  border: none;
  border-radius: 6px;
  padding: 12px;
  width: 100%;
  max-width: 335px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.9)};
  }

  &:active {
    opacity: ${(props) => (props.disabled ? 1 : 0.7)};
  }
`;

const SubmitButtonText = styled(P1)`
  color: ${theme.colors.gray[100]};
  text-align: center;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 335px;
`;

const BottomSheet = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 10px 20px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  max-height: 466px;
`;

const BottomSheetOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 999;
`;

const DragHandle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const DragBar = styled.div`
  width: 81px;
  height: 3px;
  background-color: ${theme.colors.gray[400]};
  border-radius: 2.5px;
`;

const SheetTitle = styled(H3)`
  color: ${theme.colors.gray[900]};
  text-align: center;
`;

const StyledCalendarWrapper = styled.div`
  width: 100%;

  .react-calendar {
    width: 100%;
    border: none;
    font-family: "Pretendard", sans-serif;
    background: white;
  }

  .react-calendar__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    height: auto;
  }

  .react-calendar__navigation__label {
    font-family: "Pretendard", sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: ${theme.colors.gray[900]};
    flex-grow: 0 !important;
    pointer-events: none;
  }

  .react-calendar__navigation__arrow {
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0;
    padding: 0;
    min-width: 24px;
    flex-grow: 0 !important;
  }

  .react-calendar__navigation__prev-button {
    order: -1;
  }

  .react-calendar__navigation__next-button {
    order: 1;
  }

  .react-calendar__month-view__weekdays {
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    font-size: 13px;
    color: ${theme.colors.gray[500]};
    margin-bottom: 6px;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 10px 0;
    text-align: center;
    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__days {
    gap: 0;
  }

  .react-calendar__tile {
    width: 38px;
    height: 48px;
    background: transparent;
    border: none;
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    font-size: 13px;
    color: ${theme.colors.base.black};
    cursor: pointer;
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${theme.colors.gray[200]};
      border-radius: 4px;
    }

    &:disabled {
      color: ${theme.colors.gray[400]};
      cursor: not-allowed;
    }
  }

  .react-calendar__tile--now {
    background: transparent;
  }

  /* 시작 날짜 */
  .react-calendar__tile--rangeStart {
    background-color: ${theme.colors.primary[500]} !important;
    color: white !important;
    border-radius: 4px 0 0 4px !important;

    &:hover {
      background-color: ${theme.colors.primary[700]} !important;
    }
  }

  /* 끝 날짜 */
  .react-calendar__tile--rangeEnd {
    background-color: ${theme.colors.primary[500]} !important;
    color: white !important;
    border-radius: 0 4px 4px 0 !important;

    &:hover {
      background-color: ${theme.colors.primary[700]} !important;
    }
  }

  /* 중간 날짜만 (시작/끝 제외) - 투명도 적용 */
  .react-calendar__tile--range:not(.react-calendar__tile--rangeStart):not(.react-calendar__tile--rangeEnd) {
    background-color: rgba(254, 91, 50, 0.15) !important;
    color: ${theme.colors.base.black} !important;
    border-radius: 0 !important;

    &:hover {
      background-color: rgba(254, 91, 50, 0.25) !important;
    }
  }

  /* 시작과 끝이 같은 날짜인 경우 */
  .react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd {
    border-radius: 4px !important;
  }

  /* 선택된 단일 날짜 */
  .react-calendar__tile--active {
    background-color: ${theme.colors.primary[500]} !important;
    color: white !important;
    border-radius: 4px !important;

    &:hover {
      background-color: ${theme.colors.primary[700]} !important;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${theme.colors.gray[400]};
  }
`;

export default function MovieCreatePage() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<Value>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "00.00.00";
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const getDateRangeText = () => {
    if (!dateRange) return { start: "00.00.00", end: "00.00.00" };

    if (Array.isArray(dateRange)) {
      const [start, end] = dateRange;
      return {
        start: formatDate(start),
        end: formatDate(end),
      };
    }

    return {
      start: formatDate(dateRange),
      end: formatDate(dateRange),
    };
  };

  const { start: startDate, end: endDate } = getDateRangeText();

  const handleDateChange = (value: Value) => {
    setDateRange(value);

    // 날짜 범위가 완전히 선택되면 바텀시트 닫기
    if (Array.isArray(value) && value[0] && value[1]) {
      setTimeout(() => setIsCalendarOpen(false), 300);
    }
  };

  const places = ["부산", "제주", "서울"];
  const moods = ["코미디", "브이로그", "다큐멘터리"];

  const isFormValid = selectedPlace && selectedMood;

  const handleSubmit = () => {
    if (isFormValid) {
      // TODO: 다음 페이지로 이동
      console.log("Submit:", { selectedPlace, selectedMood });
    }
  };

  return (
    <PageContainer>
      <Header>
        <Logo src="/images/logo.png" alt="localhost logo" />
      </Header>

      <Content>
        <TitleSection>
          <BackButton onClick={() => navigate(-1)}>
            <img src="/images/expand_left.svg" alt="뒤로가기" />
          </BackButton>
          <PageTitle>영화 만들기</PageTitle>
        </TitleSection>

        <ClapperBoard>
          <ClapperTop>
            <ClapperStripe />
            <ClapperStripe />
            <ClapperStripe />
            <ClapperStripe />
          </ClapperTop>
          <ClapperDivider />
          <ClapperTop>
            <ClapperStripe />
            <ClapperStripe />
            <ClapperStripe />
            <ClapperStripe />
          </ClapperTop>
          <ClapperDivider />
          <ClapperBody>
            <ProdNumber>
              <ProdLabel>PROD. NO.</ProdLabel>
              <ProdValue>1234512</ProdValue>
            </ProdNumber>
            <InfoGrid>
              <InfoCell borderRight>
                <InfoLabel>SCENE</InfoLabel>
                <InfoValue>001</InfoValue>
              </InfoCell>
              <InfoCell borderRight>
                <InfoLabel>PLACE</InfoLabel>
                <InfoValue>{selectedPlace || "미선택"}</InfoValue>
              </InfoCell>
              <InfoCell>
                <InfoLabel>ROLL</InfoLabel>
                <InfoValue>미선택</InfoValue>
              </InfoCell>
            </InfoGrid>
            <BottomInfo>
              <LeftInfo>
                <InfoRow>
                  <InfoRowLabel>DATE</InfoRowLabel>
                  <InfoRowValue>2025.12.30</InfoRowValue>
                </InfoRow>
                <InfoRow borderTop>
                  <InfoRowLabel>DIRECTOR</InfoRowLabel>
                  <InfoRowValue>농약두봉지</InfoRowValue>
                </InfoRow>
              </LeftInfo>
              <RightInfo>
                <InfoLabel>MOOD</InfoLabel>
                <H4 style={{ color: "white" }}>
                  {selectedMood || "미선택"}
                </H4>
              </RightInfo>
            </BottomInfo>
          </ClapperBody>
        </ClapperBoard>

        <FormSection>
          <FormField>
            <FormLabel>지역 선택*</FormLabel>
            <ButtonGroup>
              {places.map((place) => (
                <OptionButton
                  key={place}
                  selected={selectedPlace === place}
                  onClick={() => setSelectedPlace(place)}
                >
                  <OptionButtonText selected={selectedPlace === place}>
                    {place}
                  </OptionButtonText>
                </OptionButton>
              ))}
            </ButtonGroup>
          </FormField>

          <FormField>
            <FormLabel>분위기 선택*</FormLabel>
            <ButtonGroup>
              {moods.map((mood) => (
                <OptionButton
                  key={mood}
                  selected={selectedMood === mood}
                  onClick={() => setSelectedMood(mood)}
                >
                  <OptionButtonText selected={selectedMood === mood}>
                    {mood}
                  </OptionButtonText>
                </OptionButton>
              ))}
            </ButtonGroup>
          </FormField>

          <FormField>
            <FormLabel>날짜 지정*</FormLabel>
            <DateInput onClick={() => setIsCalendarOpen(true)}>
              <DateText>
                <span>{startDate}</span>
                <span>~</span>
                <span>{endDate}</span>
              </DateText>
              <CalendarIcon src="/images/calendar-icon.svg" alt="날짜 선택" />
            </DateInput>
          </FormField>
        </FormSection>
      </Content>

      <FixedButtonContainer>
        <SubmitButton disabled={!isFormValid} onClick={handleSubmit}>
          <SubmitButtonText>다음으로</SubmitButtonText>
        </SubmitButton>
      </FixedButtonContainer>

      <Navbar />

      {/* 캘린더 바텀시트 */}
      <BottomSheetOverlay
        isOpen={isCalendarOpen}
        onClick={() => setIsCalendarOpen(false)}
      />
      <BottomSheet isOpen={isCalendarOpen}>
        <DragHandle>
          <DragBar />
        </DragHandle>
        <SheetTitle>날짜 지정</SheetTitle>
        <StyledCalendarWrapper>
            <Calendar
              onChange={handleDateChange}
              value={dateRange}
              selectRange={true}
              locale="ko-KR"
              formatDay={(_locale, date) => String(date.getDate())}
              formatMonthYear={(_locale, date) =>
                `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
                  2,
                  "0"
                )}`
              }
              prevLabel={<img src="/images/expand_left.svg" alt="이전 달" />}
              nextLabel={
                <img
                  src="/images/expand_left.svg"
                  alt="다음 달"
                  style={{ transform: "rotate(180deg)" }}
                />
              }
              prev2Label={null}
              next2Label={null}
              showNeighboringMonth={true}
            />
          </StyledCalendarWrapper>
      </BottomSheet>
    </PageContainer>
  );
}
