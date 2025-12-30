import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from "@/shared/components/Navbar";
import LeafletMap from "@/shared/components/LeafletMap";
import BottomSheet from "@/shared/components/BottomSheet";
import SpotCard from "@/features/spots/components/SpotCard";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import { usePlaces, useMyMemories } from "@/shared/hooks";
import { useMapStore } from "@/shared/stores";
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

const MemoryMetaInfo = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 12px;
  margin-top: 12px;
`;

export default function MapPage() {
  const navigate = useNavigate();
  const { position, loading: geoLoading } = useGeolocation();

  // React Query로 데이터 fetch
  const { data: places = [], isLoading: placesLoading } = usePlaces();
  const { data: memories = [], isLoading: memoriesLoading } = useMyMemories();

  // Zustand로 UI 상태 관리
  const {
    selectedPlace,
    selectedMemory,
    viewMode,
    selectPlace,
    selectMemory,
    setViewMode,
  } = useMapStore();

  const loading = placesLoading || memoriesLoading;

  // 현재 위치 기준 중심 좌표
  const center = position
    ? { lat: position.coords.latitude, lng: position.coords.longitude }
    : { lat: 35.0967, lng: 129.0303 }; // 부산 자갈치시장 기본

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
    // Place 마커들
    ...places.map((place) => ({
      id: place.id,
      position: { lat: place.latitude, lng: place.longitude },
      type: "spot" as const,
      title: place.name,
      showLabel: selectedPlace?.id === place.id,
      onClick: () => {
        selectPlace(place);
      },
    })),
  ];

  // 거리 계산된 places (정렬)
  const placesWithDistance = places
    .map((place) => ({
      ...place,
      lat: place.latitude,
      lng: place.longitude,
      distance: position
        ? calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            place.latitude,
            place.longitude
          )
        : undefined,
    }))
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));

  const handleMarkerClick = (markerId: string) => {
    if (markerId === "current-location") return;
    const place = places.find((p) => p.id === markerId);
    if (place) {
      selectPlace(place);
    }
  };

  const handlePlaceCardClick = (placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    if (place) {
      selectPlace(place);
    }
  };

  const handleMemoryClick = (id: string) => {
    const memory = memories.find((m) => m.id === id);
    if (memory) selectMemory(memory);
  };

  const handleCameraClick = () => {
    if (selectedPlace) {
      navigate(`/capture?spotId=${selectedPlace.id}`);
    } else {
      navigate("/capture");
    }
  };

  const handleBack = () => {
    if (selectedMemory) {
      selectMemory(null);
    } else {
      selectPlace(null);
    }
  };

  return (
    <MapPageContainer>
      <LeafletMap
        center={
          selectedPlace
            ? { lat: selectedPlace.latitude, lng: selectedPlace.longitude }
            : center
        }
        zoom={selectedPlace ? 16 : 15}
        markers={markers}
        onMarkerClick={handleMarkerClick}
        centerOffset={selectedPlace ? 200 : 0}
      />

      <CameraButton onClick={handleCameraClick}>
        <img src="/images/cameraIcon.svg" alt="카메라" />
      </CameraButton>

      <BottomSheet
        minHeight={190}
        maxHeight={window.innerHeight * 0.8}
        initialHeight={
          selectedMemory
            ? window.innerHeight * 0.8
            : selectedPlace
            ? window.innerHeight * 0.8
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
            ) : selectedPlace ? (
              <HeaderLeft>
                <BackButton onClick={handleBack}>
                  <img src="/images/expand_left.svg" alt="뒤로가기" />
                </BackButton>
                <Title>{selectedPlace.name}</Title>
              </HeaderLeft>
            ) : (
              <>
                <Title>지도</Title>
                <ViewModeSelect
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as typeof viewMode)}
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
                  메모리 상세
                </SectionTitle>
                <DetailImageWrapper>
                  <DetailImage
                    src={selectedMemory.url || "/images/placeholder-spot.png"}
                    alt="메모리"
                  />
                </DetailImageWrapper>
                <MemoryMetaInfo>
                  <span>{selectedMemory.description}</span>
                </MemoryMetaInfo>
              </div>
            </ScrollContent>
          ) : selectedPlace ? (
            <ScrollContent>
              <SpotMeta>
                <SpotSubtitle>관광명소</SpotSubtitle>
                <DetailImageWrapper>
                  <DetailImage
                    src={selectedPlace.imageUrl || "/images/placeholder-spot.png"}
                    alt={selectedPlace.name}
                  />
                </DetailImageWrapper>
                <MetaRow>
                  <img src="/images/location-icon.svg" alt="위치" />
                  {selectedPlace.name}
                </MetaRow>
                <StatsRow>
                  <StatItem>
                    <img src="/images/symbolLogoBlack.svg" alt="" />
                    {memories.length}개
                  </StatItem>
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
                    <MemoryImage src={memory.url} />
                    <MemoryGradient />
                    <MemoryOverlay>{memory.description}</MemoryOverlay>
                  </MemoryOrbItem>
                ))}
              </MemoryOrbList>
            </ScrollContent>
          ) : loading || geoLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : placesWithDistance.length === 0 ? (
            <LoadingMessage>주변에 명소가 없습니다.</LoadingMessage>
          ) : (
            <SpotList>
              {placesWithDistance.map((place) => (
                <SpotCard
                  key={place.id}
                  spot={place}
                  distance={place.distance}
                  onClick={() => handlePlaceCardClick(place.id)}
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
