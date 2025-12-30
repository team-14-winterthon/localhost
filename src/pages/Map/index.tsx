import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from "@/shared/components/Navbar";
import LeafletMap from "@/shared/components/LeafletMap";
import BottomSheet from "@/shared/components/BottomSheet";
import SpotCard from "@/features/spots/components/SpotCard";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import { spotsApi } from "@/features/spots/api";
import type { Spot, Memory } from "@/features/spots/types";
import type { MapMarker } from "@/shared/components/LeafletMap/types";
import { calculateDistance } from "@/shared/utils/distance";
import { H3, P3 } from "@/shared/components/Typography";

const MapPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const CameraButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 220px;
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 5;

  &:active {
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const SheetContent = styled.div`
  padding: 0 20px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

const Title = styled(H3)`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ViewModeSelect = styled.select`
  padding: 6px 8px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[700]};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const SpotList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LoadingMessage = styled(P3)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 24px;
`;

// Detail View Styles
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }

  &:active {
    opacity: 0.7;
  }
`;

const ScrollContent = styled.div`
  overflow-y: auto;
  padding-bottom: 24px;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SpotSubtitle = styled(P3)`
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 8px;
`;

const DetailImageWrapper = styled.div`
  width: 100%;
  height: 126px;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
`;

const DetailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const SpotMeta = styled.div`
  margin-bottom: 24px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4a5468;
  font-size: 12px;
  margin-top: 4px;
  letter-spacing: 0.24px;

  img {
    width: 14px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #717d96;
  font-size: 12px;
  margin-top: 4px;
  letter-spacing: 0.24px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  img {
    width: 12px;
    height: 12px;
  }
`;

const SectionTitle = styled.h4`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0 0 16px 0;
  line-height: 1;
`;

const MemoryOrbList = styled.div`
  display: flex;
  gap: 4px;
  overflow-x: auto;
  margin-bottom: 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MemoryOrbItem = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 130px;
  height: 164px;
  overflow: hidden;
`;

const MemoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const MemoryGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
`;

const MemoryOverlay = styled.p`
  position: absolute;
  bottom: 0;
  left: 8px;
  right: 8px;
  color: white;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function MapPage() {
  const navigate = useNavigate();
  const { position, loading: geoLoading } = useGeolocation();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewMode, setViewMode] = useState<string>("전체보기");

  // Mock Memories Data
  const memories: Memory[] = [
    {
      id: "1",
      visit_id: "v1",
      title: "이게 부산이지 ㅋㅋ",
      description: "이 바닥을 뜨는 방법",
      image_url: "https://placekitten.com/200/301",
      tags: ["맑음", "먹거리", "야간"],
      date: "2025년 12월 30",
      location: "자갈치 시장",
    },
    {
      id: "2",
      visit_id: "v2",
      title: "고미 귀여워",
      description: "고양이가 최고야",
      image_url: "https://placekitten.com/200/302",
      tags: ["구름", "힐링"],
      date: "2025년 12월 29일",
      location: "흰여울 문화마을",
    },
    {
      id: "3",
      visit_id: "v3",
      title: "바다 뷰 레전드",
      description: "뷰가 미쳤어요",
      image_url: "https://placekitten.com/200/303",
      tags: ["바다", "풍경"],
      date: "2025년 12월 28일",
      location: "태종대",
    },
  ];

  // 현재 위치 기준 중심 좌표
  const center = position
    ? { lat: position.coords.latitude, lng: position.coords.longitude }
    : { lat: 37.5665, lng: 126.978 }; // 서울 기본

  // Spots 데이터 로드
  useEffect(() => {
    const loadSpots = async () => {
      try {
        setLoading(true);
        const data = await spotsApi.getAll();
        setSpots(data);
      } catch (error) {
        console.error("Spots 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSpots();
  }, []);

  // 마커 생성
  const markers: MapMarker[] = [
    // 현재 위치 마커
    ...(position
      ? [
          {
            id: "current-location",
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            type: "current" as const,
            title: "현재 위치",
          },
        ]
      : []),
    // Spot 마커들
    ...spots.map((spot) => ({
      id: spot.id,
      position: { lat: spot.lat, lng: spot.lng },
      type: "spot" as const,
      title: spot.name,
      showLabel: selectedSpot?.id === spot.id, // 선택된 spot만 라벨 표시
      onClick: () => {
        setSelectedMemory(null);
        setSelectedSpot(spot);
      },
    })),
  ];

  // 거리 계산된 spots (정렬)
  const spotsWithDistance = spots
    .map((spot) => ({
      ...spot,
      distance: position
        ? calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            spot.lat,
            spot.lng
          )
        : undefined,
    }))
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));

  const handleMarkerClick = (markerId: string) => {
    if (markerId === "current-location") return;
    const spot = spots.find((s) => s.id === markerId);
    if (spot) {
      setSelectedMemory(null);
      setSelectedSpot(spot);
    }
  };

  const handleSpotCardClick = (spotId: string) => {
    const spot = spots.find((s) => s.id === spotId);
    if (spot) {
      setSelectedMemory(null);
      setSelectedSpot(spot);
    }
  };

  const handleMemoryClick = (id: string) => {
    const memory = memories.find((m) => m.id === id);
    if (memory) setSelectedMemory(memory);
  };

  const handleCameraClick = () => {
    navigate("/capture");
  };

  const handleBack = () => {
    if (selectedMemory) {
      setSelectedMemory(null);
    } else {
      setSelectedSpot(null);
    }
  };

  const MemoryTags = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 12px;
  `;

  const Tag = styled.span`
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[700]};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  `;

  const MemoryMetaInfo = styled.div`
    display: flex;
    gap: 8px;
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: 12px;
    margin-top: 12px;
  `;

  return (
    <MapPageContainer>
      <LeafletMap
        center={
          selectedSpot
            ? { lat: selectedSpot.lat, lng: selectedSpot.lng }
            : center
        }
        zoom={selectedSpot ? 16 : 15}
        markers={markers}
        onMarkerClick={handleMarkerClick}
        centerOffset={selectedSpot ? 200 : 0}
      />

      <CameraButton onClick={handleCameraClick}>
        <img src="/images/cameraIcon.svg" alt="카메라" />
      </CameraButton>

      <BottomSheet
        minHeight={190}
        maxHeight={window.innerHeight * 0.85}
        initialHeight={
          selectedMemory
            ? window.innerHeight * 0.85
            : selectedSpot
            ? window.innerHeight * 0.6
            : 190
        }
      >
        <SheetContent>
          <SheetHeader>
            {selectedMemory ? (
              <HeaderLeft>
                <BackButton onClick={handleBack}>
                  <img src="/images/expand_left.svg" alt="뒤로가기" />
                </BackButton>
                <Title>메모리 오브</Title>
              </HeaderLeft>
            ) : selectedSpot ? (
              <HeaderLeft>
                <BackButton onClick={handleBack}>
                  <img src="/images/expand_left.svg" alt="뒤로가기" />
                </BackButton>
                <Title>{selectedSpot.name}</Title>
              </HeaderLeft>
            ) : (
              <>
                <Title>지도</Title>
                <ViewModeSelect
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                >
                  <option value="전체보기">전체보기</option>
                  <option value="관광명소">관광명소</option>
                  <option value="특산품">특산품</option>
                </ViewModeSelect>
              </>
            )}
          </SheetHeader>

          {selectedMemory ? (
            <ScrollContent>
              <div style={{ padding: "20px 0" }}>
                <SectionTitle style={{ marginBottom: 4 }}>
                  {selectedMemory.title}
                </SectionTitle>
                <MemoryTags>
                  {selectedMemory.tags?.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </MemoryTags>
                <MemoryMetaInfo>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <img src="/images/location-icon.svg" alt="위치" style={{ width: '14px', height: '16px' }} />
                    {selectedMemory.location}
                  </span>
                  <span>·</span>
                  <span>{selectedMemory.date}</span>
                </MemoryMetaInfo>
              </div>
            </ScrollContent>
          ) : selectedSpot ? (
            <ScrollContent>
              <SpotMeta>
                <SpotSubtitle>부산광역시의 관광명소</SpotSubtitle>
                <DetailImageWrapper>
                  <DetailImage
                    src={
                      selectedSpot.image_url || "/images/placeholder-spot.png"
                    }
                    alt={selectedSpot.name}
                  />
                </DetailImageWrapper>
                <MetaRow>
                  <img src="/images/location-icon.svg" alt="위치" />
                  {selectedSpot.address || "부산 영도구 영선동 4가 605-3"}
                </MetaRow>
                <StatsRow>
                  <StatItem>
                    <img src="/images/symbolLogoBlack.svg" alt="" />
                    225개
                  </StatItem>
                  <span>·</span>
                  <span>1.2km</span>
                </StatsRow>
              </SpotMeta>

              <SectionTitle>나의 메모리 오브</SectionTitle>
              <MemoryOrbList>
                {memories.map((memory) => (
                  <MemoryOrbItem
                    key={memory.id}
                    onClick={() => handleMemoryClick(memory.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <MemoryImage src={memory.image_url} />
                    <MemoryGradient />
                    <MemoryOverlay>{memory.title}</MemoryOverlay>
                  </MemoryOrbItem>
                ))}
              </MemoryOrbList>
            </ScrollContent>
          ) : loading || geoLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : spotsWithDistance.length === 0 ? (
            <LoadingMessage>주변에 명소가 없습니다.</LoadingMessage>
          ) : (
            <SpotList>
              {spotsWithDistance.map((spot) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  distance={spot.distance}
                  onClick={() => handleSpotCardClick(spot.id)}
                />
              ))}
            </SpotList>
          )}
        </SheetContent>
      </BottomSheet>

      <Navbar />
    </MapPageContainer>
  );
}
