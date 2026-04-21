import AudioPlayer from '@/components/AudioPlayer';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Module = {
  id: number;
  title: string;
  duration: string;
  available: boolean;
  type?: 'audio' | 'video';
};

type Category = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  modules: Module[];
};

// 1. CONFIANCE
const confianceModules: Module[] = [
  { id: 1, title: 'Confiance profonde', duration: '', available: false, type: 'audio' },
  { id: 2, title: 'Se sentir légitime', duration: '', available: true, type: 'audio' },
  { id: 3, title: 'Reprendre confiance après une mauvaise séance', duration: '', available: false, type: 'audio' },
  { id: 4, title: 'Reprendre confiance dans une période de vide', duration: '', available: true, type: 'audio' },
];

// 2. STRESS & BLOCAGES
const stressModules: Module[] = [
  { id: 5, title: 'Stress avant une séance', duration: '', available: false, type: 'audio' },
  { id: 7, title: 'Le regard des autres', duration: '', available: true, type: 'audio' },
  { id: 8, title: 'La peur de décevoir', duration: '', available: true, type: 'audio' },
  { id: 9, title: 'Passer à un autre cheval', duration: '', available: true, type: 'audio' },
];

// 3. CONCENTRATION
const concentrationModules: Module[] = [
  { id: 6, title: 'Pensées parasites', duration: '', available: true, type: 'audio' },
  { id: 10, title: 'Rester dans l\'instant présent', duration: '', available: false, type: 'audio' },
  { id: 11, title: 'Se focaliser sur la technique', duration: '', available: false, type: 'audio' },
  { id: 12, title: 'Aller au bout de son idée', duration: '', available: false, type: 'audio' },
  { id: 13, title: 'Se recentrer rapidement', duration: '', available: false, type: 'audio' },
];

const categories: Category[] = [
  {
    id: 'confiance',
    title: 'Confiance',
    emoji: '✨',
    color: '#8B6D47',
    description: 'Je renforce ma base mentale, ma valeur et la qualité de mon lien avec mon cheval.',
    modules: confianceModules,
  },
  {
    id: 'stress',
    title: 'Stress & Blocages',
    emoji: '🧘‍♀️',
    color: '#8B6D47',
    description: 'Je me libère de ce qui me pèse, je me calme, je respire.',
    modules: stressModules,
  },
  {
    id: 'concentration',
    title: 'Concentration',
    emoji: '🎯',
    color: '#8B6D47',
    description: 'Je reste focalisée, présente et connectée à mon cheval.',
    modules: concentrationModules,
  },
];

export default function QuotidienScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = React.useState(false);
  const [currentModule, setCurrentModule] = React.useState<{ title: string; audioFile: any } | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Charger la photo utilisateur au démarrage
  useEffect(() => {
    loadUserPhoto();
  }, []);

  const loadUserPhoto = async () => {
    try {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        const profile = JSON.parse(data);
        console.log('Photo chargée:', profile.photo ? 'OUI' : 'NON');
        setUserPhoto(profile.photo || null);
      } else {
        console.log('Pas de profil sauvegardé');
      }
    } catch (error) {
      console.error('Erreur chargement photo:', error);
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleModulePress = (moduleId: number, moduleTitle: string) => {
    // Module 2 : "Se sentir légitime"
    if (moduleId === 2) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/se_sentir_legitime.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 4 : "Reprendre confiance dans une période de vide"
    else if (moduleId === 4) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/reprendre_confiance_periode_vide.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 6 : "Pensées parasites"
    else if (moduleId === 6) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/pensees_parasites.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 7 : "Le regard des autres"
    else if (moduleId === 7) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/le_regard_des_autres.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 8 : "La peur de décevoir"
    else if (moduleId === 8) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/peur_de_decevoir.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 9 : "Passer à un autre cheval"
    else if (moduleId === 9) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/passer_a_un_autre_cheval.mp3'),
      });
      setIsPlayerVisible(true);
    } else {
      console.log('Module sélectionné:', moduleTitle);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image 
            source={require('@/assets/images/logo_alamaison.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>À la maison</Text>
          <Text style={styles.headerSubtitle}>
            Je me prépare, je me stabilise, je prends soin de moi et de mon cheval.
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <View key={category.id}>
              <Pressable
                style={({ pressed }) => [
                  styles.categoryCard,
                  { borderLeftColor: category.color },
                  pressed && styles.cardPressed,
                  selectedCategory === category.id && styles.categoryCardActive,
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}20` }]}>
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  </View>
                  <View style={styles.categoryContent}>
                    <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                  </View>
                  <Ionicons 
                    name={selectedCategory === category.id ? 'chevron-up' : 'chevron-down'} 
                    size={24} 
                    color={category.color} 
                  />
                </View>
              </Pressable>

              {selectedCategory === category.id && (
                <View style={styles.modulesContainer}>
                  {category.modules.map((module) => (
                    <Pressable
                      key={module.id}
                      style={({ pressed }) => [
                        styles.moduleCard,
                        pressed && styles.cardPressed,
                      ]}
                      onPress={() => handleModulePress(module.id, module.title)}
                    >
                      <View style={styles.moduleContent}>
                        <Text style={styles.moduleTitle}>{module.title}</Text>
                        <View style={styles.badgesRow}>
                          <View style={styles.typeBadge}>
                            <Ionicons 
                              name={module.type === 'video' ? 'videocam' : 'headset'} 
                              size={14} 
                              color="#C9A86A" 
                            />
                            <Text style={styles.typeText}>
                              {module.type === 'video' ? 'Vidéo' : 'Audio'}
                            </Text>
                          </View>
                          <View style={[styles.availabilityBadge, module.available ? styles.badgeAvailable : styles.badgeComingSoon]}>
                            <Text style={[styles.availabilityText, module.available ? styles.textAvailable : styles.textComingSoon]}>
                              {module.available ? 'Disponible' : 'À venir'}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Ionicons name="play-circle" size={32} color={category.color} />
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Lecteur Audio Modal */}
      {currentModule && (
        <Modal
          visible={isPlayerVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsPlayerVisible(false)}
        >
          <AudioPlayer
            audioFile={currentModule.audioFile}
            title={currentModule.title}
            onClose={() => setIsPlayerVisible(false)}
          />
        </Modal>
      )}
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
    padding: Spacing.lg,
    paddingBottom: Spacing.xl * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: Spacing.md,
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    ...Typography.titleBold,
    fontSize: 28,
    color: Colors.light.text,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    ...Typography.body,
    fontSize: 15,
    color: Colors.light.textLight,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    fontStyle: 'italic',
  },
  categoriesContainer: {
    gap: Spacing.lg,
  },
  categoryCard: {
    backgroundColor: Colors.light.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.soft,
    borderLeftWidth: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardActive: {
    borderColor: '#C9A86A',
    ...Shadows.medium,
  },
  cardPressed: {
    opacity: 0.7,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    ...Typography.bodyBold,
    fontSize: 18,
    marginBottom: 4,
  },
  categoryDescription: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.light.textLight,
    fontStyle: 'italic',
  },
  modulesContainer: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingLeft: Spacing.lg,
  },
  moduleCard: {
    backgroundColor: '#FFFCF7',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E5D8',
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    ...Typography.body,
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  moduleDuration: {
    ...Typography.caption,
    color: Colors.light.textLight,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#FFF3E0',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C9A86A',
    letterSpacing: 0.3,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeAvailable: {
    backgroundColor: '#E8F5E9',
  },
  badgeComingSoon: {
    backgroundColor: '#F5F5F5',
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  textAvailable: {
    color: '#2E7D32',
  },
  textComingSoon: {
    color: '#9E9E9E',
  },
  modalContainer: {
    flex: 1,
  },
  audioBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.4,
    zIndex: 0,
  },
  audioPlayerContainer: {
    flex: 1,
    zIndex: 1,
  },
});
