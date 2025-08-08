// app/(tabs)/mensajes/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { mockConversations } from '@/mocks/mockChats';
import type { Conversation } from '@/types/Chat';

export default function MensajesIndexScreen() {
  const router = useRouter();
  const [convs, setConvs] = useState<Conversation[]>([]);

  useEffect(() => {
    // Simula actualización periódica (en producción será por WebSocket)
    const load = () => setConvs([...mockConversations].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)));
    load();
    const i = setInterval(load, 600);
    return () => clearInterval(i);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversaciones</Text>

      <FlatList
        data={convs}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No tienes conversaciones aún.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/mensajes/${item.id}`)}
          >
            <Text style={styles.cardTitle}>
              {item.serviceId ? `Servicio #${item.serviceId}` : 'Chat'}
            </Text>
            <Text numberOfLines={1} style={styles.lastMsg}>
              {item.lastMessage ?? 'Empieza la conversación…'}
            </Text>
            <Text style={styles.time}>{new Date(item.updatedAt).toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  empty: { textAlign: 'center', color: '#777', marginTop: 24 },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  lastMsg: { color: '#555', marginBottom: 6 },
  time: { fontSize: 12, color: '#888' },
});
