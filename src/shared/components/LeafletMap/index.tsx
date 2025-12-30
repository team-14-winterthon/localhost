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

// Spot 마커 아이콘 (커스텀 SVG - Figma 디자인)
const spotIcon = L.divIcon({
  className: 'spot-marker',
  html: `<div style="
    width: 37px;
    height: 49px;
    position: relative;
  ">
    <svg width="37" height="49" viewBox="0 0 37 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 0C8.28 0 0 8.28 0 18.5C0 32.375 18.5 49 18.5 49C18.5 49 37 32.375 37 18.5C37 8.28 28.72 0 18.5 0Z" fill="#FF5B29"/>
      <path d="M18.5 10L20.5 16L26.5 18L20.5 20L18.5 26L16.5 20L10.5 18L16.5 16L18.5 10Z" fill="white"/>
    </svg>
  </div>`,
  iconSize: [37, 49],
  iconAnchor: [18.5, 49],
  popupAnchor: [0, -49],
})

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
  .spot-marker {
    background: transparent;
    border: none;
  }
`

// 지도 중심 업데이트 컴포넌트
function MapCenterUpdater({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()

  useEffect(() => {
    map.setView([center.lat, center.lng])
  }, [map, center.lat, center.lng])

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
  const icon = marker.type === 'current' ? currentLocationIcon : spotIcon

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
      {marker.title && <Popup>{marker.title}</Popup>}
    </Marker>
  )
}

export default function LeafletMap({
  markers = [],
  center = { lat: 37.5665, lng: 126.978 }, // 서울 기본 위치
  zoom = 15,
  onMapClick,
  onMarkerClick,
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

        <MapCenterUpdater center={center} />
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