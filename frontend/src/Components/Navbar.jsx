// components/Navbar.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  ShoppingBag, User, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Watches", path: "/watches" },
  { name: "Brands", path: "/brands" },
  { name: "New Arrivals", path: "/new-arrivals" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load cart count
  useEffect(() => {
    const loadCartCount = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const cart = JSON.parse(savedCart);
          const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
          setCartCount(count);
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };
    
    loadCartCount();
    window.addEventListener('cartUpdated', loadCartCount);
    return () => window.removeEventListener('cartUpdated', loadCartCount);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = useCallback((path) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserDropdownOpen(false);
  };

  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-4 border-b border-white/5' 
            : 'bg-[#0A0A0A] py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Logo - Minimal Wordmark */}
            <Link to="/" className="relative z-10 group">
              <span className="text-xl tracking-[0.3em] font-light text-white uppercase">
                LUXURY<span className="font-bold tracking-[0.3em]">TIME</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredLink(item.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative py-2 group"
                >
                  <span className={`text-[11px] tracking-[0.2em] font-light uppercase transition-colors duration-300 ${
                    isActiveLink(item.path) ? 'text-white' : 'text-white/60 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  {/* Minimal underline animation */}
                  <span className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-500 ${
                    isActiveLink(item.path) 
                      ? 'w-full' 
                      : hoveredLink === item.path 
                        ? 'w-full' 
                        : 'w-0'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Actions - Only Icons */}
            <div className="flex items-center gap-5">
              
            

              {/* Cart Icon with Minimal Badge */}
              <Link to="/cart" className="relative text-white/60 hover:text-white transition-colors duration-300">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-[#0A0A0A] text-[9px] font-medium rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              {user ? (
                <div className="relative">
                  <button
  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
  className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
>
  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
    <span className="text-xs font-semibold text-white">
      {getInitials()}
    </span>
  </div>

  <ChevronDown
    className={`w-4 h-4 text-white/80 transition-transform duration-300 ${
      isUserDropdownOpen ? "rotate-180" : ""
    }`}
  />
</button>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-48 bg-[#1A1A1A] border border-white/10 shadow-xl z-50"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-xs font-medium text-white">{user.firstName} {user.lastName}</p>
                          <p className="text-[10px] text-white/50 mt-0.5 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/account" className="flex items-center gap-3 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                            <User className="w-3.5 h-3.5" /> My Account
                          </Link>
                          <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                            <ShoppingBag className="w-3.5 h-3.5" /> My Orders
                          </Link>
                         
                        </div>
                        <div className="border-t border-white/10">
                          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2.5 text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors">
                            <LogOut className="w-3.5 h-3.5" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link 
                  to="/account" 
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-white/60 hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Full Screen Dark Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0A0A0A] z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="min-h-screen flex flex-col p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                  <span className="text-lg tracking-[0.3em] font-light text-white uppercase">
                    LUXURY<span className="font-bold">TIME</span>
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-6 mb-auto">
                  {NAV_LINKS.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-2xl tracking-[0.15em] font-light uppercase transition-colors ${
                          isActiveLink(item.path) ? 'text-white' : 'text-white/40 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-col space-y-3">
                    {!user && (
                      <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-white/40 hover:text-white text-sm tracking-wide transition-colors">
                        Sign In / Register
                      </Link>
                    )}
                    <div className="flex gap-6 text-white/20 text-[10px] tracking-wider">
                      <span>© 2024 LUXURYTIME</span>
                      <span>All Rights Reserved</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;