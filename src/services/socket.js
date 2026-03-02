// Mock socket service for offline demo
// This simulates WebSocket functionality without connecting to a real server

let mockSocket = null;
let listeners = new Set();
let isConnected = false;

// Simulate socket events
const dispatchEvent = (type, data) => {
  const event = { type, data };
  listeners.forEach((callback) => callback(event));
};

export const initSocket = () => {
  if (!mockSocket || !isConnected) {
    mockSocket = {
      readyState: 1, // WebSocket.OPEN equivalent
      close: () => {
        isConnected = false;
        console.log('❌ Mock socket closed');
        dispatchEvent('close', {});
      },
      send: (data) => {
        if (isConnected) {
          console.log('📤 Mock socket sending:', data);
          // Simulate echo message after delay
          setTimeout(() => {
            if (isConnected) {
              try {
                const parsedData = JSON.parse(data);
                // Echo the message back as if it was received
                dispatchEvent('message', {
                  ...parsedData,
                  timestamp: new Date().toISOString(),
                  echo: true
                });
              } catch (e) {
                console.error('Failed to parse socket data:', e);
              }
            }
          }, 100 + Math.random() * 200); // Random delay 100-300ms
        } else {
          console.warn('⚠️ Mock socket is not connected. Message not sent.');
        }
      }
    };

    isConnected = true;
    console.log('🔌 Mock socket connected');
    dispatchEvent('open', {});

    // Simulate periodic connection test
    const heartbeat = setInterval(() => {
      if (isConnected) {
        dispatchEvent('ping', { timestamp: new Date().toISOString() });
      } else {
        clearInterval(heartbeat);
      }
    }, 30000); // Every 30 seconds
  }
};

export const getSocket = () => {
  if (!mockSocket) {
    initSocket();
  }
  return mockSocket;
};

export const subscribeToSocket = (callback) => {
  listeners.add(callback); 
  return () => {
    listeners.delete(callback); 
  };
};

export const sendToSocket = (data) => {
  const socket = getSocket();
  if (socket && isConnected) {
    socket.send(JSON.stringify(data));
  } else {
    console.warn('⚠️ Mock socket is not connected. Message not sent.');
  }
};

// Additional utility functions for mock socket
export const disconnectSocket = () => {
  if (mockSocket && isConnected) {
    mockSocket.close();
  }
};

export const isSocketConnected = () => {
  return isConnected;
};

// Simulate receiving messages (for demo purposes)
export const simulateIncomingMessage = (message) => {
  if (isConnected) {
    setTimeout(() => {
      dispatchEvent('message', {
        ...message,
        timestamp: new Date().toISOString(),
        simulated: true
      });
    }, 500 + Math.random() * 1500); // Random delay 500-2000ms
  }
};