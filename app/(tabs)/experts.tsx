import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ExpertsScreen() {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [status, setStatus] = useState<any>({});

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const openVideo = () => {
    setShowVideoModal(true);
  };

  const closeVideo = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.stopAsync();
        await videoRef.current.setPositionAsync(0);
      }
    } catch (error) {
      console.log('Erreur arrêt vidéo:', error);
    }
    setIsPlaying(false);
    setShowVideoModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Côté pros</Text>
          <Text style={styles.headerSubtitle}>
            Interviews et conseils d'experts pour enrichir ta pratique
          </Text>
        </View>

        {/* Annonce Mathilde Level avec bouton vidéo */}
        <View style={styles.comingSoonCard}>
          <View style={styles.photoWrapper}>
            <Image 
              source={require('../../assets/images/mathilde.jpeg')}
              style={styles.expertPhoto}
              resizeMode="cover"
            />
          </View>
          <View style={styles.comingSoonContent}>
            <Text style={styles.comingSoonBadge}>À venir</Text>
            <Text style={styles.comingSoonTitle}>Mathilde Level</Text>
            <Text style={styles.comingSoonSubtitle}>Level Jump</Text>
            <Text style={styles.comingSoonDescription}>
              Découvre bientôt l'interview exclusive de cette experte équestre
            </Text>
            
            {/* Bouton pour ouvrir la vidéo */}
            <Pressable style={styles.watchButton} onPress={openVideo}>
              <Ionicons name="play-circle" size={24} color="#FFFCF7" />
              <Text style={styles.watchButtonText}>Voir l'interview</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Modal vidéo plein écran */}
      <Modal
        visible={showVideoModal}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={closeVideo}
      >
        <SafeAreaView style={styles.modalContainer} edges={['top']}>
          <View style={styles.modalHeader}>
            <Pressable onPress={closeVideo} style={styles.closeButton}>
              <Ionicons name="close" size={32} color="#8B6D47" />
            </Pressable>
            <Text style={styles.modalTitle}>Interview Mathilde Level</Text>
            <View style={{ width: 32 }} />
          </View>

          <View style={styles.videoWrapper}>
            <View style={styles.videoContainer}>
              <Video
                ref={videoRef}
                source={require('@/assets/videos/Test video mathilde.mp4.mov')}
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                onPlaybackStatusUpdate={status => {
                  setStatus(() => status);
                  if (status.isLoaded) {
                    setIsPlaying(status.isPlaying);
                  }
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 8,
  },
  headerTitle: {
    ...Typography.titleBold,
    fontSize: 28,
    color: Colors.light.text,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#8B6D47',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
  comingSoonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#C9A86A',
  },
  photoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  expertPhoto: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 0,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#C9A86A',
    objectFit: 'cover',
  },
  comingSoonContent: {
    alignItems: 'center',
  },
  comingSoonBadge: {
    backgroundColor: '#FFF3E0',
    color: '#C9A86A',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  comingSoonTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2416',
    marginBottom: 4,
    textAlign: 'center',
  },
  comingSoonSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C9A86A',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonDescription: {
    fontSize: 14,
    color: '#8B6D47',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#C9A86A',
  },
  videoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2416',
    marginBottom: 4,
    textAlign: 'center',
  },
  videoSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C9A86A',
    marginBottom: 16,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B6D47',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#8B6D47',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#8B6D47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  watchButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFCF7',
    letterSpacing: 0.3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFCF7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5DDD0',
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2416',
    letterSpacing: -0.3,
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
