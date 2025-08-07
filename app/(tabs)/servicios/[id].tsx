import { mockServicios } from '@/mocks/mockServicios'; // ✅ Importa el mock desde carpeta centralizada
import { useLocalSearchParams } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalleServicioScreen() {
  const { id } = useLocalSearchParams();

  // 🔍 Busca el servicio por ID
  const servicio = mockServicios.find((s) => s.id === id);

  // ❌ Si no se encuentra, muestra error
  if (!servicio) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Servicio no encontrado.</Text>
      </View>
    );
  }

  // ✅ Mostrar detalles del servicio
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{servicio.nombre}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text>{servicio.descripcion}</Text>

      <Text style={styles.label}>Contacto:</Text>
      <Text>{servicio.contacto}</Text>

      <Text style={styles.label}>Calificación:</Text>
      <Text>{servicio.calificacion} ⭐</Text>

      <Text style={styles.label}>Reseña:</Text>
      <Text>{servicio.resena}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Contacto', `Contacta a: ${servicio.contacto}`)}
      >
        <Text style={styles.buttonText}>Contactar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  button: {
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
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
