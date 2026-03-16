import './index.css';
import App from './App.jsx';
import { PlayerProvider } from './context/PlayerContext.jsx';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
