import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { OpaqueColorValue } from 'react-native';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconColor: string|OpaqueColorValue = Colors[colorScheme?? 'dark'].tint
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {/* Pestaña: Home (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Pestaña: Explore (explore.tsx) */}
      <Tabs.Screen
        name="servicios" // ⚠️ Mantiene la ruta y archivo como 'servicios'
        options={{
          title: 'Servicios', // ✅ Cambia el nombre visible en la pestaña
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='miscellaneous-services' size={32} color={iconColor}/>
            // <IconSymbol size={28} name="wrench.fill" color={color} /> // 🛠 Puedes cambiar este ícono si quieres
          ),
        }}
      />
      
       {/* Pestaña: Trabajos (trabajos) */}
      <Tabs.Screen
        name="trabajos"
        options={{
          title: 'Trabajos',
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="hammer.fill" color={color} />
            <MaterialIcons name='engineering' size={32} color={iconColor}/>
          ),
        }}
      />

      {/* Pestaña: Profile (profile.tsx) ✅ ESTA ES LA QUE FALTABA */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="person.crop.circle" color={color} />
            <MaterialIcons name='person' size={32} color={iconColor}/>
          ),
        }}
      />
    </Tabs>
  );
}
