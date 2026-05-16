// src/Components/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // ✅ Import from useAuth.js, NOT AuthContext.jsx

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Clean up any invalid cart data before login
      const guestCart = localStorage.getItem('cart');
      if (guestCart) {
        try {
          const items = JSON.parse(guestCart);
          const hasInvalidItems = items.some(item => {
            return item.product?.id && typeof item.product.id === 'number';
          });
          
          if (hasInvalidItems) {
            console.log('Clearing cart with numeric product IDs');
            localStorage.removeItem('cart');
          }
        } catch (parseError) {
          console.error('Error parsing cart:', parseError);
          localStorage.removeItem('cart');
        }
      }
      
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">⌚</span>
          </div>
          <h2 className="text-2xl font-light text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;