// 📁 tabs/index.tsx

import { mockServicios } from '@/mocks/mockServicios';
import { Servicio } from '@/types/Servicio';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filteredServicios, setFilteredServicios] = useState<Servicio[]>(mockServicios);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = mockServicios.filter((servicio) =>
      servicio.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredServicios(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Laburo</Text>

      {/* 🔍 Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar servicios..."
          value={search}
          onChangeText={handleSearch}
          style={styles.input}
        />
      </View>

      {/* 📋 Lista de resultados */}
      <FlatList
        data={filteredServicios.slice(0, 10)} // Muestra solo 10 por simplicidad
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/servicios/${item.id}`)}
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#007AFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#e6f0ff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
  },
});
