// src/Components/AccountPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  Mail, 
  Phone, 
  Shield,
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
  Edit2,
  Check,
  X,
  Loader,
  Bell,
  Globe,
  Lock,
  Printer,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import axios from 'axios';

// Import all images
import R1 from "../assets/R1.png";
import R2 from "../assets/R2.png";
import R3 from "../assets/R3.png";
import R4 from "../assets/R4.png";
import R5 from "../assets/R5.png";
import R6 from "../assets/R6.png";
import R7 from "../assets/R7.png";
import R8 from "../assets/R8.png";
import O1 from "../assets/O1.png";
import O2 from "../assets/O2.png";
import O3 from "../assets/O3.png";
import O4 from "../assets/O4.png";
import O5 from "../assets/O5.png";
import O6 from "../assets/O6.png";
import O7 from "../assets/O7.png";
import O8 from "../assets/O8.png";
import P1 from "../assets/P1.png";
import P2 from "../assets/P2.png";
import P3 from "../assets/P3.PNG";
import P4 from "../assets/P4.png";
import P5 from "../assets/P5.png";
import P6 from "../assets/P6.png";
import P7 from "../assets/P7.png";
import P8 from "../assets/P8.png";
import AP1 from "../assets/AP1.png";
import AP2 from "../assets/AP2.png";
import AP3 from "../assets/AP3.png";
import AP4 from "../assets/AP4.png";
import AP5 from "../assets/AP5.png";
import AP6 from "../assets/AP6.png";
import AP7 from "../assets/AP7.png";
import AP8 from "../assets/AP8.png";
import C1 from "../assets/C1.png";
import C2 from "../assets/C2.png";
import C3 from "../assets/C3.png";
import C4 from "../assets/C4.png";
import C5 from "../assets/C5.png";
import C6 from "../assets/C6.png";
import C7 from "../assets/C7.png";
import C8 from "../assets/C8.png";
import B1 from "../assets/B1.png";
import B2 from "../assets/B2.png";
import B3 from "../assets/B3.png";
import B4 from "../assets/B4.PNG";
import B5 from "../assets/B5.png";
import B6 from "../assets/B6.png";
import B7 from "../assets/B7.png";
import B8 from "../assets/B8.png";
import IWC1 from "../assets/IWC1.png";
import IWC2 from "../assets/IWC2.png";
import IWC3 from "../assets/IWC3.png";
import IWC4 from "../assets/IWC4.png";
import IWC5 from "../assets/IWC5.png";
import IWC6 from "../assets/IWC6.png";
import IWC7 from "../assets/IWC7.png";
import IWC8 from "../assets/IWC8.png";
import H1 from "../assets/H1.png";
import H2 from "../assets/H2.png";
import H3 from "../assets/H3.png";
import H4 from "../assets/H4.png";
import H5 from "../assets/H5.png";
import H6 from "../assets/H6.png";
import H7 from "../assets/H7.png";
import H8 from "../assets/H8.png";
import TH1 from "../assets/TH1.png";
import TH2 from "../assets/TH2.png";
import TH3 from "../assets/TH3.png";
import TH4 from "../assets/TH4.png";
import TH5 from "../assets/TH5.png";
import TH6 from "../assets/TH6.png";
import TH7 from "../assets/TH7.png";
import TH8 from "../assets/TH8.png";
import JL1 from "../assets/JL1.png";
import JL2 from "../assets/JL2.png";
import JL3 from "../assets/JL3.png";
import JL4 from "../assets/JL4.png";
import JL5 from "../assets/JL5.png";
import JL6 from "../assets/JL6.png";
import JL7 from "../assets/JL7.png";
import JL8 from "../assets/JL8.png";

// Image mapping
const imageMap = {
  "/images/R1.png": R1, "R1.png": R1, "R1": R1,
  "/images/R2.png": R2, "R2.png": R2, "R2": R2,
  "/images/R3.png": R3, "R3.png": R3, "R3": R3,
  "/images/R4.png": R4, "R4.png": R4, "R4": R4,
  "/images/R5.png": R5, "R5.png": R5, "R5": R5,
  "/images/R6.png": R6, "R6.png": R6, "R6": R6,
  "/images/R7.png": R7, "R7.png": R7, "R7": R7,
  "/images/R8.png": R8, "R8.png": R8, "R8": R8,
  "/images/O1.png": O1, "O1.png": O1, "O1": O1,
  "/images/O2.png": O2, "O2.png": O2, "O2": O2,
  "/images/O3.png": O3, "O3.png": O3, "O3": O3,
  "/images/O4.png": O4, "O4.png": O4, "O4": O4,
  "/images/O5.png": O5, "O5.png": O5, "O5": O5,
  "/images/O6.png": O6, "O6.png": O6, "O6": O6,
  "/images/O7.png": O7, "O7.png": O7, "O7": O7,
  "/images/O8.png": O8, "O8.png": O8, "O8": O8,
  "/images/P1.png": P1, "P1.png": P1, "P1": P1,
  "/images/P2.png": P2, "P2.png": P2, "P2": P2,
  "/images/P3.PNG": P3, "P3.PNG": P3, "P3": P3,
  "/images/P4.png": P4, "P4.png": P4, "P4": P4,
  "/images/P5.png": P5, "P5.png": P5, "P5": P5,
  "/images/P6.png": P6, "P6.png": P6, "P6": P6,
  "/images/P7.png": P7, "P7.png": P7, "P7": P7,
  "/images/P8.png": P8, "P8.png": P8, "P8": P8,
  "/images/AP1.png": AP1, "AP1.png": AP1, "AP1": AP1,
  "/images/AP2.png": AP2, "AP2.png": AP2, "AP2": AP2,
  "/images/AP3.png": AP3, "AP3.png": AP3, "AP3": AP3,
  "/images/AP4.png": AP4, "AP4.png": AP4, "AP4": AP4,
  "/images/AP5.png": AP5, "AP5.png": AP5, "AP5": AP5,
  "/images/AP6.png": AP6, "AP6.png": AP6, "AP6": AP6,
  "/images/AP7.png": AP7, "AP7.png": AP7, "AP7": AP7,
  "/images/AP8.png": AP8, "AP8.png": AP8, "AP8": AP8,
  "/images/C1.png": C1, "C1.png": C1, "C1": C1,
  "/images/C2.png": C2, "C2.png": C2, "C2": C2,
  "/images/C3.png": C3, "C3.png": C3, "C3": C3,
  "/images/C4.png": C4, "C4.png": C4, "C4": C4,
  "/images/C5.png": C5, "C5.png": C5, "C5": C5,
  "/images/C6.png": C6, "C6.png": C6, "C6": C6,
  "/images/C7.png": C7, "C7.png": C7, "C7": C7,
  "/images/C8.png": C8, "C8.png": C8, "C8": C8,
  "/images/B1.png": B1, "B1.png": B1, "B1": B1,
  "/images/B2.png": B2, "B2.png": B2, "B2": B2,
  "/images/B3.png": B3, "B3.png": B3, "B3": B3,
  "/images/B4.PNG": B4, "B4.PNG": B4, "B4": B4,
  "/images/B5.png": B5, "B5.png": B5, "B5": B5,
  "/images/B6.png": B6, "B6.png": B6, "B6": B6,
  "/images/B7.png": B7, "B7.png": B7, "B7": B7,
  "/images/B8.png": B8, "B8.png": B8, "B8": B8,
  "/images/IWC1.png": IWC1, "IWC1.png": IWC1, "IWC1": IWC1,
  "/images/IWC2.png": IWC2, "IWC2.png": IWC2, "IWC2": IWC2,
  "/images/IWC3.png": IWC3, "IWC3.png": IWC3, "IWC3": IWC3,
  "/images/IWC4.png": IWC4, "IWC4.png": IWC4, "IWC4": IWC4,
  "/images/IWC5.png": IWC5, "IWC5.png": IWC5, "IWC5": IWC5,
  "/images/IWC6.png": IWC6, "IWC6.png": IWC6, "IWC6": IWC6,
  "/images/IWC7.png": IWC7, "IWC7.png": IWC7, "IWC7": IWC7,
  "/images/IWC8.png": IWC8, "IWC8.png": IWC8, "IWC8": IWC8,
  "/images/H1.png": H1, "H1.png": H1, "H1": H1,
  "/images/H2.png": H2, "H2.png": H2, "H2": H2,
  "/images/H3.png": H3, "H3.png": H3, "H3": H3,
  "/images/H4.png": H4, "H4.png": H4, "H4": H4,
  "/images/H5.png": H5, "H5.png": H5, "H5": H5,
  "/images/H6.png": H6, "H6.png": H6, "H6": H6,
  "/images/H7.png": H7, "H7.png": H7, "H7": H7,
  "/images/H8.png": H8, "H8.png": H8, "H8": H8,
  "/images/TH1.png": TH1, "TH1.png": TH1, "TH1": TH1,
  "/images/TH2.png": TH2, "TH2.png": TH2, "TH2": TH2,
  "/images/TH3.png": TH3, "TH3.png": TH3, "TH3": TH3,
  "/images/TH4.png": TH4, "TH4.png": TH4, "TH4": TH4,
  "/images/TH5.png": TH5, "TH5.png": TH5, "TH5": TH5,
  "/images/TH6.png": TH6, "TH6.png": TH6, "TH6": TH6,
  "/images/TH7.png": TH7, "TH7.png": TH7, "TH7": TH7,
  "/images/TH8.png": TH8, "TH8.png": TH8, "TH8": TH8,
  "/images/JL1.png": JL1, "JL1.png": JL1, "JL1": JL1,
  "/images/JL2.png": JL2, "JL2.png": JL2, "JL2": JL2,
  "/images/JL3.png": JL3, "JL3.png": JL3, "JL3": JL3,
  "/images/JL4.png": JL4, "JL4.png": JL4, "JL4": JL4,
  "/images/JL5.png": JL5, "JL5.png": JL5, "JL5": JL5,
  "/images/JL6.png": JL6, "JL6.png": JL6, "JL6": JL6,
  "/images/JL7.png": JL7, "JL7.png": JL7, "JL7": JL7,
  "/images/JL8.png": JL8, "JL8.png": JL8, "JL8": JL8,
};

const DEFAULT_IMAGE = "https://via.placeholder.com/80?text=Product";

const AccountPage = () => {
  const { user, token, authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [removingFromWishlist, setRemovingFromWishlist] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const hasFetchedUser = useRef(false);
  const hasFetchedOrders = useRef(false);
  const hasFetchedWishlist = useRef(false);
  const API_URL = 'http://localhost:5000/api';

  const getImageSrc = (imagePath) => {
    if (!imagePath) return DEFAULT_IMAGE;
    if (imageMap[imagePath]) return imageMap[imagePath];
    const filename = imagePath.split('/').pop();
    for (const [key, value] of Object.entries(imageMap)) {
      if (key.endsWith(filename) || key === filename) {
        return value;
      }
    }
    return DEFAULT_IMAGE;
  };

  // Fetch user data
  useEffect(() => {
    if (!token || hasFetchedUser.current) return;
    hasFetchedUser.current = true;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const userData = response.data.user;
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        showNotification('Failed to load profile data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Fetch orders
  useEffect(() => {
    if (activeTab !== 'orders' || hasFetchedOrders.current || !token) return;
    hasFetchedOrders.current = true;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [activeTab, token]);

  // Fetch wishlist
  useEffect(() => {
    if (activeTab !== 'wishlist' || hasFetchedWishlist.current || !token) return;
    hasFetchedWishlist.current = true;

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_URL}/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlist(response.data || []);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, [activeTab, token]);

  // Remove from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    setRemovingFromWishlist(productId);
    
    try {
      await axios.delete(`${API_URL}/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update wishlist state by removing the deleted item
      setWishlist(prev => prev.filter(item => item._id !== productId));
      showNotification('Item removed from wishlist', 'success');
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      showNotification(error.response?.data?.message || 'Failed to remove item', 'error');
    } finally {
      setRemovingFromWishlist(null);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const response = await axios.put(
        `${API_URL}/auth/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      showNotification('Profile updated successfully!', 'success');
      setIsEditing(false);
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      showNotification(error.response?.data?.message || 'Update failed', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getInitials = () => {
    return `${formData.firstName?.charAt(0) || ''}${formData.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getOrderStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badges[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Manage your personal information' },
    { id: 'orders', label: 'Orders', icon: Package, description: 'Track and view your orders' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, description: 'Your saved items' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, description: 'Manage shipping addresses' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Account preferences' },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-black animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-black animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white text-sm flex items-center gap-2`}
          >
            {notification.type === 'success' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-black">My Account</h1>
          <div className="w-12 h-px bg-black mt-2"></div>
          <p className="text-gray-500 text-sm mt-3">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              {/* User Info Card */}
              <div className="p-6 text-center border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <span className="text-2xl font-light text-white">{getInitials() || 'U'}</span>
                </div>
                <h3 className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</h3>
                <p className="text-xs text-gray-500 mt-1">{formData.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-[10px] text-green-600 font-medium">Verified Account</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="py-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 ${
                        isActive
                          ? 'text-black bg-gray-50 border-r-2 border-black'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-[10px] text-gray-400 hidden xl:block">{tab.description}</div>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-gray-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-100 p-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-light text-black">Profile Information</h2>
                      <p className="text-sm text-gray-500 mt-1">Update your personal details</p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-black border border-gray-200 rounded-lg hover:border-black transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                          disabled
                        />
                        <p className="text-xs text-gray-400 mt-1">Email address cannot be changed</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={updating}
                          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                        >
                          {updating ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-black transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Full Name</p>
                            <p className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Email Address</p>
                            <p className="font-medium text-gray-900">{formData.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Phone Number</p>
                            <p className="font-medium text-gray-900">{formData.phone || 'Not provided'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Shield className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Account Type</p>
                            <p className="font-medium text-gray-900">Premium Customer</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab - FULL ORDER DISPLAY (ALL ITEMS) */}
              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-light text-black">Order History</h2>
                      <p className="text-sm text-gray-500 mt-1">Track and manage all your orders</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      Total: {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                    </div>
                  </div>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No orders yet</p>
                      <Link to="/watches" className="inline-block mt-4 text-black underline hover:no-underline">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          {/* Order Header */}
                          <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b border-gray-200">
                            <div className="flex flex-wrap justify-between items-start gap-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  ORDER #{order._id?.slice(-8).toUpperCase()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-2">
                                  <span>📅 {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}</span>
                                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                  <span>🕐 {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}</span>
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getOrderStatusBadge(order.status)}`}>
                                  {order.status?.toUpperCase() || 'PENDING'}
                                </span>
                                <span className="text-lg font-bold text-black">₹{order.totalPrice?.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Order Items - ALL ITEMS DISPLAYED */}
                          <div className="p-5 space-y-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Items Ordered ({order.orderItems?.length || 0})</p>
                            {order.orderItems?.map((item, idx) => (
                              <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 flex-shrink-0">
                                  <img 
                                    src={getImageSrc(item.image)} 
                                    alt={item.name} 
                                    className="w-14 h-14 object-contain"
                                    onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                                  <p className="text-xs text-gray-500 mt-0.5">{item.brand || 'Luxury Timepiece'}</p>
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center gap-4">
                                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                      <span className="text-xs text-gray-500">₹{item.price?.toLocaleString('en-IN')} each</span>
                                    </div>
                                    <span className="text-sm font-bold text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Summary */}
                          <div className="bg-gray-50 p-5 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Subtotal</span>
                              <span className="text-sm font-medium text-gray-900">₹{order.itemsPrice?.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Shipping</span>
                              <span className="text-sm font-medium text-gray-900">{order.shippingPrice === 0 ? 'Free' : `₹${order.shippingPrice?.toLocaleString('en-IN')}`}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                              <span className="text-base font-semibold text-gray-900">Total</span>
                              <span className="text-xl font-bold text-black">₹{order.totalPrice?.toLocaleString('en-IN')}</span>
                            </div>
                          </div>

                          {/* Shipping Address & Actions */}
                          <div className="p-5 bg-white border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                            {order.shippingAddress && (
                              <div className="text-xs text-gray-500">
                                <p className="font-semibold text-gray-700 mb-1">📦 Shipping Address</p>
                                <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                              </div>
                            )}
                            <div className="flex gap-3">
                              <button 
                                onClick={() => {
                                  localStorage.setItem('lastOrder', JSON.stringify(order));
                                  window.open(`/order-confirmation`, '_blank');
                                }}
                                className="px-4 py-2 text-xs font-semibold text-black border border-gray-300 rounded-lg hover:border-black transition"
                              >
                                View Details
                              </button>
                              <button 
                                onClick={() => window.print()}
                                className="px-4 py-2 text-xs font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition"
                              >
                                <Printer className="w-3 h-3 inline mr-1" />
                                Print
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab with Remove Functionality */}
              {activeTab === 'wishlist' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-light text-black">My Wishlist</h2>
                      <p className="text-sm text-gray-500 mt-1">Items you've saved for later</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your wishlist is empty</p>
                      <Link to="/watches" className="inline-block mt-4 text-black underline hover:no-underline">
                        Browse Watches
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <motion.div 
                          key={item._id} 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-4 border border-gray-100 rounded-lg p-3 hover:shadow-md transition group"
                        >
                          <img 
                            src={getImageSrc(item.image)} 
                            alt={item.name} 
                            className="w-20 h-20 object-contain bg-gray-50 rounded"
                            onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{item.brand || 'Luxury Timepiece'}</p>
                            <p className="text-sm font-semibold text-black mt-2">₹{item.price?.toLocaleString('en-IN')}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromWishlist(item._id)}
                            disabled={removingFromWishlist === item._id}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg text-red-500 disabled:opacity-50"
                          >
                            {removingFromWishlist === item._id ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-light text-black mb-2">Saved Addresses</h2>
                      <p className="text-sm text-gray-500">Manage your shipping addresses</p>
                    </div>
                    <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition">
                      + Add New Address
                    </button>
                  </div>
                  
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No saved addresses</p>
                    <p className="text-sm text-gray-400 mt-1">Add your first address for faster checkout</p>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-light text-black mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Preferences */}
                    <div className="border-b border-gray-100 pb-6">
                      <h3 className="text-sm font-semibold text-black mb-4 flex items-center gap-2">
                        <Bell className="w-4 h-4" /> Notification Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="text-sm text-gray-700">Email Notifications</span>
                            <p className="text-xs text-gray-400">Receive order updates and offers</p>
                          </div>
                          <div className="relative">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-black transition"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                          </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <div>
                            <span className="text-sm text-gray-700">SMS Alerts</span>
                            <p className="text-xs text-gray-400">Get shipping updates via SMS</p>
                          </div>
                          <div className="relative">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-black transition"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="border-b border-gray-100 pb-6">
                      <h3 className="text-sm font-semibold text-black mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Security
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-700">Change Password</span>
                            <p className="text-xs text-gray-400">Update your password regularly</p>
                          </div>
                          <button className="text-sm text-black underline">Update</button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                            <p className="text-xs text-gray-400">Add an extra layer of security</p>
                          </div>
                          <button className="text-sm text-black underline">Enable</button>
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div>
                      <h3 className="text-sm font-semibold text-black mb-4 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Preferences
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-700">Language</span>
                            <p className="text-xs text-gray-400">English (US)</p>
                          </div>
                          <button className="text-sm text-black underline">Change</button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-700">Currency</span>
                            <p className="text-xs text-gray-400">Indian Rupee (INR)</p>
                          </div>
                          <button className="text-sm text-black underline">Change</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;