// src/Components/CartPage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield, Gift } from "lucide-react";
import { getCart, updateCartItem, removeFromCart, clearCart, validatePromoCode } from "../services/api";

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

// Complete image mapping
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

const DEFAULT_IMAGE = "https://via.placeholder.com/120?text=Watch";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  // Fetch cart from backend API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        
        // Using API service
        const data = await getCart(token);
        
        setCartItems(Array.isArray(data?.items) ? data.items : []);
      } catch (error) {
        console.log("Error fetching cart:", error);
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const token = localStorage.getItem("token");
      
      await updateCartItem(productId, newQuantity, token);
      
      setCartItems(prev =>
        prev.map(item =>
          (item.product?._id === productId || item.product === productId) 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      
      await removeFromCart(productId, token);
      
      setCartItems(prev => prev.filter(item => 
        item.product?._id !== productId && item.product !== productId
      ));
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      try {
        const token = localStorage.getItem("token");
        
        await clearCart(token);
        
        setCartItems([]);
      } catch (error) {
        console.log("Error clearing cart:", error);
      }
    }
  };

  const applyPromoCode = () => {
    const result = validatePromoCode(promoCode);
    
    if (result.valid) {
      setDiscount(result.discount);
      setPromoSuccess(`${result.discount}% discount applied successfully!`);
      setPromoError("");
    } else {
      setPromoError(result.message || "Invalid promo code");
      setPromoSuccess("");
    }
    setPromoCode("");
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = item.product || item;
      const price = product.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getDiscountAmount = () => {
    return (getSubtotal() * discount) / 100;
  };

  const getShipping = () => {
    const subtotal = getSubtotal() - getDiscountAmount();
    if (subtotal > 50000) return 0;
    if (subtotal > 25000) return 299;
    return 499;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getShipping();
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "₹ 0";
    return `₹ ${price.toLocaleString("en-IN")}`;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Please add some items first.");
      return;
    }
    
    setIsProcessing(true);
    localStorage.setItem("checkoutCart", JSON.stringify(cartItems));
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/checkout", { 
        state: { cartItems: cartItems }
      });
    }, 500);
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return DEFAULT_IMAGE;
    if (imageMap[imagePath]) return imageMap[imagePath];
    const withPrefix = imagePath.startsWith('/images/') ? imagePath : `/images/${imagePath}`;
    if (imageMap[withPrefix]) return imageMap[withPrefix];
    const filename = imagePath.split('/').pop();
    for (const [key, value] of Object.entries(imageMap)) {
      if (key.endsWith(filename) || key === filename) return value;
    }
    return DEFAULT_IMAGE;
  };

  const getProduct = (item) => {
    return item?.product || item || {};
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (!isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-light text-black mb-3">Your Cart is Empty</h1>
            <div className="w-12 h-px bg-black mx-auto mb-6"></div>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Discover our luxury timepieces and add them to your cart
            </p>
            <Link
              to="/watches"
              className="inline-block px-8 py-3 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main Cart Display
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/watches"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6 text-sm transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
            Continue Shopping
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-black">Shopping Cart</h1>
              <div className="w-12 h-px bg-black mt-2"></div>
              <p className="text-gray-500 text-sm mt-4">
                {cartItems.reduce((total, item) => total + item.quantity, 0)} items in your cart
              </p>
            </div>
            
            <button
              onClick={handleClearCart}
              className="text-sm text-red-500 hover:text-red-700 transition flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => {
              const product = getProduct(item);
              const productId = product._id || product.id || index;
              const itemPrice = product.price || 0;
              
              return (
                <div
                  key={productId}
                  className="bg-white border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="w-32 h-32 bg-[#fafafa] flex items-center justify-center flex-shrink-0">
                    <img
                      src={getImageSrc(product.image)}
                      alt={product.name || "Product"}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE;
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                          {product.brand || "LUXURY TIMEPIECE"}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-base mt-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          {product.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(productId)}
                        className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Quantity</span>
                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => updateQuantity(productId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-lg font-bold text-black">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            {formatPrice(itemPrice)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-100">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(getSubtotal())}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-{formatPrice(getDiscountAmount())}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">
                    {getShipping() === 0 ? "Free" : formatPrice(getShipping())}
                  </span>
                </div>
                
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-black">Total</span>
                    <span className="text-xl font-bold text-black">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                  {getShipping() === 0 && getSubtotal() > 50000 && (
                    <p className="text-xs text-green-600 mt-2">✨ Free shipping applied</p>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-black transition"
                    onKeyPress={(e) => e.key === "Enter" && applyPromoCode()}
                  />
                  <button onClick={applyPromoCode} className="px-4 py-2 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition">
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-2">{promoError}</p>}
                {promoSuccess && <p className="text-green-600 text-xs mt-2">{promoSuccess}</p>}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-black text-white py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    PROCESSING...
                  </div>
                ) : (
                  "PROCEED TO CHECKOUT"
                )}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-gray-500" /><span className="text-xs text-gray-500">Free Shipping</span></div>
                  <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-gray-500" /><span className="text-xs text-gray-500">Secure Delivery</span></div>
                  <div className="flex items-center gap-2"><Gift className="w-4 h-4 text-gray-500" /><span className="text-xs text-gray-500">Gift Wrapping</span></div>
                  <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-gray-500" /><span className="text-xs text-gray-500">Secure Payment</span></div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 text-center mb-3 uppercase tracking-wide">Secure payment methods</p>
                <div className="flex justify-center gap-4">
                  <span className="text-[10px] text-gray-500">Visa</span>
                  <span className="text-[10px] text-gray-500">Mastercard</span>
                  <span className="text-[10px] text-gray-500">Amex</span>
                  <span className="text-[10px] text-gray-500">Rupay</span>
                  <span className="text-[10px] text-gray-500">UPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center mt-8">
          <Link to="/watches" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-black transition group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition" />
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center"><Truck className="w-6 h-6 mx-auto text-black mb-3" /><h3 className="text-sm font-semibold text-black mb-1">Free Worldwide Shipping</h3><p className="text-xs text-gray-500">On orders over ₹50,000</p></div>
            <div className="text-center"><Shield className="w-6 h-6 mx-auto text-black mb-3" /><h3 className="text-sm font-semibold text-black mb-1">Authenticity Guaranteed</h3><p className="text-xs text-gray-500">100% genuine products</p></div>
            <div className="text-center"><Gift className="w-6 h-6 mx-auto text-black mb-3" /><h3 className="text-sm font-semibold text-black mb-1">Luxury Gift Wrapping</h3><p className="text-xs text-gray-500">Complimentary for all orders</p></div>
            <div className="text-center"><CreditCard className="w-6 h-6 mx-auto text-black mb-3" /><h3 className="text-sm font-semibold text-black mb-1">Secure Payments</h3><p className="text-xs text-gray-500">SSL encrypted transactions</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;