import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// SVG Path for the heart shape
const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export default function RespirationScreen() {
  const breathAnimation = useSharedValue(1);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const storedProfile = await AsyncStorage.getItem('userProfile');
          if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            if (profile.photo) {
              setUserPhoto(profile.photo);
            } else {
              setUserPhoto(null);
            }
          }
        } catch (error) {
          console.error("Erreur lors du chargement du profil :", error);
        }
      };
      loadProfile();

      // Quand on quitte l'onglet → stopper et décharger le son
      return () => {
        if (soundRef.current) {
          soundRef.current.stopAsync().then(() => {
            soundRef.current?.unloadAsync();
            soundRef.current = null;
          });
          setIsPlaying(false);
        }
      };
    }, [])
  );

  // Animation effect
  useEffect(() => {
    breathAnimation.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 5000 }),
        withTiming(1, { duration: 5000 })
      ),
      -1,
      true
    );
  }, [breathAnimation]);

  // Sound cleanup effect
  useEffect(() => {
    // This function is called when the component unmounts.
    return () => {
      if (soundRef.current) {
        console.log('Unloading sound...');
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const togglePlayPause = async () => {
    // Audio non disponible sur web
    if (Platform.OS === 'web') return;

    try {
      if (soundRef.current) {
        if (isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
        return;
      }

      // Première fois : charger et jouer
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/audio/respirer.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      soundRef.current = sound;
      setIsPlaying(true);

    } catch (error) {
      console.error('Audio error:', error);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathAnimation.value }],
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Respire</Text>
          <Text style={styles.subtitle}>Prends un moment pour toi</Text>
        </View>

        <View style={styles.breathContainer}>
          <Animated.View
            style={[styles.breathCircle, animatedStyle]}
          >
            <View style={styles.innerCircle}>
              {userPhoto ? (
                <Image
                  source={{ uri: userPhoto }}
                  style={styles.profilePhoto}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="heart" size={110} color="#D4A5A5" />
              )}
            </View>
          </Animated.View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.instruction}>Inspire • Expire</Text>
          <Text style={styles.description}>
            Suis le mouvement du cercle{'\n'}pour guider ta respiration
          </Text>
        </View>

        {/* Bouton pause/play — mobile uniquement */}
        {Platform.OS !== 'web' && (
          <Pressable
            style={({ pressed }) => [
              styles.pauseButton,
              pressed && styles.pauseButtonPressed,
            ]}
            onPress={togglePlayPause}
          >
            <Ionicons 
              name={isPlaying ? 'pause-circle' : 'play-circle'} 
              size={50} 
              color="#8B6D47" 
            />
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    ...Typography.titleBold,
    fontSize: 28,
    color: Colors.light.text,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: '#8B6D47',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  breathContainer: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  breathCircle: {
    width: 290,
    height: 290,
    borderRadius: 145,
    backgroundColor: 'rgba(139, 109, 71, 0.1)',
    borderWidth: 3,
    borderColor: '#8B6D47',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(212, 165, 165, 0.15)',
    borderWidth: 2,
    borderColor: '#D4A5A5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B6D47',
    marginBottom: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#8B6D47',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  pauseButton: {
    marginTop: 10,
    opacity: 0.6,
  },
  pauseButtonPressed: {
    opacity: 0.3,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B6D47',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 12,
    shadowColor: '#8B6D47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  playButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFCF7',
    letterSpacing: 0.3,
  },
});
