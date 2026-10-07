import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';
import OrderPage from './pages/OrderPage';
import NotFoundPage from './pages/NotFoundPage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateViewerPage from './pages/TemplateViewerPage';
import MizaanRoyal from './templates/mizaan-royal/MizaanRoyal';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/order" element={<OrderPage />} />

            {/* Wedding Invitation Template Routes */}
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/templates/:templateSlug" element={<TemplateViewerPage />} />
            <Route path="/mizaan-royal" element={<MizaanRoyal isPreview={false} />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Global Luxury Toasts */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#031221',
                color: '#e4f4ea',
                border: '1px solid rgba(181, 232, 197, 0.25)',
                borderRadius: '16px',
                padding: '12px 18px',
                fontSize: '13px',
                fontFamily: 'Outfit, sans-serif',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
