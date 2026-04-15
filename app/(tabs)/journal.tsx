import { Colors, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type JournalEntry = {
  id: string;
  date: Date;
  lieu: 'Maison' | 'Concours';
  intention: string;
  focusTechnique: string[];
  energie: number;
  stress: number;
  confiance: number;
  meilleurMoment?: string;
  amelioration?: string;
  victoire?: string;
  noteGlobale?: number;
  completed: boolean;
};

const focusTechniqueOptions = ['Galop', 'Trajectoire', 'Abord', 'Rythme', 'Regard', 'Position'];

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showApresSeance, setShowApresSeance] = useState(false);
  
  const [lieu, setLieu] = useState<'Maison' | 'Concours'>('Maison');
  const [intention, setIntention] = useState('');
  const [focusTechnique, setFocusTechnique] = useState<string[]>([]);
  const [energie, setEnergie] = useState(5);
  const [stress, setStress] = useState(5);
  const [confiance, setConfiance] = useState(5);
  const [meilleurMoment, setMeilleurMoment] = useState('');
  const [amelioration, setAmelioration] = useState('');
  const [victoire, setVictoire] = useState('');
  const [noteGlobale, setNoteGlobale] = useState(5);

  // Charger la photo du profil
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          // Load user photo
          const photoData = await AsyncStorage.getItem('userProfile');
          if (photoData) {
            const profile = JSON.parse(photoData);
            setUserPhoto(profile.photo || null);
          }
          // Load journal entries
          const entriesData = await AsyncStorage.getItem('journalEntries');
          if (entriesData) {
            const savedEntries = JSON.parse(entriesData);
            const entriesWithDates = savedEntries.map((entry: any) => ({
              ...entry,
              date: new Date(entry.date)
            }));
            setEntries(entriesWithDates);
          }
        } catch (error) {
          console.log('Erreur chargement données:', error);
        }
      };
      loadData();
    }, [])
  );

  const saveEntries = async (newEntries: JournalEntry[]) => {
    try {
      await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
    } catch (error) {
      console.log('Erreur sauvegarde entrées:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const resetForm = () => {
    setLieu('Maison');
    setIntention('');
    setFocusTechnique([]);
    setEnergie(5);
    setStress(5);
    setConfiance(5);
    setMeilleurMoment('');
    setAmelioration('');
    setVictoire('');
    setNoteGlobale(5);
    setShowApresSeance(false);
  };

  const handleNouvelleEntree = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEnregistrerAvant = () => {
    if (!lieu) {
      Alert.alert('Attention', 'Vous devez choisir "À la maison" ou "En concours"');
      return;
    }
    if (focusTechnique.length === 0) {
      Alert.alert('Attention', 'Vous devez sélectionner au moins un focus technique');
      return;
    }
    setShowApresSeance(true);
  };

  const toggleFocusTechnique = (option: string) => {
    if (focusTechnique.includes(option)) {
      setFocusTechnique(focusTechnique.filter(item => item !== option));
    } else {
      setFocusTechnique([...focusTechnique, option]);
    }
  };

  const handleTerminer = () => {
    if (!noteGlobale) {
      Alert.alert('Attention', 'Vous devez donner une note globale');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      lieu,
      intention,
      focusTechnique,
      energie,
      stress,
      confiance,
      meilleurMoment,
      amelioration,
      victoire,
      noteGlobale,
      completed: true,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
    setShowModal(false);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Mon Journal</Text>
          <Text style={styles.subtitle}>Retrace ton évolution, séance après séance.</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {userPhoto && (
            <Image
              source={{ uri: userPhoto }}
              style={styles.profilePhotoHeader}
              resizeMode="cover"
            />
          )}
          <Pressable onPress={handleNouvelleEntree} style={styles.addButton}>
            <Ionicons name="add-circle" size={36} color="#8B6D47" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.listContainer} bounces={false} overScrollMode="never">
        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aucune entrée pour le moment</Text>
            <Text style={styles.emptySubtext}>Appuyez sur + pour créer votre première entrée</Text>
          </View>
        ) : (
          <>
            {entries.slice(0, displayLimit).map(entry => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                  <View style={[styles.badge, entry.lieu === 'Concours' && styles.badgeConcours]}>
                    <Text style={styles.badgeText}>{entry.lieu}</Text>
                  </View>
                </View>
                <Text style={styles.entryNote}>Note: {entry.noteGlobale}/10</Text>
                <Text style={styles.entryFocus}>Focus: {entry.focusTechnique.join(', ')}</Text>
                <Text style={styles.entryIntention} numberOfLines={2}>{entry.intention}</Text>
              </View>
            ))}
            
            {entries.length > displayLimit && (
              <Pressable 
                style={styles.loadMoreButton}
                onPress={() => setDisplayLimit(prev => prev + 10)}
              >
                <Text style={styles.loadMoreText}>Voir plus d'entrées</Text>
                <Ionicons name="chevron-down" size={20} color="#8B6D47" />
              </Pressable>
            )}
          </>
        )}
      </ScrollView>

      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer} edges={['top']}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={28} color="#8B6D47" />
            </Pressable>
            <Text style={styles.modalTitle}>
              {showApresSeance ? 'Après ma séance' : 'Avant ma séance'}
            </Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            {!showApresSeance ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>1️⃣ Aujourd'hui je monte :</Text>
                <View style={styles.checkboxContainer}>
                  <Pressable 
                    style={[styles.checkbox, lieu === 'Maison' && styles.checkboxActive]}
                    onPress={() => setLieu('Maison')}
                  >
                    <Ionicons name={lieu === 'Maison' ? 'checkbox' : 'square-outline'} size={24} color="#8B6D47" />
                    <Text style={styles.checkboxLabel}>À la maison</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.checkbox, lieu === 'Concours' && styles.checkboxActive]}
                    onPress={() => setLieu('Concours')}
                  >
                    <Ionicons name={lieu === 'Concours' ? 'checkbox' : 'square-outline'} size={24} color="#8B6D47" />
                    <Text style={styles.checkboxLabel}>En concours</Text>
                  </Pressable>
                </View>

                <Text style={styles.sectionTitle}>2️⃣ Mon intention du jour</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Ex: Rester calme et concentrée sur mes transitions..."
                  placeholderTextColor="#A69580"
                  value={intention}
                  onChangeText={setIntention}
                  multiline
                  numberOfLines={3}
                />

                <Text style={styles.sectionTitle}>3️⃣ Mon focus technique (plusieurs choix possibles)</Text>
                <View style={styles.optionsGrid}>
                  {focusTechniqueOptions.map(option => (
                    <Pressable
                      key={option}
                      style={[styles.optionButton, focusTechnique.includes(option) && styles.optionButtonActive]}
                      onPress={() => toggleFocusTechnique(option)}
                    >
                      <Text style={[styles.optionText, focusTechnique.includes(option) && styles.optionTextActive]}>
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>4️⃣ Mon état du jour</Text>
                
                <View style={styles.sliderRow}>
                  <Text style={styles.sliderLabel}>Énergie: {energie}/10</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={energie}
                    onValueChange={setEnergie}
                    minimumTrackTintColor="#8B6D47"
                    maximumTrackTintColor="#E5DDD0"
                  />
                </View>

                <View style={styles.sliderRow}>
                  <Text style={styles.sliderLabel}>Stress: {stress}/10</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={stress}
                    onValueChange={setStress}
                    minimumTrackTintColor="#8B6D47"
                    maximumTrackTintColor="#E5DDD0"
                  />
                </View>

                <View style={styles.sliderRow}>
                  <Text style={styles.sliderLabel}>Confiance: {confiance}/10</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={confiance}
                    onValueChange={setConfiance}
                    minimumTrackTintColor="#8B6D47"
                    maximumTrackTintColor="#E5DDD0"
                  />
                </View>

                <Pressable style={styles.saveButton} onPress={handleEnregistrerAvant}>
                  <Text style={styles.saveButtonText}>💾 Enregistrer</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>1️⃣ Ce qui a été le mieux</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Ex: J'ai réussi mes changements de pied..."
                  placeholderTextColor="#A69580"
                  value={meilleurMoment}
                  onChangeText={setMeilleurMoment}
                  multiline
                  numberOfLines={3}
                />

                <Text style={styles.sectionTitle}>2️⃣ Ce que j'améliore la prochaine fois</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Ex: Mieux préparer mes abords..."
                  placeholderTextColor="#A69580"
                  value={amelioration}
                  onChangeText={setAmelioration}
                  multiline
                  numberOfLines={3}
                />

                <Text style={styles.sectionTitle}>3️⃣ Ma victoire du jour</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Ex: J'ai osé sauter plus haut..."
                  placeholderTextColor="#A69580"
                  value={victoire}
                  onChangeText={setVictoire}
                  multiline
                  numberOfLines={3}
                />

                <Text style={styles.sectionTitle}>4️⃣ Note globale de la séance (obligatoire)</Text>
                <View style={styles.noteSelector}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(note => (
                    <Pressable
                      key={note}
                      style={[styles.noteButton, noteGlobale === note && styles.noteButtonActive]}
                      onPress={() => setNoteGlobale(note)}
                    >
                      <Text style={[styles.noteText, noteGlobale === note && styles.noteTextActive]}>
                        {note}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable style={styles.finishButton} onPress={handleTerminer}>
                  <Text style={styles.finishButtonText}>✔ Terminer</Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFCF7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    marginBottom: 8,
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  photoHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhotoHeader: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#D4A5A5',
  },
  mascotteContainer: { alignItems: 'center', marginBottom: 16, marginTop: -20 },
  mascotte: { width: 250, height: 250 },
  profilePhotoLarge: { 
    width: 250, 
    height: 250, 
    borderRadius: 125, 
    borderWidth: 3, 
    borderColor: '#C9A86A'
  },
  headerTextContainer: { alignItems: 'center' },
  title: { 
    ...Typography.titleBold,
    fontSize: 28, 
    color: Colors.light.text, 
    textAlign: 'center', 
    marginBottom: 8 
  },
  subtitle: { fontSize: 15, color: '#8B6D47', fontStyle: 'italic', textAlign: 'center', paddingHorizontal: 20 },
  addButton: { position: 'absolute', top: 8, right: 20 },
  listContainer: { flex: 1, padding: 20 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  emptyText: { fontSize: 20, fontWeight: '700', color: '#8B6D47', marginTop: 16, letterSpacing: -0.3 },
  emptySubtext: { fontSize: 15, color: '#A69580', marginTop: 8, textAlign: 'center' },
  entryCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  entryDate: { fontSize: 17, fontWeight: '700', color: '#2C2416', letterSpacing: -0.2 },
  badge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, backgroundColor: '#E8F5E9' },
  badgeConcours: { backgroundColor: '#FFF3E0' },
  badgeText: { fontSize: 13, fontWeight: '700', color: '#2C2416', letterSpacing: 0.3 },
  entryNote: { fontSize: 18, fontWeight: '800', color: '#8B6D47', marginBottom: 4 },
  entryFocus: { fontSize: 14, color: '#8B6D47', marginBottom: 10, fontWeight: '600', letterSpacing: -0.1 },
  entryIntention: { fontSize: 15, color: '#666', fontStyle: 'italic', lineHeight: 22 },
  modalContainer: { flex: 1, backgroundColor: '#FFFCF7' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5DDD0' },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#2C2416', letterSpacing: -0.4 },
  modalContent: { flex: 1 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: '#2C2416', marginTop: 20, marginBottom: 14, letterSpacing: -0.3 },
  checkboxContainer: { gap: 12 },
  checkbox: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 18, borderRadius: 14, backgroundColor: '#F5F0E8' },
  checkboxActive: { backgroundColor: '#E5DDD0' },
  checkboxLabel: { fontSize: 17, color: '#2C2416', fontWeight: '600', letterSpacing: -0.2 },
  textArea: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, fontSize: 16, color: '#2C2416', borderWidth: 1, borderColor: '#E5DDD0', minHeight: 90, textAlignVertical: 'top', lineHeight: 24 },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  optionButton: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 22, backgroundColor: '#F5F0E8', borderWidth: 2, borderColor: '#E5DDD0' },
  optionButtonActive: { backgroundColor: '#8B6D47', borderColor: '#8B6D47' },
  optionText: { fontSize: 15, fontWeight: '700', color: '#8B6D47', letterSpacing: -0.1 },
  optionTextActive: { color: '#FFFCF7' },
  sliderRow: { marginBottom: 24 },
  sliderLabel: { fontSize: 17, fontWeight: '700', color: '#2C2416', marginBottom: 10, letterSpacing: -0.2 },
  slider: { width: '100%', height: 40 },
  saveButton: { backgroundColor: '#8B6D47', borderRadius: 14, paddingVertical: 18, alignItems: 'center', marginTop: 36, shadowColor: '#8B6D47', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  saveButtonText: { fontSize: 19, fontWeight: '800', color: '#FFFCF7', letterSpacing: 0.5 },
  noteSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  noteButton: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#F5F0E8', borderWidth: 2, borderColor: '#E5DDD0', alignItems: 'center', justifyContent: 'center' },
  noteButtonActive: { backgroundColor: '#8B6D47', borderColor: '#8B6D47' },
  noteText: { fontSize: 20, fontWeight: '800', color: '#8B6D47' },
  noteTextActive: { color: '#FFFCF7' },
  finishButton: { backgroundColor: '#4CAF50', borderRadius: 14, paddingVertical: 18, alignItems: 'center', marginTop: 36, shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  finishButtonText: { fontSize: 19, fontWeight: '800', color: '#FFFCF7', letterSpacing: 0.5 },
  loadMoreButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    backgroundColor: '#F5F0E8', 
    borderRadius: 14, 
    paddingVertical: 16, 
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E5DDD0',
  },
  loadMoreText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#8B6D47', 
    letterSpacing: -0.2 
  },
});
