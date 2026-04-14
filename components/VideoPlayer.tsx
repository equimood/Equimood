import { Ionicons } from '@expo/vector-icons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

type VideoPlayerProps = {
  videoFile: any;
  title: string;
  onClose: () => void;
};

export default function VideoPlayer({ videoFile, title, onClose }: VideoPlayerProps) {
  const video = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayPause = async () => {
    if (video.current) {
      if (isPlaying) {
        await video.current.pauseAsync();
      } else {
        await video.current.playAsync();
      }
    }
  };

  const toggleFullscreen = async () => {
    if (video.current) {
      await video.current.presentFullscreenPlayer();
    }
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  function formatTime(millis: number) {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#8B6D47" />
        </Pressable>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
      </View>

      {/* Video Container */}
      <Pressable style={styles.videoContainer} onPress={handleVideoPress}>
        <Video
          ref={video}
          source={videoFile}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          useNativeControls={false}
        />

        {/* Custom Controls Overlay */}
        {showControls && (
          <View style={styles.controlsOverlay}>
            <Pressable
              style={styles.playButton}
              onPress={togglePlayPause}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={64}
                color="#FFFCF7"
              />
            </Pressable>
          </View>
        )}
      </Pressable>

      {/* Bottom Controls */}
      {showControls && (
        <View style={styles.bottomControls}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${duration > 0 ? (position / duration) * 100 : 0}%` },
                ]}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Pressable
              style={({ pressed }) => [
                styles.controlButton,
                pressed && styles.controlButtonPressed,
              ]}
              onPress={togglePlayPause}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={32}
                color="#8B6D47"
              />
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.controlButton,
                pressed && styles.controlButtonPressed,
              ]}
              onPress={toggleFullscreen}
            >
              <Ionicons name="expand" size={28} color="#8B6D47" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const videoHeight = width * (9 / 16); // Format 16:9

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
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#8B6D47',
    paddingHorizontal: 10,
  },
  videoContainer: {
    width: '100%',
    height: videoHeight,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(139, 109, 71, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    padding: 20,
    backgroundColor: '#FFFCF7',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5D5C3',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B6D47',
    borderRadius: 3,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5EBD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
