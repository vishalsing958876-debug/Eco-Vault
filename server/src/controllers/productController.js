import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  const { title, description, price, condition, category, imageUrl } = req.body;

  try {
    if (!title || !price || !condition) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide title, price, and condition'
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      condition,
      category,
      imageUrl,
      sellerId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server Error'
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('sellerId', 'name email');
    res.status(200).json({
      status: 'success',
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server Error'
    });
  }
};
