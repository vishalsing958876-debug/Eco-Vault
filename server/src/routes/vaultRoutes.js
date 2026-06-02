import express from 'express';
import {
  createTransaction,
  getUserTransactions,
  makeOffer
} from '../controllers/vaultController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/deposit', protect, createTransaction);
router.get('/my-vault', protect, getUserTransactions);
router.post('/offer', protect, makeOffer);

export default router;
