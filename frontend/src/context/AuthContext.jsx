// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // ✅ Auth loading state
  const [token, setToken] = useState(null);

  const API_URL = 'http://e-commercewatch.onrender.com/api';

  // ✅ CRITICAL: Rehydrate user from token on app load
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
      
      setToken(storedToken);
      
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    
    const { token, user: userData } = response.data;
    
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
    
    return userData;
  };

  const register = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    
    const { token, user: newUser } = response.data;
    
    localStorage.setItem('token', token);
    setToken(token);
    setUser(newUser);
    
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isLoading,     // ✅ For initial auth check
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;