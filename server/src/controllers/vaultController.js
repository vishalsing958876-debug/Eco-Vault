import Transaction from '../models/Transaction.js';
import Offer from '../models/Offer.js';

export const createTransaction = async (req, res) => {
  const { itemName, weightKg, pointsEarned } = req.body;

  try {
    if (!itemName || !weightKg || pointsEarned === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide itemName, weightKg, and pointsEarned'
      });
    }

    const transaction = await Transaction.create({
      itemName,
      weightKg,
      pointsEarned,
      userId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server Error'
    });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.status(200).json({
      status: 'success',
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server Error'
    });
  }
};

export const makeOffer = async (req, res) => {
  const { productId, offerPrice, message } = req.body;

  try {
    if (!productId || !offerPrice) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide productId and offerPrice'
      });
    }

    const offer = await Offer.create({
      productId,
      offerPrice,
      message,
      buyerId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: offer
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server Error'
    });
  }
};
