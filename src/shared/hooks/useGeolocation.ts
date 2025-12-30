import { useState, useEffect } from 'react';

interface GeolocationState {
  position: GeolocationPosition | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: false,
  });

  const getCurrentPosition = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });
      setState({ position: pos, error: null, loading: false });
    } catch (err) {
      const geoError = err as GeolocationPositionError;
      setState({
        position: null,
        error: geoError.message || 'Failed to get location',
        loading: false,
      });
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {
    position: state.position,
    error: state.error,
    loading: state.loading,
    refetch: getCurrentPosition,
  };
}
