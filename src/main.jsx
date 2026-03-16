import './index.css';
import App from './App.jsx';
import { PlayerProvider } from './context/PlayerContext.jsx';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </QueryClientProvider>
  </StrictMode>
);
