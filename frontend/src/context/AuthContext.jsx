// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, syncGuestCart } from '../services/api';

// Create context
const AuthContext = createContext(null);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (storedToken && userData) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      
      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        
        // Sync guest cart to backend
        await syncGuestCart(data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const data = await registerUser(userData);
      
      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setToken(null);
    setUser(null);
  };

  

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context as default (for useAuth.js to import)
export default AuthContext;