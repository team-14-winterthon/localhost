/**
 * Safe Area Utilities for iOS Notch Support
 */

export const safeArea = {
  top: 'env(safe-area-inset-top, 0px)',
  right: 'env(safe-area-inset-right, 0px)',
  bottom: 'env(safe-area-inset-bottom, 0px)',
  left: 'env(safe-area-inset-left, 0px)',
} as const;

/**
 * Generate padding with safe area insets
 */
export const paddingWithSafeArea = (
  top: string | number = 0,
  right: string | number = 0,
  bottom: string | number = 0,
  left: string | number = 0
) => {
  const formatValue = (value: string | number) =>
    typeof value === 'number' ? `${value}px` : value;

  return `
    padding-top: calc(${formatValue(top)} + ${safeArea.top});
    padding-right: calc(${formatValue(right)} + ${safeArea.right});
    padding-bottom: calc(${formatValue(bottom)} + ${safeArea.bottom});
    padding-left: calc(${formatValue(left)} + ${safeArea.left});
  `;
};

/**
 * Common safe area patterns
 */
export const safeAreaPatterns = {
  // Full screen with safe area padding
  fullScreen: `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${paddingWithSafeArea(0)}
  `,

  // Fixed header with safe area top
  fixedHeader: `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-top: ${safeArea.top};
  `,

  // Fixed bottom navigation
  fixedBottom: `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: ${safeArea.bottom};
  `,

  // Content with safe area horizontal padding
  contentHorizontal: `
    padding-left: max(16px, ${safeArea.left});
    padding-right: max(16px, ${safeArea.right});
  `,
} as const;
