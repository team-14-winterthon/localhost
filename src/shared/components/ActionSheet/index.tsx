import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { theme } from '@/shared/styles/theme';

interface ActionSheetOption {
  title: string;
  destructive?: boolean;
  onSelect: () => void;
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  options: ActionSheetOption[];
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Sheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.gray[100]};
  border-radius: 12px 12px 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 1001;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const Option = styled.button<{ destructive?: boolean }>`
  width: 100%;
  padding: 16px;
  border: none;
  background: transparent;
  font-family: ${theme.typography.p1.fontFamily};
  font-size: ${theme.typography.p1.fontSize};
  color: ${({ destructive }) => (destructive ? theme.colors.primary[500] : theme.colors.base.black)};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  cursor: pointer;
  transition: background-color 0.15s;

  &:active {
    background: ${theme.colors.gray[200]};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const CancelButton = styled(Option)`
  font-weight: 600;
  border-bottom: none;
  margin-top: 8px;
  background: ${theme.colors.gray[200]};
  border-radius: 0 0 12px 12px;
`;

export function ActionSheet({ isOpen, onClose, options }: ActionSheetProps) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay onClick={onClose} />
      <Sheet>
        {options.map((option, index) => (
          <Option
            key={index}
            destructive={option.destructive}
            onClick={() => {
              option.onSelect();
              onClose();
            }}
          >
            {option.title}
          </Option>
        ))}
        <CancelButton onClick={onClose}>취소</CancelButton>
      </Sheet>
    </>,
    document.body
  );
}
