import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Ensure all static images are included in the web build
import '../utils/assetsLoader';

// Empêcher le splash screen de se masquer automatiquement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
