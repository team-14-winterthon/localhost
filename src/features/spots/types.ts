export interface Spot {
  id: string
  name: string
  lat: number
  lng: number
  image_url?: string
  description?: string
  created_at: string
}

export interface Visit {
  id: string
  user_id: string
  spot_id: string
  photo_url?: string
  created_at: string
}
