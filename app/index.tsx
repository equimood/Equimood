
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../constants/theme';

export default function SplashScreenComponent() {
  const router = useRouter();
  const fadeAnim = useSharedValue(0);
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
  if (ready) {
    fadeAnim.value = withTiming(1, { duration: 1500 });
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3500);
    return () => clearTimeout(timer);
  }
}, [ready]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Logo avec animation de fondu */}
        <Animated.View style={[styles.logoContainer, animatedStyle]}>
          <Image 
            source={require('../assets/images/ce_que_tu_ressens_2.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
});
