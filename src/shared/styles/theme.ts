import { colors, typography } from './tokens';

export const theme = {
  colors: {
    ...colors,
    // Semantic colors
    text: {
      primary: colors.base.black,
      secondary: colors.gray[600],
      disabled: colors.gray[500],
      inverse: colors.gray[100],
    },
    background: {
      primary: colors.gray[100],
      secondary: colors.gray[200],
      tertiary: colors.gray[300],
    },
    border: {
      primary: colors.gray[300],
      secondary: colors.gray[400],
    },
    action: {
      primary: colors.primary[500],
      primaryHover: colors.primary[700],
      primaryActive: colors.primary[700],
      disabled: colors.gray[400],
    },
  },
  typography,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
} as const;

export type Theme = typeof theme;
