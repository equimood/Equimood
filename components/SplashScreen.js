import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { colors, tokens } from '../theme/colors';
import { textStyles } from '../theme/typography';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  const fadeAnim = new Animated.Value(0);

  const [fontsLoaded] = useFonts({
    // We'll add custom fonts here if needed
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Start fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Hide splash screen after animation
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image
        source={require('../assets/images/ce_que_tu_ressens.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.splashBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '60%',
    height: '30%',
    marginBottom: 30,
  },
  slogan: {
    ...textStyles.quote,
    color: colors.warmGray,
    textAlign: 'center',
    maxWidth: '80%',
  },
});