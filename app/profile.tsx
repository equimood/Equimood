import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const [nomCavaliere, setNomCavaliere] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [discipline, setDiscipline] = useState('');

  // Charger les données sauvegardées
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        const profile = JSON.parse(data);
        setNomCavaliere(profile.nomCavaliere || '');
        setPhoto(profile.photo || null);
        setDiscipline(profile.discipline || '');
      }
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    }
  };

  const saveProfile = async () => {
    try {
      const profile = {
        nomCavaliere,
        photo,
        discipline,
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      Alert.alert('Profil sauvegardé', 'Tes informations ont été enregistrées ✨');
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le profil');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#2C2416" />
        </Pressable>
        <Text style={styles.headerTitle}>Mon profil</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Section unique */}
        <View style={styles.section}>
          <Pressable 
            style={styles.photoButton} 
            onPress={pickImage}
          >
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={40} color="#A69580" />
                <Text style={styles.photoPlaceholderText}>Ajouter une photo avec ton cheval</Text>
              </View>
            )}
          </Pressable>

          <TextInput
            style={styles.input}
            placeholder="Ton prénom"
            placeholderTextColor="#A69580"
            value={nomCavaliere}
            onChangeText={setNomCavaliere}
          />

          <TextInput
            style={styles.input}
            placeholder="Ta discipline (CSO, Dressage, CCE, Loisir...)"
            placeholderTextColor="#A69580"
            value={discipline}
            onChangeText={setDiscipline}
          />
        </View>

        {/* Bouton sauvegarder */}
        <Pressable style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>💾 Sauvegarder</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5DDD0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2416',
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2416',
    marginBottom: 20,
  },
  photoButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#8B6D47',
  },
  photoPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F5F0E8',
    borderWidth: 2,
    borderColor: '#E5DDD0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    fontSize: 13,
    color: '#A69580',
    marginTop: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#2C2416',
    borderWidth: 1,
    borderColor: '#E5DDD0',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#8B6D47',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#8B6D47',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFCF7',
  },
});
