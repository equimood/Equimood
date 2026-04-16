import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const [nomCavaliere, setNomCavaliere] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [discipline, setDiscipline] = useState('');
  const [saving, setSaving] = useState(false);
  const saveScale = useRef(new Animated.Value(1)).current;

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

  const saveProfile = async (photoUri?: string) => {
    try {
      setSaving(true);
      // Animation tap : rétrécit puis revient
      Animated.sequence([
        Animated.timing(saveScale, { toValue: 0.92, duration: 100, useNativeDriver: true }),
        Animated.timing(saveScale, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
      const profile = { nomCavaliere, photo: photoUri ?? photo, discipline };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      Alert.alert('Profil sauvegardé', 'Tes informations ont été enregistrées ✨');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sauvegarder le profil');
    } finally {
      setSaving(false);
    }
  };

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission refusée", "Autorisez l'accès à la galerie.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (!result.canceled && result.assets[0]) {
      const tempUri = result.assets[0].uri;
      try {
        // Sur web (blob: URL) : convertir en base64 via FileReader
        if (tempUri.startsWith('blob:') || tempUri.startsWith('http')) {
          const response = await fetch(tempUri);
          const blob = await response.blob();
          const reader = new FileReader();
          const dataUri = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          setPhoto(dataUri);
          await saveProfile(dataUri);
        // Sur iOS natif (file:// ou ph://) : convertir en base64 via FileSystem
        } else if (tempUri.startsWith('file://') || tempUri.startsWith('ph://')) {
          const base64 = await FileSystem.readAsStringAsync(tempUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const dataUri = `data:image/jpeg;base64,${base64}`;
          setPhoto(dataUri);
          await saveProfile(dataUri);
        } else {
          // Déjà un data URI
          setPhoto(tempUri);
          await saveProfile(tempUri);
        }
      } catch (e) {
        // Fallback
        setPhoto(tempUri);
        await saveProfile(tempUri);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/(tabs)')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#2C2416" />
        </Pressable>
        <Text style={styles.headerTitle}>Mon profil</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Pressable style={styles.photoButton} onPress={pickImage}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={40} color="#A69580" />
                <Text style={styles.photoPlaceholderText}>Ajouter une photo avec ton cheval</Text>
              </View>
            )}
          </Pressable>

          {photo && (
            <Pressable
              style={styles.deletePhotoButton}
              onPress={() => {
                setPhoto(null);
                const profile = { nomCavaliere, photo: null, discipline };
                AsyncStorage.setItem('userProfile', JSON.stringify(profile));
              }}
            >
              <Ionicons name="trash-outline" size={16} color="#A69580" />
              <Text style={styles.deletePhotoText}>Supprimer la photo</Text>
            </Pressable>
          )}

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

        <Animated.View style={{ transform: [{ scale: saveScale }] }}>
          <Pressable style={[styles.saveButton, saving && styles.saveButtonLoading]} onPress={() => saveProfile()} disabled={saving}>
            <Text style={styles.saveButtonText}>{saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder'}</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFCF7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5DDD0',
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2416',
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  content: { padding: 20 },
  section: { marginBottom: 40 },
  photoButton: { alignSelf: 'center', marginBottom: 20 },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#8B6D47',
  },
  photoPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
  saveButtonLoading: {
    backgroundColor: '#A69580',
  },
  saveButtonText: { fontSize: 18, fontWeight: '700', color: '#FFFCF7' },
  deletePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
    padding: 8,
  },
  deletePhotoText: {
    fontSize: 13,
    color: '#A69580',
  },
});
