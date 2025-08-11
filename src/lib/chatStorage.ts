interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatData {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

// In-memory storage (simulating database)
let chatStorage: { [chatId: string]: ChatData } = {};

export const createChat = (initialMessage: string): string => {
  const chatId = `chat-${Date.now()}`;
  const title = generateTitleFromMessage(initialMessage);
  
  const newChat: ChatData = {
    id: chatId,
    title,
    messages: [
      {
        id: `msg-${Date.now()}`,
        content: initialMessage,
        role: "user",
        timestamp: new Date()
      }
    ],
    createdAt: new Date()
  };
  
  chatStorage[chatId] = newChat;
  return chatId;
};

export const getChat = (chatId: string): ChatData | null => {
  return chatStorage[chatId] || null;
};

export const addMessageToChat = (chatId: string, message: Omit<Message, 'id' | 'timestamp'>): void => {
  const chat = chatStorage[chatId];
  if (chat) {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    chat.messages.push(newMessage);
  }
};

export const getAllChats = (): ChatData[] => {
  return Object.values(chatStorage).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const generateTitleFromMessage = (message: string): string => {
  // Extract first few words for title
  const words = message.split(' ').slice(0, 4).join(' ');
  return words.length > 30 ? words.substring(0, 27) + '...' : words;
};

// Initialize with some default chats for demonstration
chatStorage = {
  "investment-strategy": {
    id: "investment-strategy",
    title: "Investment Strategy",
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
  "budget-planning": {
    id: "budget-planning", 
    title: "Budget Planning",
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
  },
  "retirement-goals": {
    id: "retirement-goals",
    title: "Retirement Goals", 
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
  }
};