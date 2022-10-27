import express from 'express';
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addOrderItems);

router.get('/', protect, getAllOrders);

router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

router.put('/:id/deliver', protect, updateOrderToDelivered);

export default router;
