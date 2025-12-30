import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H2, P3 } from "@/shared/components/Typography";

interface Memory {
  date: number;
  imageUrl: string;
}

interface MemoryCalendarProps {
  year: number;
  month: number;
  memories?: Memory[];
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

const CalendarContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 163px;
`;

const NavButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.7;
  }
`;

const MonthText = styled(H2)`
  color: ${theme.colors.base.black};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 12px;
  width: 100%;
`;

const DayLabel = styled(P3)`
  color: ${theme.colors.gray[500]};
  text-align: center;
  letter-spacing: 0.24px;
`;

const DateCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 38px;
  height: 48px;
  position: relative;
`;

const DateText = styled(P3)`
  color: ${theme.colors.base.black};
  letter-spacing: 0.24px;
  position: relative;
  z-index: 1;
`;

const MemoryImage = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 38px;
  height: 48px;
  overflow: hidden;

  img {
    width: 100%;
    height: 51px;
    object-fit: cover;
    object-position: center bottom;
  }
`;

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function MemoryCalendar({
  year,
  month,
  memories = [],
  onPrevMonth,
  onNextMonth,
}: MemoryCalendarProps) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const getMemoryForDate = (date: number): string | undefined => {
    return memories.find((m) => m.date === date)?.imageUrl;
  };

  const renderDates = () => {
    const dates = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      dates.push(<DateCell key={`empty-${i}`} />);
    }

    // Add date cells
    for (let date = 1; date <= daysInMonth; date++) {
      const memoryImage = getMemoryForDate(date);
      dates.push(
        <DateCell key={date}>
          {memoryImage && (
            <MemoryImage>
              <img src={memoryImage} alt={`Memory ${date}`} />
            </MemoryImage>
          )}
          <DateText>{date}</DateText>
        </DateCell>
      );
    }

    return dates;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthNavigation>
          <NavButton onClick={onPrevMonth}>
            <img src="/images/expand_left.svg" alt="이전 달" />
          </NavButton>
          <MonthText>
            {year}.{String(month).padStart(2, "0")}
          </MonthText>
          <NavButton onClick={onNextMonth}>
            <img
              src="/images/expand_left.svg"
              alt="다음 달"
              style={{ transform: "rotate(180deg)" }}
            />
          </NavButton>
        </MonthNavigation>
      </CalendarHeader>

      <CalendarGrid>
        {DAYS.map((day) => (
          <DayLabel key={day}>{day}</DayLabel>
        ))}
        {renderDates()}
      </CalendarGrid>
    </CalendarContainer>
  );
}
