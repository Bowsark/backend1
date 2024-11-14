const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Product = require('../models/Product'); // Assuming Product model contains a schema with isFeatured
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes and link them to the controller methods
router.get('/', productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

// Add a new product
router.post('/api/products', authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Using Product model
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
});

// Get all featured products
router.get('/api/products/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// Update a product
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update product' });
  }
});

// Delete a product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).send({ error: 'Failed to delete product' });
  }
});

module.exports = router;
