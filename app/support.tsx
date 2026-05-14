import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SupportScreen() {
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:equimood.app@gmail.com?subject=Support EquiMood');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Bouton retour */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Retour</Text>
        </Pressable>

        {/* Titre */}
        <View style={styles.titleBlock}>
          <Text style={styles.titleFull}>Support <Text style={styles.titleAccent}>EquiMood</Text></Text>
        </View>

        <View style={styles.divider} />

        {/* Introduction */}
        <Text style={styles.intro}>
          Bienvenue sur la page d'assistance d'EquiMood.{'\n'}
          Notre équipe est là pour t'aider et répondre à toutes tes questions.
        </Text>

        {/* Section Contact */}
        <Text style={styles.sectionTitle}>Nous contacter</Text>

        <View style={styles.accentBox}>
          <Text style={styles.accentText}>
            Une question, une suggestion ou un problème technique ?{'\n'}
            Nous te répondons sous 48h ouvrées.
          </Text>
          <Pressable onPress={handleEmailPress} style={styles.emailButton}>
            <Text style={styles.emailButtonText}>📧 equimood.app@gmail.com</Text>
          </Pressable>
        </View>

        {/* Section FAQ */}
        <Text style={styles.sectionTitle}>Foire aux questions</Text>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>✦ Qu'est-ce qu'EquiMood ?</Text>
          <Text style={styles.faqAnswer}>
            EquiMood est une application de coaching mental dédiée aux cavalières.
            Elle propose des audios guidés pour t'accompagner avant, pendant et après tes séances équestres,
            et t'aider à cultiver confiance, sérénité et alignement avec ton cheval.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>✦ Comment créer un compte ?</Text>
          <Text style={styles.faqAnswer}>
            Ouvre l'application et suis les indications à l'écran. Tu peux te créer un compte en quelques secondes
            avec ton adresse email pour accéder à l'ensemble des contenus.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>✦ J'ai oublié mon mot de passe</Text>
          <Text style={styles.faqAnswer}>
            Sur l'écran de connexion, clique sur "Mot de passe oublié" et suis la procédure
            pour le réinitialiser via ton adresse email.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>✦ Comment supprimer mon compte ?</Text>
          <Text style={styles.faqAnswer}>
            Pour supprimer définitivement ton compte et toutes tes données associées,
            envoie un email à equimood.app@gmail.com avec pour objet "Suppression de compte".
            Ta demande sera traitée sous 48h.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>✦ Sur quels appareils EquiMood est-elle disponible ?</Text>
          <Text style={styles.faqAnswer}>
            EquiMood est disponible sur iPhone (iOS 14 et versions ultérieures).
            Une version Android est prévue prochainement.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>✦ Mes données sont-elles sécurisées ?</Text>
          <Text style={styles.faqAnswer}>
            Oui, nous attachons une grande importance à la confidentialité et à la sécurité de tes données.
            Aucune information personnelle n'est partagée avec des tiers à des fins commerciales.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>✦ Signaler un bug ou un problème technique</Text>
          <Text style={styles.faqAnswer}>
            Si tu rencontres un souci avec l'application, envoie-nous un email en précisant :{'\n'}
            • Le modèle de ton iPhone{'\n'}
            • La version d'iOS{'\n'}
            • Une description du problème{'\n'}
            • Une capture d'écran si possible
          </Text>
        </View>

        {/* Closing */}
        <Text style={styles.closing}>
          Merci de faire partie de la communauté EquiMood.{'\n'}
          Nous sommes là pour t'accompagner sur ton chemin.
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
    alignSelf: 'flex-start',
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
  intro: {
    fontSize: 16,
    lineHeight: 27,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    marginBottom: 28,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#8B6D47',
    marginBottom: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  accentBox: {
    backgroundColor: '#FFF8EE',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5B0',
    padding: 18,
    marginBottom: 28,
  },
  accentText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginBottom: 14,
  },
  emailButton: {
    backgroundColor: '#C6A45D',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  emailButtonText: {
    fontSize: 15,
    color: '#FFFCF7',
    fontFamily: 'Lato_700Bold',
  },
  faqItem: {
    marginBottom: 22,
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontFamily: 'Lato_700Bold',
    color: '#A8782A',
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  faqAnswer: {
    fontSize: 15,
    lineHeight: 25,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
  },
  closing: {
    fontSize: 16,
    lineHeight: 28,
    color: '#A8782A',
    fontFamily: 'Lato_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});