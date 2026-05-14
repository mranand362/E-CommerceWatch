// src/Components/ProtectedRoutes.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoutes = ({ children }) => {
  const { user, authLoading, token } = useAuth();
  
  // ✅ Wait for auth to load before deciding
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
  
  // ✅ Check authentication
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoutes;