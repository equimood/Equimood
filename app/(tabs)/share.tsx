import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const qrImage = require('@/assets/images/qr-equimood-2.png');

export default function ShareScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFBF7' }} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>Partager Equimood</Text>
      <Text style={styles.subtitle}>
        Scannez ce QR code pour accéder à Equimood sur votre téléphone ou partagez-le autour de vous !
      </Text>
      <Image source={qrImage} style={styles.qr} resizeMode="contain" />
      <Text selectable style={styles.url}>
        https://equimood.fr
      </Text>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>📲 Installer l'application</Text>

        <Text style={styles.instructionsSubtitle}>🍎 Avec Safari</Text>
        <Text style={styles.instructionsText}>1. Ouvrez le lien dans <Text style={styles.bold}>Safari</Text></Text>
        <Text style={styles.instructionsText}>2. Appuyez sur <Text style={styles.bold}>↑ Partager</Text> (la flèche vers le haut)</Text>
        <Text style={styles.instructionsText}>3. Choisissez <Text style={styles.bold}>"Sur l'écran d'accueil"</Text></Text>

        <View style={styles.instructionsDivider} />

        <Text style={styles.instructionsSubtitle}>🌐 Avec Chrome <Text style={styles.instructionsSubtitleLight}>(le navigateur Google)</Text></Text>
        <Text style={styles.instructionsText}>1. Ouvrez le lien dans <Text style={styles.bold}>Chrome</Text></Text>
        <Text style={styles.instructionsText}>2. Appuyez sur <Text style={styles.bold}>⋮</Text> (3 points en haut à droite)</Text>
        <Text style={styles.instructionsText}>3. Choisissez <Text style={styles.bold}>"Ajouter à l'écran d'accueil"</Text></Text>
      </View>

      <View style={styles.socialBox}>
        <Text style={styles.socialTitle}>Nous suivre</Text>
        <Pressable style={styles.socialButton} onPress={() => Linking.openURL('https://www.instagram.com/equimood_officiel')}>
          <Text style={styles.socialText}>@equimood_officiel <Text style={styles.socialNetwork}>Instagram</Text></Text>
        </Pressable>
        <Pressable style={styles.socialButton} onPress={() => Linking.openURL('https://www.tiktok.com/@equimood_officiel')}>
          <Text style={styles.socialText}>@equimood_officiel <Text style={styles.socialNetwork}>TikTok</Text></Text>
        </Pressable>
      </View>

      <View style={styles.feedbackBox}>
        <Text style={styles.feedbackTitle}>✨ EquiMood vient de naître !</Text>
        <Text style={styles.feedbackText}>
          Vos retours comptent énormément. Dites-nous ce que vous aimez, ce que vous voudriez voir évoluer...
        </Text>
        <Pressable style={styles.feedbackButton} onPress={() => Linking.openURL('https://www.instagram.com/equimood_officiel')}>
          <Text style={styles.feedbackButtonText}>💬 Message sur Instagram</Text>
        </Pressable>
        <Pressable style={[styles.feedbackButton, styles.feedbackButtonAlt]} onPress={() => Linking.openURL('mailto:equimood.app@gmail.com?subject=Mon retour sur EquiMood')}>
          <Text style={styles.feedbackButtonText}>✉️ Par email</Text>
        </Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FEFBF7',
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C6A45D',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8A847E',
    marginBottom: 24,
    textAlign: 'center',
  },
  qr: {
    width: 220,
    height: 220,
    marginBottom: 24,
  },
  url: {
    fontSize: 16,
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 24,
  },
  instructionsBox: {
    backgroundColor: '#FFF8EE',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8D5B0',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B6D47',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 15,
    color: '#5C5044',
    marginBottom: 6,
  },
  instructionsSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A8782A',
    marginBottom: 8,
    marginTop: 4,
  },
  instructionsSubtitleLight: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#8B6D47',
  },
  instructionsDivider: {
    height: 1,
    backgroundColor: '#E8D5B0',
    width: '100%',
    marginVertical: 14,
  },
  bold: {
    fontWeight: 'bold',
    color: '#8B6D47',
  },
  socialBox: {
    width: '100%',
    marginTop: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B6D47',
    marginBottom: 12,
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8EE',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8D5B0',
  },
  socialIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  socialText: {
    flex: 1,
    fontSize: 15,
    color: '#2C2416',
    fontWeight: '600',
  },
  socialNetwork: {
    fontSize: 13,
    color: '#A68B5B',
  },
  feedbackBox: {
    width: '100%',
    backgroundColor: '#FFF8EE',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8D5B0',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B6D47',
    marginBottom: 8,
    textAlign: 'center',
  },
  feedbackText: {
    fontSize: 14,
    color: '#5C5044',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  feedbackButton: {
    backgroundColor: '#8B6D47',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  feedbackButtonAlt: {
    backgroundColor: '#C6A45D',
  },
  feedbackButtonText: {
    color: '#FEFBF7',
    fontSize: 15,
    fontWeight: '600',
  },
});
