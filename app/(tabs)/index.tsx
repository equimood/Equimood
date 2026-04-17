import { Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1, // infinite
      true // reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Logo animé centré (œil de la jument) */}
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.imageWrapper, animatedStyle]}>
            <Image 
              source={require('@/assets/images/oeil_duduche.png')}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </Animated.View>
        </View>

        {/* Second paragraphe */}
        <View style={styles.textBlock}>
          <Text style={styles.introText}>
            Avec EquiMood, transforme tes émotions en confiance et{' '}
            <Text style={styles.introTextAccent}>fais de ton mental ton plus grand allié.</Text>
          </Text>
        </View>

        {/* Slogan déplacé en bas */}
        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 0 }}>
          <Text style={styles.slogan}>« Ce que tu ressens, il le reflète. »</Text>
        </View>

        {/* Bouton Mon profil avec encore plus d'espace */}
        <Pressable style={[styles.profileButton, { marginTop: 32 }]} onPress={() => router.push('/profile')}>
          <Text style={styles.profileButtonText}>Mon profil</Text>
        </Pressable>

        {/* Bouton pour accéder à l'écran de partage */}
        <Pressable style={[styles.shareButton, { marginTop: 12, marginBottom: 20 }]} onPress={() => router.push('/(tabs)/share')}>
          <Text style={styles.shareButtonText}>� Télécharger et partager</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: 80, // Ajoute un espace en haut pour descendre le contenu
    paddingBottom: Spacing.xl * 3,
  },
  topLogoContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  centerLogoContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: -5,
  },
  headerLogo: {
    width: 95,
    height: 95,
  },
  slogan: {
    fontSize: 19,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    color: '#A8782A',
    marginTop: 22,
    marginBottom: 0,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B4D27',
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: 0,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontWeight: '700',
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#8B6D47',
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: 0.5,
  },
  introTextAccent: {
    color: '#A8782A',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  imageWrapper: {
    width: 230,
    height: 230,
    borderRadius: 115,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#C9A86A',
    shadowColor: '#C9A86A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  logoImage: {
    width: 230,
    height: 230,
  },
  profileButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#6B4D27',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 35,
  },
  profileButtonText: {
    color: '#6B4D27',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  shareButton: {
    alignSelf: 'center',
    backgroundColor: '#C6A45D',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 24,
    marginTop: 8,
  },
  shareButtonText: {
    color: '#FEFBF7',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
