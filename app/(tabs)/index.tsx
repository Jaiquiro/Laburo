import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 📦 Mocks importados
import { mockServicios } from '@/mocks/mockServicios';
import { mockTrabajos } from '@/mocks/mockTrabajos';

export default function HomeScreen() {
  const router = useRouter();

  // Estados para la búsqueda
  const [search, setSearch] = useState('');
  const [filteredServicios, setFilteredServicios] = useState(mockServicios);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = mockServicios.filter((s) =>
      s.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredServicios(filtered);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado con logo y notificaciones */}
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>PILOTO</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar servicios..."
            style={styles.searchBar}
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {/* Promociones */}
        <Text style={styles.sectionTitle}>Promociones</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {[1, 2, 3].map((promo) => (
            <View key={promo} style={styles.promoCard}>
              <Text style={styles.promoText}>Promo {promo}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Trabajos destacados */}
        <Text style={styles.sectionTitle}>Trabajos recientes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {mockTrabajos.slice(0, 5).map((trabajo) => (
            <TouchableOpacity
              key={trabajo.id}
              style={styles.trabajoCard}
              onPress={() => router.push(`/trabajos/${trabajo.id}`)}
            >
              <Text style={styles.trabajoTitulo}>{trabajo.titulo}</Text>
              <Text numberOfLines={2} style={styles.trabajoDescripcion}>{trabajo.descripcion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Servicios populares */}
        <Text style={styles.sectionTitle}>Servicios populares</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {filteredServicios.slice(0, 6).map((servicio) => (
            <TouchableOpacity
              key={servicio.id}
              style={styles.servicioCard}
              onPress={() => router.push(`/servicios/${servicio.id}`)}
            >
              <Text style={styles.servicioText}>{servicio.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Testimonios */}
        <Text style={styles.sectionTitle}>Testimonios</Text>
        <View style={styles.testimoniosContainer}>
          <Text>"Excelente app, encontré al técnico ideal en minutos."</Text>
          <Text>"Muy útil para ofrecer mis servicios de manera profesional."</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationIcon: {
    padding: 4,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: '#ffe8cc',
    padding: 20,
    borderRadius: 12,
    marginRight: 12,
    width: 200,
    alignItems: 'center',
  },
  promoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trabajoCard: {
    backgroundColor: '#e6f7ff',
    padding: 16,
    borderRadius: 10,
    marginRight: 12,
    width: 220,
  },
  trabajoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trabajoDescripcion: {
    fontSize: 14,
    color: '#555',
  },
  servicioCard: {
    backgroundColor: '#e6f0ff',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    width: 140,
  },
  servicioText: {
    fontSize: 16,
    textAlign: 'center',
  },
  testimoniosContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
});
