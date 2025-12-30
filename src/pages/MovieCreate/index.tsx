import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H2, P1, P2 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DateRangePicker from "@/shared/components/DateRangePicker";
import ClapperBoard from "@/shared/components/ClapperBoard";
import { useCreateVideo } from "@/features/videos/hooks";
import { useCurrentUser } from "@/features/users/hooks";
import toast from "react-hot-toast";
import type { VideoGenre } from "@/features/videos/types";

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

// 분위기 -> VideoGenre 매핑
const moodToGenre: Record<string, VideoGenre> = {
  코미디: "highlight",
  브이로그: "travel_vlog",
  다큐멘터리: "documentary",
};

export default function MovieCreatePage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const createVideo = useCreateVideo();

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

  const formatDateISO = (date: Date | null) => {
    if (!date) return undefined;
    return date.toISOString();
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

    if (Array.isArray(value) && value[0] && value[1]) {
      setTimeout(() => setIsCalendarOpen(false), 300);
    }
  };

  const places = ["부산", "제주", "서울"];
  const moods = ["코미디", "브이로그", "다큐멘터리"];

  const isFormValid = selectedPlace && selectedMood && dateRange;

  const handleSubmit = async () => {
    if (!isFormValid || !selectedMood) return;

    const [dateFrom, dateTo] = Array.isArray(dateRange)
      ? dateRange
      : [dateRange, dateRange];

    try {
      const result = await createVideo.mutateAsync({
        title: `${selectedPlace} 여행 영상`,
        selection_criteria: {
          date_from: formatDateISO(dateFrom),
          date_to: formatDateISO(dateTo),
          auto_select: true,
          max_photos: 15,
        },
        style_preferences: {
          genre: moodToGenre[selectedMood] || "travel_vlog",
          music_style: "upbeat",
          editing_style: "smooth",
          duration: "short",
          include_voice_memos: true,
          language: "ko",
        },
      });

      navigate("/movie/result", {
        state: {
          generationId: result.video_generation_id,
          place: selectedPlace,
          mood: selectedMood,
          director: user?.nickname || "익명",
        },
      });
    } catch (error) {
      console.error("영상 생성 실패:", error);
      toast.error("영상 생성에 실패했습니다.");
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
          director={user?.nickname || "농약두봉지"}
          mood={selectedMood}
          date={new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replace(/\. /g, ".").replace(".", "")}
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
        <SubmitButton
          disabled={!isFormValid || createVideo.isPending}
          onClick={handleSubmit}
        >
          <SubmitButtonText>
            {createVideo.isPending ? "생성 중..." : "다음으로"}
          </SubmitButtonText>
        </SubmitButton>
      </FixedButtonContainer>

      <Navbar />

      <DateRangePicker
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        value={dateRange}
        onChange={handleDateChange}
      />
    </PageContainer>
  );
}
