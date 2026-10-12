import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import BookRidePage from './pages/BookRidePage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import MyRidesPage from './pages/MyRidesPage';
import ProfilePage from './pages/ProfilePage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SupportPage from './pages/SupportPage';

// Guard: requires authenticated user
function PrivateRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }
  if (roles && role && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookRidePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<SignInPage />} />

          <Route path="/dashboard" element={
            <PrivateRoute roles={['customer', 'admin']}>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="/my-rides" element={
            <PrivateRoute roles={['customer', 'admin']}>
              <MyRidesPage />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="/driver-dashboard" element={
            <PrivateRoute roles={['driver']}>
              <DriverDashboardPage />
            </PrivateRoute>
          } />
          <Route path="/admin-dashboard" element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboardPage />
            </PrivateRoute>
          } />
          <Route path="/support" element={<SupportPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
