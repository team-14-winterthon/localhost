import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '@/shared/styles/theme';
import { P1 } from '@/shared/components/Typography';

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.gray[100]};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 40px 24px;
  z-index: 100;
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 32px;
    height: 32px;
    filter: ${props => props.active
      ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(98%) contrast(97%)'
      : 'none'};
  }

  &:active {
    opacity: 0.7;
  }
`;

const NavText = styled(P1) <{ active?: boolean }>`
  color: ${props => props.active ? theme.colors.primary[500] : theme.colors.gray[800]};
  text-align: center;
`;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/map', icon: '/images/pin-alt.svg', label: '지도' },
    { path: '/video', icon: '/images/video-icon.svg', label: '영화' },
    { path: '/home', icon: '/images/home-icon.svg', label: '홈' },
    { path: '/mypage', icon: '/images/user-alt.svg', label: '마이' },
  ];

  const isActive = (itemPath: string) => {
    if (itemPath === '/video') {
      return location.pathname.startsWith('/video') || location.pathname.startsWith('/movie');
    }
    return location.pathname === itemPath;
  };

  return (
    <Container>
      {navItems.map(item => (
        <NavItem
          key={item.path}
          active={isActive(item.path)}
          onClick={() => navigate(item.path)}
        >
          <img src={item.icon} alt={item.label} />
          <NavText active={isActive(item.path)}>{item.label}</NavText>
        </NavItem>
      ))}
    </Container>
  );
}
