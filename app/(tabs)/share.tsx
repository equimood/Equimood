import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

const qrImage = require('@/assets/images/qr-equimood.png');

export default function ShareScreen() {
  const handleDownload = () => {
    if (Platform.OS === 'web') {
      // Ouvre le QR dans un nouvel onglet → l'utilisatrice peut faire clic droit "Enregistrer"
      const link = document.createElement('a');
      link.href = '/assets/images/qr-equimood.png';
      link.download = 'qr-equimood.png';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partager Equimood</Text>
      <Text style={styles.subtitle}>
        Scannez ce QR code pour accéder à Equimood sur votre téléphone ou partagez-le autour de vous !
      </Text>
      <Image source={qrImage} style={styles.qr} resizeMode="contain" />
      <Text selectable style={styles.url}>
        https://equimood.netlify.app
      </Text>
      {Platform.OS === 'web' && (
        <Pressable style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.downloadButtonText}>⬇️ Télécharger le QR</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEFBF7',
    padding: 24,
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
  downloadButton: {
    backgroundColor: '#C6A45D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 16,
  },
  downloadButtonText: {
    color: '#FEFBF7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
