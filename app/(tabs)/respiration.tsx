import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function RespirationScreen() {
  const breathAnimation = useSharedValue(1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    breathAnimation.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 5000 }),
        withTiming(1, { duration: 5000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathAnimation.value }],
  }));

  // Arrêter et réinitialiser la musique quand on quitte l'onglet
  useFocusEffect(
    React.useCallback(() => {
      // Fonction appelée quand on arrive sur l'onglet
      return () => {
        // Fonction appelée quand on QUITTE l'onglet
        const stopAndReset = async () => {
          if (sound) {
            try {
              await sound.stopAsync();
              await sound.setPositionAsync(0);
              await sound.unloadAsync();
              setSound(null);
              setIsPlaying(false);
            } catch (error) {
              console.error('Erreur lors de l\'arrêt:', error);
            }
          }
        };
        stopAndReset();
      };
    }, [sound])
  );

  const togglePlayPause = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            // Remettre à zéro avant de jouer
            await sound.setPositionAsync(0);
            await sound.playAsync();
            setIsPlaying(true);
          }
        }
      } else {
        // Créer et lancer le son la première fois
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('@/assets/audio/respirer.mp3'),
          { shouldPlay: true, isLooping: true }
        );
        setSound(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Erreur audio:', error);
    }
  };

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
              <Ionicons name="heart" size={110} color="#D4A5A5" />
            </View>
          </Animated.View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.instruction}>Inspire • Expire</Text>
          <Text style={styles.description}>
            Suis le mouvement du cercle{'\n'}pour guider ta respiration
          </Text>
        </View>

        {/* Bouton pause/play discret */}
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
