import { mockTrabajos } from '@/mocks/mockTrabajos'; // Asegúrate de tener este archivo mock listo
import { useLocalSearchParams } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalleTrabajoScreen() {
  const { id } = useLocalSearchParams();
  const trabajo = mockTrabajos.find((t) => t.id === id);

  if (!trabajo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trabajo no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{trabajo.titulo}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text>{trabajo.descripcion}</Text>

      {trabajo.requisitos && (
        <>
          <Text style={styles.label}>Requisitos:</Text>
          <Text>{trabajo.requisitos}</Text>
        </>
      )}

      <Text style={styles.label}>Contacto:</Text>
      <Text>{trabajo.contacto}</Text>

      {trabajo.ubicacion && (
        <>
          <Text style={styles.label}>Ubicación:</Text>
          <Text>{trabajo.ubicacion}</Text>
        </>
      )}

      {/* Botón de postulación */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Postulación enviada', 'Tu postulación ha sido registrada.')}
      >
        <Text style={styles.buttonText}>Postularme</Text>
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