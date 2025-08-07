import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Al iniciar el componente, verificamos si hay sesión activa
  useEffect(() => {
    const checkUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Si no hay usuario almacenado, redirigimos al login
        router.replace('/(auth)/login');
      }
    };
    checkUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    router.replace('/(auth)/login');
  };

  const goToInicio = () => {
    router.push('/tabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {user && (
        <>
          <Text>Nombre: {user.nombre}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Tipo: {user.tipo}</Text>
          <Text>Ciudad: {user.ciudad}</Text>

          <TouchableOpacity style={styles.buttonLogout} onPress={logout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.buttonInicio} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonLogout: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonInicio: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
