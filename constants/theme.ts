// EquiMood Design System
// Basé sur le cahier des charges du 12 novembre 2025

export const Colors = {
  light: {
    // Couleurs principales
    primary: '#F8F5F2',      // Crème clair - fond principal
    secondary: '#E5D8C5',    // Beige sable - secondaire
    accent: '#B6A497',       // Taupe rosé - accents
    nature: '#A8B9A2',       // Vert sauge doux - équilibre, nature
    premium: '#C9A86A',      // Or doux - éléments premium
    text: '#3B3B3B',         // Gris anthracite - texte
    textLight: '#6B6B6B',    // Gris moyen - texte secondaire
    white: '#FFFFFF',
    background: '#F8F5F2',
    card: '#FFFFFF',
    border: '#E5D8C5',
  },
  dark: {
    // Mode sombre (à ajuster selon les besoins)
    primary: '#2C2C2C',
    secondary: '#3B3B3B',
    accent: '#B6A497',
    nature: '#A8B9A2',
    premium: '#C9A86A',
    text: '#F8F5F2',
    textLight: '#E5D8C5',
    white: '#FFFFFF',
    background: '#1A1A1A',
    card: '#2C2C2C',
    border: '#3B3B3B',
  },
};

export const Typography = {
  // Titres : Playfair Display
  title: {
    fontFamily: 'PlayfairDisplay_400Regular',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
  },
  titleBold: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
  },
  subtitle: {
    fontFamily: 'PlayfairDisplay_400Regular',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.light.text,
  },
  
  // Texte courant : Lato
  body: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  bodyBold: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  caption: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textLight,
  },
  button: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const Shadows = {
  soft: {
    shadowColor: '#3B3B3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#3B3B3B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
};
