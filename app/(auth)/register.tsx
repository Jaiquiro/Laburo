import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';

// 🎯 Validación: al menos correo o teléfono, más el resto
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo inválido'),
  telefono: yup
    .string()
    .matches(/^\d+$/, 'Solo números')
    .min(7, 'Número demasiado corto'),
  ciudad: yup.string().required('Ciudad requerida'),
  password: yup.string().required('Contraseña obligatoria').min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  tipo: yup.string().required('Selecciona un rol'),
}).test('email-o-phone', 'Proporciona correo o teléfono', function (value) {
  return !!value.email || !!value.telefono;
});

export default function RegisterScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Acción al registrar
  const onSubmit = async (data) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(data));
      Alert.alert('Registro exitoso');
      router.replace('/tabs');
    } catch (e) {
      console.error(e);
      Alert.alert('Error al guardar');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* Nombre */}
      <Controller
        control={control}
        name="nombre"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nombre completo"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.nombre && <Text style={styles.error}>{errors.nombre.message}</Text>}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Correo (opcional)"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Teléfono */}
      <Controller
        control={control}
        name="telefono"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Teléfono (opcional)"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.telefono && <Text style={styles.error}>{errors.telefono.message}</Text>}

      {/* Ciudad */}
      <Controller
        control={control}
        name="ciudad"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Ciudad"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.ciudad && <Text style={styles.error}>{errors.ciudad.message}</Text>}

      {/* Contraseña */}
      <Controller
        control={control}
        name="password"
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

      {/* Confirmar contraseña */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Confirmar contraseña"
            style={styles.input}
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

      {/* Rol */}
      <Controller
        control={control}
        name="tipo"
        render={({ field: { onChange, value } }) => (
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, value === 'cliente' && styles.roleSelected]}
              onPress={() => onChange('cliente')}
            >
              <Text style={styles.roleText}>Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, value === 'proveedor' && styles.roleSelected]}
              onPress={() => onChange('proveedor')}
            >
              <Text style={styles.roleText}>Proveedor</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.tipo && <Text style={styles.error}>{errors.tipo.message}</Text>}

      {/* Botón de registro */}
      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  roleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  roleSelected: {
    backgroundColor: '#007AFF',
  },
  roleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
