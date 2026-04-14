// Primary colors for Equimood's elegant palette
export const colors = {
  // Base colors
  cream: '#FEFBF7',       // Main background color
  gold: '#C6A45D',       // Brand accent color, matching the logo
  warmGray: '#8A847E',   // Text and details

  // Secondary palette
  sand: '#F5EDE4',       // Warm beige for cards and sections
  taupe: '#E8E2D9',      // Elegant accent for buttons and highlights
  
  // Functional colors
  text: {
    primary: '#2C2C2C',   // Main text color
    secondary: '#8A847E', // Secondary text
    light: '#FEFBF7',    // Text on dark backgrounds
  },
  
  // UI elements
  background: {
    primary: '#FEFBF7',
    secondary: '#F5EDE4',
    accent: '#E8E2D9',
  },
  
  // Status colors
  success: '#739E82',    // Soft green for success states
  error: '#C1666B',      // Muted red for errors
  info: '#8E95B2',       // Subtle blue for information
};

// Named tokens for consistent usage
export const tokens = {
  splashBackground: colors.cream,
  navigationBackground: colors.cream,
  cardBackground: colors.sand,
  buttonPrimary: colors.gold,
  buttonSecondary: colors.taupe,
  textPrimary: colors.text.primary,
  textSecondary: colors.text.secondary,
  textLight: colors.text.light,
};