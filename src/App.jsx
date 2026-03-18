import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Suspense, lazy, useRef, useEffect } from 'react';

import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';
import { Spinner } from './components/spinner';

const LoginPage = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/Home'));
const PlaylistDetail = lazy(() => import('./pages/Playlist'));

const SearchContainer = lazy(() => import('./pages/Search'));
const SearchPage = lazy(() => import('./pages/Search/Home'));
const SearchTracks = lazy(() => import('./pages/Search/Songs'));
const SearchPlaylists = lazy(() => import('./pages/Search/Playlists'));
const SearchUsers = lazy(() => import('./pages/Search/Users'));
const UploadSecretPage = lazy(() => import('./pages/UploadSecret'));

const Page404 = lazy(() => import('./pages/404'));

const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner loading={loading}/>

  return isAuthenticated
  ? <Navigate to="/home" replace />
  : <Navigate to="/login" replace />
}

const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return children;
}

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
        <Route path="/" element={<RootRedirect />} />

        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } 
        />

        <Route path="/x-9v7m-upload-gate" element={<UploadSecretPage />} />

        <Route element={<MainLayout />}>

          <Route 
            path="/home" 
            element={<HomePage />}
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

          <Route path="/search/:search" element={<SearchContainer container={container} />}>
            <Route index element={<SearchPage container={container} />} />
            <Route path="tracks" element={<SearchTracks container={container} />} />
            <Route path="playlists" element={<SearchPlaylists container={container} />} />
            <Route path="users" element={<SearchUsers container={container} />} />
          </Route>

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