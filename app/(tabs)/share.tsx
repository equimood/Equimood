import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const qrImage = require('@/assets/images/qr-equimood-2.png');

export default function ShareScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFBF7' }} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>Découvrir EquiMood</Text>

      <Text style={{fontSize: 17, fontWeight: 'bold', color: '#B8933A', textAlign: 'center', marginBottom: 16, marginTop: 4}}>
        EquiMood, ton coach mental à cheval.{"\n"}Partout avec toi.
      </Text>

      <View style={{backgroundColor: '#FFF8EE', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#E8D5B0', width: '100%'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#8B6D47', marginBottom: 8, textAlign: 'center'}}>Bientôt disponible sur iOS et Android</Text>
        <Text style={{fontSize: 16, color: '#5C5044', marginBottom: 8, textAlign: 'center'}}>En attendant, pour installer l'app :</Text>
        <Text style={{fontSize: 15, color: '#5C5044', marginBottom: 6, textAlign: 'justify'}}>
          🍎 <Text style={{fontWeight: 'bold'}}>Sur iPhone (Safari)</Text>{"\n"}
          1. Ouvre https://equimood.fr dans Safari.{"\n"}
          2. Appuie sur <Text style={{fontWeight: 'bold'}}>Partager</Text> (icône carré avec flèche).{"\n"}
          3. Choisis <Text style={{fontWeight: 'bold'}}>"Sur l'écran d'accueil"</Text> pour ajouter l'app à ton écran d'accueil.{"\n\n"}
          🤖 <Text style={{fontWeight: 'bold'}}>Sur Android (Chrome)</Text>{"\n"}
          1. Ouvre https://equimood.fr dans Chrome.{"\n"}
          2. Appuie sur <Text style={{fontWeight: 'bold'}}>⋮</Text> (3 points en haut à droite).{"\n"}
          3. Choisis <Text style={{fontWeight: 'bold'}}>"Ajouter à l'écran d'accueil"</Text> pour installer l'app.{"\n"}
        </Text>
      </View>

      <View style={{backgroundColor: '#FFF8EE', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#E8D5B0', width: '100%'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#8B6D47', textAlign: 'center', marginBottom: 12}}>🎧 Comment utiliser EquiMood</Text>
        <Text style={{fontSize: 16, color: '#8B6D47', fontWeight: '600', lineHeight: 27, textAlign: 'justify'}}>
          Écoute les audios longs chez toi, avec tes écouteurs, au calme si possible, autant de fois que tu en ressens le besoin.{"\n"}
          Ils t'aident à t'apaiser, t'ancrer et à installer de nouveaux réflexes.{"\n\n"}
          En concours, utilise si tu préfères les formats courts appelés "mantras."{"\n"}
          Quelques mots suffisent à te reconnecter instantanément à ce que tu as déjà intégré, que ce soit en camion, au box ou en attendant ton tour.{"\n\n"}
          Pour renforcer cet ancrage, une petite pierre EquiMood sera bientôt disponible... Un simple regard ou un geste, et tu te reconnecteras à ce que tu as installé.
        </Text>
        <Text style={{fontSize: 15, color: '#C6A45D', fontWeight: 'bold', marginTop: 14, lineHeight: 26, textAlign: 'center'}}>
          💛 Ton calme revient.{"\n"}💛 Ta confiance aussi.
        </Text>
      </View>

      <View style={styles.feedbackBox}>
        <Text style={styles.feedbackTitle}>✨ EquiMood vient de naître !</Text>
        <Text style={styles.feedbackText}>Ton retour compte énormément. Dis-nous ce que tu as aimé, ce que tu aimerais voir évoluer...</Text>
        <Text style={styles.feedbackText}>Et si l'expérience te parle, n'hésite pas à la partager autour de toi et à nous retrouver sur @equimood_officiel pour faire partie de cette belle aventure. ✨</Text>
        <Pressable style={styles.feedbackButton} onPress={() => Linking.openURL('https://www.instagram.com/equimood_officiel')}>
          <Ionicons name="logo-instagram" size={18} color="#FEFBF7" style={{marginRight: 8}} />
          <Text style={styles.feedbackButtonText}>Instagram — @equimood_officiel</Text>
        </Pressable>
        <Pressable style={styles.feedbackButton} onPress={() => Linking.openURL('https://www.tiktok.com/@equimood_officiel')}>
          <Ionicons name="logo-tiktok" size={18} color="#FEFBF7" style={{marginRight: 8}} />
          <Text style={styles.feedbackButtonText}>TikTok — @equimood_officiel</Text>
        </Pressable>
        <Pressable style={[styles.feedbackButton, styles.feedbackButtonAlt]} onPress={() => Linking.openURL('mailto:equimood.app@gmail.com?subject=Mon retour sur EquiMood')}>
          <Text style={styles.feedbackButtonText}>✉️ Nous écrire par email</Text>
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
    paddingTop: 16,
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
    fontSize: 15,
    color: '#8B6D47',
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 12,
    lineHeight: 22,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B6D47',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
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
