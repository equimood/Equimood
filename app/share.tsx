import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

// Resolve asset source for web download
const qrImage = require('../assets/images/qr-equimood.png');

export default function ShareScreen() {
  const handleDownload = async () => {
    if (Platform.OS === 'web') {
      try {
        const response = await fetch(Image.resolveAssetSource(qrImage).uri);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'qr-equimood.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch {
        // Fallback : ouvrir dans un nouvel onglet
        window.open(Image.resolveAssetSource(qrImage).uri, '_blank');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partager Equimood</Text>
      <Text style={styles.subtitle}>
        Scannez ce QR code pour accéder à Equimood sur votre téléphone ou partagez-le autour de vous !
      </Text>
      <Image
        source={qrImage}
        style={styles.qr}
        resizeMode="contain"
      />
      <Text selectable style={styles.url}>
        https://equimood.netlify.app
      </Text>

      {Platform.OS === 'web' && (
        <Pressable style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.downloadButtonText}>Télécharger le QR</Text>
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
    marginBottom: 24, // Add margin to separate from the button
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
