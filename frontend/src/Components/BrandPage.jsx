// src/Components/BrandPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import watchesData from "../data/watchesData";
import axios from "axios";

const BrandPage = () => {
  const { brandSlug } = useParams();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [dbProducts, setDbProducts] = useState([]);

  const brandData = watchesData[brandSlug];
  const brandName = brandSlug 
    ? brandSlug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "";

  // Fetch products from backend to get MongoDB _id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setDbProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Load cart from backend API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
          return;
        }
        
        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setCart(data.items || []);
      } catch (error) {
        console.log("Error fetching cart:", error);
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };
    
    fetchCart();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [brandSlug]);

  useEffect(() => {
    if (brandData) {
      const initial = {};
      brandData.forEach(watch => { initial[watch.id] = 1; });
      setQuantities(initial);
    }
  }, [brandData]);

  const updateQuantity = (watchId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [watchId]: Math.max(1, (prev[watchId] || 1) + delta)
    }));
  };

  // Get MongoDB _id by watch name
  const getDbProductId = (watchName) => {
    const product = dbProducts.find(p => p.name === watchName);
    if (!product) {
      console.error(`Product not found in DB: ${watchName}`);
      return null;
    }
    return product._id;
  };

  // ✅ FIXED: Add to cart with backend API using MongoDB _id
  const addToCart = async (watch) => {
    const qty = quantities[watch.id] || 1;
    const token = localStorage.getItem("token");
    
    try {
      if (token) {
        // Get MongoDB _id
        const productId = getDbProductId(watch.name);
        
        if (!productId) {
          alert(`Product "${watch.name}" not found in database. Please refresh.`);
          return;
        }
        
        // ✅ Use MongoDB _id, NOT watch.id
        await axios.post(
          "http://localhost:5000/api/cart",
          { productId: productId, quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Refresh cart from backend
        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(data.items || []);
      } else {
        // Guest user - save to localStorage
        let currentCart = [];
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          currentCart = JSON.parse(savedCart);
        }
        
        const existingItemIndex = currentCart.findIndex(item => item.id === watch.id);
        
        if (existingItemIndex !== -1) {
          currentCart[existingItemIndex].quantity += qty;
        } else {
          currentCart.push({
            id: watch.id,
            name: watch.name,
            price: watch.price,
            desc: watch.desc,
            image: watch.image,
            brand: brandName,
            brandName: brandName,
            quantity: qty
          });
        }
        
        localStorage.setItem("cart", JSON.stringify(currentCart));
        setCart(currentCart);
      }
      
      // Show success feedback
      setAddedToCart({ [watch.id]: true });
      setTimeout(() => setAddedToCart({}), 2000);
      
      // Dispatch event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.log("Error adding to cart:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  if (!brandData || brandData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-40">⌚</div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">Collection Not Found</h2>
          <p className="text-gray-500 mb-6">The brand you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate("/")} 
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      
      {/* Header with Cart Icon */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="text-gray-500 hover:text-black text-sm inline-flex items-center gap-1 transition"
            >
              ← Back
            </button>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <svg className="w-6 h-6 text-gray-700 group-hover:text-black transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                  {getCartCount() > 99 ? '99+' : getCartCount()}
                </span>
              )}
            </Link>
          </div>
          
          <div className="text-center py-4">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900">{brandName}</h1>
            <p className="text-gray-500 text-sm mt-1">Luxury Timepieces Collection</p>
          </div>
        </div>
      </div>

      {/* Watches Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandData.map((watch) => (
            <div 
              key={watch.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Image */}
              <div 
                className="bg-gray-50 p-6 cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedWatch(watch)}
              >
                <img 
                  src={watch.image} 
                  alt={watch.name} 
                  className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-800 text-sm">{watch.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{watch.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold text-gray-900">{watch.price}</span>
                  
                  <div className="flex items-center gap-2">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded">
                      <button 
                        onClick={() => updateQuantity(watch.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-sm font-medium">{quantities[watch.id] || 1}</span>
                      <button 
                        onClick={() => updateQuantity(watch.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(watch)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase transition-all duration-300 ${
                        addedToCart[watch.id]
                          ? "bg-green-600 text-white"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {addedToCart[watch.id] ? "✓ ADDED" : "ADD"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedWatch && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWatch(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gray-50 p-8">
              <button 
                onClick={() => setSelectedWatch(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-black shadow-md transition"
              >
                ×
              </button>
              <img 
                src={selectedWatch.image} 
                alt={selectedWatch.name} 
                className="w-full h-80 object-contain"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">{selectedWatch.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{selectedWatch.desc}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{selectedWatch.price}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded">
                    <button 
                      onClick={() => updateQuantity(selectedWatch.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium">{quantities[selectedWatch.id] || 1}</span>
                    <button 
                      onClick={() => updateQuantity(selectedWatch.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(selectedWatch);
                      setSelectedWatch(null);
                    }}
                    className={`px-6 py-2 rounded text-sm font-semibold uppercase transition-all duration-300 ${
                      addedToCart[selectedWatch.id]
                        ? "bg-green-600 text-white"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {addedToCart[selectedWatch.id] ? "✓ ADDED TO CART" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandPage;