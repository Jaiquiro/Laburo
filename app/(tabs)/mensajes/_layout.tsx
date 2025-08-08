// app/(tabs)/mensajes/_layout.tsx
import { Stack } from 'expo-router';

export default function MensajesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animation: 'slide_from_right',
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#007AFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Conversaciones',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Chat',
          headerBackTitle: 'Atrás',
          headerTruncatedBackTitle: 'Atrás',
        }}
      />
    </Stack>
  );
}
