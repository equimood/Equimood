import AudioPlayer from '@/components/AudioPlayer';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Module = {
  id: number;
  title: string;
  duration: string;
  voice?: string;
  available: boolean;
  type?: 'audio' | 'video';
};

type SubCategory = {
  id: string;
  title: string;
  modules: Module[];
};

type MainPhase = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  subCategories?: SubCategory[];
  modules?: Module[];
};

// ========== AVANT - Modules directs ==========
const avantModules: Module[] = [
  { id: 1, title: 'Changer son regard', duration: '', available: true, type: 'audio' },
  { id: 2, title: 'Reprendre confiance - Mantra', duration: '', available: true, type: 'audio' },
  { id: 4, title: 'Concentration avant le concours', duration: '', available: true, type: 'audio' },
  { id: 3, title: 'La peur de décevoir - Mantra', duration: '', available: true, type: 'audio' },
];

// ========== PENDANT ==========
const pendantModules: Module[] = [
  { id: 8, title: 'Après un refus — rebond immédiat', duration: '', available: false, type: 'audio' },
  { id: 9, title: 'Se remettre dedans après une erreur', duration: '', available: false, type: 'audio' },
  { id: 11, title: 'Recentrage express entre deux passages', duration: '', available: false, type: 'audio' },
];

// ========== APRÈS ==========
const apresModules: Module[] = [
  { id: 12, title: 'Débrief émotionnel', duration: '', available: false, type: 'audio' },
  { id: 14, title: 'Se féliciter — renforcer la confiance', duration: '', available: false, type: 'audio' },
  { id: 15, title: 'Lâcher la déception', duration: '', available: false, type: 'audio' },
];

const phases: MainPhase[] = [
  {
    id: 'avant',
    title: 'Avant',
    emoji: '🎯',
    color: '#8B6D47',
    description: 'Prépare-toi avant la détente, avant la piste',
    modules: avantModules,
  },
  {
    id: 'pendant',
    title: 'Pendant',
    emoji: '⚡',
    color: '#8B6D47',
    description: 'Modules ultra courts en pleine action',
    modules: pendantModules,
  },
  {
    id: 'apres',
    title: 'Après',
    emoji: '💫',
    color: '#8B6D47',
    description: 'Débrief, apprentissage et retour au calme',
    modules: apresModules,
  },
];

export default function CompetitionScreen() {
  const [selectedPhase, setSelectedPhase] = React.useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<string | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = React.useState(false);

  const renderTitle = (title: string) => {
    if (title.includes(' - Mantra')) {
      const parts = title.split(' - Mantra');
      return (
        <Text style={styles.moduleTitle}>
          {parts[0]}
          <Text style={{ fontWeight: 'bold' }}> — Mantra</Text>
        </Text>
      );
    }
    return <Text style={styles.moduleTitle}>{title}</Text>;
  };
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
        console.log('Photo chargée (moments):', profile.photo ? 'OUI' : 'NON');
        setUserPhoto(profile.photo || null);
      } else {
        console.log('Pas de profil sauvegardé (moments)');
      }
    } catch (error) {
      console.error('Erreur chargement photo:', error);
    }
  };

  const handlePhasePress = (phaseId: string) => {
    if (selectedPhase === phaseId) {
      setSelectedPhase(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedPhase(phaseId);
      setSelectedSubCategory(null);
    }
  };

  const handleSubCategoryPress = (subCategoryId: string) => {
    setSelectedSubCategory(selectedSubCategory === subCategoryId ? null : subCategoryId);
  };

  const handleModulePress = (moduleId: number, moduleTitle: string) => {
    // Module 1 : "Changer son regard"
    if (moduleId === 1) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/changer_son_regard_confiance.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 2 : "Reprendre confiance - Mantra"
    else if (moduleId === 2) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/reprendre_confiance_mantra.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 3 : "La peur de décevoir - Mantra"
    else if (moduleId === 3) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/peur_de_decevoir_mantra.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 4 : "Concentration avant le concours"
    else if (moduleId === 4) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/concentration_avant_concours.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // Module 5 : "Concentration express pendant un concours"
    else if (moduleId === 5) {
      setCurrentModule({
        title: moduleTitle,
        audioFile: require('@/assets/audio/concentration_express_pendant.mp3'),
      });
      setIsPlayerVisible(true);
    }
    // ...existing code...
    else {
      console.log('Module sélectionné:', moduleTitle);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🏆</Text>
          <Text style={styles.headerTitle}>En concours</Text>
          <Text style={styles.headerSubtitle}>
            Accompagnement mental avant, pendant et après le concours
          </Text>
        </View>

        <View style={styles.phasesContainer}>
          {phases.map((phase) => (
            <View key={phase.id}>
              <Pressable
                style={({ pressed }) => [
                  styles.phaseCard,
                  { borderLeftColor: phase.color },
                  pressed && styles.cardPressed,
                  selectedPhase === phase.id && styles.phaseCardActive,
                ]}
                onPress={() => handlePhasePress(phase.id)}
              >
                <View style={styles.phaseHeader}>
                  <View style={[styles.phaseIconContainer, { backgroundColor: `${phase.color}20` }]}>
                    <Text style={styles.phaseEmoji}>{phase.emoji}</Text>
                  </View>
                  <View style={styles.phaseContent}>
                    <Text style={[styles.phaseTitle, { color: phase.color }]}>{phase.title}</Text>
                    <Text style={styles.phaseDescription}>{phase.description}</Text>
                  </View>
                  <Ionicons 
                    name={selectedPhase === phase.id ? 'chevron-up' : 'chevron-down'} 
                    size={24} 
                    color={phase.color} 
                  />
                </View>
              </Pressable>

              {selectedPhase === phase.id && (
                <View style={styles.expandedContent}>
                  {/* Si la phase a des sous-catégories (AVANT) */}
                  {phase.subCategories && phase.subCategories.map((subCategory) => (
                    <View key={subCategory.id}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.subCategoryCard,
                          pressed && styles.cardPressed,
                          selectedSubCategory === subCategory.id && styles.subCategoryCardActive,
                        ]}
                        onPress={() => handleSubCategoryPress(subCategory.id)}
                      >
                        <Text style={styles.subCategoryTitle}>{subCategory.title}</Text>
                        <Ionicons 
                          name={selectedSubCategory === subCategory.id ? 'remove' : 'add'} 
                          size={20} 
                          color={phase.color} 
                        />
                      </Pressable>

                      {selectedSubCategory === subCategory.id && (
                        <View style={styles.modulesContainer}>
                          {subCategory.modules.map((module) => (
                            <Pressable
                              key={module.id}
                              style={({ pressed }) => [
                                styles.moduleCard,
                                pressed && styles.cardPressed,
                              ]}
                              onPress={() => handleModulePress(module.id, module.title)}
                            >
                              <View style={styles.moduleContent}>
                                {renderTitle(module.title)}
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
                              <Ionicons name="play-circle" size={32} color={phase.color} />
                            </Pressable>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}

                  {/* Si la phase a des modules directs (PENDANT et APRÈS) */}
                  {phase.modules && (
                    <View style={styles.modulesContainer}>
                      {phase.modules.map((module) => (
                        <Pressable
                          key={module.id}
                          style={({ pressed }) => [
                            styles.moduleCard,
                            pressed && styles.cardPressed,
                          ]}
                          onPress={() => handleModulePress(module.id, module.title)}
                        >
                          <View style={styles.moduleContent}>
                            {renderTitle(module.title)}
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
                          <Ionicons name="play-circle" size={32} color={phase.color} />
                        </Pressable>
                      ))}
                    </View>
                  )}
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
  headerEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    ...Typography.titleBold,
    fontSize: 28,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    ...Typography.body,
    fontSize: 15,
    color: Colors.light.textLight,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  phasesContainer: {
    gap: Spacing.lg,
  },
  phaseCard: {
    backgroundColor: Colors.light.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.soft,
    borderLeftWidth: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  phaseCardActive: {
    borderColor: '#C9A86A',
    ...Shadows.medium,
  },
  cardPressed: {
    opacity: 0.7,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  phaseEmoji: {
    fontSize: 28,
  },
  phaseContent: {
    flex: 1,
  },
  phaseTitle: {
    ...Typography.bodyBold,
    fontSize: 20,
    marginBottom: 4,
  },
  phaseDescription: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.light.textLight,
    fontStyle: 'italic',
  },
  expandedContent: {
    marginTop: Spacing.md,
    paddingLeft: Spacing.md,
    gap: Spacing.sm,
  },
  subCategoryCard: {
    backgroundColor: '#FFF8F0',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F0E5D8',
  },
  subCategoryCardActive: {
    backgroundColor: '#FFF0E0',
    borderColor: '#C9A86A',
  },
  subCategoryTitle: {
    ...Typography.bodyBold,
    fontSize: 15,
    color: Colors.light.text,
  },
  modulesContainer: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    paddingLeft: Spacing.md,
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
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  moduleTitle: {
    ...Typography.body,
    fontSize: 15,
    color: Colors.light.text,
    flex: 1,
  },
  voiceIndicator: {
    fontSize: 12,
    opacity: 0.6,
  },
  moduleDuration: {
    ...Typography.caption,
    color: Colors.light.textLight,
    marginTop: 2,
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
