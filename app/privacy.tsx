import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:equimood.app@gmail.com?subject=Politique de confidentialité - EquiMood');
  };

  const handleHomePress = () => {
    if (Platform.OS === 'web') {
      window.location.href = 'https://equimood.fr';
    } else {
      router.push('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Bouton Accueil */}
        <Pressable onPress={handleHomePress} style={styles.homeButton}>
          <Text style={styles.homeText}>🏠 Accueil</Text>
        </Pressable>

        {/* Titre */}
        <View style={styles.titleBlock}>
          <Text style={styles.titleFull}>Politique de <Text style={styles.titleAccent}>confidentialité</Text></Text>
        </View>

        <View style={styles.divider} />

        {/* Dernière mise à jour */}
        <Text style={styles.lastUpdate}>Dernière mise à jour : 14 mai 2026</Text>

        {/* Introduction */}
        <Text style={styles.intro}>
          Chez EquiMood, nous attachons une grande importance à la confidentialité et à la sécurité de tes données personnelles.
          Cette politique explique de manière transparente comment notre application gère tes informations.
        </Text>

        {/* Section 1 */}
        <Text style={styles.sectionTitle}>1. Données collectées</Text>
        <Text style={styles.bodyText}>
          EquiMood est conçue pour être utilisée sans création de compte.{'\n\n'}
          L'application ne collecte aucune donnée personnelle te concernant : pas de nom, d'adresse e-mail, de numéro de téléphone, ni de mot de passe.{'\n\n'}
          Aucune donnée n'est envoyée à des serveurs distants ni partagée avec des tiers.
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>2. Données stockées localement</Text>
        <Text style={styles.bodyText}>
          Certaines préférences (comme l'affichage de la fenêtre de bienvenue, ou une éventuelle photo que tu choisirais d'ajouter dans ton profil) sont stockées <Text style={styles.italic}>uniquement sur ton iPhone</Text>, dans la mémoire de l'application.{'\n\n'}
          Ces informations ne quittent jamais ton appareil. Elles sont automatiquement supprimées si tu désinstalles l'application.
        </Text>

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>3. Accès à tes photos</Text>
        <Text style={styles.bodyText}>
          L'application peut te demander l'accès à tes photos si tu souhaites personnaliser ton profil avec une image.{'\n\n'}
          Cet accès est <Text style={styles.italic}>strictement optionnel</Text>. Si tu refuses, l'application fonctionne normalement.{'\n\n'}
          Si tu sélectionnes une photo, elle reste stockée uniquement sur ton iPhone. Elle n'est jamais envoyée, partagée ou sauvegardée ailleurs.
        </Text>

        {/* Section 4 */}
        <Text style={styles.sectionTitle}>4. Contenus audio</Text>
        <Text style={styles.bodyText}>
          Tous les audios proposés par EquiMood sont intégrés directement à l'application et lus localement depuis ton iPhone.{'\n\n'}
          Aucun enregistrement de tes écoutes, de tes habitudes ou de tes interactions avec les audios n'est effectué.
        </Text>

        {/* Section 5 */}
        <Text style={styles.sectionTitle}>5. Mises à jour de l'application</Text>
        <Text style={styles.bodyText}>
          EquiMood utilise le service Expo Updates pour distribuer les mises à jour de l'application.{'\n\n'}
          Lors d'une vérification de mise à jour, des informations techniques anonymes peuvent être échangées avec les serveurs d'Expo (version de l'application, modèle d'appareil, version d'iOS). Ces informations sont strictement techniques et ne permettent pas de t'identifier.{'\n\n'}
          Pour en savoir plus, consulte la politique de confidentialité d'Expo : <Text style={styles.link} onPress={() => Linking.openURL('https://expo.dev/privacy')}>https://expo.dev/privacy</Text>
        </Text>

        {/* Section 6 */}
        <Text style={styles.sectionTitle}>6. Publicité et tracking</Text>
        <Text style={styles.bodyText}>
          EquiMood ne contient <Text style={styles.italic}>aucune publicité</Text>, aucun traceur tiers, aucun système d'analyse comportementale (analytics).{'\n\n'}
          Tes habitudes d'utilisation ne sont ni mesurées, ni transmises, ni revendues.
        </Text>

        {/* Section 7 */}
        <Text style={styles.sectionTitle}>7. Achats intégrés</Text>
        <Text style={styles.bodyText}>
          EquiMood est une application <Text style={styles.italic}>100% gratuite</Text>. Elle ne contient aucun achat intégré, aucun abonnement, aucune transaction.
        </Text>

        {/* Section 8 */}
        <Text style={styles.sectionTitle}>8. Tes droits (RGPD)</Text>
        <Text style={styles.bodyText}>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi suisse sur la protection des données (LPD), tu disposes des droits suivants :{'\n\n'}
          • Droit d'accès aux données te concernant{'\n'}
          • Droit de rectification{'\n'}
          • Droit à l'effacement{'\n'}
          • Droit à la portabilité{'\n'}
          • Droit d'opposition au traitement{'\n\n'}
          Comme EquiMood ne collecte aucune donnée personnelle te concernant, ces droits sont automatiquement respectés. Pour toute question, tu peux nous contacter à l'adresse indiquée ci-dessous.
        </Text>

        {/* Section 9 */}
        <Text style={styles.sectionTitle}>9. Sécurité</Text>
        <Text style={styles.bodyText}>
          Toutes les données utilisées par l'application restent stockées localement sur ton iPhone, dans un espace sécurisé géré par iOS.{'\n\n'}
          Aucun transfert vers l'extérieur n'est effectué.
        </Text>

        {/* Section 10 */}
        <Text style={styles.sectionTitle}>10. Enfants et adolescents</Text>
        <Text style={styles.bodyText}>
          L’application EquiMood est accessible aux personnes majeures ainsi qu’aux mineurs âgés d’au moins 15 ans. Lorsque la législation applicable l’exige, l’utilisation par un mineur suppose l’autorisation préalable de son représentant légal.{'\n\n'}
          EquiMood propose des contenus audios de préparation mentale et de bien-être destinés principalement au monde équestre. L’application s’adresse prioritairement à un public adulte, mais peut également être utilisée par des mineurs disposant de la maturité nécessaire à cet usage, sous la responsabilité de leurs représentants légaux.{'\n\n'}
          Les représentants légaux sont invités à s’assurer que l’utilisation de l’application est adaptée à l’âge, à la sensibilité et aux besoins du mineur.{'\n\n'}
          Le mineur utilisateur déclare disposer de l’autorisation de son représentant légal, l’éditeur ne pouvant en vérifier systématiquement la réalité.{'\n\n'}
          EquiMood ne propose aucun contenu à caractère médical, psychologique ou thérapeutique et ne se substitue en aucun cas à un accompagnement médical, psychologique ou professionnel adapté.{'\n\n'}
          Les éventuels traitements de données liés au fonctionnement technique de l’application, aux abonnements ou aux statistiques d’utilisation sont encadrés conformément à la politique de confidentialité applicable.{'\n\n'}
        </Text>

        {/* Section 11 */}
        <Text style={styles.sectionTitle}>11. Modifications</Text>
        <Text style={styles.bodyText}>
          Cette politique peut être amenée à évoluer. Toute modification importante sera signalée dans l'application et publiée sur cette page.{'\n\n'}
          La date de dernière mise à jour est indiquée en haut de cette page.
        </Text>

        {/* Section 12 */}
        <Text style={styles.sectionTitle}>12. Nous contacter</Text>
        <Text style={styles.bodyText}>
          Pour toute question concernant cette politique de confidentialité ou le traitement de tes données, tu peux nous joindre par e-mail :
        </Text>
        <Pressable onPress={handleEmailPress} style={styles.emailButton}>
          <Text style={styles.emailButtonText}>📧 equimood.app@gmail.com</Text>
        </Pressable>

        {/* Closing */}
        <Text style={styles.closing}>
          Merci de faire confiance à EquiMood.{'\n'}
          Ta sérénité est notre priorité.
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
  homeButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  homeText: {
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
    marginBottom: 18,
    borderRadius: 2,
  },
  lastUpdate: {
    fontSize: 13,
    fontFamily: 'Lato_400Regular',
    color: '#8B6D47',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
  },
  intro: {
    fontSize: 15,
    lineHeight: 25,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#A8782A',
    marginBottom: 10,
    marginTop: 18,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#6B4D27',
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  italic: {
    fontStyle: 'italic',
    color: '#A8782A',
  },
  link: {
    color: '#C6A45D',
    fontFamily: 'Lato_700Bold',
    textDecorationLine: 'underline',
  },
  emailButton: {
    backgroundColor: '#C6A45D',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  emailButtonText: {
    fontSize: 15,
    color: '#FFFCF7',
    fontFamily: 'Lato_700Bold',
  },
  closing: {
    fontSize: 15,
    lineHeight: 26,
    color: '#A8782A',
    fontFamily: 'Lato_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 28,
  },
});