// types/Chat.ts
export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string; // ISO
};

export type Conversation = {
  id: string;           // ej: "servicio-<idServicio>-<clienteId>-<proveedorId>"
  serviceId?: string;
  members: string[];    // [clienteId, proveedorId]
  lastMessage?: string;
  updatedAt: string;
};