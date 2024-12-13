
const express = require('express');
const { getCart, addToCart } = require('../controllers/cartController'); 
const { protect } = require('../middlewares/authMiddleware'); 
const router = express.Router();
 
router.get('/cart', protect, getCart);
router.post('/cart', protect, addToCart);
module.exports = router;