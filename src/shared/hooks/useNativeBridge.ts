import { useState, useEffect } from 'react';
import type { NativeBridgeResponse } from '../utils/nativeBridge';

export function useNativeBridge() {
  const [isReady, setIsReady] = useState(!!window.NativeBridge);

  useEffect(() => {
    if (window.NativeBridge) {
      setIsReady(true);
      return;
    }

    const handler = () => setIsReady(true);
    window.addEventListener('NativeBridgeReady', handler);

    return () => window.removeEventListener('NativeBridgeReady', handler);
  }, []);

  const openCamera = async (): Promise<NativeBridgeResponse | null> => {
    if (!window.NativeBridge) return null;
    return window.NativeBridge.openCamera();
  };

  const openGallery = async (): Promise<NativeBridgeResponse | null> => {
    if (!window.NativeBridge) return null;
    return window.NativeBridge.openGallery();
  };

  return {
    isReady,
    isNativeApp: isReady && !!window.NativeBridge?.isNativeApp,
    openCamera,
    openGallery,
  };
}
