import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const qrImage = require('@/assets/images/qr-equimood.png');

export default function ShareScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Partager Equimood</Text>
      <Text style={styles.subtitle}>
        Scannez ce QR code pour accéder à Equimood sur votre téléphone ou partagez-le autour de vous !
      </Text>
      <Image source={qrImage} style={styles.qr} resizeMode="contain" />
      <Text selectable style={styles.url}>
        https://equimood.netlify.app
      </Text>
      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>📲 Installer l'application</Text>
        <Text style={styles.instructionsText}>1. Ouvrez le lien dans <Text style={styles.bold}>Safari</Text></Text>
        <Text style={styles.instructionsText}>2. Appuyez sur <Text style={styles.bold}>⎋ Partager</Text></Text>
        <Text style={styles.instructionsText}>3. Choisissez <Text style={styles.bold}>"Sur l'écran d'accueil"</Text></Text>
      </View>
    </ScrollView>
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
  bold: {
    fontWeight: 'bold',
    color: '#8B6D47',
  },
});
