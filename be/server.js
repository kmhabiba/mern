const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/categoryRoutes');
 
dotenv.config();
const app = express();
 
connectDB();
 
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
app.use('/uploads' , express.static(path.join(__dirname, 'uploads')));
app.use('/api/categories', categoryRoutes);
 
app.use('/api/auth', authRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/cart', cartRoutes);

 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));