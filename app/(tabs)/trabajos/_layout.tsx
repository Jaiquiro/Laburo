import { Stack } from 'expo-router';

export default function ServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animation: 'slide_from_right',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Trabajos',
          headerShown: false, // Tu componente ya maneja el título
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={({ route }) => ({ 
          title: 'Detalle del Trabajos',
          headerBackTitle: 'Trabajos',
          headerTruncatedBackTitle: 'Atrás',
        })} 
      />
    </Stack>
  );
}
