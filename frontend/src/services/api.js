// frontend/src/services/api.js
const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const result = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      throw new Error(result.message || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth APIs
export const registerUser = (userData) => apiRequest('/auth/register', 'POST', userData);
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};

export const getUserProfile = (token) => apiRequest('/auth/profile', 'GET', null, token);
export const updateUserProfile = (userData, token) => apiRequest('/auth/profile', 'PUT', userData, token);

// Product APIs
export const getProducts = () => apiRequest('/products', 'GET');
export const getProductById = (id) => apiRequest(`/products/${id}`, 'GET');
export const getProductsByBrand = (brandSlug) => apiRequest(`/products/brand/${brandSlug}`, 'GET');

// Cart APIs
export const getCart = (token) => apiRequest('/cart', 'GET', null, token);
export const addToCart = (productId, quantity, token) => apiRequest('/cart', 'POST', { productId, quantity }, token);
export const removeFromCart = (productId, token) => apiRequest(`/cart/${productId}`, 'DELETE', null, token);
export const updateCartItem = (productId, quantity, token) => apiRequest(`/cart/${productId}`, 'PUT', { quantity }, token);

// Order APIs
export const createOrder = (orderData, token) => apiRequest('/orders', 'POST', orderData, token);
export const getMyOrders = (token) => apiRequest('/orders/myorders', 'GET', null, token);
export const getOrderById = (id, token) => apiRequest(`/orders/${id}`, 'GET', null, token);

export default {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getProducts,
  getProductById,
  getProductsByBrand,
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  createOrder,
  getMyOrders,
  getOrderById,
};