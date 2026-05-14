// src/Components/CheckoutPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Truck, CreditCard, Lock } from "lucide-react";
import axios from "axios";

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
  "/images/R1.png": R1, "/images/R2.png": R2, "/images/R3.png": R3, "/images/R4.png": R4,
  "/images/R5.png": R5, "/images/R6.png": R6, "/images/R7.png": R7, "/images/R8.png": R8,
  "/images/O1.png": O1, "/images/O2.png": O2, "/images/O3.png": O3, "/images/O4.png": O4,
  "/images/O5.png": O5, "/images/O6.png": O6, "/images/O7.png": O7, "/images/O8.png": O8,
  "/images/P1.png": P1, "/images/P2.png": P2, "/images/P3.PNG": P3, "/images/P4.png": P4,
  "/images/P5.png": P5, "/images/P6.png": P6, "/images/P7.png": P7, "/images/P8.png": P8,
  "/images/AP1.png": AP1, "/images/AP2.png": AP2, "/images/AP3.png": AP3, "/images/AP4.png": AP4,
  "/images/AP5.png": AP5, "/images/AP6.png": AP6, "/images/AP7.png": AP7, "/images/AP8.png": AP8,
  "/images/C1.png": C1, "/images/C2.png": C2, "/images/C3.png": C3, "/images/C4.png": C4,
  "/images/C5.png": C5, "/images/C6.png": C6, "/images/C7.png": C7, "/images/C8.png": C8,
  "/images/B1.png": B1, "/images/B2.png": B2, "/images/B3.png": B3, "/images/B4.PNG": B4,
  "/images/B5.png": B5, "/images/B6.png": B6, "/images/B7.png": B7, "/images/B8.png": B8,
  "/images/IWC1.png": IWC1, "/images/IWC2.png": IWC2, "/images/IWC3.png": IWC3, "/images/IWC4.png": IWC4,
  "/images/IWC5.png": IWC5, "/images/IWC6.png": IWC6, "/images/IWC7.png": IWC7, "/images/IWC8.png": IWC8,
  "/images/H1.png": H1, "/images/H2.png": H2, "/images/H3.png": H3, "/images/H4.png": H4,
  "/images/H5.png": H5, "/images/H6.png": H6, "/images/H7.png": H7, "/images/H8.png": H8,
  "/images/TH1.png": TH1, "/images/TH2.png": TH2, "/images/TH3.png": TH3, "/images/TH4.png": TH4,
  "/images/TH5.png": TH5, "/images/TH6.png": TH6, "/images/TH7.png": TH7, "/images/TH8.png": TH8,
  "/images/JL1.png": JL1, "/images/JL2.png": JL2, "/images/JL3.png": JL3, "/images/JL4.png": JL4,
  "/images/JL5.png": JL5, "/images/JL6.png": JL6, "/images/JL7.png": JL7, "/images/JL8.png": JL8,
};

const DEFAULT_IMAGE = "https://via.placeholder.com/120?text=Watch";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Form Data
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Get token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Load cart
  useEffect(() => {
    if (location.state?.cartItems && location.state.cartItems.length > 0) {
      setCartItems(location.state.cartItems);
      return;
    }
    
    const checkoutCart = localStorage.getItem("checkoutCart");
    if (checkoutCart) {
      setCartItems(JSON.parse(checkoutCart));
      return;
    }
    
    const savedCart = localStorage.getItem("cart");
    if (savedCart && JSON.parse(savedCart).length > 0) {
      setCartItems(JSON.parse(savedCart));
    } else {
      navigate("/cart");
    }
  }, [location.state, navigate]);

  const getImageSrc = (imagePath) => {
    if (!imagePath) return DEFAULT_IMAGE;
    const mappedImage = imageMap[imagePath];
    return mappedImage || DEFAULT_IMAGE;
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShipping = () => {
    const subtotal = getSubtotal();
    if (subtotal > 50000) return 0;
    if (subtotal > 25000) return 299;
    return 499;
  };

  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  const formatPrice = (price) => `₹ ${price?.toLocaleString("en-IN") || 0}`;

  const validateCustomer = () => {
    if (!customerInfo.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(customerInfo.email)) return "Valid email is required";
    if (!customerInfo.phone) return "Phone number is required";
    if (customerInfo.phone.length < 10) return "Valid phone number is required";
    if (!customerInfo.firstName) return "First name is required";
    return null;
  };

  const validateShipping = () => {
    if (!shippingAddress.address) return "Street address is required";
    if (!shippingAddress.city) return "City is required";
    if (!shippingAddress.state) return "State is required";
    if (!shippingAddress.pincode) return "PIN code is required";
    if (shippingAddress.pincode.length < 6) return "Valid PIN code is required";
    return null;
  };

  const handleCustomerNext = () => {
    const error = validateCustomer();
    if (error) {
      alert(error);
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShippingNext = () => {
    const error = validateShipping();
    if (error) {
      alert(error);
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentNext = () => {
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ FIXED: Save order to backend with all required fields
  const handlePlaceOrder = async () => {
    if (!token) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    // Final validation before placing order
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
      alert("Please fill all shipping address fields");
      setStep(2);
      return;
    }

    setIsLoading(true);
    
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item.product?._id || item.id,
          name: item.product?.name || item.name,
          price: item.product?.price || item.price,
          quantity: item.quantity,
          image: item.product?.image || item.image,
          brand: item.product?.brand || item.brand,
        })),
        shippingAddress: {
          address: shippingAddress.address.trim(),
          city: shippingAddress.city.trim(),
          state: shippingAddress.state.trim(),
          pincode: shippingAddress.pincode.trim(),
          country: shippingAddress.country || "India",
        },
        paymentMethod: paymentMethod,
        itemsPrice: Math.round(getSubtotal()),
        shippingPrice: Math.round(getShipping()),
        totalPrice: Math.round(getTotal()),
      };
      
      console.log("📦 Order Data:", orderData);
      
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log("✅ Order placed:", response.data);
      
      // Clear cart
      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutCart");
      
      // Navigate to order confirmation
      navigate("/order-confirmation", { 
        state: { orderId: response.data._id }
      });
      
    } catch (error) {
      console.error("❌ Error placing order:", error);
      console.error("❌ Response:", error.response?.data);
      
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, name: "CUSTOMER", icon: "👤" },
    { number: 2, name: "SHIPPING", icon: "📦" },
    { number: 3, name: "PAYMENT", icon: "💳" },
    { number: 4, name: "REVIEW", icon: "✓" },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center py-12 px-4">
        <div className="bg-white border border-gray-200 p-12 text-center max-w-md">
          <div className="text-4xl mb-4">🛒</div>
          <h2 className="text-xl font-light text-black mb-2">Your Cart is Empty</h2>
          <div className="w-12 h-px bg-black mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm mb-6">Add items to your cart before proceeding to checkout.</p>
          <button onClick={() => navigate("/watches")} className="px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6 text-sm transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            Back to Cart
          </button>
          <h1 className="text-3xl md:text-4xl font-light text-black">Secure Checkout</h1>
          <div className="w-12 h-px bg-black mt-2"></div>
          <p className="text-gray-500 text-sm mt-3">Complete your purchase with confidence</p>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step >= s.number ? "bg-black border-black text-white" : "bg-white border-gray-300 text-gray-400"
                }`}>
                  {step > s.number ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-lg">{s.icon}</span>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-16 md:w-24 h-px mx-2 transition-all duration-300 ${step > s.number ? "bg-black" : "bg-gray-300"}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 md:gap-16 mt-3">
            {steps.map(s => (
              <span key={s.number} className={`text-[10px] font-semibold tracking-wider ${step >= s.number ? "text-black" : "text-gray-400"}`}>
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200">
              
              {/* Step 1: Customer Details */}
              {step === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-light text-black mb-6">Contact Information</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        value={customerInfo.email} 
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition"
                        placeholder="hello@luxurytime.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="tel" 
                        value={customerInfo.phone} 
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={customerInfo.firstName} 
                          onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          Last Name
                        </label>
                        <input 
                          type="text" 
                          value={customerInfo.lastName} 
                          onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleCustomerNext} 
                    className="w-full mt-8 bg-black text-white py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition"
                  >
                    Continue to Shipping →
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {step === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-light text-black mb-6">Delivery Address</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        value={shippingAddress.address} 
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition resize-none"
                        rows="2"
                        placeholder="House number, street, apartment"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={shippingAddress.city} 
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={shippingAddress.state} 
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition"
                          placeholder="Maharashtra"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          PIN Code <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={shippingAddress.pincode} 
                          onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-0 transition"
                          placeholder="400001"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          Country
                        </label>
                        <input 
                          type="text" 
                          value={shippingAddress.country} 
                          disabled 
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={() => setStep(1)} 
                      className="flex-1 border border-gray-300 text-gray-600 py-3 text-sm font-semibold uppercase tracking-wide hover:border-black hover:text-black transition"
                    >
                      ← Back
                    </button>
                    <button 
                      onClick={handleShippingNext} 
                      className="flex-1 bg-black text-white py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {step === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-light text-black mb-6">Select Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: "cod", name: "Cash on Delivery", icon: "💰", desc: "Pay with cash when your order arrives" },
                      { id: "card", name: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, Amex, RuPay" },
                      { id: "upi", name: "UPI / QR Code", icon: "📱", desc: "Google Pay, PhonePe, Paytm, BHIM" },
                      { id: "netbanking", name: "Net Banking", icon: "🏦", desc: "All major Indian banks" },
                    ].map(method => (
                      <label 
                        key={method.id} 
                        className={`flex items-start gap-4 p-4 border cursor-pointer transition-all duration-200 ${
                          paymentMethod === method.id ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          value={method.id} 
                          checked={paymentMethod === method.id} 
                          onChange={(e) => setPaymentMethod(e.target.value)} 
                          className="mt-1 accent-black"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{method.icon}</span>
                            <span className="font-semibold text-black text-sm">{method.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={() => setStep(2)} 
                      className="flex-1 border border-gray-300 text-gray-600 py-3 text-sm font-semibold uppercase tracking-wide hover:border-black hover:text-black transition"
                    >
                      ← Back
                    </button>
                    <button 
                      onClick={handlePaymentNext} 
                      className="flex-1 bg-black text-white py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition"
                    >
                      Review Order →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Order Review */}
              {step === 4 && (
                <div className="p-6">
                  <h2 className="text-xl font-light text-black mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="border-b border-gray-100 pb-3">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">CONTACT</p>
                      <p className="text-sm text-black">{customerInfo.email}</p>
                      <p className="text-sm text-gray-600">{customerInfo.phone}</p>
                    </div>
                    <div className="border-b border-gray-100 pb-3">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">SHIP TO</p>
                      <p className="text-sm text-black">
                        {customerInfo.firstName} {customerInfo.lastName}<br />
                        {shippingAddress.address}<br />
                        {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}<br />
                        {shippingAddress.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">PAYMENT METHOD</p>
                      <p className="text-sm text-black capitalize">
                        {paymentMethod === "cod" ? "Cash on Delivery" : 
                         paymentMethod === "card" ? "Credit/Debit Card" :
                         paymentMethod === "upi" ? "UPI / QR Code" : "Net Banking"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep(3)} 
                      className="flex-1 border border-gray-300 text-gray-600 py-3 text-sm font-semibold uppercase tracking-wide hover:border-black hover:text-black transition"
                    >
                      ← Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder} 
                      disabled={isLoading} 
                      className="flex-1 bg-black text-white py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        "Place Order →"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-base font-semibold text-black uppercase tracking-wide">Your Order</h2>
              </div>
              
              <div className="p-6 space-y-4 max-h-96 overflow-auto">
                {cartItems.map((item, index) => (
                  <div key={item.id || index} className="flex gap-3">
                    <img 
                      src={getImageSrc(item.image)} 
                      alt={item.name} 
                      className="w-14 h-14 object-contain bg-[#fafafa] border border-gray-100"
                      onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-black">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-black">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-black">{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-black">{getShipping() === 0 ? "Free" : formatPrice(getShipping())}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-black">Total</span>
                    <span className="text-xl font-bold text-black">{formatPrice(getTotal())}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>SSL Secure Checkout</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="text-[10px] text-gray-400">Visa</span>
                    <span className="text-[10px] text-gray-400">Mastercard</span>
                    <span className="text-[10px] text-gray-400">Amex</span>
                    <span className="text-[10px] text-gray-400">Rupay</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="mt-4 bg-white border border-gray-200 p-4 text-center">
              <div className="flex items-center justify-center gap-4">
                <Truck className="w-4 h-4 text-gray-500" />
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">Free Shipping on orders ₹50k+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;