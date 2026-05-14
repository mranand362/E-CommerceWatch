// backend/src/routes/authRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,  // ✅ Add this import
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getCurrentUser);  // ✅ Add this line
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;