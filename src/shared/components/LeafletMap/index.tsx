import { useEffect } from 'react'
import styled from '@emotion/styled'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { LeafletMapProps, MapMarker } from './types'

// 현재 위치 마커 아이콘 (파란색 원 - Figma 디자인)
const currentLocationIcon = L.divIcon({
  className: 'current-location-marker',
  html: `<div style="
    width: 24px;
    height: 24px;
    background-color: #6393F2;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(99, 147, 242, 0.4);
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

// Spot 마커 아이콘 생성 함수
const createSpotIcon = (label?: string) => {
  if (label) {
    return L.divIcon({
      className: 'spot-marker-with-label',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <img src="/images/marker.svg" style="width: 37px; height: 49px; display: block;" />
          <div style="
            font-family: 'Pretendard', sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #07080A;
            text-align: center;
            white-space: nowrap;
            text-shadow: 0 0 4px white, 0 0 4px white, 0 0 4px white;
          ">${label}</div>
        </div>
      `,
      iconSize: [92, 72],
      iconAnchor: [46, 49],
      popupAnchor: [0, -49],
    })
  }

  return L.divIcon({
    className: 'spot-marker',
    html: `<img src="/images/marker.svg" style="width: 37px; height: 49px; display: block;" />`,
    iconSize: [37, 49],
    iconAnchor: [18.5, 49],
    popupAnchor: [0, -49],
  })
}

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .leaflet-container {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .current-location-marker,
  .spot-marker,
  .spot-marker-with-label {
    background: transparent;
    border: none;
  }
`

// 지도 중심 업데이트 컴포넌트
function MapCenterUpdater({
  center,
  zoom,
  offset = 0
}: {
  center: { lat: number; lng: number }
  zoom: number
  offset?: number
}) {
  const map = useMap()

  useEffect(() => {
    if (offset !== 0) {
      // 먼저 center와 zoom을 설정
      map.setView([center.lat, center.lng], zoom, { animate: false })

      // 그 다음 offset을 적용한 위치로 이동
      const targetPoint = map.project([center.lat, center.lng], zoom)
      targetPoint.y += offset
      const targetLatLng = map.unproject(targetPoint, zoom)
      map.panTo(targetLatLng, { animate: true, duration: 0.5 })
    } else {
      map.setView([center.lat, center.lng], zoom, { animate: true })
    }
  }, [map, center.lat, center.lng, zoom, offset])

  return null
}

// 지도 클릭 이벤트 핸들러
function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng)
      }
    },
  })

  return null
}

// 개별 마커 컴포넌트
function MapMarkerComponent({
  marker,
  onMarkerClick,
}: {
  marker: MapMarker
  onMarkerClick?: (markerId: string) => void
}) {
  const icon = marker.type === 'current'
    ? currentLocationIcon
    : createSpotIcon(marker.showLabel ? marker.title : undefined)

  const handleClick = () => {
    if (marker.onClick) {
      marker.onClick()
    }
    if (onMarkerClick) {
      onMarkerClick(marker.id)
    }
  }

  return (
    <Marker
      position={[marker.position.lat, marker.position.lng]}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
    >
      {marker.title && !marker.showLabel && <Popup>{marker.title}</Popup>}
    </Marker>
  )
}

export default function LeafletMap({
  markers = [],
  center = { lat: 35.0967, lng: 129.0303 }, // 부산 자갈치시장 기본 위치
  zoom = 15,
  onMapClick,
  onMarkerClick,
  centerOffset = 0,
}: LeafletMapProps) {
  return (
    <MapWrapper>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapCenterUpdater center={center} zoom={zoom} offset={centerOffset} />
        <MapClickHandler onMapClick={onMapClick} />

        {markers.map((marker) => (
          <MapMarkerComponent
            key={marker.id}
            marker={marker}
            onMarkerClick={onMarkerClick}
          />
        ))}
      </MapContainer>
    </MapWrapper>
  )
}