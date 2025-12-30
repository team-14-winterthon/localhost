export interface Place {
  id: string
  name: string
  latitude: number
  longitude: number
  image_url?: string
  description?: string
}

export interface Memory {
  id: string
  title: string
  description: string
  url: string
}

// Legacy types for backwards compatibility
export interface Spot {
  id: string
  name: string
  lat: number
  lng: number
  image_url?: string
  description?: string
  address?: string
  created_at: string
}

export interface Visit {
  id: string
  user_id: string
  spot_id: string
  photo_url?: string
  created_at: string
}
