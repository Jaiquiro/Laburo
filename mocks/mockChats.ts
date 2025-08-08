import type { Conversation, Message } from '@/types/Chat';

export const mockConversations: Conversation[] = [
  {
    id: 'demo-1',
    serviceId: '1',
    members: ['u1', 'p1'],
    lastMessage: 'Hola, ¿sigues disponible?',
    updatedAt: new Date().toISOString(),
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    conversationId: 'demo-1',
    senderId: 'u1',
    text: 'Hola, ¿sigues disponible?',
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 'm2',
    conversationId: 'demo-1',
    senderId: 'p1',
    text: 'Sí, cuéntame qué necesitas 🙂',
    createdAt: new Date(Date.now() - 1000 * 60).toISOString(),
  },
];

export function upsertConversation(conv: Conversation) {
  const i = mockConversations.findIndex(c => c.id === conv.id);
  if (i >= 0) mockConversations[i] = conv;
  else mockConversations.push(conv);
}

export function addMessage(msg: Message) {
  mockMessages.push(msg);
  const c = mockConversations.find(c => c.id === msg.conversationId);
  if (c) {
    c.lastMessage = msg.text;
    c.updatedAt = msg.createdAt;
  }
}
