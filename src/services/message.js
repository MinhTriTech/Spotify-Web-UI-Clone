import MockAPI from '../data/mockAPI.js';
import MockStorage from '../data/mockStorage.js';
import { chatRooms, messages, users } from '../data/mockData.js';

// Mock storage for chat data
const CHAT_STORAGE_KEYS = {
  CHAT_ROOMS: 'spotify_chat_rooms',
  MESSAGES: 'spotify_messages'
};

class MockChatStorage {
  static getChatRooms() {
    const stored = localStorage.getItem(CHAT_STORAGE_KEYS.CHAT_ROOMS);
    return stored ? JSON.parse(stored) : [...chatRooms];
  }

  static setChatRooms(rooms) {
    localStorage.setItem(CHAT_STORAGE_KEYS.CHAT_ROOMS, JSON.stringify(rooms));
  }

  static getMessages() {
    const stored = localStorage.getItem(CHAT_STORAGE_KEYS.MESSAGES);
    return stored ? JSON.parse(stored) : [...messages];
  }

  static setMessages(msgs) {
    localStorage.setItem(CHAT_STORAGE_KEYS.MESSAGES, JSON.stringify(msgs));
  }

  static addMessage(message) {
    const allMessages = this.getMessages();
    const newMessage = {
      ...message,
      id: MockAPI.generateId(allMessages),
      timestamp: new Date().toISOString()
    };
    allMessages.push(newMessage);
    this.setMessages(allMessages);
    
    // Update last message in chat room
    const rooms = this.getChatRooms();
    const roomIndex = rooms.findIndex(r => r.id === message.chatroom_id);
    if (roomIndex !== -1) {
      rooms[roomIndex].last_message = newMessage;
      this.setChatRooms(rooms);
    }
    
    return newMessage;
  }
}

export const fetchChatRooms = async () => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    const rooms = MockChatStorage.getChatRooms();
    
    // Filter rooms where current user is a participant
    const userRooms = rooms.filter(room => 
      room.participants.includes(currentUser.id)
    );
    
    return userRooms;
  } catch (err) {
    console.error('❌ Failed to fetch conversations:', err);
    if (err.message === 'Authentication required') {
      throw new Error('Unauthorized');
    }
    if (MockAPI.shouldFail()) {
      throw new Error('Failed to fetch chat rooms');
    }
    throw err;
  }
};

export const fetchMessages = async (chatRoomId) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    const rooms = MockChatStorage.getChatRooms();
    const room = rooms.find(r => r.id === parseInt(chatRoomId));
    
    if (!room) {
      throw new Error('Chat room not found');
    }
    
    if (!room.participants.includes(currentUser.id)) {
      throw new Error('Access denied to this chat room');
    }
    
    const allMessages = MockChatStorage.getMessages();
    const roomMessages = allMessages.filter(msg => 
      msg.chatroom_id === parseInt(chatRoomId)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    // Add sender information
    const messagesWithSender = roomMessages.map(msg => {
      const sender = users.find(u => u.id === msg.sender_id);
      return {
        ...msg,
        sender: sender ? {
          id: sender.id,
          display_name: sender.display_name,
          profile_image: sender.profile_image
        } : null
      };
    });
    
    return messagesWithSender;
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    if (error.message === 'Authentication required') {
      throw new Error('Unauthorized');
    }
    if (MockAPI.shouldFail()) {
      throw new Error('Failed to fetch messages');
    }
    throw error;
  }
};

export const sendMessage = async ({ content, recipient_id, chatroom_id }) => {
  try {
    MockAPI.checkAuth();
    const currentUser = MockAPI.getCurrentUser();
    
    if (!content || content.trim().length === 0) {
      throw new Error('Message content cannot be empty');
    }
    
    let roomId = chatroom_id;
    
    // If no chatroom_id provided, find or create room with recipient
    if (!roomId && recipient_id) {
      const rooms = MockChatStorage.getChatRooms();
      let room = rooms.find(r => 
        r.participants.includes(currentUser.id) && 
        r.participants.includes(recipient_id)
      );
      
      if (!room) {
        // Create new chat room
        const recipient = MockAPI.findById(users, recipient_id);
        room = {
          id: MockAPI.generateId(rooms),
          name: `Chat with ${recipient.display_name}`,
          participants: [currentUser.id, recipient_id],
          last_message: null,
          created_at: new Date().toISOString()
        };
        rooms.push(room);
        MockChatStorage.setChatRooms(rooms);
      }
      
      roomId = room.id;
    }
    
    const newMessage = MockChatStorage.addMessage({
      chatroom_id: roomId,
      sender_id: currentUser.id,
      content: content.trim()
    });
    
    // Add sender info for return
    newMessage.sender = {
      id: currentUser.id,
      display_name: currentUser.display_name,
      profile_image: currentUser.profile_image
    };
    
    return newMessage;
  } catch (error) {
    console.error('❌ Failed to send message via API:', error);
    if (error.message === 'Authentication required') {
      throw new Error('Unauthorized');
    }
    if (error.message === 'Item not found') {
      throw new Error('Recipient not found');
    }
    if (MockAPI.shouldFail()) {
      throw new Error('Failed to send message');
    }
    throw error;
  }
};

export const messageService = {
  fetchChatRooms,
  fetchMessages,
  sendMessage,
};



