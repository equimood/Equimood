import React from 'react';
import { Image, View } from 'react-native';

// Ce composant est une copie de la logique de TabIconWithGlow 
// mais spécifiquement pour l'icône "Côté pros" afin de forcer le style.
const GlowWrapper = ({ children, focused }: { children: React.ReactNode; focused: boolean }) => (
  <View style={{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: focused ? 'rgba(201, 168, 106, 0.2)' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C9A86A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: focused ? 0.6 : 0,
    shadowRadius: focused ? 10 : 0,
    elevation: focused ? 8 : 0,
  }}>
    {children}
  </View>
);

export const ProsTabIcon = ({ focused }: { focused: boolean }) => {
  return (
    <GlowWrapper focused={focused}>
      <Image 
        source={focused 
          ? require('@/assets/images/logo_pros_plein-1.png')
          : require('@/assets/images/logo_pros_transp.png')
        }
        style={{ 
          width: 38, 
          height: 38,
          // On applique une transformation pour remonter l'image de manière forcée.
          transform: [{ translateY: -16 }],
        }}
        resizeMode="contain"
      />
    </GlowWrapper>
  );
};
