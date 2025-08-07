// Importación de librerías necesarias
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Componente principal de la pantalla de login
export default function LoginScreen() {
  const router = useRouter();

  // Hook de formulario
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Inserta una cuenta de prueba en AsyncStorage si no hay ninguna
  useEffect(() => {
    const setupCuentaPrueba = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (!stored) {
        const cuentaDemo = {
          email: 'demo@piloto.com',
          telefono: '77777777',
          password: '123456',
          nombre: 'Cuenta Demo',
          tipo: 'cliente',
          ciudad: 'La Paz',
        };
        await AsyncStorage.setItem('user', JSON.stringify(cuentaDemo));
      }
    };
    setupCuentaPrueba();
  }, []);

  // 🔐 Función al enviar el formulario de login
  const onSubmit = async (data) => {
    try {
      const stored = await AsyncStorage.getItem('user');
      if (!stored) return Alert.alert('Usuario no encontrado');

      const user = JSON.parse(stored);

      // 📌 Aquí se permite ingresar usando correo o número de teléfono
      const inputUser = (user.email === data.usuario || user.telefono === data.usuario);
      const inputPass = user.password === data.password;

      if (inputUser && inputPass) {
        Alert.alert('Sesión iniciada');
        router.replace('/'); // Redirige a la app principal
      } else {
        Alert.alert('Credenciales incorrectas');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* 📥 Campo de usuario: correo o teléfono */}
      <Controller
        control={control}
        name="usuario"
        rules={{ required: 'Campo obligatorio' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Correo o Teléfono"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="default"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.usuario && <Text style={styles.error}>{errors.usuario.message}</Text>}

      {/* 🔒 Campo de contraseña */}
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Campo obligatorio' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* 🟦 Botón para iniciar sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      {/* 🔗 Enlace para registrarse */}
      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>

      {/* 🔙 Botón para volver al inicio */}
      <TouchableOpacity onPress={() => router.replace('/')}>
        <Text style={styles.backToHome}>← Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  backToHome: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});
