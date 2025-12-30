import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H2, P1, P2 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import DateRangePicker from "@/shared/components/DateRangePicker";
import ClapperBoard from "@/shared/components/ClapperBoard";
import { moviesApi } from "@/features/videoGen/api";

type Value = Date | null | [Date | null, Date | null];

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

export default function MovieCreatePage() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<Value>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const isFormValid = selectedPlace && selectedMood && dateRange;

  const handleSubmit = async () => {
    if (!isFormValid || isLoading) return;

    try {
      setIsLoading(true);

      // 날짜 범위 추출
      let startDate: string;
      let endDate: string;

      if (Array.isArray(dateRange)) {
        startDate = dateRange[0]?.toISOString() || new Date().toISOString();
        endDate = dateRange[1]?.toISOString() || new Date().toISOString();
      } else {
        startDate = dateRange?.toISOString() || new Date().toISOString();
        endDate = startDate;
      }

      // POST /movies/create
      const result = await moviesApi.create({
        dong: selectedPlace,
        mood: selectedMood,
        startDate,
        endDate,
      });

      toast.success("영화 생성이 시작되었습니다!");
      navigate("/movie/result", {
        state: {
          movieId: result.id,
          status: result.status,
        },
      });
    } catch (error) {
      console.error("영화 생성 실패:", error);
      toast.error("영화 생성에 실패했습니다");
    } finally {
      setIsLoading(false);
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

        <ClapperBoard
          scene="001"
          place={selectedPlace}
          roll={null}
          director="농약두봉지"
          mood={selectedMood}
          date="2025.12.30"
        />

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
        <SubmitButton disabled={!isFormValid || isLoading} onClick={handleSubmit}>
          <SubmitButtonText>{isLoading ? "생성 중..." : "다음으로"}</SubmitButtonText>
        </SubmitButton>
      </FixedButtonContainer>

      <Navbar />

      {/* 캘린더 바텀시트 */}
      <DateRangePicker
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        value={dateRange}
        onChange={handleDateChange}
      />
    </PageContainer>
  );
}
