import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ShareScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partager Equimood</Text>
      <Text style={styles.subtitle}>
        Scannez ce QR code pour accéder à Equimood sur votre téléphone ou partagez-le autour de vous !
      </Text>
      <Image
        source={require('../../assets/images/qr-equimood.png')}
        style={styles.qr}
        resizeMode="contain"
      />
      <Text selectable style={styles.url}>
        https://equimood.netlify.app
      </Text>
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
  },
});
