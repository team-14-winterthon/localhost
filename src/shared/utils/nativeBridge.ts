// NativeBridge 타입 정의
declare global {
  interface Window {
    NativeBridge?: {
      isNativeApp: boolean;
      openCamera: () => Promise<NativeBridgeResponse>;
      openGallery: () => Promise<NativeBridgeResponse>;
    };
  }
}

export interface NativeBridgeResponse {
  success: boolean;
  error?: string;
  data?: {
    uri: string;
    base64: string;
    width: number;
    height: number;
    mimeType: string;
  };
}

export const isNativeApp = () => !!window.NativeBridge?.isNativeApp;

export const openNativeCamera = async (): Promise<NativeBridgeResponse> => {
  if (!window.NativeBridge) {
    throw new Error('NativeBridge not available');
  }
  return window.NativeBridge.openCamera();
};

export const openNativeGallery = async (): Promise<NativeBridgeResponse> => {
  if (!window.NativeBridge) {
    throw new Error('NativeBridge not available');
  }
  return window.NativeBridge.openGallery();
};

export const base64ToFile = (base64: string, mimeType: string, filename: string): File => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};

export const base64ToDataUrl = (base64: string, mimeType: string): string => {
  return `data:${mimeType};base64,${base64}`;
};
