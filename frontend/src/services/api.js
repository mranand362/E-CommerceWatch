// src/services/api.js
// ✅ CORRECT URL - includes /api prefix
const API_URL = 'https://e-commercewatch.onrender.com/api';

console.log('🔧 API URL:', API_URL);

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
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Handle 204 No Content
    if (response.status === 204) {
      return { success: true };
    }
    
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      throw new Error(result.message || `Request failed with status ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ---------------- AUTH ----------------
export const registerUser = (userData) =>
  apiRequest('/auth/register', 'POST', userData);

export const loginUser = async (userData) => {
  try {
    // ✅ This will now call: https://e-commercewatch.onrender.com/api/auth/login
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Rest of your api.js remains the same...
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
};

export const getUserProfile = (token) =>
  apiRequest('/auth/profile', 'GET', null, token);

export const updateUserProfile = (userData, token) =>
  apiRequest('/auth/profile', 'PUT', userData, token);

export const getProducts = () => apiRequest('/products');
export const getProductById = (id) => apiRequest(`/products/${id}`);
export const getProductsByBrand = (brandSlug) =>
  apiRequest(`/products/brand/${brandSlug}`);

export const getCart = async (token) => {
  try {
    if (!token) {
      const guestCart = localStorage.getItem('cart');
      const items = guestCart ? JSON.parse(guestCart) : [];
      return { items, success: true };
    }
    
    return await apiRequest('/cart', 'GET', null, token);
  } catch (error) {
    console.error('Get cart error:', error);
    const guestCart = localStorage.getItem('cart');
    const items = guestCart ? JSON.parse(guestCart) : [];
    return { items, success: true };
  }
};

export const addToCart = async (productId, quantity, token) => {
  try {
    if (token) {
      return await apiRequest('/cart', 'POST', { productId, quantity }, token);
    } else {
      const guestCart = localStorage.getItem('cart');
      const cart = guestCart ? JSON.parse(guestCart) : [];
      
      const existingItem = cart.find(item => 
        (item.productId === productId || item.product?._id === productId)
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return { success: true, message: 'Added to cart (guest)' };
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
};

export const removeFromCart = async (productId, token) => {
  try {
    if (token) {
      return await apiRequest(`/cart/${productId}`, 'DELETE', null, token);
    } else {
      const guestCart = localStorage.getItem('cart');
      if (guestCart) {
        let cart = JSON.parse(guestCart);
        cart = cart.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      return { success: true, message: 'Removed from cart (guest)' };
    }
  } catch (error) {
    console.error('Remove from cart error:', error);
    throw error;
  }
};

export const updateCartItem = async (productId, quantity, token) => {
  try {
    if (token) {
      return await apiRequest(`/cart/${productId}`, 'PUT', { quantity }, token);
    } else {
      const guestCart = localStorage.getItem('cart');
      if (guestCart) {
        let cart = JSON.parse(guestCart);
        const itemIndex = cart.findIndex(item => item.productId === productId);
        
        if (itemIndex !== -1) {
          cart[itemIndex].quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
      return { success: true, message: 'Cart updated (guest)' };
    }
  } catch (error) {
    console.error('Update cart error:', error);
    throw error;
  }
};

export const clearCart = async (token) => {
  try {
    if (token) {
      const cart = await getCart(token);
      if (cart.items && cart.items.length > 0) {
        for (const item of cart.items) {
          const productId = item.productId || item.product?._id;
          if (productId) {
            await apiRequest(`/cart/${productId}`, 'DELETE', null, token);
          }
        }
      }
      return { success: true, message: 'Cart cleared' };
    } else {
      localStorage.removeItem('cart');
      return { success: true, message: 'Cart cleared (guest)' };
    }
  } catch (error) {
    console.error('Clear cart error:', error);
    throw error;
  }
};

export const syncGuestCart = async (token) => {
  try {
    const guestCart = localStorage.getItem('cart');
    if (!guestCart || !token) return;
    
    const items = JSON.parse(guestCart);
    console.log('Syncing guest cart items:', items);
    
    let syncedCount = 0;
    
    for (const item of items) {
      const productId = item.productId || item.product?._id;
      
      if (!productId) {
        console.warn('Could not extract product ID from item:', item);
        continue;
      }
      
      try {
        console.log(`Syncing product ${productId} with quantity ${item.quantity}`);
        await addToCart(productId, item.quantity, token);
        syncedCount++;
      } catch (err) {
        console.error(`Failed to sync product ${productId}:`, err);
      }
    }
    
    localStorage.removeItem('cart');
    console.log(`Guest cart synced: ${syncedCount} items`);
    return { success: true, message: `Synced ${syncedCount} items` };
  } catch (error) {
    console.error('Sync cart error:', error);
    throw error;
  }
};

export const createOrder = async (orderData, token) => {
  if (!token) {
    throw new Error('Please login to place an order');
  }
  return await apiRequest('/orders', 'POST', orderData, token);
};

export const getMyOrders = (token) =>
  apiRequest('/orders/myorders', 'GET', null, token);

export const getOrderById = (id, token) =>
  apiRequest(`/orders/${id}`, 'GET', null, token);

export const validatePromoCode = (code) => {
  const promos = {
    'WELCOME10': { discount: 10, type: 'percentage' },
    'LUXURY20': { discount: 20, type: 'percentage' },
    'LUXURY50': { discount: 50, type: 'percentage' },
    'FREESHIP': { discount: 0, type: 'freeshipping' }
  };
  
  const promo = promos[code.toUpperCase()];
  if (promo) {
    return { valid: true, ...promo };
  }
  return { valid: false, message: 'Invalid promo code' };
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getProducts,
  getProductById,
  getProductsByBrand,
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  syncGuestCart,
  createOrder,
  getMyOrders,
  getOrderById,
  validatePromoCode
};