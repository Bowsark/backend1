// controllers/productController.js

const Product = require('../models/Product');
const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch((error) => console.error('MongoDB connection error:', error));

const featuredProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    isFeatured: Boolean
});

const FeaturedProduct = mongoose.model('FeaturedProduct', featuredProductSchema);

module.exports = FeaturedProduct;


// Define the function for getting all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

// Define other controller functions (createProduct, updateProduct, deleteProduct)
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
};

// Export the functions
module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
