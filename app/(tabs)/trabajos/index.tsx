// app/(tabs)/trabajos/index.tsx

import { mockTrabajos } from '@/mocks/mockTrabajos';
import { Trabajo } from '@/types/Trabajo';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TrabajosScreen() {
  const router = useRouter();
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTrabajos = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const pageSize = 8;
      const nuevos = mockTrabajos.slice((page - 1) * pageSize, page * pageSize);
      setTrabajos((prev) => [...prev, ...nuevos]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchTrabajos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabajos publicados</Text>
      <FlatList
        data={trabajos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/trabajos/${item.id}`)}
          >
            <Text style={styles.nombre}>{item.titulo}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
        onEndReached={fetchTrabajos}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
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
