
//correct code without image 
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
 
dotenv.config();
const app = express();
 
connectDB();
 
// Middlewares
app.use(cors());
app.use(express.json());
 
app.use('/api/auth', authRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/cart', cartRoutes);

 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));