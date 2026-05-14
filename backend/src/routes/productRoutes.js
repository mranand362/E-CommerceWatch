// src/routes/productRoutes.js
import express from 'express';
import {
  getProducts,
  getProductById,
  getProductsByBrand,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getProducts);
router.get('/brand/:brandSlug', getProductsByBrand);
router.route('/:id').get(getProductById);

// Admin only routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;