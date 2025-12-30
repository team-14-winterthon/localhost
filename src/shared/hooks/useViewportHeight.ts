import { useEffect, useState } from 'react';

/**
 * Hook to handle mobile viewport height issues
 * Fixes 100vh behavior on mobile browsers
 */
export function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.visualViewport?.height ?? window.innerHeight);
    };

    // Update on resize and orientation change
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    // Update on visual viewport changes (keyboard open/close on mobile)
    window.visualViewport?.addEventListener('resize', updateHeight);

    // Initial update
    updateHeight();

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      window.visualViewport?.removeEventListener('resize', updateHeight);
    };
  }, []);

  return viewportHeight;
}

/**
 * Hook to detect if keyboard is visible on mobile
 */
export function useKeyboardVisible() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const viewportHeight = useViewportHeight();
  const [initialHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Keyboard is considered visible if viewport height is significantly smaller
    const isVisible = initialHeight - viewportHeight > 150;
    setIsKeyboardVisible(isVisible);
  }, [viewportHeight, initialHeight]);

  return isKeyboardVisible;
}
