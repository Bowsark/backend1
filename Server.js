// server.js

const express = require('express');
const connectDB = require('./config/db')
// const dotenv = require('dotenv');
const Product = require('./models/Product');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());


// MongoDB connection
connectDB();

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);




// Endpoint to add a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to bulk add products
app.post('/add-products', async (req, res) => {
  try {
    await Product.insertMany(req.body);
    res.status(201).json({ message: 'Products added successfully' });
  } catch (err) {
    console.error("Error adding products:", err);
    res.status(500).json({ error: 'Failed to add products' });
  }
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
