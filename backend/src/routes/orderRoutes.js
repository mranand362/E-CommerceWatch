// src/routes/orderRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder);

router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router;