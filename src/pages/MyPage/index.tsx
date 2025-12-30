import styled from "@emotion/styled";
import { theme } from "@/shared/styles/theme";
import { H3, P2 } from "@/shared/components/Typography";
import Navbar from "@/shared/components/Navbar";
import MemoryCalendar from "@/shared/components/MemoryCalendar";
import { useState } from "react";

const PageContainer = styled.div`
  background-color: white;
  min-height: 100vh;
  position: relative;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 0 20px;
  width: 100%;
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const UserProfileInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const ProfileImage = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${theme.colors.gray[400]};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 87px;
`;

const UserName = styled(H3)`
  color: ${theme.colors.base.black};
`;

const MemoryCount = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const MemoryIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const MemoryCountText = styled(P2)`
  color: ${theme.colors.gray[600]};
  letter-spacing: 0.28px;
`;

const SettingsButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  img {
    width: 100%;
    height: 100%;
  }

  &:active {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;

export default function MyPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 예시 메모리 데이터 (실제로는 API에서 가져와야 함)
  const memories = [
    {
      date: 14,
      imageUrl:
        "https://i.namu.wiki/i/WUqTz6CNMmzWjId-_CjPfZkpmr20NG8vswcEG7_TspuOWIGQpEsWVOKs4V11LQBANRxQIffwibuA3BCHF2tn_Qq2zM2M1fRPhRBqMnzCQRyHBbdyZ2ypSbD1MAT701GIvAcUI9QTzfTlFjVpbtjcbw.webp",
    },
    {
      date: 16,
      imageUrl:
        "https://i.namu.wiki/i/uZHMjj8vEa6RaIMndBMCXPLN9_FJq65EUqwPwo0AB6HGvf0Z_hz2rlradyjSbyaOrQrEapPIgAZ9mBVF1do-qPqIq_fVlVH4uFR3wfg6TY_8Gu9T1mkny0fzMQJRdhBe5gl_PiPku-ppk-YJ__xYcw.webp",
    },
    {
      date: 19,
      imageUrl:
        "https://i.namu.wiki/i/WUqTz6CNMmzWjId-_CjPfZkpmr20NG8vswcEG7_TspuOWIGQpEsWVOKs4V11LQBANRxQIffwibuA3BCHF2tn_Qq2zM2M1fRPhRBqMnzCQRyHBbdyZ2ypSbD1MAT701GIvAcUI9QTzfTlFjVpbtjcbw.webp",
    },
    {
      date: 24,
      imageUrl:
        "https://i.namu.wiki/i/uZHMjj8vEa6RaIMndBMCXPLN9_FJq65EUqwPwo0AB6HGvf0Z_hz2rlradyjSbyaOrQrEapPIgAZ9mBVF1do-qPqIq_fVlVH4uFR3wfg6TY_8Gu9T1mkny0fzMQJRdhBe5gl_PiPku-ppk-YJ__xYcw.webp",
    },
    {
      date: 27,
      imageUrl:
        "https://i.namu.wiki/i/WUqTz6CNMmzWjId-_CjPfZkpmr20NG8vswcEG7_TspuOWIGQpEsWVOKs4V11LQBANRxQIffwibuA3BCHF2tn_Qq2zM2M1fRPhRBqMnzCQRyHBbdyZ2ypSbD1MAT701GIvAcUI9QTzfTlFjVpbtjcbw.webp",
    },
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <PageContainer>
      <Header>
        <Logo src="/images/logo.png" alt="localhost logo" />
      </Header>

      <Main>
        <UserProfile>
          <UserProfileInfo>
            <ProfileImage>
              <img src="/images/profile-default.svg" alt="profile image" />
            </ProfileImage>
            <UserInfo>
              <UserName>농약두봉지 님</UserName>
              <MemoryCount>
                <MemoryIcon
                  src="/images/symbolLogoBlack.svg"
                  alt="symbolLogo"
                />
                <MemoryCountText>225개</MemoryCountText>
              </MemoryCount>
            </UserInfo>
          </UserProfileInfo>
          <SettingsButton>
            <img src="/images/setting.svg" alt="설정" />
          </SettingsButton>
        </UserProfile>

        <MemoryCalendar
          year={year}
          month={month}
          memories={memories}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </Main>

      <Navbar />
    </PageContainer>
  );
}
