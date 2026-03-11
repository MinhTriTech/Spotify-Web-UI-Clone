import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useRef, useEffect } from 'react';

import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import Profile from './pages/Profile';

const LoginPage = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/Home'));
const PlaylistDetail = lazy(() => import('./pages/Playlist'));

const Page404 = lazy(() => import('./pages/404'));

// Component wrapper để sử dụng useLocation (phải nằm trong Router)
const AppRoutes = () => {
  const location = useLocation();
  const container = useRef(null);

  // Auto scroll to top khi chuyển route
  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = 0;
    }
  }, [location]);

  return (
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
            element={<PlaylistDetail container={container}/>} 
          />

          <Route 
            path="/profile"
            element={<Profile container={container}/>}
          />

          <Route 
            path="/user/:id"
            element={<Profile container={container}/>}
          />

          <Route path="*" element={<Page404 />} />

        </Route>
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;