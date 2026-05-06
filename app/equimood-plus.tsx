import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EquiMoodPlusScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Retour</Text>
          </Pressable>
          <Text style={styles.title}>EquiMood +</Text>
        </View>

        {/* Contenu à venir */}
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderEmoji}>✨</Text>
          <Text style={styles.placeholderText}>Cette page arrive bientôt…</Text>
        </View>

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
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 15,
    color: '#A8782A',
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#8B6D47',
    letterSpacing: 0.5,
  },
  placeholderBox: {
    alignItems: 'center',
    marginTop: 60,
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 18,
    color: '#A8782A',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
