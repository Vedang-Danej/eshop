import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);

router.get('/', protect, getUsers);

router.post('/login', authUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

router.delete('/:id', protect, deleteUser);

router.get('/:id', protect, getUserById);

router.put('/:id', protect, updateUser);

export default router;
