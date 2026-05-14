// App.jsx
import Home from "./Pages/Home";
import AboutUs from "./Components/AboutUs";
import BrandPage from "./Components/BrandPage";
import CheckoutPage from "./Components/CheckoutPage";
import OrderConfirmationPage from "./Components/OrderConfirmationPage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import WatchPage from "./Components/WatchPage";
import ContactPage from "./Components/ContactPage";
import NewArrival from "./Components/NewArrival";
import CartPage from "./Components/CartPage";
import CategoriesHome from "./Components/CategoriesHome";
import AccountPage from "./Components/AccountPage";
import { useAuth } from "./context/useAuth";
import MyOrders from "./Components/MyOrders";

import {
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// ✅ Improved ProtectedRoutes with loading state
function ProtectedRoutes({ children }) {
  const { token, authLoading } = useAuth();
  
  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ✅ Improved GuestRoutes with loading state
function GuestRoutes({ children }) {
  const { token, authLoading } = useAuth();
  
  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (token) {
    return <Navigate to="/account" replace />;
  }

  return children;
}

function App() {
  return (
    <div>
      <ScrollToTopOnRouteChange />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/brands/:brandSlug" element={<BrandPage />} />
        <Route path="/brands" element={<CategoriesHome />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/watches" element={<WatchPage />} />
        <Route path="/new-arrivals" element={<NewArrival />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Guest Only Routes (for non-logged in users) */}
        <Route path="/login" element={<GuestRoutes><LoginPage /></GuestRoutes>} />
        <Route path="/signup" element={<GuestRoutes><SignupPage /></GuestRoutes>} />

        {/* Protected Routes (require login) */}
        <Route path="/account" element={<ProtectedRoutes><AccountPage /></ProtectedRoutes>} />
        <Route path="/checkout" element={<ProtectedRoutes><CheckoutPage /></ProtectedRoutes>} />
        <Route path="/order-confirmation" element={<ProtectedRoutes><OrderConfirmationPage /></ProtectedRoutes>} />

          {/* ✅ FIXED: orders route moved inside Routes */}
  <Route 
    path="/orders"
    element={
      <ProtectedRoutes>
        <MyOrders />
      </ProtectedRoutes>
    }
  />
      </Routes>
 
    </div>
  );
}

export default App;