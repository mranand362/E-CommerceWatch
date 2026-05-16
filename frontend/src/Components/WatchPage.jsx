// src/Components/WatchPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import watchesData from "../data/watchesData";
import { Search, ChevronDown, X, ShoppingBag } from "lucide-react";
import axios from "axios";

const WatchPage = () => {
  const [allWatches, setAllWatches] = useState([]);
  const [filteredWatches, setFilteredWatches] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [dbProducts, setDbProducts] = useState([]);

  const API_URL = 'https://e-commercewatch.onrender.com/api';

  // Load database products for ID mapping
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setDbProducts(response.data);
        console.log("✅ DB Products loaded:", response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Load local watches for display
  useEffect(() => {
    const allWatchesArray = [];
    Object.keys(watchesData).forEach(brand => {
      watchesData[brand].forEach(watch => {
        allWatchesArray.push({
          ...watch,
          brand: brand,
          brandName: brand.charAt(0).toUpperCase() + brand.slice(1).replace(/-/g, ' ')
        });
      });
    });
    setAllWatches(allWatchesArray);
    setFilteredWatches(allWatchesArray);
  }, []);

  // Load cart from backend or localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (token) {
          const response = await axios.get(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCart(response.data.items || []);
        } else {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };
    loadCart();
  }, []);

  // Filter and sort
  useEffect(() => {
    let result = [...allWatches];

    if (selectedBrand !== "all") {
      result = result.filter(watch => watch.brand === selectedBrand);
    }

    if (searchTerm) {
      result = result.filter(watch =>
        watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        watch.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
        return priceB - priceA;
      });
    }

    setFilteredWatches(result);
  }, [selectedBrand, searchTerm, sortBy, allWatches]);

  // Get MongoDB _id by watch name
  const getDbProductId = (watchName) => {
    const product = dbProducts.find(p => p.name === watchName);
    if (!product) {
      console.error(`Product not found in DB: ${watchName}`);
      return null;
    }
    return product._id;
  };

  // ✅ FIXED: Add to cart with proper structure for both logged-in and guest users
  const addToCart = async (watch) => {
    const token = localStorage.getItem("token");
    
    try {
      if (token) {
        // Logged in user - save to backend
        const productId = getDbProductId(watch.name);
        
        if (!productId) {
          alert(`Product "${watch.name}" not found in database.`);
          return;
        }
        
        await axios.post(
          `${API_URL}/cart`,
          { productId, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Refresh cart
        const response = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(response.data.items || []);
        
      } else {
        // ✅ Guest user - save to localStorage with proper structure
        let currentCart = [];
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          currentCart = JSON.parse(savedCart);
        }
        
        // Check if product already exists
        const existingItemIndex = currentCart.findIndex(item => 
          item.product?.id === watch.id || item.id === watch.id
        );
        
        if (existingItemIndex !== -1) {
          // Increase quantity
          currentCart[existingItemIndex].quantity += 1;
        } else {
          // ✅ Add new item with proper product object structure
          currentCart.push({
            product: {
              id: watch.id,
              name: watch.name,
              price: parseInt(watch.price.replace(/[^0-9]/g, "")),
              image: watch.image,
              desc: watch.desc,
              brand: watch.brandName
            },
            quantity: 1
          });
        }
        
        localStorage.setItem("cart", JSON.stringify(currentCart));
        setCart(currentCart);
      }
      
      // Show success feedback
      setAddedToCart({ [watch.id]: true });
      setTimeout(() => setAddedToCart({}), 2000);
      
      // Update navbar cart count
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const brands = [
    { key: "all", name: "ALL WATCHES", count: allWatches.length },
    { key: "rolex", name: "ROLEX", count: watchesData.rolex?.length || 0 },
    { key: "omega", name: "OMEGA", count: watchesData.omega?.length || 0 },
    { key: "patek-philippe", name: "PATEK PHILIPPE", count: watchesData["patek-philippe"]?.length || 0 },
    { key: "audemars-piguet", name: "AUDEMARS PIGUET", count: watchesData["audemars-piguet"]?.length || 0 },
    { key: "cartier", name: "CARTIER", count: watchesData.cartier?.length || 0 },
    { key: "breitling", name: "BREITLING", count: watchesData.breitling?.length || 0 },
    { key: "iwc", name: "IWC", count: watchesData.iwc?.length || 0 },
    { key: "hublot", name: "HUBLOT", count: watchesData.hublot?.length || 0 },
    { key: "tag-heuer", name: "TAG HEUER", count: watchesData["tag-heuer"]?.length || 0 },
    { key: "jaeger-lecoultre", name: "JAEGER-LECOULTRE", count: watchesData["jaeger-lecoultre"]?.length || 0 },
  ];

  const sortOptions = [
    { key: "default", label: "Default" },
    { key: "price-low", label: "Price: Low to High" },
    { key: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                LUXURY <span className="font-bold">TIMEPIECES</span>
              </h1>
              <div className="w-12 h-px bg-white/30 mt-4 mb-4"></div>
              <p className="text-white/60 text-sm max-w-xl">
                Discover our curated collection of premium watches
              </p>
            </div>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-white hover:text-gray-300 transition" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center px-1">
                  {getCartCount() > 99 ? '99+' : getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded focus:outline-none focus:border-black transition text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-2.5">
                <X className="w-4 h-4 text-gray-400 hover:text-black transition" />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded text-sm hover:border-black transition"
            >
              <span>Sort: {sortOptions.find(o => o.key === sortBy)?.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                {sortOptions.map(option => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setSortBy(option.key);
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Brand Filters */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-200">
          {brands.map((brand) => (
            <button
              key={brand.key}
              onClick={() => setSelectedBrand(brand.key)}
              className={`px-4 py-1.5 text-xs tracking-wide transition-all duration-300 ${
                selectedBrand === brand.key
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-black"
              }`}
            >
              {brand.name} ({brand.count})
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs text-gray-500 tracking-wide">
            SHOWING {filteredWatches.length} TIMEPIECES
          </p>
        </div>

        {/* Watches Grid */}
        {filteredWatches.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No watches found.</p>
            <button
              onClick={() => {
                setSelectedBrand("all");
                setSearchTerm("");
              }}
              className="mt-4 px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredWatches.map((watch) => (
              <div key={watch.id} className="group bg-white hover:shadow-lg transition-all duration-300">
                {/* Image */}
                <div className="relative bg-[#fafafa] overflow-hidden block">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-56 md:h-64 object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-semibold text-white bg-black/70 px-2 py-0.5 rounded">
                      {watch.brandName}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 md:p-4">
                  <h3 className="font-medium text-gray-900 text-xs md:text-sm truncate">
                    {watch.name}
                  </h3>
                  <p className="text-gray-400 text-[10px] md:text-xs mt-1">
                    {watch.desc}
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-sm md:text-base font-semibold text-black">
                      {watch.price}
                    </span>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(watch)}
                    className={`w-full mt-3 py-2 text-xs font-semibold uppercase transition-all duration-300 ${
                      addedToCart[watch.id]
                        ? "bg-green-600 text-white"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {addedToCart[watch.id] ? "✓ ADDED" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-light text-black">{allWatches.length}+</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Timepieces</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-black">{brands.length - 1}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Brands</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-black">100%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Authentic</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;