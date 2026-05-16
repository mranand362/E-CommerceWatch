// src/api/index.js
import axios from "axios";

// Use HTTPS consistently
const API = axios.create({
  baseURL: "https://e-commercewatch.onrender.com/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;