// backend/src/routes/cartRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart);

router.route('/:productId')
  .delete(protect, removeFromCart)
  .put(protect, updateCartItem);

export default router;