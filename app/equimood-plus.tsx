import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EquiMoodPlusScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Bouton retour */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Retour</Text>
        </Pressable>

        {/* Titre */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>EquiMood </Text>
          <Text style={styles.titlePlus}>PLUS</Text>
        </View>
        <Text style={styles.subtitle}>Un audio créé spécialement pour toi.</Text>

        {/* Séparateur */}
        <View style={styles.divider} />

        {/* Paragraphe 1 */}
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🎤</Text>
          <Text style={styles.cardText}>
            Avec <Text style={styles.accent}>EquiMood PLUS</Text>, je crée pour toi un module audio entièrement personnalisé, pensé à partir de ton histoire, de ton cheval, de tes ressentis et de ce que tu traverses aujourd'hui.
          </Text>
        </View>

        {/* Paragraphe 2 */}
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>💬</Text>
          <Text style={styles.cardText}>
            Avant l'enregistrement, tu peux m'expliquer ta problématique <Text style={styles.accent}>par écrit ou lors d'un échange téléphonique</Text> : stress, perte de confiance, peur du regard des autres, blocage en concours, difficulté après une chute… ou simplement besoin de retrouver du calme et du plaisir à cheval.
          </Text>
        </View>

        {/* Paragraphe 3 */}
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>💛</Text>
          <Text style={styles.cardText}>
            Je prends le temps de comprendre ton univers, ton fonctionnement, ton lien avec ton cheval et ce que tu aurais besoin d'entendre dans certains moments clés.
          </Text>
        </View>

        {/* Paragraphe 4 — encart premium */}
        <View style={styles.premiumBox}>
          <Text style={styles.premiumText}>
            Chaque audio est ensuite écrit et enregistré <Text style={styles.premiumAccent}>spécialement pour toi</Text>, puis envoyé directement de façon privée.
          </Text>
          <Text style={[styles.premiumText, { marginTop: 14 }]}>
            Ce n'est pas un module standard : c'est un <Text style={styles.premiumAccent}>accompagnement unique, humain</Text>, qui n'appartiendra qu'à toi.
          </Text>
          <Text style={styles.premiumSignature}>Madame EquiMood <Text style={{ fontWeight: 'bold' }}>♡</Text></Text>
        </View>

        <Pressable onPress={() => router.push('/equimood-about' as any)} style={styles.aboutLink}>
          <Text style={styles.aboutLinkText}>Qui est Madame EquiMood ?</Text>
        </Pressable>

      </ScrollView>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 15,
    color: '#A8782A',
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#8B6D47',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  titlePlus: {
    fontSize: 34,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#C6A45D',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    color: '#A8782A',
    marginBottom: 24,
    textAlign: 'center',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#E8D5B0',
    marginBottom: 24,
    borderRadius: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
  },
  cardEmoji: {
    fontSize: 22,
    marginTop: 2,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: '#6B4D27',
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  accent: {
    color: '#A8782A',
    fontStyle: 'italic',
  },
  premiumBox: {
    backgroundColor: '#FFF8EE',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#C6A45D',
    padding: 22,
    marginTop: 8,
  },
  premiumText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#6B4D27',
    fontFamily: 'PlayfairDisplay_700Bold',
    textAlign: 'center',
  },
  premiumAccent: {
    color: '#A8782A',
    fontStyle: 'italic',
  },
  premiumSignature: {
    marginTop: 18,
    fontSize: 17,
    color: '#A8782A',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  aboutLink: {
    marginTop: 24,
    alignSelf: 'flex-end',
  },
  aboutLinkText: {
    fontSize: 13,
    color: '#A8782A',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    opacity: 0.75,
  },
});
