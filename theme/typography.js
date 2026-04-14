import { Platform } from 'react-native';

// Typography scale for Equimood
export const typography = {
  // Font families
  fonts: {
    primary: Platform.select({
      ios: 'Baskerville',          // Elegant serif font
      android: 'serif',            // Default serif on Android
      default: 'system-ui',        // Fallback
    }),
    secondary: Platform.select({
      ios: 'Avenir Next',         // Modern sans-serif
      android: 'sans-serif',       // Default sans-serif on Android
      default: 'system-ui',        // Fallback
    }),
  },

  // Font weights
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    base: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Predefined text styles
export const textStyles = {
  // Headers
  h1: {
    fontFamily: typography.fonts.primary,
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.tight,
  },
  h2: {
    fontFamily: typography.fonts.primary,
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.tight,
  },
  h3: {
    fontFamily: typography.fonts.primary,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.tight,
  },

  // Body text
  body: {
    fontFamily: typography.fonts.secondary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.base,
  },
  bodyLarge: {
    fontFamily: typography.fonts.secondary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.base,
  },
  bodySmall: {
    fontFamily: typography.fonts.secondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.base,
  },

  // Special styles
  quote: {
    fontFamily: typography.fonts.primary,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.relaxed,
    letterSpacing: typography.letterSpacing.wide,
  },
};