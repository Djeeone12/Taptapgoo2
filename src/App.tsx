import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import UserApp from './components/UserApp/UserApp';
import DriverApp from './components/DriverApp/DriverApp';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function AppContent() {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'mobile-container' : ''}`}>
      <Routes>
        <Route path="/user/*" element={user.role === 'user' ? <UserApp /> : <Navigate to="/login" />} />
        <Route path="/driver/*" element={user.role === 'driver' ? <DriverApp /> : <Navigate to="/login" />} />
        <Route path="/admin/*" element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={
          user.role === 'user' ? <Navigate to="/user" /> :
          user.role === 'driver' ? <Navigate to="/driver" /> :
          user.role === 'admin' ? <Navigate to="/admin" /> :
          <Navigate to="/login" />
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;