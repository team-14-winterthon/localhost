import styled from "@emotion/styled";
import type { Spot, Place } from "../types";
import { H4, P3 } from "@/shared/components/Typography";

// SpotCard can accept either Spot or Place type
type SpotOrPlace =
  | Spot
  | (Place & {
      lat?: number;
      lng?: number;
      image_url?: string;
      description?: string;
    });

interface SpotCardProps {
  spot: SpotOrPlace;
  distance?: number;
  onClick?: () => void;
}

const Card = styled.div`
  width: 335px;
  height: 84px;
  display: flex;
  gap: 12px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Image = styled.img`
  width: 68px;
  height: 68px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
`;

const Title = styled(H4)`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled(P3)`
  margin: 0 0 4px 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const Distance = styled(P3)`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-weight: 400;
`;

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1598981457915-aea220950616?w=200&h=200&fit=crop";

export default function SpotCard({ spot, distance, onClick }: SpotCardProps) {
  return (
    <Card onClick={onClick}>
      <Image
        src={spot.image_url || PLACEHOLDER_IMAGE}
        alt={spot.name}
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER_IMAGE;
        }}
      />
      <Info>
        <Title>{spot.name}</Title>
        <Description>{spot.description || "설명 없음"}</Description>
        <Footer>
          {distance !== undefined && (
            <Distance>
              {distance < 1
                ? `${Math.round(distance * 1000)}m`
                : `${distance.toFixed(1)}km`}
            </Distance>
          )}
        </Footer>
      </Info>
    </Card>
  );
}
