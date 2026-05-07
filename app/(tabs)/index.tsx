import { Spacing } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const pulseAnim = useSharedValue(1);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('welcome_shown').then((val) => {
      if (!val) setShowWelcome(true);
    });
  }, []);

  const handleCloseWelcome = async () => {
    await AsyncStorage.setItem('welcome_shown', 'true');
    setShowWelcome(false);
  };

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

        {/* Accroche émotionnelle */}
        <View style={styles.hookBlock}>
          <Text style={styles.hookText}>
            J'ai peur de décevoir, le regard des autres me paralyse, je ne me sens pas légitime, je perds mes moyens…
          </Text>
        </View>

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
            <Text style={styles.introTextAccent}>fais de ton mental ton plus grand allié.{'\n'}</Text>
            <Text style={styles.introTextAccent}>{'Car… '}</Text>
            <Text style={styles.sloganInline}>« Ce que tu ressens, il le reflète. »</Text>
          </Text>
        </View>

        {/* Bandeau lancement */}
        <View style={styles.launchBanner}>
          <Text style={styles.launchBannerEmoji}>🎁</Text>
          <Text style={styles.launchBannerTitle}>Lancement EquiMood — Accès libre offert</Text>
          <Text style={styles.launchBannerText}>
            Pour fêter notre naissance, tous les modules sont accessibles gratuitement jusqu'au{' '}
            <Text style={styles.launchBannerDate}>1er juin 2026</Text>.{'\n'}
            Profites-en maintenant, avant le passage en version Premium. 💛
          </Text>
        </View>

        {/* Bouton Mon profil avec encore plus d'espace */}
        <Pressable style={[styles.profileButton, { marginTop: 32 }]} onPress={() => router.push('/profile')}>
          <Text style={styles.profileButtonText}>Mon profil</Text>
        </Pressable>

        {/* Bouton pour accéder à l'écran de partage */}
        <Pressable style={[styles.shareButton, { marginTop: 12, marginBottom: 28 }]} onPress={() => router.push('/(tabs)/share')}>
          <Text style={styles.shareButtonText}>Découvrir et installer EquiMood</Text>
        </Pressable>

        {/* Bouton EquiMood PLUS */}
        <Pressable onPress={() => router.push('/equimood-plus' as any)} style={styles.plusLogoButton}>
          <Text style={styles.plusLogoText}>✦ EquiMood <Text style={styles.plusLogoPlus}>PLUS</Text> ✦</Text>
        </Pressable>
        <Text style={styles.plusLogoSub}>Un audio créé rien que pour toi</Text>
      </ScrollView>

      {/* Modale de bienvenue — affichée une seule fois */}
      <Modal visible={showWelcome} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🎧 Bienvenue sur EquiMood</Text>
            <Text style={styles.modalText}>
              Pour vivre pleinement l'expérience, écoute les audios{' '}
              <Text style={styles.modalAccent}>au calme, avec des écouteurs,</Text>
              {' '}à l'abri des distractions.{'\n\n'}
              C'est dans ce silence que la magie opère. 🐴
            </Text>
            <Pressable style={styles.modalButton} onPress={handleCloseWelcome}>
              <Text style={styles.modalButtonText}>J'ai compris 🎧</Text>
            </Pressable>
          </View>
        </View>
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
  sloganInline: {
    fontSize: 15,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    color: '#A8782A',
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
    lineHeight: 24,
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
    backgroundColor: '#FDF5E6',
    borderWidth: 2,
    borderColor: '#B8922A',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 35,
  },
  profileButtonText: {
    color: '#7A5010',
    fontSize: 13,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  shareButton: {
    alignSelf: 'center',
    backgroundColor: '#FDF0D5',
    borderWidth: 2,
    borderColor: '#8B5E1A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 22,
    marginTop: 8,
    shadowColor: '#8B5E1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  shareButtonText: {
    color: '#6B4000',
    fontSize: 15,
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalBox: {
    backgroundColor: '#FFFCF7',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#A8782A',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#A8782A',
    marginBottom: 14,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#6B4D27',
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 22,
  },
  modalAccent: {
    fontStyle: 'italic',
    color: '#A8782A',
  },
  modalButton: {
    backgroundColor: '#A8782A',
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 24,
  },
  modalButtonText: {
    color: '#FFFCF7',
    fontSize: 15,
    fontWeight: '700',
  },
  launchBanner: {
    width: '100%',
    backgroundColor: '#FFF8EE',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#C6A45D',
    padding: 20,
    marginTop: 24,
    marginBottom: 4,
    alignItems: 'center',
  },
  launchBannerEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  launchBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B6D47',
    textAlign: 'center',
    marginBottom: 10,
  },
  launchBannerText: {
    fontSize: 15,
    color: '#7A5C3A',
    textAlign: 'center',
    lineHeight: 24,
  },
  plusIconButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
    marginBottom: 4,
    padding: 4,
  },
  plusIcon: {
    width: 48,
    height: 48,
  },
  launchBannerDate: {
    fontWeight: 'bold',
    color: '#8B6D47',
  },
  plusLogoButton: {
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 6,
    backgroundColor: '#B8922A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 24,
    alignItems: 'center',
  },
  plusLogoImage: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginTop: 8,
    opacity: 0.9,
  },
  plusLogoText: {
    fontSize: 17,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#FFFCF7',
    letterSpacing: 0.5,
  },
  plusLogoPlus: {
    color: '#FFFCF7',
    letterSpacing: 3,
  },
  plusLogoSub: {
    fontSize: 14,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    color: '#7A5010',
    textAlign: 'center',
    marginBottom: 10,
  },
  hookBlock: {
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 0,
    paddingHorizontal: 16,
  },
  hookText: {
    fontSize: 14,
    color: '#A8782A',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
});
