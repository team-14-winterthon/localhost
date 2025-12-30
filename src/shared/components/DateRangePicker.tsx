import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Value = Date | null | [Date | null, Date | null];

interface DateRangePickerProps {
  isOpen: boolean;
  onClose: () => void;
  value: Value;
  onChange: (value: Value) => void;
}

const BottomSheetOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 999;
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
    background: transparent !important;

    &:hover {
      background: transparent !important;
    }

    &:active {
      background: transparent !important;
    }
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

export default function DateRangePicker({
  isOpen,
  onClose,
  value,
  onChange,
}: DateRangePickerProps) {
  return (
    <>
      <BottomSheetOverlay isOpen={isOpen} onClick={onClose} />
      <BottomSheet isOpen={isOpen}>
        <DragHandle>
          <DragBar />
        </DragHandle>
        <StyledCalendarWrapper>
          <Calendar
            onChange={onChange}
            value={value}
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
    </>
  );
}
