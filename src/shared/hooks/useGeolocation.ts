import { useState, useEffect } from 'react'
import { Geolocation } from '@capacitor/geolocation'
import type { Position } from '@capacitor/geolocation'

export function useGeolocation() {
  const [position, setPosition] = useState<Position | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getCurrentPosition = async () => {
    setLoading(true)
    setError(null)

    try {
      const position = await Geolocation.getCurrentPosition()
      setPosition(position)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentPosition()
  }, [])

  return { position, error, loading, refetch: getCurrentPosition }
}
