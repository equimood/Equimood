import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type AudioPlayerProps = {
  audioFile: any;
  title: string;
  onClose: () => void;
};

export default function AudioPlayer({ audioFile, title, onClose }: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  async function loadAudio() {
    try {
      setIsLoading(true);
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        audioFile,
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur de chargement audio:', error);
      setIsLoading(false);
    }
  }

  function onPlaybackStatusUpdate(status: any) {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  }

  async function togglePlayPause() {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }

  async function seekTo(value: number) {
    if (!sound) return;
    await sound.setPositionAsync(value);
  }

  async function skipBackward() {
    if (!sound) return;
    const newPosition = Math.max(0, position - 10000); // Reculer de 10 secondes
    await sound.setPositionAsync(newPosition);
  }

  async function skipForward() {
    if (!sound) return;
    const newPosition = Math.min(duration, position + 10000); // Avancer de 10 secondes
    await sound.setPositionAsync(newPosition);
  }

  function formatTime(millis: number) {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#8B6D47" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.playerContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#8B6D47" />
          ) : (
            <>
              <View style={styles.controlsRow}>
                <Pressable
                  style={({ pressed }) => [
                    styles.skipButton,
                    pressed && styles.skipButtonPressed,
                  ]}
                  onPress={skipBackward}
                >
                  <Ionicons name="play-back" size={32} color="#8B6D47" />
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.playButton,
                    pressed && styles.playButtonPressed,
                  ]}
                  onPress={togglePlayPause}
                >
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={48}
                    color="#FFFCF7"
                  />
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.skipButton,
                    pressed && styles.skipButtonPressed,
                  ]}
                  onPress={skipForward}
                >
                  <Ionicons name="play-forward" size={32} color="#8B6D47" />
                </Pressable>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${duration > 0 ? (position / duration) * 100 : 0}%` },
                    ]}
                  />
                  <Pressable
                    style={[
                      styles.progressThumb,
                      { left: `${duration > 0 ? (position / duration) * 100 : 0}%` },
                    ]}
                    onPress={(e) => {
                      const locationX = e.nativeEvent.locationX;
                      const width = 300; // Approximation
                      const percent = locationX / width;
                      seekTo(percent * duration);
                    }}
                  />
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formatTime(position)}</Text>
                  <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8B6D47',
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  playerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 30,
  },
  skipButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5E6D3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skipButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  playButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8B6D47',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  playButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5D5C3',
    borderRadius: 3,
    position: 'relative',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B6D47',
    borderRadius: 3,
  },
  progressThumb: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B6D47',
    marginLeft: -8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#8B6D47',
    fontWeight: '500',
  },
});
