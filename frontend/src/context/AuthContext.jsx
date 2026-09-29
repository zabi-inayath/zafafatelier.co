import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, orderApi } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

/**
 * Authentication and Orders Context Provider
 * Handles client JWT authentication, persistent session validation, and order management.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('zafaf_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('zafaf_token') || null);
  const [loading, setLoading] = useState(true);

  // Client Orders state
  const [myOrders, setMyOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Validate session on mount
  useEffect(() => {
    async function checkAuth() {
      const currentToken = localStorage.getItem('zafaf_token');
      if (currentToken) {
        try {
          const res = await authApi.getMe();
          if (res.data?.success && res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('zafaf_user', JSON.stringify(res.data.user));
            if (res.data.orders) setMyOrders(res.data.orders);
          }
        } catch {
          // Token expired or invalid
          setUser(null);
          setToken(null);
          localStorage.removeItem('zafaf_token');
          localStorage.removeItem('zafaf_user');
        }
      }
      setLoading(false);
    }

    checkAuth();

    const handleExpired = () => {
      setUser(null);
      setToken(null);
      toast.error('Session expired. Please sign in again.');
    };

    window.addEventListener('zafaf-auth-expired', handleExpired);
    return () => window.removeEventListener('zafaf-auth-expired', handleExpired);
  }, []);

  // Client Login
  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      if (res.data?.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('zafaf_token', newToken);
        localStorage.setItem('zafaf_user', JSON.stringify(newUser));
        toast.success(`Salam Alaikum, ${newUser.name.split(' ')[0]}! Welcome back.`, {
          icon: '✨',
        });
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      // toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Client Registration
  const register = async (name, email, password, phone) => {
    try {
      const res = await authApi.register({ name, email, password, phone });
      if (res.data?.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('zafaf_token', newToken);
        localStorage.setItem('zafaf_user', JSON.stringify(newUser));
        toast.success(`Welcome to Zafaf Atelier, ${newUser.name.split(' ')[0]}!`, {
          icon: '💍',
        });
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Client Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setMyOrders([]);
    localStorage.removeItem('zafaf_token');
    localStorage.removeItem('zafaf_user');
    toast.success('Signed out safely. Fee Amanillah.');
  };

  // Retrieve client orders from MySQL API (cached-first for smooth instant transitions)
  const fetchMyOrders = async (silent = false) => {
    if (!token) return;
    // Only show full-panel loader if orders are not already loaded in memory
    if (!silent && myOrders.length === 0) {
      setLoadingOrders(true);
    }
    try {
      const res = await orderApi.getMyOrders();
      if (res.data?.success) {
        setMyOrders(res.data.orders || []);
      }
    } catch {
      // Order fetch error
    } finally {
      setLoadingOrders(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        myOrders,
        loadingOrders,
        fetchMyOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
