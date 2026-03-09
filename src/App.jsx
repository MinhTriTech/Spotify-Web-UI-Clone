import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layout/MainLayout';

const LoginPage = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/Home'));
const PlaylistDetail = lazy(() => import('./pages/Playlist'));

const Page404 = lazy(() => import('./pages/404'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route 
              path="/login" 
              element={<LoginPage />} 
            />

            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
              }
            />

            <Route 
              path="/playlist/:id" 
              element={<PlaylistDetail />} 
            />

            <Route path="*" element={<Page404 />} />

          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;