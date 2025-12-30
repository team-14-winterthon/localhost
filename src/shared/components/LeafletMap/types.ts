export interface MapMarker {
  id: string
  position: {
    lat: number
    lng: number
  }
  type: 'current' | 'spot'
  title?: string
  showLabel?: boolean
  onClick?: () => void
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

export interface LeafletMapProps {
  markers?: MapMarker[]
  center?: { lat: number; lng: number }
  zoom?: number
  onMapClick?: (lat: number, lng: number) => void
  onMarkerClick?: (markerId: string) => void
  centerOffset?: number // 중심 오프셋 (픽셀 단위, 양수면 아래로, 음수면 위로)
}