// backend/src/controllers/cartController.js
import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }
    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        brand: product.brand,
      });
    }

    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.updatedAt = Date.now();
    await cart.save();
    
    // Populate product details before sending response
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        await cart.save();
      }
    }
    res.json(cart);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: error.message });
  }
};