export interface MapMarker {
  id: string
  position: {
    lat: number
    lng: number
  }
  type: 'current' | 'spot'
  title?: string
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
}