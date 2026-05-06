import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EquiMoodAboutScreen() {
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
          <Text style={styles.titleFull}>Qui est Madame <Text style={styles.titleAccent}>EquiMood ?</Text></Text>
        </View>

        <View style={styles.divider} />

        {/* Texte */}
        <Text style={styles.intro}>
          Bonjour, et merci d'être arrivée jusqu'à moi.{'\n'}Laisse-moi te raconter qui je suis — et d'où vient EquiMood.
        </Text>
        <Text style={styles.bodyText}>
          ✦ Je suis mère de famille, cavalière amateur éclairée et passionnée depuis toujours par la psychologie, les émotions et le mental. Après des études de psychologie, j'ai continué à explorer toute ma vie ce qui influence la confiance, le stress, la concentration et notre façon d'avancer.
        </Text>
        <Text style={styles.bodyText}>
          ✦ À cheval, je me suis moi-même confrontée à toutes ces questions : la peur de mal faire, le regard des autres, la pression du résultat, la perte de confiance… mais aussi cette sensation unique où tout s'aligne enfin entre soi et son cheval. J'ai concouru jusqu'à 1m25, un niveau qui demande déjà un vrai engagement mental, émotionnel et technique.
        </Text>
        <Text style={styles.bodyText}>
          ✦ En parallèle, je suis comédienne depuis plus de 25 ans, avec un parcours sur scène, à la télé, en voix off et en doublage. La maîtrise de la voix, la respiration, la présence, la gestion du stress et des émotions font partie intégrante de mon métier depuis des années.
        </Text>
        <View style={styles.accentBox}>
          <Text style={styles.accentText}>EquiMood est né de tout cela.</Text>
          <Text style={styles.accentBodyText}>
            J'ai construit ces audios à partir de ce que j'aurais moi-même eu besoin d'entendre dans certains moments clés de ma vie de cavalière… ou ma vie tout court.
          </Text>
        </View>
        <Text style={styles.bodyText}>
          Mon objectif avec EquiMood est simple : proposer des outils concrets, humains et profondément rassurants, pensés par quelqu'un qui connaît réellement ce que vivent les cavalières.
        </Text>
        <Text style={styles.closing}>
          Et surtout te rappeler une chose essentielle :{'\n'}
          ton cheval ne te demande pas d'être parfaite.{'\n'}
          Il a simplement besoin que tu sois présente, alignée… et avec lui.{'\n\n'}
          Car n'oublie pas que tout ce que tu ressens, il le reflète.
        </Text>

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
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#8B6D47',
  },
  titleFull: {
    fontSize: 22,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#8B6D47',
    textAlign: 'center',
  },
  titleAccent: {
    fontSize: 22,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#C6A45D',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#E8D5B0',
    marginBottom: 24,
    borderRadius: 2,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 27,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    marginBottom: 18,
  },
  intro: {
    fontSize: 16,
    lineHeight: 27,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    marginBottom: 22,
  },
  accentBodyText: {
    fontSize: 15,
    lineHeight: 25,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    marginBottom: 0,
  },
  accentBox: {
    backgroundColor: '#FFF8EE',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5B0',
    padding: 18,
    marginBottom: 18,
  },
  accentText: {
    fontSize: 17,
    color: '#A8782A',
    fontFamily: 'Lato_400Regular',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  closing: {
    fontSize: 16,
    lineHeight: 28,
    color: '#A8782A',
    fontFamily: 'Lato_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});
