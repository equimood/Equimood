import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, View } from 'react-native';

// Composant pour ajouter l'effet glow
const TabIconWithGlow = ({ children, focused }: { children: React.ReactNode; focused: boolean }) => (
  <View style={{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: focused ? 'rgba(201, 168, 106, 0.2)' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C9A86A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: focused ? 0.6 : 0,
    shadowRadius: focused ? 10 : 0,
    elevation: focused ? 8 : 0,
  }}>
    {children}
  </View>
);

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B6D47',
        tabBarInactiveTintColor: '#A6825A',
        tabBarStyle: {
          backgroundColor: Colors.light.white,
          borderTopColor: Colors.light.border,
          borderTopWidth: 1,
          height: 95,
          paddingBottom: 18,
          paddingTop: 8,
          paddingHorizontal: 4,
        },
        tabBarLabelStyle: {
          fontFamily: 'Lato_700Bold',
          fontSize: 10,
          marginTop: 5,
        },
        headerStyle: {
          backgroundColor: Colors.light.primary,
        },
        headerTintColor: '#8B6D47',
        headerTitleStyle: {
          fontFamily: 'PlayfairDisplay_700Bold',
          fontSize: 22,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bienvenue',
          headerTitle: 'Bienvenue sur EquiMood !',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/equimood-plus' as any)}
              style={{
                marginRight: 12,
                backgroundColor: '#FFFCF2',
                borderRadius: 10,
                padding: 4,
              }}
            >
              <Image
                source={require('@/assets/images/equimood_plus2.png')}
                style={{ width: 32, height: 32, borderRadius: 6 }}
                resizeMode="contain"
              />
            </Pressable>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithGlow focused={focused}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            </TabIconWithGlow>
          ),
        }}
      />

      <Tabs.Screen
        name="quotidien"
        options={{
          title: 'À la maison',
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithGlow focused={focused}>
              <Image 
                source={focused 
                  ? require('@/assets/images/logo_alamaison_transparent.png')
                  : require('@/assets/images/logo_alamaison.png')
                }
                style={{ 
                  width: 38, 
                  height: 38,
                }}
                resizeMode="contain"
              />
            </TabIconWithGlow>
          ),
        }}
      />

      <Tabs.Screen
        name="moments"
        options={{
          title: 'En concours',
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithGlow focused={focused}>
              <Ionicons name={focused ? 'trophy' : 'trophy-outline'} size={24} color={color} />
            </TabIconWithGlow>
          ),
        }}
      />

      <Tabs.Screen
        name="respiration"
        options={{
          title: 'Respirer',
          headerTitle: 'Respirer',
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithGlow focused={focused}>
              <Ionicons name={focused ? 'leaf' : 'leaf-outline'} size={24} color={color} />
            </TabIconWithGlow>
          ),
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithGlow focused={focused}>
              <Image 
                source={focused 
                  ? require('@/assets/images/journal_plein_transp.png')
                  : require('@/assets/images/journal_transp.png')
                }
                style={{ 
                  width: 42, 
                  height: 42,
                }}
                resizeMode="contain"
              />
            </TabIconWithGlow>
          ),
        }}
      />

      <Tabs.Screen
        name="experts"
        options={{
          title: 'Côté pros',
          tabBarIcon: ({ color, focused }) => (
            <TabIconWithGlow focused={focused}>
              <Image
                source={focused
                  ? require('@/assets/images/logo_pros_plein-1.png')
                  : require('@/assets/images/logo_pros_transp.png')
                }
                style={{ width: 38, height: 38 }}
                resizeMode="contain"
              />
            </TabIconWithGlow>
          ),
        }}
      />

      <Tabs.Screen
        name="share"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

