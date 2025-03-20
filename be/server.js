const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/categoryRoutes');
const addressRoutes = require("./routes/addressRoutes");
 
dotenv.config();
const app = express();
 
connectDB();
 
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
// app.use('/uploads' , express.static(path.join(__dirname, 'uploads')));
//app.use('/uploads' , express.static('uploads'));
 
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.setHeader("Content-Type", "image/png"); // Set appropriate MIME type
  res.sendFile(filePath);
});

app.use('/api/categories', categoryRoutes);
app.use('/api/addresses' , addressRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist',wishlistRoutes);


 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));