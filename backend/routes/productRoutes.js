import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsById,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/top', getTopProducts);

router.post('/:id/reviews', protect, createProductReview);

router.get('/:id', getProductsById);

router.delete('/:id', protect, deleteProduct);

router.post('/', protect, createProduct);

router.put('/:id', protect, updateProduct);

export default router;
