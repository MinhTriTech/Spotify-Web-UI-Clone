import './index.css';
import '@ant-design/v5-patch-for-react-19';
import App from './App.jsx';
import { PlayerProvider } from './context/PlayerContext.jsx';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <PlayerProvider>
              <App />
            </PlayerProvider>
          </QueryClientProvider>
        </ModalProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
